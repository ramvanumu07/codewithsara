/** Topic: for Loops (for-loops) */
export default {
  "id": "for-loops",
  "title": "for Loops",
  "outcomes": [
    "The for Loop: Compact Iteration Syntax",
    "Variable Initialization: Setting the Starting Point",
    "The Limit Condition: Defining the Exit Boundary",
    "The Update Expression: Incremental State Change",
    "Architectural Choice: When to use for vs. while"
  ],
  "tasks": [
    {
      "description": "// Print numbers from 1 to 10 using a for loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// ... up to 10",
      "solution_type": "script",
      "reference_solution": "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 15;\n\n// Print all odd numbers from 1 to n (inclusive)\n// Each number should be on a new line\n// For n = 15, your output should be:\n// 1\n// 3\n// 5\n// ... up to 15",
      "solution_type": "script",
      "reference_solution": "const n = 15;\nfor (let i = 1; i <= n; i += 2) {\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {
            "n": 15
          },
          "expectedOutput": "1\n3\n5\n7\n9\n11\n13\n15"
        },
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "1\n3\n5\n7\n9"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "1\n3\n5"
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
      "description": "// Do not rename start and end, use them as input for your program.\n// While testing we will change their values.\nconst start = 5;\nconst end = 10;\n\n// Print numbers from start to end (inclusive) in reverse order\n// Each number should be on a new line\n// For start = 5 and end = 10, your output should be:\n// 10\n// 9\n// 8\n// 7\n// 6\n// 5",
      "solution_type": "script",
      "reference_solution": "const start = 5;\nconst end = 10;\nfor (let i = end; i >= start; i--) {\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {
            "start": 5,
            "end": 10
          },
          "expectedOutput": "10\n9\n8\n7\n6\n5"
        },
        {
          "input": {
            "start": 1,
            "end": 5
          },
          "expectedOutput": "5\n4\n3\n2\n1"
        },
        {
          "input": {
            "start": 8,
            "end": 12
          },
          "expectedOutput": "12\n11\n10\n9\n8"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n\n// Calculate the sum of all numbers from 1 to n that are divisible by 3\n// Print only the final sum\n// For n = 20, the numbers are: 3, 6, 9, 12, 15, 18\n// Your output should be: 63",
      "solution_type": "script",
      "reference_solution": "const n = 20;\nlet sum = 0;\nfor (let i = 1; i <= n; i++) {\n  if (i % 3 === 0) {\n    sum += i;\n  }\n}\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "n": 20
          },
          "expectedOutput": "63"
        },
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "18"
        },
        {
          "input": {
            "n": 30
          },
          "expectedOutput": "165"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Print each character of the string on a new line\n// Use str.length to get the length and str[i] to access characters\n// For str = \"Hello\", your output should be:\n// H\n// e\n// l\n// l\n// o",
      "solution_type": "script",
      "reference_solution": "const str = \"Hello\";\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello"
          },
          "expectedOutput": "H\ne\nl\nl\no"
        },
        {
          "input": {
            "str": "JS"
          },
          "expectedOutput": "J\nS"
        },
        {
          "input": {
            "str": "Code"
          },
          "expectedOutput": "C\no\nd\ne"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"JavaScript\";\n\n// Count the number of vowels (a, e, i, o, u) in the string\n// Case-insensitive: treat 'A' and 'a' as the same\n// Print only the count\n// For str = \"JavaScript\", your output should be: 3",
      "solution_type": "script",
      "reference_solution": "const str = \"JavaScript\";\nlet count = 0;\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U') {\n    count++;\n  }\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "Hello World"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "AEIOU"
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "str": "xyz"
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n\n// Print a pattern of stars forming a right triangle\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****",
      "solution_type": "script",
      "reference_solution": "const n = 5;\nlet line = \"\";\nfor (let i = 0; i < n; i++) {\n  line += \"*\";\n  console.log(line);\n}",
      "testCases": [
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "*\n**\n***\n****\n*****"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "*\n**\n***"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "*"
        },
        {
          "input": {
            "n": 7
          },
          "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Calculate the sum of all digits in num\n// Convert num to a string to iterate through digits\n// Print only the final sum\n// For num = 12345, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
      "solution_type": "script",
      "reference_solution": "const num = 12345;\nconst str = String(num);\nlet sum = 0;\nfor (let i = 0; i < str.length; i++) {\n  sum += Number(str[i]);\n}\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "num": 12345
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "num": 999
          },
          "expectedOutput": "27"
        },
        {
          "input": {
            "num": 1000
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 246
          },
          "expectedOutput": "12"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"racecar\";\n\n// Check if str is a palindrome (reads the same forwards and backwards)\n// Compare characters from start and end moving towards center\n// Print: \"Palindrome\" if true, otherwise print: \"Not palindrome\"\n// Hint: Compare str[i] with str[str.length - 1 - i]",
      "solution_type": "script",
      "reference_solution": "const str = \"racecar\";\nlet isPalindrome = true;\nfor (let i = 0; i < str.length; i++) {\n  if (str[i] !== str[str.length - 1 - i]) {\n    isPalindrome = false;\n    break;\n  }\n}\nif (isPalindrome) {\n  console.log(\"Palindrome\");\n} else {\n  console.log(\"Not palindrome\");\n}",
      "testCases": [
        {
          "input": {
            "str": "racecar"
          },
          "expectedOutput": "Palindrome"
        },
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "Not palindrome"
        },
        {
          "input": {
            "str": "madam"
          },
          "expectedOutput": "Palindrome"
        },
        {
          "input": {
            "str": "a"
          },
          "expectedOutput": "Palindrome"
        },
        {
          "input": {
            "str": "noon"
          },
          "expectedOutput": "Palindrome"
        }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 50;\n\n// Print all prime numbers from 2 to limit\n// A prime number is only divisible by 1 and itself\n// Each prime should be on a new line\n// For limit = 50, your output should be:\n// 2\n// 3\n// 5\n// 7\n// ... up to 47",
      "solution_type": "script",
      "reference_solution": "const limit = 50;\nfor (let num = 2; num <= limit; num++) {\n  let isPrime = true;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n  }\n  if (isPrime) {\n    console.log(num);\n  }\n}",
      "testCases": [
        {
          "input": {
            "limit": 20
          },
          "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19"
        },
        {
          "input": {
            "limit": 10
          },
          "expectedOutput": "2\n3\n5\n7"
        },
        {
          "input": {
            "limit": 30
          },
          "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19\n23\n29"
        }
      ]
    }
  ]
};
