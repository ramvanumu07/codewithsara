/** Topic: find and findIndex (find-findindex) */
export default {
  "id": "find-findindex",
  "title": "find and findIndex",
  "outcomes": [
    "What find Does",
    "What findIndex Does",
    "When Nothing Matches"
  ],
  "outcome_messages": [
    "**What find does**\n\n**array.find(callback)** returns the **first element** for which the callback returns **true** (or truthy). It **stops** as soon as it finds one—it does not scan the rest. If no element passes the test, find returns **undefined**. Use find when you need **one** matching item (e.g. the first number greater than 10), not all of them—use filter for that.\n\n**Example**\n\n```javascript\nconst nums = [5, 10, 15, 20];\nconst first = nums.find(function(n) { return n > 12; });\nconsole.log(first);\n```\n\n**Output**\n\n```\n15\n```\n\n**What happens**\n\n- 5 > 12? No. 10 > 12? No. 15 > 12? Yes → return 15 and stop.\n- 20 is never checked. find returns only the first match.\n\n**Practice**\n\nUse find on [\"apple\", \"banana\", \"cherry\"] to get the first string longer than 5 characters. What is the result?",
    "**What findIndex does**\n\n**array.findIndex(callback)** works like find, but it returns the **index** of the first matching element (0-based), not the element itself. It also stops at the first match. If no element passes, findIndex returns **-1**. Use findIndex when you need to know **where** the match is—for example to update or remove that slot. Use arr[i] to get the value at that index.\n\n**Example**\n\n```javascript\nconst arr = [10, 20, 30, 40];\nconst i = arr.findIndex(function(x) { return x > 25; });\nconsole.log(i);\n```\n\n**Output**\n\n```\n2\n```\n\n**What happens**\n\n- 10 > 25? No. 20 > 25? No. 30 > 25? Yes → return the index of 30, which is 2.\n- findIndex returns 2 (the index), not 30. The value at that index is arr[2] = 30.\n\n**Practice**\n\nfindIndex on [\"a\", \"bb\", \"ccc\"] with a callback that returns true when the string length is 2. What index do you get?",
    "**When nothing matches**\n\nIf **no element** makes the callback return true:\n\n- **find** returns **undefined**.\n- **findIndex** returns **-1**.\n\nAlways **check** before using the result. For find: if (item !== undefined) { ... }. For findIndex: if (i !== -1) { ... arr[i] ... }. Don't use -1 as an array index—it means \"not found.\"\n\n**Example**\n\n```javascript\nconst a = [1, 2, 3];\nconst b = a.find(function(n) { return n > 10; });\nconst c = a.findIndex(function(n) { return n === 99; });\nconsole.log(b, c);\n```\n\n**Output**\n\n```\nundefined -1\n```\n\n**What happens**\n\n- No element is > 10, so find returns undefined.\n- No element equals 99, so findIndex returns -1.\n- Code that uses b or c should handle these \"not found\" cases.\n\n**Practice**\n\nGive two possible reasons why find might return undefined. Write one condition that is true only when findIndex found a match (so it's safe to use the index)."
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
