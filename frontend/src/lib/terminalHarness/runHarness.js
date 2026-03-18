import { CodeExecutor } from '../codeExecutorEngine.js';

const G = '\x1b[32m';
const R = '\x1b[31m';
const Y = '\x1b[33m';
const N = '\x1b[0m';
const tick = `${G}\u2713${N}`;
const cross = `${R}\u2717${N}`;

export function runPlaygroundCase(c) {
  const ex = new CodeExecutor();
  const r = ex.execute(c.code, [], null, 'script');
  const first = r.results?.[0];
  const out = first?.output ?? first?.result ?? '';
  const err = r.success ? '' : r.error || first?.error || '';
  let pass = false;
  if (c.expectSuccess === r.success) {
    if (r.success) {
      if (c.expectOutput !== undefined) pass = String(out).trim() === String(c.expectOutput).trim();
      else if (c.expectOutputContains) pass = String(out).includes(c.expectOutputContains);
      else pass = true;
    } else {
      pass = c.expectErrorContains ? String(err).includes(c.expectErrorContains) : !!err;
    }
  }
  return {
    pass,
    id: c.id,
    input: c.code.slice(0, 200) + (c.code.length > 200 ? '...' : ''),
    expected: c.expectSuccess
      ? c.expectOutput ?? c.expectOutputContains ?? '(success)'
      : c.expectErrorContains ?? 'error',
    actual: r.success ? String(out) : String(err)
  };
}

export function runAssignmentCase(c) {
  const ex = new CodeExecutor();
  let r;
  if (c.mode === 'run') {
    r = ex.execute(c.code, [], null, 'script');
  } else if (c.mode === 'script_test') {
    r = ex.execute(c.code, c.testCases, null, 'script');
  } else if (c.mode === 'function_test') {
    r = ex.execute(c.code, c.testCases, c.functionName, 'function');
  }
  const first = r.results?.[0];
  let pass = false;
  let actual = '';
  let expected = '';

  if (c.mode === 'run') {
    const out = String(first?.output ?? '');
    const errMsg = String(r.error || first?.error || '');
    if (c.expectSuccess === false) {
      expected = c.expectErrorContains || 'error';
      actual = errMsg || out;
      pass = !r.success && (!c.expectErrorContains || actual.includes(c.expectErrorContains));
    } else {
      expected = c.expectOutput ?? '';
      actual = out;
      pass = r.success && out.trim() === String(c.expectOutput ?? '').trim();
    }
  } else if (c.mode === 'function_test' && c.expectSuccess === false) {
    expected = 'execute failure';
    actual = r.success ? JSON.stringify(r) : r.error || 'ok';
    pass = !r.success;
  } else {
    const wantPass = c.expectAllPassed !== false;
    if (c.expectSomeFail) {
      pass = r.success && r.allPassed === false;
      expected = 'at least one test fails';
      actual = r.allPassed ? 'unexpected all passed' : 'failed as expected';
    } else {
      pass = r.success && r.allPassed === wantPass;
      expected = wantPass ? 'all tests pass' : 'all fail';
      if (pass) {
        actual = 'all match';
      } else {
        const failed = (r.results || []).find((x) => !x.passed);
        actual = failed
          ? `out=${JSON.stringify(failed.output)} exp=${JSON.stringify(failed.expected)} err=${failed.error}`
          : r.error || JSON.stringify(r);
      }
    }
  }

  return {
    pass,
    id: c.id,
    input: c.code.slice(0, 120) + (c.code.length > 120 ? '...' : ''),
    expected: String(expected),
    actual: String(actual).slice(0, 500)
  };
}

export function printSuite(title, rows) {
  console.log(`\n${Y}━━ ${title} ━━${N}\n`);
  let ok = 0;
  for (const row of rows) {
    if (row.pass) {
      ok++;
      console.log(`${tick} ${row.id}`);
    } else {
      console.log(`${cross} ${row.id}`);
      console.log(`   Input (snippet): ${row.input}`);
      console.log(`   Expected: ${row.expected}`);
      console.log(`   Actual:   ${row.actual}`);
    }
  }
  console.log(`\n${ok}/${rows.length} passed\n`);
  return { passed: ok, total: rows.length };
}
