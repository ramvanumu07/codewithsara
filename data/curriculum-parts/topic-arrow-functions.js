/** Topic: Arrow Functions (arrow-functions) */
export default {
  "id": "arrow-functions",
  "title": "Arrow Functions",
  "outcomes": [
    "Arrow Syntax: The Modern Function Expression",
    "Concise vs. Full Body: Knowing when to use { }",
    "Parameter Formatting: Rules for () and single inputs",
    "Implicit Return: Returning values without the keyword",
    "The Object Trap: Returning Object Literals safely",
    "Functional Synergy: Arrow Functions with Array Methods",
    "Lexical this: How arrows inherit context",
    "Architectural Constraints: When to stick to regular functions"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below arrow function that takes no parameters and returns \"Hello!\".\n  Examples:\n    greet() => \"Hello!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst greet = () => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "greet",
      "reference_solution": "const greet = () => {\n  return \"Hello!\";\n};",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Hello!"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to calculate the square of a number.\n  Examples:\n    square(5) => 25\n    square(7) => 49\n    square(0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst square = (num) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "square",
      "reference_solution": "const square = (num) => {\n  return num * num;\n};",
      "testCases": [
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "49"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "100"
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
      "description": "/*\n  Implement the below arrow function to multiply two numbers.\n  Examples:\n    multiply(6, 7) => 42\n    multiply(5, 5) => 25\n    multiply(0, 100) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst multiply = (a, b) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "multiply",
      "reference_solution": "const multiply = (a, b) => {\n  return a * b;\n};",
      "testCases": [
        {
          "input": {
            "a": 6,
            "b": 7
          },
          "expectedOutput": "42"
        },
        {
          "input": {
            "a": 5,
            "b": 5
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "a": 10,
            "b": 3
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "a": 0,
            "b": 100
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to check if a number is positive.\n  Examples:\n    isPositive(5) => true\n    isPositive(-3) => false\n    isPositive(0) => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst isPositive = (num) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "isPositive",
      "reference_solution": "const isPositive = (num) => {\n  return num > 0;\n};",
      "testCases": [
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "num": -3
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "num": 100
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to create a full name from first and last names.\n  Examples:\n    getFullName(\"John\", \"Doe\") => \"John Doe\"\n    getFullName(\"Jane\", \"Smith\") => \"Jane Smith\"\n    getFullName(\"Alice\", \"Johnson\") => \"Alice Johnson\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getFullName = (firstName, lastName) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "getFullName",
      "reference_solution": "const getFullName = (firstName, lastName) => {\n  return firstName + \" \" + lastName;\n};",
      "testCases": [
        {
          "input": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "expectedOutput": "John Doe"
        },
        {
          "input": {
            "firstName": "Jane",
            "lastName": "Smith"
          },
          "expectedOutput": "Jane Smith"
        },
        {
          "input": {
            "firstName": "Alice",
            "lastName": "Johnson"
          },
          "expectedOutput": "Alice Johnson"
        },
        {
          "input": {
            "firstName": "Bob",
            "lastName": "Brown"
          },
          "expectedOutput": "Bob Brown"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to create a person object.\n  Return an object with name and age properties.\n  Examples:\n    createPerson(\"Alice\", 25) => {\"name\":\"Alice\",\"age\":25}\n    createPerson(\"Bob\", 30) => {\"name\":\"Bob\",\"age\":30}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst createPerson = (name, age) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "createPerson",
      "reference_solution": "const createPerson = (name, age) => {\n  return { name: name, age: age };\n};",
      "testCases": [
        {
          "input": {
            "name": "Alice",
            "age": 25
          },
          "expectedOutput": "{\"name\":\"Alice\",\"age\":25}"
        },
        {
          "input": {
            "name": "Bob",
            "age": 30
          },
          "expectedOutput": "{\"name\":\"Bob\",\"age\":30}"
        },
        {
          "input": {
            "name": "Charlie",
            "age": 22
          },
          "expectedOutput": "{\"name\":\"Charlie\",\"age\":22}"
        },
        {
          "input": {
            "name": "Diana",
            "age": 28
          },
          "expectedOutput": "{\"name\":\"Diana\",\"age\":28}"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to filter even numbers from an array.\n  Examples:\n    filterEven([1, 2, 3, 4, 5, 6]) => [2,4,6]\n    filterEven([10, 15, 20, 25]) => [10,20]\n    filterEven([1, 3, 5, 7]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst filterEven = (arr) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "filterEven",
      "reference_solution": "const filterEven = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) result.push(arr[i]);\n  }\n  return result;\n};",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          "expectedOutput": "[2,4,6]"
        },
        {
          "input": {
            "arr": [
              10,
              15,
              20,
              25
            ]
          },
          "expectedOutput": "[10,20]"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5,
              7
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              2,
              4,
              6,
              8
            ]
          },
          "expectedOutput": "[2,4,6,8]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to double all values in an array.\n  Examples:\n    doubleValues([1, 2, 3, 4]) => [2,4,6,8]\n    doubleValues([5, 10, 15]) => [10,20,30]\n    doubleValues([0, 1, 2]) => [0,2,4]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst doubleValues = (arr) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "doubleValues",
      "reference_solution": "const doubleValues = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr[i] * 2);\n  }\n  return result;\n};",
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
          "expectedOutput": "[2,4,6,8]"
        },
        {
          "input": {
            "arr": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "[10,20,30]"
        },
        {
          "input": {
            "arr": [
              0,
              1,
              2
            ]
          },
          "expectedOutput": "[0,2,4]"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "[14]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to calculate the sum of all elements in an array.\n  Examples:\n    sumAll([1, 2, 3, 4, 5]) => 15\n    sumAll([10, 20, 30]) => 60\n    sumAll([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst sumAll = (arr) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "sumAll",
      "reference_solution": "const sumAll = (arr) => {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n};",
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
      "description": "/*\n  Implement the below arrow function to get the length of each string in an array.\n  Examples:\n    getLengths([\"hi\", \"hello\", \"hey\"]) => [2,5,3]\n    getLengths([\"JavaScript\", \"is\", \"awesome\"]) => [10,2,7]\n    getLengths([\"a\", \"ab\", \"abc\"]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getLengths = (arr) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "getLengths",
      "reference_solution": "const getLengths = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr[i].length);\n  }\n  return result;\n};",
      "testCases": [
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
              "JavaScript",
              "is",
              "awesome"
            ]
          },
          "expectedOutput": "[10,2,7]"
        },
        {
          "input": {
            "arr": [
              "a",
              "ab",
              "abc"
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "arr": [
              ""
            ]
          },
          "expectedOutput": "[0]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to filter adults (18+) from an array of people.\n  Each person is an object with name and age properties.\n  Examples:\n    getAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 15}]) => [{\"name\":\"Alice\",\"age\":25}]\n    getAdults([{name: \"Charlie\", age: 30}, {name: \"Diana\", age: 20}]) => [{\"name\":\"Charlie\",\"age\":30},{\"name\":\"Diana\",\"age\":20}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getAdults = (people) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "getAdults",
      "reference_solution": "const getAdults = (people) => {\n  const result = [];\n  for (let i = 0; i < people.length; i++) {\n    if (people[i].age >= 18) result.push(people[i]);\n  }\n  return result;\n};",
      "testCases": [
        {
          "input": {
            "people": [
              {
                "name": "Alice",
                "age": 25
              },
              {
                "name": "Bob",
                "age": 15
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Alice\",\"age\":25}]"
        },
        {
          "input": {
            "people": [
              {
                "name": "Charlie",
                "age": 30
              },
              {
                "name": "Diana",
                "age": 20
              },
              {
                "name": "Eve",
                "age": 17
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Charlie\",\"age\":30},{\"name\":\"Diana\",\"age\":20}]"
        },
        {
          "input": {
            "people": [
              {
                "name": "Frank",
                "age": 18
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Frank\",\"age\":18}]"
        },
        {
          "input": {
            "people": [
              {
                "name": "Grace",
                "age": 10
              },
              {
                "name": "Henry",
                "age": 12
              }
            ]
          },
          "expectedOutput": "[]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below arrow function to perform basic calculator operations.\n  Operation can be \"add\", \"subtract\", \"multiply\", or \"divide\".\n  Examples:\n    calculator(10, 5, \"add\") => 15\n    calculator(10, 5, \"subtract\") => 5\n    calculator(10, 5, \"multiply\") => 50\n    calculator(10, 5, \"divide\") => 2\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst calculator = (a, b, operation) => {\n  // Implementation here\n};",
      "solution_type": "function",
      "function_name": "calculator",
      "reference_solution": "const calculator = (a, b, operation) => {\n  if (operation === \"add\") return a + b;\n  if (operation === \"subtract\") return a - b;\n  if (operation === \"multiply\") return a * b;\n  if (operation === \"divide\") return a / b;\n  return 0;\n};",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 5,
            "operation": "add"
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "a": 10,
            "b": 5,
            "operation": "subtract"
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "a": 10,
            "b": 5,
            "operation": "multiply"
          },
          "expectedOutput": "50"
        },
        {
          "input": {
            "a": 10,
            "b": 5,
            "operation": "divide"
          },
          "expectedOutput": "2"
        }
      ]
    }
  ]
};
