/** Topic: Functions (functions) */
export default {
  "id": "functions",
  "title": "Functions",
  "outcomes": [
    "What a Function Is: A Reusable Block of Code",
    "Calling a Function: Execution Goes In, Then Back",
    "Parameters: Inputs to the Function",
    "Arguments: What You Pass When You Call",
    "return: Sending a Value Back",
    "return vs console.log",
    "Multiple Parameters",
    "Naming Functions Clearly",
    "One Job per Function: Reuse and Clarity"
  ],
  "outcome_messages": [
    "**When to use a function**\n\nA **function** is a named block of code you can **run whenever you need it**. Define it once with **function name() { ... }**; the code inside runs only when you **call** it with **name()**. Use functions to avoid repeating the same logic and to keep code clear. Put the steps that belong together inside one function.\n\n**Syntax**\n\n```text\nfunction name() {\n  // code here\n}\nname();\n```\n\n**Example**\n\n```javascript\nfunction sayHi() {\n  console.log(\"Hi!\");\n}\nsayHi();\nsayHi();\n```\n\n**Output**\n\n```\nHi!\nHi!\n```\n\n**Practice**\n\nWrite a function `greet` that takes no parameters and returns the string `\"Hello, World!\"`. What does `greet()` evaluate to?",
    "**How execution flows**\n\nWhen you **call** a function, execution **goes into** that function's body. When the function **returns** (or reaches the end), execution **goes back** to the place that called it. If function A calls function B, B runs to completion before A continues. That order matters when you trace or debug code.\n\n**Example**\n\n```javascript\nfunction first() { console.log(1); second(); console.log(3); }\nfunction second() { console.log(2); }\nfirst();\n```\n\n**Output**\n\n```\n1\n2\n3\n```\n\n**Practice**\n\nIf `main()` calls `a()` and `a()` calls `b()`, which function finishes first (returns first)?",
    "**Parameters**\n\n**Parameters** are the names you put in the function definition: **function add(a, b) { }**. They work like variables that get their values when the function is called. Use them anywhere inside the function. Parameters let the same function work with different data each time—the caller supplies the values.\n\n**Example**\n\n```javascript\nfunction double(n) {\n  return n * 2;\n}\nconsole.log(double(5));\n```\n\n**Output**\n\n```\n10\n```\n\n**Practice**\n\nWrite a function that takes one parameter `num` and returns `num + 10`. What does it return when called with `3`?",
    "**Arguments**\n\n**Arguments** are the values you pass when you **call** the function: **add(10, 20)**. The first argument goes to the first parameter, the second to the second, and so on. Extra arguments are ignored; missing arguments make parameters `undefined`. Arguments can be literals, variables, or expressions—they are evaluated before the function runs.\n\n**Example**\n\n```javascript\nfunction greet(name) {\n  return \"Hi, \" + name;\n}\nconsole.log(greet(\"Ali\"));\n```\n\n**Output**\n\n```\nHi, Ali\n```\n\n**Practice**\n\nIf `function f(a, b) { return a - b; }`, what does `f(10, 3)` return? What about `f(5)`?",
    "**return**\n\n**return value;** sends a value **back to the caller** and ends the function. The caller can assign it, use it in an expression, or pass it to another function. If a function has no `return` or returns without a value, it returns `undefined`. Use **return** when the function should **produce a value**; the caller then decides what to do with it.\n\n**Example**\n\n```javascript\nfunction sum(a, b) {\n  return a + b;\n}\nconst total = sum(2, 3);\nconsole.log(total);\n```\n\n**Output**\n\n```\n5\n```\n\n**Practice**\n\nWrite a function that takes two numbers and returns the larger one. If called with `7` and `12`, what does it return?",
    "**return vs console.log**\n\n**return** gives a value **to the caller**—the caller can store it or use it. **console.log** only **prints** to the console and returns `undefined`. So a function that only logs does **not** give a value to the caller; `result = myFunc()` is useless if `myFunc` doesn't return. Use **return** for results you want to use; use **console.log** for debugging or output only.\n\n**Example**\n\n```javascript\nfunction bad() { console.log(42); }\nfunction good() { return 42; }\nconsole.log(bad());\nconsole.log(good());\n```\n\n**Output**\n\n```\n42\nundefined\n42\n```\n\n**Practice**\n\nA function should give the caller the length of a string. Should it use **return** or **console.log**? Why?",
    "**Multiple parameters**\n\nList several parameters separated by commas: **function f(a, b, c) { }**. Inside the function you can use all of them. Call with the same number of arguments (or more); extra arguments are ignored, missing ones make parameters `undefined`. Use multiple parameters when the function needs several inputs—e.g. `add(a, b)` or `format(name, age)`.\n\n**Example**\n\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\nconsole.log(add(10, 20));\n```\n\n**Output**\n\n```\n30\n```\n\n**Practice**\n\nWrite a function that takes three numbers and returns their sum. What does it return for `1`, `2`, and `3`?",
    "**Naming functions**\n\nName functions so they describe **what they do**, usually with a **verb**: `getTotal`, `isValid`, `calculateAverage`. That makes code readable. Avoid vague names like `doStuff`. For yes/no results, names like `isEven`, `hasValue` help. Good names reduce the need for comments.\n\n**Example**\n\n```javascript\nfunction isEven(n) { return n % 2 === 0; }\nfunction getGreeting(name) { return \"Hello, \" + name; }\n```\n\n**Practice**\n\nA function takes an array and returns its first element. Give one good name and one bad name for it.",
    "**One job per function**\n\n**Reuse:** write functions that work for different inputs so you can call them from many places instead of copying code. **Single responsibility:** each function does **one clear thing**. If a function does too much, split it into smaller functions. Small, focused functions are easier to test and change. Compose them to build bigger behavior.\n\n**Example**\n\n```javascript\nfunction double(n) { return n * 2; }\nfunction add(a, b) { return a + b; }\nconsole.log(add(double(3), double(4)));\n```\n\n**Output**\n\n```\n14\n```\n\n**Practice**\n\nA block of code (1) reads user input, (2) validates it, (3) saves to a file. Would you put all three in one function? Why or why not?"
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
