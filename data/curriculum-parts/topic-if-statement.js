/** Topic: if Statement (if-statement) */
export default {
  "id": "if-statement",
  "title": "if Statement",
  "outcomes": [
    "The if Statement: Conditional Execution Syntax",
    "Code Blocks: Scope and the Curly Brace {}",
    "Condition Evaluation: Resolving Expressions to Booleans",
    "Truthy Execution: How non-booleans trigger branches"
  ],
  "tasks": [
    {
      "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 20;\n\n// Check if age is 18 or greater\n// If true, print: \"You are eligible to vote\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const age = 20;\nif (age >= 18) {\n  console.log(\"You are eligible to vote\");\n}",
      "testCases": [
        {
          "input": {
            "age": 20
          },
          "expectedOutput": "You are eligible to vote"
        },
        {
          "input": {
            "age": 18
          },
          "expectedOutput": "You are eligible to vote"
        },
        {
          "input": {
            "age": 15
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "age": 0
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 10;\n\n// Check if number is even (divisible by 2)\n// If true, print: \"Even number\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const number = 10;\nif (number % 2 === 0) {\n  console.log(\"Even number\");\n}",
      "testCases": [
        {
          "input": {
            "number": 10
          },
          "expectedOutput": "Even number"
        },
        {
          "input": {
            "number": 0
          },
          "expectedOutput": "Even number"
        },
        {
          "input": {
            "number": 7
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "number": -4
          },
          "expectedOutput": "Even number"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Check if the length of str is greater than 3\n// If true, print: \"Long string\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const str = \"Hello\";\nif (str.length > 3) {\n  console.log(\"Long string\");\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello"
          },
          "expectedOutput": "Long string"
        },
        {
          "input": {
            "str": "Test"
          },
          "expectedOutput": "Long string"
        },
        {
          "input": {
            "str": "Hi"
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "str": "Cat"
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "str": ""
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 8;\nconst b = 12;\n\n// Check if both a and b are greater than 5\n// If true, print: \"Both numbers are large\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const a = 8;\nconst b = 12;\nif (a > 5 && b > 5) {\n  console.log(\"Both numbers are large\");\n}",
      "testCases": [
        {
          "input": {
            "a": 8,
            "b": 12
          },
          "expectedOutput": "Both numbers are large"
        },
        {
          "input": {
            "a": 6,
            "b": 6
          },
          "expectedOutput": "Both numbers are large"
        },
        {
          "input": {
            "a": 4,
            "b": 10
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "a": 10,
            "b": 3
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "a": 2,
            "b": 3
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "// Do not rename value, use it as input for your program.\n// While testing we will change its value.\nconst value = 0;\n\n// Check if value is truthy (not 0, not empty string, not null, not undefined, not false)\n// If true, print: \"Truthy value\"\n// If false, print nothing\n// Hint: You can use if (value) to check truthiness",
      "solution_type": "script",
      "reference_solution": "const value = 0;\nif (value) {\n  console.log(\"Truthy value\");\n}",
      "testCases": [
        {
          "input": {
            "value": 5
          },
          "expectedOutput": "Truthy value"
        },
        {
          "input": {
            "value": "Hello"
          },
          "expectedOutput": "Truthy value"
        },
        {
          "input": {
            "value": 0
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "value": ""
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "value": null
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "// Do not rename x and y, use them as input for your program.\n// While testing we will change their values.\nconst x = 10;\nconst y = 20;\n\n// Check if the sum of x and y is greater than 25\n// If true, print: \"Sum is large\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const x = 10;\nconst y = 20;\nif (x + y > 25) {\n  console.log(\"Sum is large\");\n}",
      "testCases": [
        {
          "input": {
            "x": 10,
            "y": 20
          },
          "expectedOutput": "Sum is large"
        },
        {
          "input": {
            "x": 15,
            "y": 15
          },
          "expectedOutput": "Sum is large"
        },
        {
          "input": {
            "x": 10,
            "y": 15
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "x": 12,
            "y": 13
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "x": 13,
            "y": 13
          },
          "expectedOutput": "Sum is large"
        }
      ]
    }
  ]
};
