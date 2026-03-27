/** Topic: forEach for iteration (foreach) */
export default {
  "id": "foreach",
  "title": "forEach for iteration",
  "outcomes": [
    "What forEach Does",
    "Callback Parameters: Element, Index, Array",
    "forEach Returns undefined",
    "Doing Something for Each Item"
  ],
  "outcome_messages": [
    "Let's see what forEach() does.\n\n**array.forEach(callback)** runs your callback function **once for each element** in the array, in order. You pass a function; forEach calls it with each element (and optionally the index and the array). You use forEach when you want to **do something** for each item—like log it or update a variable—not when you need a new array or a single value.\n\n## Example\n\n```javascript\nconst nums = [1, 2, 3];\nnums.forEach(function(n) {\n  console.log(n);\n});\n```\n\n## Output\n\n```\n1\n2\n3\n```\n\n## What happens\n\n- forEach calls the callback with 1, then 2, then 3.\n- Each time the callback runs, it receives one element (n) and logs it.\n\n## Practice\n\nIn the example, how many times does the callback run, and why?",
    "Let's use callback parameters: element, index, array.\n\nThe function you pass to forEach can take up to **three parameters**: (element, index, array). The first is the current element; the second is its **index** (0, 1, 2, …); the third is the **whole array**. Use only the ones you need.\n\n## Example\n\n```javascript\n[\"a\", \"b\", \"c\"].forEach(function(item, i, arr) {\n  console.log(i, item, arr.length);\n});\n```\n\n## Output\n\n```\n0 a 3\n1 b 3\n2 c 3\n```\n\n## What happens\n\n- First call: item is \"a\", i is 0, arr.length is 3.\n- Second call: item is \"b\", i is 1, arr.length is 3.\n- Third call: item is \"c\", i is 2, arr.length is 3.\n\n## Practice\n\nIn the example, what do the three parameters (item, i, arr) represent on the first call?",
    "Let's remember forEach returns undefined.\n\nforEach is for **doing an action** for each element. It does **not** return a new array or a single value. If you assign the result of forEach to a variable, you get **undefined**. So don't use forEach when you need to build a new array from the elements—use a different method for that.\n\n## Example\n\n```javascript\nconst a = [1, 2, 3];\nconst b = a.forEach(function(x) {\n  return x * 2;\n});\nconsole.log(b);\n```\n\n## Output\n\n```\nundefined\n```\n\n## What happens\n\n- forEach runs the callback for each element, but it ignores the callback's return value.\n- forEach itself returns undefined, so b is undefined.\n\n## Practice\n\nYou want a new array with each number doubled. Is forEach the right choice? Why or why not?",
    "Let's do something for each item.\n\nUse forEach when you want to **do something** with each element: log it, push it into another array, or update a variable. Declare the variable (or array) **outside** the callback, then use it **inside** the callback. After forEach finishes, that variable holds the result of your actions.\n\n## Example\n\n```javascript\nconst items = [10, 20, 30];\nlet sum = 0;\nitems.forEach(function(n) {\n  sum += n;\n});\nconsole.log(sum);\n```\n\n## Output\n\n```\n60\n```\n\n## What happens\n\n- sum starts at 0.\n- forEach runs the callback for 10, 20, 30. Each time we add the element to sum.\n- After the loop, sum is 10 + 20 + 30 = 60.\n\n## Practice\n\nIn the example, why do we declare sum outside the callback instead of inside it?"
  ],
  "practise_tasks": [
    {
      "question": "In the example, how many times does the callback run, and why?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, what do the three parameters (item, i, arr) represent on the first call?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "You want a new array with each number doubled. Is forEach the right choice? Why or why not?",
      "type": "context_dependent",
      "validation_hint": "Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required."
    },
    {
      "question": "In the example, why do we declare sum outside the callback instead of inside it?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    }
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses forEach to process an array of numbers.\n  Use forEach to collect each number into a result string, separated by newlines.\n  Examples:\n    printNumbers([1, 2, 3, 4, 5]) => \"1\\n2\\n3\\n4\\n5\"\n    printNumbers([10, 20, 30]) => \"10\\n20\\n30\"\n    printNumbers([7]) => \"7\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction printNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "printNumbers",
      "reference_solution": "function printNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    result.push(String(n));\n  });\n  return result.join('\\n');\n}",
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
          "expectedOutput": "1\n2\n3\n4\n5"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "10\n20\n30"
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
      "description": "/*\n  Implement the below function that uses forEach to convert strings to uppercase.\n  Use forEach to process each string and return them joined by newlines.\n  Examples:\n    uppercaseStrings([\"apple\", \"banana\", \"cherry\"]) => \"APPLE\\nBANANA\\nCHERRY\"\n    uppercaseStrings([\"hello\", \"world\"]) => \"HELLO\\nWORLD\"\n    uppercaseStrings([\"test\"]) => \"TEST\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction uppercaseStrings(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "uppercaseStrings",
      "reference_solution": "function uppercaseStrings(arr) {\n  let result = [];\n  arr.forEach(function(s) {\n    result.push(s.toUpperCase());\n  });\n  return result.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry"
            ]
          },
          "expectedOutput": "APPLE\nBANANA\nCHERRY"
        },
        {
          "input": {
            "arr": [
              "hello",
              "world"
            ]
          },
          "expectedOutput": "HELLO\nWORLD"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "TEST"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses forEach to double numbers.\n  Use forEach to process each number and return doubled values joined by newlines.\n  Examples:\n    doubleNumbers([2, 4, 6, 8]) => \"4\\n8\\n12\\n16\"\n    doubleNumbers([1, 3, 5]) => \"2\\n6\\n10\"\n    doubleNumbers([10]) => \"20\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "doubleNumbers",
      "reference_solution": "function doubleNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    result.push(String(n * 2));\n  });\n  return result.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              2,
              4,
              6,
              8
            ]
          },
          "expectedOutput": "4\n8\n12\n16"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": "2\n6\n10"
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
      "description": "/*\n  Implement the below function that uses forEach with index parameter.\n  Use forEach to format each element with its index and return joined by newlines.\n  Examples:\n    formatWithIndex([\"cat\", \"dog\", \"bird\"]) => \"Index 0: cat\\nIndex 1: dog\\nIndex 2: bird\"\n    formatWithIndex([\"apple\", \"banana\"]) => \"Index 0: apple\\nIndex 1: banana\"\n    formatWithIndex([\"test\"]) => \"Index 0: test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction formatWithIndex(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "formatWithIndex",
      "reference_solution": "function formatWithIndex(arr) {\n  let result = [];\n  arr.forEach(function(el, i) {\n    result.push('Index ' + i + ': ' + el);\n  });\n  return result.join('\\n');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "cat",
              "dog",
              "bird"
            ]
          },
          "expectedOutput": "Index 0: cat\nIndex 1: dog\nIndex 2: bird"
        },
        {
          "input": {
            "arr": [
              "apple",
              "banana"
            ]
          },
          "expectedOutput": "Index 0: apple\nIndex 1: banana"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "Index 0: test"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses forEach to calculate the sum of all elements.\n  Use forEach to accumulate the sum and return the total.\n  Examples:\n    calculateSum([5, 10, 15, 20]) => 50\n    calculateSum([1, 2, 3, 4]) => 10\n    calculateSum([100]) => 100\n    calculateSum([0, 0, 0]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateSum(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "calculateSum",
      "reference_solution": "function calculateSum(arr) {\n  let sum = 0;\n  arr.forEach(function(n) {\n    sum += n;\n  });\n  return sum;\n}",
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
          "expectedOutput": "50"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3,
              4
            ]
          },
          "expectedOutput": "10"
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
      "description": "/*\n  Implement the below function that uses forEach to find the maximum value.\n  Use forEach to track the maximum value and return it.\n  Examples:\n    findMaximum([3, 7, 2, 9, 1]) => 9\n    findMaximum([5, 15, 10]) => 15\n    findMaximum([42]) => 42\n    findMaximum([1, 1, 1]) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMaximum(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findMaximum",
      "reference_solution": "function findMaximum(arr) {\n  if (arr.length === 0) return undefined;\n  let max = arr[0];\n  arr.forEach(function(n) {\n    if (n > max) max = n;\n  });\n  return max;\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              3,
              7,
              2,
              9,
              1
            ]
          },
          "expectedOutput": "9"
        },
        {
          "input": {
            "arr": [
              5,
              15,
              10
            ]
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "arr": [
              42
            ]
          },
          "expectedOutput": "42"
        },
        {
          "input": {
            "arr": [
              1,
              1,
              1
            ]
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses forEach to filter even numbers.\n  Use forEach to collect only even numbers and return them joined by newlines.\n  Examples:\n    filterEvenNumbers([1, 2, 3, 4, 5, 6]) => \"2\\n4\\n6\"\n    filterEvenNumbers([10, 15, 20, 25]) => \"10\\n20\"\n    filterEvenNumbers([1, 3, 5]) => \"\"\n    filterEvenNumbers([8]) => \"8\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterEvenNumbers",
      "reference_solution": "function filterEvenNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    if (n % 2 === 0) result.push(String(n));\n  });\n  return result.join('\\n');\n}",
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
          "expectedOutput": "2\n4\n6"
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
          "expectedOutput": "10\n20"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "arr": [
              8
            ]
          },
          "expectedOutput": "8"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses forEach to extract names from objects.\n  Use forEach to collect each person's name and return them joined by newlines.\n  Examples:\n    extractNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}]) => \"Alice\\nBob\"\n    extractNames([{name: \"Charlie\", age: 22}]) => \"Charlie\"\n    extractNames([{name: \"Diana\", age: 28}, {name: \"Eve\", age: 35}]) => \"Diana\\nEve\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractNames(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractNames",
      "reference_solution": "function extractNames(arr) {\n  let result = [];\n  arr.forEach(function(obj) {\n    result.push(obj.name);\n  });\n  return result.join('\\n');\n}",
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
          "expectedOutput": "Alice\nBob"
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
          "expectedOutput": "Charlie"
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
              },
              {
                "name": "Frank",
                "age": 40
              }
            ]
          },
          "expectedOutput": "Diana\nEve\nFrank"
        }
      ]
    }
  ]
};
