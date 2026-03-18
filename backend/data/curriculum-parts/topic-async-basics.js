/** Topic: Callbacks, timers, and async concepts (async-basics) */
export default {
  "id": "async-basics",
  "title": "Callbacks, timers, and async concepts",
  "outcomes": [
    "Synchronous vs Asynchronous",
    "setTimeout and setInterval",
    "Clearing Timers",
    "The Callback Pattern",
    "Callback Hell",
    "Why Promises Next"
  ],
  "outcome_messages": [
    "Let's compare synchronous vs asynchronous code.\n\n**Synchronous** code runs **one statement after another**; each line runs and finishes before the next. **Asynchronous** code **starts** an operation and **continues** without waiting; when the operation finishes **later**, a **callback** (a function you passed) runs. So \"async\" means \"later\"—the result is not available right away. JavaScript runs in a **single thread**: only one piece of code runs at a time. When you use setTimeout or do I/O, the environment (browser or Node) handles the wait and **queues** your callback; it runs **after** the current synchronous code finishes. So the **order** you see in the log can be different from the order of lines in your file.\n\n## Example\n\n```javascript\nconsole.log('A');\nsetTimeout(function() {\n  console.log('B');\n}, 0);\nconsole.log('C');\n```\n\n## Output\n\n```\nA\nC\nB\n```\n\n## What happens\n\n- 'A' and 'C' run right away (synchronous).\n- setTimeout schedules the callback to run \"as soon as possible\" after the current code; it does not run in the middle. So the callback runs after 'C'.\n- Even with 0 ms, the callback runs **after** the rest of the synchronous code. That's non-blocking: we didn't wait for the timer between A and C.\n\n## Practice\n\nIn the example, why does B print after C even though the setTimeout call appears before console.log('C')?",
    "Let's use setTimeout and setInterval.\n\n**setTimeout(callback, delayMs)** runs the **callback once** after **delayMs** milliseconds (minimum delay; not guaranteed if the thread is busy). It **returns a timer ID** (a number). **setInterval(callback, delayMs)** runs the callback **repeatedly** every delayMs and also returns an ID. Pass a **function** (e.g. function() { } or a function name). Use setTimeout for a one-off delay; use setInterval for repeating (and clear it when you're done). Delay is in **milliseconds** (1000 = 1 second).\n\n## Example\n\n```javascript\nsetTimeout(function() {\n  console.log('done');\n}, 1000);\n```\n\n## Output\n\n```\n(one second later)\ndone\n```\n\n## What happens\n\n- setTimeout schedules the function to run once, about 1 second later. The script continues; the callback runs later.\n- setInterval would run the callback every 1000 ms until you call clearInterval(id). Store the returned ID so you can clear the timer later.\n\n## Practice\n\nIn the example, why does 'done' appear about one second later and not immediately?",
    "Let's clear timers with clearTimeout and clearInterval.\n\n**clearTimeout(id)** cancels a **setTimeout** so the callback **never runs** (if it hasn't run yet). **clearInterval(id)** **stops** a **setInterval** so no more callbacks run. Pass the **ID** that setTimeout or setInterval returned. Use clear when you no longer need the timer—e.g. user leaves the page, or you've run enough repeats. If you don't clear an interval, it runs until the page or process ends. Clearing an already-run or already-cleared timer is safe (no effect).\n\n## Example\n\n```javascript\nlet id = setInterval(function() {\n  console.log('tick');\n}, 1000);\nsetTimeout(function() {\n  clearInterval(id);\n}, 3500);\n```\n\n## Output\n\n```\ntick\ntick\ntick\n```\n\n## What happens\n\n- The interval runs at 1 s, 2 s, 3 s. After 3.5 s we call clearInterval(id), so it stops. Without clearInterval it would keep running.\n- You must keep the ID in a variable (here, id) to pass to clearTimeout or clearInterval.\n\n## Practice\n\nIn the example, why do we need to keep the id returned by setInterval?",
    "Let's use the callback pattern.\n\nA **callback** is a **function you pass** to another function to be **called later** when something finishes (timer, I/O, event). You're saying \"when X is done, run this.\" The other function decides **when** to call it and **with what arguments** (e.g. error, result). Callbacks are the classic way to handle \"when done\" in JavaScript. Use them for one-off async logic. The downside: many sequential async steps lead to nested callbacks, which are hard to read.\n\n## Example\n\n```javascript\nfunction doLater(fn) {\n  setTimeout(fn, 100);\n}\ndoLater(function() {\n  console.log('later');\n});\nconsole.log('now');\n```\n\n## Output\n\n```\nnow\nlater\n```\n\n## What happens\n\n- doLater receives a function and schedules it with setTimeout(100).\n- 'now' runs immediately; the callback runs about 100 ms later and logs 'later'. The callback is \"run this when ready.\"\n\n## Practice\n\nIn the example, why does 'now' print before 'later'?",
    "Let's avoid callback hell.\n\nWhen you have **multiple async steps** in a row (e.g. get user, then get orders, then get details), you end up **nesting callbacks**: a callback that calls the next step, which has a callback that calls the next, and so on. That leads to **deep indentation**, hard-to-read code, and **error handling** repeated at every level. That's often called \"**callback hell**.\" Callbacks work, but they don't scale well for long sequential async flows. The solution is to use **Promises** (or async/await), which let you write sequential steps in a flatter, chainable way and handle errors in one place.\n\n## Example\n\n```javascript\nstep1(function(err, a) {\n  if (err) return;\n  step2(a, function(err, b) {\n    if (err) return;\n    step3(b, function(err, c) { });\n  });\n});\n```\n\n## What happens\n\n- Each step takes a callback; the next step is inside that callback. The code \"pyramid\" grows with each step.\n- Reading order and error handling become messy. Promises (next topic) replace this with .then() chains and .catch().\n\n## Practice\n\nYou need to do A, then B, then C (each async). With callbacks only, what happens to indentation and error handling as you add steps?",
    "Let's see why Promises are next.\n\n**Promises** represent a **future value** (or error). Instead of passing a callback into a function, you get back a Promise and call **.then()** or **.catch()** on it. You can **chain** .then().then() instead of nesting callbacks, so async flow looks more **linear**. Errors can be handled in **one** .catch() instead of at every nesting level. Promises are the foundation for **async/await** (syntax that makes async code look like sync code). For new async code with several steps, prefer Promises or async/await over raw callbacks. The next topic covers Promise syntax in detail.\n\n## Example\n\n```javascript\nconst p = new Promise(function(resolve) {\n  setTimeout(function() {\n    resolve('done');\n  }, 100);\n});\np.then(function(result) {\n  console.log(result);\n});\n```\n\n## Output\n\n```\n(about 100 ms later)\ndone\n```\n\n## What happens\n\n- The Promise wraps the setTimeout; when the timer fires, resolve('done') is called. That fulfills the Promise with the value 'done'.\n- .then() runs when the Promise is fulfilled and receives that value. One chain instead of nested callbacks.\n\n## Practice\n\nIn the example, when does the .then() callback run—immediately or after the Promise is fulfilled?"
  ],
  "tasks": [
    {
      "description": "/*\n  ## Delayed result with a Promise\n\n  Real timers don’t return a value immediately—they run a **callback** later. Here you model that: return a **Promise** that **resolves to `message`** after **`delay` milliseconds** using **setTimeout**.\n\n  ## Example (pattern)\n\n  ```javascript\n  function later(msg, ms) {\n    return new Promise((resolve) => {\n      setTimeout(() => resolve(msg), ms);\n    });\n  }\n  // await later(\"Hi\", 500) → eventually \"Hi\"\n  ```\n\n  ## What happens\n\n  - `new Promise` gives the caller something they can **await**.\n  - When the timer fires, `resolve(message)` fulfills the Promise with that string.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateTimeout(\"Hello\", 0) | \"Hello\" |\n  | simulateTimeout(\"World\", 0) | \"World\" |\n  | simulateTimeout(\"Test\", 0) | \"Test\" |\n\n  **You must return a Promise** (tests await it).\n*/\n\nfunction simulateTimeout(message, delay) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateTimeout",
      "reference_solution": "function simulateTimeout(message, delay) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(message), delay);\n  });\n}",
      "testCases": [
        { "input": { "message": "Hello", "delay": 0 }, "expectedOutput": "Hello", "requirePromise": true },
        { "input": { "message": "World", "delay": 0 }, "expectedOutput": "World", "requirePromise": true },
        { "input": { "message": "Test", "delay": 0 }, "expectedOutput": "Test", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Sync first, timer second\n\n  Synchronous code runs to completion before **macrotasks** (like `setTimeout(..., 0)` callbacks) run. Build a Promise that resolves to a **three-line string** showing that order.\n\n  ## Example (conceptual order)\n\n  ```javascript\n  // Sync: push \"Start\", push \"End\"\n  // Then a timer adds \"Timer\"\n  // Then resolve with lines joined by newline\n  ```\n\n  ## Expected string (exact)\n\n  ```\n  Start\n  End\n  Timer\n  ```\n\n  ## What happens\n\n  - `\"Start\"` and `\"End\"` are recorded **before** the timer callback runs.\n  - The timer callback appends `\"Timer\"`.\n  - A **second** scheduled step can resolve the Promise once the array is complete.\n\n  ## Test cases (grader)\n\n  - simulateEventLoop() → `\"Start\\nEnd\\nTimer\"`\n*/\n\nfunction simulateEventLoop() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateEventLoop",
      "reference_solution": "function simulateEventLoop() {\n  return new Promise((resolve) => {\n    const lines = [];\n    lines.push('Start');\n    setTimeout(() => lines.push('Timer'), 0);\n    lines.push('End');\n    setTimeout(() => resolve(lines.join('\\n')), 0);\n  });\n}",
      "testCases": [
        { "input": {}, "expectedOutput": "Start\nEnd\nTimer", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Countdown, one tick at a time\n\n  Produce the lines `n`, `n-1`, … `1` (newline-separated) using **repeated `setTimeout`** steps—not a single synchronous `for` loop that builds the string instantly.\n\n  ## Example\n\n  - simulateCountdown(3) →\n\n  ```\n  3\n  2\n  1\n  ```\n\n  ## What happens\n\n  - Each number is appended, then the next step is scheduled with `setTimeout(..., 0)`.\n  - When you reach below 1, **resolve** with the joined string.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateCountdown(3) | \"3\\n2\\n1\" |\n  | simulateCountdown(2) | \"2\\n1\" |\n  | simulateCountdown(5) | \"5\\n4\\n3\\n2\\n1\" |\n*/\n\nfunction simulateCountdown(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateCountdown",
      "reference_solution": "function simulateCountdown(n) {\n  return new Promise((resolve) => {\n    const parts = [];\n    function tick(k) {\n      if (k < 1) return resolve(parts.join('\\n'));\n      parts.push(String(k));\n      setTimeout(() => tick(k - 1), 0);\n    }\n    tick(n);\n  });\n}",
      "testCases": [
        { "input": { "n": 3 }, "expectedOutput": "3\n2\n1", "requirePromise": true },
        { "input": { "n": 2 }, "expectedOutput": "2\n1", "requirePromise": true },
        { "input": { "n": 5 }, "expectedOutput": "5\n4\n3\n2\n1", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Repeating like setInterval\n\n  **setInterval** fires the same callback many times. Here you simulate that: return a Promise that resolves to **`message` repeated `times` times**, each on its own line, using **setTimeout** between repeats (not `Array(times).fill(message).join`).\n\n  ## Example\n\n  - simulateInterval(\"Tick\", 3) →\n\n  ```\n  Tick\n  Tick\n  Tick\n  ```\n\n  ## What happens\n\n  - Each tick pushes one line, increments a counter, schedules the next tick with `setTimeout`.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateInterval(\"Tick\", 3) | three lines \"Tick\" |\n  | simulateInterval(\"Test\", 2) | two lines \"Test\" |\n  | simulateInterval(\"Count\", 4) | four lines \"Count\" |\n*/\n\nfunction simulateInterval(message, times) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateInterval",
      "reference_solution": "function simulateInterval(message, times) {\n  return new Promise((resolve) => {\n    const parts = [];\n    let c = 0;\n    function tick() {\n      if (c >= times) return resolve(parts.join('\\n'));\n      parts.push(message);\n      c++;\n      setTimeout(tick, 0);\n    }\n    tick();\n  });\n}",
      "testCases": [
        { "input": { "message": "Tick", "times": 3 }, "expectedOutput": "Tick\nTick\nTick", "requirePromise": true },
        { "input": { "message": "Test", "times": 2 }, "expectedOutput": "Test\nTest", "requirePromise": true },
        { "input": { "message": "Count", "times": 4 }, "expectedOutput": "Count\nCount\nCount\nCount", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Delayed greeting (callback style)\n\n  Many APIs take a callback: “when ready, call this with the result.” Here you return a Promise that resolves to **`\"Hello, \" + name`** after **`setTimeout`** (delay 0 is fine).\n\n  ## Example\n\n  ```javascript\n  // After the timer: result is \"Hello, Alice\"\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateDelayedGreeting(\"Alice\") | \"Hello, Alice\" |\n  | simulateDelayedGreeting(\"Bob\") | \"Hello, Bob\" |\n  | simulateDelayedGreeting(\"Charlie\") | \"Hello, Charlie\" |\n*/\n\nfunction simulateDelayedGreeting(name) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateDelayedGreeting",
      "reference_solution": "function simulateDelayedGreeting(name) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve('Hello, ' + name), 0);\n  });\n}",
      "testCases": [
        { "input": { "name": "Alice" }, "expectedOutput": "Hello, Alice", "requirePromise": true },
        { "input": { "name": "Bob" }, "expectedOutput": "Hello, Bob", "requirePromise": true },
        { "input": { "name": "Charlie" }, "expectedOutput": "Hello, Charlie", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Async iteration over an array\n\n  Process **`arr` one element per timer tick**: each value becomes a line in the result. Do **not** use `arr.join('\\n')` alone in one sync step—the grader expects **setTimeout** between steps.\n\n  ## Example\n\n  - simulateProcessArray([1, 2, 3]) →\n\n  ```\n  1\n  2\n  3\n  ```\n\n  ## What happens\n\n  - Index 0: push `\"1\"`, schedule next tick.\n  - Repeat until all elements are consumed, then resolve.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | [1,2,3] | \"1\\n2\\n3\" |\n  | [5,10] | \"5\\n10\" |\n  | [7] | \"7\" |\n*/\n\nfunction simulateProcessArray(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateProcessArray",
      "reference_solution": "function simulateProcessArray(arr) {\n  return new Promise((resolve) => {\n    const lines = [];\n    let i = 0;\n    function next() {\n      if (i >= arr.length) return resolve(lines.join('\\n'));\n      lines.push(String(arr[i++]));\n      setTimeout(next, 0);\n    }\n    next();\n  });\n}",
      "testCases": [
        { "input": { "arr": [1, 2, 3] }, "expectedOutput": "1\n2\n3", "requirePromise": true },
        { "input": { "arr": [5, 10] }, "expectedOutput": "5\n10", "requirePromise": true },
        { "input": { "arr": [7] }, "expectedOutput": "7", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Nested timers (“callback hell”)\n\n  Three async steps in a row are often written as **nested `setTimeout` callbacks**. Return a Promise that resolves to **exactly**:\n\n  ```\n  Step 1\n  Step 2\n  Step 3\n  ```\n\n  ## What happens\n\n  - Outer timer runs → append first line → schedule middle timer → append second → schedule inner → append third → **resolve**.\n\n  ## Test cases (grader)\n\n  - simulateCallbackHell() → the three-line string above\n*/\n\nfunction simulateCallbackHell() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateCallbackHell",
      "reference_solution": "function simulateCallbackHell() {\n  return new Promise((resolve) => {\n    let s = '';\n    setTimeout(() => {\n      s += 'Step 1\\n';\n      setTimeout(() => {\n        s += 'Step 2\\n';\n        setTimeout(() => {\n          s += 'Step 3';\n          resolve(s);\n        }, 0);\n      }, 0);\n    }, 0);\n  });\n}",
      "testCases": [
        { "input": {}, "expectedOutput": "Step 1\nStep 2\nStep 3", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## clearTimeout\n\n  **`clearTimeout(id)`** cancels a pending timer. If you cancel before the callback runs, the Promise should fulfill with **`\"Cancelled\"`**. If you don’t cancel, it should fulfill with **`\"Executed\"`** after the timer.\n\n  ## Example (cancel path)\n\n  ```javascript\n  const id = setTimeout(() => resolve(\"Executed\"), 30);\n  clearTimeout(id);\n  resolve(\"Cancelled\");  // user sees Cancelled\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateTimeoutCancellation(true) | \"Cancelled\" |\n  | simulateTimeoutCancellation(false) | \"Executed\" |\n*/\n\nfunction simulateTimeoutCancellation(shouldCancel) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateTimeoutCancellation",
      "reference_solution": "function simulateTimeoutCancellation(shouldCancel) {\n  return new Promise((resolve) => {\n    const id = setTimeout(() => resolve('Executed'), 30);\n    if (shouldCancel) {\n      clearTimeout(id);\n      resolve('Cancelled');\n    }\n  });\n}",
      "testCases": [
        { "input": { "shouldCancel": true }, "expectedOutput": "Cancelled", "requirePromise": true },
        { "input": { "shouldCancel": false }, "expectedOutput": "Executed", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Three chained async steps\n\n  Like the callback-hell task, but the payload is the digits **1**, **2**, **3** (each on its own line), built across **three nested `setTimeout` levels**.\n\n  ## Expected output\n\n  ```\n  1\n  2\n  3\n  ```\n\n  ## Test cases (grader)\n\n  - demonstrateExecutionOrder() → `\"1\\n2\\n3\"`\n*/\n\nfunction demonstrateExecutionOrder() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "demonstrateExecutionOrder",
      "reference_solution": "function demonstrateExecutionOrder() {\n  return new Promise((resolve) => {\n    let s = '';\n    setTimeout(() => {\n      s += '1\\n';\n      setTimeout(() => {\n        s += '2\\n';\n        setTimeout(() => {\n          s += '3';\n          resolve(s);\n        }, 0);\n      }, 0);\n    }, 0);\n  });\n}",
      "testCases": [
        { "input": {}, "expectedOutput": "1\n2\n3", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Repeat with a delay argument\n\n  Return **`message` repeated `times` times** (newline-separated). Use **`setTimeout(..., interval)`** between repeats so the **`interval`** argument (milliseconds) is meaningful. Tests use **`interval: 0`** for speed.\n\n  ## Example\n\n  - simulateRepeat(\"Hello\", 3, 0) →\n\n  ```\n  Hello\n  Hello\n  Hello\n  ```\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateRepeat(\"Hello\", 3, 0) | three \"Hello\" lines |\n  | simulateRepeat(\"Test\", 2, 0) | two \"Test\" lines |\n*/\n\nfunction simulateRepeat(message, times, interval) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateRepeat",
      "reference_solution": "function simulateRepeat(message, times, interval) {\n  return new Promise((resolve) => {\n    const parts = [];\n    let c = 0;\n    function tick() {\n      if (c >= times) return resolve(parts.join('\\n'));\n      parts.push(message);\n      c++;\n      setTimeout(tick, interval);\n    }\n    tick();\n  });\n}",
      "testCases": [
        { "input": { "message": "Hello", "times": 3, "interval": 0 }, "expectedOutput": "Hello\nHello\nHello", "requirePromise": true },
        { "input": { "message": "Test", "times": 2, "interval": 0 }, "expectedOutput": "Test\nTest", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Fake “fetch”\n\n  Network calls return later. Return a Promise that resolves to **`data.name`** after **`setTimeout`** (e.g. 0 ms), as if data arrived asynchronously.\n\n  ## Example\n\n  ```javascript\n  // simulateFetchData({ id: 1, name: \"User\" }) → \"User\"\n  ```\n\n  ## Test cases (grader)\n\n  | Input `data` | Result |\n  |--------------|--------|\n  | { id: 1, name: \"User\" } | \"User\" |\n  | { id: 2, name: \"Alice\" } | \"Alice\" |\n  | { id: 3, name: \"Bob\" } | \"Bob\" |\n*/\n\nfunction simulateFetchData(data) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateFetchData",
      "reference_solution": "function simulateFetchData(data) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(data.name), 0);\n  });\n}",
      "testCases": [
        { "input": { "data": { "id": 1, "name": "User" } }, "expectedOutput": "User", "requirePromise": true },
        { "input": { "data": { "id": 2, "name": "Alice" } }, "expectedOutput": "Alice", "requirePromise": true },
        { "input": { "data": { "id": 3, "name": "Bob" } }, "expectedOutput": "Bob", "requirePromise": true }
      ]
    },
    {
      "description": "/*\n  ## Stopwatch ticks\n\n  Build lines **`1`** through **`maxSeconds`** (one per async tick), then a final line **`Stopped`**.\n\n  ## Example\n\n  - simulateStopwatch(3) →\n\n  ```\n  1\n  2\n  3\n  Stopped\n  ```\n\n  ## What happens\n\n  - Each `setTimeout` tick appends the next second; after `maxSeconds`, append **Stopped** and resolve.\n\n  ## Test cases (grader)\n\n  | Call | Result |\n  |------|--------|\n  | simulateStopwatch(5) | \"1\"..\"5\" then \"Stopped\" |\n  | simulateStopwatch(3) | \"1\"..\"3\" then \"Stopped\" |\n*/\n\nfunction simulateStopwatch(maxSeconds) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateStopwatch",
      "reference_solution": "function simulateStopwatch(maxSeconds) {\n  return new Promise((resolve) => {\n    const parts = [];\n    let n = 0;\n    function tick() {\n      n++;\n      if (n <= maxSeconds) {\n        parts.push(String(n));\n        setTimeout(tick, 0);\n      } else {\n        parts.push('Stopped');\n        resolve(parts.join('\\n'));\n      }\n    }\n    tick();\n  });\n}",
      "testCases": [
        { "input": { "maxSeconds": 5 }, "expectedOutput": "1\n2\n3\n4\n5\nStopped", "requirePromise": true },
        { "input": { "maxSeconds": 3 }, "expectedOutput": "1\n2\n3\nStopped", "requirePromise": true }
      ]
    }
  ]
};
