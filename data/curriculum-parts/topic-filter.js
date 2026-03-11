/** Topic: filter for selection (filter) */
export default {
  "id": "filter",
  "title": "filter for selection",
  "outcomes": [
    "What filter Does",
    "Return true to Keep, false to Skip",
    "Result Can Be Shorter or Empty",
    "Original Array Is Not Changed"
  ],
  "outcome_messages": [
    "**What filter does**\n\n**array.filter(callback)** builds a **new array** with only the elements for which the callback returns **true** (or a truthy value). The callback runs once per element: return true → the element is **kept** in the new array; return false (or falsy) → it is **skipped**. Use filter when you want a **subset** of items that match a condition (e.g. only even numbers, only long strings).\n\n**Example**\n\n```javascript\nconst nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(function(n) { return n % 2 === 0; });\nconsole.log(evens);\n```\n\n**Output**\n\n```\n[ 2, 4 ]\n```\n\n**What happens**\n\n- For 1: return false → skipped.\n- For 2: return true → kept.\n- For 3: return false → skipped.\n- For 4: return true → kept.\n- For 5: return false → skipped.\n- evens is [2, 4]. nums is unchanged.\n\n**Practice**\n\nUse filter on [10, 15, 20, 25, 30] to get only numbers greater than 20. What is the result?",
    "**Return true to keep, false to skip**\n\nThe callback should return **true** or **false** (or a value that is truthy or falsy) for each element. **true** (or truthy) means \"include this in the new array\"; **false** (or falsy) means \"leave it out.\" Keep the condition simple—one check or a short expression. You can use (element, index, array) if you need the index or the full array.\n\n**Example**\n\n```javascript\nconst words = [\"hi\", \"hello\", \"hey\"];\nconst long = words.filter(function(s) { return s.length > 2; });\nconsole.log(long);\n```\n\n**Output**\n\n```\n[ 'hello', 'hey' ]\n```\n\n**What happens**\n\n- \"hi\" (length 2): 2 > 2 is false → skipped.\n- \"hello\" (length 5): 5 > 2 is true → kept.\n- \"hey\" (length 3): 3 > 2 is true → kept.\n- long is [\"hello\", \"hey\"].\n\n**Practice**\n\nWrite a filter that keeps only positive numbers. For [-1, 0, 1, 2], what array do you get?",
    "**Result can be shorter or empty**\n\nUnlike map, filter can produce an array with **fewer** elements than the original. Only elements that pass the test (return true) are included. So the result can have 0, 1, or up to the same length as the original—never more. Use filter when you want to **shrink** the list by a condition; use map when you want one new value per element.\n\n**Example**\n\n```javascript\nconst a = [1, 2, 3, 4, 5];\nconst b = a.filter(function(x) { return x > 3; });\nconsole.log(a.length, b.length);\n```\n\n**Output**\n\n```\n5 2\n```\n\n**What happens**\n\n- a has 5 elements. Only 4 and 5 pass the test (x > 3).\n- b has 2 elements: [4, 5]. Result is shorter than the original.\n\n**Practice**\n\nYou filter an array of 10 elements and the callback returns true for exactly 3 of them. How many elements does the result have?",
    "**Original array is not changed**\n\nfilter does **not** change the array you call it on. It **returns** a new array. The original stays the same—you can use it again or filter it differently. If you need to keep only certain items, assign the result to a variable: filtered = arr.filter(...).\n\n**Example**\n\n```javascript\nconst orig = [5, 10, 15, 20];\nconst subset = orig.filter(function(x) { return x >= 10; });\nconsole.log(orig);\nconsole.log(subset);\n```\n\n**Output**\n\n```\n[ 5, 10, 15, 20 ]\n[ 10, 15, 20 ]\n```\n\n**What happens**\n\n- orig is still [5, 10, 15, 20].\n- subset is a new array [10, 15, 20]. We did not remove anything from orig.\n\n**Practice**\n\nYou have an array items and want only items where item.active is true. Should you use filter and assign to a new variable, or a loop that removes items from the array? Which keeps the original array unchanged?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses filter to get even numbers.\n  Use filter to create a new array containing only even numbers.\n  Examples:\n    filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]) => [2,4,6,8]\n    filterEvenNumbers([10, 15, 20, 25]) => [10,20]\n    filterEvenNumbers([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterEvenNumbers",
      "reference_solution": "function filterEvenNumbers(arr) {\n  return arr.filter(function(n) { return n % 2 === 0; });\n}",
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
              8
            ]
          },
          "expectedOutput": "[2,4,6,8]"
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
              5
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              2,
              4,
              6
            ]
          },
          "expectedOutput": "[2,4,6]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get numbers greater than 30.\n  Use filter to create a new array containing only numbers greater than 30.\n  Examples:\n    filterGreaterThan30([10, 25, 30, 45, 50, 60]) => [45,50,60]\n    filterGreaterThan30([5, 10, 15]) => []\n    filterGreaterThan30([100, 200]) => [100,200]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterGreaterThan30(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterGreaterThan30",
      "reference_solution": "function filterGreaterThan30(arr) {\n  return arr.filter(function(n) { return n > 30; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              25,
              30,
              45,
              50,
              60
            ]
          },
          "expectedOutput": "[45,50,60]"
        },
        {
          "input": {
            "arr": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              100,
              200
            ]
          },
          "expectedOutput": "[100,200]"
        },
        {
          "input": {
            "arr": [
              31
            ]
          },
          "expectedOutput": "[31]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get long strings.\n  Use filter to create a new array containing only strings with length greater than 5.\n  Examples:\n    filterLongStrings([\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"]) => [\"banana\",\"watermelon\"]\n    filterLongStrings([\"hi\", \"hello\", \"hey\"]) => []\n    filterLongStrings([\"JavaScript\", \"is\", \"awesome\"]) => [\"JavaScript\",\"awesome\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterLongStrings(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterLongStrings",
      "reference_solution": "function filterLongStrings(arr) {\n  return arr.filter(function(s) { return s.length > 5; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "kiwi",
              "grape",
              "watermelon"
            ]
          },
          "expectedOutput": "[\"banana\",\"watermelon\"]"
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
          "expectedOutput": "[\"JavaScript\",\"awesome\"]"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "[]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get adults.\n  Use filter to create a new array containing only people aged 18 or older.\n  Examples:\n    filterAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => [{\"name\":\"Alice\",\"age\":25},{\"name\":\"Charlie\",\"age\":30}]\n    filterAdults([{name: \"Diana\", age: 15}, {name: \"Eve\", age: 16}]) => []\n    filterAdults([{name: \"Frank\", age: 18}]) => [{\"name\":\"Frank\",\"age\":18}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterAdults(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterAdults",
      "reference_solution": "function filterAdults(arr) {\n  return arr.filter(function(obj) { return obj.age >= 18; });\n}",
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
          "expectedOutput": "[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Charlie\",\"age\":30}]"
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
          "expectedOutput": "[]"
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
          "expectedOutput": "[{\"name\":\"Frank\",\"age\":18}]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Grace",
                "age": 20
              },
              {
                "name": "Henry",
                "age": 22
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Grace\",\"age\":20},{\"name\":\"Henry\",\"age\":22}]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get numbers divisible by 10.\n  Use filter to create a new array containing only numbers divisible by 10.\n  Examples:\n    filterDivisibleBy10([5, 10, 15, 20, 25, 30]) => [10,20,30]\n    filterDivisibleBy10([3, 7, 11]) => []\n    filterDivisibleBy10([100, 200, 300]) => [100,200,300]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterDivisibleBy10(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterDivisibleBy10",
      "reference_solution": "function filterDivisibleBy10(arr) {\n  return arr.filter(function(n) { return n % 10 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20,
              25,
              30
            ]
          },
          "expectedOutput": "[10,20,30]"
        },
        {
          "input": {
            "arr": [
              3,
              7,
              11
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              100,
              200,
              300
            ]
          },
          "expectedOutput": "[100,200,300]"
        },
        {
          "input": {
            "arr": [
              50
            ]
          },
          "expectedOutput": "[50]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get strings starting with 'c'.\n  Use filter to create a new array containing only strings that start with the letter 'c'.\n  Examples:\n    filterStartsWithC([\"hello\", \"world\", \"javascript\", \"code\"]) => [\"code\"]\n    filterStartsWithC([\"cat\", \"dog\", \"cow\"]) => [\"cat\",\"cow\"]\n    filterStartsWithC([\"apple\", \"banana\"]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterStartsWithC(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterStartsWithC",
      "reference_solution": "function filterStartsWithC(arr) {\n  return arr.filter(function(s) { return s[0] === 'c'; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hello",
              "world",
              "javascript",
              "code"
            ]
          },
          "expectedOutput": "[\"code\"]"
        },
        {
          "input": {
            "arr": [
              "cat",
              "dog",
              "cow"
            ]
          },
          "expectedOutput": "[\"cat\",\"cow\"]"
        },
        {
          "input": {
            "arr": [
              "apple",
              "banana"
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              "cherry"
            ]
          },
          "expectedOutput": "[\"cherry\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get odd numbers.\n  Use filter to create a new array containing only odd numbers.\n  Examples:\n    filterOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => [1,3,5,7,9]\n    filterOddNumbers([2, 4, 6, 8]) => []\n    filterOddNumbers([11, 13, 15]) => [11,13,15]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterOddNumbers(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterOddNumbers",
      "reference_solution": "function filterOddNumbers(arr) {\n  return arr.filter(function(n) { return n % 2 !== 0; });\n}",
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
          "expectedOutput": "[1,3,5,7,9]"
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
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              11,
              13,
              15
            ]
          },
          "expectedOutput": "[11,13,15]"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "[7]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get cheap items.\n  Use filter to create a new array containing only items with price less than 1.0.\n  Examples:\n    filterCheapItems([{name: \"Apple\", price: 1.5}, {name: \"Banana\", price: 0.8}, {name: \"Orange\", price: 2.0}]) => [{\"name\":\"Banana\",\"price\":0.8}]\n    filterCheapItems([{name: \"Grape\", price: 3.0}, {name: \"Melon\", price: 5.0}]) => []\n    filterCheapItems([{name: \"Cherry\", price: 0.5}]) => [{\"name\":\"Cherry\",\"price\":0.5}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterCheapItems(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterCheapItems",
      "reference_solution": "function filterCheapItems(arr) {\n  return arr.filter(function(obj) { return obj.price < 1.0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Apple",
                "price": 1.5
              },
              {
                "name": "Banana",
                "price": 0.8
              },
              {
                "name": "Orange",
                "price": 2
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Banana\",\"price\":0.8}]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Grape",
                "price": 3
              },
              {
                "name": "Melon",
                "price": 5
              }
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Cherry",
                "price": 0.5
              }
            ]
          },
          "expectedOutput": "[{\"name\":\"Cherry\",\"price\":0.5}]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get numbers in range.\n  Use filter to create a new array containing numbers between 3 and 7 (inclusive).\n  Examples:\n    filterNumbersInRange([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => [3,4,5,6,7]\n    filterNumbersInRange([1, 2, 8, 9]) => []\n    filterNumbersInRange([5, 6]) => [5,6]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterNumbersInRange(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterNumbersInRange",
      "reference_solution": "function filterNumbersInRange(arr) {\n  return arr.filter(function(n) { return n >= 3 && n <= 7; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]
          },
          "expectedOutput": "[3,4,5,6,7]"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              8,
              9
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              5,
              6
            ]
          },
          "expectedOutput": "[5,6]"
        },
        {
          "input": {
            "arr": [
              3,
              7,
              10
            ]
          },
          "expectedOutput": "[3,7]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses filter to get strings with exactly 3 characters.\n  Use filter to create a new array containing strings with exactly 3 characters.\n  Examples:\n    filterThreeCharStrings([\"a\", \"ab\", \"abc\", \"abcd\", \"abcde\"]) => [\"abc\"]\n    filterThreeCharStrings([\"cat\", \"dog\", \"bird\"]) => [\"cat\",\"dog\"]\n    filterThreeCharStrings([\"hello\", \"hi\"]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterThreeCharStrings(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "filterThreeCharStrings",
      "reference_solution": "function filterThreeCharStrings(arr) {\n  return arr.filter(function(s) { return s.length === 3; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "a",
              "ab",
              "abc",
              "abcd",
              "abcde"
            ]
          },
          "expectedOutput": "[\"abc\"]"
        },
        {
          "input": {
            "arr": [
              "cat",
              "dog",
              "bird"
            ]
          },
          "expectedOutput": "[\"cat\",\"dog\"]"
        },
        {
          "input": {
            "arr": [
              "hello",
              "hi"
            ]
          },
          "expectedOutput": "[]"
        },
        {
          "input": {
            "arr": [
              "sun"
            ]
          },
          "expectedOutput": "[\"sun\"]"
        }
      ]
    }
  ]
};
