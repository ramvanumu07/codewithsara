/** Topic: Classes: inheritance and features */
export default {
  "id": "classes-inheritance",
  "title": "Classes: inheritance and features",
  "outcomes": [
    "When one class builds on another: extends and super",
    "Overriding a parent's method",
    "Checking type with instanceof",
    "static: methods on the class itself",
    "Getters and setters"
  ],
  "outcome_messages": [
    "Let's see how one class can build on another with extends and super.\n\n## Why?\n\nSometimes you want a class that is **like** another but with something extra. Example: **Animal** has a name and **speak()**; **Dog** is an animal that barks. Instead of copying code, you let **Dog** **extend** **Animal**.\n\n## What you get\n\nThe child class gets the parent's properties and methods. You **must** call **super(...)** in the child's constructor (usually first) before using **this**.\n\n- **class Child extends Parent** — Child gets everything from Parent; Child instances are also \"a kind of\" Parent.\n- **super(...)** — in the child constructor, call **super(...)** first so the parent can set up; then you can use **this**.\n\n## Example\n\n```javascript\nclass Animal {\n  constructor(n) {\n    this.name = n;\n  }\n}\nclass Dog extends Animal {\n  constructor(n) {\n    super(n);\n  }\n}\nconst d = new Dog(\"Rex\");\nconsole.log(d.name);\n```\n\n## Output\n\n```\nRex\n```\n\n## What happens\n\nDog extends Animal. **new Dog(\"Rex\")** calls Dog's constructor, which calls **super(\"Rex\")** so Animal's constructor sets **this.name**. So **d.name** is \"Rex\".\n\n## Practice\n\nIn the example, why do we call super(n) in Dog's constructor?",
    "Let's override a parent's method in the child class.\n\nIf the parent has a method and the child defines a method with the **same name**, the child's version is used when you call it on a child instance. That is called **overriding**. Inside the child you can still call the parent's version with **super.methodName()**.\n\n## Example\n\n```javascript\nclass Animal {\n  constructor(n) {\n    this.name = n;\n  }\n  speak() {\n    return this.name + \" says hi\";\n  }\n}\nclass Dog extends Animal {\n  speak() {\n    return this.name + \" barks\";\n  }\n}\nconst d = new Dog(\"Rex\");\nconsole.log(d.speak());\n```\n\n## Output\n\n```\nRex barks\n```\n\n## What happens\n\nAnimal has **speak()**; Dog defines **speak()** too, so Dog **overrides** it. When we call **d.speak()**, the Dog version runs.\n\n## Practice\n\nIn the example, why does d.speak() return \"Rex barks\" and not \"Rex says hi\"?",
    "Let's check whether an object was created from a class using instanceof.\n\n**instanceof** answers: \"Was this object created from this class (or a subclass)?\"\n\n- Returns **true** if **value** is an instance of **Constructor** or of a subclass; otherwise **false**. Use it when you need to check before calling class-specific code. A subclass instance is **instanceof** both the child and the parent (e.g. **new Dog()** is **instanceof Dog** and **instanceof Animal**).\n\n## Example\n\n```javascript\nclass A { }\nclass B extends A { }\nconst b = new B();\nconsole.log(b instanceof B);\nconsole.log(b instanceof A);\n```\n\n## Output\n\n`true` then `true`\n\n## What happens\n\n**b** was created with **new B()**, so **b instanceof B** is true. **B extends A**, so **b** is also an instance of **A**.\n\n## Practice\n\nIn the example, why is b instanceof A true even though we created b with new B()?",
    "Let's put methods on the class itself with static.\n\n**static** puts a method or property on the **class**, not on instances. You call it as **ClassName.methodName()** — no **new**, no instance.\n\n- Declare with **static methodName() { }** or **static propName = value**.\n- Call or read with **ClassName.methodName()** or **ClassName.propName** — no **new** and no instance. Use for utilities, constants, or factory methods. Inside a static method, **this** is the class. Static members cannot use instance state unless you pass it in.\n\n## Example\n\n```javascript\nclass MathUtil {\n  static double(n) {\n    return n * 2;\n  }\n}\nconsole.log(MathUtil.double(5));\n```\n\n## Output\n\n```\n10\n```\n\n## What happens\n\ndouble is on the class. We call **MathUtil.double(5)** without creating an instance.\n\n## Practice\n\nAdd a static method createDefault() to a class Config that returns new Config() with default values. How do you call it—on an instance or on the class?",
    "Let's run code when a property is read or written using getters and setters.\n\nGetters and setters let you run code when a property is **read** or **written**.\n\n- **get propName() { return ... }** — runs when someone reads **obj.propName**.\n- **set propName(value) { }** — runs when someone writes **obj.propName = x**. Use to validate, compute on read, or hide internal storage (e.g. store in **this._name**, expose as **name**). You can have only a getter (read-only) or only a setter.\n\n## Example\n\n```javascript\nclass Box {\n  get value() {\n    return this._v;\n  }\n  set value(x) {\n    if (typeof x !== 'number') throw new Error('number only');\n    this._v = x;\n  }\n}\n\nconst b = new Box();\nb.value = 42;\nconsole.log(b.value);\n```\n\n## Output\n\n```\n42\n```\n\n## What happens\n\nAssigning **b.value = 42** runs the setter (it checks type); reading **b.value** runs the getter.\n\n## Practice\n\nIn the example, why does assigning b.value = 42 run code instead of just storing 42?"
  ],
  "practise_tasks": [
    {
      "question": "In the example, why do we call super(n) in Dog's constructor?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does d.speak() return \"Rex barks\" and not \"Rex says hi\"?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why is b instanceof A true even though we created b with new B()?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "Add a static method createDefault() to a class Config that returns new Config() with default values. How do you call it—on an instance or on the class?",
      "type": "context_dependent",
      "validation_hint": "Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required."
    },
    {
      "question": "In the example, why does assigning b.value = 42 run code instead of just storing 42?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    }
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that creates a Circle class with static PI.\n  Create a class named Circle with constructor taking radius.\n  Add a static property PI with value 3.14159.\n  Add methods getArea() and getCircumference() using Circle.PI.\n  Examples:\n    createCircleAndCalculate(5, \"getArea\") => 78.53975\n    createCircleAndCalculate(5, \"getCircumference\") => 31.4159\n    createCircleAndCalculate(10, \"getArea\") => 314.159\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCircleAndCalculate(radius, method) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCircleAndCalculate",
      "reference_solution": "function createCircleAndCalculate(radius, method) {\n  class Circle {\n    static PI = 3.14159;\n    constructor(r) {\n      this.radius = r;\n    }\n    getArea() {\n      return this.radius * this.radius * Circle.PI;\n    }\n    getCircumference() {\n      return 2 * Circle.PI * this.radius;\n    }\n  }\n  const c = new Circle(radius);\n  return c[method]();\n}",
      "testCases": [
        { "input": { "radius": 5, "method": "getArea" }, "expectedOutput": "78.53975" },
        { "input": { "radius": 5, "method": "getCircumference" }, "expectedOutput": "31.4159" },
        { "input": { "radius": 10, "method": "getArea" }, "expectedOutput": "314.159" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates a Temperature class with getter/setter.\n  Create a class named Temperature with constructor taking celsius.\n  Add getter fahrenheit that converts celsius to fahrenheit: (C × 9/5) + 32.\n  Add setter fahrenheit that converts fahrenheit to celsius: (F - 32) × 5/9.\n  Examples:\n    createTemperatureAndConvert(0, \"get\") => 32\n    createTemperatureAndConvert(100, \"get\") => 212\n    createTemperatureAndConvert(32, \"set\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createTemperatureAndConvert(value, operation) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createTemperatureAndConvert",
      "reference_solution": "function createTemperatureAndConvert(value, operation) {\n  class Temperature {\n    constructor(c) {\n      this._celsius = c;\n    }\n    get fahrenheit() {\n      return (this._celsius * 9/5) + 32;\n    }\n    set fahrenheit(f) {\n      this._celsius = (f - 32) * 5/9;\n    }\n    getCelsius() {\n      return this._celsius;\n    }\n  }\n  if (operation === 'get') {\n    const t = new Temperature(value);\n    return t.fahrenheit;\n  }\n  const t = new Temperature(0);\n  t.fahrenheit = value;\n  return t.getCelsius();\n}",
      "testCases": [
        { "input": { "value": 0, "operation": "get" }, "expectedOutput": "32" },
        { "input": { "value": 100, "operation": "get" }, "expectedOutput": "212" },
        { "input": { "value": 32, "operation": "set" }, "expectedOutput": "0" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Animal and Dog classes with inheritance.\n  Create a class named Animal with constructor taking name.\n  Add method speak() that returns \"{name} makes a sound\".\n  Create a class Dog that extends Animal.\n  Override speak() to return \"{name} barks\".\n  Examples:\n    createDogAndSpeak(\"Rex\") => \"Rex barks\"\n    createDogAndSpeak(\"Buddy\") => \"Buddy barks\"\n    createDogAndSpeak(\"Max\") => \"Max barks\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createDogAndSpeak(name) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createDogAndSpeak",
      "reference_solution": "function createDogAndSpeak(name) {\n  class Animal {\n    constructor(n) {\n      this.name = n;\n    }\n    speak() {\n      return this.name + ' makes a sound';\n    }\n  }\n  class Dog extends Animal {\n    speak() {\n      return this.name + ' barks';\n    }\n  }\n  return new Dog(name).speak();\n}",
      "testCases": [
        { "input": { "name": "Rex" }, "expectedOutput": "Rex barks" },
        { "input": { "name": "Buddy" }, "expectedOutput": "Buddy barks" },
        { "input": { "name": "Max" }, "expectedOutput": "Max barks" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Vehicle and Car classes with inheritance.\n  Create a class Vehicle with constructor taking brand.\n  Create class Car that extends Vehicle with constructor taking brand and model.\n  Override getInfo() to return \"Brand: {brand}, Model: {model}\".\n  Examples:\n    createCarAndGetInfo(\"Toyota\", \"Camry\") => \"Brand: Toyota, Model: Camry\"\n    createCarAndGetInfo(\"Honda\", \"Civic\") => \"Brand: Honda, Model: Civic\"\n    createCarAndGetInfo(\"Ford\", \"Mustang\") => \"Brand: Ford, Model: Mustang\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCarAndGetInfo(brand, model) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createCarAndGetInfo",
      "reference_solution": "function createCarAndGetInfo(brand, model) {\n  class Vehicle {\n    constructor(b) {\n      this.brand = b;\n    }\n  }\n  class Car extends Vehicle {\n    constructor(b, m) {\n      super(b);\n      this.model = m;\n    }\n    getInfo() {\n      return 'Brand: ' + this.brand + ', Model: ' + this.model;\n    }\n  }\n  return new Car(brand, model).getInfo();\n}",
      "testCases": [
        { "input": { "brand": "Toyota", "model": "Camry" }, "expectedOutput": "Brand: Toyota, Model: Camry" },
        { "input": { "brand": "Honda", "model": "Civic" }, "expectedOutput": "Brand: Honda, Model: Civic" },
        { "input": { "brand": "Ford", "model": "Mustang" }, "expectedOutput": "Brand: Ford, Model: Mustang" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Shape hierarchy with polymorphism.\n  Create a class Shape with method getArea() that returns 0.\n  Create class Square that extends Shape with constructor taking side.\n  Create class Circle that extends Shape with constructor taking radius.\n  Override getArea() methods appropriately.\n  Examples:\n    createShapeAndGetArea(\"Square\", 4) => 16\n    createShapeAndGetArea(\"Circle\", 5) => 78.53975\n    createShapeAndGetArea(\"Square\", 10) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createShapeAndGetArea(type, value) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createShapeAndGetArea",
      "reference_solution": "function createShapeAndGetArea(type, value) {\n  class Shape {\n    getArea() {\n      return 0;\n    }\n  }\n  class Square extends Shape {\n    constructor(side) {\n      super();\n      this.side = side;\n    }\n    getArea() {\n      return this.side * this.side;\n    }\n  }\n  class Circle extends Shape {\n    constructor(r) {\n      super();\n      this.radius = r;\n    }\n    getArea() {\n      return this.radius * this.radius * 3.14159;\n    }\n  }\n  const s = type === 'Square' ? new Square(value) : new Circle(value);\n  return s.getArea();\n}",
      "testCases": [
        { "input": { "type": "Square", "value": 4 }, "expectedOutput": "16" },
        { "input": { "type": "Circle", "value": 5 }, "expectedOutput": "78.53975" },
        { "input": { "type": "Square", "value": 10 }, "expectedOutput": "100" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that demonstrates instanceof with inheritance.\n  Create a class Person with constructor taking name.\n  Create a class Student that extends Person.\n  Create an instance of Student and use instanceof to check class type.\n  Examples:\n    checkInstanceType(\"Alice\", \"Student\") => true\n    checkInstanceType(\"Bob\", \"Person\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction checkInstanceType(name, checkClass) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "checkInstanceType",
      "reference_solution": "function checkInstanceType(name, checkClass) {\n  class Person {\n    constructor(n) {\n      this.name = n;\n    }\n  }\n  class Student extends Person {\n    constructor(n) {\n      super(n);\n    }\n  }\n  const s = new Student(name);\n  return checkClass === 'Student' ? s instanceof Student : s instanceof Person;\n}",
      "testCases": [
        { "input": { "name": "Alice", "checkClass": "Student" }, "expectedOutput": "true" },
        { "input": { "name": "Bob", "checkClass": "Person" }, "expectedOutput": "true" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Calculator class with static methods.\n  Create a class Calculator with static method add(a, b) that returns a + b.\n  Add static method multiply(a, b) that returns a * b.\n  Call the specified static method without creating an instance.\n  Examples:\n    useCalculatorStatic(\"add\", 5, 3) => 8\n    useCalculatorStatic(\"multiply\", 5, 3) => 15\n    useCalculatorStatic(\"add\", 10, 20) => 30\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction useCalculatorStatic(method, a, b) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "useCalculatorStatic",
      "reference_solution": "function useCalculatorStatic(method, a, b) {\n  class Calculator {\n    static add(a, b) {\n      return a + b;\n    }\n    static multiply(a, b) {\n      return a * b;\n    }\n  }\n  return Calculator[method](a, b);\n}",
      "testCases": [
        { "input": { "method": "add", "a": 5, "b": 3 }, "expectedOutput": "8" },
        { "input": { "method": "multiply", "a": 5, "b": 3 }, "expectedOutput": "15" },
        { "input": { "method": "add", "a": 10, "b": 20 }, "expectedOutput": "30" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Book class with static comparison.\n  Create a class Book with constructor taking title, author, pages.\n  Add static method comparePages(book1, book2) that returns the book with more pages.\n  Create two books and use comparePages to find which has more pages.\n  Examples:\n    compareBooksAndGetTitle({\"title\": \"1984\", \"author\": \"Orwell\", \"pages\": 328}, {\"title\": \"Dune\", \"author\": \"Herbert\", \"pages\": 412}) => \"Dune\"\n    compareBooksAndGetTitle({\"title\": \"Hobbit\", \"author\": \"Tolkien\", \"pages\": 500}, {\"title\": \"Harry Potter\", \"author\": \"Rowling\", \"pages\": 300}) => \"Hobbit\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction compareBooksAndGetTitle(book1, book2) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "compareBooksAndGetTitle",
      "reference_solution": "function compareBooksAndGetTitle(book1, book2) {\n  class Book {\n    constructor(title, author, pages) {\n      this.title = title;\n      this.author = author;\n      this.pages = pages;\n    }\n    static comparePages(b1, b2) {\n      return b1.pages >= b2.pages ? b1 : b2;\n    }\n  }\n  const b1 = new Book(book1.title, book1.author, book1.pages);\n  const b2 = new Book(book2.title, book2.author, book2.pages);\n  return Book.comparePages(b1, b2).title;\n}",
      "testCases": [
        { "input": { "book1": { "title": "1984", "author": "Orwell", "pages": 328 }, "book2": { "title": "Dune", "author": "Herbert", "pages": 412 } }, "expectedOutput": "Dune" },
        { "input": { "book1": { "title": "Hobbit", "author": "Tolkien", "pages": 500 }, "book2": { "title": "Harry Potter", "author": "Rowling", "pages": 300 } }, "expectedOutput": "Hobbit" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Employee and Manager classes.\n  Create a class Employee with constructor taking name and salary.\n  Create class Manager that extends Employee.\n  Manager constructor takes name, salary, and department.\n  Add method getDetails() that returns \"{name}, Salary: {salary}, Department: {department}\".\n  Examples:\n    createManagerAndGetDetails(\"Alice\", 80000, \"IT\") => \"Alice, Salary: 80000, Department: IT\"\n    createManagerAndGetDetails(\"Bob\", 90000, \"HR\") => \"Bob, Salary: 90000, Department: HR\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createManagerAndGetDetails(name, salary, department) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createManagerAndGetDetails",
      "reference_solution": "function createManagerAndGetDetails(name, salary, department) {\n  class Employee {\n    constructor(n, s) {\n      this.name = n;\n      this.salary = s;\n    }\n  }\n  class Manager extends Employee {\n    constructor(n, s, d) {\n      super(n, s);\n      this.department = d;\n    }\n    getDetails() {\n      return this.name + ', Salary: ' + this.salary + ', Department: ' + this.department;\n    }\n  }\n  return new Manager(name, salary, department).getDetails();\n}",
      "testCases": [
        { "input": { "name": "Alice", "salary": 80000, "department": "IT" }, "expectedOutput": "Alice, Salary: 80000, Department: IT" },
        { "input": { "name": "Bob", "salary": 90000, "department": "HR" }, "expectedOutput": "Bob, Salary: 90000, Department: HR" }
      ]
    },
    {
      "description": "/*\n  Implement the below function that creates Product class with discount functionality.\n  Create a class Product with constructor taking name and price.\n  Add getter formattedPrice that returns \"$\" + price.\n  Add method applyDiscount(percentage) that reduces price by that percentage.\n  Examples:\n    createProductApplyDiscountAndFormat(\"Laptop\", 1000, 10) => \"$900\"\n    createProductApplyDiscountAndFormat(\"Phone\", 500, 20) => \"$400\"\n    createProductApplyDiscountAndFormat(\"Tablet\", 300, 15) => \"$255\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createProductApplyDiscountAndFormat(name, price, discount) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createProductApplyDiscountAndFormat",
      "reference_solution": "function createProductApplyDiscountAndFormat(name, price, discount) {\n  class Product {\n    constructor(n, p) {\n      this.name = n;\n      this.price = p;\n    }\n    get formattedPrice() {\n      return '$' + this.price;\n    }\n    applyDiscount(pct) {\n      this.price = this.price * (1 - pct/100);\n    }\n  }\n  const p = new Product(name, price);\n  p.applyDiscount(discount);\n  return p.formattedPrice;\n}",
      "testCases": [
        { "input": { "name": "Laptop", "price": 1000, "discount": 10 }, "expectedOutput": "$900" },
        { "input": { "name": "Phone", "price": 500, "discount": 20 }, "expectedOutput": "$400" },
        { "input": { "name": "Tablet", "price": 300, "discount": 15 }, "expectedOutput": "$255" }
      ]
    }
  ]
};
