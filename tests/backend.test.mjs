import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../dist/backend.js', import.meta.url), 'utf8');
function load(config, fetch) {
  const window = { APP_CONFIG: config };
  vm.runInNewContext(source, { window, fetch, AbortController, setTimeout, clearTimeout, TypeError });
  return window.AssessmentAPI;
}
test('unconfigured service fails closed without guessing a password', async () => {
  const api = load({}, () => assert.fail('must not make a network request'));
  await assert.rejects(api.verify('HIDDEN-2026'), /尚未配置/);
});
test('browser sends a publishable key but never a fabricated bearer JWT', async () => {
  const api = load({ supabaseUrl: 'https://sample.supabase.co', supabasePublishableKey: 'sb_publishable_public' }, async (url, options) => {
    assert.equal(url, 'https://sample.supabase.co/rest/v1/rpc/advantage_verify_code');
    assert.equal(options.headers.apikey, 'sb_publishable_public');
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.credentials, 'omit');
    assert.deepEqual(JSON.parse(options.body), { p_code: 'sample-code' });
    return { ok: true, json: async () => ({ remaining: 2 }) };
  });
  assert.equal((await api.verify('sample-code')).remaining, 2);
});
test('quota response keeps its machine-readable code for the retry flow', async () => {
  const api = load({ supabaseUrl: 'https://sample.supabase.co', supabasePublishableKey: 'sb_publishable_public' }, async () => ({
    ok: true, json: async () => ({ error: 'QUOTA_EXHAUSTED' })
  }));
  await assert.rejects(api.start('code', { id: 'id', token: 'token' }), error => error.code === 'QUOTA_EXHAUSTED');
});
