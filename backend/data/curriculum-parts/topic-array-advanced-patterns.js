/** Topic: Method chaining and nested arrays (array-advanced-patterns) */
export default {
  "id": "array-advanced-patterns",
  "title": "Method chaining and nested arrays",
  "outcomes": [
    "Method Chaining",
    "2D Arrays: Creating and Accessing",
    "Nested Loops Over a 2D Array",
    "flat()",
    "flatMap()",
    "When to Use Which Method"
  ],
  "outcome_messages": [
    "Let's chain array methods.\n\nWhen an array method **returns an array** (map, filter, slice, etc.), you can call another method on the result: **arr.filter(...).map(...)**. That's **chaining**—each step's output becomes the next step's input. **Order matters**: filter then map first narrows the list, then transforms; map then filter would transform first, then narrow. Use chaining to do \"filter, then map\" (or more steps) without storing intermediate arrays. For long chains, put each method on its own line so the pipeline reads clearly. To debug, assign an intermediate result to a variable and log it, then continue the chain from there.\n\n## Example\n\n```javascript\nconst nums = [1, 2, 3, 4, 5];\nconst result = nums.filter(function(n) {\n  return n % 2 === 0;\n}).map(function(n) {\n  return n * 2;\n});\nconsole.log(result);\n```\n\n## Output\n\n```\n[ 4, 8 ]\n```\n\n## What happens\n\n- filter keeps 2 and 4 → [2, 4].\n- map doubles each → [4, 8].\n- The original array is unchanged.\n\n## Practice\n\nIn the example, why do we filter first and then map?",
    "Let's create and access 2D arrays.\n\nA **2D array** is an **array of arrays**: each inner array is a **row**, and **grid[row][col]** is the element at that row and column. First index = row, second = column. Use 2D arrays for grids, matrices, or tables. **grid.length** is the number of rows; for a rectangular grid, **grid[0].length** is the number of columns.\n\n## Example\n\n```javascript\nconst grid = [[1, 2], [3, 4]];\nconsole.log(grid[0][1]);\nconsole.log(grid[1][0]);\n```\n\n## Output\n\n```\n2\n3\n```\n\n## What happens\n\n- grid[0] is [1, 2]; grid[0][1] is 2 (row 0, column 1).\n- grid[1] is [3, 4]; grid[1][0] is 3 (row 1, column 0).\n\n## Practice\n\nIn the example, what do the two indexes in grid[0][1] represent?",
    "Let's use nested loops over a 2D array.\n\nTo visit **every cell** in a 2D array, use an **outer loop** over rows and an **inner loop** over columns. Loop with **row** from 0 to grid.length - 1, and for each row loop **col** from 0 to grid[row].length - 1; use **grid[row][col]** inside. That traverses the grid **row by row**. Use this to sum all values, find something, or build a new structure.\n\n## Example\n\n```javascript\nconst grid = [[1, 2], [3, 4]];\nfor (let r = 0; r < grid.length; r++) {\n  for (let c = 0; c < grid[r].length; c++) {\n    console.log(grid[r][c]);\n  }\n}\n```\n\n## Output\n\n```\n1\n2\n3\n4\n```\n\n## What happens\n\n- Outer loop: r = 0, then r = 1.\n- Inner loop: for each row, c goes 0, 1 (for two columns).\n- Cells are visited in order: (0,0), (0,1), (1,0), (1,1).\n\n## Practice\n\nIn the example, in what order are the cells visited?",
    "Let's flatten arrays with flat().\n\n**arr.flat()** returns a **new** array with **one level** of nesting removed: [[1,2],[3,4]].flat() → [1,2,3,4]. **arr.flat(depth)** flattens that many levels: flat(1) is the same as flat(); flat(2) removes two levels; **flat(Infinity)** flattens completely. The original array is unchanged. Use flat when you have an array of arrays (or deeper) and want a single-level list.\n\n## Example\n\n```javascript\nconst nested = [[1, 2], [3, 4], [5]];\nconsole.log(nested.flat());\n```\n\n## Output\n\n```\n[ 1, 2, 3, 4, 5 ]\n```\n\n## What happens\n\n- Each inner array is \"opened\" one level; the elements are concatenated in order.\n- nested is unchanged.\n\n## Practice\n\nIn the example, why is the result one level flatter than nested?",
    "Let's map and flatten in one step with flatMap().\n\n**arr.flatMap(callback)** does **map** and then **flat(1)** in one step: the callback can return an **array**, and those arrays are flattened into a single list. Use flatMap when you want \"map each item to an array, then get one flat list\"—e.g. split each string into words and get one array of all words, or expand each number into several values.\n\n## Example\n\n```javascript\nconst words = [\"hello world\", \"hi there\"];\nconsole.log(words.flatMap(function(s) {\n  return s.split(\" \");\n}));\n```\n\n## Output\n\n```\n[ 'hello', 'world', 'hi', 'there' ]\n```\n\n## What happens\n\n- map would give [[\"hello\",\"world\"], [\"hi\",\"there\"]].\n- flatMap maps and then flattens one level → one array of all words.\n\n## Practice\n\nIn the example, why does flatMap give one array of words instead of an array of arrays?",
    "Let's see when to use which method.\n\n**map** when you transform each element one-to-one. **filter** when you want a subset. **reduce** when you need one value (or a custom structure). **flat** when you have nested arrays and want one level (or more with depth). **flatMap** when you map to arrays and want them flattened in one step. **Chain** when you have a clear pipeline (e.g. filter → map → slice). Use **loops** when you need indices, early exit, or more control. Pick the method that matches what you want and keeps the code clear.\n\n## Example\n\n```javascript\nconst nums = [1, 2, 3, 4, 5];\nconsole.log(nums.reduce(function(a, b) {\n  return a + b;\n}, 0));\nconsole.log(nums.filter(function(n) {\n  return n % 2 === 0;\n}));\nconsole.log(nums.map(function(n) {\n  return n * 2;\n}));\n```\n\n## Output\n\n```\n15\n[ 2, 4 ]\n[ 2, 4, 6, 8, 10 ]\n```\n\n## What happens\n\n- reduce: one number (sum). filter: subset (evens). map: transform (doubled).\n- Each method has a clear role; chain them when you need several steps.\n\n## Practice\n\nIn the example, when would you choose reduce instead of map or filter?"
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
