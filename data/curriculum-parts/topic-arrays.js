/** Topic: Arrays (arrays) */
export default {
  "id": "arrays",
  "title": "Arrays",
  "outcomes": [
    "Array Creation: Grouping Data in Memory",
    "Zero-based Indexing: Accessing List Members",
    "The length Property: Measuring Collection Size",
    "Dynamic Access: Finding the Final Element",
    "Mutable Collections: Modifying Elements in Place",
    "Linear Traversal: Iterating with for Loops",
    "The Accumulator Pattern: Summarizing Array Data",
    "The Search Pattern: Finding Specific Data in a List"
  ],
  "tasks": [
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 20, 30, 40, 50];\n\n// Print the first and last elements of the array\n// Each on a new line\n// For numbers = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 50",
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
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 9, 1];\n\n// Print each element of the array on a new line\n// For arr = [3, 7, 2, 9, 1], your output should be:\n// 3\n// 7\n// 2\n// 9\n// 1",
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
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [5, 10, 15, 20, 25];\n\n// Calculate and print the sum of all elements in the array\n// For numbers = [5, 10, 15, 20, 25], your output should be: 75",
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
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [12, 5, 8, 21, 3];\n\n// Find and print the largest number in the array\n// For numbers = [12, 5, 8, 21, 3], your output should be: 21",
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
      "description": "// Do not rename arr and target, use them as input for your program.\n// While testing we will change their values.\nconst arr = [10, 20, 30, 40, 50];\nconst target = 30;\n\n// Find the index of target in the array\n// If found, print the index\n// If not found, print: -1\n// For arr = [10, 20, 30, 40, 50] and target = 30, your output should be: 2",
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
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [3, 7, 2, 9, 1, 5];\n\n// Count how many even numbers are in the array\n// Print only the count\n// For numbers = [3, 7, 2, 9, 1, 5], your output should be: 1",
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
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5];\n\n// Print the array in reverse order\n// Each element on a new line\n// For arr = [1, 2, 3, 4, 5], your output should be:\n// 5\n// 4\n// 3\n// 2\n// 1",
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
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 5, 8, 3, 12, 7];\n\n// Print all numbers greater than 7\n// Each number on a new line\n// For numbers = [10, 5, 8, 3, 12, 7], your output should be:\n// 10\n// 8\n// 12",
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
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [5, 2, 8, 2, 9, 2, 3];\n\n// Double each element in the array (multiply by 2)\n// Print the modified array elements on a new line\n// For arr = [5, 2, 8, 2, 9, 2, 3], your output should be:\n// 10\n// 4\n// 16\n// 4\n// 18\n// 4\n// 6",
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
      "description": "// Do not rename words, use it as input for your program.\n// While testing we will change its value.\nconst words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"];\n\n// Find and print the longest word in the array\n// For words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"], your output should be: watermelon",
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
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 7, 9, 7, 1];\n\n// Count how many times the number 7 appears in the array\n// Print only the count\n// For arr = [3, 7, 2, 7, 9, 7, 1], your output should be: 3",
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
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [4, 7, 2, 9, 1, 6];\n\n// Calculate and print the average of all numbers in the array\n// Round to 2 decimal places\n// For numbers = [4, 7, 2, 9, 1, 6], sum = 29, average = 29/6 = 4.83\n// Your output should be: 4.83",
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
