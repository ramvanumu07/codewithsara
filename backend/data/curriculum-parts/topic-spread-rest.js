/** Topic: Spread and Rest Operators (spread-rest) */
export default {
  "id": "spread-rest",
  "title": "Spread and Rest Operators",
  "outcomes": [
    "What Spread Does: Expand an Array or Object",
    "Copying Arrays and Objects: Shallow Copy",
    "Merging Arrays or Objects: Combine with Spread",
    "Updating Without Mutating: Override with Spread",
    "Rest in Destructuring: Gather the Rest",
    "Rest Must Be Last",
    "Spread vs Rest: Same ..., Different Place"
  ],
  "outcome_messages": [
    "Let's see when to use spread.\n\n**Spread** (`...`) **expands** an array or object into a new array or object. In an **array**: `[...arr]` puts each element of `arr` into the new array. In an **object**: `{ ...obj }` copies each property into the new object. The original is unchanged. Use it when you want a **new** array or object built from an existing one.\n\n## Example\n\n```javascript\nconst a = [1, 2, 3];\nconst b = [...a, 4];\nconsole.log(b);\n```\n\n## Output\n\n```\n[ 1, 2, 3, 4 ]\n```\n\n## Practice\n\nIn the example, why does `b` end up with 1, 2, 3, and then 4?",
    "Let's make a shallow copy with spread.\n\n**`[...array]`** creates a **new array** with the same elements; **`{ ...object }`** creates a **new object** with the same properties. Changing the copy (e.g. `copy[0] = 99`) does **not** change the original. Top level is independent; nested objects or arrays inside are still shared (same reference).\n\n## Example\n\n```javascript\nconst orig = [1, 2, 3];\nconst copy = [...orig];\ncopy[0] = 99;\nconsole.log(orig[0], copy[0]);\n```\n\n## Output\n\n```\n1 99\n```\n\n## Practice\n\nIn the example, why does `orig[0]` still show 1 after we changed `copy[0]` to 99?",
    "Let's merge arrays and objects with spread.\n\nPut multiple spreads in one literal to **combine** arrays or objects. **Arrays:** `[...arr1, ...arr2]` — one new array with all elements. **Objects:** `{ ...obj1, ...obj2 }` — one new object; if both have the same key, the **later** one wins. Order matters.\n\n## Example\n\n```javascript\nconst u = [1, 2];\nconst v = [3, 4];\nconst merged = [...u, ...v];\nconsole.log(merged);\n```\n\n## Output\n\n```\n[ 1, 2, 3, 4 ]\n```\n\n## Practice\n\nIn the example, how do we get one array that has both u's and v's elements?",
    "Let's update without mutating using spread.\n\nTo get a **new** object that is like the old one but with one (or more) properties changed, **spread first, then override**: `{ ...obj, key: newValue }`. The new value replaces the old for that key. The original object is unchanged. Same idea for adding a new property.\n\n## Example\n\n```javascript\nconst state = { count: 0, name: \"App\" };\nconst next = { ...state, count: 1 };\nconsole.log(next);\n```\n\n## Output\n\n```\n{ count: 1, name: 'App' }\n```\n\n## Practice\n\nIn the example, why does `next` have count: 1 but `state` still has count: 0?",
    "Let's use rest in destructuring.\n\n**Rest** (`...variable`) **gathers** the remaining elements or properties into one variable. In **array destructuring**: `[first, ...rest] = arr` — `rest` is an array of all elements after the first. In **object destructuring**: `const { a, ...rest } = obj` — `rest` is an object with all other properties. Rest is always last in the pattern.\n\n## Example\n\n```javascript\nconst [first, ...rest] = [10, 20, 30];\nconsole.log(first, rest);\n```\n\n## Output\n\n```\n10 [ 20, 30 ]\n```\n\n## Practice\n\nIn the example, why does `rest` get [20, 30] and not include 10?",
    "Let's remember rest must be last.\n\n**...rest** means \"all remaining,\" so it only makes sense at the **end**. In array destructuring you can't write `[a, ...rest, b]` — the parser wouldn't know where \"remaining\" stops. Rule: **one rest per pattern, and it must come last.** Same for object destructuring: `const { a, ...rest } = obj` — rest is last.\n\n## Example\n\n```javascript\nconst [x, ...tail] = [1, 2, 3, 4];\nconsole.log(x, tail);\n```\n\n## Output\n\n```\n1 [ 2, 3, 4 ]\n```\n\n## Practice\n\nIn the example, why can't we put ...tail in the middle of the pattern?",
    "Let's compare spread vs rest.\n\nSame **`...`** syntax, different **place**. **Spread** appears where you're **giving** values: inside array literals `[...arr]`, object literals `{ ...obj }`. It **expands** one value into many. **Rest** appears where you're **receiving** values: in destructuring `[x, ...y] = arr` or `{ a, ...rest } = obj`. It **gathers** the rest into one variable. Rule: **spread expands out; rest gathers in.**\n\n## Example\n\n```javascript\nconst [a, ...r] = [1, 2, 3];   // rest: r = [2, 3]\nconst b = [...r, 4];            // spread: r expands into new array\nconsole.log(b);\n```\n\n## Output\n\n```\n[ 2, 3, 4 ]\n```\n\n## Practice\n\nIn the example, when we use ... in `[...r, 4]`, are we expanding `r` or gathering into something? Why?"
  ],
  "practise_tasks": [
    {
      "question": "In the example, why does `b` end up with 1, 2, 3, and then 4?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does `orig[0]` still show 1 after we changed `copy[0]` to 99?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, how do we get one array that has both u's and v's elements?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does `next` have count: 1 but `state` still has count: 0?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does `rest` get [20, 30] and not include 10?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why can't we put ...tail in the middle of the pattern?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, when we use ... in `[...r, 4]`, are we expanding `r` or gathering into something? Why?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    }
  ],
  "tasks": [
    {
      "description": "// Do not rename arr1 and arr2, use them as input for your program.\n// While testing we will change their values.\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\n// Use the spread operator to combine arr1 and arr2 into a new array\n// Print each element of the combined array on a new line\n// For arr1 = [1, 2, 3] and arr2 = [4, 5, 6], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
      "solution_type": "script",
      "reference_solution": "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];\nfor (let i = 0; i < combined.length; i++) {\n  console.log(combined[i]);\n}",
      "testCases": [
        {
          "input": {
            "arr1": [
              1,
              2,
              3
            ],
            "arr2": [
              4,
              5,
              6
            ]
          },
          "expectedOutput": "1\n2\n3\n4\n5\n6"
        },
        {
          "input": {
            "arr1": [
              10,
              20
            ],
            "arr2": [
              30,
              40
            ]
          },
          "expectedOutput": "10\n20\n30\n40"
        },
        {
          "input": {
            "arr1": [
              5
            ],
            "arr2": [
              15,
              25
            ]
          },
          "expectedOutput": "5\n15\n25"
        }
      ]
    },
    {
      "description": "// Do not rename obj1 and obj2, use them as input for your program.\n// While testing we will change their values.\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n// Use the spread operator to merge obj1 and obj2 into a new object\n// Print all values of the merged object using Object.values(), each on a new line\n// For obj1 = { a: 1, b: 2 } and obj2 = { c: 3, d: 4 }, your output should be:\n// 1\n// 2\n// 3\n// 4",
      "solution_type": "script",
      "reference_solution": "const obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\nconst merged = { ...obj1, ...obj2 };\nconst vals = Object.values(merged);\nfor (let i = 0; i < vals.length; i++) {\n  console.log(vals[i]);\n}",
      "testCases": [
        {
          "input": {
            "obj1": {
              "a": 1,
              "b": 2
            },
            "obj2": {
              "c": 3,
              "d": 4
            }
          },
          "expectedOutput": "1\n2\n3\n4"
        },
        {
          "input": {
            "obj1": {
              "x": 10
            },
            "obj2": {
              "y": 20,
              "z": 30
            }
          },
          "expectedOutput": "10\n20\n30"
        },
        {
          "input": {
            "obj1": {
              "m": 5,
              "n": 10
            },
            "obj2": {
              "o": 15
            }
          },
          "expectedOutput": "5\n10\n15"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [10, 20, 30, 40, 50];\n// Use spread operator to insert the number 25 between 20 and 30\n// Create a new array with: first 2 elements, then 25, then the rest\n// Print each element of the new array on a new line\n// For arr = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 20\n// 25\n// 30\n// 40\n// 50",
      "solution_type": "script",
      "reference_solution": "const arr = [10, 20, 30, 40, 50];\nconst newArr = [...arr.slice(0, 2), 25, ...arr.slice(2)];\nfor (let i = 0; i < newArr.length; i++) {\n  console.log(newArr[i]);\n}",
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
          "expectedOutput": "10\n20\n25\n30\n40\n50"
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
          "expectedOutput": "1\n2\n25\n3\n4"
        },
        {
          "input": {
            "arr": [
              5,
              10,
              15
            ]
          },
          "expectedOutput": "5\n10\n25\n15"
        }
      ]
    },
    {
      "description": "// Do not rename obj, use it as input for your program.\n// While testing we will change its value.\nconst obj = { a: 1, b: 2, c: 3, d: 4 };\n// Use rest syntax with object destructuring to extract 'a' and gather the rest\n// Print the value of 'a', then print the count of remaining properties\n// For obj = { a: 1, b: 2, c: 3, d: 4 }, rest has 3 properties\n// Your output should be:\n// 1\n// 3",
      "solution_type": "script",
      "reference_solution": "const obj = { a: 1, b: 2, c: 3, d: 4 };\nconst { a, ...rest } = obj;\nconsole.log(a);\nconsole.log(Object.keys(rest).length);",
      "testCases": [
        {
          "input": {
            "obj": {
              "a": 1,
              "b": 2,
              "c": 3,
              "d": 4
            }
          },
          "expectedOutput": "1\n3"
        },
        {
          "input": {
            "obj": {
              "a": 10,
              "x": 20,
              "y": 30
            }
          },
          "expectedOutput": "10\n2"
        },
        {
          "input": {
            "obj": {
              "a": 5,
              "b": 10
            }
          },
          "expectedOutput": "5\n1"
        }
      ]
    },
    {
      "description": "// Do not rename arrays, use it as input for your program.\n// While testing we will change its value.\nconst arrays = [[1, 2], [3, 4], [5, 6]];\n// Use spread operator to flatten the array of arrays into a single array\n// Print each element of the flattened array on a new line\n// For arrays = [[1, 2], [3, 4], [5, 6]], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
      "solution_type": "script",
      "reference_solution": "const arrays = [[1, 2], [3, 4], [5, 6]];\nlet flat = [];\nfor (let i = 0; i < arrays.length; i++) {\n  flat = [...flat, ...arrays[i]];\n}\nfor (let i = 0; i < flat.length; i++) {\n  console.log(flat[i]);\n}",
      "testCases": [
        {
          "input": {
            "arrays": [
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
          "expectedOutput": "1\n2\n3\n4\n5\n6"
        },
        {
          "input": {
            "arrays": [
              [
                10
              ],
              [
                20,
                30
              ],
              [
                40
              ]
            ]
          },
          "expectedOutput": "10\n20\n30\n40"
        },
        {
          "input": {
            "arrays": [
              [
                5,
                10,
                15
              ],
              [
                20,
                25
              ]
            ]
          },
          "expectedOutput": "5\n10\n15\n20\n25"
        }
      ]
    }
  ]
};
