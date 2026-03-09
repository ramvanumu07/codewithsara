/** Topic: Data Serialization (json) */
export default {
  "id": "json",
  "title": "Data Serialization",
  "outcomes": [
    "JSON Fundamentals: The Universal Data Interchange Format",
    "JSON Syntax Rules: Why it is stricter than JS Objects",
    "JSON.stringify(): Converting Objects to Strings",
    "JSON.parse(): Reconstructing Objects from Strings",
    "Formatting: Using Spacing and Replacers in stringify",
    "The Reviver: Transforming Data during Parsing",
    "Serialization Limits: Handling Functions and undefined",
    "The Deep Clone Trick: Creating Independent Object Copies",
    "Architectural Distinction: JSON vs. JavaScript Object Literals"
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
