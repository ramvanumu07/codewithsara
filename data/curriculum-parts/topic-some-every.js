/** Topic: some and every (some-every) */
export default {
  "id": "some-every",
  "title": "some and every",
  "outcomes": [
    "some Syntax: The Logical OR for Arrays",
    "every Syntax: The Logical AND for Arrays",
    "Short-Circuit Logic: Optimizing Truth Evaluations",
    "The Vacuous Truth: Empty Array Behavior"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is even.\n  Use some to check if at least one number is even.\n  Examples:\n    hasAnyEven([1, 3, 5, 7, 9]) => false\n    hasAnyEven([1, 2, 3]) => true\n    hasAnyEven([2, 4, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyEven(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyEven",
      "reference_solution": "function hasAnyEven(arr) {\n  return arr.some(function(n) { return n % 2 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              3,
              5,
              7,
              9
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              2,
              4,
              6
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are even.\n  Use every to check if all numbers are even.\n  Examples:\n    areAllEven([2, 4, 6, 8, 10]) => true\n    areAllEven([2, 3, 4]) => false\n    areAllEven([1, 3, 5]) => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllEven(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllEven",
      "reference_solution": "function areAllEven(arr) {\n  return arr.every(function(n) { return n % 2 === 0; });\n}",
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
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              2,
              3,
              4
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is greater than 45.\n  Use some to check if at least one number is greater than 45.\n  Examples:\n    hasAnyGreaterThan45([10, 20, 30, 40, 50]) => true\n    hasAnyGreaterThan45([10, 20, 30]) => false\n    hasAnyGreaterThan45([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyGreaterThan45(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyGreaterThan45",
      "reference_solution": "function hasAnyGreaterThan45(arr) {\n  return arr.some(function(n) { return n > 45; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40,
              50
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              100,
              200
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are greater than 3.\n  Use every to check if all numbers are greater than 3.\n  Examples:\n    areAllGreaterThan3([5, 10, 15, 20, 25]) => true\n    areAllGreaterThan3([1, 2, 3]) => false\n    areAllGreaterThan3([4, 5, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllGreaterThan3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllGreaterThan3",
      "reference_solution": "function areAllGreaterThan3(arr) {\n  return arr.every(function(n) { return n > 3; });\n}",
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
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              4,
              5,
              6
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one string starts with 'b'.\n  Use some to check if at least one string starts with 'b'.\n  Examples:\n    hasAnyStartsWithB([\"apple\", \"banana\", \"cherry\"]) => true\n    hasAnyStartsWithB([\"apple\", \"cherry\"]) => false\n    hasAnyStartsWithB([\"ball\", \"bat\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyStartsWithB(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyStartsWithB",
      "reference_solution": "function hasAnyStartsWithB(arr) {\n  return arr.some(function(s) { return s[0] === 'b'; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              "apple",
              "cherry"
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              "ball",
              "bat"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all strings have length greater than 3.\n  Use every to check if all strings have length greater than 3.\n  Examples:\n    areAllLongerThan3([\"hello\", \"world\", \"test\"]) => true\n    areAllLongerThan3([\"hi\", \"hello\"]) => false\n    areAllLongerThan3([\"code\", \"java\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllLongerThan3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllLongerThan3",
      "reference_solution": "function areAllLongerThan3(arr) {\n  return arr.every(function(s) { return s.length > 3; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hello",
              "world",
              "test"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello"
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              "code",
              "java"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one person is under 18.\n  Use some to check if at least one person is under 18.\n  Examples:\n    hasAnyMinor([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => true\n    hasAnyMinor([{name: \"Diana\", age: 20}, {name: \"Eve\", age: 25}]) => false\n    hasAnyMinor([{name: \"Frank\", age: 16}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyMinor(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyMinor",
      "reference_solution": "function hasAnyMinor(arr) {\n  return arr.some(function(obj) { return obj.age < 18; });\n}",
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
                "age": 17
              },
              {
                "name": "Charlie",
                "age": 30
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 20
              },
              {
                "name": "Eve",
                "age": 25
              }
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Frank",
                "age": 16
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all people are 18 or older.\n  Use every to check if all people are 18 or older.\n  Examples:\n    areAllAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}, {name: \"Charlie\", age: 35}]) => true\n    areAllAdults([{name: \"Diana\", age: 17}, {name: \"Eve\", age: 20}]) => false\n    areAllAdults([{name: \"Frank\", age: 18}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllAdults(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllAdults",
      "reference_solution": "function areAllAdults(arr) {\n  return arr.every(function(obj) { return obj.age >= 18; });\n}",
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
              },
              {
                "name": "Charlie",
                "age": 35
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 17
              },
              {
                "name": "Eve",
                "age": 20
              }
            ]
          },
          "expectedOutput": "false"
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
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is divisible by 3.\n  Use some to check if at least one number is divisible by 3.\n  Examples:\n    hasAnyDivisibleBy3([5, 10, 15, 20]) => true\n    hasAnyDivisibleBy3([1, 2, 4]) => false\n    hasAnyDivisibleBy3([9, 12]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyDivisibleBy3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyDivisibleBy3",
      "reference_solution": "function hasAnyDivisibleBy3(arr) {\n  return arr.some(function(n) { return n % 3 === 0; });\n}",
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
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              4
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              9,
              12
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are divisible by 10.\n  Use every to check if all numbers are divisible by 10.\n  Examples:\n    areAllDivisibleBy10([10, 20, 30, 40]) => true\n    areAllDivisibleBy10([10, 15, 20]) => false\n    areAllDivisibleBy10([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllDivisibleBy10(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllDivisibleBy10",
      "reference_solution": "function areAllDivisibleBy10(arr) {\n  return arr.every(function(n) { return n % 10 === 0; });\n}",
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
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              10,
              15,
              20
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              100,
              200
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    }
  ]
};
