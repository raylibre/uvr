#!/usr/bin/env node
/**
 * End-to-end registration flow smoke test.
 *
 * Simulates: visit home → register new user → login → fetch profile
 * Runs repeatedly with a 2 s gap until 60 s have elapsed.
 *
 * Usage:
 *   npm run test:flow
 *   npm run test:flow -- --duration=120 --delay=3  (override defaults)
 */

// ---------- config ----------------------------------------------------------

const BASE_URL  = 'https://btbmqvawpokfwptcrmem.supabase.co';
const ANON_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Ym1xdmF3cG9rZndwdGNybWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzUwODksImV4cCI6MjA2NDQ1MTA4OX0.8izmlGlzinrsCUHMyH_WpFEfeTCp3t1yfHYDcnmhDws';
const FRONT_URL = 'http://localhost:5173';

// parse optional CLI overrides:  --duration=120  --delay=3
const args     = Object.fromEntries(process.argv.slice(2).map(a => a.replace('--','').split('=')));
const DURATION = (Number(args.duration) || 60) * 1000;   // ms
const DELAY    = (Number(args.delay)    || 2)  * 1000;   // ms

// ---------- colours ---------------------------------------------------------

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
};

const ok   = msg => `${C.green}✓${C.reset} ${msg}`;
const fail = msg => `${C.red}✗${C.reset} ${msg}`;
const info = msg => `${C.dim}${msg}${C.reset}`;

// ---------- helpers ---------------------------------------------------------

function makeUser(run) {
  // Use a mix of run number + random to stay within valid Ukrainian phone ranges
  // +380 50 XXXXXXX  (50 = Vodafone UA prefix)
  const suffix = String(Math.floor(Math.random() * 9_000_000) + 1_000_000);
  const ts     = Date.now();
  return {
    email:                  `test_${ts}_${run}@flow-test.local`,
    phone:                  `+38050${suffix}`,
    password:               'TestPass123!',
    first_name:             'Тест',
    last_name:              'Тестовий',
    patronymic:             'Тестович',
    date_of_birth:          '1990-01-01',
    gender:                 'male',
    region:                 'kyiv',
    city:                   'Київ',
    address:                'вул. Тестова, 1',
    category:               'active_veteran',
    marital_status:         'single',
    activity_type:          'social',
    have_minor_children:    false,
    minor_children_number:  0,
    notifications_enabled:  true,
    email_notifications:    true,
    sms_notifications:      false,
  };
}

async function timed(label, fn) {
  const t0 = Date.now();
  try {
    const result = await fn();
    const ms = Date.now() - t0;
    console.log(`  ${ok(label)} ${info(`${ms}ms`)}`);
    return { ok: true, result, ms };
  } catch (err) {
    const ms = Date.now() - t0;
    console.log(`  ${fail(label)} ${C.red}${err.message}${C.reset} ${info(`${ms}ms`)}`);
    return { ok: false, ms };
  }
}

// ---------- steps -----------------------------------------------------------

async function checkFrontend() {
  const res = await fetch(FRONT_URL, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

async function register(user) {
  const formData = new FormData();

  const docMeta = [{ type: 'passport', category: user.category, filename: 'passport.jpg', index: 0 }];
  formData.append('data', JSON.stringify({ ...user, documents_metadata: docMeta }));
  formData.append(
    'document_0',
    new Blob(['fake-test-jpeg-content'], { type: 'image/jpeg' }),
    'passport.jpg'
  );

  const res = await fetch(`${BASE_URL}/functions/v1/auth-register`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${ANON_KEY}` },
    body: formData,
    signal: AbortSignal.timeout(10_000),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${body?.message ?? JSON.stringify(body)}`);
  if (body.success === false) throw new Error(body.message ?? JSON.stringify(body));
  return body;
}

async function login(email, password) {
  const res = await fetch(`${BASE_URL}/functions/v1/auth-login`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login: email, password, remember_me: false }),
    signal: AbortSignal.timeout(10_000),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${body?.message ?? JSON.stringify(body)}`);

  const token = body?.data?.data?.session?.access_token;
  if (!token) throw new Error(`No access_token in response: ${JSON.stringify(body)}`);
  return token;
}

async function getProfile(token) {
  const res = await fetch(`${BASE_URL}/functions/v1/auth-me`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10_000),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${body?.message ?? JSON.stringify(body)}`);
  if (!body.success) throw new Error(body.message ?? JSON.stringify(body));
  return body;
}

// ---------- single run ------------------------------------------------------

async function runScenario(n, frontOk) {
  const user = makeUser(n);
  console.log(`\n${C.bold}${C.cyan}── Run #${n}${C.reset}  ${info(user.email)}`);

  const results = [];

  if (frontOk !== null) {
    // Frontend check is informational — not counted in pass/fail
    try {
      await checkFrontend();
      console.log(`  ${ok('Frontend reachable')} ${info('(dev server up)')}`);
    } catch {
      console.log(`  ${C.yellow}⚠${C.reset}  Frontend not reachable ${info('(start npm run dev to include UI check)')}`);
    }
  }

  const r1 = await timed('Register',     () => register(user));
  results.push(r1.ok);
  if (!r1.ok) return results.every(Boolean);

  let token;
  const r2 = await timed('Login',        async () => { token = await login(user.email, user.password); });
  results.push(r2.ok);
  if (!r2.ok) return results.every(Boolean);

  const r3 = await timed('Get profile',  () => getProfile(token));
  results.push(r3.ok);

  return results.every(Boolean);
}

// ---------- main loop -------------------------------------------------------

async function main() {
  console.log(
    `\n${C.bold}UVR Registration Flow — smoke test${C.reset}\n` +
    `${info(`Duration: ${DURATION / 1000}s | Delay: ${DELAY / 1000}s | Target: ${BASE_URL}`)}\n`
  );

  const start   = Date.now();
  let run       = 0;
  let passed    = 0;
  let failed    = 0;
  const frontOk   = true;   // first run checks frontend; subsequent runs skip it

  while (Date.now() - start < DURATION) {
    run++;
    const ok = await runScenario(run, run === 1 ? frontOk : null);
    if (ok) passed++;
    else    failed++;

    const remaining = DURATION - (Date.now() - start);
    if (remaining > DELAY) {
      process.stdout.write(info(`\n  waiting ${DELAY / 1000}s…`));
      await new Promise(r => setTimeout(r, DELAY));
      process.stdout.write('\r' + ' '.repeat(30) + '\r');
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const passLine = `${C.green}${passed} passed${C.reset}`;
  const failLine = failed ? `${C.red}${failed} failed${C.reset}` : `${C.dim}0 failed${C.reset}`;

  console.log(
    `\n${C.bold}── Summary ──────────────────────────────${C.reset}\n` +
    `  Runs: ${run}  ${passLine}  ${failLine}\n` +
    `  Elapsed: ${elapsed}s\n`
  );

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(`\n${C.red}Fatal:${C.reset}`, err.message);
  process.exit(1);
});
