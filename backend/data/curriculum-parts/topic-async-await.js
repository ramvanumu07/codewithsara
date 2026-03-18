/** Topic: Writing cleaner asynchronous code (async-await) */
export default {
  "id": "async-await",
  "title": "Writing cleaner asynchronous code",
  "outcomes": [
    "async and await",
    "What async Returns",
    "try/catch with async",
    "Sequential vs Parallel",
    "async Arrow Functions",
    "Error Propagation"
  ],
  "outcome_messages": [
    "Let's use async and await.\n\nAn **async function** is a function that **returns a Promise**. You declare it with **async function name() { }** or **async () => { }**. Inside an **async** function you can use **await**: **await promise** pauses the function until the promise **settles**, then evaluates to the **value** (if fulfilled) or **throws** (if rejected). So you write sequential-looking code: **const v = await fetchData();** — no .then() chains. **await is only valid inside an async function** (or top-level in modules); in a normal function you get a syntax error. Use async/await when you want to work with promises in a linear, readable way.\n\n## Example\n\n```javascript\nasync function run() {\n  const v = await Promise.resolve(42);\n  console.log(v);\n}\nrun();\n```\n\n## Output\n\n```\n42\n```\n\n## What happens\n\n- run is async, so run() returns a promise. Inside run, await Promise.resolve(42) pauses until the promise fulfills, then v gets 42.\n- The caller could do run().then(...) or await run() from another async function. You cannot use await in a non-async function.\n\n## Practice\n\nIn the example, what does run() return—a value or a promise? Why?",
    "Let's see what async returns.\n\nAn **async function always returns a Promise**. If you **return value**, the promise **fulfills** with that value (as if Promise.resolve(value)). If you **throw**, the promise **rejects**. If you **return** an existing **promise**, that promise is not double-wrapped—the async function's promise follows it. So the **caller** always gets a **promise**; they must **await** it or use **.then()** to get the value. That's why you can **await an async function**: it already returns a promise.\n\n## Example\n\n```javascript\nasync function getValue() {\n  return 10;\n}\ngetValue().then(function(v) {\n  console.log(v);\n});\n```\n\n## Output\n\n```\n10\n```\n\n## What happens\n\n- getValue() returns a promise that fulfills with 10. The caller uses .then() to get 10. If the caller were async, they could do const x = await getValue(); and x would be 10.\n- If you had async function f() { return fetch(url); }, f() returns that fetch promise; await f() gives you the fetch result.\n\n## Practice\n\nIn the example, why does the caller use .then() instead of just using the return value of getValue()?",
    "Let's use try/catch with async.\n\nInside an **async** function you can use **try/catch** around **await**. If the awaited promise **rejects**, the **catch** block runs with the rejection reason (the error). So you get the same style as synchronous code: try { const data = await fetchData(); } catch (e) { console.error(e); }. **One try/catch** can cover **multiple** awaits. If you don't catch, the rejection becomes an **unhandled rejection** or propagates to the caller's await/catch. Use try/catch in async functions to handle errors in one place instead of a .catch() on every promise.\n\n## Example\n\n```javascript\nasync function safe() {\n  try {\n    const v = await Promise.reject('oops');\n  } catch (e) {\n    console.log(e);\n  }\n}\nsafe();\n```\n\n## Output\n\n```\noops\n```\n\n## What happens\n\n- Promise.reject('oops') rejects. await throws the reason, so execution goes to catch and e is 'oops'.\n- If you had three awaits and the second rejected, execution would jump to catch; the third await would not run. Handle the error in catch (e.g. log, return fallback, or rethrow).\n\n## Practice\n\nIn the example, when the awaited promise rejects, where does execution go?",
    "Let's compare sequential vs parallel awaits.\n\n**Sequential**: **await a; await b;** — you wait for a to finish, then start b. Total time is roughly **time(a) + time(b)**. Use this when step B **depends** on the result of step A. **Parallel**: when steps **don't depend** on each other, start **both** and then wait: **const [x, y] = await Promise.all([fetchA(), fetchB()]);** — total time is roughly **max(time(a), time(b))**. So use **Promise.all** when you have several independent async operations and want to wait for all; use **sequential await** when each step needs the previous result. Avoid awaiting in a loop when you could start all and Promise.all—otherwise you wait one-by-one.\n\n## Example\n\n```javascript\nasync function parallel() {\n  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);\n  console.log(a + b);\n}\nparallel();\n```\n\n## Output\n\n```\n3\n```\n\n## What happens\n\n- Both promises are created and run; Promise.all waits for both. We get 1 and 2, then log 3. If we had done await Promise.resolve(1); await Promise.resolve(2); we'd still get 3 but the pattern is for when each step takes time—parallel runs them at the same time.\n\n## Practice\n\nIn the example, why do we use Promise.all instead of two separate await lines?",
    "Let's use async with arrow functions.\n\nYou can use **async** with **arrow functions**: **const f = async () => { };** or **async (x) => { return await g(x); }**. Same rules: the function **returns a promise**; you can **await** inside it. Use async arrow functions when you need an **async callback** (e.g. event handler, or .map() that does async work). Note: if you pass an async callback to something that **doesn't wait** for promises (e.g. forEach), the caller won't wait for your async work—use async callbacks where the caller awaits or uses the returned promises (e.g. **Promise.all(arr.map(async (x) => ...))**).\n\n## Example\n\n```javascript\nconst double = async function(n) {\n  return (await Promise.resolve(n)) * 2;\n};\ndouble(5).then(function(v) {\n  console.log(v);\n});\n```\n\n## Output\n\n```\n10\n```\n\n## What happens\n\n- double is an async function; double(5) returns a promise. Inside, await Promise.resolve(n) gives 5, then we return 10, so the promise fulfills with 10.\n- The caller uses .then() to get 10. When called, an async function always returns a promise, not the raw value.\n\n## Practice\n\nIn the example, what does double(5) return—the number 10 or a promise?",
    "Let's see how errors propagate in async code.\n\nIf you **throw** or **await a rejected promise** inside an async function and **don't catch**, the function's **returned promise rejects**. The **caller** can handle it: with **.catch()** on the returned promise, or by **awaiting** inside a **try/catch** in another async function. So errors **bubble up**: async f calls await g(), g throws → g's promise rejects → if f doesn't have try/catch around await g(), f's promise rejects → f's caller can catch. Same idea as promise chains: rejection propagates until a .catch() or try/catch handles it. Use try/catch (or .catch()) at the level where you can handle the error (e.g. show a message, retry); let others bubble if they can't.\n\n## Example\n\n```javascript\nasync function g() {\n  throw new Error('fail');\n}\nasync function f() {\n  await g();\n}\nf().catch(function(e) {\n  console.log(e.message);\n});\n```\n\n## Output\n\n```\nfail\n```\n\n## What happens\n\n- g() throws; g's returned promise rejects. f() awaits g(), so the rejection propagates and f's promise rejects. f() has no try/catch, so the error bubbles to the caller.\n- The caller's .catch() receives the error and logs the message. So: g → f → caller's .catch().\n\n## Practice\n\nIn the example, who catches the error—g, f, or the code that called f()?"
  ],
  "tasks": [
    {
      "description": "/*\n  ## async returns a Promise\n\n  An **async** function always returns a Promise. **`await`** unwraps another Promise’s value inside that function.\n\n  ## Example\n\n  ```javascript\n  async function simulateAsyncValue(value) {\n    return await Promise.resolve(value);\n  }\n  // await simulateAsyncValue(\"Hello\") → \"Hello\"\n  ```\n\n  ## What happens\n\n  - `Promise.resolve(value)` fulfills immediately with `value`.\n  - `await` pauses until then, then your function returns that value; the outer Promise fulfills with the same string.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAsyncValue(\"Hello\") | \"Hello\" |\n  | simulateAsyncValue(\"World\") | \"World\" |\n  | simulateAsyncValue(\"Test\") | \"Test\" |\n\n  **Must return a Promise** (declare with `async function`).\n*/\n\nasync function simulateAsyncValue(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncValue",
      "reference_solution": "async function simulateAsyncValue(value) {\n  return await Promise.resolve(value);\n}",
      "testCases": [
        { "input": { "value": "Hello" }, "expectedOutput": "Hello", "requirePromise": true },
        { "input": { "value": "World" }, "expectedOutput": "World", "requirePromise": true },
        { "input": { "value": "Test" }, "expectedOutput": "Test", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## await step by step\n\n  Store the result of **`await Promise.resolve(value)`** in a variable, then **return** it. Same outcome as the previous task, but you **explicitly** use a local variable (good habit for longer flows).\n\n  ## Example\n\n  ```javascript\n  async function simulateAwait(value) {\n    const v = await Promise.resolve(value);\n    return v;\n  }\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAwait(\"Data\") | \"Data\" |\n  | simulateAwait(\"Result\") | \"Result\" |\n  | simulateAwait(\"Info\") | \"Info\" |\n*/\n\nasync function simulateAwait(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAwait",
      "reference_solution": "async function simulateAwait(value) {\n  const v = await Promise.resolve(value);\n  return v;\n}",
      "testCases": [
        { "input": { "value": "Data" }, "expectedOutput": "Data", "requirePromise": true },
        { "input": { "value": "Result" }, "expectedOutput": "Result", "requirePromise": true },
        { "input": { "value": "Info" }, "expectedOutput": "Info", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Sequential awaits\n\n  When step B needs the result of step A, use **two awaits in order**:\n\n  ```javascript\n  const a = await Promise.resolve(value1);\n  const b = await Promise.resolve(value2);\n  return a + b;\n  ```\n\n  ## What happens\n\n  - First promise completes → `a` is set.\n  - Second completes → `b` is set.\n  - Return the **sum**.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateSequentialAsync(5, 10) | 15 |\n  | simulateSequentialAsync(20, 30) | 50 |\n  | simulateSequentialAsync(7, 3) | 10 |\n*/\n\nasync function simulateSequentialAsync(value1, value2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSequentialAsync",
      "reference_solution": "async function simulateSequentialAsync(value1, value2) {\n  const a = await Promise.resolve(value1);\n  const b = await Promise.resolve(value2);\n  return a + b;\n}",
      "testCases": [
        { "input": { "value1": 5, "value2": 10 }, "expectedOutput": "15", "requirePromise": true },
        { "input": { "value1": 20, "value2": 30 }, "expectedOutput": "50", "requirePromise": true },
        { "input": { "value1": 7, "value2": 3 }, "expectedOutput": "10", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## try / catch with await\n\n  **`await Promise.reject(error)`** throws (like an exception). Wrap it in **try/catch** and **return** the caught reason as a string.\n\n  ## Example\n\n  ```javascript\n  async function demo(err) {\n    try {\n      await Promise.reject(err);\n    } catch (e) {\n      return String(e);\n    }\n  }\n  // await demo(\"oops\") → \"oops\"\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAsyncErrorHandling(\"Error occurred\") | \"Error occurred\" |\n  | simulateAsyncErrorHandling(\"Failed\") | \"Failed\" |\n  | simulateAsyncErrorHandling(\"Not found\") | \"Not found\" |\n*/\n\nasync function simulateAsyncErrorHandling(error) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncErrorHandling",
      "reference_solution": "async function simulateAsyncErrorHandling(error) {\n  try {\n    await Promise.reject(error);\n  } catch (e) {\n    return String(e);\n  }\n}",
      "testCases": [
        { "input": { "error": "Error occurred" }, "expectedOutput": "Error occurred", "requirePromise": true },
        { "input": { "error": "Failed" }, "expectedOutput": "Failed", "requirePromise": true },
        { "input": { "error": "Not found" }, "expectedOutput": "Not found", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Sequential loop with await\n\n  For each string in **`values`**, **`await Promise.resolve(v)`** and push to an array, then **`join('\\n')`**. Models loading items one after another.\n\n  ## Example\n\n  - simulateSequentialExecution([\"First\", \"Second\", \"Third\"]) →\n\n  ```\n  First\n  Second\n  Third\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | [\"First\",\"Second\",\"Third\"] | three lines as above |\n  | [\"A\",\"B\",\"C\"] | \"A\\nB\\nC\" |\n*/\n\nasync function simulateSequentialExecution(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSequentialExecution",
      "reference_solution": "async function simulateSequentialExecution(values) {\n  const lines = [];\n  for (const v of values) {\n    lines.push(await Promise.resolve(v));\n  }\n  return lines.join('\\n');\n}",
      "testCases": [
        { "input": { "values": ["First", "Second", "Third"] }, "expectedOutput": "First\nSecond\nThird", "requirePromise": true },
        { "input": { "values": ["A", "B", "C"] }, "expectedOutput": "A\nB\nC", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Promise.all (parallel)\n\n  When two operations **don’t depend** on each other, start both and wait together:\n\n  ```javascript\n  const [a, b] = await Promise.all([\n    Promise.resolve(value1),\n    Promise.resolve(value2)\n  ]);\n  return a + b;\n  ```\n\n  ## What happens\n\n  - Both promises run; `Promise.all` fulfills with **both results in order**.\n  - Return **`value1 + value2`**.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateParallelExecution(10, 20) | 30 |\n  | simulateParallelExecution(5, 15) | 20 |\n  | simulateParallelExecution(100, 200) | 300 |\n*/\n\nasync function simulateParallelExecution(value1, value2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateParallelExecution",
      "reference_solution": "async function simulateParallelExecution(value1, value2) {\n  const [a, b] = await Promise.all([\n    Promise.resolve(value1),\n    Promise.resolve(value2)\n  ]);\n  return a + b;\n}",
      "testCases": [
        { "input": { "value1": 10, "value2": 20 }, "expectedOutput": "30", "requirePromise": true },
        { "input": { "value1": 5, "value2": 15 }, "expectedOutput": "20", "requirePromise": true },
        { "input": { "value1": 100, "value2": 200 }, "expectedOutput": "300", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## async function (arrow-style naming)\n\n  Same idea as task 1: **`return await Promise.resolve(value)`**. The name **`simulateAsyncArrow`** reminds you that **`async () => { }`** is equivalent for short helpers.\n\n  ## Example\n\n  ```javascript\n  async function simulateAsyncArrow(value) {\n    return await Promise.resolve(value);\n  }\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAsyncArrow(\"Arrow\") | \"Arrow\" |\n  | simulateAsyncArrow(\"Function\") | \"Function\" |\n  | simulateAsyncArrow(\"Async\") | \"Async\" |\n*/\n\nasync function simulateAsyncArrow(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncArrow",
      "reference_solution": "async function simulateAsyncArrow(value) {\n  return await Promise.resolve(value);\n}",
      "testCases": [
        { "input": { "value": "Arrow" }, "expectedOutput": "Arrow", "requirePromise": true },
        { "input": { "value": "Function" }, "expectedOutput": "Function", "requirePromise": true },
        { "input": { "value": "Async" }, "expectedOutput": "Async", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Await, then read a property\n\n  Simulate “fetch object then use field”:\n\n  ```javascript\n  const d = await Promise.resolve(data);\n  return d.name;\n  ```\n\n  ## Test cases (grader)\n\n  | `data` | Result |\n  |--------|--------|\n  | { id: 1, name: \"User\" } | \"User\" |\n  | { id: 2, name: \"Alice\" } | \"Alice\" |\n  | { id: 3, name: \"Bob\" } | \"Bob\" |\n*/\n\nasync function simulateAsyncDataProcessing(data) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncDataProcessing",
      "reference_solution": "async function simulateAsyncDataProcessing(data) {\n  const d = await Promise.resolve(data);\n  return d.name;\n}",
      "testCases": [
        { "input": { "data": { "id": 1, "name": "User" } }, "expectedOutput": "User", "requirePromise": true },
        { "input": { "data": { "id": 2, "name": "Alice" } }, "expectedOutput": "Alice", "requirePromise": true },
        { "input": { "data": { "id": 3, "name": "Bob" } }, "expectedOutput": "Bob", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## try / finally with await\n\n  **`finally`** runs whether the try block completes or throws. Here: **await** the value in **try**, then in **finally** append **`\\nCleanup`** to the string you got.\n\n  ## Example\n\n  - simulateAsyncTryCatchFinally(\"Success\") →\n\n  ```\n  Success\n  Cleanup\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAsyncTryCatchFinally(\"Success\") | \"Success\\nCleanup\" |\n  | simulateAsyncTryCatchFinally(\"Done\") | \"Done\\nCleanup\" |\n*/\n\nasync function simulateAsyncTryCatchFinally(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncTryCatchFinally",
      "reference_solution": "async function simulateAsyncTryCatchFinally(value) {\n  let v = '';\n  try {\n    v = await Promise.resolve(value);\n  } finally {\n    v = v + '\\nCleanup';\n  }\n  return v;\n}",
      "testCases": [
        { "input": { "value": "Success" }, "expectedOutput": "Success\nCleanup", "requirePromise": true },
        { "input": { "value": "Done" }, "expectedOutput": "Done\nCleanup", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Chained async steps\n\n  First **`await Promise.resolve(initial * 2)`**, then **`await Promise.resolve(doubled + 10)`**.\n\n  ## Example\n\n  - initial **5** → double **10** → add 10 → **20**\n\n  ## Test cases (grader)\n\n  | initial | Result |\n  |---------|--------|\n  | 5 | 20 |\n  | 10 | 30 |\n  | 3 | 16 |\n*/\n\nasync function simulateChainedAsync(initial) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateChainedAsync",
      "reference_solution": "async function simulateChainedAsync(initial) {\n  const doubled = await Promise.resolve(initial * 2);\n  return await Promise.resolve(doubled + 10);\n}",
      "testCases": [
        { "input": { "initial": 5 }, "expectedOutput": "20", "requirePromise": true },
        { "input": { "initial": 10 }, "expectedOutput": "30", "requirePromise": true },
        { "input": { "initial": 3 }, "expectedOutput": "16", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## User then posts (sequential API style)\n\n  1. **`await Promise.resolve(userId)`** (e.g. validate user).\n  2. **`await Promise.resolve(posts)`** (e.g. load posts).\n  3. Return **`JSON.stringify(posts)`**.\n\n  ## Example\n\n  ```javascript\n  await Promise.resolve(1);\n  const p = await Promise.resolve([\"Post1\", \"Post2\"]);\n  return JSON.stringify(p);\n  // → \"[\\\"Post1\\\",\\\"Post2\\\"]\"\n  ```\n\n  ## Test cases (grader)\n\n  | userId | posts | JSON string result |\n  |--------|-------|-------------------|\n  | 1 | [\"Post1\",\"Post2\"] | as above |\n  | 2 | [\"Article1\",\"Article2\"] | \"[\\\"Article1\\\",\\\"Article2\\\"]\" |\n*/\n\nasync function simulateAsyncUserPosts(userId, posts) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncUserPosts",
      "reference_solution": "async function simulateAsyncUserPosts(userId, posts) {\n  await Promise.resolve(userId);\n  const p = await Promise.resolve(posts);\n  return JSON.stringify(p);\n}",
      "testCases": [
        { "input": { "userId": 1, "posts": ["Post1", "Post2"] }, "expectedOutput": "[\"Post1\",\"Post2\"]", "requirePromise": true },
        { "input": { "userId": 2, "posts": ["Article1", "Article2"] }, "expectedOutput": "[\"Article1\",\"Article2\"]", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Errors bubble to the caller\n\n  - Inner **async** function **`await Promise.reject(new Error('Failed to fetch data'))`**.\n  - Outer **async** function **`try { await inner(); } catch (e) { return e.message; }`**.\n\n  ## What happens\n\n  - Rejection inside `inner` becomes an exception at `await inner()`.\n  - Outer **catch** returns **`e.message`**.\n\n  ## Test cases (grader)\n\n  - simulateNestedErrorHandling() → **`\"Failed to fetch data\"`**\n*/\n\nasync function simulateNestedErrorHandling() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateNestedErrorHandling",
      "reference_solution": "async function simulateNestedErrorHandling() {\n  async function inner() {\n    await Promise.reject(new Error('Failed to fetch data'));\n  }\n  try {\n    await inner();\n  } catch (e) {\n    return e.message;\n  }\n}",
      "testCases": [
        { "input": {}, "expectedOutput": "Failed to fetch data", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Promise.race with timers\n\n  Build two promises: one resolves to **`fast`** quickly (`setTimeout(..., 0)`), the other to **`slow`** later (`setTimeout(..., 100)`). **`await Promise.race([...])`** returns the first settled value—always **`fast`** here.\n\n  ## Example\n\n  ```javascript\n  const winner = await Promise.race([\n    new Promise(r => setTimeout(() => r(\"Fast\"), 0)),\n    new Promise(r => setTimeout(() => r(\"Slow\"), 100))\n  ]);\n  // winner === \"Fast\"\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateAsyncRace(\"Fast\", \"Slow\") | \"Fast\" |\n  | simulateAsyncRace(\"Quick\", \"Delayed\") | \"Quick\" |\n*/\n\nasync function simulateAsyncRace(fast, slow) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncRace",
      "reference_solution": "async function simulateAsyncRace(fast, slow) {\n  const pFast = new Promise((r) => setTimeout(() => r(fast), 0));\n  const pSlow = new Promise((r) => setTimeout(() => r(slow), 100));\n  return await Promise.race([pFast, pSlow]);\n}",
      "testCases": [
        { "input": { "fast": "Fast", "slow": "Slow" }, "expectedOutput": "Fast", "requirePromise": true },
        { "input": { "fast": "Quick", "slow": "Delayed" }, "expectedOutput": "Quick", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Validate after await\n\n  **`const n = await Promise.resolve(number)`**. If **`n < 0`**, return **`\"Invalid number\"`**; else return **`n * 2`**.\n\n  ## Example\n\n  | number | Result |\n  |--------|--------|\n  | 10 | 20 |\n  | -5 | \"Invalid number\" |\n\n  ## Test cases (grader)\n\n  - simulateAsyncValidation(-5) → \"Invalid number\"\n  - simulateAsyncValidation(10) → 20\n  - simulateAsyncValidation(-1) → \"Invalid number\"\n*/\n\nasync function simulateAsyncValidation(number) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncValidation",
      "reference_solution": "async function simulateAsyncValidation(number) {\n  const n = await Promise.resolve(number);\n  if (n < 0) return 'Invalid number';\n  return n * 2;\n}",
      "testCases": [
        { "input": { "number": -5 }, "expectedOutput": "Invalid number", "requirePromise": true },
        { "input": { "number": 10 }, "expectedOutput": "20", "requirePromise": true },
        { "input": { "number": -1 }, "expectedOutput": "Invalid number", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Sum with sequential await\n\n  Use a **`for...of`** loop: **`sum += await Promise.resolve(x)`** for each element. Models “process each item asynchronously” in order.\n\n  ## Example\n\n  - simulateAsyncArrayProcessing([1, 2, 3]) → **6**\n\n  ## Test cases (grader)\n\n  | values | Sum |\n  |--------|-----|\n  | [1,2,3] | 6 |\n  | [5,10,15] | 30 |\n  | [2,4,6,8] | 20 |\n*/\n\nasync function simulateAsyncArrayProcessing(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncArrayProcessing",
      "reference_solution": "async function simulateAsyncArrayProcessing(values) {\n  let sum = 0;\n  for (const x of values) {\n    sum += await Promise.resolve(x);\n  }\n  return sum;\n}",
      "testCases": [
        { "input": { "values": [1, 2, 3] }, "expectedOutput": "6", "requirePromise": true },
        { "input": { "values": [5, 10, 15] }, "expectedOutput": "30", "requirePromise": true },
        { "input": { "values": [2, 4, 6, 8] }, "expectedOutput": "20", "requirePromise": true }
      ]
    }
  ]
};
