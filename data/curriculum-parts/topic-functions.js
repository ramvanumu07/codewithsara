/** Topic: Functions (functions) */
export default {
  "id": "functions",
  "title": "Functions",
  "outcomes": [
    "Function Declaration: Defining a Reusable Logic Block",
    "The Call Stack: Executing and Invoking Functions",
    "Input Channels: Working with Parameters",
    "Data Passing: Providing Arguments during Invocation",
    "The return Statement: Outputting Data from a Function",
    "The return vs. console.log Distinction",
    "Multi-input Logic: Handling Multiple Parameters",
    "Identifier Naming: Descriptive Verb-based Names",
    "Software Design: Reusability and Single Responsibility"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that takes no parameters and returns \"Hello, World!\".\n  Examples:\n    greet() => \"Hello, World!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction greet() {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "greet",
      "reference_solution": "function greet() {\n  return \"Hello, World!\";\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Hello, World!"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to double a number.\n  Examples:\n    double(5) => 10\n    double(7) => 14\n    double(0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction double(num) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "double",
      "reference_solution": "function double(num) {\n  return num * 2;\n}",
      "testCases": [
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "14"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to add two numbers.\n  Examples:\n    add(10, 20) => 30\n    add(5, 15) => 20\n    add(0, 0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction add(a, b) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "add",
      "reference_solution": "function add(a, b) {\n  return a + b;\n}",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 20
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "a": 5,
            "b": 15
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "a": 100,
            "b": 200
          },
          "expectedOutput": "300"
        },
        {
          "input": {
            "a": 0,
            "b": 0
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to check if a number is even.\n  Examples:\n    isEven(4) => true\n    isEven(7) => false\n    isEven(0) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isEven(num) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "isEven",
      "reference_solution": "function isEven(num) {\n  return num % 2 === 0;\n}",
      "testCases": [
        {
          "input": {
            "num": 4
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "num": 13
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to find the maximum of two numbers.\n  If they're equal, return either one.\n  Examples:\n    getMax(15, 10) => 15\n    getMax(5, 20) => 20\n    getMax(10, 10) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getMax(x, y) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "getMax",
      "reference_solution": "function getMax(x, y) {\n  if (x >= y) return x;\n  return y;\n}",
      "testCases": [
        {
          "input": {
            "x": 15,
            "y": 10
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "x": 5,
            "y": 20
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "x": 10,
            "y": 10
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "x": 100,
            "y": 50
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to calculate the area of a rectangle.\n  Area = width × height\n  Examples:\n    calculateArea(5, 10) => 50\n    calculateArea(7, 3) => 21\n    calculateArea(1, 1) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateArea(width, height) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "calculateArea",
      "reference_solution": "function calculateArea(width, height) {\n  return width * height;\n}",
      "testCases": [
        {
          "input": {
            "width": 5,
            "height": 10
          },
          "expectedOutput": "50"
        },
        {
          "input": {
            "width": 7,
            "height": 3
          },
          "expectedOutput": "21"
        },
        {
          "input": {
            "width": 12,
            "height": 8
          },
          "expectedOutput": "96"
        },
        {
          "input": {
            "width": 1,
            "height": 1
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to count vowels in a string.\n  Count vowels (a, e, i, o, u) - case insensitive.\n  Examples:\n    countVowels(\"hello\") => 2\n    countVowels(\"JavaScript\") => 3\n    countVowels(\"AEIOU\") => 5\n    countVowels(\"xyz\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countVowels(str) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "countVowels",
      "reference_solution": "function countVowels(str) {\n  const lower = str.toLowerCase();\n  let count = 0;\n  for (let i = 0; i < lower.length; i++) {\n    const c = lower[i];\n    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') count++;\n  }\n  return count;\n}",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "str": "JavaScript"
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
      "description": "/*\n  Implement the below function to reverse a string.\n  Examples:\n    reverseString(\"hello\") => \"olleh\"\n    reverseString(\"world\") => \"dlrow\"\n    reverseString(\"JavaScript\") => \"tpircSavaJ\"\n    reverseString(\"a\") => \"a\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseString(str) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "reverseString",
      "reference_solution": "function reverseString(str) {\n  let result = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    result += str[i];\n  }\n  return result;\n}",
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
            "str": "JavaScript"
          },
          "expectedOutput": "tpircSavaJ"
        },
        {
          "input": {
            "str": "a"
          },
          "expectedOutput": "a"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to check if a string is a palindrome.\n  A palindrome reads the same forwards and backwards.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n    isPalindrome(\"noon\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "isPalindrome",
      "reference_solution": "function isPalindrome(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return str === reversed;\n}",
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
            "str": "noon"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to calculate the sum of all elements in an array.\n  Examples:\n    sumArray([1, 2, 3, 4, 5]) => 15\n    sumArray([10, 20, 30]) => 60\n    sumArray([5]) => 5\n    sumArray([0, 0, 0]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumArray(arr) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "sumArray",
      "reference_solution": "function sumArray(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
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
            "arr": [
              0,
              0,
              0
            ]
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function to find the largest number in an array.\n  Examples:\n    findMax([5, 12, 8, 21, 3]) => 21\n    findMax([1, 2, 3, 4, 5]) => 5\n    findMax([100]) => 100\n    findMax([50, 25, 75, 10]) => 75\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "findMax",
      "reference_solution": "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              12,
              8,
              21,
              3
            ]
          },
          "expectedOutput": "21"
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
      "description": "/*\n  Implement the below function to calculate the factorial of a number.\n  Factorial of n = n × (n-1) × (n-2) × ... × 1\n  Examples:\n    factorial(5) => 120 => 5 × 4 × 3 × 2 × 1\n    factorial(3) => 6 => 3 × 2 × 1\n    factorial(1) => 1\n    factorial(7) => 5040\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction factorial(n) {\n  // Implementation here.\n}",
      "solution_type": "function",
      "function_name": "factorial",
      "reference_solution": "function factorial(n) {\n  let result = 1;\n  for (let i = 1; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}",
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
            "n": 1
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
    }
  ]
};
