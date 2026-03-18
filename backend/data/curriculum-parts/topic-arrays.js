/** Topic: Arrays (arrays) */
export default {
  "id": "arrays",
  "title": "Arrays",
  "outcomes": [
    "What an Array Is: Ordered List in One Variable",
    "Accessing Elements: Index 0 Is First",
    "How Many Elements: length",
    "The Last Element: length - 1",
    "Changing Elements: Arrays Are Mutable",
    "Visiting Every Element: Loop by Index",
    "Combining All: Sum, Product, or String",
    "Finding One: Max or First Match"
  ],
  "outcome_messages": [
    "Let's see when to use an array.\n\nWhen you have several related values (scores, names, numbers) and want to keep them in **one variable** in a fixed **order**, use an array. You create one with square brackets; values go inside, separated by commas. The first value is at position 0, the next at 1, and so on.\n\n## Syntax\n\n```text\nconst name = [value1, value2, value3];\n```\n\n## Example\n\n```javascript\nconst scores = [85, 92, 78, 95];\nconsole.log(scores);\n```\n\n## Output\n\n```\n[ 85, 92, 78, 95 ]\n```\n\nOne variable, four numbers, order preserved. Empty array: `[]`.\n\n## Practice\n\nIn the example, how many elements does `scores` have, and at what index is 78?",
    "Let's access elements by position.\n\nUse **array[index]** to read the element at that position. The **first** element is at index **0**, the second at 1, the third at 2. Index is \"how many steps from the start.\" Out-of-range indexes (e.g. negative or past the end) give `undefined`.\n\n## Example\n\n```javascript\nconst colors = [\"red\", \"green\", \"blue\"];\nconsole.log(colors[0]);\nconsole.log(colors[1]);\nconsole.log(colors[2]);\n```\n\n## Output\n\n```\nred\ngreen\nblue\n```\n\n## Practice\n\nIf `arr = [\"a\", \"b\", \"c\", \"d\"]`, what does `arr[2]` evaluate to?",
    "Let's get how many elements with .length.\n\nEvery array has a **.length** property: it gives the number of elements. Use it to loop safely (`i < arr.length`) and to check for empty (`length === 0`). When you add or remove elements, `length` updates.\n\n## Example\n\n```javascript\nconst items = [3, 7, 2];\nconsole.log(items.length);\n```\n\n## Output\n\n```\n3\n```\n\nEmpty array `[]` has `length` 0.\n\n## Practice\n\nIf `nums = [10, 20, 30, 40]`, what is `nums.length`?",
    "Let's get the last element.\n\nBecause the first index is 0, the **last** valid index is **length - 1**. So the last element is **array[array.length - 1]**. Use this whenever you need the last item and don't know the size in advance. For an empty array there is no last element.\n\n## Example\n\n```javascript\nconst data = [100, 200, 300];\nconsole.log(data[data.length - 1]);\n```\n\n## Output\n\n```\n300\n```\n\nLength is 3, so last index is 2; `data[2]` is 300.\n\n## Practice\n\nFor an array with 4 elements, what index is the last element?",
    "Let's change an element.\n\nArrays are **mutable**: you can change a slot by assigning to **array[index] = value**. The array is the same object; only that slot's value changes. Assigning to an index beyond the current length grows the array (unfilled slots are empty).\n\n## Example\n\n```javascript\nconst vals = [1, 2, 3];\nvals[1] = 99;\nconsole.log(vals);\n```\n\n## Output\n\n```\n[ 1, 99, 3 ]\n```\n\n## Practice\n\nIf `arr = [5, 10, 15]`, what does `arr` look like after `arr[0] = 0`?",
    "Let's visit every element.\n\nTo do something with each item in order, loop from index 0 to **length - 1**. Use **for (let i = 0; i < arr.length; i++)** and work with **arr[i]** inside the body. You can read, change, skip, or use the index.\n\n## Example\n\n```javascript\nconst a = [10, 20, 30];\nfor (let i = 0; i < a.length; i++) {\n  console.log(a[i]);\n}\n```\n\n## Output\n\n```\n10\n20\n30\n```\n\n## Practice\n\nIn the example, what is the range of index values (first and last) that the loop uses to visit every element?",
    "Let's combine all elements.\n\nTo get one value from the whole array (sum, product, or a single string), **initialize a variable** before the loop, **update it inside** the loop using each element, then use the result after the loop. Same idea for total, average, or \"all items joined.\"\n\n## Example\n\n```javascript\nconst nums = [1, 2, 3, 4];\nlet sum = 0;\nfor (let i = 0; i < nums.length; i++) {\n  sum += nums[i];\n}\nconsole.log(sum);\n```\n\n## Output\n\n```\n10\n```\n\n## Practice\n\nIn the example, why do we initialize `sum` to 0 before the loop?",
    "Let's find one thing in an array.\n\nTo find a single value (largest, first match, etc.), loop and **compare**. For \"largest\": keep a variable (e.g. `max`), start with the first element, then update it whenever you see a larger one. For \"first that matches\": loop and stop (e.g. `break` or `return`) when you find it.\n\n## Example\n\n```javascript\nconst vals = [12, 5, 8, 21, 3];\nlet max = vals[0];\nfor (let i = 1; i < vals.length; i++) {\n  if (vals[i] > max) max = vals[i];\n}\nconsole.log(max);\n```\n\n## Output\n\n```\n21\n```\n\n## Practice\n\nIn the max example, why do we start with `max = vals[0]` instead of 0?"
  ],
  "tasks": [
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 20, 30, 40, 50];\n// Print the first and last elements of the array\n// Each on a new line\n// For numbers = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 50",
      "solution_type": "script",
      "reference_solution": "const numbers = [10, 20, 30, 40, 50];\nconsole.log(numbers[0]);\nconsole.log(numbers[numbers.length - 1]);",
      "testCases": [
        {
          "input": {
            "numbers": [
              10,
              20,
              30,
              40,
              50
            ]
          },
          "expectedOutput": "10\n50"
        },
        {
          "input": {
            "numbers": [
              5,
              15,
              25
            ]
          },
          "expectedOutput": "5\n25"
        },
        {
          "input": {
            "numbers": [
              100
            ]
          },
          "expectedOutput": "100\n100"
        },
        {
          "input": {
            "numbers": [
              7,
              14,
              21,
              28,
              35,
              42
            ]
          },
          "expectedOutput": "7\n42"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 9, 1];\n// Print each element of the array on a new line\n// For arr = [3, 7, 2, 9, 1], your output should be:\n// 3\n// 7\n// 2\n// 9\n// 1",
      "solution_type": "script",
      "reference_solution": "const arr = [3, 7, 2, 9, 1];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}",
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
          "expectedOutput": "3\n7\n2\n9\n1"
        },
        {
          "input": {
            "arr": [
              10,
              20
            ]
          },
          "expectedOutput": "10\n20"
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
              1,
              2,
              3,
              4,
              5,
              6
            ]
          },
          "expectedOutput": "1\n2\n3\n4\n5\n6"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [5, 10, 15, 20, 25];\n// Calculate and print the sum of all elements in the array\n// For numbers = [5, 10, 15, 20, 25], your output should be: 75",
      "solution_type": "script",
      "reference_solution": "const numbers = [5, 10, 15, 20, 25];\nlet sum = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  sum += numbers[i];\n}\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "numbers": [
              5,
              10,
              15,
              20,
              25
            ]
          },
          "expectedOutput": "75"
        },
        {
          "input": {
            "numbers": [
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
            "numbers": [
              100
            ]
          },
          "expectedOutput": "100"
        },
        {
          "input": {
            "numbers": [
              10,
              20,
              30,
              40,
              50,
              60
            ]
          },
          "expectedOutput": "210"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [12, 5, 8, 21, 3];\n// Find and print the largest number in the array\n// For numbers = [12, 5, 8, 21, 3], your output should be: 21",
      "solution_type": "script",
      "reference_solution": "const numbers = [12, 5, 8, 21, 3];\nlet max = numbers[0];\nfor (let i = 1; i < numbers.length; i++) {\n  if (numbers[i] > max) max = numbers[i];\n}\nconsole.log(max);",
      "testCases": [
        {
          "input": {
            "numbers": [
              12,
              5,
              8,
              21,
              3
            ]
          },
          "expectedOutput": "21"
        },
        {
          "input": {
            "numbers": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "numbers": [
              50,
              25,
              75,
              10
            ]
          },
          "expectedOutput": "75"
        },
        {
          "input": {
            "numbers": [
              100
            ]
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "// Do not rename arr and target, use them as input for your program.\n// While testing we will change their values.\nconst arr = [10, 20, 30, 40, 50];\nconst target = 30;\n// Find the index of target in the array\n// If found, print the index\n// If not found, print: -1\n// For arr = [10, 20, 30, 40, 50] and target = 30, your output should be: 2",
      "solution_type": "script",
      "reference_solution": "const arr = [10, 20, 30, 40, 50];\nconst target = 30;\nlet index = -1;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === target) {\n    index = i;\n    break;\n  }\n}\nconsole.log(index);",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40,
              50
            ],
            "target": 30
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40,
              50
            ],
            "target": 10
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40,
              50
            ],
            "target": 60
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "arr": [
              5,
              15,
              25,
              35
            ],
            "target": 35
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [3, 7, 2, 9, 1, 5];\n// Count how many even numbers are in the array\n// Print only the count\n// For numbers = [3, 7, 2, 9, 1, 5], your output should be: 1",
      "solution_type": "script",
      "reference_solution": "const numbers = [3, 7, 2, 9, 1, 5];\nlet count = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "numbers": [
              3,
              7,
              2,
              9,
              1,
              5
            ]
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "numbers": [
              2,
              4,
              6,
              8
            ]
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "numbers": [
              1,
              3,
              5,
              7
            ]
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "numbers": [
              10,
              15,
              20,
              25,
              30
            ]
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5];\n// Print the array in reverse order\n// Each element on a new line\n// For arr = [1, 2, 3, 4, 5], your output should be:\n// 5\n// 4\n// 3\n// 2\n// 1",
      "solution_type": "script",
      "reference_solution": "const arr = [1, 2, 3, 4, 5];\nfor (let i = arr.length - 1; i >= 0; i--) {\n  console.log(arr[i]);\n}",
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
          "expectedOutput": "5\n4\n3\n2\n1"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "30\n20\n10"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "7"
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
          "expectedOutput": "20\n15\n10\n5"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 5, 8, 3, 12, 7];\n// Print all numbers greater than 7\n// Each number on a new line\n// For numbers = [10, 5, 8, 3, 12, 7], your output should be:\n// 10\n// 8\n// 12",
      "solution_type": "script",
      "reference_solution": "const numbers = [10, 5, 8, 3, 12, 7];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] > 7) console.log(numbers[i]);\n}",
      "testCases": [
        {
          "input": {
            "numbers": [
              10,
              5,
              8,
              3,
              12,
              7
            ]
          },
          "expectedOutput": "10\n8\n12"
        },
        {
          "input": {
            "numbers": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "numbers": [
              20,
              15,
              25,
              10
            ]
          },
          "expectedOutput": "20\n15\n25\n10"
        },
        {
          "input": {
            "numbers": [
              8,
              9,
              10
            ]
          },
          "expectedOutput": "8\n9\n10"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [5, 2, 8, 2, 9, 2, 3];\n// Double each element in the array (multiply by 2)\n// Print the modified array elements on a new line\n// For arr = [5, 2, 8, 2, 9, 2, 3], your output should be:\n// 10\n// 4\n// 16\n// 4\n// 18\n// 4\n// 6",
      "solution_type": "script",
      "reference_solution": "const arr = [5, 2, 8, 2, 9, 2, 3];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i] * 2);\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              2,
              8,
              2,
              9,
              2,
              3
            ]
          },
          "expectedOutput": "10\n4\n16\n4\n18\n4\n6"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "2\n4\n6"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "20\n40\n60"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "14"
        }
      ]
    },
    {
      "description": "// Do not rename words, use it as input for your program.\n// While testing we will change its value.\nconst words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"];\n// Find and print the longest word in the array\n// For words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"], your output should be: watermelon",
      "solution_type": "script",
      "reference_solution": "const words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"];\nlet longest = words[0];\nfor (let i = 1; i < words.length; i++) {\n  if (words[i].length > longest.length) longest = words[i];\n}\nconsole.log(longest);",
      "testCases": [
        {
          "input": {
            "words": [
              "apple",
              "banana",
              "kiwi",
              "grape",
              "watermelon"
            ]
          },
          "expectedOutput": "watermelon"
        },
        {
          "input": {
            "words": [
              "cat",
              "dog",
              "elephant"
            ]
          },
          "expectedOutput": "elephant"
        },
        {
          "input": {
            "words": [
              "hi",
              "hello",
              "hey"
            ]
          },
          "expectedOutput": "hello"
        },
        {
          "input": {
            "words": [
              "code"
            ]
          },
          "expectedOutput": "code"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 7, 9, 7, 1];\n// Count how many times the number 7 appears in the array\n// Print only the count\n// For arr = [3, 7, 2, 7, 9, 7, 1], your output should be: 3",
      "solution_type": "script",
      "reference_solution": "const arr = [3, 7, 2, 7, 9, 7, 1];\nlet count = 0;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === 7) count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "arr": [
              3,
              7,
              2,
              7,
              9,
              7,
              1
            ]
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "arr": [
              7,
              7,
              7,
              7
            ]
          },
          "expectedOutput": "4"
        },
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
          "expectedOutput": "0"
        },
        {
          "input": {
            "arr": [
              7
            ]
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [4, 7, 2, 9, 1, 6];\n// Calculate and print the average of all numbers in the array\n// Round to 2 decimal places\n// For numbers = [4, 7, 2, 9, 1, 6], sum = 29, average = 29/6 = 4.83\n// Your output should be: 4.83",
      "solution_type": "script",
      "reference_solution": "const numbers = [4, 7, 2, 9, 1, 6];\nlet sum = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  sum += numbers[i];\n}\nconst avg = sum / numbers.length;\nconst rounded = Math.round(avg * 100) / 100;\nconsole.log(rounded.toFixed(2));",
      "testCases": [
        {
          "input": {
            "numbers": [
              4,
              7,
              2,
              9,
              1,
              6
            ]
          },
          "expectedOutput": "4.83"
        },
        {
          "input": {
            "numbers": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "20.00"
        },
        {
          "input": {
            "numbers": [
              5,
              5,
              5,
              5
            ]
          },
          "expectedOutput": "5.00"
        },
        {
          "input": {
            "numbers": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": "3.00"
        }
      ]
    }
  ]
};
