/** Topic: Operators (Comparison & Logical) (operators-comparison-and-logical) */
export default {
  "id": "operators-comparison-and-logical",
  "title": "Operators (Comparison & Logical)",
  "outcomes": [
    "Relational Operators: >, <, >=, <=",
    "Logical Gates: AND (&&), OR (||), and NOT (!)",
    "Short-circuiting: How JS optimizes logical checks"
  ],
  "outcome_messages": [
    "Let's use relational operators.\n\n`>` (greater than), `<` (less than), `>=` (greater or equal), `<=` (less or equal) compare two values and return true or false. If types differ, coercion can happen (e.g. \"5\" < 10).\n\n## Example\n\n```javascript\nconsole.log(10 > 5);\nconsole.log(10 <= 10);\nconsole.log(3 < 3);\nconsole.log(7 >= 7);\n```\n\n## Output\n\n```\ntrue\ntrue\nfalse\ntrue\n```\n\nUse them to check ranges or order. The result is always a boolean.\n\n## Practice\n\nWhat does 15 > 10 evaluate to?",
    "Let's use logical operators: AND, OR, and NOT.\n\n**Truthy** values are treated as true in logical checks (e.g. non-zero numbers, non-empty strings, true). **Falsy** values are treated as false: false, 0, \"\" (empty string), null, undefined, and NaN.\n\n`&&` (AND) is true only when both sides are truthy. `||` (OR) is true when at least one side is truthy. `!` (NOT) flips truthy to false and falsy to true.\n\n## Example\n\n```javascript\nconsole.log(true && true);\nconsole.log(true && false);\nconsole.log(true || false);\nconsole.log(!true);\nconsole.log(!0);\n```\n\n## Output\n\n```\ntrue\nfalse\ntrue\nfalse\ntrue\n```\n\nAND needs both true; OR needs one true; NOT inverts. They work with boolean values and truthy/falsy values.\n\n## Practice\n\nWhat does (5 > 3) && (10 > 7) evaluate to?",
    "Let's see how short-circuiting works.\n\nWith `&&`, if the left side is falsy, the right side is not evaluated (result is the left value). With `||`, if the left side is truthy, the right side is not evaluated (result is the left value). That saves work and allows patterns like fallbacks.\n\n## Example\n\n```javascript\nconsole.log(\"\" || \"Default\");\nconsole.log(\"Hi\" || \"Default\");\nconsole.log(0 && 100);\nconsole.log(5 && 10);\n```\n\n## Output\n\n```\nDefault\nHi\n0\n10\n```\n\nOR returns the first truthy value (or the last if all falsy). AND returns the first falsy value (or the last if all truthy). Useful for defaults and guards.\n\n## Practice\n\nWhat is the value of (null || \"fallback\")?"
  ],
  "practise_tasks": [
    {
      "question": "What does 15 > 10 evaluate to?",
      "type": "context_dependent",
      "validation_hint": "Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required."
    },
    {
      "question": "What does (5 > 3) && (10 > 7) evaluate to?",
      "type": "context_dependent",
      "validation_hint": "Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required."
    },
    {
      "question": "What is the value of (null || \"fallback\")?",
      "type": "context_dependent",
      "validation_hint": "Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required."
    }
  ],
  "tasks": [
    {
      "description": "// Use a and b as input.\n// Print the result of (a == b) followed by (a === b).\nconst a = 10;\nconst b = \"10\";\n// For a = 10, b = \"10\", output:\n// true\n// false",
      "solution_type": "script",
      "reference_solution": "const a = 10;\nconst b = \"10\";\nconsole.log(a == b);\nconsole.log(a === b);",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": "10"
          },
          "expectedOutput": "true\nfalse"
        },
        {
          "input": {
            "a": 0,
            "b": false
          },
          "expectedOutput": "true\nfalse"
        },
        {
          "input": {
            "a": 1,
            "b": true
          },
          "expectedOutput": "true\nfalse"
        }
      ]
    },
    {
      "description": "// Use x as input.\n// Use comparison and logical operators to check if x is between 50 and 100 (inclusive).\n// Print the boolean result.\nconst x = 75;\n// For x = 75, output: true",
      "solution_type": "script",
      "reference_solution": "const x = 75;\nconsole.log(x >= 50 && x <= 100);",
      "testCases": [
        {
          "input": {
            "x": 75
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "x": 50
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "x": 101
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "x": 49
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "// Use val as input.\n// Use the NOT (!) operator to print the opposite of the value's truthiness.\n// Then print the 'double NOT' (!!) to show its actual boolean value.\nconst val = \"Hello\";\n// For val = \"Hello\", output:\n// false\n// true",
      "solution_type": "script",
      "reference_solution": "const val = \"Hello\";\nconsole.log(!val);\nconsole.log(!!val);",
      "testCases": [
        {
          "input": {
            "val": "Hello"
          },
          "expectedOutput": "false\ntrue"
        },
        {
          "input": {
            "val": ""
          },
          "expectedOutput": "true\nfalse"
        },
        {
          "input": {
            "val": 0
          },
          "expectedOutput": "true\nfalse"
        }
      ]
    },
    {
      "description": "// Short-circuiting OR (||)\n// Print the value of (input || \"Default\").\n// This mimics assigning a fallback value without an if-statement.\nconst input = \"\";\n// For input = \"\", output: Default",
      "solution_type": "script",
      "reference_solution": "const input = \"\";\nconsole.log(input || \"Default\");",
      "testCases": [
        {
          "input": {
            "input": ""
          },
          "expectedOutput": "Default"
        },
        {
          "input": {
            "input": "User123"
          },
          "expectedOutput": "User123"
        },
        {
          "input": {
            "input": null
          },
          "expectedOutput": "Default"
        }
      ]
    },
    {
      "description": "// Short-circuiting AND (&&)\n// Print the value of (isValid && \"Success\").\n// If isValid is false, it should print false. If true, it should print \"Success\".\nconst isValid = true;\n// For isValid = true, output: Success",
      "solution_type": "script",
      "reference_solution": "const isValid = true;\nconsole.log(isValid && \"Success\");",
      "testCases": [
        {
          "input": {
            "isValid": true
          },
          "expectedOutput": "Success"
        },
        {
          "input": {
            "isValid": false
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "// Multiple Logic Gates\n// Check if (a is even) AND (b is even).\n// Print the boolean result.\nconst a = 4;\nconst b = 8;\n// For 4 and 8, output: true",
      "solution_type": "script",
      "reference_solution": "const a = 4;\nconst b = 8;\nconsole.log(a % 2 === 0 && b % 2 === 0);",
      "testCases": [
        {
          "input": {
            "a": 4,
            "b": 8
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "a": 3,
            "b": 8
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "a": 7,
            "b": 5
          },
          "expectedOutput": "false"
        }
      ]
    }
  ]
};
