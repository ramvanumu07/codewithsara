/** Topic: Error handling with try-catch (error-handling) */
export default {
  "id": "error-handling",
  "title": "Error handling with try-catch",
  "outcomes": [
    "Error Types: Identifying Reference, Syntax, and Type Errors",
    "Error Objects: Accessing .name and .message Properties",
    "try...catch Syntax: Creating a Safety Net for Logic",
    "The finally Block: Executing Cleanup regardless of outcome",
    "The throw Statement: Manually Triggering Logic Failures",
    "Custom Messaging: Providing Context for Debugging",
    "Error Propagation: Understanding how errors \"bubble up\"",
    "Strategic Usage: When to catch vs. when to let it fail"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that demonstrates try-catch with undefined variable.\n  Create a try-catch block that attempts to access an undefined variable.\n  In the catch block, return the error message.\n  Examples:\n    catchUndefinedVariable() => \"undefinedVariable is not defined\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchUndefinedVariable() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "catchUndefinedVariable",
      "reference_solution": "function catchUndefinedVariable() {\n  try { return undefinedVariable; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "undefinedVariable is not defined"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates try-catch with JSON parsing.\n  Create a try-catch block that attempts to parse invalid JSON.\n  In the catch block, return the error name.\n  Examples:\n    catchJSONError(\"{broken json}\") => \"SyntaxError\"\n    catchJSONError(\"{invalid}\") => \"SyntaxError\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchJSONError(jsonString) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "catchJSONError",
      "reference_solution": "function catchJSONError(jsonString) {\n  try { JSON.parse(jsonString); } catch (e) { return e.name; }\n}",
      "testCases": [
        {
          "input": {
            "jsonString": "{broken json}"
          },
          "expectedOutput": "SyntaxError"
        },
        {
          "input": {
            "jsonString": "{invalid}"
          },
          "expectedOutput": "SyntaxError"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates try-catch-finally.\n  Create a try-catch-finally block.\n  In try: collect \"Trying\", in catch: collect \"Error occurred\", in finally: collect \"Cleanup\".\n  Test with code that throws an error and return the collected messages joined by newlines.\n  Examples:\n    tryCatchFinally() => \"Trying\\nError occurred\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction tryCatchFinally() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "tryCatchFinally",
      "reference_solution": "function tryCatchFinally() {\n  const parts = [];\n  try { parts.push('Trying'); throw new Error(); } catch (e) { parts.push('Error occurred'); } finally { parts.push('Cleanup'); }\n  return parts.join('\\n');\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Trying\nError occurred\nCleanup"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that throws custom error for negative numbers.\n  Create a function that throws a custom error if a number is negative.\n  Use throw new Error() with message \"Number must be positive\".\n  Wrap the function call in try-catch and return the error message.\n  Examples:\n    validatePositiveNumber(-5) => \"Number must be positive\"\n    validatePositiveNumber(-10) => \"Number must be positive\"\n    validatePositiveNumber(-1) => \"Number must be positive\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validatePositiveNumber(num) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "validatePositiveNumber",
      "reference_solution": "function validatePositiveNumber(num) {\n  try { if (num < 0) throw new Error('Number must be positive'); return num; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "num": -5
          },
          "expectedOutput": "Number must be positive"
        },
        {
          "input": {
            "num": -10
          },
          "expectedOutput": "Number must be positive"
        },
        {
          "input": {
            "num": -1
          },
          "expectedOutput": "Number must be positive"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that safely divides numbers.\n  Create a function that takes two parameters: a and b.\n  Throw an error if b is 0 with message \"Cannot divide by zero\".\n  Otherwise return a / b. Wrap the call in try-catch and return error message if caught.\n  Examples:\n    safeDivide(10, 0) => \"Cannot divide by zero\"\n    safeDivide(20, 0) => \"Cannot divide by zero\"\n    safeDivide(5, 0) => \"Cannot divide by zero\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction safeDivide(a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "safeDivide",
      "reference_solution": "function safeDivide(a, b) {\n  try { if (b === 0) throw new Error('Cannot divide by zero'); return a / b; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 0
          },
          "expectedOutput": "Cannot divide by zero"
        },
        {
          "input": {
            "a": 20,
            "b": 0
          },
          "expectedOutput": "Cannot divide by zero"
        },
        {
          "input": {
            "a": 5,
            "b": 0
          },
          "expectedOutput": "Cannot divide by zero"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates try-catch with non-existent function.\n  Create a try-catch block that attempts to call a non-existent function.\n  In the catch block, return both error name and message separated by \": \".\n  Examples:\n    catchFunctionError() => \"ReferenceError: nonExistentFunction is not defined\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchFunctionError() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "catchFunctionError",
      "reference_solution": "function catchFunctionError() {\n  try { nonExistentFunction(); } catch (e) { return e.name + ': ' + e.message; }\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "ReferenceError: nonExistentFunction is not defined"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that validates age with multiple error conditions.\n  Throw an error if age is less than 0 with message \"Age cannot be negative\".\n  Throw an error if age is greater than 150 with message \"Age is unrealistic\".\n  Otherwise return \"Valid age\". Wrap in try-catch and return error message if caught.\n  Examples:\n    validateAge(-5) => \"Age cannot be negative\"\n    validateAge(200) => \"Age is unrealistic\"\n    validateAge(-1) => \"Age cannot be negative\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateAge(age) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "validateAge",
      "reference_solution": "function validateAge(age) {\n  try { if (age < 0) throw new Error('Age cannot be negative'); if (age > 150) throw new Error('Age is unrealistic'); return 'Valid age'; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "age": -5
          },
          "expectedOutput": "Age cannot be negative"
        },
        {
          "input": {
            "age": 200
          },
          "expectedOutput": "Age is unrealistic"
        },
        {
          "input": {
            "age": -1
          },
          "expectedOutput": "Age cannot be negative"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates try-catch-finally with successful parsing.\n  In try: attempt to parse valid JSON and collect \"Parsing successful\".\n  In finally: collect \"Done\".\n  Return the collected messages joined by newlines.\n  Examples:\n    parseJSONSuccessfully(\"{\\\"name\\\":\\\"Alice\\\"}\") => \"Parsing successful\\nDone\"\n    parseJSONSuccessfully(\"{\\\"age\\\":25}\") => \"Parsing successful\\nDone\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction parseJSONSuccessfully(jsonString) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "parseJSONSuccessfully",
      "reference_solution": "function parseJSONSuccessfully(jsonString) {\n  const parts = [];\n  try { JSON.parse(jsonString); parts.push('Parsing successful'); } finally { parts.push('Done'); }\n  return parts.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "jsonString": "{\"name\":\"Alice\"}"
          },
          "expectedOutput": "Parsing successful\nDone"
        },
        {
          "input": {
            "jsonString": "{\"age\":25}"
          },
          "expectedOutput": "Parsing successful\nDone"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that validates non-empty strings.\n  Throw an error if the string is empty with message \"String cannot be empty\".\n  Otherwise return the string length. Wrap in try-catch and return error message if caught.\n  Examples:\n    validateNonEmptyString(\"\") => \"String cannot be empty\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateNonEmptyString(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "validateNonEmptyString",
      "reference_solution": "function validateNonEmptyString(str) {\n  try { if (str === '') throw new Error('String cannot be empty'); return str.length; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "str": ""
          },
          "expectedOutput": "String cannot be empty"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that safely accesses array elements.\n  Throw an error if index is negative with message \"Index cannot be negative\".\n  Throw an error if index >= array length with message \"Index out of bounds\".\n  Otherwise return the element. Wrap in try-catch and return error message if caught.\n  Examples:\n    safeArrayAccess([1,2,3], 5) => \"Index out of bounds\"\n    safeArrayAccess([10,20], -1) => \"Index cannot be negative\"\n    safeArrayAccess([5], 10) => \"Index out of bounds\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction safeArrayAccess(arr, index) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "safeArrayAccess",
      "reference_solution": "function safeArrayAccess(arr, index) {\n  try { if (index < 0) throw new Error('Index cannot be negative'); if (index >= arr.length) throw new Error('Index out of bounds'); return arr[index]; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ],
            "index": 5
          },
          "expectedOutput": "Index out of bounds"
        },
        {
          "input": {
            "arr": [
              10,
              20
            ],
            "index": -1
          },
          "expectedOutput": "Index cannot be negative"
        },
        {
          "input": {
            "arr": [
              5
            ],
            "index": 10
          },
          "expectedOutput": "Index out of bounds"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates nested try-catch blocks.\n  Outer try: contains inner try-catch.\n  Inner try: throw error with message \"Inner error\".\n  Inner catch: collect the error message and re-throw the error.\n  Outer catch: collect \"Caught in outer: \" + error message.\n  Return collected messages joined by newlines.\n  Examples:\n    nestedTryCatch() => \"Inner error\\nCaught in outer: Inner error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction nestedTryCatch() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "nestedTryCatch",
      "reference_solution": "function nestedTryCatch() {\n  const parts = [];\n  try { try { throw new Error('Inner error'); } catch (e) { parts.push(e.message); throw e; } } catch (e) { parts.push('Caught in outer: ' + e.message); }\n  return parts.join('\\n');\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Inner error\nCaught in outer: Inner error"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that validates email format.\n  Throw an error if email doesn't contain \"@\" with message \"Invalid email: missing @\".\n  Throw an error if email doesn't contain \".\" with message \"Invalid email: missing domain\".\n  Otherwise return \"Valid email\". Wrap in try-catch and return error message if caught.\n  Examples:\n    validateEmailFormat(\"invalidemail.com\") => \"Invalid email: missing @\"\n    validateEmailFormat(\"test@invalid\") => \"Invalid email: missing domain\"\n    validateEmailFormat(\"notemail\") => \"Invalid email: missing @\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateEmailFormat(email) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "validateEmailFormat",
      "reference_solution": "function validateEmailFormat(email) {\n  try { if (!email.includes('@')) throw new Error('Invalid email: missing @'); if (!email.includes('.')) throw new Error('Invalid email: missing domain'); return 'Valid email'; } catch (e) { return e.message; }\n}",
      "testCases": [
        {
          "input": {
            "email": "invalidemail.com"
          },
          "expectedOutput": "Invalid email: missing @"
        },
        {
          "input": {
            "email": "test@invalid"
          },
          "expectedOutput": "Invalid email: missing domain"
        },
        {
          "input": {
            "email": "notemail"
          },
          "expectedOutput": "Invalid email: missing @"
        }
      ]
    }
  ]
};
