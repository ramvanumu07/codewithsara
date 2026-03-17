/**
 * Verify a topic's reference solutions against all test cases.
 * Usage: node backend/scripts/verify-topic-tasks.mjs <topic-id>
 * Example: node backend/scripts/verify-topic-tasks.mjs numbers-and-basic-arithmetic
 */
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const topicId = process.argv[2] || 'numbers-and-basic-arithmetic';
const topicPath = path.join(__dirname, '../data/curriculum-parts', `topic-${topicId}.js`);
const topic = (await import(pathToFileURL(topicPath).href)).default;
const executorPath = pathToFileURL(path.join(__dirname, '../services/SecureCodeExecutor.js')).href;
const SecureCodeExecutor = (await import(executorPath)).default;

const executor = new SecureCodeExecutor();
const tasks = topic?.tasks || [];

async function main() {
  const results = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const ref = task.reference_solution || '';
    const cases = task.testCases || [];
    const desc = (task.description || '').split('\n')[0].replace(/^\/\/\s*/, '').slice(0, 90);
    let allPassed = true;
    const caseResults = [];
    if (cases.length === 0) {
      try {
        const out = await executor.runScriptWithInputs(ref, {});
        caseResults.push({ input: {}, expected: '(none)', actual: out, passed: true });
      } catch (e) {
        caseResults.push({ input: {}, expected: '', actual: e.message, passed: false });
        allPassed = false;
      }
    } else {
      for (const tc of cases) {
        try {
          const output = await executor.runScriptWithInputs(ref, tc.input);
          const passed = executor.compareOutput(output, tc.expectedOutput);
          caseResults.push({ input: tc.input, expected: tc.expectedOutput, actual: output, passed });
          if (!passed) allPassed = false;
        } catch (e) {
          caseResults.push({ input: tc.input, expected: tc.expectedOutput, actual: e.message, passed: false });
          allPassed = false;
        }
      }
    }
    results.push({ index: i + 1, description: desc, allPassed, caseResults });
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
