/** Topic: Functions remembering their scope (closures) */
export default {
  id: 'closures',
  title: 'Functions remembering their scope',
  outcomes: [
    'What a Closure Is',
    'A Function That Returns a Function',
    'Variables That Stay "Private"',
    'Keeping State Between Calls',
    'Closures in a Loop: Use let'
  ],
  outcome_messages: [
    "Let's understand what a closure is.\n\nA **closure** is when a function **remembers** the variables from the place it was created—even after that outer place has finished running. In JavaScript, if you define a function inside another function and return it, the returned function still has access to the outer function's variables. That \"remembering\" is the closure.\n\n## Example\n\n```javascript\nfunction makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(3));\n```\n\n## Output\n\n```\n8\n```\n\n## What happens\n\n- makeAdder(5) runs and returns a function. That inner function remembers **x is 5**.\n- add5(3) calls that function with y = 3. It uses the remembered x (5) and returns 5 + 3 = 8.\n\n## Practice\n\nIn the example, why does add5(3) return 8?",
    "Let's see a function that returns a function.\n\nYou can write a function that **returns another function**. The returned function is created inside the first one, so it remembers the first function's parameters. Each time you call the outer function with different arguments, you get a different inner function, each with its own \"remembered\" values.\n\n## Example\n\n```javascript\nfunction createMultiplier(m) {\n  return function(n) {\n    return n * m;\n  };\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```\n\n## Output\n\n```\n10 15\n```\n\n## What happens\n\n- createMultiplier(2) returns a function that remembers **m = 2**. We call it double.\n- createMultiplier(3) returns a function that remembers **m = 3**. We call it triple.\n- double(5) is 5 * 2 = 10. triple(5) is 5 * 3 = 15.\n\n## Practice\n\nIn the example, why does double(5) give 10 and triple(5) give 15?",
    "Let's keep variables private with closures.\n\nVariables declared inside a function are not visible from outside. If you **return** an object (or function) that uses those variables, only that object can read or change them. So the variable is effectively hidden—you expose only the behavior you want (e.g. getSecret, setSecret), not the variable itself.\n\n## Example\n\n```javascript\nfunction secretKeeper(secret) {\n  return {\n    getSecret: function() {\n      return secret;\n    },\n    setSecret: function(s) {\n      secret = s;\n    }\n  };\n}\nconst k = secretKeeper(\"pass\");\nconsole.log(k.getSecret());\n```\n\n## Output\n\n```\npass\n```\n\n## What happens\n\n- secretKeeper(\"pass\") runs. The variable secret is inside the function, not on the returned object.\n- k.getSecret() runs the inner function, which still has access to secret, so it returns \"pass\".\n\n## Practice\n\nIn the example, why can't we access secret from outside?",
    "Let's keep state between calls.\n\nYou can keep a variable inside the outer function and return an object whose methods **read and update** that variable. Because the variable lives in the closure, it is not reset when you call the methods—it persists. So you get something like a counter: each call to increment() changes the same count, and getValue() reads it.\n\n## Example\n\n```javascript\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: function() {\n      count++;\n    },\n    getValue: function() {\n      return count;\n    }\n  };\n}\nconst c = createCounter();\nc.increment();\nc.increment();\nconsole.log(c.getValue());\n```\n\n## Output\n\n```\n2\n```\n\n## What happens\n\n- createCounter() runs. count is 0 and stays in the closure.\n- c.increment() runs twice, so count becomes 1 then 2.\n- c.getValue() returns the current count, which is 2.\n\n## Practice\n\nIn the example, why does count still show 2 when we call getValue() instead of going back to 0?",
    "Let's use let for closures in a loop.\n\nIf you create a function inside a loop and that function uses the loop variable, it \"closes over\" that variable. With **var**, there is only one variable for the whole loop, so by the time the function runs, the loop may have finished and the variable has its final value for all of them. With **let**, each iteration has its own variable, so each function remembers the right value.\n\n## Example\n\n```javascript\nconst fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(function() {\n    return i;\n  });\n}\nconsole.log(fns[0](), fns[1](), fns[2]());\n```\n\n## Output\n\n```\n0 1 2\n```\n\n## What happens\n\n- With **let i**, each time through the loop we have a different i (0, 1, 2). Each function we push remembers its own i.\n- So fns[0]() returns 0, fns[1]() returns 1, fns[2]() returns 2.\n- If we had used **var i**, all three would return 3, because they would share one variable that ends at 3.\n\n## Practice\n\nIn the example, why do we use let instead of var for the loop variable i?"
  ],
  tasks: [
    {
      description:
        '/*\n  createGreeting(prefix) returns a function.\n  That inner function takes a name and returns prefix + name (no extra spaces).\n  Example: createGreeting("Hi, ")("Ann") => "Hi, Ann"\n*/\n\nfunction createGreeting(prefix) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createGreeting',
      reference_solution:
        'function createGreeting(prefix) {\n  return function (name) {\n    return prefix + name;\n  };\n}',
      testCases: [
        { input: { prefix: 'Hello, ' }, thenCallArgs: ['Alice'], expectedOutput: 'Hello, Alice' },
        { input: { prefix: 'Hi ' }, thenCallArgs: ['Bob'], expectedOutput: 'Hi Bob' },
        { input: { prefix: '' }, thenCallArgs: ['X'], expectedOutput: 'X' }
      ]
    },
    {
      description:
        '/*\n  createMultiplier(m) returns a function that multiplies its argument by m.\n  Example: createMultiplier(3)(4) => 12\n*/\n\nfunction createMultiplier(m) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createMultiplier',
      reference_solution:
        'function createMultiplier(m) {\n  return function (n) {\n    return n * m;\n  };\n}',
      testCases: [
        { input: { m: 2 }, thenCallArgs: [5], expectedOutput: '10' },
        { input: { m: 7 }, thenCallArgs: [3], expectedOutput: '21' },
        { input: { m: 0 }, thenCallArgs: [100], expectedOutput: '0' },
        { input: { m: -2 }, thenCallArgs: [4], expectedOutput: '-8' }
      ]
    },
    {
      description:
        '/*\n  createAdder(x) returns a function that adds x to its argument.\n  Example: createAdder(10)(5) => 15\n*/\n\nfunction createAdder(x) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createAdder',
      reference_solution:
        'function createAdder(x) {\n  return function (n) {\n    return n + x;\n  };\n}',
      testCases: [
        { input: { x: 100 }, thenCallArgs: [25], expectedOutput: '125' },
        { input: { x: -3 }, thenCallArgs: [10], expectedOutput: '7' },
        { input: { x: 0 }, thenCallArgs: [42], expectedOutput: '42' }
      ]
    },
    {
      description:
        '/*\n  createLogger(prefix) returns a function(message) that returns prefix + ": " + message\n  Example: createLogger("INFO")("ok") => "INFO: ok"\n*/\n\nfunction createLogger(prefix) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createLogger',
      reference_solution:
        'function createLogger(prefix) {\n  return function (message) {\n    return prefix + ": " + message;\n  };\n}',
      testCases: [
        { input: { prefix: 'WARN' }, thenCallArgs: ['disk full'], expectedOutput: 'WARN: disk full' },
        { input: { prefix: 'DBG' }, thenCallArgs: ['x'], expectedOutput: 'DBG: x' }
      ]
    },
    {
      description:
        '/*\n  createTemperatureConverter(unit) returns a function.\n  If unit is "C", input is Celsius → return Fahrenheit: (c * 9/5) + 32\n  If unit is "F", input is Fahrenheit → return Celsius: (f - 32) * 5/9\n*/\n\nfunction createTemperatureConverter(unit) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createTemperatureConverter',
      reference_solution:
        'function createTemperatureConverter(unit) {\n  if (unit === "C") {\n    return function (c) {\n      return (c * 9) / 5 + 32;\n    };\n  }\n  return function (f) {\n    return ((f - 32) * 5) / 9;\n  };\n}',
      testCases: [
        { input: { unit: 'C' }, thenCallArgs: [0], expectedOutput: '32' },
        { input: { unit: 'C' }, thenCallArgs: [100], expectedOutput: '212' },
        { input: { unit: 'F' }, thenCallArgs: [32], expectedOutput: '0' },
        { input: { unit: 'F' }, thenCallArgs: [212], expectedOutput: '100' }
      ]
    },
    {
      description:
        '/*\n  createCounter() returns { increment, getValue }.\n  count starts at 0. increment() adds 1. getValue() returns current count.\n*/\n\nfunction createCounter() {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createCounter',
      reference_solution:
        'function createCounter() {\n  let count = 0;\n  return {\n    increment: function () {\n      count++;\n    },\n    getValue: function () {\n      return count;\n    }\n  };\n}',
      testCases: [
        {
          input: {},
          thenInvoke: [{ method: 'getValue', args: [] }],
          expectedOutput: '0'
        },
        {
          input: {},
          thenInvoke: [
            { method: 'increment', args: [] },
            { method: 'increment', args: [] },
            { method: 'increment', args: [] },
            { method: 'getValue', args: [] }
          ],
          expectedOutput: '3'
        }
      ]
    },
    {
      description:
        '/*\n  secretKeeper(initial) returns { getSecret, setSecret }.\n  getSecret returns current secret. setSecret(s) updates it.\n*/\n\nfunction secretKeeper(initial) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'secretKeeper',
      reference_solution:
        'function secretKeeper(initial) {\n  let secret = initial;\n  return {\n    getSecret: function () {\n      return secret;\n    },\n    setSecret: function (s) {\n      secret = s;\n    }\n  };\n}',
      testCases: [
        {
          input: { initial: 'alpha' },
          thenInvoke: [{ method: 'getSecret', args: [] }],
          expectedOutput: 'alpha'
        },
        {
          input: { initial: 'old' },
          thenInvoke: [
            { method: 'setSecret', args: ['new'] },
            { method: 'getSecret', args: [] }
          ],
          expectedOutput: 'new'
        }
      ]
    },
    {
      description:
        '/*\n  createBankAccount(balance) returns { deposit(n), withdraw(n), getBalance() }.\n  Balance must not go negative on withdraw — if withdraw would make balance < 0, do not change balance.\n*/\n\nfunction createBankAccount(balance) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createBankAccount',
      reference_solution:
        'function createBankAccount(balance) {\n  let b = balance;\n  return {\n    deposit: function (n) {\n      b += n;\n    },\n    withdraw: function (n) {\n      if (b >= n) b -= n;\n    },\n    getBalance: function () {\n      return b;\n    }\n  };\n}',
      testCases: [
        {
          input: { balance: 100 },
          thenInvoke: [
            { method: 'deposit', args: [50] },
            { method: 'withdraw', args: [30] },
            { method: 'getBalance', args: [] }
          ],
          expectedOutput: '120'
        },
        {
          input: { balance: 20 },
          thenInvoke: [
            { method: 'withdraw', args: [100] },
            { method: 'getBalance', args: [] }
          ],
          expectedOutput: '20'
        },
        {
          input: { balance: 10 },
          thenInvoke: [
            { method: 'withdraw', args: [10] },
            { method: 'getBalance', args: [] }
          ],
          expectedOutput: '0'
        }
      ]
    },
    {
      description:
        '/*\n  createLimitedCounter(max) returns { increment, getValue }.\n  count starts at 0. increment() increases count only while count < max (then it stops).\n*/\n\nfunction createLimitedCounter(max) {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createLimitedCounter',
      reference_solution:
        'function createLimitedCounter(max) {\n  let count = 0;\n  return {\n    increment: function () {\n      if (count < max) count++;\n    },\n    getValue: function () {\n      return count;\n    }\n  };\n}',
      testCases: [
        {
          input: { max: 2 },
          thenInvoke: [
            { method: 'increment', args: [] },
            { method: 'increment', args: [] },
            { method: 'increment', args: [] },
            { method: 'increment', args: [] },
            { method: 'getValue', args: [] }
          ],
          expectedOutput: '2'
        },
        {
          input: { max: 5 },
          thenInvoke: [{ method: 'getValue', args: [] }],
          expectedOutput: '0'
        }
      ]
    },
    {
      description:
        '/*\n  createIdGenerator() returns a function with no arguments.\n  Each call returns the next integer: 1, 2, 3, ...\n*/\n\nfunction createIdGenerator() {\n  // Implementation here\n}',
      solution_type: 'function',
      function_name: 'createIdGenerator',
      reference_solution:
        'function createIdGenerator() {\n  let id = 0;\n  return function () {\n    id++;\n    return id;\n  };\n}',
      testCases: [
        {
          input: {},
          repeatCalls: [[], [], [], [], []],
          expectedOutput: '1\n2\n3\n4\n5'
        },
        {
          input: {},
          repeatCalls: [[], []],
          expectedOutput: '1\n2'
        }
      ]
    },
    {
      description:
        '// Implement once(fn): returns a function that runs fn only the first time it is called.\n// Later calls return the same value as the first call without running fn again.\n// The harness below must print 1, then 1, then 1 (only one real execution of the inner function).\n\nfunction once(fn) {\n  // Implementation here\n}\n\nlet runs = 0;\nconst w = once(function () {\n  runs++;\n  return runs;\n});\nconsole.log(w());\nconsole.log(w());\nconsole.log(runs);',
      solution_type: 'script',
      reference_solution:
        'function once(fn) {\n  let done = false;\n  let val;\n  return function () {\n    if (!done) {\n      val = fn.apply(this, arguments);\n      done = true;\n    }\n    return val;\n  };\n}\n\nlet runs = 0;\nconst w = once(function () {\n  runs++;\n  return runs;\n});\nconsole.log(w());\nconsole.log(w());\nconsole.log(runs);',
      testCases: [{ input: {}, expectedOutput: '1\n1\n1' }]
    },
    {
      description:
        '// Closures in a loop: change var to let in the for-loop so each function captures its own i.\n// Output must be: 0 1 2 (space-separated).\n\nconst fns = [];\nfor (var i = 0; i < 3; i++) {\n  fns.push(function () {\n    return i;\n  });\n}\nconsole.log(fns[0]() + " " + fns[1]() + " " + fns[2]());',
      solution_type: 'script',
      reference_solution:
        'const fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(function () {\n    return i;\n  });\n}\nconsole.log(fns[0]() + " " + fns[1]() + " " + fns[2]());',
      testCases: [{ input: {}, expectedOutput: '0 1 2' }]
    }
  ]
}
