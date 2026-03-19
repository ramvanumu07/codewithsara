#!/usr/bin/env node
/**
 * Verify every topic task: reference_solution vs testCases (script + function + closures).
 * Run from repo root: node backend/scripts/verify-curriculum-reference-solutions.mjs
 */
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const curriculumPath = path.join(__dirname, '../data/curriculum-parts');
const orderPath = pathToFileURL(path.join(curriculumPath, 'order.js')).href;
const executorPath = pathToFileURL(path.join(__dirname, '../services/SecureCodeExecutor.js')).href;

const G = '\x1b[32m';
const R = '\x1b[31m';
const Y = '\x1b[33m';
const C = '\x1b[36m';
const N = '\x1b[0m';
const tick = `${G}\u2713${N}`;
const cross = `${R}\u2717${N}`;

const { TOPIC_ORDER } = await import(orderPath);
const SecureCodeExecutor = (await import(executorPath)).default;
const executor = new SecureCodeExecutor();

async function runTaskCases(topicId, taskIndex, task) {
  const ref = task.reference_solution || '';
  const cases = task.testCases || [];
  const rows = [];

  if (cases.length === 0) {
    try {
      const out = await executor.runScriptWithInputs(ref, {});
      rows.push({
        pass: true,
        label: 'no testCases — run once',
        input: {},
        expected: '(any)',
        actual: out
      });
    } catch (e) {
      rows.push({
        pass: false,
        label: 'no testCases — run once',
        input: {},
        expected: 'success',
        actual: e.message
      });
    }
    return rows;
  }

  if (task.solution_type === 'function' && task.function_name) {
    const exec = await executor.execute(ref, cases, task.function_name, 'function');
    if (!exec.success) {
      rows.push({
        pass: false,
        label: 'execute',
        input: {},
        expected: 'function loads',
        actual: exec.error || 'failed'
      });
      return rows;
    }
    for (let i = 0; i < exec.results.length; i++) {
      const r = exec.results[i];
      const tc = cases[i];
      rows.push({
        pass: r.passed,
        label: `case ${i + 1}`,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: r.error || String(r.result ?? r.output ?? '')
      });
    }
    return rows;
  }

  for (let i = 0; i < cases.length; i++) {
    const tc = cases[i];
    try {
      const output = await executor.runScriptWithInputs(ref, tc.input);
      const passed = executor.compareOutput(output, tc.expectedOutput);
      rows.push({
        pass: passed,
        label: `case ${i + 1}`,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: output
      });
    } catch (e) {
      rows.push({
        pass: false,
        label: `case ${i + 1}`,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: e.message
      });
    }
  }
  return rows;
}

let totalPass = 0;
let totalFail = 0;

for (const topicId of TOPIC_ORDER) {
  // Cache-bust so we always load the latest topic file from disk (avoids stale module cache)
  const topicPath = pathToFileURL(path.join(curriculumPath, `topic-${topicId}.js`)).href + '?t=' + Date.now();
  let topic;
  try {
    topic = (await import(topicPath)).default;
  } catch (e) {
    console.log(`\n${C}■ ${topicId}${N} ${cross} import error: ${e.message}`);
    totalFail++;
    continue;
  }
  const title = topic?.title || topicId;
  const tasks = topic?.tasks || [];
  console.log(`\n${Y}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}`);
  console.log(`${C}${title}${N} ${Y}(${topicId})${N} — ${tasks.length} task(s)`);
  console.log(`${Y}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}`);

  for (let ti = 0; ti < tasks.length; ti++) {
    const task = tasks[ti];
    const desc = (task.description || '').split('\n')[0].replace(/^\/\/\s*/, '').slice(0, 70);
    const rows = await runTaskCases(topicId, ti, task);
    const allOk = rows.every((r) => r.pass);
    const taskLabel = `[${topicId}] Task ${ti + 1}/${tasks.length}`;
    if (allOk) {
      totalPass += rows.length;
      console.log(`  ${tick} ${taskLabel}: ${desc || '(no description)'}`);
    } else {
      console.log(`  ${cross} ${taskLabel}: ${desc || '(no description)'}`);
      for (const r of rows) {
        if (!r.pass) {
          totalFail++;
          console.log(`      ${cross} ${r.label}`);
          console.log(`         input:    ${JSON.stringify(r.input)}`);
          console.log(`         expected: ${JSON.stringify(r.expected)}`);
          console.log(`         actual:   ${JSON.stringify(String(r.actual).slice(0, 200))}`);
        } else {
          totalPass++;
        }
      }
    }
  }
}

console.log(`\n${Y}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${N}`);
console.log(`Assertions passed: ${G}${totalPass}${N}  failed: ${totalFail > 0 ? R : G}${totalFail}${N}`);
process.exit(totalFail > 0 ? 1 : 0);
