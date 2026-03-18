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

const pg = PLAYGROUND_TERMINAL_CASES.map(runPlaygroundCase);
const as = ASSIGNMENT_TERMINAL_CASES.map(runAssignmentCase);

const a = printSuite('Playground terminal (script / Run)', pg);
const b = printSuite('Assignment terminal (Run + Test matrix)', as);
const fail = a.passed + b.passed < a.total + b.total;
process.exit(fail ? 1 : 0);
