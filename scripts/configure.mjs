import { writeFile } from 'node:fs/promises';
const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(supabaseUrl)) {
  throw new Error('Set SUPABASE_URL to the project HTTPS URL.');
}
let legacyAnon = false;
try {
  legacyAnon = JSON.parse(Buffer.from(supabasePublishableKey.split('.')[1], 'base64url')).role === 'anon';
} catch {}
if (!supabasePublishableKey.startsWith('sb_publishable_') && !legacyAnon) {
  throw new Error('Use a Supabase publishable key or legacy anon key, never a secret/service_role key.');
}
await writeFile(new URL('../dist/config.js', import.meta.url),
  '// Public browser configuration; not an administrative credential.\nwindow.APP_CONFIG = Object.freeze(' +
  JSON.stringify({ supabaseUrl, supabasePublishableKey }, null, 2) + ');\n');
console.log('Public Supabase configuration generated.');
