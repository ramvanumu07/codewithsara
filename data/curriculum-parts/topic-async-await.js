/** Topic: Writing cleaner asynchronous code (async-await) */
export default {
  "id": "async-await",
  "title": "Writing cleaner asynchronous code",
  "outcomes": [
    "async Keyword: Automatically Wrapping Functions in Promises",
    "await Keyword: Pausing Execution for Asynchronous Values",
    "Context Rules: Why await requires an async environment",
    "Return Logic: Understanding the Implicit Promise wrapper",
    "Error Handling: Integrating try...catch with Async flows",
    "Performance: Sequential vs. Parallel Await execution",
    "Modern Syntax: Async with Arrow Functions",
    "Propagation: How errors bubble through async chains"
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
