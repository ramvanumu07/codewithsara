/** Topic: Nested Loops (nested-loops) */
export default {
  "id": "nested-loops",
  "title": "Nested Loops",
  "outcomes": [
    "Nested Loop Syntax: Hierarchical Iteration",
    "Execution Flow: The \"Clockwork\" of Inner and Outer Loops",
    "Calculating Workload: Total Iterations (N * M)",
    "Generative Logic: Grid and Pattern Printing"
  ],
  "tasks": [
    {
      "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n\n// Print a grid of stars (*) with the given dimensions\n// Each row should be on a new line\n// For rows = 3 and cols = 4, your output should be:\n// ****\n// ****\n// ****",
      "solution_type": "script",
      "reference_solution": "const rows = 3;\nconst cols = 4;\nfor (let r = 0; r < rows; r++) {\n  let line = \"\";\n  for (let c = 0; c < cols; c++) {\n    line += \"*\";\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "rows": 3,
            "cols": 4
          },
          "expectedOutput": "****\n****\n****"
        },
        {
          "input": {
            "rows": 2,
            "cols": 5
          },
          "expectedOutput": "*****\n*****"
        },
        {
          "input": {
            "rows": 4,
            "cols": 3
          },
          "expectedOutput": "***\n***\n***\n***"
        },
        {
          "input": {
            "rows": 1,
            "cols": 6
          },
          "expectedOutput": "******"
        }
      ]
    },
    {
      "description": "// Print the multiplication table from 1 to 5\n// Format each line as: \"1 2 3 4 5\" (space-separated)\n// Your output should be:\n// 1 2 3 4 5\n// 2 4 6 8 10\n// 3 6 9 12 15\n// 4 8 12 16 20\n// 5 10 15 20 25",
      "solution_type": "script",
      "reference_solution": "for (let i = 1; i <= 5; i++) {\n  let line = \"\";\n  for (let j = 1; j <= 5; j++) {\n    if (j > 1) line += \" \";\n    line += i * j;\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "1 2 3 4 5\n2 4 6 8 10\n3 6 9 12 15\n4 8 12 16 20\n5 10 15 20 25"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n\n// Print a right triangle pattern of numbers\n// Each row i should have numbers from 1 to i\n// For n = 4, your output should be:\n// 1\n// 1 2\n// 1 2 3\n// 1 2 3 4",
      "solution_type": "script",
      "reference_solution": "const n = 4;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 1; j <= i; j++) {\n    if (j > 1) line += \" \";\n    line += j;\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "n": 4
          },
          "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "1\n1 2\n1 2 3"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n\n// Print a pyramid pattern of stars\n// Row i should have i stars\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****\n// ****\n// ***\n// **\n// *",
      "solution_type": "script",
      "reference_solution": "const n = 5;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) line += \"*\";\n  console.log(line);\n}\nfor (let i = n - 1; i >= 1; i--) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) line += \"*\";\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "*\n**\n***\n****\n*****\n****\n***\n**\n*"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "*\n**\n***\n**\n*"
        },
        {
          "input": {
            "n": 4
          },
          "expectedOutput": "*\n**\n***\n****\n***\n**\n*"
        }
      ]
    },
    {
      "description": "// Do not rename str1 and str2, use them as input for your program.\n// While testing we will change their values.\nconst str1 = \"abc\";\nconst str2 = \"xy\";\n\n// Print all possible pairs of characters from str1 and str2\n// Format: \"char1char2\" (concatenated, no space)\n// For str1 = \"abc\" and str2 = \"xy\", your output should be:\n// ax\n// ay\n// bx\n// by\n// cx\n// cy",
      "solution_type": "script",
      "reference_solution": "const str1 = \"abc\";\nconst str2 = \"xy\";\nfor (let i = 0; i < str1.length; i++) {\n  for (let j = 0; j < str2.length; j++) {\n    console.log(str1[i] + str2[j]);\n  }\n}",
      "testCases": [
        {
          "input": {
            "str1": "abc",
            "str2": "xy"
          },
          "expectedOutput": "ax\nay\nbx\nby\ncx\ncy"
        },
        {
          "input": {
            "str1": "ab",
            "str2": "12"
          },
          "expectedOutput": "a1\na2\nb1\nb2"
        },
        {
          "input": {
            "str1": "XY",
            "str2": "123"
          },
          "expectedOutput": "X1\nX2\nX3\nY1\nY2\nY3"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n\n// Print a hollow square pattern\n// Only the border should have stars, inside should be spaces\n// For n = 4, your output should be:\n// ****\n// *  *\n// *  *\n// ****",
      "solution_type": "script",
      "reference_solution": "const n = 4;\nfor (let r = 0; r < n; r++) {\n  let line = \"\";\n  for (let c = 0; c < n; c++) {\n    if (r === 0 || r === n - 1 || c === 0 || c === n - 1) {\n      line += \"*\";\n    } else {\n      line += \" \";\n    }\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "n": 4
          },
          "expectedOutput": "****\n*  *\n*  *\n****"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "*****\n*   *\n*   *\n*   *\n*****"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "***\n* *\n***"
        },
        {
          "input": {
            "n": 2
          },
          "expectedOutput": "**\n**"
        }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 20;\n\n// Find and print all pairs of numbers (a, b) where:\n// - Both a and b are between 1 and limit\n// - a < b\n// - a + b equals 10\n// Format: \"a + b = 10\"\n// For limit = 20, your output should be:\n// 1 + 9 = 10\n// 2 + 8 = 10\n// 3 + 7 = 10\n// 4 + 6 = 10",
      "solution_type": "script",
      "reference_solution": "const limit = 20;\nfor (let a = 1; a <= limit; a++) {\n  for (let b = a + 1; b <= limit; b++) {\n    if (a + b === 10) {\n      console.log(a + \" + \" + b + \" = 10\");\n    }\n  }\n}",
      "testCases": [
        {
          "input": {
            "limit": 20
          },
          "expectedOutput": "1 + 9 = 10\n2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
        },
        {
          "input": {
            "limit": 10
          },
          "expectedOutput": "1 + 9 = 10\n2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
        },
        {
          "input": {
            "limit": 8
          },
          "expectedOutput": "2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 3;\n\n// Print a pattern where each row shows row number repeated row times\n// For n = 3, your output should be:\n// 1\n// 2 2\n// 3 3 3",
      "solution_type": "script",
      "reference_solution": "const n = 3;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) {\n    if (j > 0) line += \" \";\n    line += i;\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "1\n2 2\n3 3 3"
        },
        {
          "input": {
            "n": 4
          },
          "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n\n// Print a grid showing coordinates (row, col) for each position\n// Format: \"(row,col)\" with space between coordinates\n// For rows = 3 and cols = 4, your output should be:\n// (0,0) (0,1) (0,2) (0,3)\n// (1,0) (1,1) (1,2) (1,3)\n// (2,0) (2,1) (2,2) (2,3)",
      "solution_type": "script",
      "reference_solution": "const rows = 3;\nconst cols = 4;\nfor (let r = 0; r < rows; r++) {\n  let line = \"\";\n  for (let c = 0; c < cols; c++) {\n    if (c > 0) line += \" \";\n    line += \"(\" + r + \",\" + c + \")\";\n  }\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "rows": 3,
            "cols": 4
          },
          "expectedOutput": "(0,0) (0,1) (0,2) (0,3)\n(1,0) (1,1) (1,2) (1,3)\n(2,0) (2,1) (2,2) (2,3)"
        },
        {
          "input": {
            "rows": 2,
            "cols": 3
          },
          "expectedOutput": "(0,0) (0,1) (0,2)\n(1,0) (1,1) (1,2)"
        },
        {
          "input": {
            "rows": 2,
            "cols": 2
          },
          "expectedOutput": "(0,0) (0,1)\n(1,0) (1,1)"
        }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n\n// Count and print the total number of prime numbers from 2 to limit\n// Use nested loops: outer loop for each number, inner loop to check if prime\n// Print only the final count\n// For limit = 30, there are 10 primes: 2,3,5,7,11,13,17,19,23,29\n// Your output should be: 10",
      "solution_type": "script",
      "reference_solution": "const limit = 30;\nlet count = 0;\nfor (let num = 2; num <= limit; num++) {\n  let isPrime = true;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n  }\n  if (isPrime) count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "limit": 30
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "limit": 20
          },
          "expectedOutput": "8"
        },
        {
          "input": {
            "limit": 10
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "limit": 50
          },
          "expectedOutput": "15"
        }
      ]
    }
  ]
};
