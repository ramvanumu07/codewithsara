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
    "Let's see when to use spread.\n\n**Spread** (`...`) **expands** an array or object into a new array or object. In an **array**: `[...arr]` puts each element of `arr` into the new array. In an **object**: `{ ...obj }` copies each property into the new object. The original is unchanged. Use it when you want a **new** array or object built from an existing one.\n\n## Example\n\n```javascript\nconst a = [1, 2, 3];\nconst b = [...a, 4];\nconsole.log(b);    // [ 1, 2, 3, 4 ]\n```\n\n## Practice\n\nIf `arr = [10, 20, 30]`, write one expression that produces a new array with `0` at the start, then all elements of `arr`. What is the first element of that array?",
    "Let's make a shallow copy with spread.\n\n**`[...array]`** creates a **new array** with the same elements; **`{ ...object }`** creates a **new object** with the same properties. Changing the copy (e.g. `copy[0] = 99`) does **not** change the original. Top level is independent; nested objects or arrays inside are still shared (same reference).\n\n## Example\n\n```javascript\nconst orig = [1, 2, 3];\nconst copy = [...orig];\ncopy[0] = 99;\nconsole.log(orig[0], copy[0]);    // 1 99\n```\n\n## Practice\n\nIf `data = [5, 10, 15]`, create a shallow copy, then set the first element of the copy to `0`. What is `data[0]` after that?",
    "Let's merge arrays and objects with spread.\n\nPut multiple spreads in one literal to **combine** arrays or objects. **Arrays:** `[...arr1, ...arr2]` — one new array with all elements. **Objects:** `{ ...obj1, ...obj2 }` — one new object; if both have the same key, the **later** one wins. Order matters.\n\n## Example\n\n```javascript\nconst u = [1, 2];\nconst v = [3, 4];\nconst merged = [...u, ...v];\nconsole.log(merged);    // [ 1, 2, 3, 4 ]\n```\n\n## Practice\n\nIf `arr1 = [1, 2, 3]` and `arr2 = [4, 5]`, write one expression that combines them into one new array. What is the length of that array?",
    "Let's update without mutating using spread.\n\nTo get a **new** object that is like the old one but with one (or more) properties changed, **spread first, then override**: `{ ...obj, key: newValue }`. The new value replaces the old for that key. The original object is unchanged. Same idea for adding a new property.\n\n## Example\n\n```javascript\nconst state = { count: 0, name: \"App\" };\nconst next = { ...state, count: 1 };\nconsole.log(next);    // { count: 1, name: 'App' }\n```\n\n## Practice\n\nIf `obj = { a: 1, b: 2 }`, write one expression for a new object like `obj` but with `b` set to `20`. What is the new object's `b`?",
    "Let's use rest in destructuring.\n\n**Rest** (`...variable`) **gathers** the remaining elements or properties into one variable. In **array destructuring**: `[first, ...rest] = arr` — `rest` is an array of all elements after the first. In **object destructuring**: `const { a, ...rest } = obj` — `rest` is an object with all other properties. Rest is always last in the pattern.\n\n## Example\n\n```javascript\nconst [first, ...rest] = [10, 20, 30];\nconsole.log(first, rest);    // 10 [ 20, 30 ]\n```\n\n## Practice\n\nIf `arr = [5, 10, 15, 20]`, write destructuring that assigns the first element to `head` and the rest to `rest`. What is `rest`?",
    "Let's remember rest must be last.\n\n**...rest** means \"all remaining,\" so it only makes sense at the **end**. In array destructuring you can't write `[a, ...rest, b]` — the parser wouldn't know where \"remaining\" stops. Rule: **one rest per pattern, and it must come last.** Same for object destructuring: `const { a, ...rest } = obj` — rest is last.\n\n## Example\n\n```javascript\nconst [x, ...tail] = [1, 2, 3, 4];\nconsole.log(x, tail);    // 1 [ 2, 3, 4 ]\n```\n\n## Practice\n\nIf `arr = [1, 2, 3, 4, 5]` and you write `const [a, b, ...c] = arr`, what is `c`?",
    "Let's compare spread vs rest.\n\nSame **`...`** syntax, different **place**. **Spread** appears where you're **giving** values: inside array literals `[...arr]`, object literals `{ ...obj }`. It **expands** one value into many. **Rest** appears where you're **receiving** values: in destructuring `[x, ...y] = arr` or `{ a, ...rest } = obj`. It **gathers** the rest into one variable. Rule: **spread expands out; rest gathers in.**\n\n## Example\n\n```javascript\nconst [a, ...r] = [1, 2, 3];   // rest: r = [2, 3]\nconst b = [...r, 4];            // spread: r expands into new array\nconsole.log(b);    // [ 2, 3, 4 ]\n```\n\n## Practice\n\nIn the expression `[...arr]`, is `...` spread or rest? In `[x, ...y] = arr`, is `...` spread or rest?"
  ],
  "tasks": [
    {
      "description": "// Do not rename arr1 and arr2, use them as input for your program.\n// While testing we will change their values.\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\n\n// Use the spread operator to combine arr1 and arr2 into a new array\n// Print each element of the combined array on a new line\n// For arr1 = [1, 2, 3] and arr2 = [4, 5, 6], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
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
      "description": "// Do not rename original, use it as input for your program.\n// While testing we will change its value.\nconst original = [1, 2, 3, 4, 5];\n\n// Create a shallow copy of the array using the spread operator\n// Modify the first element of the copy to be 100\n// Print the first element of the original array, then the first element of the copy\n// This demonstrates that they are independent\n// For original = [1, 2, 3, 4, 5], your output should be:\n// 1\n// 100",
      "solution_type": "script",
      "reference_solution": "const original = [1, 2, 3, 4, 5];\nconst copy = [...original];\ncopy[0] = 100;\nconsole.log(original[0]);\nconsole.log(copy[0]);",
      "testCases": [
        {
          "input": {
            "original": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "expectedOutput": "1\n100"
        },
        {
          "input": {
            "original": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "10\n100"
        },
        {
          "input": {
            "original": [
              5,
              15,
              25,
              35
            ]
          },
          "expectedOutput": "5\n100"
        }
      ]
    },
    {
      "description": "// Do not rename obj1 and obj2, use them as input for your program.\n// While testing we will change their values.\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n\n// Use the spread operator to merge obj1 and obj2 into a new object\n// Print all values of the merged object using Object.values(), each on a new line\n// For obj1 = { a: 1, b: 2 } and obj2 = { c: 3, d: 4 }, your output should be:\n// 1\n// 2\n// 3\n// 4",
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
      "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { name: \"Alice\", age: 25, city: \"Paris\" };\n\n// Create a new object using spread that copies user and updates the age to 26\n// Print the age from the original object, then the age from the new object\n// For the given user, your output should be:\n// 25\n// 26",
      "solution_type": "script",
      "reference_solution": "const user = { name: \"Alice\", age: 25, city: \"Paris\" };\nconst updated = { ...user, age: 26 };\nconsole.log(user.age);\nconsole.log(updated.age);",
      "testCases": [
        {
          "input": {
            "user": {
              "name": "Alice",
              "age": 25,
              "city": "Paris"
            }
          },
          "expectedOutput": "25\n26"
        },
        {
          "input": {
            "user": {
              "name": "Bob",
              "age": 30,
              "city": "London"
            }
          },
          "expectedOutput": "30\n26"
        },
        {
          "input": {
            "user": {
              "name": "Charlie",
              "age": 20,
              "city": "Berlin"
            }
          },
          "expectedOutput": "20\n26"
        }
      ]
    },
    {
      "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [5, 10, 15, 20, 25];\n\n// Use rest syntax with array destructuring to get the first element and the rest\n// Calculate the sum of the rest elements (excluding the first)\n// Print the first element on one line, then the sum on the next line\n// For numbers = [5, 10, 15, 20, 25], rest = [10, 15, 20, 25], sum = 70\n// Your output should be:\n// 5\n// 70",
      "solution_type": "script",
      "reference_solution": "const numbers = [5, 10, 15, 20, 25];\nconst [first, ...rest] = numbers;\nlet sum = 0;\nfor (let i = 0; i < rest.length; i++) sum += rest[i];\nconsole.log(first);\nconsole.log(sum);",
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
          "expectedOutput": "5\n70"
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
          "expectedOutput": "1\n9"
        },
        {
          "input": {
            "numbers": [
              100,
              50,
              25
            ]
          },
          "expectedOutput": "100\n75"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [10, 20, 30, 40, 50];\n\n// Use spread operator to insert the number 25 between 20 and 30\n// Create a new array with: first 2 elements, then 25, then the rest\n// Print each element of the new array on a new line\n// For arr = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 20\n// 25\n// 30\n// 40\n// 50",
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
      "description": "// Do not rename obj, use it as input for your program.\n// While testing we will change its value.\nconst obj = { a: 1, b: 2, c: 3, d: 4 };\n\n// Use rest syntax with object destructuring to extract 'a' and gather the rest\n// Print the value of 'a', then print the count of remaining properties\n// For obj = { a: 1, b: 2, c: 3, d: 4 }, rest has 3 properties\n// Your output should be:\n// 1\n// 3",
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
      "description": "// Do not rename arrays, use it as input for your program.\n// While testing we will change its value.\nconst arrays = [[1, 2], [3, 4], [5, 6]];\n\n// Use spread operator to flatten the array of arrays into a single array\n// Print each element of the flattened array on a new line\n// For arrays = [[1, 2], [3, 4], [5, 6]], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
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
    },
    {
      "description": "// Do not rename defaults and overrides, use them as input for your program.\n// While testing we will change their values.\nconst defaults = { theme: \"light\", fontSize: 14, language: \"en\" };\nconst overrides = { fontSize: 16, language: \"fr\" };\n\n// Merge defaults and overrides using spread operator\n// overrides should take precedence over defaults\n// Print all values from the merged object using Object.values(), each on a new line\n// For the given objects, your output should be:\n// light\n// 16\n// fr",
      "solution_type": "script",
      "reference_solution": "const defaults = { theme: \"light\", fontSize: 14, language: \"en\" };\nconst overrides = { fontSize: 16, language: \"fr\" };\nconst merged = { ...defaults, ...overrides };\nconst vals = Object.values(merged);\nfor (let i = 0; i < vals.length; i++) {\n  console.log(vals[i]);\n}",
      "testCases": [
        {
          "input": {
            "defaults": {
              "theme": "light",
              "fontSize": 14,
              "language": "en"
            },
            "overrides": {
              "fontSize": 16,
              "language": "fr"
            }
          },
          "expectedOutput": "light\n16\nfr"
        },
        {
          "input": {
            "defaults": {
              "color": "blue",
              "size": 10
            },
            "overrides": {
              "color": "red"
            }
          },
          "expectedOutput": "red\n10"
        },
        {
          "input": {
            "defaults": {
              "a": 1,
              "b": 2,
              "c": 3
            },
            "overrides": {
              "b": 20,
              "c": 30
            }
          },
          "expectedOutput": "1\n20\n30"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"hello\";\n\n// Use spread operator to convert the string into an array of characters\n// Then use rest syntax to get the first character and the rest\n// Print the first character, then print the count of remaining characters\n// For str = \"hello\", first = 'h', rest has 4 characters\n// Your output should be:\n// h\n// 4",
      "solution_type": "script",
      "reference_solution": "const str = \"hello\";\nconst chars = [...str];\nconst [first, ...rest] = chars;\nconsole.log(first);\nconsole.log(rest.length);",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "h\n4"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "w\n4"
        },
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "J\n9"
        },
        {
          "input": {
            "str": "ab"
          },
          "expectedOutput": "a\n1"
        }
      ]
    }
  ]
};
