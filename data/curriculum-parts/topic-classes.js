/** Topic: Object-oriented programming (classes) */
export default {
  "id": "classes",
  "title": "Object-oriented programming",
  "outcomes": [
    "Classes as Blueprints: Defining the Template",
    "The constructor Method: Initializing Instance State",
    "this in Classes: Referencing the Current Instance",
    "Methods: Defining Shared Behavior",
    "Static Members: Properties and Methods belonging to the Blueprint",
    "Encapsulation: Using Getters and Setters for Data Control",
    "Inheritance: Extending Logic with \"extends\" and \"super\"",
    "Polymorphism: Overriding Methods for Specialized Logic",
    "Type Checking: Identifying Instances with \"instanceof\""
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that creates a Person class and returns introduction.\n  Create a class named Person with a constructor that takes name and age.\n  Add a method introduce() that returns \"Hi, I'm {name} and I'm {age} years old\".\n  Create an instance and call introduce().\n  Examples:\n    createPersonAndIntroduce(\"Alice\", 25) => \"Hi, I'm Alice and I'm 25 years old\"\n    createPersonAndIntroduce(\"Bob\", 30) => \"Hi, I'm Bob and I'm 30 years old\"\n    createPersonAndIntroduce(\"Charlie\", 22) => \"Hi, I'm Charlie and I'm 22 years old\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createPersonAndIntroduce(name, age) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createPersonAndIntroduce",
      "reference_solution": "function createPersonAndIntroduce(name, age) {\n  class Person { constructor(n, a) { this.name = n; this.age = a; }\n    introduce() { return \"Hi, I'm \" + this.name + \" and I'm \" + this.age + \" years old\"; } }\n  return new Person(name, age).introduce();\n}",
      "testCases": [
        {
          "input": {
            "name": "Alice",
            "age": 25
          },
          "expectedOutput": "Hi, I'm Alice and I'm 25 years old"
        },
        {
          "input": {
            "name": "Bob",
            "age": 30
          },
          "expectedOutput": "Hi, I'm Bob and I'm 30 years old"
        },
        {
          "input": {
            "name": "Charlie",
            "age": 22
          },
          "expectedOutput": "Hi, I'm Charlie and I'm 22 years old"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Rectangle class and calls specified method.\n  Create a class named Rectangle with constructor taking width and height.\n  Add a method getArea() that returns the area.\n  Add a method getPerimeter() that returns the perimeter.\n  Create instance and call the specified method.\n  Examples:\n    createRectangleAndCalculate(5, 10, \"getArea\") => 50\n    createRectangleAndCalculate(5, 10, \"getPerimeter\") => 30\n    createRectangleAndCalculate(7, 3, \"getArea\") => 21\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createRectangleAndCalculate(width, height, method) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createRectangleAndCalculate",
      "reference_solution": "function createRectangleAndCalculate(width, height, method) {\n  class Rectangle { constructor(w, h) { this.width = w; this.height = h; }\n    getArea() { return this.width * this.height; }\n    getPerimeter() { return 2 * (this.width + this.height); } }\n  const r = new Rectangle(width, height);\n  return r[method]();\n}",
      "testCases": [
        {
          "input": {
            "width": 5,
            "height": 10,
            "method": "getArea"
          },
          "expectedOutput": "50"
        },
        {
          "input": {
            "width": 5,
            "height": 10,
            "method": "getPerimeter"
          },
          "expectedOutput": "30"
        },
        {
          "input": {
            "width": 7,
            "height": 3,
            "method": "getArea"
          },
          "expectedOutput": "21"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Counter class and performs operations.\n  Create a class named Counter with a constructor that initializes count to 0.\n  Add methods increment(), decrement(), and getValue().\n  Create instance, perform operations, and return final value.\n  Examples:\n    createCounterAndOperate([\"increment\", \"increment\", \"getValue\"]) => 2\n    createCounterAndOperate([\"increment\", \"decrement\", \"getValue\"]) => 0\n    createCounterAndOperate([\"increment\", \"increment\", \"increment\", \"getValue\"]) => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCounterAndOperate(operations) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCounterAndOperate",
      "reference_solution": "function createCounterAndOperate(operations) {\n  class Counter { constructor() { this.count = 0; }\n    increment() { this.count++; }\n    decrement() { this.count--; }\n    getValue() { return this.count; } }\n  const c = new Counter();\n  operations.forEach(op => c[op]());\n  return c.getValue();\n}",
      "testCases": [
        {
          "input": {
            "operations": [
              "increment",
              "increment",
              "getValue"
            ]
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "operations": [
              "increment",
              "decrement",
              "getValue"
            ]
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "operations": [
              "increment",
              "increment",
              "increment",
              "getValue"
            ]
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a BankAccount class and performs operations.\n  Create a class named BankAccount with constructor taking accountHolder and balance.\n  Add methods deposit(amount), withdraw(amount), and getBalance().\n  Create account, perform operations, and return final balance.\n  Examples:\n    createBankAccountAndOperate(\"Alice\", 100, [{\"type\": \"deposit\", \"amount\": 50}]) => 150\n    createBankAccountAndOperate(\"Bob\", 200, [{\"type\": \"withdraw\", \"amount\": 50}]) => 150\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createBankAccountAndOperate(accountHolder, initialBalance, operations) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createBankAccountAndOperate",
      "reference_solution": "function createBankAccountAndOperate(accountHolder, initialBalance, operations) {\n  class BankAccount { constructor(holder, balance) { this.accountHolder = holder; this.balance = balance; }\n    deposit(amount) { this.balance += amount; }\n    withdraw(amount) { this.balance -= amount; }\n    getBalance() { return this.balance; } }\n  const acc = new BankAccount(accountHolder, initialBalance);\n  operations.forEach(op => { if (op.type === 'deposit') acc.deposit(op.amount); else acc.withdraw(op.amount); });\n  return acc.getBalance();\n}",
      "testCases": [
        {
          "input": {
            "accountHolder": "Alice",
            "initialBalance": 100,
            "operations": [
              {
                "type": "deposit",
                "amount": 50
              }
            ]
          },
          "expectedOutput": "150"
        },
        {
          "input": {
            "accountHolder": "Bob",
            "initialBalance": 200,
            "operations": [
              {
                "type": "withdraw",
                "amount": 50
              }
            ]
          },
          "expectedOutput": "150"
        },
        {
          "input": {
            "accountHolder": "Charlie",
            "initialBalance": 500,
            "operations": [
              {
                "type": "deposit",
                "amount": 100
              },
              {
                "type": "withdraw",
                "amount": 50
              }
            ]
          },
          "expectedOutput": "550"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Circle class with static PI.\n  Create a class named Circle with constructor taking radius.\n  Add a static property PI with value 3.14159.\n  Add methods getArea() and getCircumference() using Circle.PI.\n  Examples:\n    createCircleAndCalculate(5, \"getArea\") => 78.53975\n    createCircleAndCalculate(5, \"getCircumference\") => 31.4159\n    createCircleAndCalculate(10, \"getArea\") => 314.159\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCircleAndCalculate(radius, method) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCircleAndCalculate",
      "reference_solution": "function createCircleAndCalculate(radius, method) {\n  class Circle { static PI = 3.14159;\n    constructor(r) { this.radius = r; }\n    getArea() { return this.radius * this.radius * Circle.PI; }\n    getCircumference() { return 2 * Circle.PI * this.radius; } }\n  const c = new Circle(radius);\n  return c[method]();\n}",
      "testCases": [
        {
          "input": {
            "radius": 5,
            "method": "getArea"
          },
          "expectedOutput": "78.53975"
        },
        {
          "input": {
            "radius": 5,
            "method": "getCircumference"
          },
          "expectedOutput": "31.4159"
        },
        {
          "input": {
            "radius": 10,
            "method": "getArea"
          },
          "expectedOutput": "314.159"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Temperature class with getter/setter.\n  Create a class named Temperature with constructor taking celsius.\n  Add getter fahrenheit that converts celsius to fahrenheit: (C × 9/5) + 32.\n  Add setter fahrenheit that converts fahrenheit to celsius: (F - 32) × 5/9.\n  Examples:\n    createTemperatureAndConvert(0, \"get\") => 32\n    createTemperatureAndConvert(100, \"get\") => 212\n    createTemperatureAndConvert(32, \"set\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createTemperatureAndConvert(value, operation) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createTemperatureAndConvert",
      "reference_solution": "function createTemperatureAndConvert(value, operation) {\n  class Temperature { constructor(c) { this._celsius = c; }\n    get fahrenheit() { return (this._celsius * 9/5) + 32; }\n    set fahrenheit(f) { this._celsius = (f - 32) * 5/9; }\n    getCelsius() { return this._celsius; } }\n  if (operation === 'get') { const t = new Temperature(value); return t.fahrenheit; }\n  const t = new Temperature(0); t.fahrenheit = value; return t.getCelsius();\n}",
      "testCases": [
        {
          "input": {
            "value": 0,
            "operation": "get"
          },
          "expectedOutput": "32"
        },
        {
          "input": {
            "value": 100,
            "operation": "get"
          },
          "expectedOutput": "212"
        },
        {
          "input": {
            "value": 32,
            "operation": "set"
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Animal and Dog classes with inheritance.\n  Create a class named Animal with constructor taking name.\n  Add method speak() that returns \"{name} makes a sound\".\n  Create a class Dog that extends Animal.\n  Override speak() to return \"{name} barks\".\n  Examples:\n    createDogAndSpeak(\"Rex\") => \"Rex barks\"\n    createDogAndSpeak(\"Buddy\") => \"Buddy barks\"\n    createDogAndSpeak(\"Max\") => \"Max barks\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createDogAndSpeak(name) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createDogAndSpeak",
      "reference_solution": "function createDogAndSpeak(name) {\n  class Animal { constructor(n) { this.name = n; } speak() { return this.name + ' makes a sound'; } }\n  class Dog extends Animal { speak() { return this.name + ' barks'; } }\n  return new Dog(name).speak();\n}",
      "testCases": [
        {
          "input": {
            "name": "Rex"
          },
          "expectedOutput": "Rex barks"
        },
        {
          "input": {
            "name": "Buddy"
          },
          "expectedOutput": "Buddy barks"
        },
        {
          "input": {
            "name": "Max"
          },
          "expectedOutput": "Max barks"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Vehicle and Car classes with inheritance.\n  Create a class Vehicle with constructor taking brand.\n  Create class Car that extends Vehicle with constructor taking brand and model.\n  Override getInfo() to return \"Brand: {brand}, Model: {model}\".\n  Examples:\n    createCarAndGetInfo(\"Toyota\", \"Camry\") => \"Brand: Toyota, Model: Camry\"\n    createCarAndGetInfo(\"Honda\", \"Civic\") => \"Brand: Honda, Model: Civic\"\n    createCarAndGetInfo(\"Ford\", \"Mustang\") => \"Brand: Ford, Model: Mustang\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCarAndGetInfo(brand, model) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCarAndGetInfo",
      "reference_solution": "function createCarAndGetInfo(brand, model) {\n  class Vehicle { constructor(b) { this.brand = b; } }\n  class Car extends Vehicle { constructor(b, m) { super(b); this.model = m; }\n    getInfo() { return 'Brand: ' + this.brand + ', Model: ' + this.model; } }\n  return new Car(brand, model).getInfo();\n}",
      "testCases": [
        {
          "input": {
            "brand": "Toyota",
            "model": "Camry"
          },
          "expectedOutput": "Brand: Toyota, Model: Camry"
        },
        {
          "input": {
            "brand": "Honda",
            "model": "Civic"
          },
          "expectedOutput": "Brand: Honda, Model: Civic"
        },
        {
          "input": {
            "brand": "Ford",
            "model": "Mustang"
          },
          "expectedOutput": "Brand: Ford, Model: Mustang"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Shape hierarchy with polymorphism.\n  Create a class Shape with method getArea() that returns 0.\n  Create class Square that extends Shape with constructor taking side.\n  Create class Circle that extends Shape with constructor taking radius.\n  Override getArea() methods appropriately.\n  Examples:\n    createShapeAndGetArea(\"Square\", 4) => 16\n    createShapeAndGetArea(\"Circle\", 5) => 78.53975\n    createShapeAndGetArea(\"Square\", 10) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createShapeAndGetArea(type, value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createShapeAndGetArea",
      "reference_solution": "function createShapeAndGetArea(type, value) {\n  class Shape { getArea() { return 0; } }\n  class Square extends Shape { constructor(side) { super(); this.side = side; }\n    getArea() { return this.side * this.side; } }\n  class Circle extends Shape { constructor(r) { super(); this.radius = r; }\n    getArea() { return this.radius * this.radius * 3.14159; } }\n  const s = type === 'Square' ? new Square(value) : new Circle(value);\n  return s.getArea();\n}",
      "testCases": [
        {
          "input": {
            "type": "Square",
            "value": 4
          },
          "expectedOutput": "16"
        },
        {
          "input": {
            "type": "Circle",
            "value": 5
          },
          "expectedOutput": "78.53975"
        },
        {
          "input": {
            "type": "Square",
            "value": 10
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates instanceof with inheritance.\n  Create a class Person with constructor taking name.\n  Create a class Student that extends Person.\n  Create an instance of Student and use instanceof to check class type.\n  Examples:\n    checkInstanceType(\"Alice\", \"Student\") => true\n    checkInstanceType(\"Bob\", \"Person\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction checkInstanceType(name, checkClass) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "checkInstanceType",
      "reference_solution": "function checkInstanceType(name, checkClass) {\n  class Person { constructor(n) { this.name = n; } }\n  class Student extends Person { constructor(n) { super(n); } }\n  const s = new Student(name);\n  return checkClass === 'Student' ? s instanceof Student : s instanceof Person;\n}",
      "testCases": [
        {
          "input": {
            "name": "Alice",
            "checkClass": "Student"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "name": "Bob",
            "checkClass": "Person"
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Calculator class with static methods.\n  Create a class Calculator with static method add(a, b) that returns a + b.\n  Add static method multiply(a, b) that returns a * b.\n  Call the specified static method without creating an instance.\n  Examples:\n    useCalculatorStatic(\"add\", 5, 3) => 8\n    useCalculatorStatic(\"multiply\", 5, 3) => 15\n    useCalculatorStatic(\"add\", 10, 20) => 30\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction useCalculatorStatic(method, a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "useCalculatorStatic",
      "reference_solution": "function useCalculatorStatic(method, a, b) {\n  class Calculator { static add(a, b) { return a + b; }\n    static multiply(a, b) { return a * b; } }\n  return Calculator[method](a, b);\n}",
      "testCases": [
        {
          "input": {
            "method": "add",
            "a": 5,
            "b": 3
          },
          "expectedOutput": "8"
        },
        {
          "input": {
            "method": "multiply",
            "a": 5,
            "b": 3
          },
          "expectedOutput": "15"
        },
        {
          "input": {
            "method": "add",
            "a": 10,
            "b": 20
          },
          "expectedOutput": "30"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates User class with password encapsulation.\n  Create a class User with constructor taking username.\n  Add private property _password and getter/setter for password.\n  Getter always returns \"*****\" to hide actual password.\n  Examples:\n    createUserAndGetPassword(\"alice\", \"secret123\") => \"*****\"\n    createUserAndGetPassword(\"bob\", \"pass456\") => \"*****\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createUserAndGetPassword(username, password) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createUserAndGetPassword",
      "reference_solution": "function createUserAndGetPassword(username, password) {\n  class User { constructor(u, p) { this.username = u; this._password = p; }\n    get password() { return '*****'; }\n    set password(p) { this._password = p; } }\n  const u = new User(username, password);\n  return u.password;\n}",
      "testCases": [
        {
          "input": {
            "username": "alice",
            "password": "secret123"
          },
          "expectedOutput": "*****"
        },
        {
          "input": {
            "username": "bob",
            "password": "pass456"
          },
          "expectedOutput": "*****"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Book class with static comparison.\n  Create a class Book with constructor taking title, author, pages.\n  Add static method comparePages(book1, book2) that returns the book with more pages.\n  Create two books and use comparePages to find which has more pages.\n  Examples:\n    compareBooksAndGetTitle({\"title\": \"1984\", \"author\": \"Orwell\", \"pages\": 328}, {\"title\": \"Dune\", \"author\": \"Herbert\", \"pages\": 412}) => \"Dune\"\n    compareBooksAndGetTitle({\"title\": \"Hobbit\", \"author\": \"Tolkien\", \"pages\": 500}, {\"title\": \"Harry Potter\", \"author\": \"Rowling\", \"pages\": 300}) => \"Hobbit\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction compareBooksAndGetTitle(book1, book2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "compareBooksAndGetTitle",
      "reference_solution": "function compareBooksAndGetTitle(book1, book2) {\n  class Book { constructor(title, author, pages) { this.title = title; this.author = author; this.pages = pages; }\n    static comparePages(b1, b2) { return b1.pages >= b2.pages ? b1 : b2; } }\n  const b1 = new Book(book1.title, book1.author, book1.pages);\n  const b2 = new Book(book2.title, book2.author, book2.pages);\n  return Book.comparePages(b1, b2).title;\n}",
      "testCases": [
        {
          "input": {
            "book1": {
              "title": "1984",
              "author": "Orwell",
              "pages": 328
            },
            "book2": {
              "title": "Dune",
              "author": "Herbert",
              "pages": 412
            }
          },
          "expectedOutput": "Dune"
        },
        {
          "input": {
            "book1": {
              "title": "Hobbit",
              "author": "Tolkien",
              "pages": 500
            },
            "book2": {
              "title": "Harry Potter",
              "author": "Rowling",
              "pages": 300
            }
          },
          "expectedOutput": "Hobbit"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Employee and Manager classes.\n  Create a class Employee with constructor taking name and salary.\n  Create class Manager that extends Employee.\n  Manager constructor takes name, salary, and department.\n  Add method getDetails() that returns \"{name}, Salary: {salary}, Department: {department}\".\n  Examples:\n    createManagerAndGetDetails(\"Alice\", 80000, \"IT\") => \"Alice, Salary: 80000, Department: IT\"\n    createManagerAndGetDetails(\"Bob\", 90000, \"HR\") => \"Bob, Salary: 90000, Department: HR\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createManagerAndGetDetails(name, salary, department) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createManagerAndGetDetails",
      "reference_solution": "function createManagerAndGetDetails(name, salary, department) {\n  class Employee { constructor(n, s) { this.name = n; this.salary = s; } }\n  class Manager extends Employee { constructor(n, s, d) { super(n, s); this.department = d; }\n    getDetails() { return this.name + ', Salary: ' + this.salary + ', Department: ' + this.department; } }\n  return new Manager(name, salary, department).getDetails();\n}",
      "testCases": [
        {
          "input": {
            "name": "Alice",
            "salary": 80000,
            "department": "IT"
          },
          "expectedOutput": "Alice, Salary: 80000, Department: IT"
        },
        {
          "input": {
            "name": "Bob",
            "salary": 90000,
            "department": "HR"
          },
          "expectedOutput": "Bob, Salary: 90000, Department: HR"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Product class with discount functionality.\n  Create a class Product with constructor taking name and price.\n  Add getter formattedPrice that returns \"$\" + price.\n  Add method applyDiscount(percentage) that reduces price by that percentage.\n  Examples:\n    createProductApplyDiscountAndFormat(\"Laptop\", 1000, 10) => \"$900\"\n    createProductApplyDiscountAndFormat(\"Phone\", 500, 20) => \"$400\"\n    createProductApplyDiscountAndFormat(\"Tablet\", 300, 15) => \"$255\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createProductApplyDiscountAndFormat(name, price, discount) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createProductApplyDiscountAndFormat",
      "reference_solution": "function createProductApplyDiscountAndFormat(name, price, discount) {\n  class Product { constructor(n, p) { this.name = n; this.price = p; }\n    get formattedPrice() { return '$' + this.price; }\n    applyDiscount(pct) { this.price = this.price * (1 - pct/100); } }\n  const p = new Product(name, price);\n  p.applyDiscount(discount);\n  return p.formattedPrice;\n}",
      "testCases": [
        {
          "input": {
            "name": "Laptop",
            "price": 1000,
            "discount": 10
          },
          "expectedOutput": "$900"
        },
        {
          "input": {
            "name": "Phone",
            "price": 500,
            "discount": 20
          },
          "expectedOutput": "$400"
        },
        {
          "input": {
            "name": "Tablet",
            "price": 300,
            "discount": 15
          },
          "expectedOutput": "$255"
        }
      ]
    }
  ]
};
