/** Topic: Data Serialization (json) */
export default {
  "id": "json",
  "title": "Data Serialization",
  "outcomes": [
    "What JSON Is: Data as Text",
    "JSON Syntax: Stricter Than JavaScript",
    "JSON.stringify: Object to String",
    "JSON.parse: String to Object",
    "Formatting and Selecting Keys",
    "What JSON Cannot Store: undefined and Functions",
    "Deep Clone: Copy with JSON",
    "JSON String vs JavaScript Object"
  ],
  "outcome_messages": [
    "Let's see when to use JSON and what it is.\n\n**JSON** (JavaScript Object Notation) is a **text format** for data. APIs, config files, and storage often use it. Valid JSON is objects (with **double-quoted** keys), arrays, strings (double-quoted), numbers, `true`, `false`, and `null`. Use JSON when you need to **send or store** structured data as text and read it back later.\n\n## Example\n\n```javascript\nconst text = '{\"name\":\"Ali\",\"age\":25}';\nconsole.log(text);    // {\"name\":\"Ali\",\"age\":25}\n```\n\nThat string is valid JSON. Parsing it gives a JavaScript object.\n\n## Practice\n\nIs `'{\"x\":1,\"y\":2}'` valid JSON? Is `'{x:1,y:2}'` valid JSON? Which one and why?",
    "Let's learn JSON syntax rules.\n\nIn JSON, **all keys must be double-quoted**. No unquoted keys, no single quotes for keys. String values use double quotes. No trailing commas, no comments. No `undefined`, no functions. JavaScript object literals are looser; JSON is strict so any system can parse it safely.\n\n## Example\n\n```javascript\nconst js = { name: \"Ali\" };   // valid JS\nJSON.stringify(js);            // \"{\\\"name\\\":\\\"Ali\\\"}\" — valid JSON\n```\n\n## Practice\n\nIf you stringify an object that has a property with value `undefined`, does that property appear in the JSON string? Why?",
    "Let's turn objects into JSON strings with JSON.stringify.\n\n**JSON.stringify(value)** turns a JavaScript value (object, array, number, etc.) into a **JSON string**. Keys become double-quoted; structure is preserved. Use it when you need to send or save data as text. Nested objects and arrays are included.\n\n## Example\n\n```javascript\nconst obj = { a: 1, b: [2, 3] };\nconst str = JSON.stringify(obj);\nconsole.log(str);    // {\"a\":1,\"b\":[2,3]}\n```\n\n## Practice\n\nIf `user = { name: \"Alice\", age: 25 }`, write one line that assigns the JSON string for `user` to a variable `jsonStr`. What does `jsonStr` look like?",
    "Let's turn JSON strings into objects with JSON.parse.\n\n**JSON.parse(string)** takes a **JSON string** and returns the corresponding JavaScript value (object or array). The string must be valid JSON; otherwise `parse` throws. Use it when you receive JSON from an API or storage. If a value was stored as a string in JSON (e.g. `\"25\"`) and you need a number, convert after parsing with `Number()`.\n\n## Example\n\n```javascript\nconst str = '{\"x\":10,\"y\":20}';\nconst obj = JSON.parse(str);\nconsole.log(obj.x + obj.y);    // 30\n```\n\n## Practice\n\nIf `jsonStr = '{\"product\":\"Laptop\",\"price\":999}'`, write code that parses it and prints the value of `product`. What is printed?",
    "Let's format output and select keys with JSON.stringify.\n\n**JSON.stringify(value, replacer, space):** The **third argument** is a number — how many spaces to indent each level (e.g. `2` for readable output). The **second argument** can be an **array of property names** to include only those keys; others are omitted. Use `null` as the second argument if you don't want to filter.\n\n## Example\n\n```javascript\nconst data = { a: 1, b: 2, c: 3 };\nconsole.log(JSON.stringify(data, null, 2));\n// {\n//   \"a\": 1,\n//   \"b\": 2,\n//   \"c\": 3\n// }\n```\n\n## Practice\n\nIf `obj = { name: \"Ali\", age: 30, password: \"secret\" }`, use `JSON.stringify(obj, [\"name\", \"age\"], null)` so only `name` and `age` appear. What keys are in the output?",
    "Let's see what JSON cannot store.\n\nJSON has no type for **undefined** or **functions**. **JSON.stringify** omits properties whose value is `undefined`. If a value is a function, stringify throws. So you can't round-trip undefined or functions through JSON. Use only JSON-safe values: objects, arrays, strings, numbers, booleans, null.\n\n## Example\n\n```javascript\nconst o = { a: 1, b: undefined };\nconsole.log(JSON.stringify(o));    // {\"a\":1}\n```\n\n## Practice\n\nWhat does `JSON.stringify({ x: undefined, y: null })` produce? Why?",
    "Let's make a deep clone with JSON.\n\n**JSON.parse(JSON.stringify(obj))** creates a **full copy** of an object: serialize to a string, then parse back. The result has no shared references with the original — change the clone, the original is unchanged. Limits: no functions or undefined (they're lost); special objects (e.g. Date) become plain objects. Use it for **data-only** objects when you need a full copy.\n\n## Example\n\n```javascript\nconst orig = { a: 1, b: { c: 2 } };\nconst clone = JSON.parse(JSON.stringify(orig));\nclone.b.c = 99;\nconsole.log(orig.b.c);    // 2\n```\n\n## Practice\n\nIf `obj = { x: [1, 2] }`, write one expression that gives a deep clone of `obj`. If you change the clone's array, does the original change?",
    "Let's distinguish JSON string from JavaScript object.\n\n**JSON** is **text** (a string). A **JavaScript object** is a value in memory. You convert between them: **stringify** turns an object into a JSON string; **parse** turns a JSON string into an object. APIs usually return JSON strings; you **parse** them before you can use `.property` or `[key]` in code.\n\n## Example\n\n```javascript\nconst literal = { name: \"Ali\" };\nconst json = JSON.stringify(literal);   // string\nconst back = JSON.parse(json);          // object again\n```\n\n## Practice\n\nIf an API returns the string `'{\"id\":1}'`, what do you do in JavaScript before you can access `.id`? What type is the value of `.id` after that?"
  ],
  "tasks": [
    {
      "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { name: \"Alice\", age: 25, city: \"Paris\" };\n\n// Convert the user object to a JSON string using JSON.stringify()\n// Print the JSON string\n// For the given user, your output should be:\n// {\"name\":\"Alice\",\"age\":25,\"city\":\"Paris\"}",
      "solution_type": "script",
      "reference_solution": "const user = { name: \"Alice\", age: 25, city: \"Paris\" };\nconsole.log(JSON.stringify(user));",
      "testCases": [
        {
          "input": {
            "user": {
              "name": "Alice",
              "age": 25,
              "city": "Paris"
            }
          },
          "expectedOutput": "{\"name\":\"Alice\",\"age\":25,\"city\":\"Paris\"}"
        },
        {
          "input": {
            "user": {
              "name": "Bob",
              "age": 30,
              "city": "London"
            }
          },
          "expectedOutput": "{\"name\":\"Bob\",\"age\":30,\"city\":\"London\"}"
        },
        {
          "input": {
            "user": {
              "name": "Charlie",
              "age": 35,
              "city": "Berlin"
            }
          },
          "expectedOutput": "{\"name\":\"Charlie\",\"age\":35,\"city\":\"Berlin\"}"
        }
      ]
    },
    {
      "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}';\n\n// Parse the JSON string using JSON.parse()\n// Extract and print the product name and price on separate lines\n// For the given jsonStr, your output should be:\n// Laptop\n// 999",
      "solution_type": "script",
      "reference_solution": "const jsonStr = '{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}';\nconst obj = JSON.parse(jsonStr);\nconsole.log(obj.product);\nconsole.log(obj.price);",
      "testCases": [
        {
          "input": {
            "jsonStr": "{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}"
          },
          "expectedOutput": "Laptop\n999"
        },
        {
          "input": {
            "jsonStr": "{\"product\":\"Phone\",\"price\":599,\"inStock\":false}"
          },
          "expectedOutput": "Phone\n599"
        },
        {
          "input": {
            "jsonStr": "{\"product\":\"Tablet\",\"price\":399,\"inStock\":true}"
          },
          "expectedOutput": "Tablet\n399"
        }
      ]
    },
    {
      "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = { name: \"Test\", value: 42, active: true };\n\n// Convert data to a JSON string with indentation (use 2 spaces)\n// Print the formatted JSON string\n// For the given data, your output should be:\n// {\n//   \"name\": \"Test\",\n//   \"value\": 42,\n//   \"active\": true\n// }",
      "solution_type": "script",
      "reference_solution": "const data = { name: \"Test\", value: 42, active: true };\nconsole.log(JSON.stringify(data, null, 2));",
      "testCases": [
        {
          "input": {
            "data": {
              "name": "Test",
              "value": 42,
              "active": true
            }
          },
          "expectedOutput": "{\n  \"name\": \"Test\",\n  \"value\": 42,\n  \"active\": true\n}"
        },
        {
          "input": {
            "data": {
              "x": 10,
              "y": 20
            }
          },
          "expectedOutput": "{\n  \"x\": 10,\n  \"y\": 20\n}"
        },
        {
          "input": {
            "data": {
              "id": 1,
              "type": "admin"
            }
          },
          "expectedOutput": "{\n  \"id\": 1,\n  \"type\": \"admin\"\n}"
        }
      ]
    },
    {
      "description": "// Do not rename original, use it as input for your program.\n// While testing we will change its value.\nconst original = { name: \"Alice\", scores: [85, 90, 95] };\n\n// Create a deep clone of the original object using JSON methods\n// Modify the first score in the clone to 100\n// Print the first score from original, then from the clone\n// This demonstrates they are independent\n// For the given original, your output should be:\n// 85\n// 100",
      "solution_type": "script",
      "reference_solution": "const original = { name: \"Alice\", scores: [85, 90, 95] };\nconst clone = JSON.parse(JSON.stringify(original));\nclone.scores[0] = 100;\nconsole.log(original.scores[0]);\nconsole.log(clone.scores[0]);",
      "testCases": [
        {
          "input": {
            "original": {
              "name": "Alice",
              "scores": [
                85,
                90,
                95
              ]
            }
          },
          "expectedOutput": "85\n100"
        },
        {
          "input": {
            "original": {
              "name": "Bob",
              "scores": [
                70,
                75,
                80
              ]
            }
          },
          "expectedOutput": "70\n100"
        },
        {
          "input": {
            "original": {
              "name": "Charlie",
              "scores": [
                60,
                65
              ]
            }
          },
          "expectedOutput": "60\n100"
        }
      ]
    },
    {
      "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5];\n\n// Convert the array to a JSON string\n// Then parse it back and print each element on a new line\n// For arr = [1, 2, 3, 4, 5], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5",
      "solution_type": "script",
      "reference_solution": "const arr = [1, 2, 3, 4, 5];\nconst str = JSON.stringify(arr);\nconst parsed = JSON.parse(str);\nfor (let i = 0; i < parsed.length; i++) {\n  console.log(parsed[i]);\n}",
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
              100
            ]
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "// Do not rename obj, use it as input for your program.\n// While testing we will change its value.\nconst obj = {\n  id: 1,\n  name: \"John\",\n  email: \"john@example.com\",\n  password: \"secret123\",\n  role: \"user\"\n};\n\n// Convert obj to JSON, but exclude the 'password' field\n// Use the replacer parameter in JSON.stringify()\n// Print the resulting JSON string\n// For the given obj, your output should be:\n// {\"id\":1,\"name\":\"John\",\"email\":\"john@example.com\",\"role\":\"user\"}",
      "solution_type": "script",
      "reference_solution": "const obj = { id: 1, name: \"John\", email: \"john@example.com\", password: \"secret123\", role: \"user\" };\nfunction replacer(key, value) {\n  if (key === 'password') return undefined;\n  return value;\n}\nconsole.log(JSON.stringify(obj, replacer));",
      "testCases": [
        {
          "input": {
            "obj": {
              "id": 1,
              "name": "John",
              "email": "john@example.com",
              "password": "secret123",
              "role": "user"
            }
          },
          "expectedOutput": "{\"id\":1,\"name\":\"John\",\"email\":\"john@example.com\",\"role\":\"user\"}"
        },
        {
          "input": {
            "obj": {
              "id": 2,
              "name": "Alice",
              "email": "alice@test.com",
              "password": "pass456",
              "role": "admin"
            }
          },
          "expectedOutput": "{\"id\":2,\"name\":\"Alice\",\"email\":\"alice@test.com\",\"role\":\"admin\"}"
        }
      ]
    },
    {
      "description": "// Do not rename nested, use it as input for your program.\n// While testing we will change its value.\nconst nested = {\n  user: {\n    name: \"Bob\",\n    address: {\n      city: \"Paris\",\n      country: \"France\"\n    }\n  }\n};\n\n// Convert the nested object to JSON and back\n// Access and print the city from the parsed object\n// For the given nested object, your output should be: Paris",
      "solution_type": "script",
      "reference_solution": "const nested = { user: { name: \"Bob\", address: { city: \"Paris\", country: \"France\" } } };\nconst str = JSON.stringify(nested);\nconst parsed = JSON.parse(str);\nconsole.log(parsed.user.address.city);",
      "testCases": [
        {
          "input": {
            "nested": {
              "user": {
                "name": "Bob",
                "address": {
                  "city": "Paris",
                  "country": "France"
                }
              }
            }
          },
          "expectedOutput": "Paris"
        },
        {
          "input": {
            "nested": {
              "user": {
                "name": "Alice",
                "address": {
                  "city": "London",
                  "country": "UK"
                }
              }
            }
          },
          "expectedOutput": "London"
        },
        {
          "input": {
            "nested": {
              "user": {
                "name": "Charlie",
                "address": {
                  "city": "Berlin",
                  "country": "Germany"
                }
              }
            }
          },
          "expectedOutput": "Berlin"
        }
      ]
    },
    {
      "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]';\n\n// Parse the JSON string (array of objects)\n// Calculate and print the average age\n// Round to 2 decimal places\n// For the given jsonStr, average = (25 + 30 + 35) / 3 = 30.00\n// Your output should be: 30.00",
      "solution_type": "script",
      "reference_solution": "const jsonStr = '[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]';\nconst arr = JSON.parse(jsonStr);\nlet sum = 0;\nfor (let i = 0; i < arr.length; i++) sum += arr[i].age;\nconst avg = sum / arr.length;\nconsole.log(avg.toFixed(2));",
      "testCases": [
        {
          "input": {
            "jsonStr": "[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]"
          },
          "expectedOutput": "30.00"
        },
        {
          "input": {
            "jsonStr": "[{\"name\":\"David\",\"age\":20},{\"name\":\"Emma\",\"age\":22}]"
          },
          "expectedOutput": "21.00"
        },
        {
          "input": {
            "jsonStr": "[{\"name\":\"Frank\",\"age\":40},{\"name\":\"Grace\",\"age\":45},{\"name\":\"Henry\",\"age\":50}]"
          },
          "expectedOutput": "45.00"
        }
      ]
    },
    {
      "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = {\n  items: [\n    { name: \"Item1\", price: 10 },\n    { name: \"Item2\", price: 20 },\n    { name: \"Item3\", price: 30 }\n  ]\n};\n\n// Convert data to JSON string, parse it back\n// Calculate the total price of all items\n// Print only the total\n// For the given data, your output should be: 60",
      "solution_type": "script",
      "reference_solution": "const data = { items: [{ name: \"Item1\", price: 10 }, { name: \"Item2\", price: 20 }, { name: \"Item3\", price: 30 }] };\nconst str = JSON.stringify(data);\nconst parsed = JSON.parse(str);\nlet total = 0;\nfor (let i = 0; i < parsed.items.length; i++) total += parsed.items[i].price;\nconsole.log(total);",
      "testCases": [
        {
          "input": {
            "data": {
              "items": [
                {
                  "name": "Item1",
                  "price": 10
                },
                {
                  "name": "Item2",
                  "price": 20
                },
                {
                  "name": "Item3",
                  "price": 30
                }
              ]
            }
          },
          "expectedOutput": "60"
        },
        {
          "input": {
            "data": {
              "items": [
                {
                  "name": "A",
                  "price": 5
                },
                {
                  "name": "B",
                  "price": 15
                }
              ]
            }
          },
          "expectedOutput": "20"
        },
        {
          "input": {
            "data": {
              "items": [
                {
                  "name": "X",
                  "price": 100
                }
              ]
            }
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "// Do not rename config, use it as input for your program.\n// While testing we will change its value.\nconst config = {\n  theme: \"dark\",\n  fontSize: 14,\n  notifications: true,\n  autoSave: false\n};\n\n// Convert config to JSON string, parse it back\n// Count how many boolean properties exist\n// Print only the count\n// For the given config, your output should be: 2",
      "solution_type": "script",
      "reference_solution": "const config = { theme: \"dark\", fontSize: 14, notifications: true, autoSave: false };\nconst str = JSON.stringify(config);\nconst parsed = JSON.parse(str);\nlet count = 0;\nfor (const key in parsed) {\n  if (typeof parsed[key] === 'boolean') count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "config": {
              "theme": "dark",
              "fontSize": 14,
              "notifications": true,
              "autoSave": false
            }
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "config": {
              "a": true,
              "b": 10,
              "c": false,
              "d": true
            }
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "config": {
              "x": "test",
              "y": 5,
              "z": "hello"
            }
          },
          "expectedOutput": "0"
        }
      ]
    }
  ]
};
