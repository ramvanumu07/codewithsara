/** Topic: Specialized Collections (map-set) */
export default {
  "id": "map-set",
  "title": "Specialized Collections",
  "outcomes": [
    "Map: Advanced Key-Value Collections",
    "Map CRUD: set(), get(), has(), and delete()",
    "Map State: size and clear() management",
    "Map Iteration: entries(), keys(), and values()",
    "Set: The Collection of Unique Values",
    "Set CRUD: add(), has(), and delete()",
    "Array-to-Set: The \"Unique Value\" Pattern",
    "Architectural Choice: Map vs. Object & Set vs. Array"
  ],
  "tasks": [
    {
      "description": "// Create a new Map and add three key-value pairs:\n// - \"name\" -> \"Alice\"\n// - \"age\" -> 25\n// - \"city\" -> \"Paris\"\n// Print the value associated with the key \"name\"\n// Your output should be: Alice",
      "solution_type": "script",
      "reference_solution": "const map = new Map();\nmap.set(\"name\", \"Alice\");\nmap.set(\"age\", 25);\nmap.set(\"city\", \"Paris\");\nconsole.log(map.get(\"name\"));",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Alice"
        }
      ]
    },
    {
      "description": "// Do not rename map and key, use them as input for your program.\n// While testing we will change their values.\nconst map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]]);\nconst key = \"b\";\n\n// Check if the key exists in the map using has()\n// If it exists, print the value using get()\n// If it doesn't exist, print: \"Not found\"\n// For key = \"b\", your output should be: 20",
      "solution_type": "script",
      "reference_solution": "const map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]]);\nconst key = \"b\";\nif (map.has(key)) {\n  console.log(map.get(key));\n} else {\n  console.log(\"Not found\");\n}",
      "testCases": [
        {
          "input": {
            "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])",
            "key": "b"
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])",
            "key": "d"
          },
          "expectedOutput": "Not found"
        },
        {
          "input": {
            "map": "new Map([[\"x\", 100], [\"y\", 200]])",
            "key": "x"
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]]);\n\n// Print the size of the map (number of entries)\n// Then print all keys using keys(), each on a new line\n// For the given map, your output should be:\n// 3\n// apple\n// banana\n// orange",
      "solution_type": "script",
      "reference_solution": "const map = new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]]);\nconsole.log(map.size);\nfor (const k of map.keys()) {\n  console.log(k);\n}",
      "testCases": [
        {
          "input": {
            "map": "new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]])"
          },
          "expectedOutput": "3\napple\nbanana\norange"
        },
        {
          "input": {
            "map": "new Map([[\"x\", 1], [\"y\", 2]])"
          },
          "expectedOutput": "2\nx\ny"
        },
        {
          "input": {
            "map": "new Map([[\"a\", 10]])"
          },
          "expectedOutput": "1\na"
        }
      ]
    },
    {
      "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]]);\n\n// Calculate the sum of all values in the map using values()\n// Print only the total sum\n// For the given map, your output should be: 263",
      "solution_type": "script",
      "reference_solution": "const map = new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]]);\nlet sum = 0;\nfor (const v of map.values()) {\n  sum += v;\n}\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "map": "new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]])"
          },
          "expectedOutput": "263"
        },
        {
          "input": {
            "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])"
          },
          "expectedOutput": "60"
        },
        {
          "input": {
            "map": "new Map([[\"x\", 100]])"
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "// Create a new Set with the following values: 1, 2, 3, 4, 5\n// Add the value 6 to the set\n// Check if the value 3 exists using has()\n// Print: \"Found\" if it exists, otherwise print: \"Not found\"\n// Your output should be: Found",
      "solution_type": "script",
      "reference_solution": "const set = new Set([1, 2, 3, 4, 5]);\nset.add(6);\nif (set.has(3)) {\n  console.log(\"Found\");\n} else {\n  console.log(\"Not found\");\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Found"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];\n\n// Create a Set from the array to get unique values\n// Print the size of the set (number of unique values)\n// For arr = [1, 2, 2, 3, 4, 4, 5, 5, 5], your output should be: 5",
      "solution_type": "script",
      "reference_solution": "const arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];\nconst set = new Set(arr);\nconsole.log(set.size);",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              2,
              2,
              3,
              4,
              4,
              5,
              5,
              5
            ]
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              10,
              20
            ]
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "arr": [
              5,
              5,
              5,
              5
            ]
          },
          "expectedOutput": "1"
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
          "expectedOutput": "6"
        }
      ]
    },
    {
      "description": "// Do not rename set, use it as input for your program.\n// While testing we will change its value.\nconst set = new Set([10, 20, 30, 40, 50]);\n\n// Delete the value 30 from the set using delete()\n// Print all remaining values in the set, each on a new line\n// For the given set, your output should be:\n// 10\n// 20\n// 40\n// 50",
      "solution_type": "script",
      "reference_solution": "const set = new Set([10, 20, 30, 40, 50]);\nset.delete(30);\nfor (const v of set) {\n  console.log(v);\n}",
      "testCases": [
        {
          "input": {
            "set": "new Set([10, 20, 30, 40, 50])"
          },
          "expectedOutput": "10\n20\n40\n50"
        },
        {
          "input": {
            "set": "new Set([1, 2, 3])"
          },
          "expectedOutput": "1\n2\n3"
        },
        {
          "input": {
            "set": "new Set([5, 10, 15, 20])"
          },
          "expectedOutput": "5\n10\n15\n20"
        }
      ]
    },
    {
      "description": "// Do not rename arr1 and arr2, use them as input for your program.\n// While testing we will change their values.\nconst arr1 = [1, 2, 3, 4];\nconst arr2 = [3, 4, 5, 6];\n\n// Find the common elements between arr1 and arr2 using Sets\n// Print the common elements, each on a new line\n// Hint: Create a set from arr1, then check which elements from arr2 are in the set\n// For arr1 = [1, 2, 3, 4] and arr2 = [3, 4, 5, 6], your output should be:\n// 3\n// 4",
      "solution_type": "script",
      "reference_solution": "const arr1 = [1, 2, 3, 4];\nconst arr2 = [3, 4, 5, 6];\nconst set1 = new Set(arr1);\nfor (let i = 0; i < arr2.length; i++) {\n  if (set1.has(arr2[i])) {\n    console.log(arr2[i]);\n  }\n}",
      "testCases": [
        {
          "input": {
            "arr1": [
              1,
              2,
              3,
              4
            ],
            "arr2": [
              3,
              4,
              5,
              6
            ]
          },
          "expectedOutput": "3\n4"
        },
        {
          "input": {
            "arr1": [
              10,
              20,
              30
            ],
            "arr2": [
              20,
              30,
              40
            ]
          },
          "expectedOutput": "20\n30"
        },
        {
          "input": {
            "arr1": [
              5,
              10,
              15
            ],
            "arr2": [
              20,
              25,
              30
            ]
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "arr1": [
              1,
              2,
              3
            ],
            "arr2": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "1\n2\n3"
        }
      ]
    },
    {
      "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]]);\n\n// Count how many entries have values greater than 20\n// Use entries() to iterate through the map\n// Print only the count\n// For the given map, your output should be: 2",
      "solution_type": "script",
      "reference_solution": "const map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]]);\nlet count = 0;\nfor (const entry of map.entries()) {\n  if (entry[1] > 20) count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]])"
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "map": "new Map([[\"x\", 50], [\"y\", 60], [\"z\", 70]])"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "map": "new Map([[\"m\", 5], [\"n\", 10]])"
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "map": "new Map([[\"p\", 21], [\"q\", 22]])"
          },
          "expectedOutput": "2"
        }
      ]
    },
    {
      "description": "// Do not rename words, use it as input for your program.\n// While testing we will change its value.\nconst words = [\"apple\", \"banana\", \"apple\", \"orange\", \"banana\", \"apple\"];\n\n// Count the frequency of each word using a Map\n// Print each word and its count in the format: \"word: count\"\n// For the given words array, your output should be:\n// apple: 3\n// banana: 2\n// orange: 1",
      "solution_type": "script",
      "reference_solution": "const words = [\"apple\", \"banana\", \"apple\", \"orange\", \"banana\", \"apple\"];\nconst freq = new Map();\nfor (let i = 0; i < words.length; i++) {\n  const w = words[i];\n  if (freq.has(w)) {\n    freq.set(w, freq.get(w) + 1);\n  } else {\n    freq.set(w, 1);\n  }\n}\nfor (const entry of freq.entries()) {\n  console.log(entry[0] + \": \" + entry[1]);\n}",
      "testCases": [
        {
          "input": {
            "words": [
              "apple",
              "banana",
              "apple",
              "orange",
              "banana",
              "apple"
            ]
          },
          "expectedOutput": "apple: 3\nbanana: 2\norange: 1"
        },
        {
          "input": {
            "words": [
              "cat",
              "dog",
              "cat",
              "cat"
            ]
          },
          "expectedOutput": "cat: 3\ndog: 1"
        },
        {
          "input": {
            "words": [
              "one",
              "two",
              "three"
            ]
          },
          "expectedOutput": "one: 1\ntwo: 1\nthree: 1"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"javascript\";\n\n// Find all unique characters in the string using a Set\n// Convert the string to an array, create a Set, then print the count of unique characters\n// For str = \"javascript\", unique characters are: j, a, v, s, c, r, i, p, t (9 unique)\n// Your output should be: 9",
      "solution_type": "script",
      "reference_solution": "const str = \"javascript\";\nconst chars = [];\nfor (let i = 0; i < str.length; i++) {\n  chars.push(str[i]);\n}\nconst set = new Set(chars);\nconsole.log(set.size);",
      "testCases": [
        {
          "input": {
            "str": "javascript"
          },
          "expectedOutput": "9"
        },
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "str": "aaa"
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "str": "programming"
          },
          "expectedOutput": "9"
        }
      ]
    },
    {
      "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]]);\n\n// Iterate through the map using entries()\n// Print each entry in the format: \"key -> value\"\n// For the given map, your output should be:\n// 1 -> one\n// 2 -> two\n// 3 -> three",
      "solution_type": "script",
      "reference_solution": "const map = new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]]);\nfor (const entry of map.entries()) {\n  console.log(entry[0] + \" -> \" + entry[1]);\n}",
      "testCases": [
        {
          "input": {
            "map": "new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]])"
          },
          "expectedOutput": "1 -> one\n2 -> two\n3 -> three"
        },
        {
          "input": {
            "map": "new Map([[\"a\", \"apple\"], [\"b\", \"banana\"]])"
          },
          "expectedOutput": "a -> apple\nb -> banana"
        },
        {
          "input": {
            "map": "new Map([[10, \"ten\"]])"
          },
          "expectedOutput": "10 -> ten"
        }
      ]
    }
  ]
};
