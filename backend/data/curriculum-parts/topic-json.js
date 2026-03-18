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
    "Let's see when to use JSON and what it is.\n\n**JSON** (JavaScript Object Notation) is a **text format** for data. APIs, config files, and storage often use it. Valid JSON is objects (with **double-quoted** keys), arrays, strings (double-quoted), numbers, `true`, `false`, and `null`. Use JSON when you need to **send or store** structured data as text and read it back later.\n\n## Example\n\n```javascript\nconst text = '{\"name\":\"Ali\",\"age\":25}';\nconsole.log(text);\n```\n\n## Output\n\n```\n{\"name\":\"Ali\",\"age\":25}\n```\n\nThat string is valid JSON. Parsing it gives a JavaScript object.\n\n## Practice\n\nIs `'{\"x\":1,\"y\":2}'` valid JSON? Is `'{x:1,y:2}'` valid JSON? Which one and why?",
    "Let's learn JSON syntax rules.\n\nIn JSON, **all keys must be double-quoted**. No unquoted keys, no single quotes for keys. String values use double quotes. No trailing commas, no comments. No `undefined`, no functions. JavaScript object literals are looser; JSON is strict so any system can parse it safely.\n\n## Example\n\n```javascript\nconst js = { name: \"Ali\" };\nconsole.log(JSON.stringify(js));\n```\n\n## Output\n\n```\n{\"name\":\"Ali\"}\n```\n\n## Practice\n\nIf you stringify an object that has a property with value `undefined`, does that property appear in the JSON string? Why?",
    "Let's turn objects into JSON strings with JSON.stringify.\n\n**JSON.stringify(value)** turns a JavaScript value (object, array, number, etc.) into a **JSON string**. Keys become double-quoted; structure is preserved. Use it when you need to send or save data as text. Nested objects and arrays are included.\n\n## Example\n\n```javascript\nconst obj = { a: 1, b: [2, 3] };\nconst str = JSON.stringify(obj);\nconsole.log(str);\n```\n\n## Output\n\n```\n{\"a\":1,\"b\":[2,3]}\n```\n\n## Practice\n\nIn the example, what does JSON.stringify turn the object into—a string or an object? Why does that help when sending or saving data?",
    "Let's turn JSON strings into objects with JSON.parse.\n\n**JSON.parse(string)** takes a **JSON string** and returns the corresponding JavaScript value (object or array). The string must be valid JSON; otherwise `parse` throws. Use it when you receive JSON from an API or storage. If a value was stored as a string in JSON (e.g. `\"25\"`) and you need a number, convert after parsing with `Number()`.\n\n## Example\n\n```javascript\nconst str = '{\"x\":10,\"y\":20}';\nconst obj = JSON.parse(str);\nconsole.log(obj.x + obj.y);\n```\n\n## Output\n\n```\n30\n```\n\n## Practice\n\nIn the example, why do we need JSON.parse before we can use obj.x and obj.y?",
    "Let's format output and select keys with JSON.stringify.\n\n**JSON.stringify(value, replacer, space):** The **third argument** is a number — how many spaces to indent each level (e.g. `2` for readable output). The **second argument** can be an **array of property names** to include only those keys; others are omitted. Use `null` as the second argument if you don't want to filter.\n\n## Example\n\n```javascript\nconst data = { a: 1, b: 2, c: 3 };\nconsole.log(JSON.stringify(data, null, 2));\n```\n\n## Output\n\n```\n{\n  \"a\": 1,\n  \"b\": 2,\n  \"c\": 3\n}\n```\n\n## Practice\n\nIn the example, what does the third argument (2) to JSON.stringify do?",
    "Let's see what JSON cannot store.\n\nJSON has no type for **undefined** or **functions**. **JSON.stringify** omits properties whose value is `undefined`. If a value is a function, stringify throws. So you can't round-trip undefined or functions through JSON. Use only JSON-safe values: objects, arrays, strings, numbers, booleans, null.\n\n## Example\n\n```javascript\nconst o = { a: 1, b: undefined };\nconsole.log(JSON.stringify(o));\n```\n\n## Output\n\n```\n{\"a\":1}\n```\n\n## Practice\n\nWhat does `JSON.stringify({ x: undefined, y: null })` produce? Why?",
    "Let's make a deep clone with JSON.\n\n**JSON.parse(JSON.stringify(obj))** creates a **full copy** of an object: serialize to a string, then parse back. The result has no shared references with the original — change the clone, the original is unchanged. Limits: no functions or undefined (they're lost); special objects (e.g. Date) become plain objects. Use it for **data-only** objects when you need a full copy.\n\n## Example\n\n```javascript\nconst orig = { a: 1, b: { c: 2 } };\nconst clone = JSON.parse(JSON.stringify(orig));\nclone.b.c = 99;\nconsole.log(orig.b.c);\n```\n\n## Output\n\n```\n2\n```\n\n## Practice\n\nIn the example, why does orig.b.c still show 2 after we changed clone.b.c to 99?",
    "Let's distinguish JSON string from JavaScript object.\n\n**JSON** is **text** (a string). A **JavaScript object** is a value in memory. You convert between them: **stringify** turns an object into a JSON string; **parse** turns a JSON string into an object. APIs usually return JSON strings; you **parse** them before you can use `.property` or `[key]` in code.\n\n## Example\n\n```javascript\nconst literal = { name: \"Ali\" };\nconst json = JSON.stringify(literal);   // string\nconst back = JSON.parse(json);\nconsole.log(typeof json, back.name);\n```\n\n## Output\n\n```\nstring Ali\n```\n\n## Practice\n\nIf an API gives you a JSON string, why can't you use .property on it directly? What do you do first?"
  ],
  "tasks": [
    {
      "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { name: \"Alice\", age: 25, city: \"Paris\" };\n// Convert the user object to a JSON string using JSON.stringify()\n// Print the JSON string\n// For the given user, your output should be:\n// {\"name\":\"Alice\",\"age\":25,\"city\":\"Paris\"}",
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
      "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}';\n// Parse the JSON string using JSON.parse()\n// Extract and print the product name and price on separate lines\n// For the given jsonStr, your output should be:\n// Laptop\n// 999",
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
      "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]';\n// Parse the JSON string (array of objects)\n// Calculate and print the average age\n// Round to 2 decimal places\n// For the given jsonStr, average = (25 + 30 + 35) / 3 = 30.00\n// Your output should be: 30.00",
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
    }
  ]
};
