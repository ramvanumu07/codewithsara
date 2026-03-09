/** Topic: while Loops (while-loops) */
export default {
  "id": "while-loops",
  "title": "while Loops",
  "outcomes": [
    "The while Loop: Iterative Execution Syntax",
    "The Loop Condition: Controlling the Entry Gate",
    "The Counter Pattern: Tracking Iteration State",
    "Loop Termination: Ensuring a Safe Exit",
    "Infinite Loop Risk: Managing System Resources"
  ],
  "tasks": [
    {
      "description": "// Print numbers from 1 to 5 using a while loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5",
      "solution_type": "script",
      "reference_solution": "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "1\n2\n3\n4\n5"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 10;\n\n// Print all even numbers from 2 to n (inclusive)\n// Each number should be on a new line\n// For n = 10, your output should be:\n// 2\n// 4\n// 6\n// 8\n// 10",
      "solution_type": "script",
      "reference_solution": "const n = 10;\nlet i = 2;\nwhile (i <= n) {\n  console.log(i);\n  i += 2;\n}",
      "testCases": [
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "2\n4\n6\n8\n10"
        },
        {
          "input": {
            "n": 6
          },
          "expectedOutput": "2\n4\n6"
        },
        {
          "input": {
            "n": 2
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 5;\n\n// Calculate the sum of numbers from 1 to limit\n// Print only the final sum\n// For limit = 5, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
      "solution_type": "script",
      "reference_solution": "const limit = 5;\nlet sum = 0;\nlet i = 1;\nwhile (i <= limit) {\n  sum += i;\n  i++;\n}\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "limit": 5
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "limit": 10
          },
          "expectedOutput": "55"
        },
        {
          "input": {
            "limit": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "limit": 100
          },
          "expectedOutput": "5050"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 7;\n\n// Print the multiplication table for num from 1 to 10\n// Format: num x i = result\n// For num = 7, your output should be:\n// 7 x 1 = 7\n// 7 x 2 = 14\n// 7 x 3 = 21\n// ... up to 7 x 10 = 70",
      "solution_type": "script",
      "reference_solution": "const num = 7;\nlet i = 1;\nwhile (i <= 10) {\n  console.log(num + \" x \" + i + \" = \" + (num * i));\n  i++;\n}",
      "testCases": [
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70"
        },
        {
          "input": {
            "num": 3
          },
          "expectedOutput": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 5;\n\n// Calculate the factorial of num\n// Factorial of n = n × (n-1) × (n-2) × ... × 1\n// Print only the final result\n// For num = 5, your output should be: 120\n// (Because 5 × 4 × 3 × 2 × 1 = 120)",
      "solution_type": "script",
      "reference_solution": "const num = 5;\nlet result = 1;\nlet i = 1;\nwhile (i <= num) {\n  result *= i;\n  i++;\n}\nconsole.log(result);",
      "testCases": [
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "120"
        },
        {
          "input": {
            "num": 3
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "num": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "5040"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Count the number of digits in num\n// Use a while loop to repeatedly divide by 10\n// Print only the count\n// For num = 12345, your output should be: 5",
      "solution_type": "script",
      "reference_solution": "const num = 12345;\nlet count = 0;\nlet n = num;\nif (n === 0) {\n  count = 1;\n} else {\n  if (n < 0) n = -n;\n  while (n > 0) {\n    count++;\n    n = Math.floor(n / 10);\n  }\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "num": 12345
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 1000
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "num": 999999
          },
          "expectedOutput": "6"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12321;\n\n// Reverse the digits of num\n// For num = 12321, your output should be: 12321\n// For num = 1234, output should be: 4321\n// Hint: Use modulo (%) to extract last digit, then divide by 10",
      "solution_type": "script",
      "reference_solution": "const num = 12321;\nlet n = num;\nif (n < 0) n = -n;\nlet reversed = 0;\nwhile (n > 0) {\n  reversed = reversed * 10 + (n % 10);\n  n = Math.floor(n / 10);\n}\nconsole.log(reversed);",
      "testCases": [
        {
          "input": {
            "num": 12321
          },
          "expectedOutput": "12321"
        },
        {
          "input": {
            "num": 1234
          },
          "expectedOutput": "4321"
        },
        {
          "input": {
            "num": 500
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "num": 9876
          },
          "expectedOutput": "6789"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 7;\n\n// Print the first n numbers in the Fibonacci sequence\n// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, ...\n// Each number is the sum of the previous two\n// Print each number on a new line\n// For n = 7, your output should be:\n// 0\n// 1\n// 1\n// 2\n// 3\n// 5\n// 8",
      "solution_type": "script",
      "reference_solution": "const n = 7;\nlet a = 0;\nlet b = 1;\nlet i = 0;\nwhile (i < n) {\n  console.log(a);\n  const next = a + b;\n  a = b;\n  b = next;\n  i++;\n}",
      "testCases": [
        {
          "input": {
            "n": 7
          },
          "expectedOutput": "0\n1\n1\n2\n3\n5\n8"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "0\n1\n1\n2\n3"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "0\n1\n1\n2\n3\n5\n8\n13\n21\n34"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 29;\n\n// Check if num is a prime number\n// A prime number is only divisible by 1 and itself\n// Print: \"Prime\" if it's prime, otherwise print: \"Not prime\"\n// Hint: Check divisibility from 2 to num-1",
      "solution_type": "script",
      "reference_solution": "const num = 29;\nif (num < 2) {\n  console.log(\"Not prime\");\n} else {\n  let isPrime = true;\n  let i = 2;\n  while (i < num) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n    i++;\n  }\n  if (isPrime) {\n    console.log(\"Prime\");\n  } else {\n    console.log(\"Not prime\");\n  }\n}",
      "testCases": [
        {
          "input": {
            "num": 29
          },
          "expectedOutput": "Prime"
        },
        {
          "input": {
            "num": 15
          },
          "expectedOutput": "Not prime"
        },
        {
          "input": {
            "num": 2
          },
          "expectedOutput": "Prime"
        },
        {
          "input": {
            "num": 1
          },
          "expectedOutput": "Not prime"
        },
        {
          "input": {
            "num": 17
          },
          "expectedOutput": "Prime"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 28;\n\n// Check if num is a perfect number\n// A perfect number equals the sum of its proper divisors (excluding itself)\n// Example: 28 = 1 + 2 + 4 + 7 + 14\n// Print: \"Perfect number\" if true, otherwise print: \"Not perfect\"",
      "solution_type": "script",
      "reference_solution": "const num = 28;\nlet sum = 0;\nlet i = 1;\nwhile (i < num) {\n  if (num % i === 0) {\n    sum += i;\n  }\n  i++;\n}\nif (sum === num) {\n  console.log(\"Perfect number\");\n} else {\n  console.log(\"Not perfect\");\n}",
      "testCases": [
        {
          "input": {
            "num": 28
          },
          "expectedOutput": "Perfect number"
        },
        {
          "input": {
            "num": 6
          },
          "expectedOutput": "Perfect number"
        },
        {
          "input": {
            "num": 12
          },
          "expectedOutput": "Not perfect"
        },
        {
          "input": {
            "num": 496
          },
          "expectedOutput": "Perfect number"
        }
      ]
    }
  ]
};
