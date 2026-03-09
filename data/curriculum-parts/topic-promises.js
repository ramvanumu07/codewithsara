/** Topic: Creating and consuming promises (promises) */
export default {
  "id": "promises",
  "title": "Creating and consuming promises",
  "outcomes": [
    "Promise States: Pending, Fulfilled, and Rejected",
    "Constructor Logic: Using resolve and reject",
    "Consumption: Handling values with .then() and .catch()",
    "The finally Handler: Closing the loop",
    "Promise Chaining: Sequential Async Execution",
    "Value Passing: Why returning from .then() creates a new Promise",
    "Static Methods: Promise.all() and allSettled() for concurrency",
    "Optimization: Using Promise.race() for speed-based logic"
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
