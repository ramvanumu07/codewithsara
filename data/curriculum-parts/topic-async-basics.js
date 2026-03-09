/** Topic: Callbacks, timers, and async concepts (async-basics) */
export default {
  "id": "async-basics",
  "title": "Callbacks, timers, and async concepts",
  "outcomes": [
    "Execution Models: Synchronous vs. Asynchronous",
    "The Single Thread: Why JS can only do one thing at a time",
    "The Event Loop: Managing the Task Queue",
    "Timer Logic: setTimeout() and setInterval() Syntax",
    "Resource Management: Clearing Timers (clearTimeout/clearInterval)",
    "Callback Pattern: Passing logic to the future",
    "Control Flow: Understanding Non-blocking Execution Order",
    "Callback Hell: The limitation of nested callbacks",
    "Evolution: Why we need Promises"
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
