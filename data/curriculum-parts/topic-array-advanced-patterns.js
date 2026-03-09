/** Topic: Method chaining and nested arrays (array-advanced-patterns) */
export default {
  "id": "array-advanced-patterns",
  "title": "Method chaining and nested arrays",
  "outcomes": [
    "Method Chaining: Building Logical Data Pipelines",
    "Code Readability: Formatting and Debugging Chains",
    "Multidimensional Arrays: Creating and Accessing 2D Grids",
    "Nested Iteration: Traversing Rows and Columns",
    "Array Flattening: Working with .flat() and Depth",
    "flatMap(): Combined Transformation and Flattening",
    "Architectural Logic: Choosing the Right Method for the Job"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that chains filter and map.\n  Chain filter and map to: filter even numbers, then double them.\n  Examples:\n    filterAndDouble([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => [4,8,12,16,20]\n    filterAndDouble([5, 10, 15, 20]) => [20,40]\n    filterAndDouble([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterAndDouble(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterAndDouble",
      "reference_solution": "function filterAndDouble(arr) {\n  return arr.filter(n => n % 2 === 0).map(n => n * 2);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10
            ]
          },
          "expectedOutput": "[4,8,12,16,20]"
        },
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20
            ]
          },
          "expectedOutput": "[20,40]"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              2,
              4
            ]
          },
          "expectedOutput": "[4,8]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that chains filter and map for strings.\n  Chain filter and map to: filter strings longer than 5 characters, then convert to uppercase.\n  Examples:\n    filterLongAndUppercase([\"apple\", \"banana\", \"cherry\", \"date\"]) => [\"BANANA\",\"CHERRY\"]\n    filterLongAndUppercase([\"hi\", \"hello\", \"hey\"]) => []\n    filterLongAndUppercase([\"JavaScript\", \"is\", \"awesome\"]) => [\"JAVASCRIPT\",\"AWESOME\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterLongAndUppercase(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterLongAndUppercase",
      "reference_solution": "function filterLongAndUppercase(arr) {\n  return arr.filter(s => s.length > 5).map(s => s.toUpperCase());\n}",
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
          "expectedOutput": "[\"BANANA\",\"CHERRY\"]"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello",
              "hey"
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              "JavaScript",
              "is",
              "awesome"
            ]
          },
          "expectedOutput": "[\"JAVASCRIPT\",\"AWESOME\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that chains map, filter, and reduce.\n  Chain map, filter, and reduce to: double each, filter even results, then sum them.\n  Examples:\n    mapFilterReduce([1, 2, 3, 4, 5]) => 30\n    mapFilterReduce([2, 4, 6]) => 24\n    mapFilterReduce([1, 3, 5]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction mapFilterReduce(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "mapFilterReduce",
      "reference_solution": "function mapFilterReduce(arr) {\n  return arr.map(n => n * 2).filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0);\n}",
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
          "expectedOutput": "30"
        },
        {
          "input": {
            "arr": [
              2,
              4,
              6
            ]
          },
          "expectedOutput": "24"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              10
            ]
          },
          "expectedOutput": "20"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that accesses 2D array element.\n  Access the element at the specified row and column.\n  Examples:\n    access2DElement([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 2) => 6\n    access2DElement([[10, 20], [30, 40]], 0, 1) => 20\n    access2DElement([[5, 10, 15], [20, 25, 30]], 1, 0) => 20\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction access2DElement(arr, row, col) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "access2DElement",
      "reference_solution": "function access2DElement(arr, row, col) {\n  return arr[row][col];\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                2,
                3
              ],
              [
                4,
                5,
                6
              ],
              [
                7,
                8,
                9
              ]
            ],
            "row": 1,
            "col": 2
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "arr": [
              [
                10,
                20
              ],
              [
                30,
                40
              ]
            ],
            "row": 0,
            "col": 1
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "arr": [
              [
                5,
                10,
                15
              ],
              [
                20,
                25,
                30
              ]
            ],
            "row": 1,
            "col": 0
          },
          "expectedOutput": "20"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that sums all elements in a 2D array.\n  Calculate the sum of all elements across all rows.\n  Examples:\n    sum2DArray([[1, 2], [3, 4], [5, 6]]) => 21\n    sum2DArray([[10, 20], [30, 40]]) => 100\n    sum2DArray([[5], [10], [15]]) => 30\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sum2DArray(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sum2DArray",
      "reference_solution": "function sum2DArray(arr) {\n  return arr.flat().reduce((sum, n) => sum + n, 0);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                2
              ],
              [
                3,
                4
              ],
              [
                5,
                6
              ]
            ]
          },
          "expectedOutput": "21"
        },
        {
          "input": {
            "arr": [
              [
                10,
                20
              ],
              [
                30,
                40
              ]
            ]
          },
          "expectedOutput": "100"
        },
        {
          "input": {
            "arr": [
              [
                5
              ],
              [
                10
              ],
              [
                15
              ]
            ]
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "arr": [
              [
                1,
                1,
                1
              ],
              [
                2,
                2,
                2
              ]
            ]
          },
          "expectedOutput": "9"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that extracts the first column from 2D array.\n  Extract the first column (all elements at index 0 of each row).\n  Examples:\n    extractFirstColumn([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) => [1,4,7]\n    extractFirstColumn([[10, 20], [30, 40], [50, 60]]) => [10,30,50]\n    extractFirstColumn([[5, 10, 15], [20, 25, 30]]) => [5,20]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractFirstColumn(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractFirstColumn",
      "reference_solution": "function extractFirstColumn(arr) {\n  return arr.map(row => row[0]);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                2,
                3
              ],
              [
                4,
                5,
                6
              ],
              [
                7,
                8,
                9
              ]
            ]
          },
          "expectedOutput": "[1,4,7]"
        },
        {
          "input": {
            "arr": [
              [
                10,
                20
              ],
              [
                30,
                40
              ],
              [
                50,
                60
              ]
            ]
          },
          "expectedOutput": "[10,30,50]"
        },
        {
          "input": {
            "arr": [
              [
                5,
                10,
                15
              ],
              [
                20,
                25,
                30
              ]
            ]
          },
          "expectedOutput": "[5,20]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses flat() to flatten array one level.\n  Use flat() to flatten it one level deep.\n  Examples:\n    flattenOneLevel([[1, 2], [3, [4, 5]], [6, 7]]) => [1,2,3,[4,5],6,7]\n    flattenOneLevel([[10], [20, [30]], [40]]) => [10,20,[30],40]\n    flattenOneLevel([[1, 2, 3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenOneLevel(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "flattenOneLevel",
      "reference_solution": "function flattenOneLevel(arr) {\n  return arr.flat();\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                2
              ],
              [
                3,
                [
                  4,
                  5
                ]
              ],
              [
                6,
                7
              ]
            ]
          },
          "expectedOutput": "[1,2,3,[4,5],6,7]"
        },
        {
          "input": {
            "arr": [
              [
                10
              ],
              [
                20,
                [
                  30
                ]
              ],
              [
                40
              ]
            ]
          },
          "expectedOutput": "[10,20,[30],40]"
        },
        {
          "input": {
            "arr": [
              [
                1,
                2,
                3
              ]
            ]
          },
          "expectedOutput": "[1,2,3]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses flat() with Infinity to completely flatten.\n  Use flat() with Infinity to completely flatten it.\n  Examples:\n    flattenCompletely([[1, [2, [3, [4]]]]]) => [1,2,3,4]\n    flattenCompletely([[5, [10, [15]]]]) => [5,10,15]\n    flattenCompletely([[1], [2], [3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenCompletely(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "flattenCompletely",
      "reference_solution": "function flattenCompletely(arr) {\n  return arr.flat(Infinity);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                [
                  2,
                  [
                    3,
                    [
                      4
                    ]
                  ]
                ]
              ]
            ]
          },
          "expectedOutput": "[1,2,3,4]"
        },
        {
          "input": {
            "arr": [
              [
                5,
                [
                  10,
                  [
                    15
                  ]
                ]
              ]
            ]
          },
          "expectedOutput": "[5,10,15]"
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
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses flatMap() to split strings into words.\n  Use flatMap() to split each string into words and flatten the result.\n  Examples:\n    splitAndFlatten([\"hello world\", \"test case\"]) => [\"hello\",\"world\",\"test\",\"case\"]\n    splitAndFlatten([\"one two\", \"three\"]) => [\"one\",\"two\",\"three\"]\n    splitAndFlatten([\"JavaScript\"]) => [\"JavaScript\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitAndFlatten(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "splitAndFlatten",
      "reference_solution": "function splitAndFlatten(arr) {\n  return arr.flatMap(s => s.split(' '));\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hello world",
              "test case"
            ]
          },
          "expectedOutput": "[\"hello\",\"world\",\"test\",\"case\"]"
        },
        {
          "input": {
            "arr": [
              "one two",
              "three"
            ]
          },
          "expectedOutput": "[\"one\",\"two\",\"three\"]"
        },
        {
          "input": {
            "arr": [
              "JavaScript"
            ]
          },
          "expectedOutput": "[\"JavaScript\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses flatMap() to duplicate numbers.\n  Use flatMap() to create an array where each number appears twice.\n  Examples:\n    duplicateNumbers([1, 2, 3]) => [1,1,2,2,3,3]\n    duplicateNumbers([5, 10]) => [5,5,10,10]\n    duplicateNumbers([7]) => [7,7]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction duplicateNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "duplicateNumbers",
      "reference_solution": "function duplicateNumbers(arr) {\n  return arr.flatMap(n => [n, n]);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "[1,1,2,2,3,3]"
        },
        {
          "input": {
            "arr": [
              5,
              10
            ]
          },
          "expectedOutput": "[5,5,10,10]"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "[7,7]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses flatMap() to extract all scores.\n  Use flatMap() to extract all scores into a single array.\n  Examples:\n    extractAllScores([{name: \"Alice\", scores: [85, 90]}, {name: \"Bob\", scores: [75, 80]}]) => [85,90,75,80]\n    extractAllScores([{name: \"Charlie\", scores: [95]}, {name: \"Diana\", scores: [88, 92]}]) => [95,88,92]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractAllScores(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractAllScores",
      "reference_solution": "function extractAllScores(arr) {\n  return arr.flatMap(obj => obj.scores);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "scores": [
                  85,
                  90
                ]
              },
              {
                "name": "Bob",
                "scores": [
                  75,
                  80
                ]
              }
            ]
          },
          "expectedOutput": "[85,90,75,80]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Charlie",
                "scores": [
                  95
                ]
              },
              {
                "name": "Diana",
                "scores": [
                  88,
                  92
                ]
              }
            ]
          },
          "expectedOutput": "[95,88,92]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that chains filter and map for adult names.\n  Chain filter and map to: filter adults (age >= 18), then extract just names.\n  Examples:\n    getAdultNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => [\"Alice\",\"Charlie\"]\n    getAdultNames([{name: \"Diana\", age: 16}, {name: \"Eve\", age: 20}]) => [\"Eve\"]\n    getAdultNames([{name: \"Frank\", age: 18}]) => [\"Frank\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getAdultNames(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "getAdultNames",
      "reference_solution": "function getAdultNames(arr) {\n  return arr.filter(p => p.age >= 18).map(p => p.name);\n}",
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
          "expectedOutput": "[\"Alice\",\"Charlie\"]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 16
              },
              {
                "name": "Eve",
                "age": 20
              }
            ]
          },
          "expectedOutput": "[\"Eve\"]"
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
          "expectedOutput": "[\"Frank\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that calculates sum of each row.\n  Create a new array containing the sum of each row.\n  Examples:\n    sumEachRow([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) => [6,15,24]\n    sumEachRow([[10, 20], [30, 40]]) => [30,70]\n    sumEachRow([[5], [10], [15]]) => [5,10,15]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumEachRow(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sumEachRow",
      "reference_solution": "function sumEachRow(arr) {\n  return arr.map(row => row.reduce((a, b) => a + b, 0));\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              [
                1,
                2,
                3
              ],
              [
                4,
                5,
                6
              ],
              [
                7,
                8,
                9
              ]
            ]
          },
          "expectedOutput": "[6,15,24]"
        },
        {
          "input": {
            "arr": [
              [
                10,
                20
              ],
              [
                30,
                40
              ]
            ]
          },
          "expectedOutput": "[30,70]"
        },
        {
          "input": {
            "arr": [
              [
                5
              ],
              [
                10
              ],
              [
                15
              ]
            ]
          },
          "expectedOutput": "[5,10,15]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that chains filter, map, and reduce.\n  Chain methods to: filter numbers > 2, square them, then calculate the sum.\n  Examples:\n    filterSquareSum([1, 2, 3, 4, 5, 6]) => 86\n    filterSquareSum([1, 2, 3]) => 9\n    filterSquareSum([5, 10]) => 125\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterSquareSum(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterSquareSum",
      "reference_solution": "function filterSquareSum(arr) {\n  return arr.filter(n => n > 2).map(n => n * n).reduce((a, b) => a + b, 0);\n}",
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
          "expectedOutput": "86"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "9"
        },
        {
          "input": {
            "arr": [
              5,
              10
            ]
          },
          "expectedOutput": "125"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that chains filter, map, and join.\n  Chain methods to: filter strings with length > 3, convert to uppercase, then join with comma.\n  Examples:\n    filterUppercaseJoin([\"hi\", \"hello\", \"hey\", \"greetings\"]) => \"HELLO,GREETINGS\"\n    filterUppercaseJoin([\"test\", \"code\", \"js\"]) => \"TEST,CODE\"\n    filterUppercaseJoin([\"a\", \"b\"]) => \"\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterUppercaseJoin(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterUppercaseJoin",
      "reference_solution": "function filterUppercaseJoin(arr) {\n  return arr.filter(s => s.length > 3).map(s => s.toUpperCase()).join(',');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hi",
              "hello",
              "hey",
              "greetings"
            ]
          },
          "expectedOutput": "HELLO,GREETINGS"
        },
        {
          "input": {
            "arr": [
              "test",
              "code",
              "js"
            ]
          },
          "expectedOutput": "TEST,CODE"
        },
        {
          "input": {
            "arr": [
              "a",
              "ab",
              "abc"
            ]
          },
          "expectedOutput": ""
        }
      ]
    }
  ]
};
