/** Topic: Classes: basics */
export default {
  "id": "classes-basics",
  "title": "Classes: basics",
  "outcomes": [
    "What is a class? What is an instance?",
    "Creating an instance with new",
    "Giving each instance data: constructor and this",
    "Giving instances actions: methods"
  ],
  "outcome_messages": [
    "Let's clarify what a class and an instance are.\n\n## Class\n\nA **blueprint**. A template that describes what shape and behavior something will have. You write it once.\n\n## Instance\n\n**One concrete object** you create from that blueprint. You can create many instances from one class.\n\n## Example\n\nThe class might be **Person** (the idea of a person). Each instance is one actual person: Ali, Bea, Chris.\n\n## So\n\nOne class, many possible instances.\n\nIn the next steps we will see how to write a class and how to create instances from it.\n\n## Practice\n\nIn one sentence: what is the difference between a class and an instance?",
    "Let's create an instance from a class using the **new** keyword.\n\nTo create an instance from a class, you use the **new** keyword.\n\n## Syntax\n\n```\nclass ClassName { }\nconst obj = new ClassName();\n```\n\n- **class Name { }** — Declares a class (the body can be empty at first).\n- **new ClassName()** — Creates **one instance** and returns it. Store it in a variable: **const obj = new ClassName();**\n\n## Example\n\n```javascript\nclass Person { }\nconst p = new Person();\nconsole.log(p);\n```\n\n## Output\n\n```\nPerson {}\n```\n\n(an empty Person instance)\n\n## What happens\n\n**new Person()** creates one instance. We store it in **p** and print it. Right now the instance is empty; next we add data (constructor) and actions (methods).\n\n## Practice\n\nWrite a class Dog with an empty body. Then write the line that creates one instance and stores it in **myDog**.",
    "Let's give each instance its own data using the constructor and **this**.\n\nThe **constructor** is a special method that runs when you create an instance with **new**. Use it to give each instance its **own data** (e.g. each Person has their own name).\n\n## Syntax\n\n```\nclass MyClass {\n  constructor(param1, param2) {\n    this.prop1 = param1;\n    this.prop2 = param2;\n  }\n}\nconst obj = new MyClass(a, b);\n```\n\n- **constructor(...)** — runs when **new MyClass(...)** is called; parameters are what you pass in.\n- **this** — inside the class, **this** is the instance being created. Assign to **this.propName** to give the instance properties. In methods, **this** is the instance the method was called on. Don't return from constructor; the new object is returned automatically.\n\n## Example\n\n```javascript\nclass Point {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\nconst pt = new Point(3, 4);\nconsole.log(pt.x, pt.y);\n```\n\n## Output\n\n```\n3 4\n```\n\n## What happens\n\n- new Point(3, 4) runs the constructor with x=3, y=4.\n- this.x and this.y set properties on the new instance; pt gets those values.\n\n## Practice\n\nAdd a constructor to a class Person that takes name and sets this.name. What does new Person(\"Ali\").name return? In a method, how do you access a property named value set in the constructor?",
    "Let's give instances actions by defining methods.\n\n**Methods** are actions that each instance can do. They are functions on the class that every instance can call.\n\n## Syntax\n\n```\nclass MyClass {\n  constructor() {\n    this.x = 0;\n  }\n  methodName() {\n    return this.x;\n  }\n  otherMethod(a, b) {\n    /* ... */\n  }\n}\nconst obj = new MyClass();\nobj.methodName();\n```\n\n- Define a method like **methodName() { }** (or with parameters) inside the class.\n- Call with **instance.methodName()**. Inside the method, **this** is that instance, so you can read and update **this.prop** set in the constructor.\n\n## Example\n\n```javascript\nclass Greeter {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return \"Hi, \" + this.name;\n  }\n}\nconst g = new Greeter(\"Alice\");\nconsole.log(g.greet());\n```\n\n## Output\n\n```\nHi, Alice\n```\n\n## What happens\n\n- g is an instance; g.name is \"Alice\" (set in constructor).\n- g.greet() runs with this = g, so this.name is \"Alice\" and the return is \"Hi, Alice\".\n\n## Practice\n\nAdd a method getArea() to a class Rectangle (with width and height in the constructor) that returns width * height. What does new Rectangle(5, 10).getArea() return?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that creates a Person class and returns introduction.\n  Create a class named Person with a constructor that takes name and age.\n  Add a method introduce() that returns \"Hi, I'm {name} and I'm {age} years old\".\n  Create an instance and call introduce().\n  Examples:\n    createPersonAndIntroduce(\"Alice\", 25) => \"Hi, I'm Alice and I'm 25 years old\"\n    createPersonAndIntroduce(\"Bob\", 30) => \"Hi, I'm Bob and I'm 30 years old\"\n    createPersonAndIntroduce(\"Charlie\", 22) => \"Hi, I'm Charlie and I'm 22 years old\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createPersonAndIntroduce(name, age) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createPersonAndIntroduce",
      "reference_solution": "function createPersonAndIntroduce(name, age) {\n  class Person { constructor(n, a) { this.name = n; this.age = a; }\n    introduce() { return \"Hi, I'm \" + this.name + \" and I'm \" + this.age + \" years old\"; } }\n  return new Person(name, age).introduce();\n}",
      "testCases": [
        { "input": { "name": "Alice", "age": 25 }, "expectedOutput": "Hi, I'm Alice and I'm 25 years old" },
        { "input": { "name": "Bob", "age": 30 }, "expectedOutput": "Hi, I'm Bob and I'm 30 years old" },
        { "input": { "name": "Charlie", "age": 22 }, "expectedOutput": "Hi, I'm Charlie and I'm 22 years old" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Rectangle class and calls specified method.\n  Create a class named Rectangle with constructor taking width and height.\n  Add a method getArea() that returns the area.\n  Add a method getPerimeter() that returns the perimeter.\n  Create instance and call the specified method.\n  Examples:\n    createRectangleAndCalculate(5, 10, \"getArea\") => 50\n    createRectangleAndCalculate(5, 10, \"getPerimeter\") => 30\n    createRectangleAndCalculate(7, 3, \"getArea\") => 21\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createRectangleAndCalculate(width, height, method) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createRectangleAndCalculate",
      "reference_solution": "function createRectangleAndCalculate(width, height, method) {\n  class Rectangle { constructor(w, h) { this.width = w; this.height = h; }\n    getArea() { return this.width * this.height; }\n    getPerimeter() { return 2 * (this.width + this.height); } }\n  const r = new Rectangle(width, height);\n  return r[method]();\n}",
      "testCases": [
        { "input": { "width": 5, "height": 10, "method": "getArea" }, "expectedOutput": "50" },
        { "input": { "width": 5, "height": 10, "method": "getPerimeter" }, "expectedOutput": "30" },
        { "input": { "width": 7, "height": 3, "method": "getArea" }, "expectedOutput": "21" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Counter class and performs operations.\n  Create a class named Counter with a constructor that initializes count to 0.\n  Add methods increment(), decrement(), and getValue().\n  Create instance, perform operations, and return final value.\n  Examples:\n    createCounterAndOperate([\"increment\", \"increment\", \"getValue\"]) => 2\n    createCounterAndOperate([\"increment\", \"decrement\", \"getValue\"]) => 0\n    createCounterAndOperate([\"increment\", \"increment\", \"increment\", \"getValue\"]) => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCounterAndOperate(operations) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCounterAndOperate",
      "reference_solution": "function createCounterAndOperate(operations) {\n  class Counter { constructor() { this.count = 0; }\n    increment() { this.count++; }\n    decrement() { this.count--; }\n    getValue() { return this.count; } }\n  const c = new Counter();\n  operations.forEach(op => c[op]());\n  return c.getValue();\n}",
      "testCases": [
        { "input": { "operations": ["increment", "increment", "getValue"] }, "expectedOutput": "2" },
        { "input": { "operations": ["increment", "decrement", "getValue"] }, "expectedOutput": "0" },
        { "input": { "operations": ["increment", "increment", "increment", "getValue"] }, "expectedOutput": "3" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a BankAccount class and performs operations.\n  Create a class named BankAccount with constructor taking accountHolder and balance.\n  Add methods deposit(amount), withdraw(amount), and getBalance().\n  Create account, perform operations, and return final balance.\n  Examples:\n    createBankAccountAndOperate(\"Alice\", 100, [{\"type\": \"deposit\", \"amount\": 50}]) => 150\n    createBankAccountAndOperate(\"Bob\", 200, [{\"type\": \"withdraw\", \"amount\": 50}]) => 150\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createBankAccountAndOperate(accountHolder, initialBalance, operations) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createBankAccountAndOperate",
      "reference_solution": "function createBankAccountAndOperate(accountHolder, initialBalance, operations) {\n  class BankAccount { constructor(holder, balance) { this.accountHolder = holder; this.balance = balance; }\n    deposit(amount) { this.balance += amount; }\n    withdraw(amount) { this.balance -= amount; }\n    getBalance() { return this.balance; } }\n  const acc = new BankAccount(accountHolder, initialBalance);\n  operations.forEach(op => { if (op.type === 'deposit') acc.deposit(op.amount); else acc.withdraw(op.amount); });\n  return acc.getBalance();\n}",
      "testCases": [
        { "input": { "accountHolder": "Alice", "initialBalance": 100, "operations": [{ "type": "deposit", "amount": 50 }] }, "expectedOutput": "150" },
        { "input": { "accountHolder": "Bob", "initialBalance": 200, "operations": [{ "type": "withdraw", "amount": 50 }] }, "expectedOutput": "150" },
        { "input": { "accountHolder": "Charlie", "initialBalance": 500, "operations": [{ "type": "deposit", "amount": 100 }, { "type": "withdraw", "amount": 50 }] }, "expectedOutput": "550" }
      ]
    }
  ]
};
