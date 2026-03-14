/** Topic: Organizing code with modules (modules) */
export default {
  "id": "modules",
  "title": "Organizing code with modules",
  "outcomes": [
    "What a Module Is",
    "Named Exports and Imports",
    "Default Export and Import",
    "Import Aliases (as)",
    "Namespace Import (* as)",
    "Module Scope",
    "Dynamic import()"
  ],
  "outcome_messages": [
    "Let's understand what a module is.\n\nA **module** is a **file** that **exports** some values (functions, classes, constants) and keeps the rest **private**. Each file has its **own scope**—top-level variables are **not** global; they're **module-scoped**. Other files use **import** to get only what the module exports. That gives you encapsulation (hide implementation) and clear dependencies (you see what each file uses). To use something from another file, that file must **export** it and you must **import** it.\n\n## Example\n\n```javascript\n// In utils.js:\nexport function add(a, b) { return a + b; }\n\n// In main.js:\nimport { add } from './utils.js';\nconsole.log(add(2, 3));\n```\n\n## Output\n\n```\n5\n```\n\n## What happens\n\n- utils.js exports add; anything else in utils.js stays private.\n- main.js imports only add and calls it. Dependencies are explicit.\n\n## Practice\n\nWhy don't top-level variables in a module pollute the global object? What do you have to do to use them in another file?",
    "Let's use named exports and imports.\n\n**Named exports**: export each value with a name—**export function f() { }** or **export const x = 1;** or **export { a, b };** at the end. A file can have **many** named exports. **Import** with **import { a, b } from './m.js';**—names must **match** the exported names. Use named exports when a module provides several distinct things. Only what you export is visible to other files.\n\n## Example\n\n```javascript\n// math.js\nexport function add(a, b) { return a + b; }\nexport function sub(a, b) { return a - b; }\n\n// app.js\nimport { add, sub } from './math.js';\nconsole.log(add(5, 3), sub(5, 3));\n```\n\n## Output\n\n```\n8 2\n```\n\n## What happens\n\n- math.js exports add and sub. app.js imports both by name and calls them.\n- If the module had export { foo }, you would use import { foo } from './m.js'.\n\n## Practice\n\nYou have a file that exports max and min. Write the import line to bring both into another file (path './utils.js'). If a module does export { foo }; what import do you use?",
    "Let's use default export and import.\n\n**Default export**: **export default value;** — there can be **only one** per file (a function, class, object, etc.). **Import** with **import name from './m.js';** — the **name** is chosen by you, not by the module. Use default export when the module has **one main thing**. You can mix: export default X; export { a, b }; then **import def, { a, b } from './m.js';** (default first, no braces; named in braces).\n\n## Example\n\n```javascript\n// logger.js\nexport default function log(msg) { console.log(msg); }\n\n// app.js\nimport log from './logger.js';\nlog('hi');\n```\n\n## Output\n\n```\nhi\n```\n\n## What happens\n\n- logger.js has one default export (the function). We import it with the name log.\n- If it were export default foo;, you could write import anything from './m.js'; and use anything.\n\n## Practice\n\nA module has export default class Config { }. How do you import it? Can you use a different name than Config? If a module does export default foo; what import do you use?",
    "Let's rename imports with aliases (as).\n\nUse **as** to **rename** an import: **import { foo as bar } from './m.js';** — then you use **bar** in your file. Useful when **two modules** export the same name and you need both, or when you want a **shorter or clearer** local name. Default imports already let you pick the name; for **named** exports, **as** is how you rename.\n\n## Example\n\n```javascript\n// Two modules both export 'add':\nimport { add as addNumbers } from './math.js';\nimport { add as concat } from './strings.js';\nconsole.log(addNumbers(1, 2), concat('a', 'b'));\n```\n\n## Output\n\n```\n3 ab\n```\n\n## What happens\n\n- math.js exports add (numbers); strings.js exports add (concat). We alias them so we can use both in the same file without a name clash.\n\n## Practice\n\nYou need getData from both './api.js' and './cache.js'. How do you import both and use them in the same file? Write the import lines.",
    "Let's use namespace import (* as).\n\n**import * as ns from './m.js';** puts **all named exports** from m.js onto the object **ns**. You access them as **ns.foo**, **ns.bar**, etc. The default export (if any) is at **ns.default**. Use **\*** when you want **one namespace object** so you don't add many names to the current scope—e.g. import * as utils from './utils.js'; then utils.func().\n\n## Example\n\n```javascript\nimport * as MathUtils from './math.js';\nconsole.log(MathUtils.add(2, 3));\nconsole.log(MathUtils.sub(5, 2));\n```\n\n## Output\n\n```\n5\n3\n```\n\n## What happens\n\n- All named exports from math.js are on MathUtils. We call them as MathUtils.add and MathUtils.sub.\n- If module.js exports foo and bar, after import * as M from './module.js' you use M.foo and M.bar.\n\n## Practice\n\nIf you do import * as M from './module.js' and module.js exports foo and bar, how do you access them in your file?",
    "Let's understand module scope.\n\nIn a module, **top-level** declarations (const, let, function, class) are in the **module's scope**, not the global scope. So **variables in one file are not visible in another** unless they are **exported**. That's \"private by default\"—you explicitly export what you want to share. It avoids accidental globals and makes dependencies clear: if you don't import it, you don't have it.\n\n## Example\n\n```javascript\n// secret.js\nconst key = 'abc123';\nexport function getKey() { return key; }\n\n// other file: import { getKey } from './secret.js';\n// getKey() returns 'abc123'; key is not accessible directly.\n```\n\n## What happens\n\n- key is module-scoped; it is not exported. Other files cannot read key.\n- Only getKey is exported; other files get the value only through getKey().\n\n## Practice\n\nYou have a variable counter in a module that you don't export. Can another file access counter? How do you expose it if you want controlled access?",
    "Let's load modules on demand with dynamic import().\n\n**import('./m.js')** returns a **Promise** that resolves to the **module's namespace object** (with default at .default and named exports as properties). Use it when you want to **load a module only when needed**—e.g. after a user action or when a condition is true. That can reduce initial load time. Use **await import('./m.js')** inside an async function, or .then() on the promise. **Static** import (at top of file) always loads before the script runs; **dynamic** import loads when the call runs.\n\n## Example\n\n```javascript\nasync function loadFeature() {\n  const mod = await import('./feature.js');\n  return mod.helper();\n}\n```\n\n## Output\n\n```\n(Loads feature.js when loadFeature() runs; returns whatever mod.helper() returns.)\n```\n\n## What happens\n\n- feature.js is loaded only when loadFeature() is called. The result mod has the module's exports; mod.default is the default export, mod.helper would be a named export.\n- Use dynamic import for code-splitting or lazy loading.\n\n## Practice\n\nWhat does import('./m.js') return? How do you get the default export from that result? When would you use dynamic import instead of static import at the top of the file?"
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
