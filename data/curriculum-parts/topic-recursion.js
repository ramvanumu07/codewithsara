/** Topic: Functions Calling Themselves (recursion) */
export default {
  "id": "recursion",
  "title": "Functions Calling Themselves",
  "outcomes": [
    "Recursion: Functions that call themselves",
    "The Base Case: The Stopping Condition",
    "The Recursive Case: Moving toward the end",
    "The Call Stack: Visualizing Function Nesting",
    "Return Value Propagation: Passing data back up the chain",
    "Recursive Problem Solving: Breaking big tasks into smaller ones",
    "Architectural Choice: Recursion vs. Iteration",
    "Stack Overflow: The risk of infinite recursion",
    "Tail Recursion: An introduction to optimization"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below recursive function to count down from n to 1.\n  Print each number on a new line. Stop when n reaches 0 or less.\n  Examples:\n    countdown(5) => prints \"5\\n4\\n3\\n2\\n1\"\n    countdown(3) => prints \"3\\n2\\n1\"\n    countdown(0) => prints nothing\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countdown(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "countdown",
      "reference_solution": "function countdown(n) {\n  if (n <= 0) return;\n  console.log(n);\n  countdown(n - 1);\n}",
      "testCases": [
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "5\n4\n3\n2\n1"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "3\n2\n1"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "n": 0
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to calculate the sum of numbers from 1 to n.\n  Examples:\n    sumToN(5) => 15 (1+2+3+4+5)\n    sumToN(10) => 55\n    sumToN(1) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumToN(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sumToN",
      "reference_solution": "function sumToN(n) {\n  if (n <= 0) return 0;\n  return n + sumToN(n - 1);\n}",
      "testCases": [
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "55"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "n": 7
          },
          "expectedOutput": "28"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to calculate the factorial of n.\n  Factorial of n = n × (n-1) × (n-2) × ... × 1\n  Examples:\n    factorial(5) => 120 (5 × 4 × 3 × 2 × 1)\n    factorial(3) => 6 (3 × 2 × 1)\n    factorial(0) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction factorial(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "factorial",
      "reference_solution": "function factorial(n) {\n  if (n <= 0) return 1;\n  return n * factorial(n - 1);\n}",
      "testCases": [
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "120"
        },
        {
          "input": {
            "n": 3
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "n": 0
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "n": 7
          },
          "expectedOutput": "5040"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to calculate base raised to the power of exponent.\n  Examples:\n    power(2, 3) => 8 (2 × 2 × 2)\n    power(5, 2) => 25 (5 × 5)\n    power(10, 0) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction power(base, exponent) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "power",
      "reference_solution": "function power(base, exponent) {\n  if (exponent === 0) return 1;\n  return base * power(base, exponent - 1);\n}",
      "testCases": [
        {
          "input": {
            "base": 2,
            "exponent": 3
          },
          "expectedOutput": "8"
        },
        {
          "input": {
            "base": 5,
            "exponent": 2
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "base": 10,
            "exponent": 0
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "base": 3,
            "exponent": 4
          },
          "expectedOutput": "81"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to count the digits in a number.\n  Examples:\n    countDigits(12345) => 5\n    countDigits(999) => 3\n    countDigits(7) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countDigits(num) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "countDigits",
      "reference_solution": "function countDigits(num) {\n  if (num < 0) num = -num;\n  if (num < 10) return 1;\n  return 1 + countDigits(Math.floor(num / 10));\n}",
      "testCases": [
        {
          "input": {
            "num": 12345
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "num": 999
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 1000000
          },
          "expectedOutput": "7"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to find the nth Fibonacci number.\n  Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...\n  Examples:\n    fibonacci(6) => 8\n    fibonacci(0) => 0\n    fibonacci(1) => 1\n    fibonacci(8) => 21\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction fibonacci(n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "fibonacci",
      "reference_solution": "function fibonacci(n) {\n  if (n === 0) return 0;\n  if (n === 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
      "testCases": [
        {
          "input": {
            "n": 6
          },
          "expectedOutput": "8"
        },
        {
          "input": {
            "n": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "n": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "n": 8
          },
          "expectedOutput": "21"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to reverse a string.\n  Examples:\n    reverseString(\"hello\") => \"olleh\"\n    reverseString(\"world\") => \"dlrow\"\n    reverseString(\"a\") => \"a\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseString(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "reverseString",
      "reference_solution": "function reverseString(str) {\n  if (str.length <= 1) return str;\n  return reverseString(str.slice(1)) + str[0];\n}",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "olleh"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "dlrow"
        },
        {
          "input": {
            "str": "a"
          },
          "expectedOutput": "a"
        },
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "tpircSavaJ"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to calculate the sum of all elements in an array.\n  Examples:\n    sumArray([1, 2, 3, 4, 5]) => 15\n    sumArray([10, 20, 30]) => 60\n    sumArray([5]) => 5\n    sumArray([]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumArray(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sumArray",
      "reference_solution": "function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sumArray(arr.slice(1));\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "60"
        },
        {
          "input": {
            "arr": [
              5
            ]
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to check if a string is a palindrome.\n  A palindrome reads the same forwards and backwards.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n    isPalindrome(\"a\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "isPalindrome",
      "reference_solution": "function isPalindrome(str) {\n  if (str.length <= 1) return true;\n  if (str[0] !== str[str.length - 1]) return false;\n  return isPalindrome(str.slice(1, -1));\n}",
      "testCases": [
        {
          "input": {
            "str": "racecar"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "madam"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "a"
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to find the maximum number in an array.\n  Examples:\n    findMax([3, 7, 2, 9, 4]) => 9\n    findMax([1, 2, 3, 4, 5]) => 5\n    findMax([100]) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findMax",
      "reference_solution": "function findMax(arr) {\n  if (arr.length === 0) return undefined;\n  if (arr.length === 1) return arr[0];\n  const restMax = findMax(arr.slice(1));\n  return arr[0] > restMax ? arr[0] : restMax;\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              3,
              7,
              2,
              9,
              4
            ]
          },
          "expectedOutput": "9"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "arr": [
              100
            ]
          },
          "expectedOutput": "100"
        },
        {
          "input": {
            "arr": [
              50,
              25,
              75,
              10
            ]
          },
          "expectedOutput": "75"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to count occurrences of a target value in an array.\n  Examples:\n    countOccurrences([1, 2, 3, 2, 4, 2], 2) => 3\n    countOccurrences([5, 5, 5, 5], 5) => 4\n    countOccurrences([1, 2, 3], 4) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(arr, target) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "countOccurrences",
      "reference_solution": "function countOccurrences(arr, target) {\n  if (arr.length === 0) return 0;\n  const count = arr[0] === target ? 1 : 0;\n  return count + countOccurrences(arr.slice(1), target);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              2,
              4,
              2
            ],
            "target": 2
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "arr": [
              5,
              5,
              5,
              5
            ],
            "target": 5
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ],
            "target": 4
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              7
            ],
            "target": 7
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below recursive function to flatten a nested array.\n  Return a new array with all elements at the top level.\n  Examples:\n    flatten([1, [2, 3], [4, [5, 6]]]) => [1,2,3,4,5,6]\n    flatten([1, 2, 3]) => [1,2,3]\n    flatten([[1], [2], [3]]) => [1,2,3]\n    flatten([]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flatten(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "flatten",
      "reference_solution": "function flatten(arr) {\n  if (arr.length === 0) return [];\n  const first = arr[0];\n  const rest = flatten(arr.slice(1));\n  if (Array.isArray(first)) {\n    return flatten(first).concat(rest);\n  }\n  return [first].concat(rest);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              [
                2,
                3
              ],
              [
                4,
                [
                  5,
                  6
                ]
              ]
            ]
          },
          "expectedOutput": "[1,2,3,4,5,6]"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "arr": [
              [
                1
              ],
              [
                2
              ],
              [
                3
              ]
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "[]"
        }
      ]
    }
  ]
};
