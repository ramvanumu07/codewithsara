/** Topic: Objects (objects) */
export default {
  "id": "objects",
  "title": "Objects",
  "outcomes": [
    "What an Object Is: Key-Value Pairs for One Thing",
    "Reading and Writing Properties: Dot and Bracket Notation",
    "When the Key Is in a Variable: Use Bracket Notation",
    "Adding, Changing, and Deleting: Objects Are Mutable",
    "Nested Objects: Chaining Property Access",
    "Getting All Keys or Values: Object.keys() and Object.values()",
    "Looping Over an Object: for...in",
    "Checking If a Property Exists: in and hasOwnProperty"
  ],
  "outcome_messages": [
    "**When to use an object**\n\nWhen one \"thing\" has several related pieces of data (a person with name and age, a product with price and stock), use an **object**. You create one with curly braces `{}` and list **key: value** pairs separated by commas. Keys are names (identifiers don't need quotes); values can be numbers, strings, arrays, or other objects.\n\n**Syntax**\n\n```text\nconst name = { key1: value1, key2: value2 };\n```\n\n**Example**\n\n```javascript\nconst user = { name: \"Alice\", age: 25 };\nconsole.log(user);    // { name: 'Alice', age: 25 }\n```\n\nOne value holding multiple named slots.\n\n**Practice**\n\nWrite an object literal for a book: `title` is \"JS Basics\" and `author` is \"Sara\". What does `book.title` evaluate to?",
    "**Accessing properties**\n\n**Dot notation:** `obj.key` — use when the key is a valid identifier and you know it when writing code. **Bracket notation:** `obj[\"key\"]` — use when the key has spaces, is a number, or you need an expression. Both read and write the same property; `obj.name` and `obj[\"name\"]` are the same.\n\n**Example**\n\n```javascript\nconst p = { name: \"Bob\", \"favorite color\": \"blue\" };\nconsole.log(p.name);              // Bob\nconsole.log(p[\"favorite color\"]); // blue\n```\n\n**Practice**\n\nIf `obj = { x: 1, y: 2 }`, what does `obj.x + obj[\"y\"]` evaluate to?",
    "**When the key is in a variable**\n\nYou **must** use **bracket notation**: `obj[key]`. Dot notation uses the literal name (`obj.key`), so it can't use a variable. Bracket notation evaluates the expression inside the brackets, so `obj[key]` uses the value of `key` as the property name. Use this when looping over keys or when the key comes from a variable.\n\n**Example**\n\n```javascript\nconst data = { a: 10, b: 20 };\nconst k = \"b\";\nconsole.log(data[k]);    // 20\n```\n\n**Practice**\n\nIf `obj = { name: \"Ali\", age: 30 }` and `key = \"name\"`, write one expression that gives the value of the property named by `key`.",
    "**Adding, changing, and deleting**\n\nObjects are **mutable**. Add: `obj.newKey = value`. Change: `obj.key = newValue`. Delete: `delete obj.key`. The same object is updated in place. You can add properties at any time.\n\n**Example**\n\n```javascript\nconst item = { name: \"Widget\" };\nitem.price = 99;\nitem.name = \"Super Widget\";\nconsole.log(item);    // { name: 'Super Widget', price: 99 }\n```\n\n**Practice**\n\nIf `o = { a: 1, b: 2 }`, what does `o` look like after `o.c = 3` and `delete o.b`?",
    "**Nested objects**\n\nA property's value can be another object. **Chain** dot or bracket notation: `obj.level1.level2` or `obj[\"level1\"][\"level2\"]`. Each step gives you the value at that key; if it's an object, you can access its keys next. If a level is missing, you get `undefined`.\n\n**Example**\n\n```javascript\nconst config = { db: { host: \"localhost\", port: 5432 } };\nconsole.log(config.db.port);    // 5432\n```\n\n**Practice**\n\nIf `obj = { user: { name: \"Ali\", settings: { theme: \"dark\" } } }`, write an expression that gives `\"dark\"`.",
    "**Getting all keys or values**\n\n**Object.keys(obj)** returns an array of the object's own property names (strings). **Object.values(obj)** returns an array of the corresponding values. Use them when you need to loop over an object or pass its keys or values to code that expects arrays.\n\n**Example**\n\n```javascript\nconst o = { a: 1, b: 2, c: 3 };\nconsole.log(Object.keys(o));    // [ 'a', 'b', 'c' ]\nconsole.log(Object.values(o));  // [ 1, 2, 3 ]\n```\n\n**Practice**\n\nIf `obj = { x: 10, y: 20 }`, what does `Object.keys(obj).length` evaluate to?",
    "**Looping over an object**\n\n**for (const key in obj)** loops over the object's enumerable property names. Each time you get one key (a string); use **obj[key]** to get the value. For \"own\" properties only, use `Object.keys(obj)` and a regular for loop, or check `obj.hasOwnProperty(key)` inside the loop.\n\n**Example**\n\n```javascript\nconst animal = { type: \"dog\", age: 3 };\nfor (const k in animal) {\n  console.log(k, animal[k]);    // type dog, then age 3\n}\n```\n\n**Practice**\n\nIf `data = { a: 1, b: 2 }`, write a for...in loop that prints each key and value as \"key: value\" on one line.",
    "**Checking if a property exists**\n\n**\"key\" in obj** is true if the object has that property (own or inherited). **obj.hasOwnProperty(\"key\")** is true only if the property exists on the object itself. Use these before reading a property when you're not sure it exists.\n\n**Example**\n\n```javascript\nconst o = { a: 1 };\nconsole.log(\"a\" in o);    // true\nconsole.log(\"b\" in o);    // false\nconsole.log(o.hasOwnProperty(\"a\"));    // true\n```\n\n**Practice**\n\nIf `obj = { name: \"Ali\", email: \"ali@example.com\" }`, write one condition that is true only when `\"email\"` is an own property of `obj`."
  ],
  "tasks": [
    {
      "description": "// Do not rename person, use it as input for your program.\n// While testing we will change its value.\nconst person = { name: \"Alice\", age: 25, city: \"New York\" };\n\n// Print the name and age properties using dot notation\n// Each on a new line\n// For the given person object, your output should be:\n// Alice\n// 25",
      "solution_type": "script",
      "reference_solution": "const person = { name: \"Alice\", age: 25, city: \"New York\" };\nconsole.log(person.name);\nconsole.log(person.age);",
      "testCases": [
        {
          "input": {
            "person": {
              "name": "Alice",
              "age": 25,
              "city": "New York"
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
              "city": "Paris"
            }
          },
          "expectedOutput": "Charlie\n35"
        }
      ]
    },
    {
      "description": "// Do not rename car and key, use them as input for your program.\n// While testing we will change their values.\nconst car = { brand: \"Toyota\", model: \"Camry\", year: 2020 };\nconst key = \"model\";\n\n// Access the property using the variable key with bracket notation\n// Print the value\n// For car = { brand: \"Toyota\", model: \"Camry\", year: 2020 } and key = \"model\"\n// Your output should be: Camry",
      "solution_type": "script",
      "reference_solution": "const car = { brand: \"Toyota\", model: \"Camry\", year: 2020 };\nconst key = \"model\";\nconsole.log(car[key]);",
      "testCases": [
        {
          "input": {
            "car": {
              "brand": "Toyota",
              "model": "Camry",
              "year": 2020
            },
            "key": "model"
          },
          "expectedOutput": "Camry"
        },
        {
          "input": {
            "car": {
              "brand": "Honda",
              "model": "Civic",
              "year": 2019
            },
            "key": "brand"
          },
          "expectedOutput": "Honda"
        },
        {
          "input": {
            "car": {
              "brand": "Ford",
              "model": "Mustang",
              "year": 2021
            },
            "key": "year"
          },
          "expectedOutput": "2021"
        }
      ]
    },
    {
      "description": "// Do not rename product, use it as input for your program.\n// While testing we will change its value.\nconst product = { name: \"Laptop\", price: 999 };\n\n// Add a new property 'stock' with value 50\n// Then add a property 'category' with value \"Electronics\"\n// Print all values using Object.values(), each on a new line\n// Your output should be:\n// Laptop\n// 999\n// 50\n// Electronics",
      "solution_type": "script",
      "reference_solution": "const product = { name: \"Laptop\", price: 999 };\nproduct.stock = 50;\nproduct.category = \"Electronics\";\nconst vals = Object.values(product);\nfor (let i = 0; i < vals.length; i++) {\n  console.log(vals[i]);\n}",
      "testCases": [
        {
          "input": {
            "product": {
              "name": "Laptop",
              "price": 999
            }
          },
          "expectedOutput": "Laptop\n999\n50\nElectronics"
        },
        {
          "input": {
            "product": {
              "name": "Phone",
              "price": 599
            }
          },
          "expectedOutput": "Phone\n599\n50\nElectronics"
        }
      ]
    },
    {
      "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { username: \"john_doe\", email: \"john@example.com\", age: 28 };\n\n// Print all the keys of the object using Object.keys()\n// Each key on a new line\n// For the given user object, your output should be:\n// username\n// email\n// age",
      "solution_type": "script",
      "reference_solution": "const user = { username: \"john_doe\", email: \"john@example.com\", age: 28 };\nconst keys = Object.keys(user);\nfor (let i = 0; i < keys.length; i++) {\n  console.log(keys[i]);\n}",
      "testCases": [
        {
          "input": {
            "user": {
              "username": "john_doe",
              "email": "john@example.com",
              "age": 28
            }
          },
          "expectedOutput": "username\nemail\nage"
        },
        {
          "input": {
            "user": {
              "id": 1,
              "name": "Alice",
              "role": "admin"
            }
          },
          "expectedOutput": "id\nname\nrole"
        },
        {
          "input": {
            "user": {
              "firstName": "Bob",
              "lastName": "Smith"
            }
          },
          "expectedOutput": "firstName\nlastName"
        }
      ]
    },
    {
      "description": "// Do not rename company, use it as input for your program.\n// While testing we will change its value.\nconst company = {\n  name: \"TechCorp\",\n  location: { city: \"San Francisco\", country: \"USA\" },\n  employees: 500\n};\n\n// Access and print the city from the nested location object\n// For the given company object, your output should be: San Francisco",
      "solution_type": "script",
      "reference_solution": "const company = { name: \"TechCorp\", location: { city: \"San Francisco\", country: \"USA\" }, employees: 500 };\nconsole.log(company.location.city);",
      "testCases": [
        {
          "input": {
            "company": {
              "name": "TechCorp",
              "location": {
                "city": "San Francisco",
                "country": "USA"
              },
              "employees": 500
            }
          },
          "expectedOutput": "San Francisco"
        },
        {
          "input": {
            "company": {
              "name": "StartupInc",
              "location": {
                "city": "Austin",
                "country": "USA"
              },
              "employees": 50
            }
          },
          "expectedOutput": "Austin"
        },
        {
          "input": {
            "company": {
              "name": "GlobalCo",
              "location": {
                "city": "London",
                "country": "UK"
              },
              "employees": 1000
            }
          },
          "expectedOutput": "London"
        }
      ]
    },
    {
      "description": "// Do not rename obj and propertyName, use them as input for your program.\n// While testing we will change their values.\nconst obj = { name: \"Alice\", age: 30, city: \"Paris\" };\nconst propertyName = \"age\";\n\n// Check if the property exists in the object using the 'in' operator\n// Print: \"Found\" if it exists, otherwise print: \"Not found\"\n// For obj = { name: \"Alice\", age: 30, city: \"Paris\" } and propertyName = \"age\"\n// Your output should be: Found",
      "solution_type": "script",
      "reference_solution": "const obj = { name: \"Alice\", age: 30, city: \"Paris\" };\nconst propertyName = \"age\";\nif (propertyName in obj) {\n  console.log(\"Found\");\n} else {\n  console.log(\"Not found\");\n}",
      "testCases": [
        {
          "input": {
            "obj": {
              "name": "Alice",
              "age": 30,
              "city": "Paris"
            },
            "propertyName": "age"
          },
          "expectedOutput": "Found"
        },
        {
          "input": {
            "obj": {
              "name": "Alice",
              "age": 30,
              "city": "Paris"
            },
            "propertyName": "country"
          },
          "expectedOutput": "Not found"
        },
        {
          "input": {
            "obj": {
              "x": 10,
              "y": 20
            },
            "propertyName": "x"
          },
          "expectedOutput": "Found"
        },
        {
          "input": {
            "obj": {
              "x": 10,
              "y": 20
            },
            "propertyName": "z"
          },
          "expectedOutput": "Not found"
        }
      ]
    },
    {
      "description": "// Do not rename scores, use it as input for your program.\n// While testing we will change its value.\nconst scores = { math: 85, science: 90, english: 78, history: 88 };\n\n// Calculate the total sum of all scores using Object.values()\n// Print only the total\n// For the given scores object, your output should be: 341",
      "solution_type": "script",
      "reference_solution": "const scores = { math: 85, science: 90, english: 78, history: 88 };\nconst vals = Object.values(scores);\nlet sum = 0;\nfor (let i = 0; i < vals.length; i++) sum += vals[i];\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "scores": {
              "math": 85,
              "science": 90,
              "english": 78,
              "history": 88
            }
          },
          "expectedOutput": "341"
        },
        {
          "input": {
            "scores": {
              "test1": 100,
              "test2": 90,
              "test3": 95
            }
          },
          "expectedOutput": "285"
        },
        {
          "input": {
            "scores": {
              "quiz": 50
            }
          },
          "expectedOutput": "50"
        }
      ]
    },
    {
      "description": "// Do not rename inventory, use it as input for your program.\n// While testing we will change its value.\nconst inventory = { apples: 50, bananas: 30, oranges: 40 };\n\n// Use a for...in loop to print each item and its quantity\n// Format: \"item: quantity\"\n// For the given inventory, your output should be:\n// apples: 50\n// bananas: 30\n// oranges: 40",
      "solution_type": "script",
      "reference_solution": "const inventory = { apples: 50, bananas: 30, oranges: 40 };\nfor (const item in inventory) {\n  console.log(item + \": \" + inventory[item]);\n}",
      "testCases": [
        {
          "input": {
            "inventory": {
              "apples": 50,
              "bananas": 30,
              "oranges": 40
            }
          },
          "expectedOutput": "apples: 50\nbananas: 30\noranges: 40"
        },
        {
          "input": {
            "inventory": {
              "pens": 100,
              "pencils": 150
            }
          },
          "expectedOutput": "pens: 100\npencils: 150"
        },
        {
          "input": {
            "inventory": {
              "laptops": 10,
              "mice": 25,
              "keyboards": 20
            }
          },
          "expectedOutput": "laptops: 10\nmice: 25\nkeyboards: 20"
        }
      ]
    },
    {
      "description": "// Do not rename student, use it as input for your program.\n// While testing we will change its value.\nconst student = {\n  name: \"Emma\",\n  grades: { math: 92, science: 88, english: 85 },\n  age: 16\n};\n\n// Calculate the average grade from the nested grades object\n// Print the average rounded to 2 decimal places\n// For the given student, average = (92 + 88 + 85) / 3 = 88.33\n// Your output should be: 88.33",
      "solution_type": "script",
      "reference_solution": "const student = { name: \"Emma\", grades: { math: 92, science: 88, english: 85 }, age: 16 };\nconst grades = student.grades;\nconst vals = Object.values(grades);\nlet sum = 0;\nfor (let i = 0; i < vals.length; i++) sum += vals[i];\nconst avg = sum / vals.length;\nconsole.log(avg.toFixed(2));",
      "testCases": [
        {
          "input": {
            "student": {
              "name": "Emma",
              "grades": {
                "math": 92,
                "science": 88,
                "english": 85
              },
              "age": 16
            }
          },
          "expectedOutput": "88.33"
        },
        {
          "input": {
            "student": {
              "name": "John",
              "grades": {
                "math": 100,
                "science": 95,
                "english": 90
              },
              "age": 17
            }
          },
          "expectedOutput": "95.00"
        },
        {
          "input": {
            "student": {
              "name": "Sarah",
              "grades": {
                "math": 80,
                "science": 85
              },
              "age": 15
            }
          },
          "expectedOutput": "82.50"
        }
      ]
    },
    {
      "description": "// Do not rename settings, use it as input for your program.\n// While testing we will change its value.\nconst settings = { theme: \"dark\", notifications: true, language: \"en\", autoSave: false };\n\n// Count how many properties have boolean values (true or false)\n// Use typeof to check if value is 'boolean'\n// Print only the count\n// For the given settings, your output should be: 2",
      "solution_type": "script",
      "reference_solution": "const settings = { theme: \"dark\", notifications: true, language: \"en\", autoSave: false };\nconst vals = Object.values(settings);\nlet count = 0;\nfor (let i = 0; i < vals.length; i++) {\n  if (typeof vals[i] === 'boolean') count++;\n}\nconsole.log(count);",
      "testCases": [
        {
          "input": {
            "settings": {
              "theme": "dark",
              "notifications": true,
              "language": "en",
              "autoSave": false
            }
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "settings": {
              "a": true,
              "b": false,
              "c": true,
              "d": 5
            }
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "settings": {
              "x": "test",
              "y": 10,
              "z": "hello"
            }
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "settings": {
              "enabled": true
            }
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "// Do not rename book, use it as input for your program.\n// While testing we will change its value.\nconst book = { title: \"1984\", author: \"George Orwell\", pages: 328, published: 1949 };\n\n// Create a new object with only the title and author properties\n// Print the new object's values using Object.values(), each on a new line\n// For the given book, your output should be:\n// 1984\n// George Orwell",
      "solution_type": "script",
      "reference_solution": "const book = { title: \"1984\", author: \"George Orwell\", pages: 328, published: 1949 };\nconst summary = { title: book.title, author: book.author };\nconst vals = Object.values(summary);\nfor (let i = 0; i < vals.length; i++) console.log(vals[i]);",
      "testCases": [
        {
          "input": {
            "book": {
              "title": "1984",
              "author": "George Orwell",
              "pages": 328,
              "published": 1949
            }
          },
          "expectedOutput": "1984\nGeorge Orwell"
        },
        {
          "input": {
            "book": {
              "title": "The Hobbit",
              "author": "J.R.R. Tolkien",
              "pages": 310,
              "published": 1937
            }
          },
          "expectedOutput": "The Hobbit\nJ.R.R. Tolkien"
        }
      ]
    },
    {
      "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = { a: 10, b: 20, c: 30, d: 40, e: 50 };\n\n// Print all keys whose values are greater than 25\n// Each key on a new line\n// For the given data, your output should be:\n// c\n// d\n// e",
      "solution_type": "script",
      "reference_solution": "const data = { a: 10, b: 20, c: 30, d: 40, e: 50 };\nfor (const key in data) {\n  if (data[key] > 25) console.log(key);\n}",
      "testCases": [
        {
          "input": {
            "data": {
              "a": 10,
              "b": 20,
              "c": 30,
              "d": 40,
              "e": 50
            }
          },
          "expectedOutput": "c\nd\ne"
        },
        {
          "input": {
            "data": {
              "x": 100,
              "y": 15,
              "z": 30
            }
          },
          "expectedOutput": "x\nz"
        },
        {
          "input": {
            "data": {
              "m": 5,
              "n": 10,
              "o": 15
            }
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "data": {
              "p": 26,
              "q": 27,
              "r": 25
            }
          },
          "expectedOutput": "p\nq"
        }
      ]
    }
  ]
};
