#!/usr/bin/env node
/**
 * CLI: Playground + assignment terminal harness (same matrix as Jest).
 * Usage (from frontend/): node scripts/run-terminal-harness.mjs
 */
import {
  PLAYGROUND_TERMINAL_CASES,
  ASSIGNMENT_TERMINAL_CASES
} from '../src/lib/terminalHarness/sharedCases.js';
import {
  runPlaygroundCase,
  runAssignmentCase,
  printSuite
} from '../src/lib/terminalHarness/runHarness.js';

(async () => {
  const pg = await Promise.all(PLAYGROUND_TERMINAL_CASES.map((c) => runPlaygroundCase(c)));
  const as = await Promise.all(ASSIGNMENT_TERMINAL_CASES.map((c) => runAssignmentCase(c)));

  const a = printSuite('Playground terminal (script / Run)', pg);
  const b = printSuite('Assignment terminal (Run + Test matrix)', as);
  const fail = a.passed + b.passed < a.total + b.total;
  process.exit(fail ? 1 : 0);
})();
