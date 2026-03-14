/** Topic: Error handling with try-catch (error-handling) */
export default {
  "id": "error-handling",
  "title": "Error handling with try-catch",
  "outcomes": [
    "try and catch",
    "Error Types and the Error Object",
    "throw and Custom Messages",
    "finally",
    "How Errors Bubble Up",
    "When to Catch"
  ],
  "outcome_messages": [
    "Let's wrap code that might throw in try and handle errors in catch.\n\n**try { ... }** wraps code that might **throw** an error. If anything in the try block throws, execution **jumps to** the **catch (e) { ... }** block; **e** is the thrown value (usually an Error). After the catch block, execution continues. If nothing throws, the catch block is **skipped**. Use try-catch when you expect a possible failure (e.g. JSON.parse, invalid input) and want to **handle** it instead of crashing. Only **synchronous** throws are caught this way; async code needs other handling.\n\n## Example\n\n```javascript\ntry {\n  const data = JSON.parse(\"{ invalid\");\n} catch (e) {\n  console.log(\"Parse failed:\", e.message);\n}\nconsole.log(\"Done\");\n```\n\n## Output\n\n```\nParse failed: Unexpected token 'i', \"{ invalid\" is not valid JSON\nDone\n```\n\n## What happens\n\n- JSON.parse throws because the string is not valid JSON.\n- Execution goes to catch; e.message is logged.\n- Then \"Done\" is logged. Without try-catch, the script could stop at the throw.\n\n## Practice\n\nWhen JSON.parse throws, which block runs—try or catch? What if it doesn't throw?",
    "Let's look at error types and the error object you get in catch.\n\nWhen you **catch (e)**, **e** is an error object. **e.name** is the **error type** (e.g. \"ReferenceError\", \"TypeError\", \"SyntaxError\"). **e.message** is the **human-readable** description. **ReferenceError**: you used a variable that doesn't exist. **TypeError**: wrong type for an operation (e.g. null.x or calling a non-function). **SyntaxError**: invalid syntax (e.g. invalid JSON in JSON.parse). Use e.name to branch and e.message to log or show the user.\n\n## Example\n\n```javascript\ntry {\n  JSON.parse(\"{ bad\");\n} catch (e) {\n  console.log(e.name);\n  console.log(e.message);\n}\n```\n\n## Output\n\n```\nSyntaxError\nUnexpected token 'b', \"{ bad\" is not valid JSON\n```\n\n## What happens\n\n- Invalid JSON causes JSON.parse to throw a SyntaxError.\n- e.name is \"SyntaxError\"; e.message describes what was wrong.\n\n## Practice\n\nWhen JSON.parse fails, what does e.name tell you? What does e.message tell you?",
    "Let's throw errors with custom messages.\n\n**throw new Error('message');** **throws** an error—execution stops in the current function and the error **propagates** to the nearest try-catch or to the caller. Use throw for **invalid input** or failed checks (e.g. divide by zero, negative age) so the caller can catch and handle. Use a **clear message**: new Error('Cannot divide by zero') or new Error('Age must be 0–150, got ' + age). Good messages make debugging easier. You can throw any value, but Error objects have .name and .message and work well with tools.\n\n## Example\n\n```javascript\nfunction divide(a, b) {\n  if (b === 0) throw new Error('Cannot divide by zero');\n  return a / b;\n}\ntry {\n  console.log(divide(10, 0));\n} catch (e) {\n  console.log(e.message);\n}\n```\n\n## Output\n\n```\nCannot divide by zero\n```\n\n## What happens\n\n- divide(10, 0) hits the check and throws.\n- The try-catch around the call catches it; e.message is our custom message.\n\n## Practice\n\nIf you throw new Error('Must be positive') and catch it, what do you get in e.message?",
    "Let's run cleanup code that runs whether or not an error was thrown using finally.\n\n**try { } catch (e) { } finally { }** — the **finally** block runs **after** the try (and catch, if there was a throw), **whether an error was thrown or not**. Use it for **cleanup**: resetting state, closing a resource, or anything that must run no matter what. Order when an error is thrown: try runs until throw → catch runs → finally runs → then execution continues. When no error: try runs → catch skipped → finally runs.\n\n## Example\n\n```javascript\nlet open = true;\ntry {\n  throw new Error(\"oops\");\n} catch (e) {\n  console.log(\"Caught\");\n} finally {\n  open = false;\n}\nconsole.log(open);\n```\n\n## Output\n\n```\nCaught\nfalse\n```\n\n## What happens\n\n- try throws; catch runs and logs \"Caught\".\n- finally runs and sets open = false.\n- Then the last console.log runs. open is false even though we threw.\n\n## Practice\n\nIn the example, does \"Caught\" or \"false\" get printed first? If you remove the throw, does finally still run?",
    "Let's see how errors bubble up the call stack.\n\nWhen code **throws**, the error **propagates** to the **caller**. If the caller doesn't have try-catch, it propagates to **its** caller, and so on—until a try-catch **handles** it or the script crashes. So the error \"bubbles up\" from the inner function outward. You can catch at any level: near the throw (fine-grained) or higher up (e.g. one place that handles all errors). Uncaught errors eventually reach the environment (browser, Node) and may be reported or stop the process.\n\n## Example\n\n```javascript\nfunction a() { b(); }\nfunction b() { throw new Error(\"oops\"); }\ntry {\n  a();\n} catch (e) {\n  console.log(e.message);\n}\n```\n\n## Output\n\n```\noops\n```\n\n## What happens\n\n- a() calls b(); b() throws.\n- b has no try-catch, so the error goes to a; a has none, so it goes to the try that called a().\n- That try-catch catches the error and logs the message.\n\n## Practice\n\nIn the example, b() throws but there’s no try-catch inside b(). Who actually catches the error—b, or the code that called a()?",
    "Let's decide when to catch errors and when to let them propagate.\n\n**Catch** when you can **handle** the failure: return a fallback value, show a user-friendly message, or retry. **Don't** catch just to ignore the error—that hides bugs. **Let errors propagate** when the **caller** (or a higher layer) should handle them—e.g. an API route catches and returns a 500. Catch at **boundaries**: user input, parsing, I/O. Deeper inside, **throw** with a clear message and let a boundary catch. Use **finally** for cleanup that must run either way.\n\n## Example\n\n```javascript\nfunction parseUserInput(str) {\n  try {\n    return JSON.parse(str);\n  } catch (e) {\n    return null;\n  }\n}\nconsole.log(parseUserInput(\"{ bad\"));\nconsole.log(parseUserInput('{\"x\":1}'));\n```\n\n## Output\n\n```\nnull\n{ x: 1 }\n```\n\n## What happens\n\n- Invalid JSON: we catch and return null instead of crashing.\n- Valid JSON: we return the parsed object. We handle at the boundary (user input) with a safe fallback.\n\n## Practice\n\nWhy does parseUserInput return null for bad input instead of letting the error crash?"
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
