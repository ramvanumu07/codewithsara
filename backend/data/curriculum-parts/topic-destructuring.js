/** Topic: Destructuring (destructuring) */
export default {
  "id": "destructuring",
  "title": "Destructuring",
  "outcomes": [
    "Array Destructuring: Unpack by Position",
    "Skipping and Rest: First, Rest, or Skip Some",
    "Object Destructuring: Unpack by Key Name",
    "Renaming and Default Values",
    "Nested Destructuring: One Level Deeper",
    "Swapping Two Variables"
  ],
  "outcome_messages": [
    "**When to use it**\n\nWhen you have an array and want the **first few elements in named variables** (instead of `arr[0]`, `arr[1]`), use **array destructuring**. Put square brackets on the left of `=` and list variable names; the first name gets the first element, the second gets the second, and so on.\n\n## Syntax\n\n```text\nconst [var1, var2, var3] = array;\n```\n\n## Example\n\n```javascript\nconst [a, b, c] = [10, 20, 30];\nconsole.log(a, b, c);\n```\n\n## Output\n\n```\n10 20 30\n```\n\n## Practice\n\nIn the example, why does `a` get 10 and `b` get 20?",
    "**Skipping and rest**\n\nUse **empty commas** to skip positions: `[a, , c]` skips the second element. Use **...rest** (three dots and a variable name) at the end to collect the **remaining elements** into an array: `[first, ...rest]`. Only one rest is allowed, and it's usually last. Use it to get \"first\" and \"everything else\" in one line.\n\n## Example\n\n```javascript\nconst [x, , z, ...tail] = [1, 2, 3, 4, 5];\nconsole.log(x, z, tail);\n```\n\n## Output\n\n```\n1 3 [ 4, 5 ]\n```\n\n## Practice\n\nIn the example, why does `tail` get [4, 5] and not the first few numbers?",
    "**Object destructuring**\n\nWhen you have an object and want **several properties as variables**, use **object destructuring**. Put curly braces on the left of `=` with **property names** that match the object's keys. Each name becomes a variable with that property's value. Order doesn't matter—names are matched by key.\n\n## Example\n\n```javascript\nconst user = { id: 1, name: \"Ali\", role: \"admin\" };\nconst { name, role } = user;\nconsole.log(name, role);\n```\n\n## Output\n\n```\nAli admin\n```\n\n## Practice\n\nIn object destructuring, does the order of variable names in the braces (e.g. `name` before `role`) matter? Why or why not?",
    "**Renaming and defaults**\n\n**Rename** with a colon: `const { oldKey: newName } = obj` — `newName` gets the value of `oldKey`. **Default** with `=`: `const { key = defaultVal } = obj` — if `key` is missing or `undefined`, the variable gets `defaultVal`. You can combine: `const { key: k = 0 }`.\n\n## Example\n\n```javascript\nconst o = { a: 1 };\nconst { a: alpha, b: beta = 10 } = o;\nconsole.log(alpha, beta);\n```\n\n## Output\n\n```\n1 10\n```\n\n## Practice\n\nIn the example, why does `beta` get 10 even though `o` has no property `b`?",
    "**Nested destructuring**\n\nWhen the value you want is **inside** another object or array, **match the structure** in the pattern. For an object inside an object: `const { level1: { level2 } } = obj`. For an array as an element: `const [first, [a, b]] = arr`. You're \"going one level deeper\" in one assignment.\n\n## Example\n\n```javascript\nconst data = { config: { theme: \"dark\", size: 12 } };\nconst { config: { theme } } = data;\nconsole.log(theme);\n```\n\n## Output\n\n```\ndark\n```\n\n## Practice\n\nWhy do we need two levels of curly braces in `{ config: { theme } }` to get `theme` from `data`?",
    "**Swapping two variables**\n\n**`[a, b] = [b, a]`** swaps the values of `a` and `b`. The right side is an array of the current values; the left side assigns them into the variables in the new order. No temporary variable needed.\n\n## Example\n\n```javascript\nlet x = 5, y = 10;\n[x, y] = [y, x];\nconsole.log(x, y);\n```\n\n## Output\n\n```\n10 5\n```\n\n## Practice\n\nIf `a = 1` and `b = 2`, what are `a` and `b` after `[a, b] = [b, a]`?"
  ],
  "tasks": [
    {
      "description": "// Do not rename person, use it as input for your program.\n// While testing we will change its value.\nconst person = { name: \"Alice\", age: 25, city: \"Paris\" };\n// Use object destructuring to extract name and age\n// Print them on separate lines\n// For the given person object, your output should be:\n// Alice\n// 25",
      "solution_type": "script",
      "reference_solution": "const person = { name: \"Alice\", age: 25, city: \"Paris\" };\nconst { name, age } = person;\nconsole.log(name);\nconsole.log(age);",
      "testCases": [
        {
          "input": {
            "person": {
              "name": "Alice",
              "age": 25,
              "city": "Paris"
            }
          },
          "expectedOutput": "Alice\n25"
        },
        {
          "input": {
            "person": {
              "name": "Bob",
              "age": 30,
              "city": "London"
            }
          },
          "expectedOutput": "Bob\n30"
        },
        {
          "input": {
            "person": {
              "name": "Charlie",
              "age": 35,
              "city": "Berlin"
            }
          },
          "expectedOutput": "Charlie\n35"
        }
      ]
    },
    {
      "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { username: \"john_doe\", email: \"john@example.com\" };\n// Use object destructuring with default values\n// Extract username, email, and age (with default value 18)\n// Print all three values on separate lines\n// For the given user object (which doesn't have age), your output should be:\n// john_doe\n// john@example.com\n// 18",
      "solution_type": "script",
      "reference_solution": "const user = { username: \"john_doe\", email: \"john@example.com\" };\nconst { username, email, age = 18 } = user;\nconsole.log(username);\nconsole.log(email);\nconsole.log(age);",
      "testCases": [
        {
          "input": {
            "user": {
              "username": "john_doe",
              "email": "john@example.com"
            }
          },
          "expectedOutput": "john_doe\njohn@example.com\n18"
        },
        {
          "input": {
            "user": {
              "username": "alice",
              "email": "alice@test.com",
              "age": 25
            }
          },
          "expectedOutput": "alice\nalice@test.com\n25"
        },
        {
          "input": {
            "user": {
              "username": "bob",
              "email": "bob@mail.com"
            }
          },
          "expectedOutput": "bob\nbob@mail.com\n18"
        }
      ]
    },
    {
      "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = { id: 101, info: { name: \"Product A\", price: 50 } };\n// Use nested destructuring to extract id, name, and price\n// Print all three values on separate lines\n// For the given data object, your output should be:\n// 101\n// Product A\n// 50",
      "solution_type": "script",
      "reference_solution": "const data = { id: 101, info: { name: \"Product A\", price: 50 } };\nconst { id, info: { name, price } } = data;\nconsole.log(id);\nconsole.log(name);\nconsole.log(price);",
      "testCases": [
        {
          "input": {
            "data": {
              "id": 101,
              "info": {
                "name": "Product A",
                "price": 50
              }
            }
          },
          "expectedOutput": "101\nProduct A\n50"
        },
        {
          "input": {
            "data": {
              "id": 202,
              "info": {
                "name": "Product B",
                "price": 75
              }
            }
          },
          "expectedOutput": "202\nProduct B\n75"
        },
        {
          "input": {
            "data": {
              "id": 303,
              "info": {
                "name": "Product C",
                "price": 100
              }
            }
          },
          "expectedOutput": "303\nProduct C\n100"
        }
      ]
    },
    {
      "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 10;\nconst b = 20;\n// Swap the values of a and b using array destructuring\n// Do NOT use a temporary variable\n// Print both values after swapping on separate lines\n// For a = 10 and b = 20, your output should be:\n// 20\n// 10",
      "solution_type": "script",
      "reference_solution": "const a = 10;\nconst b = 20;\nconst [swappedA, swappedB] = [b, a];\nconsole.log(swappedA);\nconsole.log(swappedB);",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 20
          },
          "expectedOutput": "20\n10"
        },
        {
          "input": {
            "a": 5,
            "b": 15
          },
          "expectedOutput": "15\n5"
        },
        {
          "input": {
            "a": 100,
            "b": 200
          },
          "expectedOutput": "200\n100"
        },
        {
          "input": {
            "a": 7,
            "b": 3
          },
          "expectedOutput": "3\n7"
        }
      ]
    },
    {
      "description": "// Do not rename config, use it as input for your program.\n// While testing we will change its value.\nconst config = { host: \"localhost\", port: 3000, timeout: 5000 };\n// Use object destructuring with renaming\n// Extract 'host' as 'serverHost' and 'port' as 'serverPort'\n// Print both renamed variables on separate lines\n// For the given config, your output should be:\n// localhost\n// 3000",
      "solution_type": "script",
      "reference_solution": "const config = { host: \"localhost\", port: 3000, timeout: 5000 };\nconst { host: serverHost, port: serverPort } = config;\nconsole.log(serverHost);\nconsole.log(serverPort);",
      "testCases": [
        {
          "input": {
            "config": {
              "host": "localhost",
              "port": 3000,
              "timeout": 5000
            }
          },
          "expectedOutput": "localhost\n3000"
        },
        {
          "input": {
            "config": {
              "host": "192.168.1.1",
              "port": 8080,
              "timeout": 3000
            }
          },
          "expectedOutput": "192.168.1.1\n8080"
        },
        {
          "input": {
            "config": {
              "host": "example.com",
              "port": 443,
              "timeout": 10000
            }
          },
          "expectedOutput": "example.com\n443"
        }
      ]
    },
    {
      "description": "// Do not rename response, use it as input for your program.\n// While testing we will change its value.\nconst response = {\n  status: 200,\n  data: {\n    user: { id: 1, name: \"John\" },\n    posts: [\"post1\", \"post2\"]\n  }\n};\n// Use nested destructuring to extract:\n// - status from the top level\n// - name from data.user\n// - The first post from data.posts array\n// Print all three values on separate lines\n// For the given response, your output should be:\n// 200\n// John\n// post1",
      "solution_type": "script",
      "reference_solution": "const response = { status: 200, data: { user: { id: 1, name: \"John\" }, posts: [\"post1\", \"post2\"] } };\nconst { status, data: { user: { name }, posts: [firstPost] } } = response;\nconsole.log(status);\nconsole.log(name);\nconsole.log(firstPost);",
      "testCases": [
        {
          "input": {
            "response": {
              "status": 200,
              "data": {
                "user": {
                  "id": 1,
                  "name": "John"
                },
                "posts": [
                  "post1",
                  "post2"
                ]
              }
            }
          },
          "expectedOutput": "200\nJohn\npost1"
        },
        {
          "input": {
            "response": {
              "status": 404,
              "data": {
                "user": {
                  "id": 2,
                  "name": "Alice"
                },
                "posts": [
                  "article1",
                  "article2",
                  "article3"
                ]
              }
            }
          },
          "expectedOutput": "404\nAlice\narticle1"
        }
      ]
    }
  ]
};
