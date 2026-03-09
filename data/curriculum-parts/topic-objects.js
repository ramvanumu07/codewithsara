/** Topic: Objects (objects) */
export default {
  "id": "objects",
  "title": "Objects",
  "outcomes": [
    "Object Literals: Modeling Entities with Key-Value Pairs",
    "Dot Notation vs. Bracket Notation: Accessing Data",
    "Dynamic Keys: Accessing Properties with Variables",
    "Mutable State: Adding, Modifying, and Deleting Properties",
    "Data Hierarchy: Navigating Nested Objects",
    "Object Methods: Assigning Behavior to Data",
    "The this Keyword: An Introduction to Context",
    "Static Methods: Object.keys() and Object.values()",
    "Iteration: Traversing Objects with for...in",
    "Existence Checks: The \"in\" Operator and hasOwnProperty"
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
