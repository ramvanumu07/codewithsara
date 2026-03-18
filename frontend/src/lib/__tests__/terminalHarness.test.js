import { PLAYGROUND_TERMINAL_CASES, ASSIGNMENT_TERMINAL_CASES } from '../terminalHarness/sharedCases.js';
import { runPlaygroundCase, runAssignmentCase } from '../terminalHarness/runHarness.js';

describe('Playground terminal harness', () => {
  test.each(PLAYGROUND_TERMINAL_CASES.map((c) => [c.id, c]))(
    '%s',
    (_, c) => {
      const row = runPlaygroundCase(c);
      if (!row.pass) {
        throw new Error(`[${c.id}] expected: ${row.expected}\nactual: ${row.actual}`);
      }
    }
  );
});

describe('Assignment terminal harness', () => {
  test.each(ASSIGNMENT_TERMINAL_CASES.map((c) => [c.id, c]))(
    '%s',
    (_, c) => {
      const row = runAssignmentCase(c);
      if (!row.pass) {
        throw new Error(`[${c.id}] expected: ${row.expected}\nactual: ${row.actual}`);
      }
    }
  );
});
