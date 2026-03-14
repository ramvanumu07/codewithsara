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
      "description": "/*\n  Implement the below function that simulates setTimeout behavior.\n  Return the message that would be printed after the delay.\n  Examples:\n    simulateTimeout(\"Hello\", 1000) => \"Hello\"\n    simulateTimeout(\"World\", 1000) => \"World\"\n    simulateTimeout(\"Test\", 500) => \"Test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateTimeout(message, delay) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateTimeout",
      "reference_solution": "function simulateTimeout(message, delay) {\n  return message;\n}",
      "testCases": [
        {
          "input": {
            "message": "Hello",
            "delay": 1000
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "message": "World",
            "delay": 1000
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "message": "Test",
            "delay": 500
          },
          "expectedOutput": "Test"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates event loop execution order.\n  Return the execution order as a string with newlines.\n  Examples:\n    simulateEventLoop() => \"Start\\nEnd\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateEventLoop() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateEventLoop",
      "reference_solution": "function simulateEventLoop() {\n  return 'Start\\nEnd';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Start\nEnd"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates countdown with setTimeout.\n  Return the countdown sequence as a string with newlines.\n  Examples:\n    simulateCountdown(3) => \"3\\n2\\n1\"\n    simulateCountdown(2) => \"2\\n1\"\n    simulateCountdown(5) => \"5\\n4\\n3\\n2\\n1\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateCountdown(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateCountdown",
      "reference_solution": "function simulateCountdown(n) {\n  let s = '';\n  for (let i = n; i >= 1; i--) s += (s ? '\\n' : '') + i;\n  return s;\n}",
      "testCases": [
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "3\n2\n1"
        },
        {
          "input": {
            "n": 2
          },
          "expectedOutput": "2\n1"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "5\n4\n3\n2\n1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates setInterval behavior.\n  Return the repeated message as a string with newlines.\n  Examples:\n    simulateInterval(\"Tick\", 3) => \"Tick\\nTick\\nTick\"\n    simulateInterval(\"Test\", 2) => \"Test\\nTest\"\n    simulateInterval(\"Count\", 4) => \"Count\\nCount\\nCount\\nCount\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateInterval(message, times) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateInterval",
      "reference_solution": "function simulateInterval(message, times) {\n  return Array(times).fill(message).join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "message": "Tick",
            "times": 3
          },
          "expectedOutput": "Tick\nTick\nTick"
        },
        {
          "input": {
            "message": "Test",
            "times": 2
          },
          "expectedOutput": "Test\nTest"
        },
        {
          "input": {
            "message": "Count",
            "times": 4
          },
          "expectedOutput": "Count\nCount\nCount\nCount"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates delayed greeting with callback.\n  Return the greeting message that would be passed to the callback.\n  Examples:\n    simulateDelayedGreeting(\"Alice\") => \"Hello, Alice\"\n    simulateDelayedGreeting(\"Bob\") => \"Hello, Bob\"\n    simulateDelayedGreeting(\"Charlie\") => \"Hello, Charlie\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateDelayedGreeting(name) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateDelayedGreeting",
      "reference_solution": "function simulateDelayedGreeting(name) {\n  return 'Hello, ' + name;\n}",
      "testCases": [
        {
          "input": {
            "name": "Alice"
          },
          "expectedOutput": "Hello, Alice"
        },
        {
          "input": {
            "name": "Bob"
          },
          "expectedOutput": "Hello, Bob"
        },
        {
          "input": {
            "name": "Charlie"
          },
          "expectedOutput": "Hello, Charlie"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates array processing with callbacks.\n  Return the processed array elements as a string with newlines.\n  Examples:\n    simulateProcessArray([1, 2, 3]) => \"1\\n2\\n3\"\n    simulateProcessArray([5, 10]) => \"5\\n10\"\n    simulateProcessArray([7]) => \"7\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateProcessArray(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateProcessArray",
      "reference_solution": "function simulateProcessArray(arr) {\n  return arr.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "1\n2\n3"
        },
        {
          "input": {
            "arr": [
              5,
              10
            ]
          },
          "expectedOutput": "5\n10"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "7"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates callback hell pattern.\n  Return the nested callback execution sequence as a string with newlines.\n  Examples:\n    simulateCallbackHell() => \"Step 1\\nStep 2\\nStep 3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateCallbackHell() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateCallbackHell",
      "reference_solution": "function simulateCallbackHell() {\n  return 'Step 1\\nStep 2\\nStep 3';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Step 1\nStep 2\nStep 3"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates timeout cancellation.\n  Return \"Cancelled\" if shouldCancel is true, otherwise \"Executed\".\n  Examples:\n    simulateTimeoutCancellation(true) => \"Cancelled\"\n    simulateTimeoutCancellation(false) => \"Executed\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateTimeoutCancellation(shouldCancel) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateTimeoutCancellation",
      "reference_solution": "function simulateTimeoutCancellation(shouldCancel) {\n  return shouldCancel ? 'Cancelled' : 'Executed';\n}",
      "testCases": [
        {
          "input": {
            "shouldCancel": true
          },
          "expectedOutput": "Cancelled"
        },
        {
          "input": {
            "shouldCancel": false
          },
          "expectedOutput": "Executed"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates JavaScript execution order.\n  Return the execution sequence as a string with newlines.\n  Examples:\n    demonstrateExecutionOrder() => \"1\\n2\\n3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction demonstrateExecutionOrder() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "demonstrateExecutionOrder",
      "reference_solution": "function demonstrateExecutionOrder() {\n  return '1\\n2\\n3';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "1\n2\n3"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates repeated execution with interval.\n  Return the repeated message as a string with newlines.\n  Examples:\n    simulateRepeat(\"Hello\", 3, 1000) => \"Hello\\nHello\\nHello\"\n    simulateRepeat(\"Test\", 2, 500) => \"Test\\nTest\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateRepeat(message, times, interval) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateRepeat",
      "reference_solution": "function simulateRepeat(message, times, interval) {\n  return Array(times).fill(message).join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "message": "Hello",
            "times": 3,
            "interval": 1000
          },
          "expectedOutput": "Hello\nHello\nHello"
        },
        {
          "input": {
            "message": "Test",
            "times": 2,
            "interval": 500
          },
          "expectedOutput": "Test\nTest"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async data fetching.\n  Return the name property from the provided data object.\n  Examples:\n    simulateFetchData({id: 1, name: \"User\"}) => \"User\"\n    simulateFetchData({id: 2, name: \"Alice\"}) => \"Alice\"\n    simulateFetchData({id: 3, name: \"Bob\"}) => \"Bob\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateFetchData(data) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateFetchData",
      "reference_solution": "function simulateFetchData(data) {\n  return data.name;\n}",
      "testCases": [
        {
          "input": {
            "data": {
              "id": 1,
              "name": "User"
            }
          },
          "expectedOutput": "User"
        },
        {
          "input": {
            "data": {
              "id": 2,
              "name": "Alice"
            }
          },
          "expectedOutput": "Alice"
        },
        {
          "input": {
            "data": {
              "id": 3,
              "name": "Bob"
            }
          },
          "expectedOutput": "Bob"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates a stopwatch.\n  Return the counting sequence with \"Stopped\" at the end as a string with newlines.\n  Examples:\n    simulateStopwatch(5) => \"1\\n2\\n3\\n4\\n5\\nStopped\"\n    simulateStopwatch(3) => \"1\\n2\\n3\\nStopped\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateStopwatch(maxSeconds) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateStopwatch",
      "reference_solution": "function simulateStopwatch(maxSeconds) {\n  let s = '';\n  for (let i = 1; i <= maxSeconds; i++) s += (s ? '\\n' : '') + i;\n  return s + (s ? '\\n' : '') + 'Stopped';\n}",
      "testCases": [
        {
          "input": {
            "maxSeconds": 5
          },
          "expectedOutput": "1\n2\n3\n4\n5\nStopped"
        },
        {
          "input": {
            "maxSeconds": 3
          },
          "expectedOutput": "1\n2\n3\nStopped"
        }
      ]
    }
  ]
};
