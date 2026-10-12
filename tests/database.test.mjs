import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';

let db;
const token = () => randomBytes(32).toString('hex');
async function query(sql, parameters = []) { return (await db.query(sql, parameters)).rows; }
async function rpc(sql, parameters = []) { return (await query(`select ${sql} as data`, parameters))[0].data; }
async function issue() { return (await query("select * from advantage_private.issue_codes(1, 'automated test')"))[0]; }
async function start(code, id = randomUUID(), secret = token()) {
  const response = await rpc('public.advantage_start_attempt($1, $2, $3)', [code, id, secret]);
  return { id, secret, response };
}
async function finish(attempt, answers) {
  return rpc('public.advantage_finish_attempt($1, $2, $3)', [attempt.id, attempt.secret, JSON.stringify(answers)]);
}
before(async () => {
  db = new PGlite();
  await db.exec('create role anon; create role authenticated;');
  await db.exec(await readFile(new URL('../supabase/migrations/202610110001_assessment.sql', import.meta.url), 'utf8'));
});
after(async () => db?.close());

test('one code gives exactly three starts across independent request identities', async () => {
  const { code } = await issue();
  const outcomes = await Promise.all(Array.from({ length: 8 }, () => start(code)));
  assert.deepEqual(outcomes.filter(x => !x.response.error).map(x => x.response.remaining), [2, 1, 0]);
  assert.equal(outcomes.filter(x => x.response.error === 'QUOTA_EXHAUSTED').length, 5);
  assert.equal((await rpc('public.advantage_verify_code($1)', [code])).remaining, 0);
});

test('start retry is idempotent even after all remaining uses have been spent', async () => {
  const { code } = await issue();
  const a = await start(code);
  await start(code); await start(code);
  const retry = await start(code, a.id, a.secret);
  assert.equal(retry.response.attemptId, a.id);
  assert.equal(retry.response.remaining, 0);
  assert.equal((await start(code, a.id, token())).response.error, 'INVALID_REQUEST');
});

test('server scores reverse items and makes a single immutable result', async () => {
  const { code } = await issue(); const a = await start(code);
  const answers = Array.from({ length: 48 }, (_, i) => i % 8 === 7 ? 1 : 5);
  const result = await finish(a, answers);
  assert.equal(result.version, 1);
  assert.deepEqual(Object.values(result.scores), [100, 100, 100, 100, 100, 100]);
  const retry = await finish(a, Array(48).fill(1));
  assert.deepEqual(retry, result);
  assert.equal((await query('select count(*)::int as n from advantage_private.results where attempt_id=$1', [a.id]))[0].n, 1);
  assert.deepEqual(await rpc('public.advantage_get_result($1)', [result.id]), result);
  assert.deepEqual(Object.keys(result).sort(), ['createdAt', 'id', 'scores', 'version']);
});

test('invalid answers cannot make a result; wrong or missing tokens cannot submit', async () => {
  const { code } = await issue(); const a = await start(code);
  for (const answers of [null, {}, [], Array(47).fill(3), Array(48).fill(6), Array(48).fill('3'), Array(48).fill(2.5), Array(48).fill(null)]) {
    assert.equal((await finish(a, answers)).error, 'INCOMPLETE_ANSWERS');
  }
  assert.equal((await finish({ ...a, secret: token() }, Array(48).fill(3))).error, 'INVALID_ATTEMPT');
  assert.equal((await finish({ ...a, secret: null }, Array(48).fill(3))).error, 'INVALID_ATTEMPT');
  assert.deepEqual(Object.values((await finish(a, Array(48).fill(3))).scores), [50, 50, 50, 50, 50, 50]);
});

test('lowercase codes normalize; disabled and expired codes cannot start', async () => {
  const { code, code_id } = await issue();
  assert.equal((await rpc('public.advantage_verify_code($1)', ['  ' + code.toLowerCase() + '  '])).remaining, 3);
  await query('update advantage_private.access_codes set expires_at=now()-interval \'1 day\' where id=$1', [code_id]);
  assert.equal((await start(code)).response.error, 'INVALID_CODE');
  await query('update advantage_private.access_codes set expires_at=null, active=false where id=$1', [code_id]);
  assert.equal((await start(code)).response.error, 'INVALID_CODE');
  assert.equal((await rpc('public.advantage_verify_code($1)', ['HIDDEN-2026'])).error, 'INVALID_CODE');
});

test('revoked result is no longer shareable', async () => {
  const { code } = await issue(); const a = await start(code); const result = await finish(a, Array(48).fill(3));
  await query('update advantage_private.results set active=false where id=$1', [result.id]);
  assert.equal((await rpc('public.advantage_get_result($1)', [result.id])).error, 'RESULT_NOT_FOUND');
  assert.equal((await finish(a, Array(48).fill(3))).error, 'RESULT_NOT_FOUND');
});

test('anonymous visitor can use narrow RPCs but cannot read tables or issue codes', async () => {
  const { code } = await issue();
  await db.exec('set role anon');
  try {
    assert.equal((await rpc('public.advantage_verify_code($1)', [code])).remaining, 3);
    const a = await start(code);
    const result = await finish(a, Array(48).fill(4));
    assert.equal(result.scores.D1, 68.8);
    assert.equal((await rpc('public.advantage_get_result($1)', [result.id])).id, result.id);
    for (const table of ['access_codes', 'attempts', 'results']) {
      await assert.rejects(query(`select * from advantage_private.${table}`), /permission denied/);
    }
    await assert.rejects(query("select * from advantage_private.issue_codes(1, 'unauthorized')"), /permission denied/);
  } finally { await db.exec('reset role'); }
});
