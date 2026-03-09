/** Topic: map for transformation (map) */
export default {
  "id": "map",
  "title": "map for transformation",
  "outcomes": [
    "map Syntax: Projecting Data to a New Array",
    "Functional Transformation: The Mapping Logic",
    "Index Preservation: Why Input and Output Length Match",
    "Immutability: Protecting the Original Data Source"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses map to double numbers.\n  Use map to create a new array with each number doubled.\n  Examples:\n    doubleNumbers([1, 2, 3, 4, 5]) => [2,4,6,8,10]\n    doubleNumbers([10, 20, 30]) => [20,40,60]\n    doubleNumbers([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "doubleNumbers",
      "reference_solution": "function doubleNumbers(arr) {\n  return arr.map(function(n) { return n * 2; });\n}",
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
          "expectedOutput": "[2,4,6,8,10]"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "[20,40,60]"
        },
        {
          "input": {
            "arr": [
              0
            ]
          },
          "expectedOutput": "[0]"
        },
        {
          "input": {
            "arr": [
              7,
              14
            ]
          },
          "expectedOutput": "[14,28]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to convert strings to uppercase.\n  Use map to create a new array with each string in uppercase.\n  Examples:\n    uppercaseStrings([\"hello\", \"world\", \"javascript\"]) => [\"HELLO\",\"WORLD\",\"JAVASCRIPT\"]\n    uppercaseStrings([\"apple\", \"banana\"]) => [\"APPLE\",\"BANANA\"]\n    uppercaseStrings([\"test\"]) => [\"TEST\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction uppercaseStrings(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "uppercaseStrings",
      "reference_solution": "function uppercaseStrings(arr) {\n  return arr.map(function(s) { return s.toUpperCase(); });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hello",
              "world",
              "javascript"
            ]
          },
          "expectedOutput": "[\"HELLO\",\"WORLD\",\"JAVASCRIPT\"]"
        },
        {
          "input": {
            "arr": [
              "apple",
              "banana"
            ]
          },
          "expectedOutput": "[\"APPLE\",\"BANANA\"]"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "[\"TEST\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to square numbers.\n  Use map to create a new array with each number squared.\n  Examples:\n    squareNumbers([1, 2, 3, 4]) => [1,4,9,16]\n    squareNumbers([5, 10]) => [25,100]\n    squareNumbers([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction squareNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "squareNumbers",
      "reference_solution": "function squareNumbers(arr) {\n  return arr.map(function(n) { return n * n; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4
            ]
          },
          "expectedOutput": "[1,4,9,16]"
        },
        {
          "input": {
            "arr": [
              5,
              10
            ]
          },
          "expectedOutput": "[25,100]"
        },
        {
          "input": {
            "arr": [
              0
            ]
          },
          "expectedOutput": "[0]"
        },
        {
          "input": {
            "arr": [
              3,
              7
            ]
          },
          "expectedOutput": "[9,49]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to get string lengths.\n  Use map to create a new array containing the length of each string.\n  Examples:\n    getStringLengths([\"cat\", \"elephant\", \"dog\"]) => [3,8,3]\n    getStringLengths([\"hi\", \"hello\", \"hey\"]) => [2,5,3]\n    getStringLengths([\"\"]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getStringLengths(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "getStringLengths",
      "reference_solution": "function getStringLengths(arr) {\n  return arr.map(function(s) { return s.length; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "cat",
              "elephant",
              "dog"
            ]
          },
          "expectedOutput": "[3,8,3]"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello",
              "hey"
            ]
          },
          "expectedOutput": "[2,5,3]"
        },
        {
          "input": {
            "arr": [
              ""
            ]
          },
          "expectedOutput": "[0]"
        },
        {
          "input": {
            "arr": [
              "JavaScript"
            ]
          },
          "expectedOutput": "[10]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to divide numbers by 10.\n  Use map to create a new array with each number divided by 10.\n  Examples:\n    divideByTen([10, 20, 30, 40]) => [1,2,3,4]\n    divideByTen([50, 100]) => [5,10]\n    divideByTen([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction divideByTen(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "divideByTen",
      "reference_solution": "function divideByTen(arr) {\n  return arr.map(function(n) { return n / 10; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40
            ]
          },
          "expectedOutput": "[1,2,3,4]"
        },
        {
          "input": {
            "arr": [
              50,
              100
            ]
          },
          "expectedOutput": "[5,10]"
        },
        {
          "input": {
            "arr": [
              0
            ]
          },
          "expectedOutput": "[0]"
        },
        {
          "input": {
            "arr": [
              70
            ]
          },
          "expectedOutput": "[7]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to extract names from objects.\n  Use map to create a new array containing only the names from person objects.\n  Examples:\n    extractNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}]) => [\"Alice\",\"Bob\"]\n    extractNames([{name: \"Charlie\", age: 22}]) => [\"Charlie\"]\n    extractNames([{name: \"Diana\", age: 28}, {name: \"Eve\", age: 35}]) => [\"Diana\",\"Eve\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractNames(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractNames",
      "reference_solution": "function extractNames(arr) {\n  return arr.map(function(obj) { return obj.name; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "age": 25
              },
              {
                "name": "Bob",
                "age": 30
              }
            ]
          },
          "expectedOutput": "[\"Alice\",\"Bob\"]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Charlie",
                "age": 22
              }
            ]
          },
          "expectedOutput": "[\"Charlie\"]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 28
              },
              {
                "name": "Eve",
                "age": 35
              }
            ]
          },
          "expectedOutput": "[\"Diana\",\"Eve\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to add 100 to each number.\n  Use map to create a new array where each number has 100 added to it.\n  Examples:\n    addHundred([5, 10, 15, 20]) => [105,110,115,120]\n    addHundred([0, 50]) => [100,150]\n    addHundred([1]) => [101]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction addHundred(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "addHundred",
      "reference_solution": "function addHundred(arr) {\n  return arr.map(function(n) { return n + 100; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20
            ]
          },
          "expectedOutput": "[105,110,115,120]"
        },
        {
          "input": {
            "arr": [
              0,
              50
            ]
          },
          "expectedOutput": "[100,150]"
        },
        {
          "input": {
            "arr": [
              1
            ]
          },
          "expectedOutput": "[101]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to convert numbers to booleans.\n  Use map to create a new array where each number is converted to a boolean.\n  Even numbers should be true, odd numbers should be false.\n  Examples:\n    numbersToEvenBooleans([1, 2, 3, 4, 5]) => [false,true,false,true,false]\n    numbersToEvenBooleans([10, 15, 20]) => [true,false,true]\n    numbersToEvenBooleans([7]) => [false]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction numbersToEvenBooleans(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "numbersToEvenBooleans",
      "reference_solution": "function numbersToEvenBooleans(arr) {\n  return arr.map(function(n) { return n % 2 === 0; });\n}",
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
          "expectedOutput": "[false,true,false,true,false]"
        },
        {
          "input": {
            "arr": [
              10,
              15,
              20
            ]
          },
          "expectedOutput": "[true,false,true]"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "[false]"
        },
        {
          "input": {
            "arr": [
              8
            ]
          },
          "expectedOutput": "[true]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to format student data.\n  Use map to create a new array of strings formatted as: \"name: score\".\n  Examples:\n    formatStudents([{name: \"Alice\", score: 85}, {name: \"Bob\", score: 92}]) => [\"Alice: 85\",\"Bob: 92\"]\n    formatStudents([{name: \"Charlie\", score: 78}]) => [\"Charlie: 78\"]\n    formatStudents([{name: \"Diana\", score: 95}, {name: \"Eve\", score: 88}]) => [\"Diana: 95\",\"Eve: 88\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction formatStudents(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "formatStudents",
      "reference_solution": "function formatStudents(arr) {\n  return arr.map(function(obj) { return obj.name + ': ' + obj.score; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "score": 85
              },
              {
                "name": "Bob",
                "score": 92
              }
            ]
          },
          "expectedOutput": "[\"Alice: 85\",\"Bob: 92\"]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Charlie",
                "score": 78
              }
            ]
          },
          "expectedOutput": "[\"Charlie: 78\"]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "score": 95
              },
              {
                "name": "Eve",
                "score": 88
              }
            ]
          },
          "expectedOutput": "[\"Diana: 95\",\"Eve: 88\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses map to convert strings to numbers.\n  Use map to create a new array with each string converted to a number.\n  Examples:\n    stringsToNumbers([\"1\", \"2\", \"3\", \"4\"]) => [1,2,3,4]\n    stringsToNumbers([\"10\", \"20\"]) => [10,20]\n    stringsToNumbers([\"5\"]) => [5]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction stringsToNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "stringsToNumbers",
      "reference_solution": "function stringsToNumbers(arr) {\n  return arr.map(function(s) { return Number(s); });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "1",
              "2",
              "3",
              "4"
            ]
          },
          "expectedOutput": "[1,2,3,4]"
        },
        {
          "input": {
            "arr": [
              "10",
              "20"
            ]
          },
          "expectedOutput": "[10,20]"
        },
        {
          "input": {
            "arr": [
              "5"
            ]
          },
          "expectedOutput": "[5]"
        },
        {
          "input": {
            "arr": [
              "0",
              "100"
            ]
          },
          "expectedOutput": "[0,100]"
        }
      ]
    }
  ]
};
