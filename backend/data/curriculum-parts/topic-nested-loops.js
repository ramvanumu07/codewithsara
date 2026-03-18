/** Topic: Nested Loops (nested-loops) */
export default {
  "id": "nested-loops",
  "title": "Nested Loops",
  "outcomes": [
    "When You Need Every Pair: A Loop Inside a Loop",
    "How Nested Loops Run: One Outer Step, Inner Runs to Completion",
    "How Many Times: N × M",
    "Grids: One Row at a Time"
  ],
  "outcome_messages": [
    "Let's see when to nest loops.\n\nYou use a nested loop when you need to do something for **every combination** of two things: every row with every column, or every value from one range with every value from another. One loop gives you one dimension; a loop inside that loop gives you the second. Use one variable for the outer loop (e.g. `i`) and a different one for the inner (e.g. `j`) so they don't clash.\n\n## Syntax\n\n```text\nfor (let i = 0; i < N; i++) {\n  for (let j = 0; j < M; j++) {\n    // body runs for each pair (i, j)\n  }\n}\n```\n\n## Example\n\n```javascript\nfor (let i = 0; i < 2; i++) {\n  for (let j = 0; j < 3; j++) {\n    console.log(i, j);\n  }\n}\n```\n\n## Output\n\n```\n0 0\n0 1\n0 2\n1 0\n1 1\n1 2\n```\n\nWe get all 2×3 = 6 pairs. The inner loop sits inside the outer loop's body.\n\n## Practice\n\nIn the example, how many (i, j) pairs are printed, and why?",
    "Let's understand execution order.\n\nThe outer loop does one step (e.g. `i` becomes 0). For that single step, the **inner loop runs from start to finish** (all values of `j`). Only when the inner loop has finished does the outer loop take its next step. So: outer step → inner runs completely → outer step → inner runs completely → …\n\n## Example\n\n```javascript\nfor (let r = 0; r < 2; r++) {\n  for (let c = 0; c < 2; c++) {\n    console.log(r, c);\n  }\n}\n```\n\n## Output\n\n```\n0 0\n0 1\n1 0\n1 1\n```\n\nOrder: when r=0, inner runs c=0 then c=1. When r=1, inner runs c=0 then c=1 again. So (0,0), (0,1), (1,0), (1,1). Never (1,0) before (0,1)—the inner loop always finishes before the outer advances.\n\n## Practice\n\nIf the outer runs 3 times and the inner 4 times, how many times does the inner loop body run in total?",
    "Let's see how total iterations add up.\n\nIf the outer loop runs **N** times and the inner runs **M** times (for each outer step), the inner loop body runs **N × M** times in total. So 3 outer and 4 inner → 12 runs. Two loops of 10 each → 100. That grows fast, so use nested loops only when you really need \"for each A, for each B.\"\n\n## Example\n\n```javascript\nlet count = 0;\nfor (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 2; j++) {\n    count++;\n  }\n}\nconsole.log(count);\n```\n\n## Output\n\n```\n6\n```\n\n3 × 2 = 6. Use N×M when you need to reason about how often something runs or how expensive the loop is.\n\n## Practice\n\nA grid has 5 rows and 7 columns. Outer loop = rows, inner = columns. How many times does the inner body run?",
    "Let's use nested loops for grids: rows and columns.\n\nFor a grid (rectangle of stars, multiplication table, etc.), use the **outer loop for rows** and the **inner loop for columns**. In the inner loop you build **one row** (e.g. a string by appending one character per column). After the inner loop finishes, you print that row. So each outer iteration produces one line.\n\n## Example\n\n```javascript\nfor (let r = 0; r < 3; r++) {\n  let line = \"\";\n  for (let c = 0; c < 4; c++) {\n    line += \"*\";\n  }\n  console.log(line);\n}\n```\n\n## Output\n\n```\n****\n****\n****\n```\n\nOuter = row: we do 3 rows. Inner = column: we add 4 stars to `line`, then print. Result: 3×4 grid.\n\n## Practice\n\nIn the example, which loop (outer or inner) controls how many stars are on one row, and which controls how many rows are printed? Why?"
  ],
  "tasks": [
    {
      "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n// Print a grid of stars (*) with the given dimensions\n// Each row should be on a new line\n// For rows = 3 and cols = 4, your output should be:\n// ****\n// ****\n// ****",
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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n// Print a right triangle pattern of numbers\n// Each row i should have numbers from 1 to i\n// For n = 4, your output should be:\n// 1\n// 1 2\n// 1 2 3\n// 1 2 3 4",
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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n// Print a pyramid pattern of stars\n// Row i should have i stars\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****\n// ****\n// ***\n// **\n// *",
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
      "description": "// Do not rename str1 and str2, use them as input for your program.\n// While testing we will change their values.\nconst str1 = \"abc\";\nconst str2 = \"xy\";\n// Print all possible pairs of characters from str1 and str2\n// Format: \"char1char2\" (concatenated, no space)\n// For str1 = \"abc\" and str2 = \"xy\", your output should be:\n// ax\n// ay\n// bx\n// by\n// cx\n// cy",
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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n// Print a hollow square pattern\n// Only the border should have stars, inside should be spaces\n// For n = 4, your output should be:\n// ****\n// *  *\n// *  *\n// ****",
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
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 20;\n// Find and print all pairs of numbers (a, b) where:\n// - Both a and b are between 1 and limit\n// - a < b\n// - a + b equals 10\n// Format: \"a + b = 10\"\n// For limit = 20, your output should be:\n// 1 + 9 = 10\n// 2 + 8 = 10\n// 3 + 7 = 10\n// 4 + 6 = 10",
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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 3;\n// Print a pattern where each row shows row number repeated row times\n// For n = 3, your output should be:\n// 1\n// 2 2\n// 3 3 3",
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
      "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n// Print a grid showing coordinates (row, col) for each position\n// Format: \"(row,col)\" with space between coordinates\n// For rows = 3 and cols = 4, your output should be:\n// (0,0) (0,1) (0,2) (0,3)\n// (1,0) (1,1) (1,2) (1,3)\n// (2,0) (2,1) (2,2) (2,3)",
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
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n// Count and print the total number of prime numbers from 2 to limit\n// Use nested loops: outer loop for each number, inner loop to check if prime\n// Print only the final count\n// For limit = 30, there are 10 primes: 2,3,5,7,11,13,17,19,23,29\n// Your output should be: 10",
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
