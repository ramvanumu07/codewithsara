/** Topic: Creating and consuming promises (promises) */
export default {
  "id": "promises",
  "title": "Creating and consuming promises",
  "outcomes": [
    "What a Promise Is",
    "Creating Promises: resolve and reject",
    ".then() and .catch()",
    "Chaining and Returning from .then()",
    ".finally()",
    "Promise.all() and Promise.allSettled()",
    "Promise.race()"
  ],
  "outcome_messages": [
    "Let's understand what a Promise is.\n\nA **Promise** is an object that represents a **future value** (or error). It is in one of three **states**: **pending** (work not done yet), **fulfilled** (success, has a value), or **rejected** (failure, has a reason). Once **settled** (fulfilled or rejected), the state does **not** change. You don't read the value or reason directly—you use **.then()** or **.catch()** to run code when the promise settles. Pending means the async work is still in progress; when it finishes, the promise is settled and your handlers run.\n\n## Example\n\n```javascript\nconst p = new Promise(function(resolve) {\n  setTimeout(function() {\n    resolve(42);\n  }, 100);\n});\np.then(function(v) { console.log(v); });\n```\n\n## Output\n\n```\n(about 100 ms later)\n42\n```\n\n## What happens\n\n- The promise starts pending. After 100 ms, resolve(42) is called and the promise becomes fulfilled with 42.\n- .then() runs when the promise settles and receives the value 42. You can't \"go back\" to pending once it's settled.\n\n## Practice\n\nIn the example, can the promise go from fulfilled back to pending once resolve(42) is called? Why?",
    "Let's create promises with resolve and reject.\n\n**new Promise(function(resolve, reject) { })** creates a promise. Call **resolve(value)** to **fulfill** it with that value. Call **reject(reason)** to **reject** it (reason is often an Error). You usually call one of them inside async work (e.g. in a setTimeout callback or after a request). Call **only one**—the first call wins; later resolve/reject are ignored. For values you already have, use **Promise.resolve(x)** or **Promise.reject(e)** instead of the constructor.\n\n## Example\n\n```javascript\nconst p = new Promise(function(resolve, reject) {\n  setTimeout(function() {\n    resolve('done');\n  }, 50);\n});\np.then(function(v) { console.log(v); });\n```\n\n## Output\n\n```\ndone\n```\n\n## What happens\n\n- The constructor runs; we schedule a callback that will call resolve('done') after 50 ms.\n- When resolve is called, the promise settles as fulfilled with 'done'. The .then() handler runs and logs it. If we had called reject('error'), the promise would be rejected and we'd need .catch() to handle it.\n\n## Practice\n\nIn the example, when is resolve('done') called?",
    "Let's handle results with .then() and .catch().\n\n**promise.then(onFulfilled)** runs **onFulfilled** when the promise is **fulfilled**, and receives the value. **promise.catch(onRejected)** runs **onRejected** when the promise is **rejected**, and receives the reason. Both **return a new promise**, so you can chain. Use .then() to process the value and .catch() to handle errors. If a promise rejects and you have **no .catch()**, the rejection is **unhandled** (the environment may report it). Always add .catch() (or handle errors in .then's second argument) when you care about failures.\n\n## Example\n\n```javascript\nPromise.resolve(5).then(function(v) {\n  return v * 2;\n}).then(function(v) {\n  console.log(v);\n});\nPromise.reject('oops').catch(function(e) {\n  console.log(e);\n});\n```\n\n## Output\n\n```\n10\noops\n```\n\n## What happens\n\n- First line: resolve(5) fulfills with 5; first .then returns 10; second .then receives 10 and logs it.\n- Second line: reject('oops') rejects; .catch runs and logs 'oops'. Without .catch(), the rejection would be unhandled.\n\n## Practice\n\nIn the example, why do we use .catch() for the second line?",
    "Let's chain and return from .then().\n\n**.then()** always returns a **new promise**. If your callback **returns a value**, that promise is fulfilled with that value and the next .then() receives it. If your callback **returns a promise**, the next .then() waits for that promise and receives its result. If you **don't return**, the next .then() gets **undefined**. So: **return** from .then() when you want to pass a value or another async step to the next link. Chaining gives you sequential async steps without nesting: .then(...).then(...).then(...). Errors propagate—if any step rejects, later .then()s are skipped until a .catch().\n\n## Example\n\n```javascript\nPromise.resolve(2)\n  .then(function(v) {\n    return v * 3;\n  })\n  .then(function(v) {\n    return v + 1;\n  })\n  .then(function(v) {\n    console.log(v);\n  });\n```\n\n## Output\n\n```\n7\n```\n\n## What happens\n\n- Start with 2. First .then returns 6; second .then receives 6 and returns 7; third .then receives 7 and logs it.\n- If we didn't return (e.g. .then(function(v) { console.log(v); })), the next .then() would get undefined.\n\n## Practice\n\nIn the example, why does the second .then() receive 6 and not 2?",
    "Let's run cleanup with .finally().\n\n**promise.finally(callback)** runs **callback** when the promise **settles** (fulfilled or rejected). The callback **does not** receive the value or reason—it's for **cleanup** (e.g. hide a spinner, close a connection). .finally() returns a promise that **mirrors** the original: if the original fulfilled, the returned promise fulfills with the same value; if the original rejected, it rejects with the same reason. So you can chain .then() after .finally() and get the original result. Use finally when you want the same cleanup to run on success and failure.\n\n## Example\n\n```javascript\nPromise.resolve('data')\n  .then(function(v) {\n    console.log(v);\n  })\n  .finally(function() {\n    console.log('cleanup');\n  });\n```\n\n## Output\n\n```\ndata\ncleanup\n```\n\n## What happens\n\n- The promise fulfills with 'data'; .then logs it. .finally runs next (no argument) and logs 'cleanup'.\n- If the promise had rejected, .catch() would run, then .finally() would still run. .finally() does not receive the value or reason.\n\n## Practice\n\nIn the example, does the .finally() callback receive the value 'data'? Why or why not?",
    "Let's wait for multiple promises with Promise.all() and Promise.allSettled().\n\n**Promise.all(array)** returns a promise that **fulfills** when **all** promises in the array fulfill, with an **array of results in the same order**. If **any** promise rejects, Promise.all **rejects** with that reason (fail fast). Use it when you need every result and want to wait for all. **Promise.allSettled(array)** waits for **all** to **settle** (fulfill or reject) and returns an array of **{ status, value }** or **{ status, reason }** for each. Use it when you want every outcome and don't want one rejection to stop the rest.\n\n## Example\n\n```javascript\nPromise.all([Promise.resolve(1), Promise.resolve(2)]).then(function(arr) {\n  console.log(arr);\n});\n```\n\n## Output\n\n```\n[ 1, 2 ]\n```\n\n## What happens\n\n- Both promises fulfill; Promise.all fulfills with [1, 2] in order. If one had rejected, Promise.all would reject with that reason.\n- Promise.allSettled([Promise.resolve(1), Promise.reject('e')]) would fulfill with [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'e' }].\n\n## Practice\n\nIn the example, why does Promise.all give us [1, 2] in that order?",
    "Let's use Promise.race() to settle with the first result.\n\n**Promise.race(array)** returns a promise that **settles** (fulfills or rejects) as soon as the **first** promise in the array settles. You get that first result; the others are ignored. Use it for **timeouts** (race between a fetch and a timer that rejects after 5 seconds) or when you want the **first** of several sources to win. The result can be fulfillment or rejection—whatever settles first.\n\n## Example\n\n```javascript\nconst fast = Promise.resolve('first');\nconst slow = new Promise(function(r) {\n  setTimeout(function() {\n    r('second');\n  }, 100);\n});\nPromise.race([fast, slow]).then(function(v) {\n  console.log(v);\n});\n```\n\n## Output\n\n```\nfirst\n```\n\n## What happens\n\n- fast is already fulfilled; slow will fulfill in 100 ms. The first to settle is fast, so Promise.race fulfills with 'first'. The slow promise still runs but its result is ignored.\n\n## Practice\n\nIn the example, why does the output show 'first' and not 'second'?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that simulates Promise resolution.\n  Return the resolved value that would be printed.\n  Examples:\n    simulatePromiseResolve(\"Success\") => \"Success\"\n    simulatePromiseResolve(\"Done\") => \"Done\"\n    simulatePromiseResolve(\"Complete\") => \"Complete\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseResolve(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseResolve",
      "reference_solution": "function simulatePromiseResolve(value) {\n  return value;\n}",
      "testCases": [
        {
          "input": {
            "value": "Success"
          },
          "expectedOutput": "Success"
        },
        {
          "input": {
            "value": "Done"
          },
          "expectedOutput": "Done"
        },
        {
          "input": {
            "value": "Complete"
          },
          "expectedOutput": "Complete"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise rejection handling.\n  Return the error message that would be caught and printed.\n  Examples:\n    simulatePromiseReject(\"Error occurred\") => \"Error occurred\"\n    simulatePromiseReject(\"Failed\") => \"Failed\"\n    simulatePromiseReject(\"Not found\") => \"Not found\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseReject(error) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseReject",
      "reference_solution": "function simulatePromiseReject(error) {\n  return error;\n}",
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
      "description": "/*\n  Implement the below function that simulates Promise chaining with value transformation.\n  Return the doubled value that would result from the chain.\n  Examples:\n    simulatePromiseChain(5) => 10\n    simulatePromiseChain(10) => 20\n    simulatePromiseChain(7) => 14\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseChain(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseChain",
      "reference_solution": "function simulatePromiseChain(value) {\n  return value * 2;\n}",
      "testCases": [
        {
          "input": {
            "value": 5
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "value": 10
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "value": 7
          },
          "expectedOutput": "14"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise with finally block.\n  Return the output sequence as a string with newlines.\n  Examples:\n    simulatePromiseFinally(\"Data\") => \"Data\\nCleanup\"\n    simulatePromiseFinally(\"Result\") => \"Result\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseFinally(value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseFinally",
      "reference_solution": "function simulatePromiseFinally(value) {\n  return value + '\\nCleanup';\n}",
      "testCases": [
        {
          "input": {
            "value": "Data"
          },
          "expectedOutput": "Data\nCleanup"
        },
        {
          "input": {
            "value": "Result"
          },
          "expectedOutput": "Result\nCleanup"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates conditional Promise behavior.\n  Return \"Hello\" if condition is true, otherwise \"Error\".\n  Examples:\n    simulateConditionalPromise(true) => \"Hello\"\n    simulateConditionalPromise(false) => \"Error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateConditionalPromise(condition) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateConditionalPromise",
      "reference_solution": "function simulateConditionalPromise(condition) {\n  return condition ? 'Hello' : 'Error';\n}",
      "testCases": [
        {
          "input": {
            "condition": true
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "condition": false
          },
          "expectedOutput": "Error"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise.all() behavior.\n  Return the array of values as a JSON string.\n  Examples:\n    simulatePromiseAll([1, 2, 3]) => \"[1,2,3]\"\n    simulatePromiseAll([5, 10, 15]) => \"[5,10,15]\"\n    simulatePromiseAll([7, 14]) => \"[7,14]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAll(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseAll",
      "reference_solution": "function simulatePromiseAll(values) {\n  return JSON.stringify(values);\n}",
      "testCases": [
        {
          "input": {
            "values": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "values": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "[5,10,15]"
        },
        {
          "input": {
            "values": [
              7,
              14
            ]
          },
          "expectedOutput": "[7,14]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise.race() behavior.\n  Return the faster value (first parameter).\n  Examples:\n    simulatePromiseRace(\"Fast\", \"Slow\") => \"Fast\"\n    simulatePromiseRace(\"Quick\", \"Delayed\") => \"Quick\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseRace(fast, slow) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseRace",
      "reference_solution": "function simulatePromiseRace(fast, slow) {\n  return fast;\n}",
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
      "description": "/*\n  Implement the below function that simulates Promise chaining with calculations.\n  Perform the chain: add 5, then multiply by 2.\n  Examples:\n    simulatePromiseCalculation(10) => 30\n    simulatePromiseCalculation(5) => 20\n    simulatePromiseCalculation(20) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseCalculation(initial) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseCalculation",
      "reference_solution": "function simulatePromiseCalculation(initial) {\n  return (initial + 5) * 2;\n}",
      "testCases": [
        {
          "input": {
            "initial": 10
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "initial": 5
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "initial": 20
          },
          "expectedOutput": "50"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates random Promise resolution.\n  Return \"Success\" if shouldResolve is true, otherwise \"Failure\".\n  Examples:\n    simulateRandomPromise(true) => \"Success\"\n    simulateRandomPromise(false) => \"Failure\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateRandomPromise(shouldResolve) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateRandomPromise",
      "reference_solution": "function simulateRandomPromise(shouldResolve) {\n  return shouldResolve ? 'Success' : 'Failure';\n}",
      "testCases": [
        {
          "input": {
            "shouldResolve": true
          },
          "expectedOutput": "Success"
        },
        {
          "input": {
            "shouldResolve": false
          },
          "expectedOutput": "Failure"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise.allSettled() behavior.\n  Return the formatted results as a string with newlines.\n  Examples:\n    simulatePromiseAllSettled(\"A\", \"B\") => \"fulfilled: A\\nrejected: B\"\n    simulatePromiseAllSettled(\"Success\", \"Error\") => \"fulfilled: Success\\nrejected: Error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllSettled(resolveValue, rejectValue) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseAllSettled",
      "reference_solution": "function simulatePromiseAllSettled(resolveValue, rejectValue) {\n  return 'fulfilled: ' + resolveValue + '\\nrejected: ' + rejectValue;\n}",
      "testCases": [
        {
          "input": {
            "resolveValue": "A",
            "rejectValue": "B"
          },
          "expectedOutput": "fulfilled: A\nrejected: B"
        },
        {
          "input": {
            "resolveValue": "Success",
            "rejectValue": "Error"
          },
          "expectedOutput": "fulfilled: Success\nrejected: Error"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates chained data fetching.\n  Return the posts array as a JSON string.\n  Examples:\n    simulateChainedFetch(1, [\"Post1\", \"Post2\"]) => \"[\\\"Post1\\\",\\\"Post2\\\"]\"\n    simulateChainedFetch(2, [\"Article1\", \"Article2\", \"Article3\"]) => \"[\\\"Article1\\\",\\\"Article2\\\",\\\"Article3\\\"]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateChainedFetch(userId, posts) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateChainedFetch",
      "reference_solution": "function simulateChainedFetch(userId, posts) {\n  return JSON.stringify(posts);\n}",
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
              "Article2",
              "Article3"
            ]
          },
          "expectedOutput": "[\"Article1\",\"Article2\",\"Article3\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates sequential Promise steps.\n  Return the step sequence as a string with newlines.\n  Examples:\n    simulateSequentialSteps() => \"Step 1\\nStep 2\\nStep 3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialSteps() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSequentialSteps",
      "reference_solution": "function simulateSequentialSteps() {\n  return 'Step 1\\nStep 2\\nStep 3';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Step 1\nStep 2\nStep 3"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise.all() with different delays.\n  Return the values in original order as JSON string (not completion order).\n  Examples:\n    simulatePromiseAllOrder([1, 2, 3]) => \"[1,2,3]\"\n    simulatePromiseAllOrder([5, 10, 15]) => \"[5,10,15]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllOrder(values) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseAllOrder",
      "reference_solution": "function simulatePromiseAllOrder(values) {\n  return JSON.stringify(values);\n}",
      "testCases": [
        {
          "input": {
            "values": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "values": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "[5,10,15]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise error handling.\n  Return the error message that would be caught.\n  Examples:\n    simulatePromiseErrorHandling() => \"Invalid calculation\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseErrorHandling() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseErrorHandling",
      "reference_solution": "function simulatePromiseErrorHandling() {\n  return 'Invalid calculation';\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Invalid calculation"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates Promise.all() with rejection.\n  Return the error message that would cause the rejection.\n  Examples:\n    simulatePromiseAllRejection(\"Error\") => \"Error\"\n    simulatePromiseAllRejection(\"Failed\") => \"Failed\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllRejection(error) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulatePromiseAllRejection",
      "reference_solution": "function simulatePromiseAllRejection(error) {\n  return error;\n}",
      "testCases": [
        {
          "input": {
            "error": "Error"
          },
          "expectedOutput": "Error"
        },
        {
          "input": {
            "error": "Failed"
          },
          "expectedOutput": "Failed"
        }
      ]
    }
  ]
};
