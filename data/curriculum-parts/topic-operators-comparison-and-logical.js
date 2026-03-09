/** Topic: Operators (Comparison & Logical) (operators-comparison-and-logical) */
export default {
  "id": "operators-comparison-and-logical",
  "title": "Operators (Comparison & Logical)",
  "outcomes": [
    "Abstract vs. Strict Equality: == vs ===",
    "Relational Operators: >, <, >=, <=",
    "Logical Gates: AND (&&), OR (||), and NOT (!)",
    "Short-circuiting: How JS optimizes logical checks"
  ],
  "tasks": [
    {
      "description": "// Use a and b as input.\n// Print the result of (a == b) followed by (a === b).\nconst a = 10;\nconst b = \"10\";\n\n// For a = 10, b = \"10\", output:\n// true\n// false",
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
      "description": "// Use x as input.\n// Use comparison and logical operators to check if x is between 50 and 100 (inclusive).\n// Print the boolean result.\nconst x = 75;\n\n// For x = 75, output: true",
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
      "description": "// Use val as input.\n// Use the NOT (!) operator to print the opposite of the value's truthiness.\n// Then print the 'double NOT' (!!) to show its actual boolean value.\nconst val = \"Hello\";\n\n// For val = \"Hello\", output:\n// false\n// true",
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
      "description": "// Short-circuiting OR (||)\n// Print the value of (input || \"Default\").\n// This mimics assigning a fallback value without an if-statement.\nconst input = \"\";\n\n// For input = \"\", output: Default",
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
      "description": "// Short-circuiting AND (&&)\n// Print the value of (isValid && \"Success\").\n// If isValid is false, it should print false. If true, it should print \"Success\".\nconst isValid = true;\n\n// For isValid = true, output: Success",
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
      "description": "// Relational Strings\n// Print the result of (str1 > str2).\n// This checks alphabetical (Unicode) priority.\nconst str1 = \"apple\";\nconst str2 = \"banana\";\n\n// For \"apple\" > \"banana\", output: false",
      "solution_type": "script",
      "reference_solution": "const str1 = \"apple\";\nconst str2 = \"banana\";\nconsole.log(str1 > str2);",
      "testCases": [
        {
          "input": {
            "str1": "apple",
            "str2": "banana"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str1": "cat",
            "str2": "can"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str1": "Alpha",
            "str2": "alpha"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "// Multiple Logic Gates\n// Check if (a is even) AND (b is even).\n// Print the boolean result.\nconst a = 4;\nconst b = 8;\n\n// For 4 and 8, output: true",
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
