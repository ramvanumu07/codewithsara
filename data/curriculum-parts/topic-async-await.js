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
    "Let's use async and await.\n\nAn **async function** is a function that **returns a Promise**. You declare it with **async function name() { }** or **async () => { }**. Inside an **async** function you can use **await**: **await promise** pauses the function until the promise **settles**, then evaluates to the **value** (if fulfilled) or **throws** (if rejected). So you write sequential-looking code: **const v = await fetchData();** — no .then() chains. **await is only valid inside an async function** (or top-level in modules); in a normal function you get a syntax error. Use async/await when you want to work with promises in a linear, readable way.\n\n## Example\n\n```javascript\nasync function run() {\n  const v = await Promise.resolve(42);\n  console.log(v);\n}\nrun();\n```\n\n## Output\n\n```\n42\n```\n\n## What happens\n\n- run is async, so run() returns a promise. Inside run, await Promise.resolve(42) pauses until the promise fulfills, then v gets 42.\n- The caller could do run().then(...) or await run() from another async function. You cannot use await in a non-async function.\n\n## Practice\n\nWhat type does async function f() { return 'hi'; } return when you call f()? Can you use await inside a normal (non-async) function? You need to await fetch(url)—what must you add to the function declaration?",
    "Let's see what async returns.\n\nAn **async function always returns a Promise**. If you **return value**, the promise **fulfills** with that value (as if Promise.resolve(value)). If you **throw**, the promise **rejects**. If you **return** an existing **promise**, that promise is not double-wrapped—the async function's promise follows it. So the **caller** always gets a **promise**; they must **await** it or use **.then()** to get the value. That's why you can **await an async function**: it already returns a promise.\n\n## Example\n\n```javascript\nasync function getValue() { return 10; }\ngetValue().then(function(v) { console.log(v); });\n```\n\n## Output\n\n```\n10\n```\n\n## What happens\n\n- getValue() returns a promise that fulfills with 10. The caller uses .then() to get 10. If the caller were async, they could do const x = await getValue(); and x would be 10.\n- If you had async function f() { return fetch(url); }, f() returns that fetch promise; await f() gives you the fetch result.\n\n## Practice\n\nIn async function f() { return fetch(url); }, what does f() return? What does await f() give you?",
    "Let's use try/catch with async.\n\nInside an **async** function you can use **try/catch** around **await**. If the awaited promise **rejects**, the **catch** block runs with the rejection reason (the error). So you get the same style as synchronous code: try { const data = await fetchData(); } catch (e) { console.error(e); }. **One try/catch** can cover **multiple** awaits. If you don't catch, the rejection becomes an **unhandled rejection** or propagates to the caller's await/catch. Use try/catch in async functions to handle errors in one place instead of a .catch() on every promise.\n\n## Example\n\n```javascript\nasync function safe() {\n  try {\n    const v = await Promise.reject('oops');\n  } catch (e) {\n    console.log(e);\n  }\n}\nsafe();\n```\n\n## Output\n\n```\noops\n```\n\n## What happens\n\n- Promise.reject('oops') rejects. await throws the reason, so execution goes to catch and e is 'oops'.\n- If you had three awaits and the second rejected, execution would jump to catch; the third await would not run. Handle the error in catch (e.g. log, return fallback, or rethrow).\n\n## Practice\n\nYou await three operations in sequence. If the second one rejects, where does execution go? How do you handle it?",
    "Let's compare sequential vs parallel awaits.\n\n**Sequential**: **await a; await b;** — you wait for a to finish, then start b. Total time is roughly **time(a) + time(b)**. Use this when step B **depends** on the result of step A. **Parallel**: when steps **don't depend** on each other, start **both** and then wait: **const [x, y] = await Promise.all([fetchA(), fetchB()]);** — total time is roughly **max(time(a), time(b))**. So use **Promise.all** when you have several independent async operations and want to wait for all; use **sequential await** when each step needs the previous result. Avoid awaiting in a loop when you could start all and Promise.all—otherwise you wait one-by-one.\n\n## Example\n\n```javascript\nasync function parallel() {\n  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);\n  console.log(a + b);\n}\nparallel();\n```\n\n## Output\n\n```\n3\n```\n\n## What happens\n\n- Both promises are created and run; Promise.all waits for both. We get 1 and 2, then log 3. If we had done await Promise.resolve(1); await Promise.resolve(2); we'd still get 3 but the pattern is for when each step takes time—parallel runs them at the same time.\n\n## Practice\n\nYou need to fetch from url1 and url2; you don't need url2's result before starting url1. Should you await fetch(url1) then await fetch(url2), or use Promise.all? Why?",
    "**async arrow functions**\n\nYou can use **async** with **arrow functions**: **const f = async () => { };** or **async (x) => { return await g(x); }**. Same rules: the function **returns a promise**; you can **await** inside it. Use async arrow functions when you need an **async callback** (e.g. event handler, or .map() that does async work). Note: if you pass an async callback to something that **doesn't wait** for promises (e.g. forEach), the caller won't wait for your async work—use async callbacks where the caller awaits or uses the returned promises (e.g. **Promise.all(arr.map(async (x) => ...))**).\n\n## Example\n\n```javascript\nconst double = async function(n) { return (await Promise.resolve(n)) * 2; };\ndouble(5).then(function(v) { console.log(v); });\n```\n\n## Output\n\n```\n10\n```\n\n## What happens\n\n- double is an async function; double(5) returns a promise. Inside, await Promise.resolve(n) gives 5, then we return 10, so the promise fulfills with 10.\n- The caller uses .then() to get 10. When called, an async function always returns a promise, not the raw value.\n\n## Practice\n\nWrite an async arrow function that takes n and returns the result of await Promise.resolve(n * 2). What does it return when called—a value or a promise?",
    "**Error propagation**\n\nIf you **throw** or **await a rejected promise** inside an async function and **don't catch**, the function's **returned promise rejects**. The **caller** can handle it: with **.catch()** on the returned promise, or by **awaiting** inside a **try/catch** in another async function. So errors **bubble up**: async f calls await g(), g throws → g's promise rejects → if f doesn't have try/catch around await g(), f's promise rejects → f's caller can catch. Same idea as promise chains: rejection propagates until a .catch() or try/catch handles it. Use try/catch (or .catch()) at the level where you can handle the error (e.g. show a message, retry); let others bubble if they can't.\n\n## Example\n\n```javascript\nasync function g() { throw new Error('fail'); }\nasync function f() { await g(); }\nf().catch(function(e) { console.log(e.message); });\n```\n\n## Output\n\n```\nfail\n```\n\n## What happens\n\n- g() throws; g's returned promise rejects. f() awaits g(), so the rejection propagates and f's promise rejects. f() has no try/catch, so the error bubbles to the caller.\n- The caller's .catch() receives the error and logs the message. So: g → f → caller's .catch().\n\n## Practice\n\nasync a() calls await b(), and b() throws. Who can catch the error—a, b, or the code that called a()? If a() doesn't have try/catch, what happens to a()'s return value?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that simulates async function behavior.\n  Return the value that would be resolved by the async function.\n  Examples:\n    simulateAsyncFunction(\"Hello\") => \"Hello\"\n    simulateAsyncFunction(\"World\") => \"World\"\n    simulateAsyncFunction(\"Test\") => \"Test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncFunction(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncFunction",
      "reference_solution": "function simulateAsyncFunction(value) {\n  return value;\n}",
      "testCases": [
        {
          "input": {
            "value": "Hello"
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "value": "World"
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "value": "Test"
          },
          "expectedOutput": "Test"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates await behavior.\n  Return the value that would be awaited and printed.\n  Examples:\n    simulateAwait(\"Data\") => \"Data\"\n    simulateAwait(\"Result\") => \"Result\"\n    simulateAwait(\"Info\") => \"Info\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAwait(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAwait",
      "reference_solution": "function simulateAwait(value) {\n  return value;\n}",
      "testCases": [
        {
          "input": {
            "value": "Data"
          },
          "expectedOutput": "Data"
        },
        {
          "input": {
            "value": "Result"
          },
          "expectedOutput": "Result"
        },
        {
          "input": {
            "value": "Info"
          },
          "expectedOutput": "Info"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates sequential async operations.\n  Return the sum of both values.\n  Examples:\n    simulateSequentialAsync(5, 10) => 15\n    simulateSequentialAsync(20, 30) => 50\n    simulateSequentialAsync(7, 3) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialAsync(value1, value2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSequentialAsync",
      "reference_solution": "function simulateSequentialAsync(value1, value2) {\n  return value1 + value2;\n}",
      "testCases": [
        {
          "input": {
            "value1": 5,
            "value2": 10
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "value1": 20,
            "value2": 30
          },
          "expectedOutput": "50"
        },
        {
          "input": {
            "value1": 7,
            "value2": 3
          },
          "expectedOutput": "10"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async error handling.\n  Return the error message that would be caught.\n  Examples:\n    simulateAsyncErrorHandling(\"Error occurred\") => \"Error occurred\"\n    simulateAsyncErrorHandling(\"Failed\") => \"Failed\"\n    simulateAsyncErrorHandling(\"Not found\") => \"Not found\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncErrorHandling(error) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncErrorHandling",
      "reference_solution": "function simulateAsyncErrorHandling(error) {\n  return error;\n}",
      "testCases": [
        {
          "input": {
            "error": "Error occurred"
          },
          "expectedOutput": "Error occurred"
        },
        {
          "input": {
            "error": "Failed"
          },
          "expectedOutput": "Failed"
        },
        {
          "input": {
            "error": "Not found"
          },
          "expectedOutput": "Not found"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates sequential async execution.\n  Return the values sequence as a string with newlines.\n  Examples:\n    simulateSequentialExecution([\"First\", \"Second\", \"Third\"]) => \"First\\nSecond\\nThird\"\n    simulateSequentialExecution([\"A\", \"B\", \"C\"]) => \"A\\nB\\nC\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialExecution(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSequentialExecution",
      "reference_solution": "function simulateSequentialExecution(values) {\n  return values.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "values": [
              "First",
              "Second",
              "Third"
            ]
          },
          "expectedOutput": "First\nSecond\nThird"
        },
        {
          "input": {
            "values": [
              "A",
              "B",
              "C"
            ]
          },
          "expectedOutput": "A\nB\nC"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates parallel async execution.\n  Return the sum of both values.\n  Examples:\n    simulateParallelExecution(10, 20) => 30\n    simulateParallelExecution(5, 15) => 20\n    simulateParallelExecution(100, 200) => 300\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateParallelExecution(value1, value2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateParallelExecution",
      "reference_solution": "function simulateParallelExecution(value1, value2) {\n  return value1 + value2;\n}",
      "testCases": [
        {
          "input": {
            "value1": 10,
            "value2": 20
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "value1": 5,
            "value2": 15
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "value1": 100,
            "value2": 200
          },
          "expectedOutput": "300"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async arrow function.\n  Return the value that would be awaited.\n  Examples:\n    simulateAsyncArrow(\"Arrow\") => \"Arrow\"\n    simulateAsyncArrow(\"Function\") => \"Function\"\n    simulateAsyncArrow(\"Async\") => \"Async\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst simulateAsyncArrow = (value) => {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncArrow",
      "reference_solution": "function simulateAsyncArrow(value) {\n  return value;\n}",
      "testCases": [
        {
          "input": {
            "value": "Arrow"
          },
          "expectedOutput": "Arrow"
        },
        {
          "input": {
            "value": "Function"
          },
          "expectedOutput": "Function"
        },
        {
          "input": {
            "value": "Async"
          },
          "expectedOutput": "Async"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async data processing.\n  Return the name property from the data object.\n  Examples:\n    simulateAsyncDataProcessing({id: 1, name: \"User\"}) => \"User\"\n    simulateAsyncDataProcessing({id: 2, name: \"Alice\"}) => \"Alice\"\n    simulateAsyncDataProcessing({id: 3, name: \"Bob\"}) => \"Bob\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncDataProcessing(data) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncDataProcessing",
      "reference_solution": "function simulateAsyncDataProcessing(data) {\n  return data.name;\n}",
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
      "description": "/*\n  Implement the below function that simulates async try-catch-finally.\n  Return the result and cleanup message as a string with newlines.\n  Examples:\n    simulateAsyncTryCatchFinally(\"Success\") => \"Success\\nCleanup\"\n    simulateAsyncTryCatchFinally(\"Done\") => \"Done\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncTryCatchFinally(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncTryCatchFinally",
      "reference_solution": "function simulateAsyncTryCatchFinally(value) {\n  return value + '\\nCleanup';\n}",
      "testCases": [
        {
          "input": {
            "value": "Success"
          },
          "expectedOutput": "Success\nCleanup"
        },
        {
          "input": {
            "value": "Done"
          },
          "expectedOutput": "Done\nCleanup"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates chained async operations.\n  Perform: double the initial value, then add 10.\n  Examples:\n    simulateChainedAsync(5) => 20\n    simulateChainedAsync(10) => 30\n    simulateChainedAsync(3) => 16\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateChainedAsync(initial) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateChainedAsync",
      "reference_solution": "function simulateChainedAsync(initial) {\n  return initial * 2 + 10;\n}",
      "testCases": [
        {
          "input": {
            "initial": 5
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "initial": 10
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "initial": 3
          },
          "expectedOutput": "16"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async user and posts fetching.\n  Return the posts array as a JSON string.\n  Examples:\n    simulateAsyncUserPosts(1, [\"Post1\", \"Post2\"]) => \"[\\\"Post1\\\",\\\"Post2\\\"]\"\n    simulateAsyncUserPosts(2, [\"Article1\", \"Article2\"]) => \"[\\\"Article1\\\",\\\"Article2\\\"]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncUserPosts(userId, posts) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncUserPosts",
      "reference_solution": "function simulateAsyncUserPosts(userId, posts) {\n  return JSON.stringify(posts);\n}",
      "testCases": [
        {
          "input": {
            "userId": 1,
            "posts": [
              "Post1",
              "Post2"
            ]
          },
          "expectedOutput": "[\"Post1\",\"Post2\"]"
        },
        {
          "input": {
            "userId": 2,
            "posts": [
              "Article1",
              "Article2"
            ]
          },
          "expectedOutput": "[\"Article1\",\"Article2\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates nested error handling.\n  Return the final error message that would be caught.\n  Examples:\n    simulateNestedErrorHandling() => \"Failed to fetch data\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateNestedErrorHandling() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateNestedErrorHandling",
      "reference_solution": "function simulateNestedErrorHandling() {\n  return 'Failed to fetch data';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Failed to fetch data"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async Promise.race().\n  Return the faster value (first parameter).\n  Examples:\n    simulateAsyncRace(\"Fast\", \"Slow\") => \"Fast\"\n    simulateAsyncRace(\"Quick\", \"Delayed\") => \"Quick\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncRace(fast, slow) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncRace",
      "reference_solution": "function simulateAsyncRace(fast, slow) {\n  return fast;\n}",
      "testCases": [
        {
          "input": {
            "fast": "Fast",
            "slow": "Slow"
          },
          "expectedOutput": "Fast"
        },
        {
          "input": {
            "fast": "Quick",
            "slow": "Delayed"
          },
          "expectedOutput": "Quick"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async validation.\n  Return \"Invalid number\" if number is negative, otherwise return number * 2.\n  Examples:\n    simulateAsyncValidation(-5) => \"Invalid number\"\n    simulateAsyncValidation(10) => 20\n    simulateAsyncValidation(-1) => \"Invalid number\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncValidation(number) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncValidation",
      "reference_solution": "function simulateAsyncValidation(number) {\n  return number < 0 ? 'Invalid number' : number * 2;\n}",
      "testCases": [
        {
          "input": {
            "number": -5
          },
          "expectedOutput": "Invalid number"
        },
        {
          "input": {
            "number": 10
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "number": -1
          },
          "expectedOutput": "Invalid number"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates async array processing.\n  Return the sum of all values in the array.\n  Examples:\n    simulateAsyncArrayProcessing([1, 2, 3]) => 6\n    simulateAsyncArrayProcessing([5, 10, 15]) => 30\n    simulateAsyncArrayProcessing([2, 4, 6, 8]) => 20\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncArrayProcessing(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAsyncArrayProcessing",
      "reference_solution": "function simulateAsyncArrayProcessing(values) {\n  return values.reduce((a, b) => a + b, 0);\n}",
      "testCases": [
        {
          "input": {
            "values": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "values": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "values": [
              2,
              4,
              6,
              8
            ]
          },
          "expectedOutput": "20"
        }
      ]
    }
  ]
};
