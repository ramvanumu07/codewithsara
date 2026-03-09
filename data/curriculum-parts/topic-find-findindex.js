/** Topic: find and findIndex (find-findindex) */
export default {
  "id": "find-findindex",
  "title": "find and findIndex",
  "outcomes": [
    "find Syntax: Retrieving the First Matching Element",
    "findIndex Syntax: Locating the Position of a Match",
    "Search Failure (Value): Handling undefined in find",
    "Search Failure (Index): Handling -1 in findIndex",
    "Efficiency: Understanding why searching stops at the first match"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses find to get first number greater than 12.\n  Use find to get the first number greater than 12.\n  Examples:\n    findFirstGreaterThan12([5, 10, 15, 20, 25]) => 15\n    findFirstGreaterThan12([1, 2, 3]) => undefined\n    findFirstGreaterThan12([13, 14, 15]) => 13\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstGreaterThan12(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstGreaterThan12",
      "reference_solution": "function findFirstGreaterThan12(arr) {\n  return arr.find(function(n) { return n > 12; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20,
              25
            ]
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "undefined"
        },
        {
          "input": {
            "arr": [
              13,
              14,
              15
            ]
          },
          "expectedOutput": "13"
        },
        {
          "input": {
            "arr": [
              100
            ]
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses findIndex to get index of first number greater than 12.\n  Use findIndex to get the index of the first number greater than 12.\n  Examples:\n    findIndexGreaterThan12([5, 10, 15, 20, 25]) => 2\n    findIndexGreaterThan12([1, 2, 3]) => -1\n    findIndexGreaterThan12([13, 14, 15]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexGreaterThan12(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findIndexGreaterThan12",
      "reference_solution": "function findIndexGreaterThan12(arr) {\n  return arr.findIndex(function(n) { return n > 12; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20,
              25
            ]
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "arr": [
              13,
              14,
              15
            ]
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              5,
              20
            ]
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses find to get first string starting with 'c'.\n  Use find to get the first string that starts with the letter 'c'.\n  Examples:\n    findFirstStartsWithC([\"apple\", \"banana\", \"cherry\", \"date\"]) => \"cherry\"\n    findFirstStartsWithC([\"cat\", \"dog\", \"cow\"]) => \"cat\"\n    findFirstStartsWithC([\"apple\", \"banana\"]) => undefined\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstStartsWithC(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstStartsWithC",
      "reference_solution": "function findFirstStartsWithC(arr) {\n  return arr.find(function(s) { return s[0] === 'c'; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry",
              "date"
            ]
          },
          "expectedOutput": "cherry"
        },
        {
          "input": {
            "arr": [
              "cat",
              "dog",
              "cow"
            ]
          },
          "expectedOutput": "cat"
        },
        {
          "input": {
            "arr": [
              "apple",
              "banana"
            ]
          },
          "expectedOutput": "undefined"
        },
        {
          "input": {
            "arr": [
              "cake"
            ]
          },
          "expectedOutput": "cake"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses find to get object with specific id.\n  Use find to get the object with id equal to 2.\n  Examples:\n    findObjectById2([{id: 1, name: \"Alice\"}, {id: 2, name: \"Bob\"}, {id: 3, name: \"Charlie\"}]) => {\"id\":2,\"name\":\"Bob\"}\n    findObjectById2([{id: 1, name: \"Alice\"}]) => undefined\n    findObjectById2([{id: 5, name: \"Diana\"}, {id: 2, name: \"Eve\"}]) => {\"id\":2,\"name\":\"Eve\"}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findObjectById2(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findObjectById2",
      "reference_solution": "function findObjectById2(arr) {\n  return arr.find(function(obj) { return obj.id === 2; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "id": 1,
                "name": "Alice"
              },
              {
                "id": 2,
                "name": "Bob"
              },
              {
                "id": 3,
                "name": "Charlie"
              }
            ]
          },
          "expectedOutput": "{\"id\":2,\"name\":\"Bob\"}"
        },
        {
          "input": {
            "arr": [
              {
                "id": 1,
                "name": "Alice"
              }
            ]
          },
          "expectedOutput": "undefined"
        },
        {
          "input": {
            "arr": [
              {
                "id": 5,
                "name": "Diana"
              },
              {
                "id": 2,
                "name": "Eve"
              }
            ]
          },
          "expectedOutput": "{\"id\":2,\"name\":\"Eve\"}"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses findIndex to get index of object with specific id.\n  Use findIndex to get the index of the object with id equal to 3.\n  Examples:\n    findIndexById3([{id: 1, name: \"Alice\"}, {id: 2, name: \"Bob\"}, {id: 3, name: \"Charlie\"}]) => 2\n    findIndexById3([{id: 5, name: \"Diana\"}]) => -1\n    findIndexById3([{id: 3, name: \"Eve\"}, {id: 4, name: \"Frank\"}]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexById3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findIndexById3",
      "reference_solution": "function findIndexById3(arr) {\n  return arr.findIndex(function(obj) { return obj.id === 3; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "id": 1,
                "name": "Alice"
              },
              {
                "id": 2,
                "name": "Bob"
              },
              {
                "id": 3,
                "name": "Charlie"
              }
            ]
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "arr": [
              {
                "id": 5,
                "name": "Diana"
              }
            ]
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "arr": [
              {
                "id": 3,
                "name": "Eve"
              },
              {
                "id": 4,
                "name": "Frank"
              }
            ]
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses find to get first odd number.\n  Use find to get the first odd number.\n  Examples:\n    findFirstOdd([2, 4, 6, 8, 10]) => undefined\n    findFirstOdd([1, 2, 3]) => 1\n    findFirstOdd([2, 3, 4]) => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstOdd(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstOdd",
      "reference_solution": "function findFirstOdd(arr) {\n  return arr.find(function(n) { return n % 2 !== 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              2,
              4,
              6,
              8,
              10
            ]
          },
          "expectedOutput": "undefined"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "arr": [
              2,
              3,
              4
            ]
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "7"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses findIndex to get index of first number divisible by 5.\n  Use findIndex to get the index of the first number divisible by 5.\n  Examples:\n    findIndexDivisibleBy5([3, 6, 9, 12, 15]) => 4\n    findIndexDivisibleBy5([1, 2, 3]) => -1\n    findIndexDivisibleBy5([5, 10]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexDivisibleBy5(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findIndexDivisibleBy5",
      "reference_solution": "function findIndexDivisibleBy5(arr) {\n  return arr.findIndex(function(n) { return n % 5 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              3,
              6,
              9,
              12,
              15
            ]
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "arr": [
              5,
              10
            ]
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              3,
              10,
              20
            ]
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses find to get first long string.\n  Use find to get the first string with length greater than 10.\n  Examples:\n    findFirstLongString([\"short\", \"medium length\", \"tiny\", \"a bit longer\"]) => \"medium length\"\n    findFirstLongString([\"hi\", \"hello\"]) => undefined\n    findFirstLongString([\"JavaScript is awesome\"]) => \"JavaScript is awesome\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstLongString(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstLongString",
      "reference_solution": "function findFirstLongString(arr) {\n  return arr.find(function(s) { return s.length > 10; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "short",
              "medium length",
              "tiny",
              "a bit longer"
            ]
          },
          "expectedOutput": "medium length"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello"
            ]
          },
          "expectedOutput": "undefined"
        },
        {
          "input": {
            "arr": [
              "JavaScript is awesome"
            ]
          },
          "expectedOutput": "JavaScript is awesome"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses findIndex to get index of first adult.\n  Use findIndex to get the index of the first person aged 18 or older.\n  Examples:\n    findIndexFirstAdult([{name: \"Alice\", age: 17}, {name: \"Bob\", age: 25}, {name: \"Charlie\", age: 30}]) => 1\n    findIndexFirstAdult([{name: \"Diana\", age: 15}, {name: \"Eve\", age: 16}]) => -1\n    findIndexFirstAdult([{name: \"Frank\", age: 18}]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexFirstAdult(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findIndexFirstAdult",
      "reference_solution": "function findIndexFirstAdult(arr) {\n  return arr.findIndex(function(obj) { return obj.age >= 18; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "age": 17
              },
              {
                "name": "Bob",
                "age": 25
              },
              {
                "name": "Charlie",
                "age": 30
              }
            ]
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 15
              },
              {
                "name": "Eve",
                "age": 16
              }
            ]
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Frank",
                "age": 18
              }
            ]
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses find to get first even number with fallback message.\n  Use find to get the first even number.\n  If no even number exists, return \"No even number found\".\n  Otherwise return the number.\n  Examples:\n    findFirstEvenOrMessage([1, 3, 5, 7, 9, 11]) => \"No even number found\"\n    findFirstEvenOrMessage([1, 2, 3]) => 2\n    findFirstEvenOrMessage([8, 10]) => 8\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstEvenOrMessage(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstEvenOrMessage",
      "reference_solution": "function findFirstEvenOrMessage(arr) {\n  const found = arr.find(function(n) { return n % 2 === 0; });\n  return found !== undefined ? found : 'No even number found';\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              3,
              5,
              7,
              9,
              11
            ]
          },
          "expectedOutput": "No even number found"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "arr": [
              8,
              10
            ]
          },
          "expectedOutput": "8"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              6
            ]
          },
          "expectedOutput": "6"
        }
      ]
    }
  ]
};
