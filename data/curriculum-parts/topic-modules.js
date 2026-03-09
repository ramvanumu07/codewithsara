/** Topic: Organizing code with modules (modules) */
export default {
  "id": "modules",
  "title": "Organizing code with modules",
  "outcomes": [
    "Module Fundamentals: Encapsulation and Code Separation",
    "Named Exports: Sharing Multiple Values per File",
    "Default Exports: Defining the Primary Module Export",
    "Import Logic: Named vs. Default Syntax",
    "Alias Management: Renaming Imports to avoid Conflicts",
    "Namespace Imports: Importing Everything as a Single Object (* as)",
    "Module Scope: Why variables stay private by default",
    "Modern Patterns: Dynamic Imports for Performance"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that simulates module export and import.\n  Create a function named greet that takes a name parameter and returns \"Hello, {name}!\".\n  Simulate the module export/import pattern.\n  Examples:\n    simulateModuleGreet(\"Alice\") => \"Hello, Alice!\"\n    simulateModuleGreet(\"Bob\") => \"Hello, Bob!\"\n    simulateModuleGreet(\"Charlie\") => \"Hello, Charlie!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateModuleGreet(name) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateModuleGreet",
      "reference_solution": "function simulateModuleGreet(name) {\n  return 'Hello, ' + name + '!';\n}",
      "testCases": [
        {
          "input": {
            "name": "Alice"
          },
          "expectedOutput": "Hello, Alice!"
        },
        {
          "input": {
            "name": "Bob"
          },
          "expectedOutput": "Hello, Bob!"
        },
        {
          "input": {
            "name": "Charlie"
          },
          "expectedOutput": "Hello, Charlie!"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates multiple named exports.\n  Create functions add(a, b) and subtract(a, b).\n  Simulate the named export/import pattern and call the specified function.\n  Examples:\n    simulateNamedExports(\"add\", 10, 5) => 15\n    simulateNamedExports(\"subtract\", 10, 5) => 5\n    simulateNamedExports(\"add\", 20, 30) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateNamedExports(functionName, a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateNamedExports",
      "reference_solution": "function simulateNamedExports(functionName, a, b) {\n  const add = (x, y) => x + y;\n  const subtract = (x, y) => x - y;\n  return functionName === 'add' ? add(a, b) : subtract(a, b);\n}",
      "testCases": [
        {
          "input": {
            "functionName": "add",
            "a": 10,
            "b": 5
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "functionName": "subtract",
            "a": 10,
            "b": 5
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "functionName": "add",
            "a": 20,
            "b": 30
          },
          "expectedOutput": "50"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates default export.\n  Create a function multiply(a, b) that returns a * b.\n  Simulate the default export/import pattern.\n  Examples:\n    simulateDefaultExport(6, 7) => 42\n    simulateDefaultExport(8, 9) => 72\n    simulateDefaultExport(5, 10) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateDefaultExport(a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateDefaultExport",
      "reference_solution": "function simulateDefaultExport(a, b) {\n  return a * b;\n}",
      "testCases": [
        {
          "input": {
            "a": 6,
            "b": 7
          },
          "expectedOutput": "42"
        },
        {
          "input": {
            "a": 5,
            "b": 5
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "a": 10,
            "b": 3
          },
          "expectedOutput": "30"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates aliased imports.\n  Create a constant PI = 3.14159 and simulate import with alias.\n  Calculate the area of circle with given radius using the aliased pi.\n  Examples:\n    simulateAliasedImport(5) => 78.53975\n    simulateAliasedImport(10) => 314.159\n    simulateAliasedImport(2) => 12.56636\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAliasedImport(radius) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateAliasedImport",
      "reference_solution": "function simulateAliasedImport(radius) {\n  const PI = 3.14159;\n  return radius * radius * PI;\n}",
      "testCases": [
        {
          "input": {
            "radius": 5
          },
          "expectedOutput": "78.53975"
        },
        {
          "input": {
            "radius": 10
          },
          "expectedOutput": "314.159"
        },
        {
          "input": {
            "radius": 2
          },
          "expectedOutput": "12.56636"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates namespace imports.\n  Create math constants E = 2.71828, PHI = 1.61803, SQRT2 = 1.41421.\n  Simulate namespace import and access the specified constant.\n  Examples:\n    simulateNamespaceImport(\"E\") => 2.71828\n    simulateNamespaceImport(\"PHI\") => 1.61803\n    simulateNamespaceImport(\"SQRT2\") => 1.41421\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateNamespaceImport(constant) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateNamespaceImport",
      "reference_solution": "function simulateNamespaceImport(constant) {\n  const math = { E: 2.71828, PHI: 1.61803, SQRT2: 1.41421 };\n  return math[constant];\n}",
      "testCases": [
        {
          "input": {
            "constant": "E"
          },
          "expectedOutput": "2.71828"
        },
        {
          "input": {
            "constant": "PHI"
          },
          "expectedOutput": "1.61803"
        },
        {
          "input": {
            "constant": "SQRT2"
          },
          "expectedOutput": "1.41421"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates class default export.\n  Create a class Calculator with methods add(a, b) and multiply(a, b).\n  Simulate default export/import and call the specified method.\n  Examples:\n    simulateClassDefaultExport(\"add\", 8, 2) => 10\n    simulateClassDefaultExport(\"multiply\", 8, 2) => 16\n    simulateClassDefaultExport(\"add\", 15, 5) => 20\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateClassDefaultExport(method, a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateClassDefaultExport",
      "reference_solution": "function simulateClassDefaultExport(method, a, b) {\n  class Calculator { add(x, y) { return x + y; } multiply(x, y) { return x * y; } }\n  const calc = new Calculator();\n  return calc[method](a, b);\n}",
      "testCases": [
        {
          "input": {
            "method": "add",
            "a": 8,
            "b": 2
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "method": "multiply",
            "a": 8,
            "b": 2
          },
          "expectedOutput": "16"
        },
        {
          "input": {
            "method": "add",
            "a": 15,
            "b": 5
          },
          "expectedOutput": "20"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates mixed exports.\n  Create functions divide(a, b) as default and modulo(a, b) as named export.\n  Simulate mixed import and call the specified function.\n  Examples:\n    simulateMixedExports(\"divide\", 20, 4) => 5\n    simulateMixedExports(\"modulo\", 20, 6) => 2\n    simulateMixedExports(\"divide\", 100, 10) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateMixedExports(functionName, a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateMixedExports",
      "reference_solution": "function simulateMixedExports(functionName, a, b) {\n  const divide = (x, y) => x / y;\n  const modulo = (x, y) => x % y;\n  return functionName === 'divide' ? divide(a, b) : modulo(a, b);\n}",
      "testCases": [
        {
          "input": {
            "functionName": "divide",
            "a": 20,
            "b": 4
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "functionName": "modulo",
            "a": 20,
            "b": 6
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "functionName": "divide",
            "a": 100,
            "b": 10
          },
          "expectedOutput": "10"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates module with private state.\n  Create a module that has a private variable count = 0.\n  Export functions increment() and getCount().\n  Simulate the operations and return the final result.\n  Examples:\n    simulateModuleWithState([\"increment\", \"increment\", \"getCount\"]) => 2\n    simulateModuleWithState([\"increment\", \"getCount\"]) => 1\n    simulateModuleWithState([\"increment\", \"increment\", \"increment\", \"getCount\"]) => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateModuleWithState(operations) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateModuleWithState",
      "reference_solution": "function simulateModuleWithState(operations) {\n  let count = 0;\n  operations.forEach(op => { if (op === 'increment') count++; });\n  return operations.includes('getCount') ? count : count;\n}",
      "testCases": [
        {
          "input": {
            "operations": [
              "increment",
              "increment",
              "getCount"
            ]
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "operations": [
              "increment",
              "getCount"
            ]
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "operations": [
              "increment",
              "increment",
              "increment",
              "getCount"
            ]
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates selective named imports.\n  Create functions square(n) and cube(n).\n  Simulate selective import and call the specified function.\n  Examples:\n    simulateSelectiveImport(\"square\", 5) => 25\n    simulateSelectiveImport(\"cube\", 3) => 27\n    simulateSelectiveImport(\"square\", 10) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSelectiveImport(functionName, n) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateSelectiveImport",
      "reference_solution": "function simulateSelectiveImport(functionName, n) {\n  const square = x => x * x;\n  const cube = x => x * x * x;\n  return functionName === 'square' ? square(n) : cube(n);\n}",
      "testCases": [
        {
          "input": {
            "functionName": "square",
            "n": 5
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "functionName": "cube",
            "n": 3
          },
          "expectedOutput": "27"
        },
        {
          "input": {
            "functionName": "square",
            "n": 10
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that simulates default object export.\n  Create an object { name: \"John\", age: 30, city: \"NYC\" } as default export.\n  Simulate import and access the specified property.\n  Examples:\n    simulateDefaultObjectExport(\"name\") => \"John\"\n    simulateDefaultObjectExport(\"age\") => 30\n    simulateDefaultObjectExport(\"city\") => \"NYC\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateDefaultObjectExport(property) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "simulateDefaultObjectExport",
      "reference_solution": "function simulateDefaultObjectExport(property) {\n  const obj = { name: 'John', age: 30, city: 'NYC' };\n  return obj[property];\n}",
      "testCases": [
        {
          "input": {
            "property": "name"
          },
          "expectedOutput": "John"
        },
        {
          "input": {
            "property": "age"
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "property": "city"
          },
          "expectedOutput": "NYC"
        }
      ]
    }
  ]
};
