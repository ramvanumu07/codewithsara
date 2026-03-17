/**
 * Verify all topics' reference solutions against test cases.
 * Outputs a JSON array: [{ topicId, title, taskCount, allPassed, failedTaskIndices }]
 * Usage: node backend/scripts/verify-all-topics.mjs
 */
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const curriculumPath = path.join(__dirname, '../data/curriculum-parts');
const orderPath = pathToFileURL(path.join(curriculumPath, 'order.js')).href;
const executorPath = pathToFileURL(path.join(__dirname, '../services/SecureCodeExecutor.js')).href;

const { TOPIC_ORDER } = await import(orderPath);
const SecureCodeExecutor = (await import(executorPath)).default;
const executor = new SecureCodeExecutor();

async function verifyTopic(topicId) {
  const topicPath = pathToFileURL(path.join(curriculumPath, `topic-${topicId}.js`)).href;
  let topic;
  try {
    topic = (await import(topicPath)).default;
  } catch (e) {
    return { topicId, title: topicId, taskCount: 0, allPassed: false, failedTaskIndices: [], error: e.message };
  }
  const tasks = topic?.tasks || [];
  const title = topic?.title || topicId;
  const failedTaskIndices = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const ref = task.reference_solution || '';
    const cases = task.testCases || [];
    let allPassed = true;
    if (cases.length === 0) {
      try {
        await executor.runScriptWithInputs(ref, {});
      } catch (e) {
        allPassed = false;
      }
    } else {
      for (const tc of cases) {
        try {
          const output = await executor.runScriptWithInputs(ref, tc.input);
          const passed = executor.compareOutput(output, tc.expectedOutput);
          if (!passed) allPassed = false;
        } catch (e) {
          allPassed = false;
        }
      }
    }
    if (!allPassed) failedTaskIndices.push(i + 1);
  }
  const allPassed = failedTaskIndices.length === 0;
  return { topicId, title, taskCount: tasks.length, allPassed, failedTaskIndices };
}

async function main() {
  const results = [];
  for (const topicId of TOPIC_ORDER) {
    const r = await verifyTopic(topicId);
    results.push(r);
    process.stderr.write(r.allPassed ? '.' : 'F');
  }
  process.stderr.write('\n');
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
