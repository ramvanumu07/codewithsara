/** Topic: reduce for accumulation (reduce) */
export default {
  "id": "reduce",
  "title": "reduce for accumulation",
  "outcomes": [
    "What reduce Does",
    "Initial Value and the Accumulator",
    "Building Strings and Other Values",
    "Building Arrays and Objects with reduce"
  ],
  "outcome_messages": [
    "**What reduce does**\n\n**array.reduce(callback, initialValue)** turns the whole array into **one value**. The callback gets **(accumulator, currentElement)** and returns the updated accumulator; reduce passes that to the next step. After the last element, reduce returns the final accumulator. Use reduce when you need a single result from the list: sum, product, max, a concatenated string, or even a new array or object.\n\n**Example**\n\n```javascript\nconst nums = [1, 2, 3, 4];\nconst sum = nums.reduce(function(acc, n) { return acc + n; }, 0);\nconsole.log(sum);\n```\n\n**Output**\n\n```\n10\n```\n\n**What happens**\n\n- Start: acc = 0 (the initial value).\n- Step 1: acc=0, n=1 → return 1. Step 2: acc=1, n=2 → return 3. Step 3: acc=3, n=3 → return 6. Step 4: acc=6, n=4 → return 10.\n- reduce returns 10.\n\n**Practice**\n\nUse reduce to compute the sum of [10, 20, 30]. What initial value do you use, and what is the result?",
    "**Initial value and the accumulator**\n\nThe **second argument** to reduce is the **initial value**—the accumulator for the first step. Choose it by the kind of result you want: 0 for sum, 1 for product, \"\" for building a string, [] for building an array, {} for building an object. If you **omit** the initial value, reduce uses the **first element** as the accumulator and starts from the **second** element. With an **empty array** and no initial value, reduce throws; always pass an initial value when the array might be empty.\n\n**Example**\n\n```javascript\nconst product = [2, 3, 4].reduce(function(acc, n) { return acc * n; }, 1);\nconsole.log(product);\n```\n\n**Output**\n\n```\n24\n```\n\n**What happens**\n\n- Start: acc = 1.\n- Step 1: acc=1, n=2 → 2. Step 2: acc=2, n=3 → 6. Step 3: acc=6, n=4 → 24.\n- reduce returns 24.\n\n**Practice**\n\nWhat happens if you call [].reduce(function(acc, n) { return acc + n; }) with no initial value? What if you pass 0 as the second argument?",
    "**Building strings and other values**\n\nThe **accumulator** is the result so far; the **current** element is the one being processed. Reduce runs your callback once per element in order. You combine acc and the current value however you need—for a sum you add, for a string you concatenate. Same pattern for other single values (e.g. finding a max: return the larger of acc and current).\n\n**Example**\n\n```javascript\nconst joined = [\"a\", \"b\", \"c\"].reduce(function(acc, s) { return acc + s; }, \"\");\nconsole.log(joined);\n```\n\n**Output**\n\n```\nabc\n```\n\n**What happens**\n\n- Start: acc = \"\".\n- Step 1: acc=\"\", s=\"a\" → \"a\". Step 2: acc=\"a\", s=\"b\" → \"ab\". Step 3: acc=\"ab\", s=\"c\" → \"abc\".\n- reduce returns \"abc\".\n\n**Practice**\n\nUse reduce to build one string from [\"x\", \"y\", \"z\"] with a hyphen between each (e.g. \"x-y-z\"). What initial value do you use, and what do you return from the callback?",
    "**Building arrays and objects with reduce**\n\nReduce can produce **any single value**—including an **array** or **object**. Use an initial value of [] or {} and in the callback update that value (e.g. push to the array or set a property), then return it. You can collect only elements that pass a test (like filter) or transform and collect (like map). In practice, use map or filter when they fit; use reduce when you need a custom single value or when building an object.\n\n**Example**\n\n```javascript\nconst evens = [1, 2, 3, 4, 5].reduce(function(acc, n) {\n  if (n % 2 === 0) acc.push(n);\n  return acc;\n}, []);\nconsole.log(evens);\n```\n\n**Output**\n\n```\n[ 2, 4 ]\n```\n\n**What happens**\n\n- Start: acc = [].\n- Step 1: n=1, odd → don't push. Step 2: n=2, even → push 2. Step 3: n=3, odd → don't push. Step 4: n=4, even → push 4. Step 5: n=5, odd → don't push.\n- reduce returns [2, 4].\n\n**Practice**\n\nIn one sentence: to implement \"double each number\" with reduce (get [2,4,6] from [1,2,3]), what is the initial value and what do you do in the callback?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses reduce to calculate the sum of all numbers.\n  Use reduce to calculate the sum of all numbers.\n  Examples:\n    sumNumbers([1, 2, 3, 4, 5]) => 15\n    sumNumbers([10, 20, 30]) => 60\n    sumNumbers([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sumNumbers",
      "reference_solution": "function sumNumbers(arr) {\n  return arr.reduce(function(acc, n) { return acc + n; }, 0);\n}",
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
      "description": "/*\n  Implement the below function that uses reduce to calculate the product of all numbers.\n  Use reduce to calculate the product of all numbers.\n  Examples:\n    multiplyNumbers([2, 3, 4]) => 24\n    multiplyNumbers([5, 5]) => 25\n    multiplyNumbers([10]) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction multiplyNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "multiplyNumbers",
      "reference_solution": "function multiplyNumbers(arr) {\n  return arr.reduce(function(acc, n) { return acc * n; }, 1);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              2,
              3,
              4
            ]
          },
          "expectedOutput": "24"
        },
        {
          "input": {
            "arr": [
              5,
              5
            ]
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "arr": [
              10
            ]
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "6"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to find the maximum number.\n  Use reduce to find the maximum number.\n  Examples:\n    findMax([10, 5, 20, 15, 30]) => 30\n    findMax([1, 2, 3]) => 3\n    findMax([100]) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findMax",
      "reference_solution": "function findMax(arr) {\n  return arr.reduce(function(acc, n) { return n > acc ? n : acc; }, arr[0]);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              5,
              20,
              15,
              30
            ]
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "3"
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
              7,
              14,
              21
            ]
          },
          "expectedOutput": "21"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to concatenate all strings into one.\n  Use reduce to concatenate all strings into one.\n  Examples:\n    concatenateStrings([\"Hello\", \" \", \"World\", \"!\"]) => \"Hello World!\"\n    concatenateStrings([\"JavaScript\", \" \", \"is\", \" \", \"fun\"]) => \"JavaScript is fun\"\n    concatenateStrings([\"test\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction concatenateStrings(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "concatenateStrings",
      "reference_solution": "function concatenateStrings(arr) {\n  return arr.reduce(function(acc, s) { return acc + s; }, '');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "Hello",
              " ",
              "World",
              "!"
            ]
          },
          "expectedOutput": "Hello World!"
        },
        {
          "input": {
            "arr": [
              "JavaScript",
              " ",
              "is",
              " ",
              "fun"
            ]
          },
          "expectedOutput": "JavaScript is fun"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "arr": [
              "a",
              "b",
              "c"
            ]
          },
          "expectedOutput": "abc"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to count occurrences of each number.\n  Use reduce to count the occurrences of each number.\n  Return an object where keys are numbers and values are counts.\n  Examples:\n    countOccurrences([1, 2, 2, 3, 3, 3, 4]) => {\"1\":1,\"2\":2,\"3\":3,\"4\":1}\n    countOccurrences([5, 5, 5]) => {\"5\":3}\n    countOccurrences([1]) => {\"1\":1}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "countOccurrences",
      "reference_solution": "function countOccurrences(arr) {\n  return arr.reduce(function(acc, n) {\n    acc[n] = (acc[n] || 0) + 1;\n    return acc;\n  }, {});\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              2,
              3,
              3,
              3,
              4
            ]
          },
          "expectedOutput": "{\"1\":1,\"2\":2,\"3\":3,\"4\":1}"
        },
        {
          "input": {
            "arr": [
              5,
              5,
              5
            ]
          },
          "expectedOutput": "{\"5\":3}"
        },
        {
          "input": {
            "arr": [
              1
            ]
          },
          "expectedOutput": "{\"1\":1}"
        },
        {
          "input": {
            "arr": [
              7,
              8,
              7
            ]
          },
          "expectedOutput": "{\"7\":2,\"8\":1}"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to flatten arrays.\n  Use reduce to flatten into a single array.\n  Examples:\n    flattenArrays([[1, 2], [3, 4], [5, 6]]) => [1,2,3,4,5,6]\n    flattenArrays([[10], [20], [30]]) => [10,20,30]\n    flattenArrays([[1, 2, 3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenArrays(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "flattenArrays",
      "reference_solution": "function flattenArrays(arr) {\n  return arr.reduce(function(acc, el) { return acc.concat(el); }, []);\n}",
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
          "expectedOutput": "[1,2,3,4,5,6]"
        },
        {
          "input": {
            "arr": [
              [
                10
              ],
              [
                20
              ],
              [
                30
              ]
            ]
          },
          "expectedOutput": "[10,20,30]"
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
        },
        {
          "input": {
            "arr": [
              [
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
          "expectedOutput": "[5,6,7,8,9]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to filter even numbers.\n  Use reduce to create a new array with only even numbers (like filter).\n  Examples:\n    filterEvenWithReduce([1, 2, 3, 4, 5]) => [2,4]\n    filterEvenWithReduce([10, 15, 20]) => [10,20]\n    filterEvenWithReduce([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenWithReduce(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterEvenWithReduce",
      "reference_solution": "function filterEvenWithReduce(arr) {\n  return arr.reduce(function(acc, n) {\n    if (n % 2 === 0) acc.push(n);\n    return acc;\n  }, []);\n}",
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
          "expectedOutput": "[2,4]"
        },
        {
          "input": {
            "arr": [
              10,
              15,
              20
            ]
          },
          "expectedOutput": "[10,20]"
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
              8
            ]
          },
          "expectedOutput": "[8]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to double numbers.\n  Use reduce to create a new array with each number doubled (like map).\n  Examples:\n    doubleWithReduce([1, 2, 3, 4]) => [2,4,6,8]\n    doubleWithReduce([5, 10]) => [10,20]\n    doubleWithReduce([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleWithReduce(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "doubleWithReduce",
      "reference_solution": "function doubleWithReduce(arr) {\n  return arr.reduce(function(acc, n) {\n    acc.push(n * 2);\n    return acc;\n  }, []);\n}",
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
              10
            ]
          },
          "expectedOutput": "[10,20]"
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
          "expectedOutput": "[6,14]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to calculate total age.\n  Use reduce to calculate the total age of all people.\n  Examples:\n    calculateTotalAge([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}, {name: \"Charlie\", age: 35}]) => 90\n    calculateTotalAge([{name: \"Diana\", age: 20}]) => 20\n    calculateTotalAge([{name: \"Eve\", age: 22}, {name: \"Frank\", age: 28}]) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateTotalAge(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "calculateTotalAge",
      "reference_solution": "function calculateTotalAge(arr) {\n  return arr.reduce(function(acc, obj) { return acc + obj.age; }, 0);\n}",
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
          "expectedOutput": "90"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 20
              }
            ]
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Eve",
                "age": 22
              },
              {
                "name": "Frank",
                "age": 28
              }
            ]
          },
          "expectedOutput": "50"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to calculate the average.\n  Use reduce to calculate the average.\n  Hint: Sum all numbers, then divide by array length.\n  Examples:\n    calculateAverage([5, 10, 15, 20]) => 12.5\n    calculateAverage([10, 20, 30]) => 20\n    calculateAverage([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateAverage(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "calculateAverage",
      "reference_solution": "function calculateAverage(arr) {\n  if (arr.length === 0) return 0;\n  return arr.reduce(function(acc, n) { return acc + n; }, 0) / arr.length;\n}",
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
          "expectedOutput": "12.5"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "20"
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
              2,
              4,
              6,
              8
            ]
          },
          "expectedOutput": "5"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to map strings to their lengths.\n  Use reduce to create an object where keys are strings and values are their lengths.\n  Examples:\n    mapStringLengths([\"apple\", \"banana\", \"cherry\"]) => {\"apple\":5,\"banana\":6,\"cherry\":6}\n    mapStringLengths([\"hi\", \"hello\"]) => {\"hi\":2,\"hello\":5}\n    mapStringLengths([\"test\"]) => {\"test\":4}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction mapStringLengths(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "mapStringLengths",
      "reference_solution": "function mapStringLengths(arr) {\n  return arr.reduce(function(acc, s) {\n    acc[s] = s.length;\n    return acc;\n  }, {});\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry"
            ]
          },
          "expectedOutput": "{\"apple\":5,\"banana\":6,\"cherry\":6}"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello"
            ]
          },
          "expectedOutput": "{\"hi\":2,\"hello\":5}"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "{\"test\":4}"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses reduce to extract x values.\n  Use reduce to extract all x values into a single array.\n  Examples:\n    extractXValues([{x: 1}, {x: 2}, {x: 3}]) => [1,2,3]\n    extractXValues([{x: 10}]) => [10]\n    extractXValues([{x: 5}, {x: 15}, {x: 25}]) => [5,15,25]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractXValues(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractXValues",
      "reference_solution": "function extractXValues(arr) {\n  return arr.reduce(function(acc, obj) {\n    acc.push(obj.x);\n    return acc;\n  }, []);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "x": 1
              },
              {
                "x": 2
              },
              {
                "x": 3
              }
            ]
          },
          "expectedOutput": "[1,2,3]"
        },
        {
          "input": {
            "arr": [
              {
                "x": 10
              }
            ]
          },
          "expectedOutput": "[10]"
        },
        {
          "input": {
            "arr": [
              {
                "x": 5
              },
              {
                "x": 15
              },
              {
                "x": 25
              }
            ]
          },
          "expectedOutput": "[5,15,25]"
        }
      ]
    }
  ]
};
