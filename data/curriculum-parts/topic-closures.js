/** Topic: Functions remembering their scope (closures) */
export default {
  "id": "closures",
  "title": "Functions remembering their scope",
  "outcomes": [
    "What a Closure Is",
    "A Function That Returns a Function",
    "Variables That Stay \"Private\"",
    "Keeping State Between Calls",
    "Closures in a Loop: Use let"
  ],
  "outcome_messages": [
    "Let's understand what a closure is.\n\nA **closure** is when a function **remembers** the variables from the place it was created—even after that outer place has finished running. In JavaScript, if you define a function inside another function and return it, the returned function still has access to the outer function's variables. That \"remembering\" is the closure.\n\n## Example\n\n```javascript\nfunction makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(3));\n```\n\n## Output\n\n```\n8\n```\n\n## What happens\n\n- makeAdder(5) runs and returns a function. That inner function remembers **x is 5**.\n- add5(3) calls that function with y = 3. It uses the remembered x (5) and returns 5 + 3 = 8.\n\n## Practice\n\nIn the example, why does add5(3) return 8?",
    "Let's see a function that returns a function.\n\nYou can write a function that **returns another function**. The returned function is created inside the first one, so it remembers the first function's parameters. Each time you call the outer function with different arguments, you get a different inner function, each with its own \"remembered\" values.\n\n## Example\n\n```javascript\nfunction createMultiplier(m) {\n  return function(n) {\n    return n * m;\n  };\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```\n\n## Output\n\n```\n10 15\n```\n\n## What happens\n\n- createMultiplier(2) returns a function that remembers **m = 2**. We call it double.\n- createMultiplier(3) returns a function that remembers **m = 3**. We call it triple.\n- double(5) is 5 * 2 = 10. triple(5) is 5 * 3 = 15.\n\n## Practice\n\nIn the example, why does double(5) give 10 and triple(5) give 15?",
    "Let's keep variables private with closures.\n\nVariables declared inside a function are not visible from outside. If you **return** an object (or function) that uses those variables, only that object can read or change them. So the variable is effectively hidden—you expose only the behavior you want (e.g. getSecret, setSecret), not the variable itself.\n\n## Example\n\n```javascript\nfunction secretKeeper(secret) {\n  return {\n    getSecret: function() {\n      return secret;\n    },\n    setSecret: function(s) {\n      secret = s;\n    }\n  };\n}\nconst k = secretKeeper(\"pass\");\nconsole.log(k.getSecret());\n```\n\n## Output\n\n```\npass\n```\n\n## What happens\n\n- secretKeeper(\"pass\") runs. The variable secret is inside the function, not on the returned object.\n- k.getSecret() runs the inner function, which still has access to secret, so it returns \"pass\".\n\n## Practice\n\nIn the example, why can't we access secret from outside?",
    "Let's keep state between calls.\n\nYou can keep a variable inside the outer function and return an object whose methods **read and update** that variable. Because the variable lives in the closure, it is not reset when you call the methods—it persists. So you get something like a counter: each call to increment() changes the same count, and getValue() reads it.\n\n## Example\n\n```javascript\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: function() {\n      count++;\n    },\n    getValue: function() {\n      return count;\n    }\n  };\n}\nconst c = createCounter();\nc.increment();\nc.increment();\nconsole.log(c.getValue());\n```\n\n## Output\n\n```\n2\n```\n\n## What happens\n\n- createCounter() runs. count is 0 and stays in the closure.\n- c.increment() runs twice, so count becomes 1 then 2.\n- c.getValue() returns the current count, which is 2.\n\n## Practice\n\nIn the example, why does count still show 2 when we call getValue() instead of going back to 0?",
    "Let's use let for closures in a loop.\n\nIf you create a function inside a loop and that function uses the loop variable, it \"closes over\" that variable. With **var**, there is only one variable for the whole loop, so by the time the function runs, the loop may have finished and the variable has its final value for all of them. With **let**, each iteration has its own variable, so each function remembers the right value.\n\n## Example\n\n```javascript\nconst fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(function() {\n    return i;\n  });\n}\nconsole.log(fns[0](), fns[1](), fns[2]());\n```\n\n## Output\n\n```\n0 1 2\n```\n\n## What happens\n\n- With **let i**, each time through the loop we have a different i (0, 1, 2). Each function we push remembers its own i.\n- So fns[0]() returns 0, fns[1]() returns 1, fns[2]() returns 2.\n- If we had used **var i**, all three would return 3, because they would share one variable that ends at 3.\n\n## Practice\n\nIn the example, why do we use let instead of var for the loop variable i?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that creates a greeting closure.\n  Return an inner function that combines greeting with a name.\n  Examples:\n    createGreeting(\"Hello, \") => returns a function\n    const greeter = createGreeting(\"Hello, \")\n    greeter(\"Alice\") => \"Hello, Alice\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createGreeting(greeting) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createGreeting",
      "reference_solution": "function createGreeting(greeting) {\n  return function(name) {\n    return greeting + name;\n  };\n}",
      "testCases": [
        {
          "input": {
            "greeting": "Hello, "
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a counter with closure.\n  Return an object with increment and getValue methods.\n  The count should start at 0 and persist across method calls.\n  Examples:\n    createCounter() => {increment: function, getValue: function}\n    const counter = createCounter()\n    counter.increment(); counter.getValue() => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCounter() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCounter",
      "reference_solution": "function createCounter() {\n  let count = 0;\n  return {\n    increment: function() {\n      count++;\n    },\n    getValue: function() {\n      return count;\n    }\n  };\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "object"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a multiplier closure.\n  Return a function that multiplies numbers by the given multiplier.\n  Examples:\n    createMultiplier(2) => returns a function\n    const doubler = createMultiplier(2)\n    doubler(5) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createMultiplier(multiplier) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createMultiplier",
      "reference_solution": "function createMultiplier(multiplier) {\n  return function(num) {\n    return num * multiplier;\n  };\n}",
      "testCases": [
        {
          "input": {
            "multiplier": 2
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates an adder closure.\n  Return a function that adds the given x value to any input.\n  Examples:\n    createAdder(10) => returns a function\n    const addTen = createAdder(10)\n    addTen(5) => 15\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createAdder(x) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createAdder",
      "reference_solution": "function createAdder(x) {\n  return function(num) {\n    return num + x;\n  };\n}",
      "testCases": [
        {
          "input": {
            "x": 10
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a secret keeper with closure.\n  Return an object with getSecret and setSecret methods for data privacy.\n  Examples:\n    secretKeeper(\"myPassword\") => {getSecret: function, setSecret: function}\n    const keeper = secretKeeper(\"myPassword\")\n    keeper.getSecret() => \"myPassword\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction secretKeeper(secret) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "secretKeeper",
      "reference_solution": "function secretKeeper(secret) {\n  return {\n    getSecret: function() {\n      return secret;\n    },\n    setSecret: function(newSecret) {\n      secret = newSecret;\n    }\n  };\n}",
      "testCases": [
        {
          "input": {
            "secret": "myPassword"
          },
          "expectedOutput": "object"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a bank account with closure.\n  Return an object with deposit, withdraw, and getBalance methods.\n  Examples:\n    createBankAccount(100) => {deposit: function, withdraw: function, getBalance: function}\n    const account = createBankAccount(100)\n    account.getBalance() => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createBankAccount(initialBalance) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createBankAccount",
      "reference_solution": "function createBankAccount(initialBalance) {\n  let balance = initialBalance;\n  return {\n    deposit: function(amount) {\n      balance += amount;\n    },\n    withdraw: function(amount) {\n      balance -= amount;\n    },\n    getBalance: function() {\n      return balance;\n    }\n  };\n}",
      "testCases": [
        {
          "input": {
            "initialBalance": 100
          },
          "expectedOutput": "object"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a limited counter with closure.\n  Return an object with increment and getValue methods that respect the limit.\n  Examples:\n    createLimitedCounter(3) => {increment: function, getValue: function}\n    const counter = createLimitedCounter(3)\n    counter.getValue() => 0 (starts at 0)\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createLimitedCounter(limit) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createLimitedCounter",
      "reference_solution": "function createLimitedCounter(limit) {\n  let count = 0;\n  return {\n    increment: function() {\n      if (count < limit) count++;\n    },\n    getValue: function() {\n      return count;\n    }\n  };\n}",
      "testCases": [
        {
          "input": {
            "limit": 3
          },
          "expectedOutput": "object"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a logger with closure.\n  Return a function that formats messages with the given prefix.\n  Examples:\n    createLogger(\"INFO\") => returns a function\n    const logger = createLogger(\"INFO\")\n    logger(\"Server started\") => \"INFO: Server started\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createLogger(prefix) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createLogger",
      "reference_solution": "function createLogger(prefix) {\n  return function(message) {\n    return prefix + \": \" + message;\n  };\n}",
      "testCases": [
        {
          "input": {
            "prefix": "INFO"
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a temperature converter with closure.\n  Return a function that converts temperatures based on the unit.\n  C to F: (C × 9/5) + 32, F to C: (F - 32) × 5/9\n  Examples:\n    createTemperatureConverter(\"C\") => returns a function\n    const cToF = createTemperatureConverter(\"C\")\n    cToF(0) => 32\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createTemperatureConverter(unit) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createTemperatureConverter",
      "reference_solution": "function createTemperatureConverter(unit) {\n  if (unit === \"C\") {\n    return function(celsius) {\n      return (celsius * 9 / 5) + 32;\n    };\n  } else {\n    return function(fahrenheit) {\n      return (fahrenheit - 32) * 5 / 9;\n    };\n  }\n}",
      "testCases": [
        {
          "input": {
            "unit": "C"
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates an ID generator with closure.\n  Return a function that generates sequential IDs starting from 1.\n  Examples:\n    createIdGenerator() => returns a function\n    const generator = createIdGenerator()\n    generator() => 1, generator() => 2, generator() => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createIdGenerator() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createIdGenerator",
      "reference_solution": "function createIdGenerator() {\n  let id = 0;\n  return function() {\n    id++;\n    return id;\n  };\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a \"once\" wrapper with closure.\n  Return a function that can only be called once and caches the result.\n  Examples:\n    once(someFunction) => returns a wrapped function\n    const onceWrapper = once(() => \"result\")\n    onceWrapper() => \"result\" (first call)\n    onceWrapper() => \"result\" (cached, same result)\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction once(fn) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "once",
      "reference_solution": "function once(fn) {\n  let called = false;\n  let result;\n  return function() {\n    if (!called) {\n      result = fn.apply(this, arguments);\n      called = true;\n    }\n    return result;\n  };\n}",
      "testCases": [
        {
          "input": {
            "fn": "function"
          },
          "expectedOutput": "function"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a calculator with closure.\n  Return an object with add, subtract, multiply, divide, and getValue methods.\n  The total starts at 0 and persists across operations.\n  Examples:\n    createCalculator() => {add: function, subtract: function, multiply: function, divide: function, getValue: function}\n    const calc = createCalculator()\n    calc.getValue() => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCalculator() {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCalculator",
      "reference_solution": "function createCalculator() {\n  let total = 0;\n  return {\n    add: function(x) {\n      total += x;\n    },\n    subtract: function(x) {\n      total -= x;\n    },\n    multiply: function(x) {\n      total *= x;\n    },\n    divide: function(x) {\n      total /= x;\n    },\n    getValue: function() {\n      return total;\n    }\n  };\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "object"
        }
      ]
    }
  ]
};
