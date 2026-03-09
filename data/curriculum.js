export const courses = [
  {
    "id": 'javascript',
    "title": 'JavaScript',
    "description": 'Master JavaScript from fundamentals to advanced concepts',
    "topics": [
      {
        "id": 'console-log',
        "title": 'console.log',
        "outcomes": [
          'console.log() basic syntax',
          'String literals (Single vs. Double quotes)',
          'Printing numeric values and decimals',
          'Basic arithmetic expressions in logs',
          'String concatenation (+) and the space problem',
          'Comma-separated logging and auto-spacing',
        ],
        "topic_notes": `## 1. console.log() basic syntax

- Use console.log() to print values.
- Whatever you put inside the parentheses is shown in the console.

\`\`\`javascript
console.log('Hello')
console.log(42)
\`\`\`

## 2. String literals (single vs double quotes)

- Strings can use single quotes or double quotes.
- Use single quotes when the text contains double quotes, so you don't have to escape them.

\`\`\`javascript
console.log('He said "hello"')
console.log("Or use double quotes for the whole string")
\`\`\`

## 3. Printing numbers and arithmetic

- You can log numbers and expressions.
- The expression is evaluated first, then the result is printed.

\`\`\`javascript
console.log(147 + 289)
console.log(100 / 8)
\`\`\`

## 4. String concatenation (+)

- Use + to join strings. There is no automatic space between them.
- "Hello" + "World" gives HelloWorld. Add a space by including " " in between.

\`\`\`javascript
console.log("Hello" + "World")
console.log("Hello" + " " + "World")
\`\`\`

## 5. Comma-separated logging

- console.log(a, b, c) prints each value with a single space between them.
- Handy for mixing text and numbers without concatenation.

\`\`\`javascript
console.log(100, "items", 50 * 2)
\`\`\``,
        "tasks": [
          {
            "description": '// Print the result of 147 + 289\n// Your output should be:\n// 436',
            "solution_type": "script",
            "reference_solution": "console.log(147 + 289)",
            "testCases": [
              {
                "input": {},
                "expectedOutput": '436'
              }
            ]
          },
          {
            "description": '// Print the result of 100 divided by 8\n// Your output should be:\n// 12.5',
            "solution_type": "script",
            "reference_solution": "console.log(100 / 8)",
            "testCases": [
              {
                "input": {},
                "expectedOutput": '12.5'
              }
            ]
          },
          {
            "description": '// Print the result of (15 + 25) * 3 - 10\n// Your output should be:\n// 110',
            "solution_type": "script",
            "reference_solution": "console.log((15 + 25) * 3 - 10)",
            "testCases": [
              {
                "input": {},
                "expectedOutput": '110'
              }
            ]
          },
          {
            "description": '// Print three separate calculations, each on a new line:\n// 45 + 78\n// 200 - 63\n// 12 * 9\n// Your output should be:\n// 123\n// 137\n// 108',
            "solution_type": "script",
            "reference_solution": "console.log(45 + 78)\nconsole.log(200 - 63)\nconsole.log(12 * 9)",
            "testCases": [
              {
                "input": {},
                "expectedOutput": '123\n137\n108'
              }
            ]
          },
          {
            "description": '// Print "Hello" and "World" with exactly one space between them using the + operator\n// Your output should be:\n// Hello World',
            "solution_type": "script",
            "reference_solution": 'console.log("Hello" + " " + "World")',
            "testCases": [
              {
                "input": {},
                "expectedOutput": 'Hello World'
              }
            ]
          },
          {
            "description": '// Print the text "The answer is" followed by the calculation 7 * 6\n// Your output should be:\n// The answer is 42',
            "solution_type": "script",
            "reference_solution": 'console.log("The answer is " + (7 * 6))',
            "testCases": [
              {
                "input": {},
                "expectedOutput": 'The answer is 42'
              }
            ]
          },
          {
            "description": '// Print: He said "JavaScript is amazing"\n// (Include the double quotes in the output)\n// Your output should be:\n// He said "JavaScript is amazing"',
            "solution_type": "script",
            "reference_solution": 'console.log(\'He said "JavaScript is amazing"\')',
            "testCases": [
              {
                "input": {},
                "expectedOutput": 'He said "JavaScript is amazing"'
              }
            ]
          },
          {
            "description": '// Print three values using comma separation: the number 100, the text "items", and the calculation 50 * 2\n// Your output should be:\n// 100 items 100',
            "solution_type": "script",
            "reference_solution": 'console.log(100, "items", 50 * 2)',
            "testCases": [
              {
                "input": {},
                "expectedOutput": '100 items 100'
              }
            ]
          },
        ]
      },
      {
        "id": 'variables-and-constants',
        "title": 'Variables and Constants',
        "outcomes": [
          'Variables',
          'Declaring constants with const',
          'Declaring mutable variables with let',
          'Immutability: Why const cannot be reassigned',
        ],
        "topic_notes": `## 1. Variables

- Variables hold values so you can reuse them later.
- Give each variable a name and assign a value with =.

\`\`\`javascript
let name = 'Sara'
let age = 10
console.log(name, age)
\`\`\`

## 2. Declaring constants with const

- Use const when the value should not change.
- You must assign a value when you declare it.

\`\`\`javascript
const PI = 3.14159
const MAX_SIZE = 100
console.log(PI, MAX_SIZE)
\`\`\`

## 3. Declaring mutable variables with let

- Use let when the value will change later.
- You can assign now and update with = again.

\`\`\`javascript
let count = 0
count = count + 1
count = count + 1
console.log(count)
\`\`\`

## 4. Immutability: Why const cannot be reassigned

- const means the variable cannot be reassigned to a new value.
- You can still change the contents of an object or array stored in const; you cannot do name = somethingElse.

\`\`\`javascript
const id = 42
let score = 0
score = 10
\`\`\``,
        "tasks": [
          {
            "description": '// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 15;\nconst b = 27;\n\n// Create 3 let variables: two for storing a and b, one for swapping\n// Swap the values using the third variable, then print both values after swapping\n// For example, if a = 15 and b = 27, your output should be:\n// 27\n// 15',
            "solution_type": "script",
            "reference_solution": "const a = 15;\nconst b = 27;\nlet valueA = a;\nlet valueB = b;\nlet temp = valueA;\nvalueA = valueB;\nvalueB = temp;\nconsole.log(valueA);\nconsole.log(valueB);",
            "testCases": [
              {
                "input": { "a": 15, "b": 27 },
                "expectedOutput": '27\n15'
              },
              {
                "input": { "a": 100, "b": 200 },
                "expectedOutput": '200\n100'
              },
              {
                "input": { "a": 7, "b": 3 },
                "expectedOutput": '3\n7'
              }
            ]
          },
          {
            "description": '// Do not rename num1, num2, num3, use them as input for your program.\n// While testing we will change their values.\nconst num1 = 5;\nconst num2 = 12;\nconst num3 = 8;\n\n// Calculate a running sum: start with num1, add num2, then add num3\n// Print the sum after each addition\n// For example, if num1 = 5, num2 = 12, num3 = 8, your output should be:\n// 5\n// 17\n// 25',
            "solution_type": "script",
            "reference_solution": "const num1 = 5;\nconst num2 = 12;\nconst num3 = 8;\nlet sum = num1;\nconsole.log(sum);\nsum = sum + num2;\nconsole.log(sum);\nsum = sum + num3;\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "num1": 5, "num2": 12, "num3": 8 },
                "expectedOutput": '5\n17\n25'
              },
              {
                "input": { "num1": 10, "num2": 20, "num3": 30 },
                "expectedOutput": '10\n30\n60'
              },
              {
                "input": { "num1": 1, "num2": 2, "num3": 3 },
                "expectedOutput": '1\n3\n6'
              }
            ]
          },
          {
            "description": '// Do not rename start and increment, use them as input for your program.\n// While testing we will change their values.\nconst start = 10;\nconst increment = 3;\n\n// Create a counter starting at \'start\' and increment it 4 times by \'increment\'\n// Print the counter value after each increment\n// For example, if start = 10 and increment = 3, your output should be:\n// 13\n// 16\n// 19\n// 22',
            "solution_type": "script",
            "reference_solution": "const start = 10;\nconst increment = 3;\nlet counter = start;\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);",
            "testCases": [
              {
                "input": { "start": 10, "increment": 3 },
                "expectedOutput": '13\n16\n19\n22'
              },
              {
                "input": { "start": 0, "increment": 5 },
                "expectedOutput": '5\n10\n15\n20'
              },
              {
                "input": { "start": 100, "increment": 10 },
                "expectedOutput": '110\n120\n130\n140'
              }
            ]
          },
          {
            "description": '// Do not rename celsius, use it as input for your program.\n// While testing we will change its value.\nconst celsius = 100;\n\n// Convert celsius to Fahrenheit using: (celsius * 9/5) + 32, then store that result\n// Convert the Fahrenheit value to Kelvin using: (F - 32) * 5/9 + 273.15\n// Print both converted values (Fahrenheit first, then Kelvin)\n// For example, if celsius = 100, your output should be:\n// 212\n// 373.15',
            "solution_type": "script",
            "reference_solution": "const celsius = 100;\nconst fahrenheit = (celsius * 9 / 5) + 32;\nconst kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;\nconsole.log(fahrenheit);\nconsole.log(kelvin);",
            "testCases": [
              {
                "input": { "celsius": 100 },
                "expectedOutput": '212\n373.15'
              },
              {
                "input": { "celsius": 0 },
                "expectedOutput": '32\n273.15'
              },
              {
                "input": { "celsius": 25 },
                "expectedOutput": '77\n298.15'
              }
            ]
          },
          {
            "description": '// Do not rename principal, rate, time, use them as input for your program.\n// While testing we will change their values.\nconst principal = 1000;\nconst rate = 5;\nconst time = 2;\n\n// Calculate simple interest: (principal * rate * time) / 100\n// Calculate total amount: principal + interest\n// Print the interest and then the total amount\n// For example, if principal = 1000, rate = 5, time = 2, your output should be:\n// 100\n// 1100',
            "solution_type": "script",
            "reference_solution": "const principal = 1000;\nconst rate = 5;\nconst time = 2;\nconst interest = (principal * rate * time) / 100;\nconst total = principal + interest;\nconsole.log(interest);\nconsole.log(total);",
            "testCases": [
              {
                "input": { "principal": 1000, "rate": 5, "time": 2 },
                "expectedOutput": '100\n1100'
              },
              {
                "input": { "principal": 5000, "rate": 10, "time": 3 },
                "expectedOutput": '1500\n6500'
              },
              {
                "input": { "principal": 2000, "rate": 7, "time": 1 },
                "expectedOutput": '140\n2140'
              }
            ]
          },
          {
            "description": '// Do not rename length and width, use them as input for your program.\n// While testing we will change their values.\nconst length = 8;\nconst width = 5;\n\n// Calculate the area and perimeter of a rectangle\n// Area = length * width\n// Perimeter = 2 * (length + width)\n// Print area first, then perimeter\n// For example, if length = 8 and width = 5, your output should be:\n// 40\n// 26',
            "solution_type": "script",
            "reference_solution": "const length = 8;\nconst width = 5;\nconst area = length * width;\nconst perimeter = 2 * (length + width);\nconsole.log(area);\nconsole.log(perimeter);",
            "testCases": [
              {
                "input": { "length": 8, "width": 5 },
                "expectedOutput": '40\n26'
              },
              {
                "input": { "length": 10, "width": 10 },
                "expectedOutput": '100\n40'
              },
              {
                "input": { "length": 12, "width": 7 },
                "expectedOutput": '84\n38'
              }
            ]
          },
          {
            "description": '// Do not rename score1, score2, score3, use them as input for your program.\n// While testing we will change their values.\nconst score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\n\n// Calculate the sum of all scores\n// Calculate the average (sum divided by 3)\n// Print the sum and then the average\n// For example, if scores are 85, 92, 78, your output should be:\n// 255\n// 85',
            "solution_type": "script",
            "reference_solution": "const score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\nconst sum = score1 + score2 + score3;\nconst average = sum / 3;\nconsole.log(sum);\nconsole.log(average);",
            "testCases": [
              {
                "input": { "score1": 85, "score2": 92, "score3": 78 },
                "expectedOutput": '255\n85'
              },
              {
                "input": { "score1": 90, "score2": 90, "score3": 90 },
                "expectedOutput": '270\n90'
              },
              {
                "input": { "score1": 70, "score2": 80, "score3": 100 },
                "expectedOutput": '250\n83.33333333333333'
              }
            ]
          },
          {
            "description": '// Do not rename distance and time, use them as input for your program.\n// While testing we will change their values.\nconst distance = 150;\nconst time = 3;\n\n// Calculate speed: distance / time\n// Calculate double the speed\n// Print original speed and then doubled speed\n// For example, if distance = 150 and time = 3, your output should be:\n// 50\n// 100',
            "solution_type": "script",
            "reference_solution": "const distance = 150;\nconst time = 3;\nconst speed = distance / time;\nconst doubledSpeed = speed * 2;\nconsole.log(speed);\nconsole.log(doubledSpeed);",
            "testCases": [
              {
                "input": { "distance": 150, "time": 3 },
                "expectedOutput": '50\n100'
              },
              {
                "input": { "distance": 200, "time": 4 },
                "expectedOutput": '50\n100'
              },
              {
                "input": { "distance": 360, "time": 6 },
                "expectedOutput": '60\n120'
              }
            ]
          },
          {
            "description": '// Do not rename x, y, z, use them as input for your program.\n// While testing we will change their values.\nconst x = 6;\nconst y = 4;\nconst z = 2;\n\n// Calculate: (x + y) * z\n// Store the result and then calculate: result - x\n// Print both values\n// For example, if x = 6, y = 4, z = 2, your output should be:\n// 20\n// 14',
            "solution_type": "script",
            "reference_solution": "const x = 6;\nconst y = 4;\nconst z = 2;\nconst product = (x + y) * z;\nconst productMinusX = product - x;\nconsole.log(product);\nconsole.log(productMinusX);",
            "testCases": [
              {
                "input": { "x": 6, "y": 4, "z": 2 },
                "expectedOutput": '20\n14'
              },
              {
                "input": { "x": 10, "y": 5, "z": 3 },
                "expectedOutput": '45\n35'
              },
              {
                "input": { "x": 8, "y": 2, "z": 5 },
                "expectedOutput": '50\n42'
              }
            ]
          }
        ]
      },
      {
        "id": 'numbers-and-basic-arithmetic',
        "title": 'Numbers and Basic Arithmetic',
        "outcomes": [
          'Numbers',
          'Basic Arithmetic',
          'Modulo Operator',
          'Operator Precedence',
          'Compound Logic'
        ],
        "topic_notes": `## 1. Numbers

- JavaScript has one number type: integers and decimals are both numbers.
- You can use numbers in variables and in calculations.

\`\`\`javascript
const age = 25
const price = 9.99
console.log(age, price)
\`\`\`

## 2. Basic Arithmetic

- Use + for add, - for subtract, * for multiply, / for divide.
- Division can give a decimal result.

\`\`\`javascript
console.log(10 + 3)
console.log(10 - 3)
console.log(10 * 3)
console.log(10 / 3)
\`\`\`

## 3. Modulo Operator

- % gives the remainder after division.
- Handy for checking even/odd or wrapping values.

\`\`\`javascript
console.log(10 % 3)
console.log(7 % 2)
\`\`\`

## 4. Operator Precedence

- * and / happen before + and -.
- Use parentheses to control order: (a + b) * c.

\`\`\`javascript
console.log(2 + 3 * 4)
console.log((2 + 3) * 4)
\`\`\`

## 5. Compound Logic

- Combine arithmetic in one expression.
- Store results in variables to reuse.

\`\`\`javascript
const sum = 12 + 25 + 18
const average = sum / 3
console.log(sum, average)
\`\`\``,
        "tasks": [
          {
            "description": '// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = 12;\nconst b = 25;\nconst c = 18;\n\n// Calculate and print:\n// 1. Sum of all three numbers\n// 2. Product of all three numbers\n// 3. Average of all three numbers\n// For example, if a = 12, b = 25, c = 18, your output should be:\n// 55\n// 5400\n// 18.333333333333332',
            "solution_type": "script",
            "reference_solution": "const a = 12;\nconst b = 25;\nconst c = 18;\nconst sum = a + b + c;\nconst product = a * b * c;\nconst average = sum / 3;\nconsole.log(sum);\nconsole.log(product);\nconsole.log(average);",
            "testCases": [
              {
                "input": { "a": 12, "b": 25, "c": 18 },
                "expectedOutput": '55\n5400\n18.333333333333332'
              },
              {
                "input": { "a": 10, "b": 20, "c": 30 },
                "expectedOutput": '60\n6000\n20'
              },
              {
                "input": { "a": 0, "b": 5, "c": 10 },
                "expectedOutput": '15\n0\n5'
              },
              {
                "input": { "a": -5, "b": 10, "c": 15 },
                "expectedOutput": '20\n-750\n6.666666666666667'
              },
              {
                "input": { "a": 100, "b": 200, "c": 300 },
                "expectedOutput": '600\n6000000\n200'
              }
            ]
          },
          {
            "description": '// Do not rename obtained and total, use them as input for your program.\n// While testing we will change their values.\nconst obtained = 427;\nconst total = 500;\n\n// Calculate the percentage: (obtained / total) * 100\n// Print the percentage value\n// For example, if obtained = 427 and total = 500, your output should be:\n// 85.4',
            "solution_type": "script",
            "reference_solution": "const obtained = 427;\nconst total = 500;\nconst percentage = (obtained / total) * 100;\nconsole.log(percentage);",
            "testCases": [
              {
                "input": { "obtained": 427, "total": 500 },
                "expectedOutput": '85.4'
              },
              {
                "input": { "obtained": 360, "total": 400 },
                "expectedOutput": '90'
              },
              {
                "input": { "obtained": 75, "total": 150 },
                "expectedOutput": '50'
              },
              {
                "input": { "obtained": 500, "total": 500 },
                "expectedOutput": '100'
              },
              {
                "input": { "obtained": 0, "total": 100 },
                "expectedOutput": '0'
              },
              {
                "input": { "obtained": 33, "total": 100 },
                "expectedOutput": '33'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// num will be a positive integer.\n// While testing we will change its value.\nconst num = 5847;\n\n// Extract and print the last digit of num\n// Hint: Use the modulo operator\n// For example, if num = 5847, your output should be:\n// 7',
            "solution_type": "script",
            "reference_solution": "const num = 5847;\nconst lastDigit = num % 10;\nconsole.log(lastDigit);",
            "testCases": [
              {
                "input": { "num": 5847 },
                "expectedOutput": '7'
              },
              {
                "input": { "num": 1234 },
                "expectedOutput": '4'
              },
              {
                "input": { "num": 9990 },
                "expectedOutput": '0'
              },
              {
                "input": { "num": 5 },
                "expectedOutput": '5'
              },
              {
                "input": { "num": 10000 },
                "expectedOutput": '0'
              }
            ]
          },
          {
            "description": '// Do not rename amount, use it as input for your program.\n// amount will be a positive integer representing total rupees.\n// While testing we will change its value.\nconst amount = 1847;\n\n// Break down the amount into 500, 100, 50, and remaining rupees\n// Calculate how many 500 notes, then from remainder how many 100 notes,\n// then from that remainder how many 50 notes, and finally the remaining amount\n// Print all four values in order\n// For example, if amount = 1847, your output should be:\n// 3\n// 3\n// 0\n// 47',
            "solution_type": "script",
            "reference_solution": "const amount = 1847;\nconst notes500 = (amount - amount % 500) / 500;\nlet remainder = amount % 500;\nconst notes100 = (remainder - remainder % 100) / 100;\nremainder = remainder % 100;\nconst notes50 = (remainder - remainder % 50) / 50;\nremainder = remainder % 50;\nconsole.log(notes500);\nconsole.log(notes100);\nconsole.log(notes50);\nconsole.log(remainder);",
            "testCases": [
              {
                "input": { "amount": 1847 },
                "expectedOutput": '3\n3\n0\n47'
              },
              {
                "input": { "amount": 2750 },
                "expectedOutput": '5\n2\n1\n0'
              },
              {
                "input": { "amount": 649 },
                "expectedOutput": '1\n1\n0\n49'
              },
              {
                "input": { "amount": 25 },
                "expectedOutput": '0\n0\n0\n25'
              },
              {
                "input": { "amount": 500 },
                "expectedOutput": '1\n0\n0\n0'
              },
              {
                "input": { "amount": 3999 },
                "expectedOutput": '7\n4\n1\n49'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 47;\n\n// Calculate the remainder when num is divided by 2\n// Print the remainder (0 for even, 1 for odd)\n// For example, if num = 47, your output should be:\n// 1',
            "solution_type": "script",
            "reference_solution": "const num = 47;\nconst remainder = num % 2;\nconsole.log(remainder);",
            "testCases": [
              {
                "input": { "num": 47 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 100 },
                "expectedOutput": '0'
              },
              {
                "input": { "num": 89 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "num": 1 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 1000 },
                "expectedOutput": '0'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// num will be a two-digit number.\n// While testing we will change its value.\nconst num = 73;\n\n// Reverse the digits and print the reversed number\n// Extract tens and units digits, then form reversed number\n// For example, if num = 73, your output should be:\n// 37',
            "solution_type": "script",
            "reference_solution": "const num = 73;\nconst tens = (num - num % 10) / 10;\nconst units = num % 10;\nconst reversed = units * 10 + tens;\nconsole.log(reversed);",
            "testCases": [
              {
                "input": { "num": 73 },
                "expectedOutput": '37'
              },
              {
                "input": { "num": 45 },
                "expectedOutput": '54'
              },
              {
                "input": { "num": 91 },
                "expectedOutput": '19'
              },
              {
                "input": { "num": 10 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 99 },
                "expectedOutput": '99'
              },
              {
                "input": { "num": 20 },
                "expectedOutput": '2'
              }
            ]
          },
          {
            "description": '// Do not rename principal and rate, use them as input for your program.\n// While testing we will change their values.\nconst principal = 10000;\nconst rate = 8;\n\n// Calculate the amount after 1 year with compound interest\n// Formula: principal * (1 + rate/100)\n// Print the final amount\n// For example, if principal = 10000 and rate = 8, your output should be:\n// 10800',
            "solution_type": "script",
            "reference_solution": "const principal = 10000;\nconst rate = 8;\nconst amount = principal * (1 + rate / 100);\nconsole.log(amount);",
            "testCases": [
              {
                "input": { "principal": 10000, "rate": 8 },
                "expectedOutput": '10800'
              },
              {
                "input": { "principal": 5000, "rate": 10 },
                "expectedOutput": '5500'
              },
              {
                "input": { "principal": 20000, "rate": 5 },
                "expectedOutput": '21000'
              },
              {
                "input": { "principal": 1000, "rate": 0 },
                "expectedOutput": '1000'
              },
              {
                "input": { "principal": 15000, "rate": 12 },
                "expectedOutput": '16800'
              }
            ]
          },
          {
            "description": '// Do not rename a, b, c, d, use them as input for your program.\n// While testing we will change their values.\nconst a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\n\n// Calculate: a + b * c - d\n// Then calculate: (a + b) * (c - d)\n// Print both results\n// For example, if a = 10, b = 5, c = 3, d = 2, your output should be:\n// 23\n// 15',
            "solution_type": "script",
            "reference_solution": "const a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\nconst withoutParentheses = a + b * c - d;\nconst withParentheses = (a + b) * (c - d);\nconsole.log(withoutParentheses);\nconsole.log(withParentheses);",
            "testCases": [
              {
                "input": { "a": 10, "b": 5, "c": 3, "d": 2 },
                "expectedOutput": '23\n15'
              },
              {
                "input": { "a": 20, "b": 4, "c": 5, "d": 3 },
                "expectedOutput": '37\n48'
              },
              {
                "input": { "a": 8, "b": 6, "c": 2, "d": 1 },
                "expectedOutput": '19\n14'
              },
              {
                "input": { "a": 0, "b": 0, "c": 0, "d": 0 },
                "expectedOutput": '0\n0'
              },
              {
                "input": { "a": 100, "b": 10, "c": 2, "d": 1 },
                "expectedOutput": '119\n110'
              },
              {
                "input": { "a": 5, "b": 3, "c": 3, "d": 3 },
                "expectedOutput": '11\n0'
              }
            ]
          },
          {
            "description": '// Do not rename hours, minutes, seconds, use them as input for your program.\n// While testing we will change their values.\nconst hours = 2;\nconst minutes = 15;\nconst seconds = 30;\n\n// Convert the total time to seconds\n// 1 hour = 3600 seconds, 1 minute = 60 seconds\n// Print total seconds\n// For example, if hours = 2, minutes = 15, seconds = 30, your output should be:\n// 8130',
            "solution_type": "script",
            "reference_solution": "const hours = 2;\nconst minutes = 15;\nconst seconds = 30;\nconst totalSeconds = hours * 3600 + minutes * 60 + seconds;\nconsole.log(totalSeconds);",
            "testCases": [
              {
                "input": { "hours": 2, "minutes": 15, "seconds": 30 },
                "expectedOutput": '8130'
              },
              {
                "input": { "hours": 1, "minutes": 0, "seconds": 0 },
                "expectedOutput": '3600'
              },
              {
                "input": { "hours": 0, "minutes": 45, "seconds": 20 },
                "expectedOutput": '2720'
              },
              {
                "input": { "hours": 0, "minutes": 0, "seconds": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "hours": 24, "minutes": 0, "seconds": 0 },
                "expectedOutput": '86400'
              },
              {
                "input": { "hours": 0, "minutes": 1, "seconds": 1 },
                "expectedOutput": '61'
              }
            ]
          },
          {
            "description": '// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n\n// Calculate the area of a circle: π * radius * radius\n// Use 3.14159 as the value of π\n// Print the area\n// For example, if radius = 7, your output should be:\n// 153.93804',
            "solution_type": "script",
            "reference_solution": "const radius = 7;\nconst pi = 3.14159;\nconst area = pi * radius * radius;\nconsole.log(area);",
            "testCases": [
              {
                "input": { "radius": 7 },
                "expectedOutput": '153.93804'
              },
              {
                "input": { "radius": 10 },
                "expectedOutput": '314.159'
              },
              {
                "input": { "radius": 5 },
                "expectedOutput": '78.53975'
              },
              {
                "input": { "radius": 1 },
                "expectedOutput": '3.14159'
              },
              {
                "input": { "radius": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "radius": 100 },
                "expectedOutput": '31415.9'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// num will be a three-digit number.\n// While testing we will change its value.\nconst num = 456;\n\n// Extract all three digits and calculate their sum\n// Use division and modulo operations\n// Print the sum of digits\n// For example, if num = 456, your output should be:\n// 15',
            "solution_type": "script",
            "reference_solution": "const num = 456;\nconst digit1 = (num - num % 100) / 100;\nconst digit2 = (num % 100 - num % 10) / 10;\nconst digit3 = num % 10;\nconst sumOfDigits = digit1 + digit2 + digit3;\nconsole.log(sumOfDigits);",
            "testCases": [
              {
                "input": { "num": 456 },
                "expectedOutput": '15'
              },
              {
                "input": { "num": 123 },
                "expectedOutput": '6'
              },
              {
                "input": { "num": 999 },
                "expectedOutput": '27'
              },
              {
                "input": { "num": 100 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 505 },
                "expectedOutput": '10'
              },
              {
                "input": { "num": 111 },
                "expectedOutput": '3'
              }
            ]
          },
          {
            "description": '// Do not rename costPrice and sellingPrice, use them as input for your program.\n// While testing we will change their values.\nconst costPrice = 850;\nconst sellingPrice = 1020;\n\n// Calculate the profit or loss amount (sellingPrice - costPrice)\n// Then calculate the profit/loss percentage: (difference / costPrice) * 100\n// Print the amount first, then the percentage\n// For example, if costPrice = 850 and sellingPrice = 1020, your output should be:\n// 170\n// 20',
            "solution_type": "script",
            "reference_solution": "const costPrice = 850;\nconst sellingPrice = 1020;\nconst difference = sellingPrice - costPrice;\nconst percentage = (difference / costPrice) * 100;\nconsole.log(difference);\nconsole.log(percentage);",
            "testCases": [
              {
                "input": { "costPrice": 850, "sellingPrice": 1020 },
                "expectedOutput": '170\n20'
              },
              {
                "input": { "costPrice": 1000, "sellingPrice": 1200 },
                "expectedOutput": '200\n20'
              },
              {
                "input": { "costPrice": 500, "sellingPrice": 400 },
                "expectedOutput": '-100\n-20'
              },
              {
                "input": { "costPrice": 1000, "sellingPrice": 1000 },
                "expectedOutput": '0\n0'
              },
              {
                "input": { "costPrice": 200, "sellingPrice": 300 },
                "expectedOutput": '100\n50'
              },
              {
                "input": { "costPrice": 1500, "sellingPrice": 1200 },
                "expectedOutput": '-300\n-20'
              }
            ]
          },
          {
            "description": '// Do not rename n1, n2, n3, n4, n5, use them as input for your program.\n// While testing we will change their values.\nconst n1 = 23;\nconst n2 = 45;\nconst n3 = 67;\nconst n4 = 12;\nconst n5 = 89;\n\n// Calculate the sum of all five numbers\n// Calculate the average by dividing sum by 5\n// Print the average\n// For example, if numbers are 23, 45, 67, 12, 89, your output should be:\n// 47.2',
            "solution_type": "script",
            "reference_solution": "const n1 = 23;\nconst n2 = 45;\nconst n3 = 67;\nconst n4 = 12;\nconst n5 = 89;\nconst sum = n1 + n2 + n3 + n4 + n5;\nconst average = sum / 5;\nconsole.log(average);",
            "testCases": [
              {
                "input": { "n1": 23, "n2": 45, "n3": 67, "n4": 12, "n5": 89 },
                "expectedOutput": '47.2'
              },
              {
                "input": { "n1": 10, "n2": 20, "n3": 30, "n4": 40, "n5": 50 },
                "expectedOutput": '30'
              },
              {
                "input": { "n1": 100, "n2": 200, "n3": 300, "n4": 400, "n5": 500 },
                "expectedOutput": '300'
              },
              {
                "input": { "n1": 0, "n2": 0, "n3": 0, "n4": 0, "n5": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "n1": 5, "n2": 5, "n3": 5, "n4": 5, "n5": 5 },
                "expectedOutput": '5'
              },
              {
                "input": { "n1": -10, "n2": 10, "n3": 20, "n4": 30, "n5": 50 },
                "expectedOutput": '20'
              }
            ]
          },
          {
            "description": '// Do not rename weight and height, use them as input for your program.\n// weight is in kilograms, height is in meters.\n// While testing we will change their values.\nconst weight = 70;\nconst height = 1.75;\n\n// Calculate BMI: weight / (height * height)\n// Print the BMI value\n// For example, if weight = 70 and height = 1.75, your output should be:\n// 22.857142857142858',
            "solution_type": "script",
            "reference_solution": "const weight = 70;\nconst height = 1.75;\nconst bmi = weight / (height * height);\nconsole.log(bmi);",
            "testCases": [
              {
                "input": { "weight": 70, "height": 1.75 },
                "expectedOutput": '22.857142857142858'
              },
              {
                "input": { "weight": 80, "height": 1.8 },
                "expectedOutput": '24.691358024691358'
              },
              {
                "input": { "weight": 60, "height": 1.65 },
                "expectedOutput": '22.038567493112947'
              },
              {
                "input": { "weight": 100, "height": 2.0 },
                "expectedOutput": '25'
              },
              {
                "input": { "weight": 50, "height": 1.5 },
                "expectedOutput": '22.22222222222222'
              },
              {
                "input": { "weight": 90, "height": 1.9 },
                "expectedOutput": '24.930747922437675'
              }
            ]
          }
        ]
      },
      {
        "id": 'built-in-math-utilities',
        "title": 'Built-in Math Utilities',
        "outcomes": [
          'The Math Object: Static Utilities for Computation',
          'Rounding Logic: Math.round() and Math.trunc()',
          'Directional Rounding: Math.floor() and Math.ceil()',
          'Absolute Values and Distance: Math.abs()',
          'Powers and Roots: Math.pow() and Math.sqrt()',
          'Boundary Logic: Finding Math.min() and Math.max()',
          'Stochastic Logic: Generating Math.random()',
          'Formula Design: Scaling Random Numbers to a Range',
          'Mathematical Constants: Math.PI and Math.E'
        ],
        "topic_notes": `## 1. The Math Object: Static Utilities for Computation

- Math is a built-in object with useful number functions.
- Call them as Math.name() — no need to create an instance.

\`\`\`javascript
console.log(Math.round(3.7))
console.log(Math.sqrt(16))
\`\`\`

## 2. Rounding Logic: Math.round() and Math.trunc()

- Math.round() rounds to the nearest integer (0.5 rounds up).
- Math.trunc() drops the decimal part and keeps the integer.

\`\`\`javascript
console.log(Math.round(47.6))
console.log(Math.trunc(47.6))
\`\`\`

## 3. Directional Rounding: Math.floor() and Math.ceil()

- Math.floor() rounds down to the nearest integer.
- Math.ceil() rounds up to the nearest integer.

\`\`\`javascript
console.log(Math.floor(47.6))
console.log(Math.ceil(47.6))
\`\`\`

## 4. Absolute Values and Distance: Math.abs()

- Math.abs(x) returns the absolute value (removes the minus sign).
- Useful for distance or when sign does not matter.

\`\`\`javascript
console.log(Math.abs(-10))
console.log(Math.abs(5 - 12))
\`\`\`

## 5. Powers and Roots: Math.pow() and Math.sqrt()

- Math.pow(base, exponent) raises a number to a power.
- Math.sqrt(x) returns the square root of x.

\`\`\`javascript
console.log(Math.pow(2, 3))
console.log(Math.sqrt(16))
\`\`\`

## 6. Boundary Logic: Finding Math.min() and Math.max()

- Math.min() returns the smallest of the arguments.
- Math.max() returns the largest of the arguments.

\`\`\`javascript
console.log(Math.min(3, 7, 1, 9))
console.log(Math.max(3, 7, 1, 9))
\`\`\`

## 7. Stochastic Logic: Generating Math.random()

- Math.random() returns a decimal from 0 (inclusive) to 1 (exclusive).
- Each call gives a different value.

\`\`\`javascript
console.log(Math.random())
console.log(Math.random())
\`\`\`

## 8. Formula Design: Scaling Random Numbers to a Range

- Multiply by range size and add minimum to get a number in a range.
- Use Math.floor() to get an integer.

\`\`\`javascript
const min = 1
const max = 6
const roll = Math.floor(Math.random() * (max - min + 1)) + min
console.log(roll)
\`\`\`

## 9. Mathematical Constants: Math.PI and Math.E

- Math.PI is the value of pi (about 3.14159).
- Math.E is Euler's number (about 2.718).

\`\`\`javascript
console.log(Math.PI)
console.log(Math.E)
\`\`\``,
        "tasks": [
          {
            "description": '// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 47.6;\n\n// Apply different rounding methods and print the results\n// Print round, floor, ceil, trunc of num in order\n// For example, if num = 47.6, your output should be:\n// 48\n// 47\n// 48\n// 47',
            "solution_type": "script",
            "reference_solution": "const num = 47.6;\nconsole.log(Math.round(num));\nconsole.log(Math.floor(num));\nconsole.log(Math.ceil(num));\nconsole.log(Math.trunc(num));",
            "testCases": [
              {
                "input": { "num": 47.6 },
                "expectedOutput": '48\n47\n48\n47'
              },
              {
                "input": { "num": -47.6 },
                "expectedOutput": '-48\n-48\n-47\n-47'
              },
              {
                "input": { "num": 12.3 },
                "expectedOutput": '12\n12\n13\n12'
              },
              {
                "input": { "num": 99.9 },
                "expectedOutput": '100\n99\n100\n99'
              },
              {
                "input": { "num": 0.5 },
                "expectedOutput": '1\n0\n1\n0'
              },
              {
                "input": { "num": -0.5 },
                "expectedOutput": '-0\n-1\n-0\n-0'
              }
            ]
          },
          {
            "description": '// Do not rename x1, y1, x2, y2, use them as input for your program.\n// While testing we will change their values.\nconst x1 = 3;\nconst y1 = 4;\nconst x2 = 7;\nconst y2 = 1;\n\n// Calculate the distance between points (x1, y1) and (x2, y2)\n// Distance formula: √[(x2-x1)² + (y2-y1)²]\n// Print the distance\n// For example, if points are (3,4) and (7,1), your output should be:\n// 5',
            "solution_type": "script",
            "reference_solution": "const x1 = 3;\nconst y1 = 4;\nconst x2 = 7;\nconst y2 = 1;\nconst distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\nconsole.log(distance);",
            "testCases": [
              {
                "input": { "x1": 3, "y1": 4, "x2": 7, "y2": 1 },
                "expectedOutput": '5'
              },
              {
                "input": { "x1": 0, "y1": 0, "x2": 3, "y2": 4 },
                "expectedOutput": '5'
              },
              {
                "input": { "x1": 1, "y1": 1, "x2": 4, "y2": 5 },
                "expectedOutput": '5'
              },
              {
                "input": { "x1": 0, "y1": 0, "x2": 0, "y2": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "x1": -2, "y1": -3, "x2": 1, "y2": 1 },
                "expectedOutput": '5'
              },
              {
                "input": { "x1": 5, "y1": 5, "x2": 5, "y2": 10 },
                "expectedOutput": '5'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// num will be a positive integer.\n// While testing we will change its value.\nconst num = 144;\n\n// Find the square root of num\n// Verify by squaring the result\n// Print the square root, then the squared verification\n// For example, if num = 144, your output should be:\n// 12\n// 144',
            "solution_type": "script",
            "reference_solution": "const num = 144;\nconst sqrt = Math.sqrt(num);\nconst verification = sqrt * sqrt;\nconsole.log(sqrt);\nconsole.log(verification);",
            "testCases": [
              {
                "input": { "num": 144 },
                "expectedOutput": '12\n144'
              },
              {
                "input": { "num": 64 },
                "expectedOutput": '8\n64'
              },
              {
                "input": { "num": 1 },
                "expectedOutput": '1\n1'
              },
              {
                "input": { "num": 100 },
                "expectedOutput": '10\n100'
              },
              {
                "input": { "num": 625 },
                "expectedOutput": '25\n625'
              },
              {
                "input": { "num": 10000 },
                "expectedOutput": '100\n10000'
              }
            ]
          },
          {
            "description": '// Do not rename a, b, c, d, e, use them as input for your program.\n// While testing we will change their values.\nconst a = 45;\nconst b = 23;\nconst c = 89;\nconst d = 12;\nconst e = 67;\n\n// Find minimum, maximum, and range (max - min)\n// Print min, max, range in order\n// For example, if numbers are 45, 23, 89, 12, 67, your output should be:\n// 12\n// 89\n// 77',
            "solution_type": "script",
            "reference_solution": "const a = 45;\nconst b = 23;\nconst c = 89;\nconst d = 12;\nconst e = 67;\nconst minVal = Math.min(a, b, c, d, e);\nconst maxVal = Math.max(a, b, c, d, e);\nconst range = maxVal - minVal;\nconsole.log(minVal);\nconsole.log(maxVal);\nconsole.log(range);",
            "testCases": [
              {
                "input": { "a": 45, "b": 23, "c": 89, "d": 12, "e": 67 },
                "expectedOutput": '12\n89\n77'
              },
              {
                "input": { "a": 10, "b": 20, "c": 30, "d": 40, "e": 50 },
                "expectedOutput": '10\n50\n40'
              },
              {
                "input": { "a": 100, "b": 100, "c": 100, "d": 100, "e": 100 },
                "expectedOutput": '100\n100\n0'
              },
              {
                "input": { "a": -10, "b": -5, "c": 0, "d": 5, "e": 10 },
                "expectedOutput": '-10\n10\n20'
              },
              {
                "input": { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5 },
                "expectedOutput": '1\n5\n4'
              },
              {
                "input": { "a": 999, "b": 1, "c": 500, "d": 250, "e": 750 },
                "expectedOutput": '1\n999\n998'
              }
            ]
          },
          {
            "description": '// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n\n// Calculate circumference and area of a circle\n// Circumference = 2πr, Area = πr²\n// Print circumference, then area\n// For example, if radius = 7, your output should be:\n// 43.982297150257104\n// 153.93804002589985',
            "solution_type": "script",
            "reference_solution": "const radius = 7;\nconst circumference = 2 * Math.PI * radius;\nconst area = Math.PI * radius * radius;\nconsole.log(circumference);\nconsole.log(area);",
            "testCases": [
              {
                "input": { "radius": 7 },
                "expectedOutput": '43.982297150257104\n153.93804002589985'
              },
              {
                "input": { "radius": 10 },
                "expectedOutput": '62.83185307179586\n314.1592653589793'
              },
              {
                "input": { "radius": 1 },
                "expectedOutput": '6.283185307179586\n3.141592653589793'
              },
              {
                "input": { "radius": 5 },
                "expectedOutput": '31.41592653589793\n78.53981633974483'
              },
              {
                "input": { "radius": 0 },
                "expectedOutput": '0\n0'
              },
              {
                "input": { "radius": 100 },
                "expectedOutput": '628.3185307179587\n31415.926535897932'
              }
            ]
          },
          {
            "description": '// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = 15;\nconst b = 25;\nconst c = 10;\n\n// Calculate absolute difference between a and b\n// Then calculate absolute difference between that result and c\n// Print both absolute differences\n// For example, if a = 15, b = 25, c = 10, your output should be:\n// 10\n// 0',
            "solution_type": "script",
            "reference_solution": "const a = 15;\nconst b = 25;\nconst c = 10;\nconst absDiffAB = Math.abs(a - b);\nconst absDiffFromC = Math.abs(absDiffAB - c);\nconsole.log(absDiffAB);\nconsole.log(absDiffFromC);",
            "testCases": [
              {
                "input": { "a": 15, "b": 25, "c": 10 },
                "expectedOutput": '10\n0'
              },
              {
                "input": { "a": 50, "b": 20, "c": 15 },
                "expectedOutput": '30\n15'
              },
              {
                "input": { "a": 100, "b": 100, "c": 0 },
                "expectedOutput": '0\n0'
              },
              {
                "input": { "a": -10, "b": 10, "c": 20 },
                "expectedOutput": '20\n0'
              },
              {
                "input": { "a": 7, "b": 3, "c": 2 },
                "expectedOutput": '4\n2'
              },
              {
                "input": { "a": 0, "b": 0, "c": 0 },
                "expectedOutput": '0\n0'
              }
            ]
          },
          {
            "description": '// Do not rename principal, rate, time, use them as input for your program.\n// While testing we will change their values.\nconst principal = 1000;\nconst rate = 5;\nconst time = 3;\n\n// Calculate final amount with compound interest\n// Amount = principal × (1 + rate/100)^time\n// Print the final amount\n// For example, if principal = 1000, rate = 5, time = 3, your output should be:\n// 1157.625',
            "solution_type": "script",
            "reference_solution": "const principal = 1000;\nconst rate = 5;\nconst time = 3;\nconst amount = principal * Math.pow(1 + rate / 100, time);\nconsole.log(amount);",
            "testCases": [
              {
                "input": { "principal": 1000, "rate": 5, "time": 3 },
                "expectedOutput": '1157.625'
              },
              {
                "input": { "principal": 5000, "rate": 10, "time": 2 },
                "expectedOutput": '6050'
              },
              {
                "input": { "principal": 2000, "rate": 8, "time": 5 },
                "expectedOutput": '2938.6561536'
              },
              {
                "input": { "principal": 10000, "rate": 0, "time": 10 },
                "expectedOutput": '10000'
              },
              {
                "input": { "principal": 1500, "rate": 6, "time": 1 },
                "expectedOutput": '1590'
              },
              {
                "input": { "principal": 3000, "rate": 12, "time": 4 },
                "expectedOutput": '4722.04364800000'
              }
            ]
          },
          {
            "description": '// Do not rename temp1, temp2, temp3, temp4, temp5, use them as input for your program.\n// While testing we will change their values.\nconst temp1 = 23.5;\nconst temp2 = 19.8;\nconst temp3 = 27.3;\nconst temp4 = 15.2;\nconst temp5 = 21.9;\n\n// Find minimum temperature, maximum temperature, and average\n// Round the average to 2 decimal places\n// Print min, max, rounded average in order\n// For example, if temps are 23.5, 19.8, 27.3, 15.2, 21.9, your output should be:\n// 15.2\n// 27.3\n// 21.54',
            "solution_type": "script",
            "reference_solution": "const temp1 = 23.5;\nconst temp2 = 19.8;\nconst temp3 = 27.3;\nconst temp4 = 15.2;\nconst temp5 = 21.9;\nconst minTemp = Math.min(temp1, temp2, temp3, temp4, temp5);\nconst maxTemp = Math.max(temp1, temp2, temp3, temp4, temp5);\nconst average = (temp1 + temp2 + temp3 + temp4 + temp5) / 5;\nconst roundedAvg = Math.round(average * 100) / 100;\nconsole.log(minTemp);\nconsole.log(maxTemp);\nconsole.log(roundedAvg);",
            "testCases": [
              {
                "input": { "temp1": 23.5, "temp2": 19.8, "temp3": 27.3, "temp4": 15.2, "temp5": 21.9 },
                "expectedOutput": '15.2\n27.3\n21.54'
              },
              {
                "input": { "temp1": 10, "temp2": 20, "temp3": 30, "temp4": 40, "temp5": 50 },
                "expectedOutput": '10\n50\n30'
              },
              {
                "input": { "temp1": 25.5, "temp2": 25.5, "temp3": 25.5, "temp4": 25.5, "temp5": 25.5 },
                "expectedOutput": '25.5\n25.5\n25.5'
              },
              {
                "input": { "temp1": -10, "temp2": -5, "temp3": 0, "temp4": 5, "temp5": 10 },
                "expectedOutput": '-10\n10\n0'
              },
              {
                "input": { "temp1": 32.14, "temp2": 28.76, "temp3": 35.89, "temp4": 30.12, "temp5": 33.55 },
                "expectedOutput": '28.76\n35.89\n32.09'
              },
              {
                "input": { "temp1": 0, "temp2": 0, "temp3": 0, "temp4": 0, "temp5": 1 },
                "expectedOutput": '0\n1\n0.2'
              }
            ]
          },
          {
            "description": '// Do not rename a, b, use them as input for your program.\n// a and b are the two legs of a right triangle.\n// While testing we will change their values.\nconst a = 3;\nconst b = 4;\n\n// Calculate the hypotenuse of the right triangle\n// Pythagorean theorem: c = √(a² + b²)\n// Print the hypotenuse\n// For example, if a = 3 and b = 4, your output should be:\n// 5',
            "solution_type": "script",
            "reference_solution": "const a = 3;\nconst b = 4;\nconst hypotenuse = Math.sqrt(a * a + b * b);\nconsole.log(hypotenuse);",
            "testCases": [
              {
                "input": { "a": 3, "b": 4 },
                "expectedOutput": '5'
              },
              {
                "input": { "a": 5, "b": 12 },
                "expectedOutput": '13'
              },
              {
                "input": { "a": 8, "b": 15 },
                "expectedOutput": '17'
              },
              {
                "input": { "a": 1, "b": 1 },
                "expectedOutput": '1.4142135623730951'
              },
              {
                "input": { "a": 6, "b": 8 },
                "expectedOutput": '10'
              },
              {
                "input": { "a": 9, "b": 12 },
                "expectedOutput": '15'
              }
            ]
          },
          {
            "description": '// Do not rename dividend, divisor, use them as input for your program.\n// While testing we will change their values.\nconst dividend = 47;\nconst divisor = 6;\n\n// Divide dividend by divisor\n// Print the result rounded down, then rounded up\n// For example, if dividend = 47 and divisor = 6, your output should be:\n// 7\n// 8',
            "solution_type": "script",
            "reference_solution": "const dividend = 47;\nconst divisor = 6;\nconst quotient = dividend / divisor;\nconsole.log(Math.floor(quotient));\nconsole.log(Math.ceil(quotient));",
            "testCases": [
              {
                "input": { "dividend": 47, "divisor": 6 },
                "expectedOutput": '7\n8'
              },
              {
                "input": { "dividend": 100, "divisor": 3 },
                "expectedOutput": '33\n34'
              },
              {
                "input": { "dividend": 50, "divisor": 5 },
                "expectedOutput": '10\n10'
              },
              {
                "input": { "dividend": 7, "divisor": 2 },
                "expectedOutput": '3\n4'
              },
              {
                "input": { "dividend": 1, "divisor": 10 },
                "expectedOutput": '0\n1'
              },
              {
                "input": { "dividend": 999, "divisor": 100 },
                "expectedOutput": '9\n10'
              }
            ]
          },
          {
            "description": '// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 5;\n\n// Calculate the volume of a sphere\n// Volume = (4/3) × π × radius³\n// Print the volume\n// For example, if radius = 5, your output should be:\n// 523.5987755982989',
            "solution_type": "script",
            "reference_solution": "const radius = 5;\nconst volume = (4 / 3) * Math.PI * Math.pow(radius, 3);\nconsole.log(volume);",
            "testCases": [
              {
                "input": { "radius": 5 },
                "expectedOutput": '523.5987755982989'
              },
              {
                "input": { "radius": 10 },
                "expectedOutput": '4188.790204786391'
              },
              {
                "input": { "radius": 1 },
                "expectedOutput": '4.1887902047863905'
              },
              {
                "input": { "radius": 3 },
                "expectedOutput": '113.09733552923255'
              },
              {
                "input": { "radius": 0 },
                "expectedOutput": '0'
              },
              {
                "input": { "radius": 7 },
                "expectedOutput": '1436.755040241732'
              }
            ]
          },
          {
            "description": '// Do not rename base, exponent, use them as input for your program.\n// While testing we will change their values.\nconst base = 2;\nconst exponent = 10;\n\n// Calculate base raised to the power of exponent\n// Then calculate the exponent-th root of the result to verify\n// Print the power result, then the root verification\n// For example, if base = 2 and exponent = 10, your output should be:\n// 1024\n// 2',
            "solution_type": "script",
            "reference_solution": "const base = 2;\nconst exponent = 10;\nconst powerResult = Math.pow(base, exponent);\nconst rootVerification = Math.pow(powerResult, 1 / exponent);\nconsole.log(powerResult);\nconsole.log(rootVerification);",
            "testCases": [
              {
                "input": { "base": 2, "exponent": 10 },
                "expectedOutput": '1024\n2'
              },
              {
                "input": { "base": 3, "exponent": 4 },
                "expectedOutput": '81\n3'
              },
              {
                "input": { "base": 5, "exponent": 3 },
                "expectedOutput": '125\n5'
              },
              {
                "input": { "base": 10, "exponent": 2 },
                "expectedOutput": '100\n10'
              },
              {
                "input": { "base": 2, "exponent": 5 },
                "expectedOutput": '32\n2'
              },
              {
                "input": { "base": 4, "exponent": 3 },
                "expectedOutput": '64\n4'
              }
            ]
          },
          {
            "description": '// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 27;\n\n// Calculate the cube root of num\n// Cube root is the same as raising to power (1/3)\n// Print the cube root\n// For example, if num = 27, your output should be:\n// 3',
            "solution_type": "script",
            "reference_solution": "const num = 27;\nconst cubeRoot = Math.pow(num, 1 / 3);\nconsole.log(cubeRoot);",
            "testCases": [
              {
                "input": { "num": 27 },
                "expectedOutput": '3'
              },
              {
                "input": { "num": 64 },
                "expectedOutput": '4'
              },
              {
                "input": { "num": 125 },
                "expectedOutput": '5'
              },
              {
                "input": { "num": 1 },
                "expectedOutput": '1'
              },
              {
                "input": { "num": 8 },
                "expectedOutput": '2'
              },
              {
                "input": { "num": 1000 },
                "expectedOutput": '10'
              }
            ]
          },
          {
            "description": '// Do not rename initial, growthRate, periods, use them as input for your program.\n// While testing we will change their values.\nconst initial = 100;\nconst growthRate = 1.5;\nconst periods = 4;\n\n// Calculate value after exponential growth\n// Final = initial × (growthRate)^periods\n// Print the final value\n// For example, if initial = 100, growthRate = 1.5, periods = 4, your output should be:\n// 506.25',
            "solution_type": "script",
            "reference_solution": "const initial = 100;\nconst growthRate = 1.5;\nconst periods = 4;\nconst final = initial * Math.pow(growthRate, periods);\nconsole.log(final);",
            "testCases": [
              {
                "input": { "initial": 100, "growthRate": 1.5, "periods": 4 },
                "expectedOutput": '506.25'
              },
              {
                "input": { "initial": 200, "growthRate": 2, "periods": 3 },
                "expectedOutput": '1600'
              },
              {
                "input": { "initial": 50, "growthRate": 1.1, "periods": 5 },
                "expectedOutput": '80.52550000000001'
              },
              {
                "input": { "initial": 1000, "growthRate": 1, "periods": 10 },
                "expectedOutput": '1000'
              },
              {
                "input": { "initial": 150, "growthRate": 1.25, "periods": 6 },
                "expectedOutput": '572.204589843750'
              },
              {
                "input": { "initial": 500, "growthRate": 0.5, "periods": 2 },
                "expectedOutput": '125'
              }
            ]
          },
          {
            "description": '// Do not rename a, b, c, use them as input for your program.\n// a, b, c are the three sides of a triangle.\n// While testing we will change their values.\nconst a = 5;\nconst b = 6;\nconst c = 7;\n\n// Calculate the area using Heron\'s formula\n// s = (a + b + c) / 2\n// Area = √[s(s-a)(s-b)(s-c)]\n// Print the area\n// For example, if sides are 5, 6, 7, your output should be:\n// 14.696938456699069',
            "solution_type": "script",
            "reference_solution": "const a = 5;\nconst b = 6;\nconst c = 7;\nconst s = (a + b + c) / 2;\nconst area = Math.sqrt(s * (s - a) * (s - b) * (s - c));\nconsole.log(area);",
            "testCases": [
              {
                "input": { "a": 5, "b": 6, "c": 7 },
                "expectedOutput": '14.696938456699069'
              },
              {
                "input": { "a": 3, "b": 4, "c": 5 },
                "expectedOutput": '6'
              },
              {
                "input": { "a": 13, "b": 14, "c": 15 },
                "expectedOutput": '84'
              },
              {
                "input": { "a": 7, "b": 8, "c": 9 },
                "expectedOutput": '26.832815729997478'
              },
              {
                "input": { "a": 10, "b": 10, "c": 10 },
                "expectedOutput": '43.30127018922193'
              },
              {
                "input": { "a": 6, "b": 8, "c": 10 },
                "expectedOutput": '24'
              }
            ]
          }
        ]
      },
      {
        "id": "undefined-null-basics",
        "title": "Understanding Undefined and Null",
        "outcomes": [
          "The concept of Uninitialized Memory: undefined",
          "Intentional Absence of Value: null",
          "Logical Comparison: undefined vs. null",
          "Using the typeof operator for type inspection"
        ],
        "topic_notes": `## 1. The concept of Uninitialized Memory: undefined

- A variable that is declared but not assigned has the value undefined.
- Functions that do not return a value also give undefined.

\`\`\`javascript
let x
console.log(x)
\`\`\`

## 2. Intentional Absence of Value: null

- null means no value on purpose (you set it).
- Use null when you want to say something is empty or missing.

\`\`\`javascript
let name = null
console.log(name)
\`\`\`

## 3. Logical Comparison: undefined vs. null

- undefined means not set yet; null means set to no value.
- They are not equal when compared with strict equality (===).

\`\`\`javascript
const a = undefined
const b = null
console.log(a === b)
console.log(a == b)
\`\`\`

## 4. Using the typeof operator for type inspection

- typeof returns a string naming the type of a value.
- typeof undefined is "undefined"; typeof null is "object" (a quirk of JavaScript).

\`\`\`javascript
console.log(typeof undefined)
console.log(typeof null)
console.log(typeof 42)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename a, b, c, d, use them as input for your program.\n// While testing we will change their values.\nconst a = undefined;\nconst b = null;\nconst c = 42;\nconst d = \"hello\";\n\n// Print the type of each variable using typeof\n// For example, if a = undefined, b = null, c = 42, d = \"hello\", your output should be:\n// undefined\n// object\n// number\n// string",
            "solution_type": "script",
            "reference_solution": "const a = undefined;\nconst b = null;\nconst c = 42;\nconst d = \"hello\";\nconsole.log(typeof a);\nconsole.log(typeof b);\nconsole.log(typeof c);\nconsole.log(typeof d);",
            "testCases": [
              {
                "input": { "a": null, "b": null, "c": 42, "d": "hello" },
                "expectedOutput": "object\nobject\nnumber\nstring"
              },
              {
                "input": { "a": null, "b": null, "c": 100, "d": "world" },
                "expectedOutput": "object\nobject\nnumber\nstring"
              },
              {
                "input": { "a": null, "b": null, "c": 0, "d": "" },
                "expectedOutput": "object\nobject\nnumber\nstring"
              },
              {
                "input": { "a": null, "b": null, "c": -50, "d": "test" },
                "expectedOutput": "object\nobject\nnumber\nstring"
              },
              {
                "input": { "a": null, "b": null, "c": 3.14, "d": "JavaScript" },
                "expectedOutput": "object\nobject\nnumber\nstring"
              }
            ]
          }
        ]
      },
      {
        "id": "strings-and-basic-operations",
        "title": "Strings and Basic Operations",
        "outcomes": [
          "Strings",
          "String Creation",
          "String Length",
          "String Indexing",
          "String Concatenation",
          "String Case Transformation",
          "String Method Chaining"
        ],
        "topic_notes": `## 1. Strings

- Strings are text: a sequence of characters in single or double quotes.
- You can store them in variables and pass them to functions.

\`\`\`javascript
const greeting = "Hello"
const name = 'Sara'
console.log(greeting, name)
\`\`\`

## 2. String Creation

- Create a string with single quotes, double quotes, or backticks (template literals).
- Quotes must match on each side.

\`\`\`javascript
const a = "double"
const b = 'single'
const c = \`template\`
console.log(a, b, c)
\`\`\`

## 3. String Length

- Every string has a length property: string.length gives the number of characters.
- It is a number (no parentheses after length).

\`\`\`javascript
const word = "JavaScript"
console.log(word.length)
\`\`\`

## 4. String Indexing

- Characters are indexed from 0. Use string[index] to get one character.
- The first character is at index 0, the last at length - 1.

\`\`\`javascript
const str = "Hi"
console.log(str[0])
console.log(str[1])
\`\`\`

## 5. String Concatenation

- Use + to join strings. You can also mix strings and other values (they are converted to strings).

\`\`\`javascript
const first = "Hello"
const second = "World"
console.log(first + " " + second)
\`\`\`

## 6. String Case Transformation

- toUpperCase() returns the string in uppercase. toLowerCase() returns it in lowercase.
- These methods return a new string; they do not change the original.

\`\`\`javascript
const word = "JavaScript"
console.log(word.toUpperCase())
console.log(word.toLowerCase())
\`\`\`

## 7. String Method Chaining

- You can call one method on the result of another: string.method1().method2().
- Order matters: each method works on the value returned by the previous one.

\`\`\`javascript
const text = "  Hello World  "
console.log(text.trim().toLowerCase())
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"JavaScript\";\n\n// Print the length of the string\n// For example, if str = \"JavaScript\", your output should be:\n// 10",
            "solution_type": "script",
            "reference_solution": "const str = \"JavaScript\";\nconsole.log(str.length);",
            "testCases": [
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "10"
              },
              {
                "input": { "str": "Programming" },
                "expectedOutput": "11"
              },
              {
                "input": { "str": "Code" },
                "expectedOutput": "4"
              },
              {
                "input": { "str": "" },
                "expectedOutput": "0"
              },
              {
                "input": { "str": "A" },
                "expectedOutput": "1"
              },
              {
                "input": { "str": "Development" },
                "expectedOutput": "11"
              }
            ]
          },
          {
            "description": "// Do not rename word, use it as input for your program.\n// While testing we will change its value.\nconst word = \"Programming\";\n\n// Print the first character and the last character\n// For example, if word = \"Programming\", your output should be:\n// P\n// g",
            "solution_type": "script",
            "reference_solution": "const word = \"Programming\";\nconsole.log(word[0]);\nconsole.log(word[word.length - 1]);",
            "testCases": [
              {
                "input": { "word": "Programming" },
                "expectedOutput": "P\ng"
              },
              {
                "input": { "word": "JavaScript" },
                "expectedOutput": "J\nt"
              },
              {
                "input": { "word": "Code" },
                "expectedOutput": "C\ne"
              },
              {
                "input": { "word": "A" },
                "expectedOutput": "A\nA"
              },
              {
                "input": { "word": "Algorithm" },
                "expectedOutput": "A\nm"
              },
              {
                "input": { "word": "Function" },
                "expectedOutput": "F\nn"
              }
            ]
          },
          {
            "description": "// Do not rename firstName and lastName, use them as input for your program.\n// While testing we will change their values.\nconst firstName = \"John\";\nconst lastName = \"Smith\";\n\n// Create and print: \"firstName lastName\" and \"lastName, firstName\"\n// For example, if firstName = \"John\" and lastName = \"Smith\", your output should be:\n// John Smith\n// Smith, John",
            "solution_type": "script",
            "reference_solution": "const firstName = \"John\";\nconst lastName = \"Smith\";\nconsole.log(firstName + \" \" + lastName);\nconsole.log(lastName + \", \" + firstName);",
            "testCases": [
              {
                "input": { "firstName": "John", "lastName": "Smith" },
                "expectedOutput": "John Smith\nSmith, John"
              },
              {
                "input": { "firstName": "Alice", "lastName": "Johnson" },
                "expectedOutput": "Alice Johnson\nJohnson, Alice"
              },
              {
                "input": { "firstName": "Bob", "lastName": "Brown" },
                "expectedOutput": "Bob Brown\nBrown, Bob"
              },
              {
                "input": { "firstName": "Emma", "lastName": "Davis" },
                "expectedOutput": "Emma Davis\nDavis, Emma"
              },
              {
                "input": { "firstName": "Michael", "lastName": "Wilson" },
                "expectedOutput": "Michael Wilson\nWilson, Michael"
              },
              {
                "input": { "firstName": "Sarah", "lastName": "Lee" },
                "expectedOutput": "Sarah Lee\nLee, Sarah"
              }
            ]
          },
          {
            "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"Hello World\";\n\n// Transform to uppercase, then get its length\n// Print the uppercase version and its length\n// For example, if text = \"Hello World\", your output should be:\n// HELLO WORLD\n// 11",
            "solution_type": "script",
            "reference_solution": "const text = \"Hello World\";\nconst upper = text.toUpperCase();\nconsole.log(upper);\nconsole.log(upper.length);",
            "testCases": [
              {
                "input": { "text": "Hello World" },
                "expectedOutput": "HELLO WORLD\n11"
              },
              {
                "input": { "text": "JavaScript" },
                "expectedOutput": "JAVASCRIPT\n10"
              },
              {
                "input": { "text": "programming" },
                "expectedOutput": "PROGRAMMING\n11"
              },
              {
                "input": { "text": "Code" },
                "expectedOutput": "CODE\n4"
              },
              {
                "input": { "text": "a" },
                "expectedOutput": "A\n1"
              },
              {
                "input": { "text": "Data Structure" },
                "expectedOutput": "DATA STRUCTURE\n14"
              }
            ]
          },
          {
            "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = \"Data\";\nconst b = \"Base\";\nconst c = \"System\";\n\n// Create: a+b, b+c, and a+b+c\n// Print all three combinations\n// For example, if a = \"Data\", b = \"Base\", c = \"System\", your output should be:\n// DataBase\n// BaseSystem\n// DataBaseSystem",
            "solution_type": "script",
            "reference_solution": "const a = \"Data\";\nconst b = \"Base\";\nconst c = \"System\";\nconsole.log(a + b);\nconsole.log(b + c);\nconsole.log(a + b + c);",
            "testCases": [
              {
                "input": { "a": "Data", "b": "Base", "c": "System" },
                "expectedOutput": "DataBase\nBaseSystem\nDataBaseSystem"
              },
              {
                "input": { "a": "Web", "b": "App", "c": "Dev" },
                "expectedOutput": "WebApp\nAppDev\nWebAppDev"
              },
              {
                "input": { "a": "Java", "b": "Script", "c": "Code" },
                "expectedOutput": "JavaScript\nScriptCode\nJavaScriptCode"
              },
              {
                "input": { "a": "A", "b": "B", "c": "C" },
                "expectedOutput": "AB\nBC\nABC"
              },
              {
                "input": { "a": "Front", "b": "End", "c": "Framework" },
                "expectedOutput": "FrontEnd\nEndFramework\nFrontEndFramework"
              },
              {
                "input": { "a": "Open", "b": "Source", "c": "Project" },
                "expectedOutput": "OpenSource\nSourceProject\nOpenSourceProject"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Function\";\n\n// Print characters at positions 0, 2, 4, and 6\n// For example, if str = \"Function\", your output should be:\n// F\n// n\n// t\n// o",
            "solution_type": "script",
            "reference_solution": "const str = \"Function\";\nconsole.log(str[0]);\nconsole.log(str[2]);\nconsole.log(str[4]);\nconsole.log(str[6]);",
            "testCases": [
              {
                "input": { "str": "Function" },
                "expectedOutput": "F\nn\nt\no"
              },
              {
                "input": { "str": "Programming" },
                "expectedOutput": "P\no\nr\nm"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "J\nv\nS\nr"
              },
              {
                "input": { "str": "Algorithm" },
                "expectedOutput": "A\ng\nr\nt"
              },
              {
                "input": { "str": "Development" },
                "expectedOutput": "D\nv\nl\nm"
              },
              {
                "input": { "str": "Computer" },
                "expectedOutput": "C\nm\nu\ne"
              }
            ]
          },
          {
            "description": "// Do not rename str1 and str2, use them as input for your program.\n// While testing we will change their values.\nconst str1 = \"Computer\";\nconst str2 = \"Science\";\n\n// Calculate: length of str1, length of str2, sum of both lengths, difference of lengths\n// Print all four values\n// For example, if str1 = \"Computer\" and str2 = \"Science\", your output should be:\n// 8\n// 7\n// 15\n// 1",
            "solution_type": "script",
            "reference_solution": "const str1 = \"Computer\";\nconst str2 = \"Science\";\nconst len1 = str1.length;\nconst len2 = str2.length;\nconsole.log(len1);\nconsole.log(len2);\nconsole.log(len1 + len2);\nconsole.log(Math.abs(len1 - len2));",
            "testCases": [
              {
                "input": { "str1": "Computer", "str2": "Science" },
                "expectedOutput": "8\n7\n15\n1"
              },
              {
                "input": { "str1": "JavaScript", "str2": "Programming" },
                "expectedOutput": "10\n11\n21\n1"
              },
              {
                "input": { "str1": "Web", "str2": "Development" },
                "expectedOutput": "3\n11\n14\n8"
              },
              {
                "input": { "str1": "Code", "str2": "Test" },
                "expectedOutput": "4\n4\n8\n0"
              },
              {
                "input": { "str1": "Algorithm", "str2": "Data" },
                "expectedOutput": "9\n4\n13\n5"
              },
              {
                "input": { "str1": "Function", "str2": "Variable" },
                "expectedOutput": "8\n8\n16\n0"
              }
            ]
          },
          {
            "description": "// Do not rename word, use it as input for your program.\n// While testing we will change its value.\nconst word = \"JavaScript\";\n\n// Print original, uppercase version, lowercase version, then length of uppercase\n// For example, if word = \"JavaScript\", your output should be:\n// JavaScript\n// JAVASCRIPT\n// javascript\n// 10",
            "solution_type": "script",
            "reference_solution": "const word = \"JavaScript\";\nconst upper = word.toUpperCase();\nconst lower = word.toLowerCase();\nconsole.log(word);\nconsole.log(upper);\nconsole.log(lower);\nconsole.log(upper.length);",
            "testCases": [
              {
                "input": { "word": "JavaScript" },
                "expectedOutput": "JavaScript\nJAVASCRIPT\njavascript\n10"
              },
              {
                "input": { "word": "Programming" },
                "expectedOutput": "Programming\nPROGRAMMING\nprogramming\n11"
              },
              {
                "input": { "word": "Code" },
                "expectedOutput": "Code\nCODE\ncode\n4"
              },
              {
                "input": { "word": "Algorithm" },
                "expectedOutput": "Algorithm\nALGORITHM\nalgorithm\n9"
              },
              {
                "input": { "word": "Function" },
                "expectedOutput": "Function\nFUNCTION\nfunction\n8"
              },
              {
                "input": { "word": "Variable" },
                "expectedOutput": "Variable\nVARIABLE\nvariable\n8"
              }
            ]
          },
          {
            "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"Algorithm\";\n\n// Extract characters at positions 0, 1, 2 and concatenate them\n// Then extract characters at positions 3, 4, 5 and concatenate them\n// Print both results\n// For example, if text = \"Algorithm\", your output should be:\n// Alg\n// ori",
            "solution_type": "script",
            "reference_solution": "const text = \"Algorithm\";\nconst part1 = text[0] + text[1] + text[2];\nconst part2 = text[3] + text[4] + text[5];\nconsole.log(part1);\nconsole.log(part2);",
            "testCases": [
              {
                "input": { "text": "Algorithm" },
                "expectedOutput": "Alg\nori"
              },
              {
                "input": { "text": "Programming" },
                "expectedOutput": "Pro\ngra"
              },
              {
                "input": { "text": "JavaScript" },
                "expectedOutput": "Jav\nasc"
              },
              {
                "input": { "text": "Function" },
                "expectedOutput": "Fun\nct"
              },
              {
                "input": { "text": "Computer" },
                "expectedOutput": "Com\nput"
              },
              {
                "input": { "text": "Development" },
                "expectedOutput": "Dev\nelo"
              }
            ]
          },
          {
            "description": "// Do not rename input, use it as input for your program.\n// While testing we will change its value.\nconst input = \"programming\";\n\n// Convert to uppercase, then concatenate with original lowercase version\n// Print the combined result and its total length\n// For example, if input = \"programming\", your output should be:\n// PROGRAMMINGprogramming\n// 22",
            "solution_type": "script",
            "reference_solution": "const input = \"programming\";\nconst upper = input.toUpperCase();\nconst combined = upper + input;\nconsole.log(combined);\nconsole.log(combined.length);",
            "testCases": [
              {
                "input": { "input": "programming" },
                "expectedOutput": "PROGRAMMINGprogramming\n22"
              },
              {
                "input": { "input": "javascript" },
                "expectedOutput": "JAVASCRIPTjavascript\n20"
              },
              {
                "input": { "input": "code" },
                "expectedOutput": "CODEcode\n8"
              },
              {
                "input": { "input": "function" },
                "expectedOutput": "FUNCTIONfunction\n16"
              },
              {
                "input": { "input": "algorithm" },
                "expectedOutput": "ALGORITHMalgorithm\n18"
              },
              {
                "input": { "input": "variable" },
                "expectedOutput": "VARIABLEvariable\n16"
              }
            ]
          }
        ]
      },
      {
        "id": "type-coercion",
        "title": "Type Coercion",
        "outcomes": [
          "Introduction to Coercion: Automatic Type Switching",
          "Explicit vs. Implicit: Manual vs. Automatic conversion",
          "The String Bias: Coercion with the + operator",
          "Numeric Focus: Coercion with -, *, and / operators",
          "Boolean Logic: The Truthy and Falsy concept",
          "The \"Not-a-Number\" (NaN) behavior and traps",
          "Equality Logic: Type coercion in == vs. ===",
          "Safe Coding: Strategies to avoid implicit bugs"
        ],
        "topic_notes": `## 1. Introduction to Coercion: Automatic Type Switching

- JavaScript can convert values from one type to another automatically when needed.
- This happens in expressions, function arguments, and when using operators.

\`\`\`javascript
console.log("5" - 2)
console.log("5" * 2)
\`\`\`

## 2. Explicit vs. Implicit: Manual vs. Automatic conversion

- Explicit: you convert on purpose (e.g. Number(str), String(n)).
- Implicit: the engine converts for you (e.g. number + string).

\`\`\`javascript
const str = "42"
console.log(Number(str) + 1)
console.log(str + 1)
\`\`\`

## 3. The String Bias: Coercion with the + operator

- + prefers string: if either side is a string, the other is converted to string and they are concatenated.
- So number + string gives a string, not a number.

\`\`\`javascript
console.log(42 + "10")
console.log("7" + "3")
\`\`\`

## 4. Numeric Focus: Coercion with -, *, and / operators

- -, *, and / try to work with numbers. Strings that look like numbers are converted to numbers.
- If conversion fails, you get NaN.

\`\`\`javascript
console.log("10" - 3)
console.log("10" * 3)
console.log("10" / 2)
\`\`\`

## 5. Boolean Logic: The Truthy and Falsy concept

- In conditions, values are coerced to boolean. Falsy: false, 0, "", null, undefined, NaN.
- Everything else is truthy.

\`\`\`javascript
if ("hello") console.log("truthy")
if (0) console.log("won't run")
else console.log("falsy")
\`\`\`

## 6. The Not-a-Number (NaN) behavior and traps

- NaN is the result of invalid math (e.g. undefined * 2). NaN is not equal to itself: NaN === NaN is false.
- Use Number.isNaN(x) to check for NaN safely.

\`\`\`javascript
console.log(undefined + 10)
console.log(Number.isNaN(NaN))
\`\`\`

## 7. Equality Logic: Type coercion in == vs. ===

- == allows type coercion (e.g. 5 == "5" is true). === checks type and value (5 === "5" is false).
- Prefer === to avoid surprise conversions.

\`\`\`javascript
console.log(5 == "5")
console.log(5 === "5")
\`\`\`

## 8. Safe Coding: Strategies to avoid implicit bugs

- Use === instead of ==. Convert explicitly with Number() or String() when you need a type.
- Check for NaN with Number.isNaN(), not value === NaN.

\`\`\`javascript
const input = "123"
const num = Number(input)
if (!Number.isNaN(num)) console.log(num + 1)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename num and str, use them as input for your program.\n// While testing we will change their values.\nconst num = 42;\nconst str = \"10\";\n\n// Calculate num + str, num - str, num * str\n// Print all three results\n// For example, if num = 42 and str = \"10\", your output should be:\n// 4210\n// 32\n// 420",
            "solution_type": "script",
            "reference_solution": "const num = 42;\nconst str = \"10\";\nconsole.log(num + str);\nconsole.log(num - str);\nconsole.log(num * str);",
            "testCases": [
              {
                "input": { "num": 42, "str": "10" },
                "expectedOutput": "4210\n32\n420"
              },
              {
                "input": { "num": 15, "str": "5" },
                "expectedOutput": "155\n10\n75"
              },
              {
                "input": { "num": 100, "str": "20" },
                "expectedOutput": "10020\n80\n2000"
              },
              {
                "input": { "num": 7, "str": "3" },
                "expectedOutput": "73\n4\n21"
              },
              {
                "input": { "num": 0, "str": "8" },
                "expectedOutput": "08\n-8\n0"
              },
              {
                "input": { "num": 25, "str": "0" },
                "expectedOutput": "250\n25\n0"
              }
            ]
          },
          {
            "description": "// Do not rename flag1 and flag2, use them as input for your program.\n// While testing we will change their values.\nconst flag1 = true;\nconst flag2 = false;\n\n// Calculate flag1 + 5, flag2 + 5, flag1 * 10, flag2 * 10\n// Print all four results\n// For example, if flag1 = true and flag2 = false, your output should be:\n// 6\n// 5\n// 10\n// 0",
            "solution_type": "script",
            "reference_solution": "const flag1 = true;\nconst flag2 = false;\nconsole.log(flag1 + 5);\nconsole.log(flag2 + 5);\nconsole.log(flag1 * 10);\nconsole.log(flag2 * 10);",
            "testCases": [
              {
                "input": { "flag1": true, "flag2": false },
                "expectedOutput": "6\n5\n10\n0"
              },
              {
                "input": { "flag1": false, "flag2": true },
                "expectedOutput": "5\n6\n0\n10"
              },
              {
                "input": { "flag1": true, "flag2": true },
                "expectedOutput": "6\n6\n10\n10"
              },
              {
                "input": { "flag1": false, "flag2": false },
                "expectedOutput": "5\n5\n0\n0"
              }
            ]
          },
          {
            "description": "// Do not rename x and y, use them as input for your program.\n// While testing we will change their values.\nconst x = null;\nconst y = undefined;\n\n// Calculate x + 10, y + 10, x * 2, y * 2\n// Print all four results\n// For example, if x = null and y = undefined, your output should be:\n// 10\n// NaN\n// 0\n// NaN",
            "solution_type": "script",
            "reference_solution": "const x = null;\nconst y = undefined;\nconsole.log(x + 10);\nconsole.log(y + 10);\nconsole.log(x * 2);\nconsole.log(y * 2);",
            "testCases": [
              {
                "input": { "x": null, "y": null },
                "expectedOutput": "10\n10\n0\n0"
              },
              {
                "input": { "x": null, "y": null },
                "expectedOutput": "10\n10\n0\n0"
              },
              {
                "input": { "x": null, "y": null },
                "expectedOutput": "10\n10\n0\n0"
              },
              {
                "input": { "x": null, "y": null },
                "expectedOutput": "10\n10\n0\n0"
              }
            ]
          },
          {
            "description": "// Do not rename val1 and val2, use them as input for your program.\n// While testing we will change their values.\nconst val1 = \"7\";\nconst val2 = \"3\";\n\n// Calculate val1 + val2, val1 - val2, val1 / val2\n// Print all three results\n// For example, if val1 = \"7\" and val2 = \"3\", your output should be:\n// 73\n// 4\n// 2.3333333333333335",
            "solution_type": "script",
            "reference_solution": "const val1 = \"7\";\nconst val2 = \"3\";\nconsole.log(val1 + val2);\nconsole.log(val1 - val2);\nconsole.log(val1 / val2);",
            "testCases": [
              {
                "input": { "val1": "7", "val2": "3" },
                "expectedOutput": "73\n4\n2.3333333333333335"
              },
              {
                "input": { "val1": "12", "val2": "4" },
                "expectedOutput": "124\n8\n3"
              },
              {
                "input": { "val1": "20", "val2": "5" },
                "expectedOutput": "205\n15\n4"
              },
              {
                "input": { "val1": "15", "val2": "2" },
                "expectedOutput": "152\n13\n7.5"
              },
              {
                "input": { "val1": "100", "val2": "10" },
                "expectedOutput": "10010\n90\n10"
              },
              {
                "input": { "val1": "8", "val2": "0" },
                "expectedOutput": "80\n8\nInfinity"
              }
            ]
          },
          {
            "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = \"5\";\nconst b = 5;\nconst c = 0;\n\n// Calculate a == b, a === b, c == false, c === false\n// Print all four boolean results\n// For example, if a = \"5\", b = 5, c = 0, your output should be:\n// true\n// false\n// true\n// false",
            "solution_type": "script",
            "reference_solution": "const a = \"5\";\nconst b = 5;\nconst c = 0;\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(c == false);\nconsole.log(c === false);",
            "testCases": [
              {
                "input": { "a": "5", "b": 5, "c": 0 },
                "expectedOutput": "true\nfalse\ntrue\nfalse"
              },
              {
                "input": { "a": "10", "b": 10, "c": 1 },
                "expectedOutput": "true\nfalse\nfalse\nfalse"
              },
              {
                "input": { "a": "0", "b": 0, "c": 0 },
                "expectedOutput": "true\nfalse\ntrue\nfalse"
              },
              {
                "input": { "a": "7", "b": 7, "c": 1 },
                "expectedOutput": "true\nfalse\nfalse\nfalse"
              },
              {
                "input": { "a": "3", "b": 3, "c": 0 },
                "expectedOutput": "true\nfalse\ntrue\nfalse"
              },
              {
                "input": { "a": "1", "b": 1, "c": 1 },
                "expectedOutput": "true\nfalse\nfalse\nfalse"
              }
            ]
          },
          {
            "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"hello\";\n\n// Calculate text * 1, text - 0, text / 2\n// Print all three results\n// For example, if text = \"hello\", your output should be:\n// NaN\n// NaN\n// NaN",
            "solution_type": "script",
            "reference_solution": "const text = \"hello\";\nconsole.log(text * 1);\nconsole.log(text - 0);\nconsole.log(text / 2);",
            "testCases": [
              {
                "input": { "text": "hello" },
                "expectedOutput": "NaN\nNaN\nNaN"
              },
              {
                "input": { "text": "world" },
                "expectedOutput": "NaN\nNaN\nNaN"
              },
              {
                "input": { "text": "abc" },
                "expectedOutput": "NaN\nNaN\nNaN"
              },
              {
                "input": { "text": "test" },
                "expectedOutput": "NaN\nNaN\nNaN"
              },
              {
                "input": { "text": "javascript" },
                "expectedOutput": "NaN\nNaN\nNaN"
              },
              {
                "input": { "text": "code" },
                "expectedOutput": "NaN\nNaN\nNaN"
              }
            ]
          }
        ]
      },
      {
        "id": "operators-comparison-and-logical",
        "title": "Operators (Comparison & Logical)",
        "outcomes": [
          "Abstract vs. Strict Equality: == vs ===",
          "Relational Operators: >, <, >=, <=",
          "Logical Gates: AND (&&), OR (||), and NOT (!)",
          "Short-circuiting: How JS optimizes logical checks"
        ],
        "topic_notes": `## 1. Abstract vs. Strict Equality: == vs ===

- == (abstract) converts types and then compares. 10 == "10" is true.
- === (strict) compares type and value. 10 === "10" is false. Prefer === to avoid surprises.

\`\`\`javascript
console.log(10 == "10")
console.log(10 === "10")
\`\`\`

## 2. Relational Operators: >, <, >=, <=

- These compare two values and return true or false.
- They try to convert to numbers when needed. Strings are compared by character order if both are strings.

\`\`\`javascript
console.log(5 > 3)
console.log(10 >= 10)
console.log(7 < 12)
\`\`\`

## 3. Logical Gates: AND (&&), OR (||), and NOT (!)

- && is true only when both sides are truthy. || is true when at least one side is truthy.
- ! flips a value to boolean and negates it.

\`\`\`javascript
console.log(true && false)
console.log(true || false)
console.log(!true)
\`\`\`

## 4. Short-circuiting: How JS optimizes logical checks

- && stops at the first falsy value and returns it; if all are truthy, returns the last value.
- || stops at the first truthy value and returns it; if all are falsy, returns the last value.

\`\`\`javascript
console.log(true && "hello")
console.log(false && "hello")
console.log(null || "default")
\`\`\``,
        "tasks": [
          {
            "description": "// Use a and b as input.\n// Print the result of (a == b) followed by (a === b).\nconst a = 10;\nconst b = \"10\";\n\n// For a = 10, b = \"10\", output:\n// true\n// false",
            "solution_type": "script",
            "reference_solution": "const a = 10;\nconst b = \"10\";\nconsole.log(a == b);\nconsole.log(a === b);",
            "testCases": [
              { "input": { "a": 10, "b": "10" }, "expectedOutput": "true\nfalse" },
              { "input": { "a": 0, "b": false }, "expectedOutput": "true\nfalse" },
              { "input": { "a": 1, "b": true }, "expectedOutput": "true\nfalse" }
            ]
          },
          {
            "description": "// Use x as input.\n// Use comparison and logical operators to check if x is between 50 and 100 (inclusive).\n// Print the boolean result.\nconst x = 75;\n\n// For x = 75, output: true",
            "solution_type": "script",
            "reference_solution": "const x = 75;\nconsole.log(x >= 50 && x <= 100);",
            "testCases": [
              { "input": { "x": 75 }, "expectedOutput": "true" },
              { "input": { "x": 50 }, "expectedOutput": "true" },
              { "input": { "x": 101 }, "expectedOutput": "false" },
              { "input": { "x": 49 }, "expectedOutput": "false" }
            ]
          },
          {
            "description": "// Use val as input.\n// Use the NOT (!) operator to print the opposite of the value's truthiness.\n// Then print the 'double NOT' (!!) to show its actual boolean value.\nconst val = \"Hello\";\n\n// For val = \"Hello\", output:\n// false\n// true",
            "solution_type": "script",
            "reference_solution": "const val = \"Hello\";\nconsole.log(!val);\nconsole.log(!!val);",
            "testCases": [
              { "input": { "val": "Hello" }, "expectedOutput": "false\ntrue" },
              { "input": { "val": "" }, "expectedOutput": "true\nfalse" },
              { "input": { "val": 0 }, "expectedOutput": "true\nfalse" }
            ]
          },
          {
            "description": "// Short-circuiting OR (||)\n// Print the value of (input || \"Default\").\n// This mimics assigning a fallback value without an if-statement.\nconst input = \"\";\n\n// For input = \"\", output: Default",
            "solution_type": "script",
            "reference_solution": "const input = \"\";\nconsole.log(input || \"Default\");",
            "testCases": [
              { "input": { "input": "" }, "expectedOutput": "Default" },
              { "input": { "input": "User123" }, "expectedOutput": "User123" },
              { "input": { "input": null }, "expectedOutput": "Default" }
            ]
          },
          {
            "description": "// Short-circuiting AND (&&)\n// Print the value of (isValid && \"Success\").\n// If isValid is false, it should print false. If true, it should print \"Success\".\nconst isValid = true;\n\n// For isValid = true, output: Success",
            "solution_type": "script",
            "reference_solution": "const isValid = true;\nconsole.log(isValid && \"Success\");",
            "testCases": [
              { "input": { "isValid": true }, "expectedOutput": "Success" },
              { "input": { "isValid": false }, "expectedOutput": "false" }
            ]
          },
          {
            "description": "// Relational Strings\n// Print the result of (str1 > str2).\n// This checks alphabetical (Unicode) priority.\nconst str1 = \"apple\";\nconst str2 = \"banana\";\n\n// For \"apple\" > \"banana\", output: false",
            "solution_type": "script",
            "reference_solution": "const str1 = \"apple\";\nconst str2 = \"banana\";\nconsole.log(str1 > str2);",
            "testCases": [
              { "input": { "str1": "apple", "str2": "banana" }, "expectedOutput": "false" },
              { "input": { "str1": "cat", "str2": "can" }, "expectedOutput": "true" },
              { "input": { "str1": "Alpha", "str2": "alpha" }, "expectedOutput": "false" }
            ]
          },
          {
            "description": "// Multiple Logic Gates\n// Check if (a is even) AND (b is even).\n// Print the boolean result.\nconst a = 4;\nconst b = 8;\n\n// For 4 and 8, output: true",
            "solution_type": "script",
            "reference_solution": "const a = 4;\nconst b = 8;\nconsole.log(a % 2 === 0 && b % 2 === 0);",
            "testCases": [
              { "input": { "a": 4, "b": 8 }, "expectedOutput": "true" },
              { "input": { "a": 3, "b": 8 }, "expectedOutput": "false" },
              { "input": { "a": 7, "b": 5 }, "expectedOutput": "false" }
            ]
          }
        ]
      },
      {
        "id": "if-statement",
        "title": "if Statement",
        "outcomes": [
          "The if Statement: Conditional Execution Syntax",
          "Code Blocks: Scope and the Curly Brace {}",
          "Condition Evaluation: Resolving Expressions to Booleans",
          "Truthy Execution: How non-booleans trigger branches"
        ],
        "topic_notes": `## 1. The if Statement: Conditional Execution Syntax

- if (condition) runs the block only when the condition is truthy.
- Write the condition in parentheses, then the block in curly braces.

\`\`\`javascript
const age = 20
if (age >= 18) {
  console.log("You are eligible to vote")
}
\`\`\`

## 2. Code Blocks: Scope and the Curly Brace {}

- Curly braces {} group statements into one block. The block runs as a whole when the if condition is true.
- Variables declared with let or const inside the block are scoped to that block.

\`\`\`javascript
if (true) {
  const message = "inside block"
  console.log(message)
}
\`\`\`

## 3. Condition Evaluation: Resolving Expressions to Booleans

- The condition can be any expression. JavaScript converts its result to boolean (truthy or falsy).
- Comparison operators (>, <, ===, etc.) already produce true or false.

\`\`\`javascript
const score = 85
if (score >= 60) {
  console.log("Pass")
}
\`\`\`

## 4. Truthy Execution: How non-booleans trigger branches

- Truthy values (non-zero numbers, non-empty strings, etc.) make the block run.
- Falsy values (0, "", null, undefined, NaN, false) skip the block.

\`\`\`javascript
if ("hello") console.log("runs")
if (0) console.log("skipped")
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 20;\n\n// Check if age is 18 or greater\n// If true, print: \"You are eligible to vote\"\n// If false, print nothing",
            "solution_type": "script",
            "reference_solution": "const age = 20;\nif (age >= 18) {\n  console.log(\"You are eligible to vote\");\n}",
            "testCases": [
              {
                "input": { "age": 20 },
                "expectedOutput": "You are eligible to vote"
              },
              {
                "input": { "age": 18 },
                "expectedOutput": "You are eligible to vote"
              },
              {
                "input": { "age": 15 },
                "expectedOutput": ""
              },
              {
                "input": { "age": 0 },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 10;\n\n// Check if number is even (divisible by 2)\n// If true, print: \"Even number\"\n// If false, print nothing",
            "solution_type": "script",
            "reference_solution": "const number = 10;\nif (number % 2 === 0) {\n  console.log(\"Even number\");\n}",
            "testCases": [
              {
                "input": { "number": 10 },
                "expectedOutput": "Even number"
              },
              {
                "input": { "number": 0 },
                "expectedOutput": "Even number"
              },
              {
                "input": { "number": 7 },
                "expectedOutput": ""
              },
              {
                "input": { "number": -4 },
                "expectedOutput": "Even number"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Check if the length of str is greater than 3\n// If true, print: \"Long string\"\n// If false, print nothing",
            "solution_type": "script",
            "reference_solution": "const str = \"Hello\";\nif (str.length > 3) {\n  console.log(\"Long string\");\n}",
            "testCases": [
              {
                "input": { "str": "Hello" },
                "expectedOutput": "Long string"
              },
              {
                "input": { "str": "Test" },
                "expectedOutput": "Long string"
              },
              {
                "input": { "str": "Hi" },
                "expectedOutput": ""
              },
              {
                "input": { "str": "Cat" },
                "expectedOutput": ""
              },
              {
                "input": { "str": "" },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 8;\nconst b = 12;\n\n// Check if both a and b are greater than 5\n// If true, print: \"Both numbers are large\"\n// If false, print nothing",
            "solution_type": "script",
            "reference_solution": "const a = 8;\nconst b = 12;\nif (a > 5 && b > 5) {\n  console.log(\"Both numbers are large\");\n}",
            "testCases": [
              {
                "input": { "a": 8, "b": 12 },
                "expectedOutput": "Both numbers are large"
              },
              {
                "input": { "a": 6, "b": 6 },
                "expectedOutput": "Both numbers are large"
              },
              {
                "input": { "a": 4, "b": 10 },
                "expectedOutput": ""
              },
              {
                "input": { "a": 10, "b": 3 },
                "expectedOutput": ""
              },
              {
                "input": { "a": 2, "b": 3 },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "// Do not rename value, use it as input for your program.\n// While testing we will change its value.\nconst value = 0;\n\n// Check if value is truthy (not 0, not empty string, not null, not undefined, not false)\n// If true, print: \"Truthy value\"\n// If false, print nothing\n// Hint: You can use if (value) to check truthiness",
            "solution_type": "script",
            "reference_solution": "const value = 0;\nif (value) {\n  console.log(\"Truthy value\");\n}",
            "testCases": [
              {
                "input": { "value": 5 },
                "expectedOutput": "Truthy value"
              },
              {
                "input": { "value": "Hello" },
                "expectedOutput": "Truthy value"
              },
              {
                "input": { "value": 0 },
                "expectedOutput": ""
              },
              {
                "input": { "value": "" },
                "expectedOutput": ""
              },
              {
                "input": { "value": null },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "// Do not rename x and y, use them as input for your program.\n// While testing we will change their values.\nconst x = 10;\nconst y = 20;\n\n// Check if the sum of x and y is greater than 25\n// If true, print: \"Sum is large\"\n// If false, print nothing",
            "solution_type": "script",
            "reference_solution": "const x = 10;\nconst y = 20;\nif (x + y > 25) {\n  console.log(\"Sum is large\");\n}",
            "testCases": [
              {
                "input": { "x": 10, "y": 20 },
                "expectedOutput": "Sum is large"
              },
              {
                "input": { "x": 15, "y": 15 },
                "expectedOutput": "Sum is large"
              },
              {
                "input": { "x": 10, "y": 15 },
                "expectedOutput": ""
              },
              {
                "input": { "x": 12, "y": 13 },
                "expectedOutput": ""
              },
              {
                "input": { "x": 13, "y": 13 },
                "expectedOutput": "Sum is large"
              }
            ]
          }
        ]
      },
      {
        "id": "if-else-statement",
        "title": "if...else Statement",
        "outcomes": [
          "The else Block: Defining the \"Otherwise\" Path",
          "Binary Logic: Designing Two-Way Decisions",
          "Mutual Exclusivity: Ensuring only one path executes"
        ],
        "topic_notes": `## 1. The else Block: Defining the Otherwise Path

- else follows an if and runs only when the if condition is falsy.
- You get two paths: one when the condition is true, one when it is false.

\`\`\`javascript
const number = 7
if (number % 2 === 0) {
  console.log("Even")
} else {
  console.log("Odd")
}
\`\`\`

## 2. Binary Logic: Designing Two-Way Decisions

- if-else is for exactly two outcomes: do this or do that.
- The condition decides which block runs; the other block is skipped.

\`\`\`javascript
const age = 16
if (age >= 18) {
  console.log("Adult")
} else {
  console.log("Minor")
}
\`\`\`

## 3. Mutual Exclusivity: Ensuring only one path executes

- Only one of the if block or the else block runs, never both.
- After one block runs, the rest of the if-else is skipped.

\`\`\`javascript
const score = 85
if (score >= 60) {
  console.log("Pass")
} else {
  console.log("Fail")
}
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 7;\n\n// Check if number is even or odd\n// If even, print: \"Even\"\n// Otherwise, print: \"Odd\"",
            "solution_type": "script",
            "reference_solution": "const number = 7;\nif (number % 2 === 0) {\n  console.log(\"Even\");\n} else {\n  console.log(\"Odd\");\n}",
            "testCases": [
              {
                "input": { "number": 7 },
                "expectedOutput": "Odd"
              },
              {
                "input": { "number": 10 },
                "expectedOutput": "Even"
              },
              {
                "input": { "number": 0 },
                "expectedOutput": "Even"
              },
              {
                "input": { "number": -3 },
                "expectedOutput": "Odd"
              }
            ]
          },
          {
            "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 16;\n\n// Check if age is 18 or greater\n// If true, print: \"Adult\"\n// Otherwise, print: \"Minor\"",
            "solution_type": "script",
            "reference_solution": "const age = 16;\nif (age >= 18) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Minor\");\n}",
            "testCases": [
              {
                "input": { "age": 16 },
                "expectedOutput": "Minor"
              },
              {
                "input": { "age": 18 },
                "expectedOutput": "Adult"
              },
              {
                "input": { "age": 25 },
                "expectedOutput": "Adult"
              },
              {
                "input": { "age": 0 },
                "expectedOutput": "Minor"
              }
            ]
          },
          {
            "description": "// Do not rename temperature, use it as input for your program.\n// While testing we will change its value.\nconst temperature = 15;\n\n// Check if temperature is greater than 25\n// If true, print: \"Hot\"\n// Otherwise, print: \"Cold\"",
            "solution_type": "script",
            "reference_solution": "const temperature = 15;\nif (temperature > 25) {\n  console.log(\"Hot\");\n} else {\n  console.log(\"Cold\");\n}",
            "testCases": [
              {
                "input": { "temperature": 15 },
                "expectedOutput": "Cold"
              },
              {
                "input": { "temperature": 30 },
                "expectedOutput": "Hot"
              },
              {
                "input": { "temperature": 25 },
                "expectedOutput": "Cold"
              },
              {
                "input": { "temperature": 26 },
                "expectedOutput": "Hot"
              }
            ]
          },
          {
            "description": "// Do not rename score, use it as input for your program.\n// While testing we will change its value.\nconst score = 45;\n\n// Check if score is 50 or greater\n// If true, print: \"Pass\"\n// Otherwise, print: \"Fail\"",
            "solution_type": "script",
            "reference_solution": "const score = 45;\nif (score >= 50) {\n  console.log(\"Pass\");\n} else {\n  console.log(\"Fail\");\n}",
            "testCases": [
              {
                "input": { "score": 45 },
                "expectedOutput": "Fail"
              },
              {
                "input": { "score": 50 },
                "expectedOutput": "Pass"
              },
              {
                "input": { "score": 75 },
                "expectedOutput": "Pass"
              },
              {
                "input": { "score": 0 },
                "expectedOutput": "Fail"
              }
            ]
          },
          {
            "description": "// Do not rename num1 and num2, use them as input for your program.\n// While testing we will change their values.\nconst num1 = 15;\nconst num2 = 20;\n\n// Compare num1 and num2\n// If num1 is greater, print: \"First is larger\"\n// Otherwise, print: \"Second is larger or equal\"",
            "solution_type": "script",
            "reference_solution": "const num1 = 15;\nconst num2 = 20;\nif (num1 > num2) {\n  console.log(\"First is larger\");\n} else {\n  console.log(\"Second is larger or equal\");\n}",
            "testCases": [
              {
                "input": { "num1": 15, "num2": 20 },
                "expectedOutput": "Second is larger or equal"
              },
              {
                "input": { "num1": 30, "num2": 20 },
                "expectedOutput": "First is larger"
              },
              {
                "input": { "num1": 10, "num2": 10 },
                "expectedOutput": "Second is larger or equal"
              },
              {
                "input": { "num1": 5, "num2": 3 },
                "expectedOutput": "First is larger"
              }
            ]
          },
          {
            "description": "// Do not rename year, use it as input for your program.\n// While testing we will change its value.\nconst year = 2023;\n\n// Check if year is divisible by 4 (simplified leap year check)\n// If true, print: \"Leap year\"\n// Otherwise, print: \"Not a leap year\"",
            "solution_type": "script",
            "reference_solution": "const year = 2023;\nif (year % 4 === 0) {\n  console.log(\"Leap year\");\n} else {\n  console.log(\"Not a leap year\");\n}",
            "testCases": [
              {
                "input": { "year": 2023 },
                "expectedOutput": "Not a leap year"
              },
              {
                "input": { "year": 2024 },
                "expectedOutput": "Leap year"
              },
              {
                "input": { "year": 2020 },
                "expectedOutput": "Leap year"
              },
              {
                "input": { "year": 2021 },
                "expectedOutput": "Not a leap year"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Check if str has length greater than 5\n// If true, print: \"Long\"\n// Otherwise, print: \"Short\"",
            "solution_type": "script",
            "reference_solution": "const str = \"Hello\";\nif (str.length > 5) {\n  console.log(\"Long\");\n} else {\n  console.log(\"Short\");\n}",
            "testCases": [
              {
                "input": { "str": "Hello" },
                "expectedOutput": "Short"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "Long"
              },
              {
                "input": { "str": "Hi" },
                "expectedOutput": "Short"
              },
              {
                "input": { "str": "Code!" },
                "expectedOutput": "Short"
              },
              {
                "input": { "str": "Python" },
                "expectedOutput": "Long"
              }
            ]
          }
        ]
      },
      {
        "id": "else-if-chains",
        "title": "else if Chains",
        "outcomes": [
          "The else if Syntax: Expanding Decision Branches",
          "Multi-state Logic: Handling more than two outcomes",
          "The Final else: Creating a Default Fallback",
          "Execution Flow: Why Condition Order Matters"
        ],
        "topic_notes": `## 1. The else if Syntax: Expanding Decision Branches

- else if adds more conditions between if and else. Each has its own condition and block.
- Conditions are checked from top to bottom; the first truthy one runs and the rest are skipped.

\`\`\`javascript
const score = 75
if (score >= 90) {
  console.log("A")
} else if (score >= 80) {
  console.log("B")
} else if (score >= 70) {
  console.log("C")
} else {
  console.log("D or F")
}
\`\`\`

## 2. Multi-state Logic: Handling more than two outcomes

- Use else if when you have three or more distinct cases (e.g. letter grades, ranges).
- Only one branch runs; the rest are skipped after the first match.

\`\`\`javascript
const day = 3
if (day === 1) console.log("Mon")
else if (day === 2) console.log("Tue")
else if (day === 3) console.log("Wed")
else console.log("Other")
\`\`\`

## 3. The Final else: Creating a Default Fallback

- The last else has no condition; it runs when every if and else if above was falsy.
- Use it as a catch-all for any value that did not match the earlier conditions.

\`\`\`javascript
const code = "B"
if (code === "A") console.log("Excellent")
else if (code === "B") console.log("Good")
else console.log("Keep trying")
\`\`\`

## 4. Execution Flow: Why Condition Order Matters

- Put the most specific or strictest conditions first. The first match wins.
- If you check the broad case first, the specific case below may never run.

\`\`\`javascript
const x = 90
if (x >= 60) console.log("Pass")
else if (x >= 90) console.log("A")
else console.log("Fail")
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename score, use it as input for your program.\n// While testing we will change its value.\nconst score = 75;\n\n// Check the grade based on score:\n// If score >= 90, print: \"A\"\n// Else if score >= 80, print: \"B\"\n// Else if score >= 70, print: \"C\"\n// Else if score >= 60, print: \"D\"\n// Otherwise, print: \"F\"",
            "solution_type": "script",
            "reference_solution": "const score = 75;\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 80) {\n  console.log(\"B\");\n} else if (score >= 70) {\n  console.log(\"C\");\n} else if (score >= 60) {\n  console.log(\"D\");\n} else {\n  console.log(\"F\");\n}",
            "testCases": [
              {
                "input": { "score": 75 },
                "expectedOutput": "C"
              },
              {
                "input": { "score": 95 },
                "expectedOutput": "A"
              },
              {
                "input": { "score": 85 },
                "expectedOutput": "B"
              },
              {
                "input": { "score": 60 },
                "expectedOutput": "D"
              },
              {
                "input": { "score": 55 },
                "expectedOutput": "F"
              },
              {
                "input": { "score": 90 },
                "expectedOutput": "A"
              }
            ]
          },
          {
            "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 25;\n\n// Categorize age group:\n// If age < 13, print: \"Child\"\n// Else if age < 20, print: \"Teenager\"\n// Else if age < 60, print: \"Adult\"\n// Otherwise, print: \"Senior\"",
            "solution_type": "script",
            "reference_solution": "const age = 25;\nif (age < 13) {\n  console.log(\"Child\");\n} else if (age < 20) {\n  console.log(\"Teenager\");\n} else if (age < 60) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Senior\");\n}",
            "testCases": [
              {
                "input": { "age": 25 },
                "expectedOutput": "Adult"
              },
              {
                "input": { "age": 10 },
                "expectedOutput": "Child"
              },
              {
                "input": { "age": 15 },
                "expectedOutput": "Teenager"
              },
              {
                "input": { "age": 65 },
                "expectedOutput": "Senior"
              },
              {
                "input": { "age": 13 },
                "expectedOutput": "Teenager"
              },
              {
                "input": { "age": 60 },
                "expectedOutput": "Senior"
              }
            ]
          },
          {
            "description": "// Do not rename temperature, use it as input for your program.\n// While testing we will change its value.\nconst temperature = 22;\n\n// Categorize the weather:\n// If temperature > 30, print: \"Hot\"\n// Else if temperature > 20, print: \"Warm\"\n// Else if temperature > 10, print: \"Cool\"\n// Otherwise, print: \"Cold\"",
            "solution_type": "script",
            "reference_solution": "const temperature = 22;\nif (temperature > 30) {\n  console.log(\"Hot\");\n} else if (temperature > 20) {\n  console.log(\"Warm\");\n} else if (temperature > 10) {\n  console.log(\"Cool\");\n} else {\n  console.log(\"Cold\");\n}",
            "testCases": [
              {
                "input": { "temperature": 22 },
                "expectedOutput": "Warm"
              },
              {
                "input": { "temperature": 35 },
                "expectedOutput": "Hot"
              },
              {
                "input": { "temperature": 15 },
                "expectedOutput": "Cool"
              },
              {
                "input": { "temperature": 5 },
                "expectedOutput": "Cold"
              },
              {
                "input": { "temperature": 30 },
                "expectedOutput": "Warm"
              },
              {
                "input": { "temperature": 31 },
                "expectedOutput": "Hot"
              }
            ]
          },
          {
            "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 0;\n\n// Classify the number:\n// If number > 0, print: \"Positive\"\n// Else if number < 0, print: \"Negative\"\n// Otherwise, print: \"Zero\"",
            "solution_type": "script",
            "reference_solution": "const number = 0;\nif (number > 0) {\n  console.log(\"Positive\");\n} else if (number < 0) {\n  console.log(\"Negative\");\n} else {\n  console.log(\"Zero\");\n}",
            "testCases": [
              {
                "input": { "number": 0 },
                "expectedOutput": "Zero"
              },
              {
                "input": { "number": 10 },
                "expectedOutput": "Positive"
              },
              {
                "input": { "number": -5 },
                "expectedOutput": "Negative"
              },
              {
                "input": { "number": 100 },
                "expectedOutput": "Positive"
              }
            ]
          },
          {
            "description": "// Do not rename dayNumber, use it as input for your program.\n// While testing we will change its value.\nconst dayNumber = 3;\n\n// Convert day number to day name:\n// If dayNumber === 1, print: \"Monday\"\n// Else if dayNumber === 2, print: \"Tuesday\"\n// Else if dayNumber === 3, print: \"Wednesday\"\n// Else if dayNumber === 4, print: \"Thursday\"\n// Else if dayNumber === 5, print: \"Friday\"\n// Else if dayNumber === 6, print: \"Saturday\"\n// Else if dayNumber === 7, print: \"Sunday\"\n// Otherwise, print: \"Invalid day\"",
            "solution_type": "script",
            "reference_solution": "const dayNumber = 3;\nif (dayNumber === 1) {\n  console.log(\"Monday\");\n} else if (dayNumber === 2) {\n  console.log(\"Tuesday\");\n} else if (dayNumber === 3) {\n  console.log(\"Wednesday\");\n} else if (dayNumber === 4) {\n  console.log(\"Thursday\");\n} else if (dayNumber === 5) {\n  console.log(\"Friday\");\n} else if (dayNumber === 6) {\n  console.log(\"Saturday\");\n} else if (dayNumber === 7) {\n  console.log(\"Sunday\");\n} else {\n  console.log(\"Invalid day\");\n}",
            "testCases": [
              {
                "input": { "dayNumber": 3 },
                "expectedOutput": "Wednesday"
              },
              {
                "input": { "dayNumber": 1 },
                "expectedOutput": "Monday"
              },
              {
                "input": { "dayNumber": 7 },
                "expectedOutput": "Sunday"
              },
              {
                "input": { "dayNumber": 5 },
                "expectedOutput": "Friday"
              },
              {
                "input": { "dayNumber": 0 },
                "expectedOutput": "Invalid day"
              },
              {
                "input": { "dayNumber": 10 },
                "expectedOutput": "Invalid day"
              }
            ]
          },
          {
            "description": "// Do not rename hours, use it as input for your program.\n// While testing we will change its value.\nconst hours = 14;\n\n// Determine time of day:\n// If hours < 12, print: \"Morning\"\n// Else if hours < 17, print: \"Afternoon\"\n// Else if hours < 21, print: \"Evening\"\n// Otherwise, print: \"Night\"",
            "solution_type": "script",
            "reference_solution": "const hours = 14;\nif (hours < 12) {\n  console.log(\"Morning\");\n} else if (hours < 17) {\n  console.log(\"Afternoon\");\n} else if (hours < 21) {\n  console.log(\"Evening\");\n} else {\n  console.log(\"Night\");\n}",
            "testCases": [
              {
                "input": { "hours": 14 },
                "expectedOutput": "Afternoon"
              },
              {
                "input": { "hours": 8 },
                "expectedOutput": "Morning"
              },
              {
                "input": { "hours": 18 },
                "expectedOutput": "Evening"
              },
              {
                "input": { "hours": 22 },
                "expectedOutput": "Night"
              },
              {
                "input": { "hours": 12 },
                "expectedOutput": "Afternoon"
              },
              {
                "input": { "hours": 0 },
                "expectedOutput": "Morning"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 15;\n\n// Check divisibility (order matters!):\n// If num is divisible by 15, print: \"Divisible by 15\"\n// Else if num is divisible by 5, print: \"Divisible by 5\"\n// Else if num is divisible by 3, print: \"Divisible by 3\"\n// Otherwise, print: \"Not divisible by 3, 5, or 15\"\n// Note: This demonstrates why condition order matters",
            "solution_type": "script",
            "reference_solution": "const num = 15;\nif (num % 15 === 0) {\n  console.log(\"Divisible by 15\");\n} else if (num % 5 === 0) {\n  console.log(\"Divisible by 5\");\n} else if (num % 3 === 0) {\n  console.log(\"Divisible by 3\");\n} else {\n  console.log(\"Not divisible by 3, 5, or 15\");\n}",
            "testCases": [
              {
                "input": { "num": 15 },
                "expectedOutput": "Divisible by 15"
              },
              {
                "input": { "num": 10 },
                "expectedOutput": "Divisible by 5"
              },
              {
                "input": { "num": 9 },
                "expectedOutput": "Divisible by 3"
              },
              {
                "input": { "num": 30 },
                "expectedOutput": "Divisible by 15"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "Not divisible by 3, 5, or 15"
              },
              {
                "input": { "num": 25 },
                "expectedOutput": "Divisible by 5"
              }
            ]
          },
          {
            "description": "// Do not rename price, use it as input for your program.\n// While testing we will change its value.\nconst price = 1500;\n\n// Determine discount category:\n// If price >= 2000, print: \"20% discount\"\n// Else if price >= 1000, print: \"10% discount\"\n// Else if price >= 500, print: \"5% discount\"\n// Otherwise, print: \"No discount\"",
            "solution_type": "script",
            "reference_solution": "const price = 1500;\nif (price >= 2000) {\n  console.log(\"20% discount\");\n} else if (price >= 1000) {\n  console.log(\"10% discount\");\n} else if (price >= 500) {\n  console.log(\"5% discount\");\n} else {\n  console.log(\"No discount\");\n}",
            "testCases": [
              {
                "input": { "price": 1500 },
                "expectedOutput": "10% discount"
              },
              {
                "input": { "price": 2500 },
                "expectedOutput": "20% discount"
              },
              {
                "input": { "price": 750 },
                "expectedOutput": "5% discount"
              },
              {
                "input": { "price": 300 },
                "expectedOutput": "No discount"
              },
              {
                "input": { "price": 2000 },
                "expectedOutput": "20% discount"
              },
              {
                "input": { "price": 1000 },
                "expectedOutput": "10% discount"
              }
            ]
          }
        ]
      },
      {
        "id": "nested-conditions",
        "title": "Nested Conditions",
        "outcomes": [
          "Nested Structures: Decisions inside Decisions",
          "Execution Hierarchy: Outer vs. Inner Flow",
          "Dependency Logic: Managing Complex Conditional Trees"
        ],
        "topic_notes": `## 1. Nested Structures: Decisions inside Decisions

- You can put an if (or if-else) inside the block of another if. That is nesting.
- The inner condition is only checked when the outer condition is true.

\`\`\`javascript
const age = 20
const hasLicense = true
if (age >= 18) {
  if (hasLicense) {
    console.log("Can drive")
  } else {
    console.log("No license")
  }
} else {
  console.log("Too young")
}
\`\`\`

## 2. Execution Hierarchy: Outer vs. Inner Flow

- The outer if runs first. Only if its condition is true does the inner if run.
- Inner blocks are part of the outer block; indentation helps show the hierarchy.

\`\`\`javascript
const loggedIn = true
const isAdmin = false
if (loggedIn) {
  if (isAdmin) {
    console.log("Admin panel")
  } else {
    console.log("User dashboard")
  }
}
\`\`\`

## 3. Dependency Logic: Managing Complex Conditional Trees

- Use nesting when the second check only makes sense after the first (e.g. age then license).
- Keep nesting shallow when possible; deep nesting is hard to read. Sometimes else if or early returns can simplify.

\`\`\`javascript
const score = 85
const passed = true
if (passed) {
  if (score >= 90) console.log("A")
  else if (score >= 80) console.log("B")
  else console.log("C")
}
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename age and hasLicense, use them as input for your program.\n// While testing we will change their values.\nconst age = 20;\nconst hasLicense = true;\n\n// Check if person can drive:\n// First check if age >= 18\n//   If true, then check if hasLicense is true\n//     If true, print: \"Can drive\"\n//     Otherwise, print: \"Has age but no license\"\n//   Otherwise, print: \"Too young to drive\"",
            "solution_type": "script",
            "reference_solution": "const age = 20;\nconst hasLicense = true;\nif (age >= 18) {\n  if (hasLicense) {\n    console.log(\"Can drive\");\n  } else {\n    console.log(\"Has age but no license\");\n  }\n} else {\n  console.log(\"Too young to drive\");\n}",
            "testCases": [
              {
                "input": { "age": 20, "hasLicense": true },
                "expectedOutput": "Can drive"
              },
              {
                "input": { "age": 20, "hasLicense": false },
                "expectedOutput": "Has age but no license"
              },
              {
                "input": { "age": 16, "hasLicense": true },
                "expectedOutput": "Too young to drive"
              },
              {
                "input": { "age": 16, "hasLicense": false },
                "expectedOutput": "Too young to drive"
              },
              {
                "input": { "age": 18, "hasLicense": true },
                "expectedOutput": "Can drive"
              }
            ]
          },
          {
            "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 12;\n\n// Check if number is positive and even:\n// First check if number > 0\n//   If true, then check if number is even (divisible by 2)\n//     If true, print: \"Positive even number\"\n//     Otherwise, print: \"Positive odd number\"\n//   Otherwise, print: \"Not positive\"",
            "solution_type": "script",
            "reference_solution": "const number = 12;\nif (number > 0) {\n  if (number % 2 === 0) {\n    console.log(\"Positive even number\");\n  } else {\n    console.log(\"Positive odd number\");\n  }\n} else {\n  console.log(\"Not positive\");\n}",
            "testCases": [
              {
                "input": { "number": 12 },
                "expectedOutput": "Positive even number"
              },
              {
                "input": { "number": 7 },
                "expectedOutput": "Positive odd number"
              },
              {
                "input": { "number": -5 },
                "expectedOutput": "Not positive"
              },
              {
                "input": { "number": 0 },
                "expectedOutput": "Not positive"
              },
              {
                "input": { "number": 10 },
                "expectedOutput": "Positive even number"
              }
            ]
          },
          {
            "description": "// Do not rename score and attendance, use them as input for your program.\n// While testing we will change their values.\nconst score = 85;\nconst attendance = 90;\n\n// Determine if student passes with distinction:\n// First check if score >= 75\n//   If true, then check if attendance >= 80\n//     If true, print: \"Pass with distinction\"\n//     Otherwise, print: \"Pass but low attendance\"\n//   Otherwise, print: \"Fail\"",
            "solution_type": "script",
            "reference_solution": "const score = 85;\nconst attendance = 90;\nif (score >= 75) {\n  if (attendance >= 80) {\n    console.log(\"Pass with distinction\");\n  } else {\n    console.log(\"Pass but low attendance\");\n  }\n} else {\n  console.log(\"Fail\");\n}",
            "testCases": [
              {
                "input": { "score": 85, "attendance": 90 },
                "expectedOutput": "Pass with distinction"
              },
              {
                "input": { "score": 80, "attendance": 70 },
                "expectedOutput": "Pass but low attendance"
              },
              {
                "input": { "score": 60, "attendance": 95 },
                "expectedOutput": "Fail"
              },
              {
                "input": { "score": 75, "attendance": 80 },
                "expectedOutput": "Pass with distinction"
              },
              {
                "input": { "score": 90, "attendance": 75 },
                "expectedOutput": "Pass but low attendance"
              }
            ]
          },
          {
            "description": "// Do not rename temperature and isRaining, use them as input for your program.\n// While testing we will change their values.\nconst temperature = 25;\nconst isRaining = false;\n\n// Suggest outdoor activity:\n// First check if temperature > 20\n//   If true, then check if isRaining is false\n//     If true, print: \"Good day for outdoor activity\"\n//     Otherwise, print: \"Warm but raining\"\n//   Otherwise, check if isRaining is false\n//     If true, print: \"Cold but dry\"\n//     Otherwise, print: \"Cold and raining\"",
            "solution_type": "script",
            "reference_solution": "const temperature = 25;\nconst isRaining = false;\nif (temperature > 20) {\n  if (!isRaining) {\n    console.log(\"Good day for outdoor activity\");\n  } else {\n    console.log(\"Warm but raining\");\n  }\n} else {\n  if (!isRaining) {\n    console.log(\"Cold but dry\");\n  } else {\n    console.log(\"Cold and raining\");\n  }\n}",
            "testCases": [
              {
                "input": { "temperature": 25, "isRaining": false },
                "expectedOutput": "Good day for outdoor activity"
              },
              {
                "input": { "temperature": 25, "isRaining": true },
                "expectedOutput": "Warm but raining"
              },
              {
                "input": { "temperature": 15, "isRaining": false },
                "expectedOutput": "Cold but dry"
              },
              {
                "input": { "temperature": 15, "isRaining": true },
                "expectedOutput": "Cold and raining"
              },
              {
                "input": { "temperature": 21, "isRaining": false },
                "expectedOutput": "Good day for outdoor activity"
              }
            ]
          },
          {
            "description": "// Do not rename age and income, use them as input for your program.\n// While testing we will change their values.\nconst age = 30;\nconst income = 50000;\n\n// Determine loan eligibility:\n// First check if age >= 21\n//   If true, then check if age <= 60\n//     If true, then check if income >= 30000\n//       If true, print: \"Eligible for loan\"\n//       Otherwise, print: \"Age OK but income too low\"\n//     Otherwise, print: \"Too old\"\n//   Otherwise, print: \"Too young\"",
            "solution_type": "script",
            "reference_solution": "const age = 30;\nconst income = 50000;\nif (age >= 21) {\n  if (age <= 60) {\n    if (income >= 30000) {\n      console.log(\"Eligible for loan\");\n    } else {\n      console.log(\"Age OK but income too low\");\n    }\n  } else {\n    console.log(\"Too old\");\n  }\n} else {\n  console.log(\"Too young\");\n}",
            "testCases": [
              {
                "input": { "age": 30, "income": 50000 },
                "expectedOutput": "Eligible for loan"
              },
              {
                "input": { "age": 30, "income": 20000 },
                "expectedOutput": "Age OK but income too low"
              },
              {
                "input": { "age": 65, "income": 50000 },
                "expectedOutput": "Too old"
              },
              {
                "input": { "age": 18, "income": 50000 },
                "expectedOutput": "Too young"
              },
              {
                "input": { "age": 21, "income": 30000 },
                "expectedOutput": "Eligible for loan"
              },
              {
                "input": { "age": 60, "income": 40000 },
                "expectedOutput": "Eligible for loan"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 15;\n\n// Classify number in detail:\n// First check if num > 0\n//   If true, then check if num > 10\n//     If true, print: \"Large positive\"\n//     Otherwise, print: \"Small positive\"\n//   Otherwise, check if num < 0\n//     If true, print: \"Negative\"\n//     Otherwise, print: \"Zero\"",
            "solution_type": "script",
            "reference_solution": "const num = 15;\nif (num > 0) {\n  if (num > 10) {\n    console.log(\"Large positive\");\n  } else {\n    console.log(\"Small positive\");\n  }\n} else if (num < 0) {\n  console.log(\"Negative\");\n} else {\n  console.log(\"Zero\");\n}",
            "testCases": [
              {
                "input": { "num": 15 },
                "expectedOutput": "Large positive"
              },
              {
                "input": { "num": 5 },
                "expectedOutput": "Small positive"
              },
              {
                "input": { "num": -8 },
                "expectedOutput": "Negative"
              },
              {
                "input": { "num": 0 },
                "expectedOutput": "Zero"
              },
              {
                "input": { "num": 10 },
                "expectedOutput": "Small positive"
              },
              {
                "input": { "num": 11 },
                "expectedOutput": "Large positive"
              }
            ]
          },
          {
            "description": "// Do not rename isMember, purchaseAmount, use them as input for your program.\n// While testing we will change their values.\nconst isMember = true;\nconst purchaseAmount = 150;\n\n// Calculate discount eligibility:\n// First check if isMember is true\n//   If true, then check if purchaseAmount >= 100\n//     If true, print: \"20% member discount\"\n//     Otherwise, print: \"10% member discount\"\n//   Otherwise, check if purchaseAmount >= 200\n//     If true, print: \"5% non-member discount\"\n//     Otherwise, print: \"No discount\"",
            "solution_type": "script",
            "reference_solution": "const isMember = true;\nconst purchaseAmount = 150;\nif (isMember) {\n  if (purchaseAmount >= 100) {\n    console.log(\"20% member discount\");\n  } else {\n    console.log(\"10% member discount\");\n  }\n} else {\n  if (purchaseAmount >= 200) {\n    console.log(\"5% non-member discount\");\n  } else {\n    console.log(\"No discount\");\n  }\n}",
            "testCases": [
              {
                "input": { "isMember": true, "purchaseAmount": 150 },
                "expectedOutput": "20% member discount"
              },
              {
                "input": { "isMember": true, "purchaseAmount": 80 },
                "expectedOutput": "10% member discount"
              },
              {
                "input": { "isMember": false, "purchaseAmount": 250 },
                "expectedOutput": "5% non-member discount"
              },
              {
                "input": { "isMember": false, "purchaseAmount": 150 },
                "expectedOutput": "No discount"
              },
              {
                "input": { "isMember": true, "purchaseAmount": 100 },
                "expectedOutput": "20% member discount"
              },
              {
                "input": { "isMember": false, "purchaseAmount": 200 },
                "expectedOutput": "5% non-member discount"
              }
            ]
          },
          {
            "description": "// Do not rename year, use it as input for your program.\n// While testing we will change its value.\nconst year = 2024;\n\n// Complete leap year check (nested logic):\n// First check if year is divisible by 4\n//   If true, then check if year is divisible by 100\n//     If true, then check if year is divisible by 400\n//       If true, print: \"Leap year\"\n//       Otherwise, print: \"Not a leap year\"\n//     Otherwise, print: \"Leap year\"\n//   Otherwise, print: \"Not a leap year\"",
            "solution_type": "script",
            "reference_solution": "const year = 2024;\nif (year % 4 === 0) {\n  if (year % 100 === 0) {\n    if (year % 400 === 0) {\n      console.log(\"Leap year\");\n    } else {\n      console.log(\"Not a leap year\");\n    }\n  } else {\n    console.log(\"Leap year\");\n  }\n} else {\n  console.log(\"Not a leap year\");\n}",
            "testCases": [
              {
                "input": { "year": 2024 },
                "expectedOutput": "Leap year"
              },
              {
                "input": { "year": 2000 },
                "expectedOutput": "Leap year"
              },
              {
                "input": { "year": 1900 },
                "expectedOutput": "Not a leap year"
              },
              {
                "input": { "year": 2023 },
                "expectedOutput": "Not a leap year"
              },
              {
                "input": { "year": 2020 },
                "expectedOutput": "Leap year"
              },
              {
                "input": { "year": 1800 },
                "expectedOutput": "Not a leap year"
              }
            ]
          }
        ]
      },
      {
        "id": "date-time",
        "title": "Working with Dates",
        "outcomes": [
          "The Date Object: Tracking time in memory",
          "Capturing the current System Time",
          "Parsing Dates from Strings",
          "Constructing Dates from Numeric Components",
          "The Zero-indexed Month Pitfall",
          "Extracting Components (getMethods)",
          "Modifying Date Objects (setMethods)",
          "The Weekday Integer (getDay)",
          "Unix Timestamps and getTime()",
          "Temporal Logic: Comparing Two Dates",
          "Date Arithmetic: Adding and Subtracting Time",
          "Standard Formatting: ISO and Local Strings"
        ],
        "topic_notes": `## 1. The Date Object: Tracking time in memory

- Date is a built-in object that represents a single moment in time.
- Create one with new Date(); then use methods to read or change it.

\`\`\`javascript
const d = new Date(2025, 0, 15)
console.log(d.toDateString())
\`\`\`

## 2. Capturing the current System Time

- new Date() with no arguments gives the current date and time (now).

\`\`\`javascript
const now = new Date()
console.log(now)
\`\`\`

## 3. Parsing Dates from Strings

- new Date("YYYY-MM-DD") parses an ISO-style date string.
- Other formats may work but can vary by environment.

\`\`\`javascript
const d = new Date("2024-06-15")
console.log(d.getFullYear())
\`\`\`

## 4. Constructing Dates from Numeric Components

- new Date(year, monthIndex, day, ...) builds a date from numbers.
- monthIndex is 0 for January, 11 for December.

\`\`\`javascript
const d = new Date(2025, 0, 1)
console.log(d.toDateString())
\`\`\`

## 5. The Zero-indexed Month Pitfall

- In the Date constructor, month is 0-indexed: 0 = January, 11 = December.
- getMonth() also returns 0–11. Add 1 when showing to users.

\`\`\`javascript
const d = new Date(2024, 2, 10)
console.log(d.getMonth())
\`\`\`

## 6. Extracting Components (getMethods)

- getFullYear(), getMonth(), getDate(), getHours(), getMinutes(), getSeconds() return parts of the date.
- getDay() returns 0 (Sunday) through 6 (Saturday).

\`\`\`javascript
const d = new Date("2024-08-25")
console.log(d.getFullYear(), d.getMonth(), d.getDate())
\`\`\`

## 7. Modifying Date Objects (setMethods)

- setFullYear(), setMonth(), setDate(), setHours(), etc. change the date in place.
- The same Date object is updated; no new Date is created.

\`\`\`javascript
const d = new Date("2024-03-10")
d.setDate(d.getDate() + 7)
console.log(d.toISOString().split("T")[0])
\`\`\`

## 8. The Weekday Integer (getDay)

- getDay() returns 0 for Sunday, 1 for Monday, ... 6 for Saturday.
- Use an array of day names to convert to a string.

\`\`\`javascript
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const d = new Date("2024-08-25")
console.log(days[d.getDay()])
\`\`\`

## 9. Unix Timestamps and getTime()

- getTime() returns milliseconds since Jan 1, 1970 (Unix epoch).
- Use it to compare dates or do arithmetic; then convert back to a Date if needed.

\`\`\`javascript
const d = new Date()
console.log(d.getTime())
\`\`\`

## 10. Temporal Logic: Comparing Two Dates

- Compare two Date objects by comparing their getTime() values, or use >, <, === on the Date objects (they are compared by value).

\`\`\`javascript
const d1 = new Date("2024-01-01")
const d2 = new Date("2024-06-01")
console.log(d1 < d2)
\`\`\`

## 11. Date Arithmetic: Adding and Subtracting Time

- Convert to milliseconds with getTime(), add or subtract, then create a new Date from the result.
- One day = 24 * 60 * 60 * 1000 milliseconds.

\`\`\`javascript
const d = new Date("2024-03-10")
const msPerDay = 24 * 60 * 60 * 1000
const nextWeek = new Date(d.getTime() + 7 * msPerDay)
console.log(nextWeek.toISOString().split("T")[0])
\`\`\`

## 12. Standard Formatting: ISO and Local Strings

- toISOString() gives "YYYY-MM-DDTHH:mm:ss.sssZ" (UTC). toDateString() and toLocaleDateString() give readable local formats.

\`\`\`javascript
const d = new Date("2024-08-15")
console.log(d.toISOString().split("T")[0])
console.log(d.toDateString())
\`\`\``,
        "tasks": [
          {
            "description": "// Create a Date object for January 1, 2025\n// Remember: months are zero-indexed (0 = January, 11 = December)\n// Print the full date using toDateString()\n// Your output should be: Wed Jan 01 2025",
            "solution_type": "script",
            "reference_solution": "const d = new Date(2025, 0, 1);\nconsole.log(d.toDateString());",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Wed Jan 01 2025"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-06-15\";\n\n// Parse the date string and extract the year using getFullYear()\n// Print only the year\n// For \"2024-06-15\", your output should be: 2024",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-06-15\";\nconst d = new Date(dateStr);\nconsole.log(d.getFullYear());",
            "testCases": [
              {
                "input": { "dateStr": "2024-06-15" },
                "expectedOutput": "2024"
              },
              {
                "input": { "dateStr": "2023-12-25" },
                "expectedOutput": "2023"
              },
              {
                "input": { "dateStr": "2025-01-01" },
                "expectedOutput": "2025"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-03-15\";\n\n// Parse the date string and extract the month number\n// Remember: getMonth() returns 0-11, so add 1 for human-readable month\n// Print the month number (1-12)\n// For \"2024-03-15\", your output should be: 3",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-03-15\";\nconst d = new Date(dateStr);\nconsole.log(d.getMonth() + 1);",
            "testCases": [
              {
                "input": { "dateStr": "2024-03-15" },
                "expectedOutput": "3"
              },
              {
                "input": { "dateStr": "2024-01-10" },
                "expectedOutput": "1"
              },
              {
                "input": { "dateStr": "2024-12-25" },
                "expectedOutput": "12"
              },
              {
                "input": { "dateStr": "2024-07-04" },
                "expectedOutput": "7"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-08-25\";\n\n// Parse the date and get the day of the week\n// Use getDay() which returns 0 (Sunday) to 6 (Saturday)\n// Convert to day name and print it\n// For \"2024-08-25\", your output should be: Sunday",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-08-25\";\nconst days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\nconst d = new Date(dateStr);\nconsole.log(days[d.getDay()]);",
            "testCases": [
              {
                "input": { "dateStr": "2024-08-25" },
                "expectedOutput": "Sunday"
              },
              {
                "input": { "dateStr": "2024-08-26" },
                "expectedOutput": "Monday"
              },
              {
                "input": { "dateStr": "2024-08-31" },
                "expectedOutput": "Saturday"
              },
              {
                "input": { "dateStr": "2024-01-01" },
                "expectedOutput": "Monday"
              }
            ]
          },
          {
            "description": "// Create a date for your birthday this year: December 25\n// Extract and print three components on separate lines:\n// - Day of month using getDate()\n// - Month number (remember to add 1 to getMonth())\n// - Year using getFullYear()\n// Your output should be:\n// 25\n// 12\n// 2025",
            "solution_type": "script",
            "reference_solution": "const d = new Date(2025, 11, 25);\nconsole.log(d.getDate());\nconsole.log(d.getMonth() + 1);\nconsole.log(d.getFullYear());",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "25\n12\n2025"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr1 and dateStr2, use them as input for your program.\n// While testing we will change their values.\nconst dateStr1 = \"2024-06-15\";\nconst dateStr2 = \"2024-08-20\";\n\n// Compare two dates and determine which is earlier\n// If dateStr1 is earlier, print: \"First date is earlier\"\n// If dateStr2 is earlier, print: \"Second date is earlier\"\n// If they are the same, print: \"Same date\"\n// Hint: You can compare Date objects directly with < and >",
            "solution_type": "script",
            "reference_solution": "const dateStr1 = \"2024-06-15\";\nconst dateStr2 = \"2024-08-20\";\nconst d1 = new Date(dateStr1);\nconst d2 = new Date(dateStr2);\nif (d1 < d2) {\n  console.log(\"First date is earlier\");\n} else if (d2 < d1) {\n  console.log(\"Second date is earlier\");\n} else {\n  console.log(\"Same date\");\n}",
            "testCases": [
              {
                "input": { "dateStr1": "2024-06-15", "dateStr2": "2024-08-20" },
                "expectedOutput": "First date is earlier"
              },
              {
                "input": { "dateStr1": "2024-12-25", "dateStr2": "2024-01-01" },
                "expectedOutput": "Second date is earlier"
              },
              {
                "input": { "dateStr1": "2024-07-04", "dateStr2": "2024-07-04" },
                "expectedOutput": "Same date"
              },
              {
                "input": { "dateStr1": "2025-01-01", "dateStr2": "2024-12-31" },
                "expectedOutput": "Second date is earlier"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-03-10\";\n\n// Parse the date and add 7 days to it\n// Use getDate() and setDate() methods\n// Print the new date in ISO format (YYYY-MM-DD) using toISOString().split('T')[0]\n// For \"2024-03-10\", your output should be: 2024-03-17",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-03-10\";\nconst d = new Date(dateStr);\nd.setDate(d.getDate() + 7);\nconsole.log(d.toISOString().split('T')[0]);",
            "testCases": [
              {
                "input": { "dateStr": "2024-03-10" },
                "expectedOutput": "2024-03-17"
              },
              {
                "input": { "dateStr": "2024-12-28" },
                "expectedOutput": "2025-01-04"
              },
              {
                "input": { "dateStr": "2024-02-25" },
                "expectedOutput": "2024-03-03"
              },
              {
                "input": { "dateStr": "2024-01-01" },
                "expectedOutput": "2024-01-08"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr1 and dateStr2, use them as input for your program.\n// While testing we will change their values.\nconst dateStr1 = \"2024-01-01\";\nconst dateStr2 = \"2024-01-15\";\n\n// Calculate the difference in days between two dates\n// Use getTime() to get timestamps in milliseconds\n// Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)\n// Print the absolute difference in days\n// For \"2024-01-01\" and \"2024-01-15\", your output should be: 14",
            "solution_type": "script",
            "reference_solution": "const dateStr1 = \"2024-01-01\";\nconst dateStr2 = \"2024-01-15\";\nconst d1 = new Date(dateStr1);\nconst d2 = new Date(dateStr2);\nconst msPerDay = 24 * 60 * 60 * 1000;\nconst diff = d2.getTime() - d1.getTime();\nconst days = diff > 0 ? diff : -diff;\nconsole.log(Math.floor(days / msPerDay));",
            "testCases": [
              {
                "input": { "dateStr1": "2024-01-01", "dateStr2": "2024-01-15" },
                "expectedOutput": "14"
              },
              {
                "input": { "dateStr1": "2024-06-01", "dateStr2": "2024-06-30" },
                "expectedOutput": "29"
              },
              {
                "input": { "dateStr1": "2024-12-25", "dateStr2": "2024-12-31" },
                "expectedOutput": "6"
              },
              {
                "input": { "dateStr1": "2024-01-10", "dateStr2": "2024-01-10" },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "// Create a date for March 15, 2024\n// Modify it to change the month to June (month index 5)\n// Use setMonth() method\n// Print the modified date using toDateString()\n// Your output should be: Sat Jun 15 2024",
            "solution_type": "script",
            "reference_solution": "const d = new Date(2024, 2, 15);\nd.setMonth(5);\nconsole.log(d.toDateString());",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Sat Jun 15 2024"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-07-04\";\n\n// Parse the date and check if it falls on a weekend\n// Use getDay() - it returns 0 for Sunday, 6 for Saturday\n// If weekend (Saturday or Sunday), print: \"Weekend\"\n// Otherwise, print: \"Weekday\"",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-07-04\";\nconst d = new Date(dateStr);\nconst day = d.getDay();\nif (day === 0 || day === 6) {\n  console.log(\"Weekend\");\n} else {\n  console.log(\"Weekday\");\n}",
            "testCases": [
              {
                "input": { "dateStr": "2024-07-04" },
                "expectedOutput": "Weekday"
              },
              {
                "input": { "dateStr": "2024-07-06" },
                "expectedOutput": "Weekend"
              },
              {
                "input": { "dateStr": "2024-07-07" },
                "expectedOutput": "Weekend"
              },
              {
                "input": { "dateStr": "2024-07-08" },
                "expectedOutput": "Weekday"
              }
            ]
          },
          {
            "description": "// Do not rename year, month, day (use them as input for your program).\n// While testing we will change their values.\nconst year = 2024;\nconst month = 2;  // Human-readable month (1-12)\nconst day = 29;\n\n// Create a Date object using year, month, and day\n// Remember: Date constructor uses 0-indexed months, so subtract 1 from month\n// Check if the date is valid by comparing if the day matches\n// If valid, print: \"Valid date\"\n// If invalid (e.g., Feb 30), print: \"Invalid date\"\n// Hint: new Date(2024, 1, 30) will roll over to March, so getDate() won't match",
            "solution_type": "script",
            "reference_solution": "const year = 2024;\nconst month = 2;\nconst day = 29;\nconst d = new Date(year, month - 1, day);\nif (d.getDate() === day && d.getMonth() === month - 1 && d.getFullYear() === year) {\n  console.log(\"Valid date\");\n} else {\n  console.log(\"Invalid date\");\n}",
            "testCases": [
              {
                "input": { "year": 2024, "month": 2, "day": 29 },
                "expectedOutput": "Valid date"
              },
              {
                "input": { "year": 2024, "month": 2, "day": 30 },
                "expectedOutput": "Invalid date"
              },
              {
                "input": { "year": 2024, "month": 4, "day": 31 },
                "expectedOutput": "Invalid date"
              },
              {
                "input": { "year": 2024, "month": 12, "day": 31 },
                "expectedOutput": "Valid date"
              }
            ]
          },
          {
            "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-08-15\";\n\n// Parse the date and format it as \"Month Day, Year\"\n// Create an array of month names: [\"January\", \"February\", ...]\n// Use getMonth(), getDate(), and getFullYear()\n// For \"2024-08-15\", your output should be: August 15, 2024",
            "solution_type": "script",
            "reference_solution": "const dateStr = \"2024-08-15\";\nconst months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\nconst d = new Date(dateStr);\nconsole.log(months[d.getMonth()] + \" \" + d.getDate() + \", \" + d.getFullYear());",
            "testCases": [
              {
                "input": { "dateStr": "2024-08-15" },
                "expectedOutput": "August 15, 2024"
              },
              {
                "input": { "dateStr": "2024-01-01" },
                "expectedOutput": "January 1, 2024"
              },
              {
                "input": { "dateStr": "2024-12-25" },
                "expectedOutput": "December 25, 2024"
              },
              {
                "input": { "dateStr": "2024-07-04" },
                "expectedOutput": "July 4, 2024"
              }
            ]
          }
        ]
      },
      {
        "id": "while-loops",
        "title": "while Loops",
        "outcomes": [
          "The while Loop: Iterative Execution Syntax",
          "The Loop Condition: Controlling the Entry Gate",
          "The Counter Pattern: Tracking Iteration State",
          "Loop Termination: Ensuring a Safe Exit",
          "Infinite Loop Risk: Managing System Resources"
        ],
        "topic_notes": `## 1. The while Loop: Iterative Execution Syntax

- while (condition) { ... } repeats the block as long as the condition is truthy.
- The condition is checked before each iteration; if false, the loop stops.

\`\`\`javascript
let i = 1
while (i <= 3) {
  console.log(i)
  i++
}
\`\`\`

## 2. The Loop Condition: Controlling the Entry Gate

- The condition decides whether the loop body runs. It is evaluated at the start of each iteration.
- Use comparisons (e.g. i < 10) or other expressions that become false when you want to stop.

\`\`\`javascript
let count = 0
while (count < 3) {
  console.log("tick")
  count++
}
\`\`\`

## 3. The Counter Pattern: Tracking Iteration State

- Use a variable (often i or count) to track how many times you have run or to control when to stop.
- Initialize before the loop; update inside the loop (e.g. i++ or count += 2).

\`\`\`javascript
let i = 0
while (i < 5) {
  console.log(i)
  i++
}
\`\`\`

## 4. Loop Termination: Ensuring a Safe Exit

- The condition must eventually become falsy, or the loop never ends.
- Ensure the variable used in the condition is updated inside the loop so it can reach the exit value.

\`\`\`javascript
const n = 4
let i = 1
while (i <= n) {
  console.log(i)
  i++
}
\`\`\`

## 5. Infinite Loop Risk: Managing System Resources

- An infinite loop runs forever (condition never becomes false). It can freeze the program or browser.
- Avoid: always update the variable that the condition depends on, and ensure that update leads to a false condition.

\`\`\`javascript
let i = 0
while (i < 3) {
  console.log(i)
  i++
}
\`\`\``,
        "tasks": [
          {
            "description": "// Print numbers from 1 to 5 using a while loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5",
            "solution_type": "script",
            "reference_solution": "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "1\n2\n3\n4\n5"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 10;\n\n// Print all even numbers from 2 to n (inclusive)\n// Each number should be on a new line\n// For n = 10, your output should be:\n// 2\n// 4\n// 6\n// 8\n// 10",
            "solution_type": "script",
            "reference_solution": "const n = 10;\nlet i = 2;\nwhile (i <= n) {\n  console.log(i);\n  i += 2;\n}",
            "testCases": [
              {
                "input": { "n": 10 },
                "expectedOutput": "2\n4\n6\n8\n10"
              },
              {
                "input": { "n": 6 },
                "expectedOutput": "2\n4\n6"
              },
              {
                "input": { "n": 2 },
                "expectedOutput": "2"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 5;\n\n// Calculate the sum of numbers from 1 to limit\n// Print only the final sum\n// For limit = 5, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
            "solution_type": "script",
            "reference_solution": "const limit = 5;\nlet sum = 0;\nlet i = 1;\nwhile (i <= limit) {\n  sum += i;\n  i++;\n}\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "limit": 5 },
                "expectedOutput": "15"
              },
              {
                "input": { "limit": 10 },
                "expectedOutput": "55"
              },
              {
                "input": { "limit": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "limit": 100 },
                "expectedOutput": "5050"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 7;\n\n// Print the multiplication table for num from 1 to 10\n// Format: num x i = result\n// For num = 7, your output should be:\n// 7 x 1 = 7\n// 7 x 2 = 14\n// 7 x 3 = 21\n// ... up to 7 x 10 = 70",
            "solution_type": "script",
            "reference_solution": "const num = 7;\nlet i = 1;\nwhile (i <= 10) {\n  console.log(num + \" x \" + i + \" = \" + (num * i));\n  i++;\n}",
            "testCases": [
              {
                "input": { "num": 7 },
                "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70"
              },
              {
                "input": { "num": 3 },
                "expectedOutput": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 5;\n\n// Calculate the factorial of num\n// Factorial of n = n × (n-1) × (n-2) × ... × 1\n// Print only the final result\n// For num = 5, your output should be: 120\n// (Because 5 × 4 × 3 × 2 × 1 = 120)",
            "solution_type": "script",
            "reference_solution": "const num = 5;\nlet result = 1;\nlet i = 1;\nwhile (i <= num) {\n  result *= i;\n  i++;\n}\nconsole.log(result);",
            "testCases": [
              {
                "input": { "num": 5 },
                "expectedOutput": "120"
              },
              {
                "input": { "num": 3 },
                "expectedOutput": "6"
              },
              {
                "input": { "num": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "5040"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Count the number of digits in num\n// Use a while loop to repeatedly divide by 10\n// Print only the count\n// For num = 12345, your output should be: 5",
            "solution_type": "script",
            "reference_solution": "const num = 12345;\nlet count = 0;\nlet n = num;\nif (n === 0) {\n  count = 1;\n} else {\n  if (n < 0) n = -n;\n  while (n > 0) {\n    count++;\n    n = Math.floor(n / 10);\n  }\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "num": 12345 },
                "expectedOutput": "5"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "1"
              },
              {
                "input": { "num": 1000 },
                "expectedOutput": "4"
              },
              {
                "input": { "num": 999999 },
                "expectedOutput": "6"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12321;\n\n// Reverse the digits of num\n// For num = 12321, your output should be: 12321\n// For num = 1234, output should be: 4321\n// Hint: Use modulo (%) to extract last digit, then divide by 10",
            "solution_type": "script",
            "reference_solution": "const num = 12321;\nlet n = num;\nif (n < 0) n = -n;\nlet reversed = 0;\nwhile (n > 0) {\n  reversed = reversed * 10 + (n % 10);\n  n = Math.floor(n / 10);\n}\nconsole.log(reversed);",
            "testCases": [
              {
                "input": { "num": 12321 },
                "expectedOutput": "12321"
              },
              {
                "input": { "num": 1234 },
                "expectedOutput": "4321"
              },
              {
                "input": { "num": 500 },
                "expectedOutput": "5"
              },
              {
                "input": { "num": 9876 },
                "expectedOutput": "6789"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 7;\n\n// Print the first n numbers in the Fibonacci sequence\n// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, ...\n// Each number is the sum of the previous two\n// Print each number on a new line\n// For n = 7, your output should be:\n// 0\n// 1\n// 1\n// 2\n// 3\n// 5\n// 8",
            "solution_type": "script",
            "reference_solution": "const n = 7;\nlet a = 0;\nlet b = 1;\nlet i = 0;\nwhile (i < n) {\n  console.log(a);\n  const next = a + b;\n  a = b;\n  b = next;\n  i++;\n}",
            "testCases": [
              {
                "input": { "n": 7 },
                "expectedOutput": "0\n1\n1\n2\n3\n5\n8"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "0\n1\n1\n2\n3"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "0"
              },
              {
                "input": { "n": 10 },
                "expectedOutput": "0\n1\n1\n2\n3\n5\n8\n13\n21\n34"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 29;\n\n// Check if num is a prime number\n// A prime number is only divisible by 1 and itself\n// Print: \"Prime\" if it's prime, otherwise print: \"Not prime\"\n// Hint: Check divisibility from 2 to num-1",
            "solution_type": "script",
            "reference_solution": "const num = 29;\nif (num < 2) {\n  console.log(\"Not prime\");\n} else {\n  let isPrime = true;\n  let i = 2;\n  while (i < num) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n    i++;\n  }\n  if (isPrime) {\n    console.log(\"Prime\");\n  } else {\n    console.log(\"Not prime\");\n  }\n}",
            "testCases": [
              {
                "input": { "num": 29 },
                "expectedOutput": "Prime"
              },
              {
                "input": { "num": 15 },
                "expectedOutput": "Not prime"
              },
              {
                "input": { "num": 2 },
                "expectedOutput": "Prime"
              },
              {
                "input": { "num": 1 },
                "expectedOutput": "Not prime"
              },
              {
                "input": { "num": 17 },
                "expectedOutput": "Prime"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 28;\n\n// Check if num is a perfect number\n// A perfect number equals the sum of its proper divisors (excluding itself)\n// Example: 28 = 1 + 2 + 4 + 7 + 14\n// Print: \"Perfect number\" if true, otherwise print: \"Not perfect\"",
            "solution_type": "script",
            "reference_solution": "const num = 28;\nlet sum = 0;\nlet i = 1;\nwhile (i < num) {\n  if (num % i === 0) {\n    sum += i;\n  }\n  i++;\n}\nif (sum === num) {\n  console.log(\"Perfect number\");\n} else {\n  console.log(\"Not perfect\");\n}",
            "testCases": [
              {
                "input": { "num": 28 },
                "expectedOutput": "Perfect number"
              },
              {
                "input": { "num": 6 },
                "expectedOutput": "Perfect number"
              },
              {
                "input": { "num": 12 },
                "expectedOutput": "Not perfect"
              },
              {
                "input": { "num": 496 },
                "expectedOutput": "Perfect number"
              }
            ]
          }
        ]
      },
      {
        "id": "for-loops",
        "title": "for Loops",
        "outcomes": [
          "The for Loop: Compact Iteration Syntax",
          "Variable Initialization: Setting the Starting Point",
          "The Limit Condition: Defining the Exit Boundary",
          "The Update Expression: Incremental State Change",
          "Architectural Choice: When to use for vs. while"
        ],
        "topic_notes": `## 1. The for Loop: Compact Iteration Syntax

- for (init; condition; update) { ... } packs initialization, condition, and update in one line.
- The init runs once; then condition is checked, body runs, update runs; repeat until condition is false.

\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i)
}
\`\`\`

## 2. Variable Initialization: Setting the Starting Point

- The first part of for (e.g. let i = 0) runs once before the loop starts.
- Use it to declare and set the loop variable (counter).

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i)
}
\`\`\`

## 3. The Limit Condition: Defining the Exit Boundary

- The middle part (e.g. i < 10) is the condition. It is checked before each iteration.
- When it is false, the loop stops and execution continues after the loop.

\`\`\`javascript
for (let i = 0; i < 4; i++) {
  console.log("step", i)
}
\`\`\`

## 4. The Update Expression: Incremental State Change

- The third part (e.g. i++) runs after each iteration, before the next condition check.
- Use it to move the counter toward the exit (e.g. i++, i += 2).

\`\`\`javascript
for (let i = 2; i <= 8; i += 2) {
  console.log(i)
}
\`\`\`

## 5. Architectural Choice: When to use for vs. while

- Use for when you have a clear start, limit, and step (counting a known number of times).
- Use while when the number of iterations depends on a condition that is not a simple counter (e.g. "until user quits").

\`\`\`javascript
for (let i = 0; i < 5; i++) console.log(i)
\`\`\``,
        "tasks": [
          {
            "description": "// Print numbers from 1 to 10 using a for loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// ... up to 10",
            "solution_type": "script",
            "reference_solution": "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 15;\n\n// Print all odd numbers from 1 to n (inclusive)\n// Each number should be on a new line\n// For n = 15, your output should be:\n// 1\n// 3\n// 5\n// ... up to 15",
            "solution_type": "script",
            "reference_solution": "const n = 15;\nfor (let i = 1; i <= n; i += 2) {\n  console.log(i);\n}",
            "testCases": [
              {
                "input": { "n": 15 },
                "expectedOutput": "1\n3\n5\n7\n9\n11\n13\n15"
              },
              {
                "input": { "n": 10 },
                "expectedOutput": "1\n3\n5\n7\n9"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "1\n3\n5"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "// Do not rename start and end, use them as input for your program.\n// While testing we will change their values.\nconst start = 5;\nconst end = 10;\n\n// Print numbers from start to end (inclusive) in reverse order\n// Each number should be on a new line\n// For start = 5 and end = 10, your output should be:\n// 10\n// 9\n// 8\n// 7\n// 6\n// 5",
            "solution_type": "script",
            "reference_solution": "const start = 5;\nconst end = 10;\nfor (let i = end; i >= start; i--) {\n  console.log(i);\n}",
            "testCases": [
              {
                "input": { "start": 5, "end": 10 },
                "expectedOutput": "10\n9\n8\n7\n6\n5"
              },
              {
                "input": { "start": 1, "end": 5 },
                "expectedOutput": "5\n4\n3\n2\n1"
              },
              {
                "input": { "start": 8, "end": 12 },
                "expectedOutput": "12\n11\n10\n9\n8"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n\n// Calculate the sum of all numbers from 1 to n that are divisible by 3\n// Print only the final sum\n// For n = 20, the numbers are: 3, 6, 9, 12, 15, 18\n// Your output should be: 63",
            "solution_type": "script",
            "reference_solution": "const n = 20;\nlet sum = 0;\nfor (let i = 1; i <= n; i++) {\n  if (i % 3 === 0) {\n    sum += i;\n  }\n}\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "n": 20 },
                "expectedOutput": "63"
              },
              {
                "input": { "n": 10 },
                "expectedOutput": "18"
              },
              {
                "input": { "n": 30 },
                "expectedOutput": "165"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "3"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Print each character of the string on a new line\n// Use str.length to get the length and str[i] to access characters\n// For str = \"Hello\", your output should be:\n// H\n// e\n// l\n// l\n// o",
            "solution_type": "script",
            "reference_solution": "const str = \"Hello\";\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}",
            "testCases": [
              {
                "input": { "str": "Hello" },
                "expectedOutput": "H\ne\nl\nl\no"
              },
              {
                "input": { "str": "JS" },
                "expectedOutput": "J\nS"
              },
              {
                "input": { "str": "Code" },
                "expectedOutput": "C\no\nd\ne"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"JavaScript\";\n\n// Count the number of vowels (a, e, i, o, u) in the string\n// Case-insensitive: treat 'A' and 'a' as the same\n// Print only the count\n// For str = \"JavaScript\", your output should be: 3",
            "solution_type": "script",
            "reference_solution": "const str = \"JavaScript\";\nlet count = 0;\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U') {\n    count++;\n  }\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "Hello World" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "AEIOU" },
                "expectedOutput": "5"
              },
              {
                "input": { "str": "xyz" },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n\n// Print a pattern of stars forming a right triangle\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****",
            "solution_type": "script",
            "reference_solution": "const n = 5;\nlet line = \"\";\nfor (let i = 0; i < n; i++) {\n  line += \"*\";\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "*\n**\n***\n****\n*****"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "*\n**\n***"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "*"
              },
              {
                "input": { "n": 7 },
                "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Calculate the sum of all digits in num\n// Convert num to a string to iterate through digits\n// Print only the final sum\n// For num = 12345, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
            "solution_type": "script",
            "reference_solution": "const num = 12345;\nconst str = String(num);\nlet sum = 0;\nfor (let i = 0; i < str.length; i++) {\n  sum += Number(str[i]);\n}\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "num": 12345 },
                "expectedOutput": "15"
              },
              {
                "input": { "num": 999 },
                "expectedOutput": "27"
              },
              {
                "input": { "num": 1000 },
                "expectedOutput": "1"
              },
              {
                "input": { "num": 246 },
                "expectedOutput": "12"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"racecar\";\n\n// Check if str is a palindrome (reads the same forwards and backwards)\n// Compare characters from start and end moving towards center\n// Print: \"Palindrome\" if true, otherwise print: \"Not palindrome\"\n// Hint: Compare str[i] with str[str.length - 1 - i]",
            "solution_type": "script",
            "reference_solution": "const str = \"racecar\";\nlet isPalindrome = true;\nfor (let i = 0; i < str.length; i++) {\n  if (str[i] !== str[str.length - 1 - i]) {\n    isPalindrome = false;\n    break;\n  }\n}\nif (isPalindrome) {\n  console.log(\"Palindrome\");\n} else {\n  console.log(\"Not palindrome\");\n}",
            "testCases": [
              {
                "input": { "str": "racecar" },
                "expectedOutput": "Palindrome"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "Not palindrome"
              },
              {
                "input": { "str": "madam" },
                "expectedOutput": "Palindrome"
              },
              {
                "input": { "str": "a" },
                "expectedOutput": "Palindrome"
              },
              {
                "input": { "str": "noon" },
                "expectedOutput": "Palindrome"
              }
            ]
          },
          {
            "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 50;\n\n// Print all prime numbers from 2 to limit\n// A prime number is only divisible by 1 and itself\n// Each prime should be on a new line\n// For limit = 50, your output should be:\n// 2\n// 3\n// 5\n// 7\n// ... up to 47",
            "solution_type": "script",
            "reference_solution": "const limit = 50;\nfor (let num = 2; num <= limit; num++) {\n  let isPrime = true;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n  }\n  if (isPrime) {\n    console.log(num);\n  }\n}",
            "testCases": [
              {
                "input": { "limit": 20 },
                "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19"
              },
              {
                "input": { "limit": 10 },
                "expectedOutput": "2\n3\n5\n7"
              },
              {
                "input": { "limit": 30 },
                "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19\n23\n29"
              }
            ]
          }
        ]
      },
      {
        "id": "loop-control",
        "title": "Loop Control (break, continue)",
        "outcomes": [
          "The break Statement: Immediate Loop Exit",
          "The continue Statement: Skipping the Current Cycle",
          "Early Termination: Optimizing Search Logic",
          "Conditional Skipping: Filtered Execution Flow"
        ],
        "topic_notes": `## 1. The break Statement: Immediate Loop Exit

- break exits the loop immediately. No more iterations run; execution continues after the loop.
- Use it when you have found what you need (e.g. found a value) and want to stop.

\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  console.log(i)
  if (i === 5) break
}
\`\`\`

## 2. The continue Statement: Skipping the Current Cycle

- continue skips the rest of the current iteration and goes to the next one.
- The loop condition is checked again; only the current cycle is skipped.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) continue
  console.log(i)
}
\`\`\`

## 3. Early Termination: Optimizing Search Logic

- Use break when you find the first match so you do not loop through the rest.
- Saves work in search or find-first scenarios.

\`\`\`javascript
const arr = [3, 7, 2, 9]
let found = -1
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    found = i
    break
  }
}
console.log(found)
\`\`\`

## 4. Conditional Skipping: Filtered Execution Flow

- Use continue to skip certain items (e.g. skip multiples of 3, skip invalid data) and process only the rest.
- The loop keeps running; only some iterations do the main work.

\`\`\`javascript
for (let i = 1; i <= 6; i++) {
  if (i % 3 === 0) continue
  console.log(i)
}
\`\`\``,
        "tasks": [
          {
            "description": "// Print numbers from 1 to 20, but stop when you reach 10\n// Use a for loop with break statement\n// Your output should be:\n// 1\n// 2\n// 3\n// ... up to 10",
            "solution_type": "script",
            "reference_solution": "for (let i = 1; i <= 20; i++) {\n  console.log(i);\n  if (i === 10) break;\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n\n// Print numbers from 1 to n, but skip multiples of 3\n// Use continue statement to skip multiples of 3\n// For n = 20, your output should be:\n// 1\n// 2\n// 4\n// 5\n// 7\n// 8\n// ... (skipping 3, 6, 9, 12, 15, 18)",
            "solution_type": "script",
            "reference_solution": "const n = 20;\nfor (let i = 1; i <= n; i++) {\n  if (i % 3 === 0) continue;\n  console.log(i);\n}",
            "testCases": [
              {
                "input": { "n": 15 },
                "expectedOutput": "1\n2\n4\n5\n7\n8\n10\n11\n13\n14"
              },
              {
                "input": { "n": 10 },
                "expectedOutput": "1\n2\n4\n5\n7\n8\n10"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "1\n2\n4\n5"
              }
            ]
          },
          {
            "description": "// Do not rename str and target, use them as input for your program.\n// While testing we will change their values.\nconst str = \"JavaScript\";\nconst target = \"S\";\n\n// Find the first occurrence of target character in str\n// Print the index (position) where it's found\n// Use break to stop searching once found\n// If not found, print: -1\n// For str = \"JavaScript\" and target = \"S\", your output should be: 4",
            "solution_type": "script",
            "reference_solution": "const str = \"JavaScript\";\nconst target = \"S\";\nlet index = -1;\nfor (let i = 0; i < str.length; i++) {\n  if (str[i] === target) {\n    index = i;\n    break;\n  }\n}\nconsole.log(index);",
            "testCases": [
              {
                "input": { "str": "JavaScript", "target": "S" },
                "expectedOutput": "4"
              },
              {
                "input": { "str": "Hello", "target": "l" },
                "expectedOutput": "2"
              },
              {
                "input": { "str": "Code", "target": "x" },
                "expectedOutput": "-1"
              },
              {
                "input": { "str": "Programming", "target": "g" },
                "expectedOutput": "3"
              }
            ]
          },
          {
            "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n\n// Print all even numbers from 1 to limit, but stop if you encounter a number greater than 20\n// Use continue for odd numbers and break for numbers > 20\n// For limit = 30, your output should be:\n// 2\n// 4\n// 6\n// ... up to 20",
            "solution_type": "script",
            "reference_solution": "const limit = 30;\nfor (let i = 1; i <= limit; i++) {\n  if (i % 2 !== 0) continue;\n  if (i > 20) break;\n  console.log(i);\n}",
            "testCases": [
              {
                "input": { "limit": 30 },
                "expectedOutput": "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
              },
              {
                "input": { "limit": 15 },
                "expectedOutput": "2\n4\n6\n8\n10\n12\n14"
              },
              {
                "input": { "limit": 25 },
                "expectedOutput": "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello World\";\n\n// Print all characters except vowels (a, e, i, o, u)\n// Use continue to skip vowels\n// Case-insensitive: skip both 'a' and 'A'\n// For str = \"Hello World\", your output should be:\n// H\n// l\n// l\n//  \n// W\n// r\n// l\n// d",
            "solution_type": "script",
            "reference_solution": "const str = \"Hello World\";\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U') continue;\n  console.log(c);\n}",
            "testCases": [
              {
                "input": { "str": "Hello World" },
                "expectedOutput": "H\nl\nl\n \nW\nr\nl\nd"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "J\nv\nS\nc\nr\np\nt"
              },
              {
                "input": { "str": "Code" },
                "expectedOutput": "C\nd"
              }
            ]
          },
          {
            "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 84;\n\n// Find the smallest divisor of num (greater than 1)\n// Use break once you find the first divisor\n// Print the divisor\n// For num = 84, your output should be: 2",
            "solution_type": "script",
            "reference_solution": "const num = 84;\nlet divisor = num;\nfor (let i = 2; i < num; i++) {\n  if (num % i === 0) {\n    divisor = i;\n    break;\n  }\n}\nconsole.log(divisor);",
            "testCases": [
              {
                "input": { "num": 84 },
                "expectedOutput": "2"
              },
              {
                "input": { "num": 15 },
                "expectedOutput": "3"
              },
              {
                "input": { "num": 17 },
                "expectedOutput": "17"
              },
              {
                "input": { "num": 21 },
                "expectedOutput": "3"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 50;\n\n// Print numbers from 1 to n, but:\n// - Skip numbers divisible by 5\n// - Stop completely when you reach a number divisible by 7 and greater than 30\n// Use continue for divisible by 5, break for the stopping condition\n// For n = 50, your output should be numbers 1-34 (excluding 5, 10, 15, 20, 25, 30) and stopping at 35",
            "solution_type": "script",
            "reference_solution": "const n = 50;\nfor (let i = 1; i <= n; i++) {\n  if (i % 5 === 0) continue;\n  if (i % 7 === 0 && i > 30) break;\n  console.log(i);\n}",
            "testCases": [
              {
                "input": { "n": 50 },
                "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29\n31\n32\n33\n34"
              },
              {
                "input": { "n": 40 },
                "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29\n31\n32\n33\n34"
              },
              {
                "input": { "n": 30 },
                "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"a1b2c3d4\";\n\n// Print only the digit characters from the string\n// Use continue to skip non-digit characters\n// Hint: A character is a digit if it's between '0' and '9'\n// For str = \"a1b2c3d4\", your output should be:\n// 1\n// 2\n// 3\n// 4",
            "solution_type": "script",
            "reference_solution": "const str = \"a1b2c3d4\";\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c < '0' || c > '9') continue;\n  console.log(c);\n}",
            "testCases": [
              {
                "input": { "str": "a1b2c3d4" },
                "expectedOutput": "1\n2\n3\n4"
              },
              {
                "input": { "str": "hello123world" },
                "expectedOutput": "1\n2\n3"
              },
              {
                "input": { "str": "no digits here" },
                "expectedOutput": ""
              },
              {
                "input": { "str": "test567end" },
                "expectedOutput": "5\n6\n7"
              }
            ]
          }
        ]
      },
      {
        "id": "nested-loops",
        "title": "Nested Loops",
        "outcomes": [
          "Nested Loop Syntax: Hierarchical Iteration",
          "Execution Flow: The \"Clockwork\" of Inner and Outer Loops",
          "Calculating Workload: Total Iterations (N * M)",
          "Generative Logic: Grid and Pattern Printing"
        ],
        "topic_notes": `## 1. Nested Loop Syntax: Hierarchical Iteration

- A loop inside another loop: for each iteration of the outer loop, the inner loop runs fully.
- Use different variables (e.g. i and j) for the outer and inner counters.

\`\`\`javascript
for (let r = 0; r < 2; r++) {
  for (let c = 0; c < 3; c++) {
    console.log(r, c)
  }
}
\`\`\`

## 2. Execution Flow: The Clockwork of Inner and Outer Loops

- Outer loop runs once; inner loop runs from start to finish. Then outer advances, inner runs again.
- Inner loop completes all its iterations for each single step of the outer loop.

\`\`\`javascript
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i * j)
  }
}
\`\`\`

## 3. Calculating Workload: Total Iterations (N * M)

- If the outer loop runs N times and the inner runs M times per outer iteration, the body runs N * M times.
- Nested loops can get slow for large N and M; use when you need every pair or grid cell.

\`\`\`javascript
const rows = 2
const cols = 3
let count = 0
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) count++
}
console.log(count)
\`\`\`

## 4. Generative Logic: Grid and Pattern Printing

- Use nested loops to build rows and columns: outer loop for rows, inner for characters in a row.
- Concatenate into a string per row, then print; or print character by character as needed.

\`\`\`javascript
for (let r = 0; r < 3; r++) {
  let line = ""
  for (let c = 0; c < 4; c++) line += "*"
  console.log(line)
}
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n\n// Print a grid of stars (*) with the given dimensions\n// Each row should be on a new line\n// For rows = 3 and cols = 4, your output should be:\n// ****\n// ****\n// ****",
            "solution_type": "script",
            "reference_solution": "const rows = 3;\nconst cols = 4;\nfor (let r = 0; r < rows; r++) {\n  let line = \"\";\n  for (let c = 0; c < cols; c++) {\n    line += \"*\";\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "rows": 3, "cols": 4 },
                "expectedOutput": "****\n****\n****"
              },
              {
                "input": { "rows": 2, "cols": 5 },
                "expectedOutput": "*****\n*****"
              },
              {
                "input": { "rows": 4, "cols": 3 },
                "expectedOutput": "***\n***\n***\n***"
              },
              {
                "input": { "rows": 1, "cols": 6 },
                "expectedOutput": "******"
              }
            ]
          },
          {
            "description": "// Print the multiplication table from 1 to 5\n// Format each line as: \"1 2 3 4 5\" (space-separated)\n// Your output should be:\n// 1 2 3 4 5\n// 2 4 6 8 10\n// 3 6 9 12 15\n// 4 8 12 16 20\n// 5 10 15 20 25",
            "solution_type": "script",
            "reference_solution": "for (let i = 1; i <= 5; i++) {\n  let line = \"\";\n  for (let j = 1; j <= 5; j++) {\n    if (j > 1) line += \" \";\n    line += i * j;\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "1 2 3 4 5\n2 4 6 8 10\n3 6 9 12 15\n4 8 12 16 20\n5 10 15 20 25"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n\n// Print a right triangle pattern of numbers\n// Each row i should have numbers from 1 to i\n// For n = 4, your output should be:\n// 1\n// 1 2\n// 1 2 3\n// 1 2 3 4",
            "solution_type": "script",
            "reference_solution": "const n = 4;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 1; j <= i; j++) {\n    if (j > 1) line += \" \";\n    line += j;\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "n": 4 },
                "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "1\n1 2\n1 2 3"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n\n// Print a pyramid pattern of stars\n// Row i should have i stars\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****\n// ****\n// ***\n// **\n// *",
            "solution_type": "script",
            "reference_solution": "const n = 5;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) line += \"*\";\n  console.log(line);\n}\nfor (let i = n - 1; i >= 1; i--) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) line += \"*\";\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "*\n**\n***\n****\n*****\n****\n***\n**\n*"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "*\n**\n***\n**\n*"
              },
              {
                "input": { "n": 4 },
                "expectedOutput": "*\n**\n***\n****\n***\n**\n*"
              }
            ]
          },
          {
            "description": "// Do not rename str1 and str2, use them as input for your program.\n// While testing we will change their values.\nconst str1 = \"abc\";\nconst str2 = \"xy\";\n\n// Print all possible pairs of characters from str1 and str2\n// Format: \"char1char2\" (concatenated, no space)\n// For str1 = \"abc\" and str2 = \"xy\", your output should be:\n// ax\n// ay\n// bx\n// by\n// cx\n// cy",
            "solution_type": "script",
            "reference_solution": "const str1 = \"abc\";\nconst str2 = \"xy\";\nfor (let i = 0; i < str1.length; i++) {\n  for (let j = 0; j < str2.length; j++) {\n    console.log(str1[i] + str2[j]);\n  }\n}",
            "testCases": [
              {
                "input": { "str1": "abc", "str2": "xy" },
                "expectedOutput": "ax\nay\nbx\nby\ncx\ncy"
              },
              {
                "input": { "str1": "ab", "str2": "12" },
                "expectedOutput": "a1\na2\nb1\nb2"
              },
              {
                "input": { "str1": "XY", "str2": "123" },
                "expectedOutput": "X1\nX2\nX3\nY1\nY2\nY3"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 4;\n\n// Print a hollow square pattern\n// Only the border should have stars, inside should be spaces\n// For n = 4, your output should be:\n// ****\n// *  *\n// *  *\n// ****",
            "solution_type": "script",
            "reference_solution": "const n = 4;\nfor (let r = 0; r < n; r++) {\n  let line = \"\";\n  for (let c = 0; c < n; c++) {\n    if (r === 0 || r === n - 1 || c === 0 || c === n - 1) {\n      line += \"*\";\n    } else {\n      line += \" \";\n    }\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "n": 4 },
                "expectedOutput": "****\n*  *\n*  *\n****"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "*****\n*   *\n*   *\n*   *\n*****"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "***\n* *\n***"
              },
              {
                "input": { "n": 2 },
                "expectedOutput": "**\n**"
              }
            ]
          },
          {
            "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 20;\n\n// Find and print all pairs of numbers (a, b) where:\n// - Both a and b are between 1 and limit\n// - a < b\n// - a + b equals 10\n// Format: \"a + b = 10\"\n// For limit = 20, your output should be:\n// 1 + 9 = 10\n// 2 + 8 = 10\n// 3 + 7 = 10\n// 4 + 6 = 10",
            "solution_type": "script",
            "reference_solution": "const limit = 20;\nfor (let a = 1; a <= limit; a++) {\n  for (let b = a + 1; b <= limit; b++) {\n    if (a + b === 10) {\n      console.log(a + \" + \" + b + \" = 10\");\n    }\n  }\n}",
            "testCases": [
              {
                "input": { "limit": 20 },
                "expectedOutput": "1 + 9 = 10\n2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
              },
              {
                "input": { "limit": 10 },
                "expectedOutput": "1 + 9 = 10\n2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
              },
              {
                "input": { "limit": 8 },
                "expectedOutput": "2 + 8 = 10\n3 + 7 = 10\n4 + 6 = 10"
              }
            ]
          },
          {
            "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 3;\n\n// Print a pattern where each row shows row number repeated row times\n// For n = 3, your output should be:\n// 1\n// 2 2\n// 3 3 3",
            "solution_type": "script",
            "reference_solution": "const n = 3;\nfor (let i = 1; i <= n; i++) {\n  let line = \"\";\n  for (let j = 0; j < i; j++) {\n    if (j > 0) line += \" \";\n    line += i;\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "n": 3 },
                "expectedOutput": "1\n2 2\n3 3 3"
              },
              {
                "input": { "n": 4 },
                "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "// Do not rename rows and cols, use them as input for your program.\n// While testing we will change their values.\nconst rows = 3;\nconst cols = 4;\n\n// Print a grid showing coordinates (row, col) for each position\n// Format: \"(row,col)\" with space between coordinates\n// For rows = 3 and cols = 4, your output should be:\n// (0,0) (0,1) (0,2) (0,3)\n// (1,0) (1,1) (1,2) (1,3)\n// (2,0) (2,1) (2,2) (2,3)",
            "solution_type": "script",
            "reference_solution": "const rows = 3;\nconst cols = 4;\nfor (let r = 0; r < rows; r++) {\n  let line = \"\";\n  for (let c = 0; c < cols; c++) {\n    if (c > 0) line += \" \";\n    line += \"(\" + r + \",\" + c + \")\";\n  }\n  console.log(line);\n}",
            "testCases": [
              {
                "input": { "rows": 3, "cols": 4 },
                "expectedOutput": "(0,0) (0,1) (0,2) (0,3)\n(1,0) (1,1) (1,2) (1,3)\n(2,0) (2,1) (2,2) (2,3)"
              },
              {
                "input": { "rows": 2, "cols": 3 },
                "expectedOutput": "(0,0) (0,1) (0,2)\n(1,0) (1,1) (1,2)"
              },
              {
                "input": { "rows": 2, "cols": 2 },
                "expectedOutput": "(0,0) (0,1)\n(1,0) (1,1)"
              }
            ]
          },
          {
            "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n\n// Count and print the total number of prime numbers from 2 to limit\n// Use nested loops: outer loop for each number, inner loop to check if prime\n// Print only the final count\n// For limit = 30, there are 10 primes: 2,3,5,7,11,13,17,19,23,29\n// Your output should be: 10",
            "solution_type": "script",
            "reference_solution": "const limit = 30;\nlet count = 0;\nfor (let num = 2; num <= limit; num++) {\n  let isPrime = true;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n  }\n  if (isPrime) count++;\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "limit": 30 },
                "expectedOutput": "10"
              },
              {
                "input": { "limit": 20 },
                "expectedOutput": "8"
              },
              {
                "input": { "limit": 10 },
                "expectedOutput": "4"
              },
              {
                "input": { "limit": 50 },
                "expectedOutput": "15"
              }
            ]
          }
        ]
      },
      {
        "id": "arrays",
        "title": "Arrays",
        "outcomes": [
          "Array Creation: Grouping Data in Memory",
          "Zero-based Indexing: Accessing List Members",
          "The length Property: Measuring Collection Size",
          "Dynamic Access: Finding the Final Element",
          "Mutable Collections: Modifying Elements in Place",
          "Linear Traversal: Iterating with for Loops",
          "The Accumulator Pattern: Summarizing Array Data",
          "The Search Pattern: Finding Specific Data in a List"
        ],
        "topic_notes": `## 1. Array Creation: Grouping Data in Memory

- Arrays hold an ordered list of values. Create with square brackets: [1, 2, 3] or [].
- Elements can be any type: numbers, strings, objects, or other arrays.

\`\`\`javascript
const nums = [10, 20, 30]
const mixed = [1, "two", true]
console.log(nums, mixed)
\`\`\`

## 2. Zero-based Indexing: Accessing List Members

- The first element is at index 0, the second at 1, and so on. Use array[index] to read or write.

\`\`\`javascript
const arr = [5, 10, 15]
console.log(arr[0], arr[1])
\`\`\`

## 3. The length Property: Measuring Collection Size

- array.length is the number of elements. It updates when you add or remove elements.

\`\`\`javascript
const arr = [3, 7, 2]
console.log(arr.length)
\`\`\`

## 4. Dynamic Access: Finding the Final Element

- The last element is at index length - 1. array[array.length - 1] is the last element.

\`\`\`javascript
const arr = [10, 20, 30, 40]
console.log(arr[arr.length - 1])
\`\`\`

## 5. Mutable Collections: Modifying Elements in Place

- Change an element by assigning to array[index]. You can also add with push() or assign past the end.

\`\`\`javascript
const arr = [1, 2, 3]
arr[1] = 20
console.log(arr)
\`\`\`

## 6. Linear Traversal: Iterating with for Loops

- Loop from index 0 to length - 1. for (let i = 0; i < arr.length; i++) visits every element.

\`\`\`javascript
const arr = [3, 7, 2]
for (let i = 0; i < arr.length; i++) console.log(arr[i])
\`\`\`

## 7. The Accumulator Pattern: Summarizing Array Data

- Use a variable (e.g. sum, max) outside the loop; update it inside. Start with 0 for sum or arr[0] for max.

\`\`\`javascript
const nums = [5, 10, 15]
let sum = 0
for (let i = 0; i < nums.length; i++) sum += nums[i]
console.log(sum)
\`\`\`

## 8. The Search Pattern: Finding Specific Data in a List

- Loop and check each element. Use break when you find the first match, or track the index.

\`\`\`javascript
const arr = [10, 20, 30]
let idx = -1
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 20) { idx = i; break }
}
console.log(idx)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 20, 30, 40, 50];\n\n// Print the first and last elements of the array\n// Each on a new line\n// For numbers = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 50",
            "solution_type": "script",
            "reference_solution": "const numbers = [10, 20, 30, 40, 50];\nconsole.log(numbers[0]);\nconsole.log(numbers[numbers.length - 1]);",
            "testCases": [
              {
                "input": { "numbers": [10, 20, 30, 40, 50] },
                "expectedOutput": "10\n50"
              },
              {
                "input": { "numbers": [5, 15, 25] },
                "expectedOutput": "5\n25"
              },
              {
                "input": { "numbers": [100] },
                "expectedOutput": "100\n100"
              },
              {
                "input": { "numbers": [7, 14, 21, 28, 35, 42] },
                "expectedOutput": "7\n42"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 9, 1];\n\n// Print each element of the array on a new line\n// For arr = [3, 7, 2, 9, 1], your output should be:\n// 3\n// 7\n// 2\n// 9\n// 1",
            "solution_type": "script",
            "reference_solution": "const arr = [3, 7, 2, 9, 1];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}",
            "testCases": [
              {
                "input": { "arr": [3, 7, 2, 9, 1] },
                "expectedOutput": "3\n7\n2\n9\n1"
              },
              {
                "input": { "arr": [10, 20] },
                "expectedOutput": "10\n20"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "1\n2\n3\n4\n5\n6"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [5, 10, 15, 20, 25];\n\n// Calculate and print the sum of all elements in the array\n// For numbers = [5, 10, 15, 20, 25], your output should be: 75",
            "solution_type": "script",
            "reference_solution": "const numbers = [5, 10, 15, 20, 25];\nlet sum = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  sum += numbers[i];\n}\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "numbers": [5, 10, 15, 20, 25] },
                "expectedOutput": "75"
              },
              {
                "input": { "numbers": [1, 2, 3, 4] },
                "expectedOutput": "10"
              },
              {
                "input": { "numbers": [100] },
                "expectedOutput": "100"
              },
              {
                "input": { "numbers": [10, 20, 30, 40, 50, 60] },
                "expectedOutput": "210"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [12, 5, 8, 21, 3];\n\n// Find and print the largest number in the array\n// For numbers = [12, 5, 8, 21, 3], your output should be: 21",
            "solution_type": "script",
            "reference_solution": "const numbers = [12, 5, 8, 21, 3];\nlet max = numbers[0];\nfor (let i = 1; i < numbers.length; i++) {\n  if (numbers[i] > max) max = numbers[i];\n}\nconsole.log(max);",
            "testCases": [
              {
                "input": { "numbers": [12, 5, 8, 21, 3] },
                "expectedOutput": "21"
              },
              {
                "input": { "numbers": [1, 2, 3, 4, 5] },
                "expectedOutput": "5"
              },
              {
                "input": { "numbers": [50, 25, 75, 10] },
                "expectedOutput": "75"
              },
              {
                "input": { "numbers": [100] },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "// Do not rename arr and target, use them as input for your program.\n// While testing we will change their values.\nconst arr = [10, 20, 30, 40, 50];\nconst target = 30;\n\n// Find the index of target in the array\n// If found, print the index\n// If not found, print: -1\n// For arr = [10, 20, 30, 40, 50] and target = 30, your output should be: 2",
            "solution_type": "script",
            "reference_solution": "const arr = [10, 20, 30, 40, 50];\nconst target = 30;\nlet index = -1;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === target) {\n    index = i;\n    break;\n  }\n}\nconsole.log(index);",
            "testCases": [
              {
                "input": { "arr": [10, 20, 30, 40, 50], "target": 30 },
                "expectedOutput": "2"
              },
              {
                "input": { "arr": [10, 20, 30, 40, 50], "target": 10 },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [10, 20, 30, 40, 50], "target": 60 },
                "expectedOutput": "-1"
              },
              {
                "input": { "arr": [5, 15, 25, 35], "target": 35 },
                "expectedOutput": "3"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [3, 7, 2, 9, 1, 5];\n\n// Count how many even numbers are in the array\n// Print only the count\n// For numbers = [3, 7, 2, 9, 1, 5], your output should be: 1",
            "solution_type": "script",
            "reference_solution": "const numbers = [3, 7, 2, 9, 1, 5];\nlet count = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) count++;\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "numbers": [3, 7, 2, 9, 1, 5] },
                "expectedOutput": "1"
              },
              {
                "input": { "numbers": [2, 4, 6, 8] },
                "expectedOutput": "4"
              },
              {
                "input": { "numbers": [1, 3, 5, 7] },
                "expectedOutput": "0"
              },
              {
                "input": { "numbers": [10, 15, 20, 25, 30] },
                "expectedOutput": "3"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5];\n\n// Print the array in reverse order\n// Each element on a new line\n// For arr = [1, 2, 3, 4, 5], your output should be:\n// 5\n// 4\n// 3\n// 2\n// 1",
            "solution_type": "script",
            "reference_solution": "const arr = [1, 2, 3, 4, 5];\nfor (let i = arr.length - 1; i >= 0; i--) {\n  console.log(arr[i]);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "5\n4\n3\n2\n1"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "30\n20\n10"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "7"
              },
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "20\n15\n10\n5"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 5, 8, 3, 12, 7];\n\n// Print all numbers greater than 7\n// Each number on a new line\n// For numbers = [10, 5, 8, 3, 12, 7], your output should be:\n// 10\n// 8\n// 12",
            "solution_type": "script",
            "reference_solution": "const numbers = [10, 5, 8, 3, 12, 7];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] > 7) console.log(numbers[i]);\n}",
            "testCases": [
              {
                "input": { "numbers": [10, 5, 8, 3, 12, 7] },
                "expectedOutput": "10\n8\n12"
              },
              {
                "input": { "numbers": [1, 2, 3, 4, 5] },
                "expectedOutput": ""
              },
              {
                "input": { "numbers": [20, 15, 25, 10] },
                "expectedOutput": "20\n15\n25\n10"
              },
              {
                "input": { "numbers": [8, 9, 10] },
                "expectedOutput": "8\n9\n10"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [5, 2, 8, 2, 9, 2, 3];\n\n// Double each element in the array (multiply by 2)\n// Print the modified array elements on a new line\n// For arr = [5, 2, 8, 2, 9, 2, 3], your output should be:\n// 10\n// 4\n// 16\n// 4\n// 18\n// 4\n// 6",
            "solution_type": "script",
            "reference_solution": "const arr = [5, 2, 8, 2, 9, 2, 3];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i] * 2);\n}",
            "testCases": [
              {
                "input": { "arr": [5, 2, 8, 2, 9, 2, 3] },
                "expectedOutput": "10\n4\n16\n4\n18\n4\n6"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "2\n4\n6"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "20\n40\n60"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "14"
              }
            ]
          },
          {
            "description": "// Do not rename words, use it as input for your program.\n// While testing we will change its value.\nconst words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"];\n\n// Find and print the longest word in the array\n// For words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"], your output should be: watermelon",
            "solution_type": "script",
            "reference_solution": "const words = [\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"];\nlet longest = words[0];\nfor (let i = 1; i < words.length; i++) {\n  if (words[i].length > longest.length) longest = words[i];\n}\nconsole.log(longest);",
            "testCases": [
              {
                "input": { "words": ["apple", "banana", "kiwi", "grape", "watermelon"] },
                "expectedOutput": "watermelon"
              },
              {
                "input": { "words": ["cat", "dog", "elephant"] },
                "expectedOutput": "elephant"
              },
              {
                "input": { "words": ["hi", "hello", "hey"] },
                "expectedOutput": "hello"
              },
              {
                "input": { "words": ["code"] },
                "expectedOutput": "code"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [3, 7, 2, 7, 9, 7, 1];\n\n// Count how many times the number 7 appears in the array\n// Print only the count\n// For arr = [3, 7, 2, 7, 9, 7, 1], your output should be: 3",
            "solution_type": "script",
            "reference_solution": "const arr = [3, 7, 2, 7, 9, 7, 1];\nlet count = 0;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === 7) count++;\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "arr": [3, 7, 2, 7, 9, 7, 1] },
                "expectedOutput": "3"
              },
              {
                "input": { "arr": [7, 7, 7, 7] },
                "expectedOutput": "4"
              },
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [4, 7, 2, 9, 1, 6];\n\n// Calculate and print the average of all numbers in the array\n// Round to 2 decimal places\n// For numbers = [4, 7, 2, 9, 1, 6], sum = 29, average = 29/6 = 4.83\n// Your output should be: 4.83",
            "solution_type": "script",
            "reference_solution": "const numbers = [4, 7, 2, 9, 1, 6];\nlet sum = 0;\nfor (let i = 0; i < numbers.length; i++) {\n  sum += numbers[i];\n}\nconst avg = sum / numbers.length;\nconst rounded = Math.round(avg * 100) / 100;\nconsole.log(rounded.toFixed(2));",
            "testCases": [
              {
                "input": { "numbers": [4, 7, 2, 9, 1, 6] },
                "expectedOutput": "4.83"
              },
              {
                "input": { "numbers": [10, 20, 30] },
                "expectedOutput": "20.00"
              },
              {
                "input": { "numbers": [5, 5, 5, 5] },
                "expectedOutput": "5.00"
              },
              {
                "input": { "numbers": [1, 2, 3, 4, 5] },
                "expectedOutput": "3.00"
              }
            ]
          }
        ]
      },
      {
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
        "topic_notes": `## 1. Object Literals: Modeling Entities with Key-Value Pairs

- Objects group data as key-value pairs. Create with { key: value, ... }. Keys are strings; values can be any type.

\`\`\`javascript
const person = { name: "Alice", age: 25 }
console.log(person)
\`\`\`

## 2. Dot Notation vs. Bracket Notation: Accessing Data

- obj.key gets the value for key (when key is a valid identifier). obj["key"] works for any string key.

\`\`\`javascript
const car = { brand: "Toyota", model: "Camry" }
console.log(car.brand, car["model"])
\`\`\`

## 3. Dynamic Keys: Accessing Properties with Variables

- When the key is in a variable, use bracket notation: obj[key]. Dot notation uses the literal name.

\`\`\`javascript
const obj = { a: 1, b: 2 }
const k = "b"
console.log(obj[k])
\`\`\`

## 4. Mutable State: Adding, Modifying, and Deleting Properties

- Assign to add or change: obj.newKey = value. Delete with delete obj.key.

\`\`\`javascript
const o = { x: 10 }
o.y = 20
o.x = 15
console.log(o)
\`\`\`

## 5. Data Hierarchy: Navigating Nested Objects

- Access nested data with a chain: obj.level1.level2. Or bracket notation for dynamic keys.

\`\`\`javascript
const company = { name: "Tech", location: { city: "SF", country: "USA" } }
console.log(company.location.city)
\`\`\`

## 6. Object Methods: Assigning Behavior to Data

- A property whose value is a function is a method. Call it with obj.methodName().

\`\`\`javascript
const calc = { sum: function (a, b) { return a + b } }
console.log(calc.sum(2, 3))
\`\`\`

## 7. The this Keyword: An Introduction to Context

- Inside a method, this refers to the object the method was called on.

\`\`\`javascript
const obj = { name: "Sara", greet: function () { return "Hi, " + this.name } }
console.log(obj.greet())
\`\`\`

## 8. Static Methods: Object.keys() and Object.values()

- Object.keys(obj) returns an array of keys. Object.values(obj) returns an array of values.

\`\`\`javascript
const o = { a: 1, b: 2 }
console.log(Object.keys(o))
console.log(Object.values(o))
\`\`\`

## 9. Iteration: Traversing Objects with for...in

- for (const key in obj) loops over enumerable keys. Use obj[key] to get the value.

\`\`\`javascript
const o = { x: 10, y: 20 }
for (const k in o) console.log(k, o[k])
\`\`\`

## 10. Existence Checks: The in Operator and hasOwnProperty

- "key" in obj is true if the key exists. obj.hasOwnProperty("key") is true only for own properties.

\`\`\`javascript
const o = { a: 1 }
console.log("a" in o)
console.log(o.hasOwnProperty("a"))
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename person, use it as input for your program.\n// While testing we will change its value.\nconst person = { name: \"Alice\", age: 25, city: \"New York\" };\n\n// Print the name and age properties using dot notation\n// Each on a new line\n// For the given person object, your output should be:\n// Alice\n// 25",
            "solution_type": "script",
            "reference_solution": "const person = { name: \"Alice\", age: 25, city: \"New York\" };\nconsole.log(person.name);\nconsole.log(person.age);",
            "testCases": [
              {
                "input": { "person": { "name": "Alice", "age": 25, "city": "New York" } },
                "expectedOutput": "Alice\n25"
              },
              {
                "input": { "person": { "name": "Bob", "age": 30, "city": "London" } },
                "expectedOutput": "Bob\n30"
              },
              {
                "input": { "person": { "name": "Charlie", "age": 35, "city": "Paris" } },
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
                "input": { "car": { "brand": "Toyota", "model": "Camry", "year": 2020 }, "key": "model" },
                "expectedOutput": "Camry"
              },
              {
                "input": { "car": { "brand": "Honda", "model": "Civic", "year": 2019 }, "key": "brand" },
                "expectedOutput": "Honda"
              },
              {
                "input": { "car": { "brand": "Ford", "model": "Mustang", "year": 2021 }, "key": "year" },
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
                "input": { "product": { "name": "Laptop", "price": 999 } },
                "expectedOutput": "Laptop\n999\n50\nElectronics"
              },
              {
                "input": { "product": { "name": "Phone", "price": 599 } },
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
                "input": { "user": { "username": "john_doe", "email": "john@example.com", "age": 28 } },
                "expectedOutput": "username\nemail\nage"
              },
              {
                "input": { "user": { "id": 1, "name": "Alice", "role": "admin" } },
                "expectedOutput": "id\nname\nrole"
              },
              {
                "input": { "user": { "firstName": "Bob", "lastName": "Smith" } },
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
                "input": { "company": { "name": "TechCorp", "location": { "city": "San Francisco", "country": "USA" }, "employees": 500 } },
                "expectedOutput": "San Francisco"
              },
              {
                "input": { "company": { "name": "StartupInc", "location": { "city": "Austin", "country": "USA" }, "employees": 50 } },
                "expectedOutput": "Austin"
              },
              {
                "input": { "company": { "name": "GlobalCo", "location": { "city": "London", "country": "UK" }, "employees": 1000 } },
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
                "input": { "obj": { "name": "Alice", "age": 30, "city": "Paris" }, "propertyName": "age" },
                "expectedOutput": "Found"
              },
              {
                "input": { "obj": { "name": "Alice", "age": 30, "city": "Paris" }, "propertyName": "country" },
                "expectedOutput": "Not found"
              },
              {
                "input": { "obj": { "x": 10, "y": 20 }, "propertyName": "x" },
                "expectedOutput": "Found"
              },
              {
                "input": { "obj": { "x": 10, "y": 20 }, "propertyName": "z" },
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
                "input": { "scores": { "math": 85, "science": 90, "english": 78, "history": 88 } },
                "expectedOutput": "341"
              },
              {
                "input": { "scores": { "test1": 100, "test2": 90, "test3": 95 } },
                "expectedOutput": "285"
              },
              {
                "input": { "scores": { "quiz": 50 } },
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
                "input": { "inventory": { "apples": 50, "bananas": 30, "oranges": 40 } },
                "expectedOutput": "apples: 50\nbananas: 30\noranges: 40"
              },
              {
                "input": { "inventory": { "pens": 100, "pencils": 150 } },
                "expectedOutput": "pens: 100\npencils: 150"
              },
              {
                "input": { "inventory": { "laptops": 10, "mice": 25, "keyboards": 20 } },
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
                "input": { "student": { "name": "Emma", "grades": { "math": 92, "science": 88, "english": 85 }, "age": 16 } },
                "expectedOutput": "88.33"
              },
              {
                "input": { "student": { "name": "John", "grades": { "math": 100, "science": 95, "english": 90 }, "age": 17 } },
                "expectedOutput": "95.00"
              },
              {
                "input": { "student": { "name": "Sarah", "grades": { "math": 80, "science": 85 }, "age": 15 } },
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
                "input": { "settings": { "theme": "dark", "notifications": true, "language": "en", "autoSave": false } },
                "expectedOutput": "2"
              },
              {
                "input": { "settings": { "a": true, "b": false, "c": true, "d": 5 } },
                "expectedOutput": "3"
              },
              {
                "input": { "settings": { "x": "test", "y": 10, "z": "hello" } },
                "expectedOutput": "0"
              },
              {
                "input": { "settings": { "enabled": true } },
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
                "input": { "book": { "title": "1984", "author": "George Orwell", "pages": 328, "published": 1949 } },
                "expectedOutput": "1984\nGeorge Orwell"
              },
              {
                "input": { "book": { "title": "The Hobbit", "author": "J.R.R. Tolkien", "pages": 310, "published": 1937 } },
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
                "input": { "data": { "a": 10, "b": 20, "c": 30, "d": 40, "e": 50 } },
                "expectedOutput": "c\nd\ne"
              },
              {
                "input": { "data": { "x": 100, "y": 15, "z": 30 } },
                "expectedOutput": "x\nz"
              },
              {
                "input": { "data": { "m": 5, "n": 10, "o": 15 } },
                "expectedOutput": ""
              },
              {
                "input": { "data": { "p": 26, "q": 27, "r": 25 } },
                "expectedOutput": "p\nq"
              }
            ]
          }
        ]
      },
      {
        "id": "map-set",
        "title": "Specialized Collections",
        "outcomes": [
          "Map: Advanced Key-Value Collections",
          "Map CRUD: set(), get(), has(), and delete()",
          "Map State: size and clear() management",
          "Map Iteration: entries(), keys(), and values()",
          "Set: The Collection of Unique Values",
          "Set CRUD: add(), has(), and delete()",
          "Array-to-Set: The \"Unique Value\" Pattern",
          "Architectural Choice: Map vs. Object & Set vs. Array"
        ],
        "topic_notes": `## 1. Map: Advanced Key-Value Collections

- Map stores key-value pairs. Keys can be any type (not only strings). Create with new Map() or new Map([ [k,v], ... ]).

\`\`\`javascript
const map = new Map()
map.set("name", "Alice")
map.set("age", 25)
console.log(map.get("name"))
\`\`\`

## 2. Map CRUD: set(), get(), has(), and delete()

- set(key, value) adds or updates. get(key) returns the value. has(key) returns true if the key exists. delete(key) removes the entry.

\`\`\`javascript
const m = new Map([["a", 1], ["b", 2]])
m.set("c", 3)
console.log(m.get("b"), m.has("a"))
\`\`\`

## 3. Map State: size and clear() management

- map.size is the number of entries. clear() removes all entries from the map.

\`\`\`javascript
const m = new Map([["x", 10], ["y", 20]])
console.log(m.size)
\`\`\`

## 4. Map Iteration: entries(), keys(), and values()

- map.entries() (or for...of map) gives [key, value] pairs. keys() and values() give iterables of keys or values.

\`\`\`javascript
const m = new Map([["a", 1], ["b", 2]])
for (const [k, v] of m) console.log(k, v)
\`\`\`

## 5. Set: The Collection of Unique Values

- Set stores unique values (no duplicates). Create with new Set() or new Set([...]). Order of insertion is preserved.

\`\`\`javascript
const set = new Set([1, 2, 2, 3])
console.log(set.size)
console.log([...set])
\`\`\`

## 6. Set CRUD: add(), has(), and delete()

- add(value) adds a value (duplicates are ignored). has(value) checks membership. delete(value) removes the value.

\`\`\`javascript
const s = new Set()
s.add(1)
s.add(2)
s.add(1)
console.log(s.has(1), s.size)
\`\`\`

## 7. Array-to-Set: The Unique Value Pattern

- new Set(array) removes duplicates. Use [...set] or Array.from(set) to get back an array of unique values.

\`\`\`javascript
const arr = [1, 2, 2, 3, 3, 3]
const unique = [...new Set(arr)]
console.log(unique)
\`\`\`

## 8. Architectural Choice: Map vs. Object and Set vs. Array

- Use Map when keys are not strings or you need size and iteration order. Use Set when you need uniqueness. Use Object/Array for simple key-value or ordered lists.

\`\`\`javascript
const m = new Map([["id", 1]])
const s = new Set([1, 2, 2])
console.log(m.get("id"), s.size)
\`\`\``,
        "tasks": [
          {
            "description": "// Create a new Map and add three key-value pairs:\n// - \"name\" -> \"Alice\"\n// - \"age\" -> 25\n// - \"city\" -> \"Paris\"\n// Print the value associated with the key \"name\"\n// Your output should be: Alice",
            "solution_type": "script",
            "reference_solution": "const map = new Map();\nmap.set(\"name\", \"Alice\");\nmap.set(\"age\", 25);\nmap.set(\"city\", \"Paris\");\nconsole.log(map.get(\"name\"));",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Alice"
              }
            ]
          },
          {
            "description": "// Do not rename map and key, use them as input for your program.\n// While testing we will change their values.\nconst map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]]);\nconst key = \"b\";\n\n// Check if the key exists in the map using has()\n// If it exists, print the value using get()\n// If it doesn't exist, print: \"Not found\"\n// For key = \"b\", your output should be: 20",
            "solution_type": "script",
            "reference_solution": "const map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]]);\nconst key = \"b\";\nif (map.has(key)) {\n  console.log(map.get(key));\n} else {\n  console.log(\"Not found\");\n}",
            "testCases": [
              {
                "input": { "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])", "key": "b" },
                "expectedOutput": "20"
              },
              {
                "input": { "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])", "key": "d" },
                "expectedOutput": "Not found"
              },
              {
                "input": { "map": "new Map([[\"x\", 100], [\"y\", 200]])", "key": "x" },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]]);\n\n// Print the size of the map (number of entries)\n// Then print all keys using keys(), each on a new line\n// For the given map, your output should be:\n// 3\n// apple\n// banana\n// orange",
            "solution_type": "script",
            "reference_solution": "const map = new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]]);\nconsole.log(map.size);\nfor (const k of map.keys()) {\n  console.log(k);\n}",
            "testCases": [
              {
                "input": { "map": "new Map([[\"apple\", 5], [\"banana\", 3], [\"orange\", 7]])" },
                "expectedOutput": "3\napple\nbanana\norange"
              },
              {
                "input": { "map": "new Map([[\"x\", 1], [\"y\", 2]])" },
                "expectedOutput": "2\nx\ny"
              },
              {
                "input": { "map": "new Map([[\"a\", 10]])" },
                "expectedOutput": "1\na"
              }
            ]
          },
          {
            "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]]);\n\n// Calculate the sum of all values in the map using values()\n// Print only the total sum\n// For the given map, your output should be: 263",
            "solution_type": "script",
            "reference_solution": "const map = new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]]);\nlet sum = 0;\nfor (const v of map.values()) {\n  sum += v;\n}\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "map": "new Map([[\"math\", 90], [\"science\", 85], [\"english\", 88]])" },
                "expectedOutput": "263"
              },
              {
                "input": { "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30]])" },
                "expectedOutput": "60"
              },
              {
                "input": { "map": "new Map([[\"x\", 100]])" },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "// Create a new Set with the following values: 1, 2, 3, 4, 5\n// Add the value 6 to the set\n// Check if the value 3 exists using has()\n// Print: \"Found\" if it exists, otherwise print: \"Not found\"\n// Your output should be: Found",
            "solution_type": "script",
            "reference_solution": "const set = new Set([1, 2, 3, 4, 5]);\nset.add(6);\nif (set.has(3)) {\n  console.log(\"Found\");\n} else {\n  console.log(\"Not found\");\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Found"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];\n\n// Create a Set from the array to get unique values\n// Print the size of the set (number of unique values)\n// For arr = [1, 2, 2, 3, 4, 4, 5, 5, 5], your output should be: 5",
            "solution_type": "script",
            "reference_solution": "const arr = [1, 2, 2, 3, 4, 4, 5, 5, 5];\nconst set = new Set(arr);\nconsole.log(set.size);",
            "testCases": [
              {
                "input": { "arr": [1, 2, 2, 3, 4, 4, 5, 5, 5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [10, 20, 30, 10, 20] },
                "expectedOutput": "3"
              },
              {
                "input": { "arr": [5, 5, 5, 5] },
                "expectedOutput": "1"
              },
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "6"
              }
            ]
          },
          {
            "description": "// Do not rename set, use it as input for your program.\n// While testing we will change its value.\nconst set = new Set([10, 20, 30, 40, 50]);\n\n// Delete the value 30 from the set using delete()\n// Print all remaining values in the set, each on a new line\n// For the given set, your output should be:\n// 10\n// 20\n// 40\n// 50",
            "solution_type": "script",
            "reference_solution": "const set = new Set([10, 20, 30, 40, 50]);\nset.delete(30);\nfor (const v of set) {\n  console.log(v);\n}",
            "testCases": [
              {
                "input": { "set": "new Set([10, 20, 30, 40, 50])" },
                "expectedOutput": "10\n20\n40\n50"
              },
              {
                "input": { "set": "new Set([1, 2, 3])" },
                "expectedOutput": "1\n2\n3"
              },
              {
                "input": { "set": "new Set([5, 10, 15, 20])" },
                "expectedOutput": "5\n10\n15\n20"
              }
            ]
          },
          {
            "description": "// Do not rename arr1 and arr2, use them as input for your program.\n// While testing we will change their values.\nconst arr1 = [1, 2, 3, 4];\nconst arr2 = [3, 4, 5, 6];\n\n// Find the common elements between arr1 and arr2 using Sets\n// Print the common elements, each on a new line\n// Hint: Create a set from arr1, then check which elements from arr2 are in the set\n// For arr1 = [1, 2, 3, 4] and arr2 = [3, 4, 5, 6], your output should be:\n// 3\n// 4",
            "solution_type": "script",
            "reference_solution": "const arr1 = [1, 2, 3, 4];\nconst arr2 = [3, 4, 5, 6];\nconst set1 = new Set(arr1);\nfor (let i = 0; i < arr2.length; i++) {\n  if (set1.has(arr2[i])) {\n    console.log(arr2[i]);\n  }\n}",
            "testCases": [
              {
                "input": { "arr1": [1, 2, 3, 4], "arr2": [3, 4, 5, 6] },
                "expectedOutput": "3\n4"
              },
              {
                "input": { "arr1": [10, 20, 30], "arr2": [20, 30, 40] },
                "expectedOutput": "20\n30"
              },
              {
                "input": { "arr1": [5, 10, 15], "arr2": [20, 25, 30] },
                "expectedOutput": ""
              },
              {
                "input": { "arr1": [1, 2, 3], "arr2": [1, 2, 3] },
                "expectedOutput": "1\n2\n3"
              }
            ]
          },
          {
            "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]]);\n\n// Count how many entries have values greater than 20\n// Use entries() to iterate through the map\n// Print only the count\n// For the given map, your output should be: 2",
            "solution_type": "script",
            "reference_solution": "const map = new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]]);\nlet count = 0;\nfor (const entry of map.entries()) {\n  if (entry[1] > 20) count++;\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "map": "new Map([[\"a\", 10], [\"b\", 20], [\"c\", 30], [\"d\", 25]])" },
                "expectedOutput": "2"
              },
              {
                "input": { "map": "new Map([[\"x\", 50], [\"y\", 60], [\"z\", 70]])" },
                "expectedOutput": "3"
              },
              {
                "input": { "map": "new Map([[\"m\", 5], [\"n\", 10]])" },
                "expectedOutput": "0"
              },
              {
                "input": { "map": "new Map([[\"p\", 21], [\"q\", 22]])" },
                "expectedOutput": "2"
              }
            ]
          },
          {
            "description": "// Do not rename words, use it as input for your program.\n// While testing we will change its value.\nconst words = [\"apple\", \"banana\", \"apple\", \"orange\", \"banana\", \"apple\"];\n\n// Count the frequency of each word using a Map\n// Print each word and its count in the format: \"word: count\"\n// For the given words array, your output should be:\n// apple: 3\n// banana: 2\n// orange: 1",
            "solution_type": "script",
            "reference_solution": "const words = [\"apple\", \"banana\", \"apple\", \"orange\", \"banana\", \"apple\"];\nconst freq = new Map();\nfor (let i = 0; i < words.length; i++) {\n  const w = words[i];\n  if (freq.has(w)) {\n    freq.set(w, freq.get(w) + 1);\n  } else {\n    freq.set(w, 1);\n  }\n}\nfor (const entry of freq.entries()) {\n  console.log(entry[0] + \": \" + entry[1]);\n}",
            "testCases": [
              {
                "input": { "words": ["apple", "banana", "apple", "orange", "banana", "apple"] },
                "expectedOutput": "apple: 3\nbanana: 2\norange: 1"
              },
              {
                "input": { "words": ["cat", "dog", "cat", "cat"] },
                "expectedOutput": "cat: 3\ndog: 1"
              },
              {
                "input": { "words": ["one", "two", "three"] },
                "expectedOutput": "one: 1\ntwo: 1\nthree: 1"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"javascript\";\n\n// Find all unique characters in the string using a Set\n// Convert the string to an array, create a Set, then print the count of unique characters\n// For str = \"javascript\", unique characters are: j, a, v, s, c, r, i, p, t (9 unique)\n// Your output should be: 9",
            "solution_type": "script",
            "reference_solution": "const str = \"javascript\";\nconst chars = [];\nfor (let i = 0; i < str.length; i++) {\n  chars.push(str[i]);\n}\nconst set = new Set(chars);\nconsole.log(set.size);",
            "testCases": [
              {
                "input": { "str": "javascript" },
                "expectedOutput": "9"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "4"
              },
              {
                "input": { "str": "aaa" },
                "expectedOutput": "1"
              },
              {
                "input": { "str": "programming" },
                "expectedOutput": "9"
              }
            ]
          },
          {
            "description": "// Do not rename map, use it as input for your program.\n// While testing we will change its value.\nconst map = new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]]);\n\n// Iterate through the map using entries()\n// Print each entry in the format: \"key -> value\"\n// For the given map, your output should be:\n// 1 -> one\n// 2 -> two\n// 3 -> three",
            "solution_type": "script",
            "reference_solution": "const map = new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]]);\nfor (const entry of map.entries()) {\n  console.log(entry[0] + \" -> \" + entry[1]);\n}",
            "testCases": [
              {
                "input": { "map": "new Map([[1, \"one\"], [2, \"two\"], [3, \"three\"]])" },
                "expectedOutput": "1 -> one\n2 -> two\n3 -> three"
              },
              {
                "input": { "map": "new Map([[\"a\", \"apple\"], [\"b\", \"banana\"]])" },
                "expectedOutput": "a -> apple\nb -> banana"
              },
              {
                "input": { "map": "new Map([[10, \"ten\"]])" },
                "expectedOutput": "10 -> ten"
              }
            ]
          }
        ]
      },
      {
        "id": "destructuring",
        "title": "Destructuring",
        "outcomes": [
          "Array Destructuring: Unpacking by Position",
          "Skipping and Rest: Targeted Array Extraction",
          "Object Destructuring: Unpacking by Key Name",
          "Renaming and Defaults: Safe Data Extraction",
          "Nested Destructuring: Deep Data Access",
          "Parameter Destructuring: Clean Function Inputs",
          "The Swap Trick: Variable Exchange without Temps"
        ],
        "topic_notes": `## 1. Array Destructuring: Unpacking by Position

- Use [a, b, c] = array to assign the first, second, third elements to variables by position.
- Left side is a pattern; right side is an array (or any iterable).

\`\`\`javascript
const colors = ["red", "green", "blue"]
const [first, second] = colors
console.log(first, second)
\`\`\`

## 2. Skipping and Rest: Targeted Array Extraction

- Use empty slots to skip (e.g. [a, , c]). Use ...rest to collect the rest into an array. Rest must be last.

\`\`\`javascript
const nums = [10, 20, 30, 40]
const [first, ...rest] = nums
console.log(first, rest)
\`\`\`

## 3. Object Destructuring: Unpacking by Key Name

- Use { key1, key2 } = obj to assign properties to variables with the same name. Names must match keys.

\`\`\`javascript
const person = { name: "Alice", age: 25 }
const { name, age } = person
console.log(name, age)
\`\`\`

## 4. Renaming and Defaults: Safe Data Extraction

- Rename with { key: newName }. Default with { key = value }. Use both when the key might be missing.

\`\`\`javascript
const user = { username: "john", email: "john@x.com" }
const { username, age = 18 } = user
console.log(username, age)
\`\`\`

## 5. Nested Destructuring: Deep Data Access

- Match nested structure: { a, b: { c, d } } = obj. Extracts obj.b.c and obj.b.d into c and d.

\`\`\`javascript
const data = { id: 1, info: { name: "Product", price: 50 } }
const { id, info: { name, price } } = data
console.log(id, name, price)
\`\`\`

## 6. Parameter Destructuring: Clean Function Inputs

- Destructure in the parameter list: function f({ name, age }) { ... }. Call with an object; name and age are available inside.

\`\`\`javascript
function greet({ name }) {
  return "Hi, " + name
}
console.log(greet({ name: "Sara" }))
\`\`\`

## 7. The Swap Trick: Variable Exchange without Temps

- [a, b] = [b, a] swaps the values of a and b. No temporary variable needed.

\`\`\`javascript
let a = 5, b = 10
[a, b] = [b, a]
console.log(a, b)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename colors, use it as input for your program.\n// While testing we will change its value.\nconst colors = [\"red\", \"green\", \"blue\"];\n\n// Use array destructuring to extract the first two colors into variables\n// Print them on separate lines\n// For colors = [\"red\", \"green\", \"blue\"], your output should be:\n// red\n// green",
            "solution_type": "script",
            "reference_solution": "const colors = [\"red\", \"green\", \"blue\"];\nconst [first, second] = colors;\nconsole.log(first);\nconsole.log(second);",
            "testCases": [
              {
                "input": { "colors": ["red", "green", "blue"] },
                "expectedOutput": "red\ngreen"
              },
              {
                "input": { "colors": ["yellow", "purple", "orange"] },
                "expectedOutput": "yellow\npurple"
              },
              {
                "input": { "colors": ["black", "white", "gray"] },
                "expectedOutput": "black\nwhite"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [10, 20, 30, 40, 50];\n\n// Use array destructuring to get the first element and the rest of the array\n// Use the rest operator (...)\n// Print the first element on one line, then print the rest array elements each on a new line\n// For numbers = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 20\n// 30\n// 40\n// 50",
            "solution_type": "script",
            "reference_solution": "const numbers = [10, 20, 30, 40, 50];\nconst [first, ...rest] = numbers;\nconsole.log(first);\nfor (let i = 0; i < rest.length; i++) {\n  console.log(rest[i]);\n}",
            "testCases": [
              {
                "input": { "numbers": [10, 20, 30, 40, 50] },
                "expectedOutput": "10\n20\n30\n40\n50"
              },
              {
                "input": { "numbers": [5, 15, 25] },
                "expectedOutput": "5\n15\n25"
              },
              {
                "input": { "numbers": [100, 200] },
                "expectedOutput": "100\n200"
              }
            ]
          },
          {
            "description": "// Do not rename person, use it as input for your program.\n// While testing we will change its value.\nconst person = { name: \"Alice\", age: 25, city: \"Paris\" };\n\n// Use object destructuring to extract name and age\n// Print them on separate lines\n// For the given person object, your output should be:\n// Alice\n// 25",
            "solution_type": "script",
            "reference_solution": "const person = { name: \"Alice\", age: 25, city: \"Paris\" };\nconst { name, age } = person;\nconsole.log(name);\nconsole.log(age);",
            "testCases": [
              {
                "input": { "person": { "name": "Alice", "age": 25, "city": "Paris" } },
                "expectedOutput": "Alice\n25"
              },
              {
                "input": { "person": { "name": "Bob", "age": 30, "city": "London" } },
                "expectedOutput": "Bob\n30"
              },
              {
                "input": { "person": { "name": "Charlie", "age": 35, "city": "Berlin" } },
                "expectedOutput": "Charlie\n35"
              }
            ]
          },
          {
            "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { username: \"john_doe\", email: \"john@example.com\" };\n\n// Use object destructuring with default values\n// Extract username, email, and age (with default value 18)\n// Print all three values on separate lines\n// For the given user object (which doesn't have age), your output should be:\n// john_doe\n// john@example.com\n// 18",
            "solution_type": "script",
            "reference_solution": "const user = { username: \"john_doe\", email: \"john@example.com\" };\nconst { username, email, age = 18 } = user;\nconsole.log(username);\nconsole.log(email);\nconsole.log(age);",
            "testCases": [
              {
                "input": { "user": { "username": "john_doe", "email": "john@example.com" } },
                "expectedOutput": "john_doe\njohn@example.com\n18"
              },
              {
                "input": { "user": { "username": "alice", "email": "alice@test.com", "age": 25 } },
                "expectedOutput": "alice\nalice@test.com\n25"
              },
              {
                "input": { "user": { "username": "bob", "email": "bob@mail.com" } },
                "expectedOutput": "bob\nbob@mail.com\n18"
              }
            ]
          },
          {
            "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = { id: 101, info: { name: \"Product A\", price: 50 } };\n\n// Use nested destructuring to extract id, name, and price\n// Print all three values on separate lines\n// For the given data object, your output should be:\n// 101\n// Product A\n// 50",
            "solution_type": "script",
            "reference_solution": "const data = { id: 101, info: { name: \"Product A\", price: 50 } };\nconst { id, info: { name, price } } = data;\nconsole.log(id);\nconsole.log(name);\nconsole.log(price);",
            "testCases": [
              {
                "input": { "data": { "id": 101, "info": { "name": "Product A", "price": 50 } } },
                "expectedOutput": "101\nProduct A\n50"
              },
              {
                "input": { "data": { "id": 202, "info": { "name": "Product B", "price": 75 } } },
                "expectedOutput": "202\nProduct B\n75"
              },
              {
                "input": { "data": { "id": 303, "info": { "name": "Product C", "price": 100 } } },
                "expectedOutput": "303\nProduct C\n100"
              }
            ]
          },
          {
            "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 10;\nconst b = 20;\n\n// Swap the values of a and b using array destructuring\n// Do NOT use a temporary variable\n// Print both values after swapping on separate lines\n// For a = 10 and b = 20, your output should be:\n// 20\n// 10",
            "solution_type": "script",
            "reference_solution": "const a = 10;\nconst b = 20;\nconst [swappedA, swappedB] = [b, a];\nconsole.log(swappedA);\nconsole.log(swappedB);",
            "testCases": [
              {
                "input": { "a": 10, "b": 20 },
                "expectedOutput": "20\n10"
              },
              {
                "input": { "a": 5, "b": 15 },
                "expectedOutput": "15\n5"
              },
              {
                "input": { "a": 100, "b": 200 },
                "expectedOutput": "200\n100"
              },
              {
                "input": { "a": 7, "b": 3 },
                "expectedOutput": "3\n7"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5, 6];\n\n// Use array destructuring to skip the first two elements and extract the rest\n// Print the extracted elements, each on a new line\n// For arr = [1, 2, 3, 4, 5, 6], your output should be:\n// 3\n// 4\n// 5\n// 6",
            "solution_type": "script",
            "reference_solution": "const arr = [1, 2, 3, 4, 5, 6];\nconst [, , ...rest] = arr;\nfor (let i = 0; i < rest.length; i++) {\n  console.log(rest[i]);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "3\n4\n5\n6"
              },
              {
                "input": { "arr": [10, 20, 30, 40] },
                "expectedOutput": "30\n40"
              },
              {
                "input": { "arr": [5, 10, 15] },
                "expectedOutput": "15"
              }
            ]
          },
          {
            "description": "// Do not rename config, use it as input for your program.\n// While testing we will change its value.\nconst config = { host: \"localhost\", port: 3000, timeout: 5000 };\n\n// Use object destructuring with renaming\n// Extract 'host' as 'serverHost' and 'port' as 'serverPort'\n// Print both renamed variables on separate lines\n// For the given config, your output should be:\n// localhost\n// 3000",
            "solution_type": "script",
            "reference_solution": "const config = { host: \"localhost\", port: 3000, timeout: 5000 };\nconst { host: serverHost, port: serverPort } = config;\nconsole.log(serverHost);\nconsole.log(serverPort);",
            "testCases": [
              {
                "input": { "config": { "host": "localhost", "port": 3000, "timeout": 5000 } },
                "expectedOutput": "localhost\n3000"
              },
              {
                "input": { "config": { "host": "192.168.1.1", "port": 8080, "timeout": 3000 } },
                "expectedOutput": "192.168.1.1\n8080"
              },
              {
                "input": { "config": { "host": "example.com", "port": 443, "timeout": 10000 } },
                "expectedOutput": "example.com\n443"
              }
            ]
          },
          {
            "description": "// Do not rename students, use it as input for your program.\n// While testing we will change its value.\nconst students = [\n  { name: \"Alice\", grade: 85 },\n  { name: \"Bob\", grade: 92 },\n  { name: \"Charlie\", grade: 78 }\n];\n\n// Use array and object destructuring to extract the name from the first student\n// and the grade from the second student\n// Print both values on separate lines\n// For the given students array, your output should be:\n// Alice\n// 92",
            "solution_type": "script",
            "reference_solution": "const students = [{ name: \"Alice\", grade: 85 }, { name: \"Bob\", grade: 92 }, { name: \"Charlie\", grade: 78 }];\nconst [{ name: firstName }, { grade: secondGrade }] = students;\nconsole.log(firstName);\nconsole.log(secondGrade);",
            "testCases": [
              {
                "input": { "students": [{ "name": "Alice", "grade": 85 }, { "name": "Bob", "grade": 92 }, { "name": "Charlie", "grade": 78 }] },
                "expectedOutput": "Alice\n92"
              },
              {
                "input": { "students": [{ "name": "David", "grade": 90 }, { "name": "Emma", "grade": 88 }] },
                "expectedOutput": "David\n88"
              },
              {
                "input": { "students": [{ "name": "Frank", "grade": 95 }, { "name": "Grace", "grade": 100 }, { "name": "Henry", "grade": 82 }] },
                "expectedOutput": "Frank\n100"
              }
            ]
          },
          {
            "description": "// Do not rename response, use it as input for your program.\n// While testing we will change its value.\nconst response = {\n  status: 200,\n  data: {\n    user: { id: 1, name: \"John\" },\n    posts: [\"post1\", \"post2\"]\n  }\n};\n\n// Use nested destructuring to extract:\n// - status from the top level\n// - name from data.user\n// - The first post from data.posts array\n// Print all three values on separate lines\n// For the given response, your output should be:\n// 200\n// John\n// post1",
            "solution_type": "script",
            "reference_solution": "const response = { status: 200, data: { user: { id: 1, name: \"John\" }, posts: [\"post1\", \"post2\"] } };\nconst { status, data: { user: { name }, posts: [firstPost] } } = response;\nconsole.log(status);\nconsole.log(name);\nconsole.log(firstPost);",
            "testCases": [
              {
                "input": { "response": { "status": 200, "data": { "user": { "id": 1, "name": "John" }, "posts": ["post1", "post2"] } } },
                "expectedOutput": "200\nJohn\npost1"
              },
              {
                "input": { "response": { "status": 404, "data": { "user": { "id": 2, "name": "Alice" }, "posts": ["article1", "article2", "article3"] } } },
                "expectedOutput": "404\nAlice\narticle1"
              }
            ]
          }
        ]
      },
      {
        "id": "spread-rest",
        "title": "Spread and Rest Operators",
        "outcomes": [
          "Spread Syntax: Unpacking Elements and Properties",
          "Shallow Copying: Creating Independent Arrays and Objects",
          "Merging Collections: Combining Multiple Data Sources",
          "Property Overriding: Updating State with Spread",
          "Rest Syntax: Gathering Remaining Values into an Array",
          "Constraint Logic: Why Rest must be the Final Parameter",
          "Structural Comparison: Spread vs. Rest Identification"
        ],
        "topic_notes": `## 1. Spread Syntax: Unpacking Elements and Properties

- ... in front of an array or object "spreads" its elements or properties into a new array or object.
- Use in array literals [...arr] or object literals { ...obj }.

\`\`\`javascript
const arr = [1, 2, 3]
console.log([...arr, 4])
\`\`\`

## 2. Shallow Copying: Creating Independent Arrays and Objects

- [...arr] and { ...obj } create a new array or object with the same top-level values. Nested objects are still shared (shallow copy).

\`\`\`javascript
const orig = [1, 2, 3]
const copy = [...orig]
copy[0] = 100
console.log(orig[0], copy[0])
\`\`\`

## 3. Merging Collections: Combining Multiple Data Sources

- [...a, ...b] concatenates arrays. { ...obj1, ...obj2 } merges objects; later keys overwrite earlier ones.

\`\`\`javascript
const a = [1, 2]
const b = [3, 4]
console.log([...a, ...b])
\`\`\`

## 4. Property Overriding: Updating State with Spread

- { ...obj, key: newValue } copies obj and overrides key. Useful for immutable updates (e.g. in React state).

\`\`\`javascript
const user = { name: "Alice", age: 25 }
const updated = { ...user, age: 26 }
console.log(updated.age)
\`\`\`

## 5. Rest Syntax: Gathering Remaining Values into an Array

- In destructuring, ...rest collects the remaining elements into an array. const [a, ...rest] = arr.

\`\`\`javascript
const [first, ...rest] = [10, 20, 30]
console.log(first, rest)
\`\`\`

## 6. Constraint Logic: Why Rest must be the Final Parameter

- Rest gathers "the rest"; it must be last in the pattern. [a, ...rest, z] is invalid.

\`\`\`javascript
function sum(first, ...others) {
  let s = first
  for (let i = 0; i < others.length; i++) s += others[i]
  return s
}
console.log(sum(1, 2, 3))
\`\`\`

## 7. Structural Comparison: Spread vs. Rest Identification

- Same ... syntax: spread where you are building a value (right side, or inside [] or {}); rest where you are destructuring (left side). Context decides.

\`\`\`javascript
const [x, ...y] = [1, 2, 3]
const z = [...y, 4]
console.log(x, z)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename arr1 and arr2, use them as input for your program.\n// While testing we will change their values.\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\n\n// Use the spread operator to combine arr1 and arr2 into a new array\n// Print each element of the combined array on a new line\n// For arr1 = [1, 2, 3] and arr2 = [4, 5, 6], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
            "solution_type": "script",
            "reference_solution": "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];\nfor (let i = 0; i < combined.length; i++) {\n  console.log(combined[i]);\n}",
            "testCases": [
              {
                "input": { "arr1": [1, 2, 3], "arr2": [4, 5, 6] },
                "expectedOutput": "1\n2\n3\n4\n5\n6"
              },
              {
                "input": { "arr1": [10, 20], "arr2": [30, 40] },
                "expectedOutput": "10\n20\n30\n40"
              },
              {
                "input": { "arr1": [5], "arr2": [15, 25] },
                "expectedOutput": "5\n15\n25"
              }
            ]
          },
          {
            "description": "// Do not rename original, use it as input for your program.\n// While testing we will change its value.\nconst original = [1, 2, 3, 4, 5];\n\n// Create a shallow copy of the array using the spread operator\n// Modify the first element of the copy to be 100\n// Print the first element of the original array, then the first element of the copy\n// This demonstrates that they are independent\n// For original = [1, 2, 3, 4, 5], your output should be:\n// 1\n// 100",
            "solution_type": "script",
            "reference_solution": "const original = [1, 2, 3, 4, 5];\nconst copy = [...original];\ncopy[0] = 100;\nconsole.log(original[0]);\nconsole.log(copy[0]);",
            "testCases": [
              {
                "input": { "original": [1, 2, 3, 4, 5] },
                "expectedOutput": "1\n100"
              },
              {
                "input": { "original": [10, 20, 30] },
                "expectedOutput": "10\n100"
              },
              {
                "input": { "original": [5, 15, 25, 35] },
                "expectedOutput": "5\n100"
              }
            ]
          },
          {
            "description": "// Do not rename obj1 and obj2, use them as input for your program.\n// While testing we will change their values.\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\n\n// Use the spread operator to merge obj1 and obj2 into a new object\n// Print all values of the merged object using Object.values(), each on a new line\n// For obj1 = { a: 1, b: 2 } and obj2 = { c: 3, d: 4 }, your output should be:\n// 1\n// 2\n// 3\n// 4",
            "solution_type": "script",
            "reference_solution": "const obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\nconst merged = { ...obj1, ...obj2 };\nconst vals = Object.values(merged);\nfor (let i = 0; i < vals.length; i++) {\n  console.log(vals[i]);\n}",
            "testCases": [
              {
                "input": { "obj1": { "a": 1, "b": 2 }, "obj2": { "c": 3, "d": 4 } },
                "expectedOutput": "1\n2\n3\n4"
              },
              {
                "input": { "obj1": { "x": 10 }, "obj2": { "y": 20, "z": 30 } },
                "expectedOutput": "10\n20\n30"
              },
              {
                "input": { "obj1": { "m": 5, "n": 10 }, "obj2": { "o": 15 } },
                "expectedOutput": "5\n10\n15"
              }
            ]
          },
          {
            "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { name: \"Alice\", age: 25, city: \"Paris\" };\n\n// Create a new object using spread that copies user and updates the age to 26\n// Print the age from the original object, then the age from the new object\n// For the given user, your output should be:\n// 25\n// 26",
            "solution_type": "script",
            "reference_solution": "const user = { name: \"Alice\", age: 25, city: \"Paris\" };\nconst updated = { ...user, age: 26 };\nconsole.log(user.age);\nconsole.log(updated.age);",
            "testCases": [
              {
                "input": { "user": { "name": "Alice", "age": 25, "city": "Paris" } },
                "expectedOutput": "25\n26"
              },
              {
                "input": { "user": { "name": "Bob", "age": 30, "city": "London" } },
                "expectedOutput": "30\n26"
              },
              {
                "input": { "user": { "name": "Charlie", "age": 20, "city": "Berlin" } },
                "expectedOutput": "20\n26"
              }
            ]
          },
          {
            "description": "// Do not rename numbers, use it as input for your program.\n// While testing we will change its value.\nconst numbers = [5, 10, 15, 20, 25];\n\n// Use rest syntax with array destructuring to get the first element and the rest\n// Calculate the sum of the rest elements (excluding the first)\n// Print the first element on one line, then the sum on the next line\n// For numbers = [5, 10, 15, 20, 25], rest = [10, 15, 20, 25], sum = 70\n// Your output should be:\n// 5\n// 70",
            "solution_type": "script",
            "reference_solution": "const numbers = [5, 10, 15, 20, 25];\nconst [first, ...rest] = numbers;\nlet sum = 0;\nfor (let i = 0; i < rest.length; i++) sum += rest[i];\nconsole.log(first);\nconsole.log(sum);",
            "testCases": [
              {
                "input": { "numbers": [5, 10, 15, 20, 25] },
                "expectedOutput": "5\n70"
              },
              {
                "input": { "numbers": [1, 2, 3, 4] },
                "expectedOutput": "1\n9"
              },
              {
                "input": { "numbers": [100, 50, 25] },
                "expectedOutput": "100\n75"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [10, 20, 30, 40, 50];\n\n// Use spread operator to insert the number 25 between 20 and 30\n// Create a new array with: first 2 elements, then 25, then the rest\n// Print each element of the new array on a new line\n// For arr = [10, 20, 30, 40, 50], your output should be:\n// 10\n// 20\n// 25\n// 30\n// 40\n// 50",
            "solution_type": "script",
            "reference_solution": "const arr = [10, 20, 30, 40, 50];\nconst newArr = [...arr.slice(0, 2), 25, ...arr.slice(2)];\nfor (let i = 0; i < newArr.length; i++) {\n  console.log(newArr[i]);\n}",
            "testCases": [
              {
                "input": { "arr": [10, 20, 30, 40, 50] },
                "expectedOutput": "10\n20\n25\n30\n40\n50"
              },
              {
                "input": { "arr": [1, 2, 3, 4] },
                "expectedOutput": "1\n2\n25\n3\n4"
              },
              {
                "input": { "arr": [5, 10, 15] },
                "expectedOutput": "5\n10\n25\n15"
              }
            ]
          },
          {
            "description": "// Do not rename obj, use it as input for your program.\n// While testing we will change its value.\nconst obj = { a: 1, b: 2, c: 3, d: 4 };\n\n// Use rest syntax with object destructuring to extract 'a' and gather the rest\n// Print the value of 'a', then print the count of remaining properties\n// For obj = { a: 1, b: 2, c: 3, d: 4 }, rest has 3 properties\n// Your output should be:\n// 1\n// 3",
            "solution_type": "script",
            "reference_solution": "const obj = { a: 1, b: 2, c: 3, d: 4 };\nconst { a, ...rest } = obj;\nconsole.log(a);\nconsole.log(Object.keys(rest).length);",
            "testCases": [
              {
                "input": { "obj": { "a": 1, "b": 2, "c": 3, "d": 4 } },
                "expectedOutput": "1\n3"
              },
              {
                "input": { "obj": { "a": 10, "x": 20, "y": 30 } },
                "expectedOutput": "10\n2"
              },
              {
                "input": { "obj": { "a": 5, "b": 10 } },
                "expectedOutput": "5\n1"
              }
            ]
          },
          {
            "description": "// Do not rename arrays, use it as input for your program.\n// While testing we will change its value.\nconst arrays = [[1, 2], [3, 4], [5, 6]];\n\n// Use spread operator to flatten the array of arrays into a single array\n// Print each element of the flattened array on a new line\n// For arrays = [[1, 2], [3, 4], [5, 6]], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5\n// 6",
            "solution_type": "script",
            "reference_solution": "const arrays = [[1, 2], [3, 4], [5, 6]];\nlet flat = [];\nfor (let i = 0; i < arrays.length; i++) {\n  flat = [...flat, ...arrays[i]];\n}\nfor (let i = 0; i < flat.length; i++) {\n  console.log(flat[i]);\n}",
            "testCases": [
              {
                "input": { "arrays": [[1, 2], [3, 4], [5, 6]] },
                "expectedOutput": "1\n2\n3\n4\n5\n6"
              },
              {
                "input": { "arrays": [[10], [20, 30], [40]] },
                "expectedOutput": "10\n20\n30\n40"
              },
              {
                "input": { "arrays": [[5, 10, 15], [20, 25]] },
                "expectedOutput": "5\n10\n15\n20\n25"
              }
            ]
          },
          {
            "description": "// Do not rename defaults and overrides, use them as input for your program.\n// While testing we will change their values.\nconst defaults = { theme: \"light\", fontSize: 14, language: \"en\" };\nconst overrides = { fontSize: 16, language: \"fr\" };\n\n// Merge defaults and overrides using spread operator\n// overrides should take precedence over defaults\n// Print all values from the merged object using Object.values(), each on a new line\n// For the given objects, your output should be:\n// light\n// 16\n// fr",
            "solution_type": "script",
            "reference_solution": "const defaults = { theme: \"light\", fontSize: 14, language: \"en\" };\nconst overrides = { fontSize: 16, language: \"fr\" };\nconst merged = { ...defaults, ...overrides };\nconst vals = Object.values(merged);\nfor (let i = 0; i < vals.length; i++) {\n  console.log(vals[i]);\n}",
            "testCases": [
              {
                "input": { "defaults": { "theme": "light", "fontSize": 14, "language": "en" }, "overrides": { "fontSize": 16, "language": "fr" } },
                "expectedOutput": "light\n16\nfr"
              },
              {
                "input": { "defaults": { "color": "blue", "size": 10 }, "overrides": { "color": "red" } },
                "expectedOutput": "red\n10"
              },
              {
                "input": { "defaults": { "a": 1, "b": 2, "c": 3 }, "overrides": { "b": 20, "c": 30 } },
                "expectedOutput": "1\n20\n30"
              }
            ]
          },
          {
            "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"hello\";\n\n// Use spread operator to convert the string into an array of characters\n// Then use rest syntax to get the first character and the rest\n// Print the first character, then print the count of remaining characters\n// For str = \"hello\", first = 'h', rest has 4 characters\n// Your output should be:\n// h\n// 4",
            "solution_type": "script",
            "reference_solution": "const str = \"hello\";\nconst chars = [...str];\nconst [first, ...rest] = chars;\nconsole.log(first);\nconsole.log(rest.length);",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "h\n4"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "w\n4"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "J\n9"
              },
              {
                "input": { "str": "ab" },
                "expectedOutput": "a\n1"
              }
            ]
          }
        ]
      },
      {
        "id": "json",
        "title": "Data Serialization",
        "outcomes": [
          "JSON Fundamentals: The Universal Data Interchange Format",
          "JSON Syntax Rules: Why it is stricter than JS Objects",
          "JSON.stringify(): Converting Objects to Strings",
          "JSON.parse(): Reconstructing Objects from Strings",
          "Formatting: Using Spacing and Replacers in stringify",
          "The Reviver: Transforming Data during Parsing",
          "Serialization Limits: Handling Functions and undefined",
          "The Deep Clone Trick: Creating Independent Object Copies",
          "Architectural Distinction: JSON vs. JavaScript Object Literals"
        ],
        "topic_notes": `## 1. JSON Fundamentals: The Universal Data Interchange Format

- JSON is a text format for data. It is language-independent and used for APIs and config. Keys must be double-quoted strings.

\`\`\`javascript
const str = '{"name":"Alice","age":25}'
console.log(str)
\`\`\`

## 2. JSON Syntax Rules: Why it is stricter than JS Objects

- Keys must be in double quotes. No trailing commas. Values: string, number, boolean, null, array, or object. No functions or undefined.

\`\`\`javascript
const valid = '{"a":1,"b":true}'
\`\`\`

## 3. JSON.stringify(): Converting Objects to Strings

- JSON.stringify(obj) turns a JavaScript value into a JSON string. Used to send data or store it.

\`\`\`javascript
const user = { name: "Alice", age: 25 }
console.log(JSON.stringify(user))
\`\`\`

## 4. JSON.parse(): Reconstructing Objects from Strings

- JSON.parse(str) turns a JSON string back into a JavaScript value. Throws if the string is invalid.

\`\`\`javascript
const str = '{"product":"Laptop","price":999}'
const obj = JSON.parse(str)
console.log(obj.product, obj.price)
\`\`\`

## 5. Formatting: Using Spacing and Replacers in stringify

- JSON.stringify(obj, null, 2) adds indentation (2 spaces). Second argument can be a replacer array or function.

\`\`\`javascript
const data = { name: "Test", value: 42 }
console.log(JSON.stringify(data, null, 2))
\`\`\`

## 6. The Reviver: Transforming Data during Parsing

- JSON.parse(str, (key, value) => ...) lets you transform each key-value during parse (e.g. revive Date strings).

\`\`\`javascript
const str = '{"n":10}'
const o = JSON.parse(str)
console.log(o.n)
\`\`\`

## 7. Serialization Limits: Handling Functions and undefined

- Functions and undefined are omitted by stringify (or become null in arrays). JSON cannot represent them.

\`\`\`javascript
const o = { a: 1, b: undefined }
console.log(JSON.stringify(o))
\`\`\`

## 8. The Deep Clone Trick: Creating Independent Object Copies

- JSON.parse(JSON.stringify(obj)) creates a deep copy. Only works for JSON-serializable data (no functions, no circular refs).

\`\`\`javascript
const orig = { x: 1, y: [2, 3] }
const clone = JSON.parse(JSON.stringify(orig))
clone.y[0] = 99
console.log(orig.y[0], clone.y[0])
\`\`\`

## 9. Architectural Distinction: JSON vs. JavaScript Object Literals

- JSON is a string format. Object literals are code. stringify goes from JS to JSON; parse goes from JSON to JS.

\`\`\`javascript
const obj = { id: 1 }
const jsonStr = JSON.stringify(obj)
const back = JSON.parse(jsonStr)
console.log(back.id)
\`\`\``,
        "tasks": [
          {
            "description": "// Do not rename user, use it as input for your program.\n// While testing we will change its value.\nconst user = { name: \"Alice\", age: 25, city: \"Paris\" };\n\n// Convert the user object to a JSON string using JSON.stringify()\n// Print the JSON string\n// For the given user, your output should be:\n// {\"name\":\"Alice\",\"age\":25,\"city\":\"Paris\"}",
            "solution_type": "script",
            "reference_solution": "const user = { name: \"Alice\", age: 25, city: \"Paris\" };\nconsole.log(JSON.stringify(user));",
            "testCases": [
              {
                "input": { "user": { "name": "Alice", "age": 25, "city": "Paris" } },
                "expectedOutput": "{\"name\":\"Alice\",\"age\":25,\"city\":\"Paris\"}"
              },
              {
                "input": { "user": { "name": "Bob", "age": 30, "city": "London" } },
                "expectedOutput": "{\"name\":\"Bob\",\"age\":30,\"city\":\"London\"}"
              },
              {
                "input": { "user": { "name": "Charlie", "age": 35, "city": "Berlin" } },
                "expectedOutput": "{\"name\":\"Charlie\",\"age\":35,\"city\":\"Berlin\"}"
              }
            ]
          },
          {
            "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}';\n\n// Parse the JSON string using JSON.parse()\n// Extract and print the product name and price on separate lines\n// For the given jsonStr, your output should be:\n// Laptop\n// 999",
            "solution_type": "script",
            "reference_solution": "const jsonStr = '{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}';\nconst obj = JSON.parse(jsonStr);\nconsole.log(obj.product);\nconsole.log(obj.price);",
            "testCases": [
              {
                "input": { "jsonStr": "{\"product\":\"Laptop\",\"price\":999,\"inStock\":true}" },
                "expectedOutput": "Laptop\n999"
              },
              {
                "input": { "jsonStr": "{\"product\":\"Phone\",\"price\":599,\"inStock\":false}" },
                "expectedOutput": "Phone\n599"
              },
              {
                "input": { "jsonStr": "{\"product\":\"Tablet\",\"price\":399,\"inStock\":true}" },
                "expectedOutput": "Tablet\n399"
              }
            ]
          },
          {
            "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = { name: \"Test\", value: 42, active: true };\n\n// Convert data to a JSON string with indentation (use 2 spaces)\n// Print the formatted JSON string\n// For the given data, your output should be:\n// {\n//   \"name\": \"Test\",\n//   \"value\": 42,\n//   \"active\": true\n// }",
            "solution_type": "script",
            "reference_solution": "const data = { name: \"Test\", value: 42, active: true };\nconsole.log(JSON.stringify(data, null, 2));",
            "testCases": [
              {
                "input": { "data": { "name": "Test", "value": 42, "active": true } },
                "expectedOutput": "{\n  \"name\": \"Test\",\n  \"value\": 42,\n  \"active\": true\n}"
              },
              {
                "input": { "data": { "x": 10, "y": 20 } },
                "expectedOutput": "{\n  \"x\": 10,\n  \"y\": 20\n}"
              },
              {
                "input": { "data": { "id": 1, "type": "admin" } },
                "expectedOutput": "{\n  \"id\": 1,\n  \"type\": \"admin\"\n}"
              }
            ]
          },
          {
            "description": "// Do not rename original, use it as input for your program.\n// While testing we will change its value.\nconst original = { name: \"Alice\", scores: [85, 90, 95] };\n\n// Create a deep clone of the original object using JSON methods\n// Modify the first score in the clone to 100\n// Print the first score from original, then from the clone\n// This demonstrates they are independent\n// For the given original, your output should be:\n// 85\n// 100",
            "solution_type": "script",
            "reference_solution": "const original = { name: \"Alice\", scores: [85, 90, 95] };\nconst clone = JSON.parse(JSON.stringify(original));\nclone.scores[0] = 100;\nconsole.log(original.scores[0]);\nconsole.log(clone.scores[0]);",
            "testCases": [
              {
                "input": { "original": { "name": "Alice", "scores": [85, 90, 95] } },
                "expectedOutput": "85\n100"
              },
              {
                "input": { "original": { "name": "Bob", "scores": [70, 75, 80] } },
                "expectedOutput": "70\n100"
              },
              {
                "input": { "original": { "name": "Charlie", "scores": [60, 65] } },
                "expectedOutput": "60\n100"
              }
            ]
          },
          {
            "description": "// Do not rename arr, use it as input for your program.\n// While testing we will change its value.\nconst arr = [1, 2, 3, 4, 5];\n\n// Convert the array to a JSON string\n// Then parse it back and print each element on a new line\n// For arr = [1, 2, 3, 4, 5], your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5",
            "solution_type": "script",
            "reference_solution": "const arr = [1, 2, 3, 4, 5];\nconst str = JSON.stringify(arr);\nconst parsed = JSON.parse(str);\nfor (let i = 0; i < parsed.length; i++) {\n  console.log(parsed[i]);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "1\n2\n3\n4\n5"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "10\n20\n30"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "// Do not rename obj, use it as input for your program.\n// While testing we will change its value.\nconst obj = {\n  id: 1,\n  name: \"John\",\n  email: \"john@example.com\",\n  password: \"secret123\",\n  role: \"user\"\n};\n\n// Convert obj to JSON, but exclude the 'password' field\n// Use the replacer parameter in JSON.stringify()\n// Print the resulting JSON string\n// For the given obj, your output should be:\n// {\"id\":1,\"name\":\"John\",\"email\":\"john@example.com\",\"role\":\"user\"}",
            "solution_type": "script",
            "reference_solution": "const obj = { id: 1, name: \"John\", email: \"john@example.com\", password: \"secret123\", role: \"user\" };\nfunction replacer(key, value) {\n  if (key === 'password') return undefined;\n  return value;\n}\nconsole.log(JSON.stringify(obj, replacer));",
            "testCases": [
              {
                "input": { "obj": { "id": 1, "name": "John", "email": "john@example.com", "password": "secret123", "role": "user" } },
                "expectedOutput": "{\"id\":1,\"name\":\"John\",\"email\":\"john@example.com\",\"role\":\"user\"}"
              },
              {
                "input": { "obj": { "id": 2, "name": "Alice", "email": "alice@test.com", "password": "pass456", "role": "admin" } },
                "expectedOutput": "{\"id\":2,\"name\":\"Alice\",\"email\":\"alice@test.com\",\"role\":\"admin\"}"
              }
            ]
          },
          {
            "description": "// Do not rename nested, use it as input for your program.\n// While testing we will change its value.\nconst nested = {\n  user: {\n    name: \"Bob\",\n    address: {\n      city: \"Paris\",\n      country: \"France\"\n    }\n  }\n};\n\n// Convert the nested object to JSON and back\n// Access and print the city from the parsed object\n// For the given nested object, your output should be: Paris",
            "solution_type": "script",
            "reference_solution": "const nested = { user: { name: \"Bob\", address: { city: \"Paris\", country: \"France\" } } };\nconst str = JSON.stringify(nested);\nconst parsed = JSON.parse(str);\nconsole.log(parsed.user.address.city);",
            "testCases": [
              {
                "input": { "nested": { "user": { "name": "Bob", "address": { "city": "Paris", "country": "France" } } } },
                "expectedOutput": "Paris"
              },
              {
                "input": { "nested": { "user": { "name": "Alice", "address": { "city": "London", "country": "UK" } } } },
                "expectedOutput": "London"
              },
              {
                "input": { "nested": { "user": { "name": "Charlie", "address": { "city": "Berlin", "country": "Germany" } } } },
                "expectedOutput": "Berlin"
              }
            ]
          },
          {
            "description": "// Do not rename jsonStr, use it as input for your program.\n// While testing we will change its value.\nconst jsonStr = '[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]';\n\n// Parse the JSON string (array of objects)\n// Calculate and print the average age\n// Round to 2 decimal places\n// For the given jsonStr, average = (25 + 30 + 35) / 3 = 30.00\n// Your output should be: 30.00",
            "solution_type": "script",
            "reference_solution": "const jsonStr = '[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]';\nconst arr = JSON.parse(jsonStr);\nlet sum = 0;\nfor (let i = 0; i < arr.length; i++) sum += arr[i].age;\nconst avg = sum / arr.length;\nconsole.log(avg.toFixed(2));",
            "testCases": [
              {
                "input": { "jsonStr": "[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Bob\",\"age\":30},{\"name\":\"Charlie\",\"age\":35}]" },
                "expectedOutput": "30.00"
              },
              {
                "input": { "jsonStr": "[{\"name\":\"David\",\"age\":20},{\"name\":\"Emma\",\"age\":22}]" },
                "expectedOutput": "21.00"
              },
              {
                "input": { "jsonStr": "[{\"name\":\"Frank\",\"age\":40},{\"name\":\"Grace\",\"age\":45},{\"name\":\"Henry\",\"age\":50}]" },
                "expectedOutput": "45.00"
              }
            ]
          },
          {
            "description": "// Do not rename data, use it as input for your program.\n// While testing we will change its value.\nconst data = {\n  items: [\n    { name: \"Item1\", price: 10 },\n    { name: \"Item2\", price: 20 },\n    { name: \"Item3\", price: 30 }\n  ]\n};\n\n// Convert data to JSON string, parse it back\n// Calculate the total price of all items\n// Print only the total\n// For the given data, your output should be: 60",
            "solution_type": "script",
            "reference_solution": "const data = { items: [{ name: \"Item1\", price: 10 }, { name: \"Item2\", price: 20 }, { name: \"Item3\", price: 30 }] };\nconst str = JSON.stringify(data);\nconst parsed = JSON.parse(str);\nlet total = 0;\nfor (let i = 0; i < parsed.items.length; i++) total += parsed.items[i].price;\nconsole.log(total);",
            "testCases": [
              {
                "input": { "data": { "items": [{ "name": "Item1", "price": 10 }, { "name": "Item2", "price": 20 }, { "name": "Item3", "price": 30 }] } },
                "expectedOutput": "60"
              },
              {
                "input": { "data": { "items": [{ "name": "A", "price": 5 }, { "name": "B", "price": 15 }] } },
                "expectedOutput": "20"
              },
              {
                "input": { "data": { "items": [{ "name": "X", "price": 100 }] } },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "// Do not rename config, use it as input for your program.\n// While testing we will change its value.\nconst config = {\n  theme: \"dark\",\n  fontSize: 14,\n  notifications: true,\n  autoSave: false\n};\n\n// Convert config to JSON string, parse it back\n// Count how many boolean properties exist\n// Print only the count\n// For the given config, your output should be: 2",
            "solution_type": "script",
            "reference_solution": "const config = { theme: \"dark\", fontSize: 14, notifications: true, autoSave: false };\nconst str = JSON.stringify(config);\nconst parsed = JSON.parse(str);\nlet count = 0;\nfor (const key in parsed) {\n  if (typeof parsed[key] === 'boolean') count++;\n}\nconsole.log(count);",
            "testCases": [
              {
                "input": { "config": { "theme": "dark", "fontSize": 14, "notifications": true, "autoSave": false } },
                "expectedOutput": "2"
              },
              {
                "input": { "config": { "a": true, "b": 10, "c": false, "d": true } },
                "expectedOutput": "3"
              },
              {
                "input": { "config": { "x": "test", "y": 5, "z": "hello" } },
                "expectedOutput": "0"
              }
            ]
          }
        ]
      },
      {
        "id": "functions",
        "title": "Functions",
        "outcomes": [
          "Function Declaration: Defining a Reusable Logic Block",
          "The Call Stack: Executing and Invoking Functions",
          "Input Channels: Working with Parameters",
          "Data Passing: Providing Arguments during Invocation",
          "The return Statement: Outputting Data from a Function",
          "The return vs. console.log Distinction",
          "Multi-input Logic: Handling Multiple Parameters",
          "Identifier Naming: Descriptive Verb-based Names",
          "Software Design: Reusability and Single Responsibility"
        ],
        "topic_notes": `## 1. Function Declaration: Defining a Reusable Logic Block

- function name() { ... } defines a reusable block of code. Call it with name().

\`\`\`javascript
function greet() {
  return "Hello, World!"
}
console.log(greet())
\`\`\`

## 2. The Call Stack: Executing and Invoking Functions

- When you call a function, execution jumps into it; when it returns, execution resumes after the call. Nested calls stack.

\`\`\`javascript
function one() { return 1 }
function two() { return one() + 1 }
console.log(two())
\`\`\`

## 3. Input Channels: Working with Parameters

- Parameters are placeholders in the function definition. They receive the values you pass when you call the function.

\`\`\`javascript
function double(num) {
  return num * 2
}
console.log(double(5))
\`\`\`

## 4. Data Passing: Providing Arguments during Invocation

- Arguments are the values you pass: fn(10, 20). They are assigned to the parameters in order.

\`\`\`javascript
function add(a, b) {
  return a + b
}
console.log(add(10, 20))
\`\`\`

## 5. The return Statement: Outputting Data from a Function

- return value sends a value back to the caller. Execution of the function stops at return.

\`\`\`javascript
function getMax(x, y) {
  if (x >= y) return x
  return y
}
console.log(getMax(15, 10))
\`\`\`

## 6. The return vs. console.log Distinction

- return gives a value to the caller; the caller can use it. console.log only prints; it does not pass a value back.

\`\`\`javascript
function add(a, b) {
  return a + b
}
const sum = add(2, 3)
console.log(sum)
\`\`\`

## 7. Multi-input Logic: Handling Multiple Parameters

- Functions can take multiple parameters. Order of arguments must match the order of parameters (or use an options object).

\`\`\`javascript
function greet(firstName, lastName) {
  return firstName + " " + lastName
}
console.log(greet("Jane", "Doe"))
\`\`\`

## 8. Identifier Naming: Descriptive Verb-based Names

- Use descriptive names: verbs for actions (getTotal, isValid), nouns for data (user, count). Keeps code readable.

\`\`\`javascript
function isEven(num) {
  return num % 2 === 0
}
\`\`\`

## 9. Software Design: Reusability and Single Responsibility

- Write small functions that do one thing. Reuse them instead of duplicating logic. Easier to test and change.

\`\`\`javascript
function double(n) { return n * 2 }
function triple(n) { return n * 3 }
console.log(double(5), triple(5))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that takes no parameters and returns \"Hello, World!\".\n  Examples:\n    greet() => \"Hello, World!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction greet() {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "greet",
            "reference_solution": "function greet() {\n  return \"Hello, World!\";\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Hello, World!"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to double a number.\n  Examples:\n    double(5) => 10\n    double(7) => 14\n    double(0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction double(num) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "double",
            "reference_solution": "function double(num) {\n  return num * 2;\n}",
            "testCases": [
              {
                "input": { "num": 5 },
                "expectedOutput": "10"
              },
              {
                "input": { "num": 10 },
                "expectedOutput": "20"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "14"
              },
              {
                "input": { "num": 0 },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to add two numbers.\n  Examples:\n    add(10, 20) => 30\n    add(5, 15) => 20\n    add(0, 0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction add(a, b) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "add",
            "reference_solution": "function add(a, b) {\n  return a + b;\n}",
            "testCases": [
              {
                "input": { "a": 10, "b": 20 },
                "expectedOutput": "30"
              },
              {
                "input": { "a": 5, "b": 15 },
                "expectedOutput": "20"
              },
              {
                "input": { "a": 100, "b": 200 },
                "expectedOutput": "300"
              },
              {
                "input": { "a": 0, "b": 0 },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to check if a number is even.\n  Examples:\n    isEven(4) => true\n    isEven(7) => false\n    isEven(0) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isEven(num) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "isEven",
            "reference_solution": "function isEven(num) {\n  return num % 2 === 0;\n}",
            "testCases": [
              {
                "input": { "num": 4 },
                "expectedOutput": "true"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "false"
              },
              {
                "input": { "num": 0 },
                "expectedOutput": "true"
              },
              {
                "input": { "num": 13 },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to find the maximum of two numbers.\n  If they're equal, return either one.\n  Examples:\n    getMax(15, 10) => 15\n    getMax(5, 20) => 20\n    getMax(10, 10) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getMax(x, y) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "getMax",
            "reference_solution": "function getMax(x, y) {\n  if (x >= y) return x;\n  return y;\n}",
            "testCases": [
              {
                "input": { "x": 15, "y": 10 },
                "expectedOutput": "15"
              },
              {
                "input": { "x": 5, "y": 20 },
                "expectedOutput": "20"
              },
              {
                "input": { "x": 10, "y": 10 },
                "expectedOutput": "10"
              },
              {
                "input": { "x": 100, "y": 50 },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to calculate the area of a rectangle.\n  Area = width × height\n  Examples:\n    calculateArea(5, 10) => 50\n    calculateArea(7, 3) => 21\n    calculateArea(1, 1) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateArea(width, height) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "calculateArea",
            "reference_solution": "function calculateArea(width, height) {\n  return width * height;\n}",
            "testCases": [
              {
                "input": { "width": 5, "height": 10 },
                "expectedOutput": "50"
              },
              {
                "input": { "width": 7, "height": 3 },
                "expectedOutput": "21"
              },
              {
                "input": { "width": 12, "height": 8 },
                "expectedOutput": "96"
              },
              {
                "input": { "width": 1, "height": 1 },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to count vowels in a string.\n  Count vowels (a, e, i, o, u) - case insensitive.\n  Examples:\n    countVowels(\"hello\") => 2\n    countVowels(\"JavaScript\") => 3\n    countVowels(\"AEIOU\") => 5\n    countVowels(\"xyz\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countVowels(str) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "countVowels",
            "reference_solution": "function countVowels(str) {\n  const lower = str.toLowerCase();\n  let count = 0;\n  for (let i = 0; i < lower.length; i++) {\n    const c = lower[i];\n    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') count++;\n  }\n  return count;\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "2"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "AEIOU" },
                "expectedOutput": "5"
              },
              {
                "input": { "str": "xyz" },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to reverse a string.\n  Examples:\n    reverseString(\"hello\") => \"olleh\"\n    reverseString(\"world\") => \"dlrow\"\n    reverseString(\"JavaScript\") => \"tpircSavaJ\"\n    reverseString(\"a\") => \"a\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseString(str) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "reverseString",
            "reference_solution": "function reverseString(str) {\n  let result = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    result += str[i];\n  }\n  return result;\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "olleh"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "dlrow"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "tpircSavaJ"
              },
              {
                "input": { "str": "a" },
                "expectedOutput": "a"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to check if a string is a palindrome.\n  A palindrome reads the same forwards and backwards.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n    isPalindrome(\"noon\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "isPalindrome",
            "reference_solution": "function isPalindrome(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return str === reversed;\n}",
            "testCases": [
              {
                "input": { "str": "racecar" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "madam" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "noon" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to calculate the sum of all elements in an array.\n  Examples:\n    sumArray([1, 2, 3, 4, 5]) => 15\n    sumArray([10, 20, 30]) => 60\n    sumArray([5]) => 5\n    sumArray([0, 0, 0]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumArray(arr) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "sumArray",
            "reference_solution": "function sumArray(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "60"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [0, 0, 0] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to find the largest number in an array.\n  Examples:\n    findMax([5, 12, 8, 21, 3]) => 21\n    findMax([1, 2, 3, 4, 5]) => 5\n    findMax([100]) => 100\n    findMax([50, 25, 75, 10]) => 75\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "findMax",
            "reference_solution": "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}",
            "testCases": [
              {
                "input": { "arr": [5, 12, 8, 21, 3] },
                "expectedOutput": "21"
              },
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              },
              {
                "input": { "arr": [50, 25, 75, 10] },
                "expectedOutput": "75"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function to calculate the factorial of a number.\n  Factorial of n = n × (n-1) × (n-2) × ... × 1\n  Examples:\n    factorial(5) => 120 => 5 × 4 × 3 × 2 × 1\n    factorial(3) => 6 => 3 × 2 × 1\n    factorial(1) => 1\n    factorial(7) => 5040\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction factorial(n) {\n  // Implementation here.\n}",
            "solution_type": "function",
            "function_name": "factorial",
            "reference_solution": "function factorial(n) {\n  let result = 1;\n  for (let i = 1; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "120"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "6"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "n": 7 },
                "expectedOutput": "5040"
              }
            ]
          }
        ]
      },
      {
        "id": "arrow-functions",
        "title": "Arrow Functions",
        "outcomes": [
          "Arrow Syntax: The Modern Function Expression",
          "Concise vs. Full Body: Knowing when to use { }",
          "Parameter Formatting: Rules for () and single inputs",
          "Implicit Return: Returning values without the keyword",
          "The Object Trap: Returning Object Literals safely",
          "Functional Synergy: Arrow Functions with Array Methods",
          "Lexical this: How arrows inherit context",
          "Architectural Constraints: When to stick to regular functions"
        ],
        "topic_notes": `## 1. Arrow Syntax: The Modern Function Expression

- (params) => { body } is an arrow function. Often assigned to a const: const fn = () => { ... }. No function keyword.

\`\`\`javascript
const greet = () => {
  return "Hello!"
}
console.log(greet())
\`\`\`

## 2. Concise vs. Full Body: Knowing when to use { }

- One expression after => can omit braces and return: x => x * 2. Multiple statements need { } and explicit return.

\`\`\`javascript
const double = (n) => n * 2
const add = (a, b) => {
  const sum = a + b
  return sum
}
console.log(double(5), add(2, 3))
\`\`\`

## 3. Parameter Formatting: Rules for () and single inputs

- No params: () => ... . One param: (x) => ... or x => ... (parentheses optional). Two or more: (a, b) => ... .

\`\`\`javascript
const square = (num) => num * num
const add = (a, b) => a + b
console.log(square(5), add(1, 2))
\`\`\`

## 4. Implicit Return: Returning values without the keyword

- When the body is a single expression (no { }), that expression is returned automatically. No return keyword.

\`\`\`javascript
const isEven = (n) => n % 2 === 0
console.log(isEven(4))
\`\`\`

## 5. The Object Trap: Returning Object Literals safely

- () => ({ key: value }) returns an object. Without parentheses, { } is treated as the function body, not an object.

\`\`\`javascript
const makePoint = (x, y) => ({ x, y })
console.log(makePoint(1, 2))
\`\`\`

## 6. Functional Synergy: Arrow Functions with Array Methods

- Arrow functions are handy as callbacks: arr.map(x => x * 2), arr.filter(x => x > 0). Short and clear.

\`\`\`javascript
const nums = [1, 2, 3]
const doubled = nums.map((n) => n * 2)
console.log(doubled)
\`\`\`

## 7. Lexical this: How arrows inherit context

- Arrow functions do not have their own this. They use the this from the surrounding (lexical) scope. Useful in callbacks.

\`\`\`javascript
const obj = {
  value: 10,
  getVal: function () {
    const fn = () => this.value
    return fn()
  }
}
console.log(obj.getVal())
\`\`\`

## 8. Architectural Constraints: When to stick to regular functions

- Use regular functions for constructors (new), methods that need their own this, or when you need arguments. Arrows for callbacks and short helpers.

\`\`\`javascript
const add = (a, b) => a + b
console.log(add(10, 20))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below arrow function that takes no parameters and returns \"Hello!\".\n  Examples:\n    greet() => \"Hello!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst greet = () => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "greet",
            "reference_solution": "const greet = () => {\n  return \"Hello!\";\n};",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Hello!"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to calculate the square of a number.\n  Examples:\n    square(5) => 25\n    square(7) => 49\n    square(0) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst square = (num) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "square",
            "reference_solution": "const square = (num) => {\n  return num * num;\n};",
            "testCases": [
              {
                "input": { "num": 5 },
                "expectedOutput": "25"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "49"
              },
              {
                "input": { "num": 10 },
                "expectedOutput": "100"
              },
              {
                "input": { "num": 0 },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to multiply two numbers.\n  Examples:\n    multiply(6, 7) => 42\n    multiply(5, 5) => 25\n    multiply(0, 100) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst multiply = (a, b) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "multiply",
            "reference_solution": "const multiply = (a, b) => {\n  return a * b;\n};",
            "testCases": [
              {
                "input": { "a": 6, "b": 7 },
                "expectedOutput": "42"
              },
              {
                "input": { "a": 5, "b": 5 },
                "expectedOutput": "25"
              },
              {
                "input": { "a": 10, "b": 3 },
                "expectedOutput": "30"
              },
              {
                "input": { "a": 0, "b": 100 },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to check if a number is positive.\n  Examples:\n    isPositive(5) => true\n    isPositive(-3) => false\n    isPositive(0) => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst isPositive = (num) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "isPositive",
            "reference_solution": "const isPositive = (num) => {\n  return num > 0;\n};",
            "testCases": [
              {
                "input": { "num": 5 },
                "expectedOutput": "true"
              },
              {
                "input": { "num": -3 },
                "expectedOutput": "false"
              },
              {
                "input": { "num": 0 },
                "expectedOutput": "false"
              },
              {
                "input": { "num": 100 },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to create a full name from first and last names.\n  Examples:\n    getFullName(\"John\", \"Doe\") => \"John Doe\"\n    getFullName(\"Jane\", \"Smith\") => \"Jane Smith\"\n    getFullName(\"Alice\", \"Johnson\") => \"Alice Johnson\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getFullName = (firstName, lastName) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "getFullName",
            "reference_solution": "const getFullName = (firstName, lastName) => {\n  return firstName + \" \" + lastName;\n};",
            "testCases": [
              {
                "input": { "firstName": "John", "lastName": "Doe" },
                "expectedOutput": "John Doe"
              },
              {
                "input": { "firstName": "Jane", "lastName": "Smith" },
                "expectedOutput": "Jane Smith"
              },
              {
                "input": { "firstName": "Alice", "lastName": "Johnson" },
                "expectedOutput": "Alice Johnson"
              },
              {
                "input": { "firstName": "Bob", "lastName": "Brown" },
                "expectedOutput": "Bob Brown"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to create a person object.\n  Return an object with name and age properties.\n  Examples:\n    createPerson(\"Alice\", 25) => {\"name\":\"Alice\",\"age\":25}\n    createPerson(\"Bob\", 30) => {\"name\":\"Bob\",\"age\":30}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst createPerson = (name, age) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "createPerson",
            "reference_solution": "const createPerson = (name, age) => {\n  return { name: name, age: age };\n};",
            "testCases": [
              {
                "input": { "name": "Alice", "age": 25 },
                "expectedOutput": "{\"name\":\"Alice\",\"age\":25}"
              },
              {
                "input": { "name": "Bob", "age": 30 },
                "expectedOutput": "{\"name\":\"Bob\",\"age\":30}"
              },
              {
                "input": { "name": "Charlie", "age": 22 },
                "expectedOutput": "{\"name\":\"Charlie\",\"age\":22}"
              },
              {
                "input": { "name": "Diana", "age": 28 },
                "expectedOutput": "{\"name\":\"Diana\",\"age\":28}"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to filter even numbers from an array.\n  Examples:\n    filterEven([1, 2, 3, 4, 5, 6]) => [2,4,6]\n    filterEven([10, 15, 20, 25]) => [10,20]\n    filterEven([1, 3, 5, 7]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst filterEven = (arr) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "filterEven",
            "reference_solution": "const filterEven = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) result.push(arr[i]);\n  }\n  return result;\n};",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "[2,4,6]"
              },
              {
                "input": { "arr": [10, 15, 20, 25] },
                "expectedOutput": "[10,20]"
              },
              {
                "input": { "arr": [1, 3, 5, 7] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [2, 4, 6, 8] },
                "expectedOutput": "[2,4,6,8]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to double all values in an array.\n  Examples:\n    doubleValues([1, 2, 3, 4]) => [2,4,6,8]\n    doubleValues([5, 10, 15]) => [10,20,30]\n    doubleValues([0, 1, 2]) => [0,2,4]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst doubleValues = (arr) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "doubleValues",
            "reference_solution": "const doubleValues = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr[i] * 2);\n  }\n  return result;\n};",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4] },
                "expectedOutput": "[2,4,6,8]"
              },
              {
                "input": { "arr": [5, 10, 15] },
                "expectedOutput": "[10,20,30]"
              },
              {
                "input": { "arr": [0, 1, 2] },
                "expectedOutput": "[0,2,4]"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "[14]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to calculate the sum of all elements in an array.\n  Examples:\n    sumAll([1, 2, 3, 4, 5]) => 15\n    sumAll([10, 20, 30]) => 60\n    sumAll([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst sumAll = (arr) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "sumAll",
            "reference_solution": "const sumAll = (arr) => {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n};",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "60"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [0, 0, 0] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to get the length of each string in an array.\n  Examples:\n    getLengths([\"hi\", \"hello\", \"hey\"]) => [2,5,3]\n    getLengths([\"JavaScript\", \"is\", \"awesome\"]) => [10,2,7]\n    getLengths([\"a\", \"ab\", \"abc\"]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getLengths = (arr) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "getLengths",
            "reference_solution": "const getLengths = (arr) => {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr[i].length);\n  }\n  return result;\n};",
            "testCases": [
              {
                "input": { "arr": ["hi", "hello", "hey"] },
                "expectedOutput": "[2,5,3]"
              },
              {
                "input": { "arr": ["JavaScript", "is", "awesome"] },
                "expectedOutput": "[10,2,7]"
              },
              {
                "input": { "arr": ["a", "ab", "abc"] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "arr": [""] },
                "expectedOutput": "[0]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to filter adults (18+) from an array of people.\n  Each person is an object with name and age properties.\n  Examples:\n    getAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 15}]) => [{\"name\":\"Alice\",\"age\":25}]\n    getAdults([{name: \"Charlie\", age: 30}, {name: \"Diana\", age: 20}]) => [{\"name\":\"Charlie\",\"age\":30},{\"name\":\"Diana\",\"age\":20}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst getAdults = (people) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "getAdults",
            "reference_solution": "const getAdults = (people) => {\n  const result = [];\n  for (let i = 0; i < people.length; i++) {\n    if (people[i].age >= 18) result.push(people[i]);\n  }\n  return result;\n};",
            "testCases": [
              {
                "input": { "people": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 15 }] },
                "expectedOutput": "[{\"name\":\"Alice\",\"age\":25}]"
              },
              {
                "input": { "people": [{ "name": "Charlie", "age": 30 }, { "name": "Diana", "age": 20 }, { "name": "Eve", "age": 17 }] },
                "expectedOutput": "[{\"name\":\"Charlie\",\"age\":30},{\"name\":\"Diana\",\"age\":20}]"
              },
              {
                "input": { "people": [{ "name": "Frank", "age": 18 }] },
                "expectedOutput": "[{\"name\":\"Frank\",\"age\":18}]"
              },
              {
                "input": { "people": [{ "name": "Grace", "age": 10 }, { "name": "Henry", "age": 12 }] },
                "expectedOutput": "[]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below arrow function to perform basic calculator operations.\n  Operation can be \"add\", \"subtract\", \"multiply\", or \"divide\".\n  Examples:\n    calculator(10, 5, \"add\") => 15\n    calculator(10, 5, \"subtract\") => 5\n    calculator(10, 5, \"multiply\") => 50\n    calculator(10, 5, \"divide\") => 2\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst calculator = (a, b, operation) => {\n  // Implementation here\n};",
            "solution_type": "function",
            "function_name": "calculator",
            "reference_solution": "const calculator = (a, b, operation) => {\n  if (operation === \"add\") return a + b;\n  if (operation === \"subtract\") return a - b;\n  if (operation === \"multiply\") return a * b;\n  if (operation === \"divide\") return a / b;\n  return 0;\n};",
            "testCases": [
              {
                "input": { "a": 10, "b": 5, "operation": "add" },
                "expectedOutput": "15"
              },
              {
                "input": { "a": 10, "b": 5, "operation": "subtract" },
                "expectedOutput": "5"
              },
              {
                "input": { "a": 10, "b": 5, "operation": "multiply" },
                "expectedOutput": "50"
              },
              {
                "input": { "a": 10, "b": 5, "operation": "divide" },
                "expectedOutput": "2"
              }
            ]
          }
        ]
      },
      {
        "id": "recursion",
        "title": "Functions Calling Themselves",
        "outcomes": [
          "Recursion: Functions that call themselves",
          "The Base Case: The Stopping Condition",
          "The Recursive Case: Moving toward the end",
          "The Call Stack: Visualizing Function Nesting",
          "Return Value Propagation: Passing data back up the chain",
          "Recursive Problem Solving: Breaking big tasks into smaller ones",
          "Architectural Choice: Recursion vs. Iteration",
          "Stack Overflow: The risk of infinite recursion",
          "Tail Recursion: An introduction to optimization"
        ],
        "topic_notes": `## 1. Recursion: Functions that call themselves

- A recursive function calls itself (usually with a smaller or simpler input) until a base case is reached.
- Useful when the problem naturally breaks into smaller instances of the same problem.

\`\`\`javascript
function countdown(n) {
  if (n <= 0) return
  console.log(n)
  countdown(n - 1)
}
countdown(3)
\`\`\`

## 2. The Base Case: The Stopping Condition

- The base case is the condition where the function stops recursing and returns without calling itself.
- Without a base case, recursion never stops and you get a stack overflow.

\`\`\`javascript
function factorial(n) {
  if (n <= 0) return 1
  return n * factorial(n - 1)
}
console.log(factorial(5))
\`\`\`

## 3. The Recursive Case: Moving toward the end

- The recursive case calls the function again with a value that moves toward the base case (e.g. n - 1).
- Each call should make progress so the base case is eventually hit.

\`\`\`javascript
function sumToN(n) {
  if (n <= 0) return 0
  return n + sumToN(n - 1)
}
console.log(sumToN(5))
\`\`\`

## 4. The Call Stack: Visualizing Function Nesting

- Each recursive call adds a frame to the call stack. When the base case returns, frames unwind and return values propagate back.

\`\`\`javascript
function fact(n) {
  if (n <= 1) return 1
  return n * fact(n - 1)
}
console.log(fact(4))
\`\`\`

## 5. Return Value Propagation: Passing data back up the chain

- The return value from the base case is used by the previous call, and so on up the chain. Combine with current step (e.g. n + sumToN(n-1)).

\`\`\`javascript
function power(base, exp) {
  if (exp === 0) return 1
  return base * power(base, exp - 1)
}
console.log(power(2, 3))
\`\`\`

## 6. Recursive Problem Solving: Breaking big tasks into smaller ones

- Define the problem for size n in terms of the same problem for a smaller size plus a simple step. Then handle the smallest size (base case).

\`\`\`javascript
function countDigits(num) {
  if (num < 10 && num >= 0) return 1
  if (num < 0) return countDigits(-num)
  return 1 + countDigits(Math.floor(num / 10))
}
console.log(countDigits(12345))
\`\`\`

## 7. Architectural Choice: Recursion vs. Iteration

- Recursion can be clearer for tree or divide-and-conquer problems. Loops are often simpler and avoid stack depth limits for linear problems.

\`\`\`javascript
function sumIterative(n) {
  let s = 0
  for (let i = 1; i <= n; i++) s += i
  return s
}
console.log(sumIterative(5))
\`\`\`

## 8. Stack Overflow: The risk of infinite recursion

- If the base case is never reached or is wrong, the function keeps calling itself until the call stack overflows. Always ensure progress toward the base case.

\`\`\`javascript
function safeCountdown(n) {
  if (n <= 0) return
  console.log(n)
  safeCountdown(n - 1)
}
\`\`\`

## 9. Tail Recursion: An introduction to optimization

- Tail recursion is when the recursive call is the last thing the function does. Some engines can optimize it to avoid growing the stack (JavaScript generally does not, but the pattern is still useful).

\`\`\`javascript
function sumTail(n, acc = 0) {
  if (n <= 0) return acc
  return sumTail(n - 1, acc + n)
}
console.log(sumTail(5))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below recursive function to count down from n to 1.\n  Print each number on a new line. Stop when n reaches 0 or less.\n  Examples:\n    countdown(5) => prints \"5\\n4\\n3\\n2\\n1\"\n    countdown(3) => prints \"3\\n2\\n1\"\n    countdown(0) => prints nothing\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countdown(n) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "countdown",
            "reference_solution": "function countdown(n) {\n  if (n <= 0) return;\n  console.log(n);\n  countdown(n - 1);\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "5\n4\n3\n2\n1"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "3\n2\n1"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "n": 0 },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to calculate the sum of numbers from 1 to n.\n  Examples:\n    sumToN(5) => 15 (1+2+3+4+5)\n    sumToN(10) => 55\n    sumToN(1) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumToN(n) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sumToN",
            "reference_solution": "function sumToN(n) {\n  if (n <= 0) return 0;\n  return n + sumToN(n - 1);\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "15"
              },
              {
                "input": { "n": 10 },
                "expectedOutput": "55"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "n": 7 },
                "expectedOutput": "28"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to calculate the factorial of n.\n  Factorial of n = n × (n-1) × (n-2) × ... × 1\n  Examples:\n    factorial(5) => 120 (5 × 4 × 3 × 2 × 1)\n    factorial(3) => 6 (3 × 2 × 1)\n    factorial(0) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction factorial(n) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "factorial",
            "reference_solution": "function factorial(n) {\n  if (n <= 0) return 1;\n  return n * factorial(n - 1);\n}",
            "testCases": [
              {
                "input": { "n": 5 },
                "expectedOutput": "120"
              },
              {
                "input": { "n": 3 },
                "expectedOutput": "6"
              },
              {
                "input": { "n": 0 },
                "expectedOutput": "1"
              },
              {
                "input": { "n": 7 },
                "expectedOutput": "5040"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to calculate base raised to the power of exponent.\n  Examples:\n    power(2, 3) => 8 (2 × 2 × 2)\n    power(5, 2) => 25 (5 × 5)\n    power(10, 0) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction power(base, exponent) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "power",
            "reference_solution": "function power(base, exponent) {\n  if (exponent === 0) return 1;\n  return base * power(base, exponent - 1);\n}",
            "testCases": [
              {
                "input": { "base": 2, "exponent": 3 },
                "expectedOutput": "8"
              },
              {
                "input": { "base": 5, "exponent": 2 },
                "expectedOutput": "25"
              },
              {
                "input": { "base": 10, "exponent": 0 },
                "expectedOutput": "1"
              },
              {
                "input": { "base": 3, "exponent": 4 },
                "expectedOutput": "81"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to count the digits in a number.\n  Examples:\n    countDigits(12345) => 5\n    countDigits(999) => 3\n    countDigits(7) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countDigits(num) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "countDigits",
            "reference_solution": "function countDigits(num) {\n  if (num < 0) num = -num;\n  if (num < 10) return 1;\n  return 1 + countDigits(Math.floor(num / 10));\n}",
            "testCases": [
              {
                "input": { "num": 12345 },
                "expectedOutput": "5"
              },
              {
                "input": { "num": 999 },
                "expectedOutput": "3"
              },
              {
                "input": { "num": 7 },
                "expectedOutput": "1"
              },
              {
                "input": { "num": 1000000 },
                "expectedOutput": "7"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to find the nth Fibonacci number.\n  Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...\n  Examples:\n    fibonacci(6) => 8\n    fibonacci(0) => 0\n    fibonacci(1) => 1\n    fibonacci(8) => 21\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction fibonacci(n) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "fibonacci",
            "reference_solution": "function fibonacci(n) {\n  if (n === 0) return 0;\n  if (n === 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}",
            "testCases": [
              {
                "input": { "n": 6 },
                "expectedOutput": "8"
              },
              {
                "input": { "n": 0 },
                "expectedOutput": "0"
              },
              {
                "input": { "n": 1 },
                "expectedOutput": "1"
              },
              {
                "input": { "n": 8 },
                "expectedOutput": "21"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to reverse a string.\n  Examples:\n    reverseString(\"hello\") => \"olleh\"\n    reverseString(\"world\") => \"dlrow\"\n    reverseString(\"a\") => \"a\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseString(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "reverseString",
            "reference_solution": "function reverseString(str) {\n  if (str.length <= 1) return str;\n  return reverseString(str.slice(1)) + str[0];\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "olleh"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "dlrow"
              },
              {
                "input": { "str": "a" },
                "expectedOutput": "a"
              },
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "tpircSavaJ"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to calculate the sum of all elements in an array.\n  Examples:\n    sumArray([1, 2, 3, 4, 5]) => 15\n    sumArray([10, 20, 30]) => 60\n    sumArray([5]) => 5\n    sumArray([]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumArray(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sumArray",
            "reference_solution": "function sumArray(arr) {\n  if (arr.length === 0) return 0;\n  return arr[0] + sumArray(arr.slice(1));\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "60"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to check if a string is a palindrome.\n  A palindrome reads the same forwards and backwards.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n    isPalindrome(\"a\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "isPalindrome",
            "reference_solution": "function isPalindrome(str) {\n  if (str.length <= 1) return true;\n  if (str[0] !== str[str.length - 1]) return false;\n  return isPalindrome(str.slice(1, -1));\n}",
            "testCases": [
              {
                "input": { "str": "racecar" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "madam" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "a" },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to find the maximum number in an array.\n  Examples:\n    findMax([3, 7, 2, 9, 4]) => 9\n    findMax([1, 2, 3, 4, 5]) => 5\n    findMax([100]) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findMax",
            "reference_solution": "function findMax(arr) {\n  if (arr.length === 0) return undefined;\n  if (arr.length === 1) return arr[0];\n  const restMax = findMax(arr.slice(1));\n  return arr[0] > restMax ? arr[0] : restMax;\n}",
            "testCases": [
              {
                "input": { "arr": [3, 7, 2, 9, 4] },
                "expectedOutput": "9"
              },
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              },
              {
                "input": { "arr": [50, 25, 75, 10] },
                "expectedOutput": "75"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to count occurrences of a target value in an array.\n  Examples:\n    countOccurrences([1, 2, 3, 2, 4, 2], 2) => 3\n    countOccurrences([5, 5, 5, 5], 5) => 4\n    countOccurrences([1, 2, 3], 4) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(arr, target) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "countOccurrences",
            "reference_solution": "function countOccurrences(arr, target) {\n  if (arr.length === 0) return 0;\n  const count = arr[0] === target ? 1 : 0;\n  return count + countOccurrences(arr.slice(1), target);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 2, 4, 2], "target": 2 },
                "expectedOutput": "3"
              },
              {
                "input": { "arr": [5, 5, 5, 5], "target": 5 },
                "expectedOutput": "4"
              },
              {
                "input": { "arr": [1, 2, 3], "target": 4 },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [7], "target": 7 },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below recursive function to flatten a nested array.\n  Return a new array with all elements at the top level.\n  Examples:\n    flatten([1, [2, 3], [4, [5, 6]]]) => [1,2,3,4,5,6]\n    flatten([1, 2, 3]) => [1,2,3]\n    flatten([[1], [2], [3]]) => [1,2,3]\n    flatten([]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flatten(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "flatten",
            "reference_solution": "function flatten(arr) {\n  if (arr.length === 0) return [];\n  const first = arr[0];\n  const rest = flatten(arr.slice(1));\n  if (Array.isArray(first)) {\n    return flatten(first).concat(rest);\n  }\n  return [first].concat(rest);\n}",
            "testCases": [
              {
                "input": { "arr": [1, [2, 3], [4, [5, 6]]] },
                "expectedOutput": "[1,2,3,4,5,6]"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "arr": [[1], [2], [3]] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "[]"
              }
            ]
          }
        ]
      },
      {
        "id": "closures",
        "title": "Functions remembering their scope",
        "outcomes": [
          "What is a Closure: The persistent link to Lexical Scope",
          "Data Privacy: Creating \"Private\" Variables in JS",
          "Function Factories: Generating Specialized Logic",
          "State Preservation: The Counter Pattern",
          "Loop Challenges: Understanding Closures in Iteration",
          "Practical Use Cases: Memoization and Event Logic"
        ],
        "topic_notes": `## 1. What is a Closure: The persistent link to Lexical Scope

- A closure is a function that keeps access to variables from the scope where it was created, even after that scope has finished.
- The inner function "closes over" the outer scope's variables.

\`\`\`javascript
function createGreeting(greeting) {
  return function (name) {
    return greeting + name
  }
}
const greeter = createGreeting("Hello, ")
console.log(greeter("Alice"))
\`\`\`

## 2. Data Privacy: Creating Private Variables in JS

- Variables declared in an outer function are not directly accessible from outside. Only functions that close over them can read or update them.
- Return an object with methods that use those variables to expose a controlled API.

\`\`\`javascript
function secretKeeper(secret) {
  return {
    getSecret: function () { return secret },
    setSecret: function (s) { secret = s }
  }
}
const k = secretKeeper("pass")
console.log(k.getSecret())
\`\`\`

## 3. Function Factories: Generating Specialized Logic

- A function that returns another function can "bake in" arguments. The returned function uses the captured value (closure).

\`\`\`javascript
function createMultiplier(mult) {
  return function (n) { return n * mult }
}
const double = createMultiplier(2)
console.log(double(5))
\`\`\`

## 4. State Preservation: The Counter Pattern

- Use a variable in the outer scope; the inner function reads and updates it. The state persists between calls.

\`\`\`javascript
function createCounter() {
  let count = 0
  return {
    increment: function () { count++ },
    getValue: function () { return count }
  }
}
const c = createCounter()
c.increment()
c.increment()
console.log(c.getValue())
\`\`\`

## 5. Loop Challenges: Understanding Closures in Iteration

- In a loop, if you create closures that capture the loop variable, they all see the final value (e.g. i after the loop). Use let (block scope) or pass the value as a parameter to avoid that.

\`\`\`javascript
function makeFunctions() {
  const fns = []
  for (let i = 0; i < 3; i++) {
    fns.push(function () { return i })
  }
  return fns
}
const arr = makeFunctions()
console.log(arr[0](), arr[1](), arr[2]())
\`\`\`

## 6. Practical Use Cases: Memoization and Event Logic

- Closures can hold cached results (memoization) or hold references for event handlers so they remember which element or ID they belong to.

\`\`\`javascript
function createAdder(x) {
  return function (n) { return n + x }
}
const add10 = createAdder(10)
console.log(add10(5))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that creates a greeting closure.\n  Return an inner function that combines greeting with a name.\n  Examples:\n    createGreeting(\"Hello, \") => returns a function\n    const greeter = createGreeting(\"Hello, \")\n    greeter(\"Alice\") => \"Hello, Alice\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createGreeting(greeting) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "createGreeting",
            "reference_solution": "function createGreeting(greeting) {\n  return function(name) {\n    return greeting + name;\n  };\n}",
            "testCases": [
              {
                "input": { "greeting": "Hello, " },
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
                "input": { "multiplier": 2 },
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
                "input": { "x": 10 },
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
                "input": { "secret": "myPassword" },
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
                "input": { "initialBalance": 100 },
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
                "input": { "limit": 3 },
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
                "input": { "prefix": "INFO" },
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
                "input": { "unit": "C" },
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
                "input": { "fn": "function" },
                "expectedOutput": "function"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that creates a calculator with closure.\n  Return an object with add, subtract, multiply, divide, and getValue methods.\n  The total starts at 0 and persists across operations.\n  Examples:\n    createCalculator() => {add: function, subtract: function, multiply: function, divide: function, getValue: function}\n    const calc = createCalculator()\n    calc.getValue() => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createCalculator() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "createCalculator",
            "reference_solution": "function createCalculator() {\n  let total = 0;\n  return {\n    add: function(x) { total += x; },\n    subtract: function(x) { total -= x; },\n    multiply: function(x) { total *= x; },\n    divide: function(x) { total /= x; },\n    getValue: function() { return total; }\n  };\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "object"
              }
            ]
          }
        ]
      },
      {
        "id": "foreach",
        "title": "forEach for iteration",
        "outcomes": [
          "forEach Syntax: Functional List Traversal",
          "Callback Parameters: Accessing Element, Index, and Array",
          "The Void Return: Understanding why forEach returns undefined",
          "Side Effects: Performing Actions per Iteration"
        ],
        "topic_notes": `## 1. forEach Syntax: Functional List Traversal

- array.forEach(callback) runs the callback once per element, in order. You pass a function that receives (element, index, array).

\`\`\`javascript
const arr = [10, 20, 30]
arr.forEach(function (n) {
  console.log(n)
})
\`\`\`

## 2. Callback Parameters: Accessing Element, Index, and Array

- The callback can take up to three arguments: (element, index, array). Use them as needed; index and array are optional.

\`\`\`javascript
const arr = ["a", "b", "c"]
arr.forEach(function (el, i) {
  console.log(i, el)
})
\`\`\`

## 3. The Void Return: Understanding why forEach returns undefined

- forEach does not return a value; it returns undefined. Use it for side effects (logging, pushing to another array), not for building a new array. Use map or filter when you need a return value.

\`\`\`javascript
const arr = [1, 2, 3]
const result = arr.forEach(function (n) { return n * 2 })
console.log(result)
\`\`\`

## 4. Side Effects: Performing Actions per Iteration

- forEach is for doing something with each element (print, mutate, push to a list). The callback's return value is ignored.

\`\`\`javascript
let sum = 0
[5, 10, 15].forEach(function (n) {
  sum += n
})
console.log(sum)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses forEach to process an array of numbers.\n  Use forEach to collect each number into a result string, separated by newlines.\n  Examples:\n    printNumbers([1, 2, 3, 4, 5]) => \"1\\n2\\n3\\n4\\n5\"\n    printNumbers([10, 20, 30]) => \"10\\n20\\n30\"\n    printNumbers([7]) => \"7\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction printNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "printNumbers",
            "reference_solution": "function printNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    result.push(String(n));\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "1\n2\n3\n4\n5"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "10\n20\n30"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "7"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to convert strings to uppercase.\n  Use forEach to process each string and return them joined by newlines.\n  Examples:\n    uppercaseStrings([\"apple\", \"banana\", \"cherry\"]) => \"APPLE\\nBANANA\\nCHERRY\"\n    uppercaseStrings([\"hello\", \"world\"]) => \"HELLO\\nWORLD\"\n    uppercaseStrings([\"test\"]) => \"TEST\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction uppercaseStrings(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "uppercaseStrings",
            "reference_solution": "function uppercaseStrings(arr) {\n  let result = [];\n  arr.forEach(function(s) {\n    result.push(s.toUpperCase());\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry"] },
                "expectedOutput": "APPLE\nBANANA\nCHERRY"
              },
              {
                "input": { "arr": ["hello", "world"] },
                "expectedOutput": "HELLO\nWORLD"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "TEST"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to double numbers.\n  Use forEach to process each number and return doubled values joined by newlines.\n  Examples:\n    doubleNumbers([2, 4, 6, 8]) => \"4\\n8\\n12\\n16\"\n    doubleNumbers([1, 3, 5]) => \"2\\n6\\n10\"\n    doubleNumbers([10]) => \"20\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "doubleNumbers",
            "reference_solution": "function doubleNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    result.push(String(n * 2));\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": [2, 4, 6, 8] },
                "expectedOutput": "4\n8\n12\n16"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "2\n6\n10"
              },
              {
                "input": { "arr": [10] },
                "expectedOutput": "20"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach with index parameter.\n  Use forEach to format each element with its index and return joined by newlines.\n  Examples:\n    formatWithIndex([\"cat\", \"dog\", \"bird\"]) => \"Index 0: cat\\nIndex 1: dog\\nIndex 2: bird\"\n    formatWithIndex([\"apple\", \"banana\"]) => \"Index 0: apple\\nIndex 1: banana\"\n    formatWithIndex([\"test\"]) => \"Index 0: test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction formatWithIndex(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "formatWithIndex",
            "reference_solution": "function formatWithIndex(arr) {\n  let result = [];\n  arr.forEach(function(el, i) {\n    result.push('Index ' + i + ': ' + el);\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": ["cat", "dog", "bird"] },
                "expectedOutput": "Index 0: cat\nIndex 1: dog\nIndex 2: bird"
              },
              {
                "input": { "arr": ["apple", "banana"] },
                "expectedOutput": "Index 0: apple\nIndex 1: banana"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "Index 0: test"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to calculate the sum of all elements.\n  Use forEach to accumulate the sum and return the total.\n  Examples:\n    calculateSum([5, 10, 15, 20]) => 50\n    calculateSum([1, 2, 3, 4]) => 10\n    calculateSum([100]) => 100\n    calculateSum([0, 0, 0]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateSum(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "calculateSum",
            "reference_solution": "function calculateSum(arr) {\n  let sum = 0;\n  arr.forEach(function(n) {\n    sum += n;\n  });\n  return sum;\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "50"
              },
              {
                "input": { "arr": [1, 2, 3, 4] },
                "expectedOutput": "10"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              },
              {
                "input": { "arr": [0, 0, 0] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to find the maximum value.\n  Use forEach to track the maximum value and return it.\n  Examples:\n    findMaximum([3, 7, 2, 9, 1]) => 9\n    findMaximum([5, 15, 10]) => 15\n    findMaximum([42]) => 42\n    findMaximum([1, 1, 1]) => 1\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMaximum(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findMaximum",
            "reference_solution": "function findMaximum(arr) {\n  if (arr.length === 0) return undefined;\n  let max = arr[0];\n  arr.forEach(function(n) {\n    if (n > max) max = n;\n  });\n  return max;\n}",
            "testCases": [
              {
                "input": { "arr": [3, 7, 2, 9, 1] },
                "expectedOutput": "9"
              },
              {
                "input": { "arr": [5, 15, 10] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [42] },
                "expectedOutput": "42"
              },
              {
                "input": { "arr": [1, 1, 1] },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to filter even numbers.\n  Use forEach to collect only even numbers and return them joined by newlines.\n  Examples:\n    filterEvenNumbers([1, 2, 3, 4, 5, 6]) => \"2\\n4\\n6\"\n    filterEvenNumbers([10, 15, 20, 25]) => \"10\\n20\"\n    filterEvenNumbers([1, 3, 5]) => \"\"\n    filterEvenNumbers([8]) => \"8\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterEvenNumbers",
            "reference_solution": "function filterEvenNumbers(arr) {\n  let result = [];\n  arr.forEach(function(n) {\n    if (n % 2 === 0) result.push(String(n));\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "2\n4\n6"
              },
              {
                "input": { "arr": [10, 15, 20, 25] },
                "expectedOutput": "10\n20"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": ""
              },
              {
                "input": { "arr": [8] },
                "expectedOutput": "8"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses forEach to extract names from objects.\n  Use forEach to collect each person's name and return them joined by newlines.\n  Examples:\n    extractNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}]) => \"Alice\\nBob\"\n    extractNames([{name: \"Charlie\", age: 22}]) => \"Charlie\"\n    extractNames([{name: \"Diana\", age: 28}, {name: \"Eve\", age: 35}]) => \"Diana\\nEve\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractNames(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractNames",
            "reference_solution": "function extractNames(arr) {\n  let result = [];\n  arr.forEach(function(obj) {\n    result.push(obj.name);\n  });\n  return result.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 30 }] },
                "expectedOutput": "Alice\nBob"
              },
              {
                "input": { "arr": [{ "name": "Charlie", "age": 22 }] },
                "expectedOutput": "Charlie"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 28 }, { "name": "Eve", "age": 35 }, { "name": "Frank", "age": 40 }] },
                "expectedOutput": "Diana\nEve\nFrank"
              }
            ]
          }
        ]
      },
      {
        "id": "map",
        "title": "map for transformation",
        "outcomes": [
          "map Syntax: Projecting Data to a New Array",
          "Functional Transformation: The Mapping Logic",
          "Index Preservation: Why Input and Output Length Match",
          "Immutability: Protecting the Original Data Source"
        ],
        "topic_notes": `## 1. map Syntax: Projecting Data to a New Array

- array.map(callback) returns a new array. Each element is replaced by the return value of the callback (element, index, array).

\`\`\`javascript
const nums = [1, 2, 3]
const doubled = nums.map(function (n) { return n * 2 })
console.log(doubled)
\`\`\`

## 2. Functional Transformation: The Mapping Logic

- The callback defines how to transform one element into one new value. map applies that transformation to every element and collects the results.

\`\`\`javascript
const words = ["hello", "world"]
const upper = words.map(function (s) { return s.toUpperCase() })
console.log(upper)
\`\`\`

## 3. Index Preservation: Why Input and Output Length Match

- map always produces one output element per input element. The new array has the same length as the original. Order is preserved.

\`\`\`javascript
const arr = [5, 10, 15]
const squared = arr.map(function (n) { return n * n })
console.log(squared.length === arr.length)
\`\`\`

## 4. Immutability: Protecting the Original Data Source

- map does not change the original array. It builds and returns a new array. Prefer map when you want a transformed copy without mutating the source.

\`\`\`javascript
const orig = [1, 2, 3]
const copy = orig.map(function (x) { return x })
copy[0] = 99
console.log(orig[0], copy[0])
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses map to double numbers.\n  Use map to create a new array with each number doubled.\n  Examples:\n    doubleNumbers([1, 2, 3, 4, 5]) => [2,4,6,8,10]\n    doubleNumbers([10, 20, 30]) => [20,40,60]\n    doubleNumbers([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "doubleNumbers",
            "reference_solution": "function doubleNumbers(arr) {\n  return arr.map(function(n) { return n * 2; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "[2,4,6,8,10]"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "[20,40,60]"
              },
              {
                "input": { "arr": [0] },
                "expectedOutput": "[0]"
              },
              {
                "input": { "arr": [7, 14] },
                "expectedOutput": "[14,28]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to convert strings to uppercase.\n  Use map to create a new array with each string in uppercase.\n  Examples:\n    uppercaseStrings([\"hello\", \"world\", \"javascript\"]) => [\"HELLO\",\"WORLD\",\"JAVASCRIPT\"]\n    uppercaseStrings([\"apple\", \"banana\"]) => [\"APPLE\",\"BANANA\"]\n    uppercaseStrings([\"test\"]) => [\"TEST\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction uppercaseStrings(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "uppercaseStrings",
            "reference_solution": "function uppercaseStrings(arr) {\n  return arr.map(function(s) { return s.toUpperCase(); });\n}",
            "testCases": [
              {
                "input": { "arr": ["hello", "world", "javascript"] },
                "expectedOutput": "[\"HELLO\",\"WORLD\",\"JAVASCRIPT\"]"
              },
              {
                "input": { "arr": ["apple", "banana"] },
                "expectedOutput": "[\"APPLE\",\"BANANA\"]"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "[\"TEST\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to square numbers.\n  Use map to create a new array with each number squared.\n  Examples:\n    squareNumbers([1, 2, 3, 4]) => [1,4,9,16]\n    squareNumbers([5, 10]) => [25,100]\n    squareNumbers([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction squareNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "squareNumbers",
            "reference_solution": "function squareNumbers(arr) {\n  return arr.map(function(n) { return n * n; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4] },
                "expectedOutput": "[1,4,9,16]"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "[25,100]"
              },
              {
                "input": { "arr": [0] },
                "expectedOutput": "[0]"
              },
              {
                "input": { "arr": [3, 7] },
                "expectedOutput": "[9,49]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to get string lengths.\n  Use map to create a new array containing the length of each string.\n  Examples:\n    getStringLengths([\"cat\", \"elephant\", \"dog\"]) => [3,8,3]\n    getStringLengths([\"hi\", \"hello\", \"hey\"]) => [2,5,3]\n    getStringLengths([\"\"]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getStringLengths(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "getStringLengths",
            "reference_solution": "function getStringLengths(arr) {\n  return arr.map(function(s) { return s.length; });\n}",
            "testCases": [
              {
                "input": { "arr": ["cat", "elephant", "dog"] },
                "expectedOutput": "[3,8,3]"
              },
              {
                "input": { "arr": ["hi", "hello", "hey"] },
                "expectedOutput": "[2,5,3]"
              },
              {
                "input": { "arr": [""] },
                "expectedOutput": "[0]"
              },
              {
                "input": { "arr": ["JavaScript"] },
                "expectedOutput": "[10]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to divide numbers by 10.\n  Use map to create a new array with each number divided by 10.\n  Examples:\n    divideByTen([10, 20, 30, 40]) => [1,2,3,4]\n    divideByTen([50, 100]) => [5,10]\n    divideByTen([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction divideByTen(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "divideByTen",
            "reference_solution": "function divideByTen(arr) {\n  return arr.map(function(n) { return n / 10; });\n}",
            "testCases": [
              {
                "input": { "arr": [10, 20, 30, 40] },
                "expectedOutput": "[1,2,3,4]"
              },
              {
                "input": { "arr": [50, 100] },
                "expectedOutput": "[5,10]"
              },
              {
                "input": { "arr": [0] },
                "expectedOutput": "[0]"
              },
              {
                "input": { "arr": [70] },
                "expectedOutput": "[7]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to extract names from objects.\n  Use map to create a new array containing only the names from person objects.\n  Examples:\n    extractNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}]) => [\"Alice\",\"Bob\"]\n    extractNames([{name: \"Charlie\", age: 22}]) => [\"Charlie\"]\n    extractNames([{name: \"Diana\", age: 28}, {name: \"Eve\", age: 35}]) => [\"Diana\",\"Eve\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractNames(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractNames",
            "reference_solution": "function extractNames(arr) {\n  return arr.map(function(obj) { return obj.name; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 30 }] },
                "expectedOutput": "[\"Alice\",\"Bob\"]"
              },
              {
                "input": { "arr": [{ "name": "Charlie", "age": 22 }] },
                "expectedOutput": "[\"Charlie\"]"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 28 }, { "name": "Eve", "age": 35 }] },
                "expectedOutput": "[\"Diana\",\"Eve\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to add 100 to each number.\n  Use map to create a new array where each number has 100 added to it.\n  Examples:\n    addHundred([5, 10, 15, 20]) => [105,110,115,120]\n    addHundred([0, 50]) => [100,150]\n    addHundred([1]) => [101]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction addHundred(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "addHundred",
            "reference_solution": "function addHundred(arr) {\n  return arr.map(function(n) { return n + 100; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "[105,110,115,120]"
              },
              {
                "input": { "arr": [0, 50] },
                "expectedOutput": "[100,150]"
              },
              {
                "input": { "arr": [1] },
                "expectedOutput": "[101]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to convert numbers to booleans.\n  Use map to create a new array where each number is converted to a boolean.\n  Even numbers should be true, odd numbers should be false.\n  Examples:\n    numbersToEvenBooleans([1, 2, 3, 4, 5]) => [false,true,false,true,false]\n    numbersToEvenBooleans([10, 15, 20]) => [true,false,true]\n    numbersToEvenBooleans([7]) => [false]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction numbersToEvenBooleans(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "numbersToEvenBooleans",
            "reference_solution": "function numbersToEvenBooleans(arr) {\n  return arr.map(function(n) { return n % 2 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "[false,true,false,true,false]"
              },
              {
                "input": { "arr": [10, 15, 20] },
                "expectedOutput": "[true,false,true]"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "[false]"
              },
              {
                "input": { "arr": [8] },
                "expectedOutput": "[true]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to format student data.\n  Use map to create a new array of strings formatted as: \"name: score\".\n  Examples:\n    formatStudents([{name: \"Alice\", score: 85}, {name: \"Bob\", score: 92}]) => [\"Alice: 85\",\"Bob: 92\"]\n    formatStudents([{name: \"Charlie\", score: 78}]) => [\"Charlie: 78\"]\n    formatStudents([{name: \"Diana\", score: 95}, {name: \"Eve\", score: 88}]) => [\"Diana: 95\",\"Eve: 88\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction formatStudents(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "formatStudents",
            "reference_solution": "function formatStudents(arr) {\n  return arr.map(function(obj) { return obj.name + ': ' + obj.score; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "score": 85 }, { "name": "Bob", "score": 92 }] },
                "expectedOutput": "[\"Alice: 85\",\"Bob: 92\"]"
              },
              {
                "input": { "arr": [{ "name": "Charlie", "score": 78 }] },
                "expectedOutput": "[\"Charlie: 78\"]"
              },
              {
                "input": { "arr": [{ "name": "Diana", "score": 95 }, { "name": "Eve", "score": 88 }] },
                "expectedOutput": "[\"Diana: 95\",\"Eve: 88\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses map to convert strings to numbers.\n  Use map to create a new array with each string converted to a number.\n  Examples:\n    stringsToNumbers([\"1\", \"2\", \"3\", \"4\"]) => [1,2,3,4]\n    stringsToNumbers([\"10\", \"20\"]) => [10,20]\n    stringsToNumbers([\"5\"]) => [5]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction stringsToNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "stringsToNumbers",
            "reference_solution": "function stringsToNumbers(arr) {\n  return arr.map(function(s) { return Number(s); });\n}",
            "testCases": [
              {
                "input": { "arr": ["1", "2", "3", "4"] },
                "expectedOutput": "[1,2,3,4]"
              },
              {
                "input": { "arr": ["10", "20"] },
                "expectedOutput": "[10,20]"
              },
              {
                "input": { "arr": ["5"] },
                "expectedOutput": "[5]"
              },
              {
                "input": { "arr": ["0", "100"] },
                "expectedOutput": "[0,100]"
              }
            ]
          }
        ]
      },
      {
        "id": "filter",
        "title": "filter for selection",
        "outcomes": [
          "filter Syntax: Extracting Specific Data",
          "The Predicate Function: Returning Booleans for Selection",
          "Subset Generation: Why the Resulting Length May Differ",
          "Immutability: Filtering without Altering the Source"
        ],
        "topic_notes": `## 1. filter Syntax: Extracting Specific Data

- array.filter(callback) returns a new array containing only the elements for which the callback returned a truthy value. Others are left out.

\`\`\`javascript
const nums = [1, 2, 3, 4, 5, 6]
const evens = nums.filter(function (n) { return n % 2 === 0 })
console.log(evens)
\`\`\`

## 2. The Predicate Function: Returning Booleans for Selection

- The callback is a predicate: it should return true or false. true means keep the element; false means exclude it.

\`\`\`javascript
const arr = [10, 25, 30, 45, 50]
const big = arr.filter(function (n) { return n > 30 })
console.log(big)
\`\`\`

## 3. Subset Generation: Why the Resulting Length May Differ

- The result can have fewer elements (or none, or the same). Length depends on how many elements pass the predicate. Order is preserved.

\`\`\`javascript
const words = ["hi", "hello", "hey", "javascript"]
const long = words.filter(function (s) { return s.length > 5 })
console.log(long)
\`\`\`

## 4. Immutability: Filtering without Altering the Source

- filter does not change the original array. It builds and returns a new array with only the elements that passed the test.

\`\`\`javascript
const orig = [1, 2, 3, 4, 5]
const filtered = orig.filter(function (n) { return n > 2 })
console.log(orig.length, filtered.length)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses filter to get even numbers.\n  Use filter to create a new array containing only even numbers.\n  Examples:\n    filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]) => [2,4,6,8]\n    filterEvenNumbers([10, 15, 20, 25]) => [10,20]\n    filterEvenNumbers([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterEvenNumbers",
            "reference_solution": "function filterEvenNumbers(arr) {\n  return arr.filter(function(n) { return n % 2 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6, 7, 8] },
                "expectedOutput": "[2,4,6,8]"
              },
              {
                "input": { "arr": [10, 15, 20, 25] },
                "expectedOutput": "[10,20]"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [2, 4, 6] },
                "expectedOutput": "[2,4,6]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get numbers greater than 30.\n  Use filter to create a new array containing only numbers greater than 30.\n  Examples:\n    filterGreaterThan30([10, 25, 30, 45, 50, 60]) => [45,50,60]\n    filterGreaterThan30([5, 10, 15]) => []\n    filterGreaterThan30([100, 200]) => [100,200]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterGreaterThan30(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterGreaterThan30",
            "reference_solution": "function filterGreaterThan30(arr) {\n  return arr.filter(function(n) { return n > 30; });\n}",
            "testCases": [
              {
                "input": { "arr": [10, 25, 30, 45, 50, 60] },
                "expectedOutput": "[45,50,60]"
              },
              {
                "input": { "arr": [5, 10, 15] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [100, 200] },
                "expectedOutput": "[100,200]"
              },
              {
                "input": { "arr": [31] },
                "expectedOutput": "[31]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get long strings.\n  Use filter to create a new array containing only strings with length greater than 5.\n  Examples:\n    filterLongStrings([\"apple\", \"banana\", \"kiwi\", \"grape\", \"watermelon\"]) => [\"banana\",\"watermelon\"]\n    filterLongStrings([\"hi\", \"hello\", \"hey\"]) => []\n    filterLongStrings([\"JavaScript\", \"is\", \"awesome\"]) => [\"JavaScript\",\"awesome\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterLongStrings(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterLongStrings",
            "reference_solution": "function filterLongStrings(arr) {\n  return arr.filter(function(s) { return s.length > 5; });\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "kiwi", "grape", "watermelon"] },
                "expectedOutput": "[\"banana\",\"watermelon\"]"
              },
              {
                "input": { "arr": ["hi", "hello", "hey"] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": ["JavaScript", "is", "awesome"] },
                "expectedOutput": "[\"JavaScript\",\"awesome\"]"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "[]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get adults.\n  Use filter to create a new array containing only people aged 18 or older.\n  Examples:\n    filterAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => [{\"name\":\"Alice\",\"age\":25},{\"name\":\"Charlie\",\"age\":30}]\n    filterAdults([{name: \"Diana\", age: 15}, {name: \"Eve\", age: 16}]) => []\n    filterAdults([{name: \"Frank\", age: 18}]) => [{\"name\":\"Frank\",\"age\":18}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterAdults(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterAdults",
            "reference_solution": "function filterAdults(arr) {\n  return arr.filter(function(obj) { return obj.age >= 18; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 17 }, { "name": "Charlie", "age": 30 }] },
                "expectedOutput": "[{\"name\":\"Alice\",\"age\":25},{\"name\":\"Charlie\",\"age\":30}]"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 15 }, { "name": "Eve", "age": 16 }] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [{ "name": "Frank", "age": 18 }] },
                "expectedOutput": "[{\"name\":\"Frank\",\"age\":18}]"
              },
              {
                "input": { "arr": [{ "name": "Grace", "age": 20 }, { "name": "Henry", "age": 22 }] },
                "expectedOutput": "[{\"name\":\"Grace\",\"age\":20},{\"name\":\"Henry\",\"age\":22}]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get numbers divisible by 10.\n  Use filter to create a new array containing only numbers divisible by 10.\n  Examples:\n    filterDivisibleBy10([5, 10, 15, 20, 25, 30]) => [10,20,30]\n    filterDivisibleBy10([3, 7, 11]) => []\n    filterDivisibleBy10([100, 200, 300]) => [100,200,300]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterDivisibleBy10(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterDivisibleBy10",
            "reference_solution": "function filterDivisibleBy10(arr) {\n  return arr.filter(function(n) { return n % 10 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20, 25, 30] },
                "expectedOutput": "[10,20,30]"
              },
              {
                "input": { "arr": [3, 7, 11] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [100, 200, 300] },
                "expectedOutput": "[100,200,300]"
              },
              {
                "input": { "arr": [50] },
                "expectedOutput": "[50]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get strings starting with 'c'.\n  Use filter to create a new array containing only strings that start with the letter 'c'.\n  Examples:\n    filterStartsWithC([\"hello\", \"world\", \"javascript\", \"code\"]) => [\"code\"]\n    filterStartsWithC([\"cat\", \"dog\", \"cow\"]) => [\"cat\",\"cow\"]\n    filterStartsWithC([\"apple\", \"banana\"]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterStartsWithC(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterStartsWithC",
            "reference_solution": "function filterStartsWithC(arr) {\n  return arr.filter(function(s) { return s[0] === 'c'; });\n}",
            "testCases": [
              {
                "input": { "arr": ["hello", "world", "javascript", "code"] },
                "expectedOutput": "[\"code\"]"
              },
              {
                "input": { "arr": ["cat", "dog", "cow"] },
                "expectedOutput": "[\"cat\",\"cow\"]"
              },
              {
                "input": { "arr": ["apple", "banana"] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": ["cherry"] },
                "expectedOutput": "[\"cherry\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get odd numbers.\n  Use filter to create a new array containing only odd numbers.\n  Examples:\n    filterOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => [1,3,5,7,9]\n    filterOddNumbers([2, 4, 6, 8]) => []\n    filterOddNumbers([11, 13, 15]) => [11,13,15]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterOddNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterOddNumbers",
            "reference_solution": "function filterOddNumbers(arr) {\n  return arr.filter(function(n) { return n % 2 !== 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                "expectedOutput": "[1,3,5,7,9]"
              },
              {
                "input": { "arr": [2, 4, 6, 8] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [11, 13, 15] },
                "expectedOutput": "[11,13,15]"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "[7]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get cheap items.\n  Use filter to create a new array containing only items with price less than 1.0.\n  Examples:\n    filterCheapItems([{name: \"Apple\", price: 1.5}, {name: \"Banana\", price: 0.8}, {name: \"Orange\", price: 2.0}]) => [{\"name\":\"Banana\",\"price\":0.8}]\n    filterCheapItems([{name: \"Grape\", price: 3.0}, {name: \"Melon\", price: 5.0}]) => []\n    filterCheapItems([{name: \"Cherry\", price: 0.5}]) => [{\"name\":\"Cherry\",\"price\":0.5}]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterCheapItems(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterCheapItems",
            "reference_solution": "function filterCheapItems(arr) {\n  return arr.filter(function(obj) { return obj.price < 1.0; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Apple", "price": 1.5 }, { "name": "Banana", "price": 0.8 }, { "name": "Orange", "price": 2.0 }] },
                "expectedOutput": "[{\"name\":\"Banana\",\"price\":0.8}]"
              },
              {
                "input": { "arr": [{ "name": "Grape", "price": 3.0 }, { "name": "Melon", "price": 5.0 }] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [{ "name": "Cherry", "price": 0.5 }] },
                "expectedOutput": "[{\"name\":\"Cherry\",\"price\":0.5}]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get numbers in range.\n  Use filter to create a new array containing numbers between 3 and 7 (inclusive).\n  Examples:\n    filterNumbersInRange([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => [3,4,5,6,7]\n    filterNumbersInRange([1, 2, 8, 9]) => []\n    filterNumbersInRange([5, 6]) => [5,6]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterNumbersInRange(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterNumbersInRange",
            "reference_solution": "function filterNumbersInRange(arr) {\n  return arr.filter(function(n) { return n >= 3 && n <= 7; });\n}",
            "testCases": [
              {
                "input": { "arr": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
                "expectedOutput": "[3,4,5,6,7]"
              },
              {
                "input": { "arr": [1, 2, 8, 9] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [5, 6] },
                "expectedOutput": "[5,6]"
              },
              {
                "input": { "arr": [3, 7, 10] },
                "expectedOutput": "[3,7]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses filter to get strings with exactly 3 characters.\n  Use filter to create a new array containing strings with exactly 3 characters.\n  Examples:\n    filterThreeCharStrings([\"a\", \"ab\", \"abc\", \"abcd\", \"abcde\"]) => [\"abc\"]\n    filterThreeCharStrings([\"cat\", \"dog\", \"bird\"]) => [\"cat\",\"dog\"]\n    filterThreeCharStrings([\"hello\", \"hi\"]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterThreeCharStrings(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterThreeCharStrings",
            "reference_solution": "function filterThreeCharStrings(arr) {\n  return arr.filter(function(s) { return s.length === 3; });\n}",
            "testCases": [
              {
                "input": { "arr": ["a", "ab", "abc", "abcd", "abcde"] },
                "expectedOutput": "[\"abc\"]"
              },
              {
                "input": { "arr": ["cat", "dog", "bird"] },
                "expectedOutput": "[\"cat\",\"dog\"]"
              },
              {
                "input": { "arr": ["hello", "hi"] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": ["sun"] },
                "expectedOutput": "[\"sun\"]"
              }
            ]
          }
        ]
      },
      {
        "id": "find-findindex",
        "title": "find and findIndex",
        "outcomes": [
          "find Syntax: Retrieving the First Matching Element",
          "findIndex Syntax: Locating the Position of a Match",
          "Search Failure (Value): Handling undefined in find",
          "Search Failure (Index): Handling -1 in findIndex",
          "Efficiency: Understanding why searching stops at the first match"
        ],
        "topic_notes": `## 1. find Syntax: Retrieving the First Matching Element

- array.find(callback) returns the first element for which the callback returns a truthy value. It stops as soon as one match is found.
- The callback receives (element, index, array). Return true to select that element.

\`\`\`javascript
const arr = [5, 10, 15, 20]
const first = arr.find(function (n) { return n > 12 })
console.log(first)
\`\`\`

## 2. findIndex Syntax: Locating the Position of a Match

- array.findIndex(callback) returns the index of the first element for which the callback returns true. Stops at the first match.
- Use it when you need the position, not the value (e.g. for splice or replacement).

\`\`\`javascript
const arr = [5, 10, 15, 20]
const idx = arr.findIndex(function (n) { return n > 12 })
console.log(idx)
\`\`\`

## 3. Search Failure (Value): Handling undefined in find

- If no element matches, find returns undefined. Check for undefined before using the result if the array might have no match.

\`\`\`javascript
const arr = [1, 2, 3]
const found = arr.find(function (n) { return n > 10 })
console.log(found === undefined)
\`\`\`

## 4. Search Failure (Index): Handling -1 in findIndex

- If no element matches, findIndex returns -1. A -1 index is invalid for arrays; always check before using the index.

\`\`\`javascript
const arr = [1, 2, 3]
const idx = arr.findIndex(function (n) { return n > 10 })
if (idx !== -1) console.log(arr[idx])
\`\`\`

## 5. Efficiency: Understanding why searching stops at the first match

- find and findIndex short-circuit: they stop iterating once the first match is found. Use them when you only need one result; avoid scanning the rest of the array.

\`\`\`javascript
const users = [{ id: 1 }, { id: 2 }, { id: 3 }]
const user = users.find(function (u) { return u.id === 2 })
console.log(user)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses find to get first number greater than 12.\n  Use find to get the first number greater than 12.\n  Examples:\n    findFirstGreaterThan12([5, 10, 15, 20, 25]) => 15\n    findFirstGreaterThan12([1, 2, 3]) => undefined\n    findFirstGreaterThan12([13, 14, 15]) => 13\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstGreaterThan12(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstGreaterThan12",
            "reference_solution": "function findFirstGreaterThan12(arr) {\n  return arr.find(function(n) { return n > 12; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20, 25] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "undefined"
              },
              {
                "input": { "arr": [13, 14, 15] },
                "expectedOutput": "13"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses findIndex to get index of first number greater than 12.\n  Use findIndex to get the index of the first number greater than 12.\n  Examples:\n    findIndexGreaterThan12([5, 10, 15, 20, 25]) => 2\n    findIndexGreaterThan12([1, 2, 3]) => -1\n    findIndexGreaterThan12([13, 14, 15]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexGreaterThan12(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findIndexGreaterThan12",
            "reference_solution": "function findIndexGreaterThan12(arr) {\n  return arr.findIndex(function(n) { return n > 12; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20, 25] },
                "expectedOutput": "2"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "-1"
              },
              {
                "input": { "arr": [13, 14, 15] },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [5, 20] },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses find to get first string starting with 'c'.\n  Use find to get the first string that starts with the letter 'c'.\n  Examples:\n    findFirstStartsWithC([\"apple\", \"banana\", \"cherry\", \"date\"]) => \"cherry\"\n    findFirstStartsWithC([\"cat\", \"dog\", \"cow\"]) => \"cat\"\n    findFirstStartsWithC([\"apple\", \"banana\"]) => undefined\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstStartsWithC(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstStartsWithC",
            "reference_solution": "function findFirstStartsWithC(arr) {\n  return arr.find(function(s) { return s[0] === 'c'; });\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry", "date"] },
                "expectedOutput": "cherry"
              },
              {
                "input": { "arr": ["cat", "dog", "cow"] },
                "expectedOutput": "cat"
              },
              {
                "input": { "arr": ["apple", "banana"] },
                "expectedOutput": "undefined"
              },
              {
                "input": { "arr": ["cake"] },
                "expectedOutput": "cake"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses find to get object with specific id.\n  Use find to get the object with id equal to 2.\n  Examples:\n    findObjectById2([{id: 1, name: \"Alice\"}, {id: 2, name: \"Bob\"}, {id: 3, name: \"Charlie\"}]) => {\"id\":2,\"name\":\"Bob\"}\n    findObjectById2([{id: 1, name: \"Alice\"}]) => undefined\n    findObjectById2([{id: 5, name: \"Diana\"}, {id: 2, name: \"Eve\"}]) => {\"id\":2,\"name\":\"Eve\"}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findObjectById2(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findObjectById2",
            "reference_solution": "function findObjectById2(arr) {\n  return arr.find(function(obj) { return obj.id === 2; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "id": 1, "name": "Alice" }, { "id": 2, "name": "Bob" }, { "id": 3, "name": "Charlie" }] },
                "expectedOutput": "{\"id\":2,\"name\":\"Bob\"}"
              },
              {
                "input": { "arr": [{ "id": 1, "name": "Alice" }] },
                "expectedOutput": "undefined"
              },
              {
                "input": { "arr": [{ "id": 5, "name": "Diana" }, { "id": 2, "name": "Eve" }] },
                "expectedOutput": "{\"id\":2,\"name\":\"Eve\"}"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses findIndex to get index of object with specific id.\n  Use findIndex to get the index of the object with id equal to 3.\n  Examples:\n    findIndexById3([{id: 1, name: \"Alice\"}, {id: 2, name: \"Bob\"}, {id: 3, name: \"Charlie\"}]) => 2\n    findIndexById3([{id: 5, name: \"Diana\"}]) => -1\n    findIndexById3([{id: 3, name: \"Eve\"}, {id: 4, name: \"Frank\"}]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexById3(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findIndexById3",
            "reference_solution": "function findIndexById3(arr) {\n  return arr.findIndex(function(obj) { return obj.id === 3; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "id": 1, "name": "Alice" }, { "id": 2, "name": "Bob" }, { "id": 3, "name": "Charlie" }] },
                "expectedOutput": "2"
              },
              {
                "input": { "arr": [{ "id": 5, "name": "Diana" }] },
                "expectedOutput": "-1"
              },
              {
                "input": { "arr": [{ "id": 3, "name": "Eve" }, { "id": 4, "name": "Frank" }] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses find to get first odd number.\n  Use find to get the first odd number.\n  Examples:\n    findFirstOdd([2, 4, 6, 8, 10]) => undefined\n    findFirstOdd([1, 2, 3]) => 1\n    findFirstOdd([2, 3, 4]) => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstOdd(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstOdd",
            "reference_solution": "function findFirstOdd(arr) {\n  return arr.find(function(n) { return n % 2 !== 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [2, 4, 6, 8, 10] },
                "expectedOutput": "undefined"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "1"
              },
              {
                "input": { "arr": [2, 3, 4] },
                "expectedOutput": "3"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "7"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses findIndex to get index of first number divisible by 5.\n  Use findIndex to get the index of the first number divisible by 5.\n  Examples:\n    findIndexDivisibleBy5([3, 6, 9, 12, 15]) => 4\n    findIndexDivisibleBy5([1, 2, 3]) => -1\n    findIndexDivisibleBy5([5, 10]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexDivisibleBy5(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findIndexDivisibleBy5",
            "reference_solution": "function findIndexDivisibleBy5(arr) {\n  return arr.findIndex(function(n) { return n % 5 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [3, 6, 9, 12, 15] },
                "expectedOutput": "4"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "-1"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [3, 10, 20] },
                "expectedOutput": "1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses find to get first long string.\n  Use find to get the first string with length greater than 10.\n  Examples:\n    findFirstLongString([\"short\", \"medium length\", \"tiny\", \"a bit longer\"]) => \"medium length\"\n    findFirstLongString([\"hi\", \"hello\"]) => undefined\n    findFirstLongString([\"JavaScript is awesome\"]) => \"JavaScript is awesome\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstLongString(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstLongString",
            "reference_solution": "function findFirstLongString(arr) {\n  return arr.find(function(s) { return s.length > 10; });\n}",
            "testCases": [
              {
                "input": { "arr": ["short", "medium length", "tiny", "a bit longer"] },
                "expectedOutput": "medium length"
              },
              {
                "input": { "arr": ["hi", "hello"] },
                "expectedOutput": "undefined"
              },
              {
                "input": { "arr": ["JavaScript is awesome"] },
                "expectedOutput": "JavaScript is awesome"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses findIndex to get index of first adult.\n  Use findIndex to get the index of the first person aged 18 or older.\n  Examples:\n    findIndexFirstAdult([{name: \"Alice\", age: 17}, {name: \"Bob\", age: 25}, {name: \"Charlie\", age: 30}]) => 1\n    findIndexFirstAdult([{name: \"Diana\", age: 15}, {name: \"Eve\", age: 16}]) => -1\n    findIndexFirstAdult([{name: \"Frank\", age: 18}]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findIndexFirstAdult(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findIndexFirstAdult",
            "reference_solution": "function findIndexFirstAdult(arr) {\n  return arr.findIndex(function(obj) { return obj.age >= 18; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 17 }, { "name": "Bob", "age": 25 }, { "name": "Charlie", "age": 30 }] },
                "expectedOutput": "1"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 15 }, { "name": "Eve", "age": 16 }] },
                "expectedOutput": "-1"
              },
              {
                "input": { "arr": [{ "name": "Frank", "age": 18 }] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses find to get first even number with fallback message.\n  Use find to get the first even number.\n  If no even number exists, return \"No even number found\".\n  Otherwise return the number.\n  Examples:\n    findFirstEvenOrMessage([1, 3, 5, 7, 9, 11]) => \"No even number found\"\n    findFirstEvenOrMessage([1, 2, 3]) => 2\n    findFirstEvenOrMessage([8, 10]) => 8\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstEvenOrMessage(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstEvenOrMessage",
            "reference_solution": "function findFirstEvenOrMessage(arr) {\n  const found = arr.find(function(n) { return n % 2 === 0; });\n  return found !== undefined ? found : 'No even number found';\n}",
            "testCases": [
              {
                "input": { "arr": [1, 3, 5, 7, 9, 11] },
                "expectedOutput": "No even number found"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "2"
              },
              {
                "input": { "arr": [8, 10] },
                "expectedOutput": "8"
              },
              {
                "input": { "arr": [1, 3, 6] },
                "expectedOutput": "6"
              }
            ]
          }
        ]
      },
      {
        "id": "some-every",
        "title": "some and every",
        "outcomes": [
          "some Syntax: The Logical OR for Arrays",
          "every Syntax: The Logical AND for Arrays",
          "Short-Circuit Logic: Optimizing Truth Evaluations",
          "The Vacuous Truth: Empty Array Behavior"
        ],
        "topic_notes": `## 1. some Syntax: The Logical OR for Arrays

- array.some(callback) returns true if at least one element makes the callback return true. Returns false if none do (or array is empty).
- Think of it as "does any element satisfy this condition?"

\`\`\`javascript
const arr = [1, 2, 3, 5]
const hasEven = arr.some(function (n) { return n % 2 === 0 })
console.log(hasEven)
\`\`\`

## 2. every Syntax: The Logical AND for Arrays

- array.every(callback) returns true only if every element makes the callback return true. Returns false as soon as one fails (or true for empty array).
- Think of it as "do all elements satisfy this condition?"

\`\`\`javascript
const arr = [2, 4, 6, 8]
const allEven = arr.every(function (n) { return n % 2 === 0 })
console.log(allEven)
\`\`\`

## 3. Short-Circuit Logic: Optimizing Truth Evaluations

- some stops as soon as the callback returns true. every stops as soon as the callback returns false. They do not always traverse the whole array.

\`\`\`javascript
const arr = [1, 3, 5, 8, 9]
const hasEven = arr.some(function (n) { return n % 2 === 0 })
console.log(hasEven)
\`\`\`

## 4. The Vacuous Truth: Empty Array Behavior

- For an empty array, some returns false (no element satisfies). every returns true (no element fails). This is standard logical behavior for "any" and "all" over an empty set.

\`\`\`javascript
console.log([].some(function () { return true }))
console.log([].every(function () { return true }))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses some to check if at least one number is even.\n  Use some to check if at least one number is even.\n  Examples:\n    hasAnyEven([1, 3, 5, 7, 9]) => false\n    hasAnyEven([1, 2, 3]) => true\n    hasAnyEven([2, 4, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyEven(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "hasAnyEven",
            "reference_solution": "function hasAnyEven(arr) {\n  return arr.some(function(n) { return n % 2 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [1, 3, 5, 7, 9] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [2, 4, 6] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses every to check if all numbers are even.\n  Use every to check if all numbers are even.\n  Examples:\n    areAllEven([2, 4, 6, 8, 10]) => true\n    areAllEven([2, 3, 4]) => false\n    areAllEven([1, 3, 5]) => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllEven(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "areAllEven",
            "reference_solution": "function areAllEven(arr) {\n  return arr.every(function(n) { return n % 2 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [2, 4, 6, 8, 10] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [2, 3, 4] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses some to check if at least one number is greater than 45.\n  Use some to check if at least one number is greater than 45.\n  Examples:\n    hasAnyGreaterThan45([10, 20, 30, 40, 50]) => true\n    hasAnyGreaterThan45([10, 20, 30]) => false\n    hasAnyGreaterThan45([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyGreaterThan45(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "hasAnyGreaterThan45",
            "reference_solution": "function hasAnyGreaterThan45(arr) {\n  return arr.some(function(n) { return n > 45; });\n}",
            "testCases": [
              {
                "input": { "arr": [10, 20, 30, 40, 50] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [100, 200] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses every to check if all numbers are greater than 3.\n  Use every to check if all numbers are greater than 3.\n  Examples:\n    areAllGreaterThan3([5, 10, 15, 20, 25]) => true\n    areAllGreaterThan3([1, 2, 3]) => false\n    areAllGreaterThan3([4, 5, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllGreaterThan3(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "areAllGreaterThan3",
            "reference_solution": "function areAllGreaterThan3(arr) {\n  return arr.every(function(n) { return n > 3; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20, 25] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [4, 5, 6] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses some to check if at least one string starts with 'b'.\n  Use some to check if at least one string starts with 'b'.\n  Examples:\n    hasAnyStartsWithB([\"apple\", \"banana\", \"cherry\"]) => true\n    hasAnyStartsWithB([\"apple\", \"cherry\"]) => false\n    hasAnyStartsWithB([\"ball\", \"bat\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyStartsWithB(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "hasAnyStartsWithB",
            "reference_solution": "function hasAnyStartsWithB(arr) {\n  return arr.some(function(s) { return s[0] === 'b'; });\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry"] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": ["apple", "cherry"] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": ["ball", "bat"] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses every to check if all strings have length greater than 3.\n  Use every to check if all strings have length greater than 3.\n  Examples:\n    areAllLongerThan3([\"hello\", \"world\", \"test\"]) => true\n    areAllLongerThan3([\"hi\", \"hello\"]) => false\n    areAllLongerThan3([\"code\", \"java\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllLongerThan3(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "areAllLongerThan3",
            "reference_solution": "function areAllLongerThan3(arr) {\n  return arr.every(function(s) { return s.length > 3; });\n}",
            "testCases": [
              {
                "input": { "arr": ["hello", "world", "test"] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": ["hi", "hello"] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": ["code", "java"] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses some to check if at least one person is under 18.\n  Use some to check if at least one person is under 18.\n  Examples:\n    hasAnyMinor([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => true\n    hasAnyMinor([{name: \"Diana\", age: 20}, {name: \"Eve\", age: 25}]) => false\n    hasAnyMinor([{name: \"Frank\", age: 16}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyMinor(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "hasAnyMinor",
            "reference_solution": "function hasAnyMinor(arr) {\n  return arr.some(function(obj) { return obj.age < 18; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 17 }, { "name": "Charlie", "age": 30 }] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 20 }, { "name": "Eve", "age": 25 }] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [{ "name": "Frank", "age": 16 }] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses every to check if all people are 18 or older.\n  Use every to check if all people are 18 or older.\n  Examples:\n    areAllAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}, {name: \"Charlie\", age: 35}]) => true\n    areAllAdults([{name: \"Diana\", age: 17}, {name: \"Eve\", age: 20}]) => false\n    areAllAdults([{name: \"Frank\", age: 18}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllAdults(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "areAllAdults",
            "reference_solution": "function areAllAdults(arr) {\n  return arr.every(function(obj) { return obj.age >= 18; });\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 30 }, { "name": "Charlie", "age": 35 }] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 17 }, { "name": "Eve", "age": 20 }] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [{ "name": "Frank", "age": 18 }] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses some to check if at least one number is divisible by 3.\n  Use some to check if at least one number is divisible by 3.\n  Examples:\n    hasAnyDivisibleBy3([5, 10, 15, 20]) => true\n    hasAnyDivisibleBy3([1, 2, 4]) => false\n    hasAnyDivisibleBy3([9, 12]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyDivisibleBy3(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "hasAnyDivisibleBy3",
            "reference_solution": "function hasAnyDivisibleBy3(arr) {\n  return arr.some(function(n) { return n % 3 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [1, 2, 4] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [9, 12] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses every to check if all numbers are divisible by 10.\n  Use every to check if all numbers are divisible by 10.\n  Examples:\n    areAllDivisibleBy10([10, 20, 30, 40]) => true\n    areAllDivisibleBy10([10, 15, 20]) => false\n    areAllDivisibleBy10([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllDivisibleBy10(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "areAllDivisibleBy10",
            "reference_solution": "function areAllDivisibleBy10(arr) {\n  return arr.every(function(n) { return n % 10 === 0; });\n}",
            "testCases": [
              {
                "input": { "arr": [10, 20, 30, 40] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [10, 15, 20] },
                "expectedOutput": "false"
              },
              {
                "input": { "arr": [100, 200] },
                "expectedOutput": "true"
              },
              {
                "input": { "arr": [] },
                "expectedOutput": "true"
              }
            ]
          }
        ]
      },
      {
        "id": "reduce",
        "title": "reduce for accumulation",
        "outcomes": [
          "reduce Syntax: The Multipurpose Folding Tool",
          "The Accumulator: Tracking the Running Total",
          "Current Value: Processing Elements in Sequence",
          "The Initial Value: Setting the Starting State",
          "Versatility: Rebuilding map and filter using reduce"
        ],
        "topic_notes": `## 1. reduce Syntax: The Multipurpose Folding Tool

- array.reduce(callback, initialValue) folds the array into a single value. The callback receives (accumulator, currentElement, index, array) and returns the next accumulator.
- Use it for sum, product, max, concatenation, building objects, or any single value derived from the array.

\`\`\`javascript
const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce(function (acc, n) { return acc + n }, 0)
console.log(sum)
\`\`\`

## 2. The Accumulator: Tracking the Running Total

- The accumulator is the value carried from one callback invocation to the next. Your callback must return the updated accumulator; that becomes the acc for the next element.

\`\`\`javascript
const arr = [2, 3, 4]
const product = arr.reduce(function (acc, n) { return acc * n }, 1)
console.log(product)
\`\`\`

## 3. Current Value: Processing Elements in Sequence

- reduce walks the array left to right. For each element, the callback gets the current accumulator and the current element; it returns the new accumulator for the next step.

\`\`\`javascript
const arr = ["Hello", " ", "World"]
const joined = arr.reduce(function (acc, s) { return acc + s }, "")
console.log(joined)
\`\`\`

## 4. The Initial Value: Setting the Starting State

- The second argument to reduce is the initial value of the accumulator. For sum use 0; for product use 1; for string concat use ""; for array building use []. Omitting it uses the first element as initial acc and starts from the second (can cause errors on empty arrays).

\`\`\`javascript
const arr = [10, 5, 20, 15]
const max = arr.reduce(function (acc, n) { return n > acc ? n : acc }, arr[0])
console.log(max)
\`\`\`

## 5. Versatility: Rebuilding map and filter using reduce

- You can implement map by reducing into an array and pushing the transformed element. You can implement filter by reducing into an array and pushing only when the predicate is true.

\`\`\`javascript
const arr = [1, 2, 3]
const evens = arr.reduce(function (acc, n) {
  if (n % 2 === 0) acc.push(n)
  return acc
}, [])
console.log(evens)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses reduce to calculate the sum of all numbers.\n  Use reduce to calculate the sum of all numbers.\n  Examples:\n    sumNumbers([1, 2, 3, 4, 5]) => 15\n    sumNumbers([10, 20, 30]) => 60\n    sumNumbers([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sumNumbers",
            "reference_solution": "function sumNumbers(arr) {\n  return arr.reduce(function(acc, n) { return acc + n; }, 0);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "15"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "60"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [0, 0, 0] },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to calculate the product of all numbers.\n  Use reduce to calculate the product of all numbers.\n  Examples:\n    multiplyNumbers([2, 3, 4]) => 24\n    multiplyNumbers([5, 5]) => 25\n    multiplyNumbers([10]) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction multiplyNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "multiplyNumbers",
            "reference_solution": "function multiplyNumbers(arr) {\n  return arr.reduce(function(acc, n) { return acc * n; }, 1);\n}",
            "testCases": [
              {
                "input": { "arr": [2, 3, 4] },
                "expectedOutput": "24"
              },
              {
                "input": { "arr": [5, 5] },
                "expectedOutput": "25"
              },
              {
                "input": { "arr": [10] },
                "expectedOutput": "10"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "6"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to find the maximum number.\n  Use reduce to find the maximum number.\n  Examples:\n    findMax([10, 5, 20, 15, 30]) => 30\n    findMax([1, 2, 3]) => 3\n    findMax([100]) => 100\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findMax(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findMax",
            "reference_solution": "function findMax(arr) {\n  return arr.reduce(function(acc, n) { return n > acc ? n : acc; }, arr[0]);\n}",
            "testCases": [
              {
                "input": { "arr": [10, 5, 20, 15, 30] },
                "expectedOutput": "30"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "3"
              },
              {
                "input": { "arr": [100] },
                "expectedOutput": "100"
              },
              {
                "input": { "arr": [7, 14, 21] },
                "expectedOutput": "21"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to concatenate all strings into one.\n  Use reduce to concatenate all strings into one.\n  Examples:\n    concatenateStrings([\"Hello\", \" \", \"World\", \"!\"]) => \"Hello World!\"\n    concatenateStrings([\"JavaScript\", \" \", \"is\", \" \", \"fun\"]) => \"JavaScript is fun\"\n    concatenateStrings([\"test\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction concatenateStrings(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "concatenateStrings",
            "reference_solution": "function concatenateStrings(arr) {\n  return arr.reduce(function(acc, s) { return acc + s; }, '');\n}",
            "testCases": [
              {
                "input": { "arr": ["Hello", " ", "World", "!"] },
                "expectedOutput": "Hello World!"
              },
              {
                "input": { "arr": ["JavaScript", " ", "is", " ", "fun"] },
                "expectedOutput": "JavaScript is fun"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "test"
              },
              {
                "input": { "arr": ["a", "b", "c"] },
                "expectedOutput": "abc"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to count occurrences of each number.\n  Use reduce to count the occurrences of each number.\n  Return an object where keys are numbers and values are counts.\n  Examples:\n    countOccurrences([1, 2, 2, 3, 3, 3, 4]) => {\"1\":1,\"2\":2,\"3\":3,\"4\":1}\n    countOccurrences([5, 5, 5]) => {\"5\":3}\n    countOccurrences([1]) => {\"1\":1}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "countOccurrences",
            "reference_solution": "function countOccurrences(arr) {\n  return arr.reduce(function(acc, n) {\n    acc[n] = (acc[n] || 0) + 1;\n    return acc;\n  }, {});\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 2, 3, 3, 3, 4] },
                "expectedOutput": "{\"1\":1,\"2\":2,\"3\":3,\"4\":1}"
              },
              {
                "input": { "arr": [5, 5, 5] },
                "expectedOutput": "{\"5\":3}"
              },
              {
                "input": { "arr": [1] },
                "expectedOutput": "{\"1\":1}"
              },
              {
                "input": { "arr": [7, 8, 7] },
                "expectedOutput": "{\"7\":2,\"8\":1}"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to flatten arrays.\n  Use reduce to flatten into a single array.\n  Examples:\n    flattenArrays([[1, 2], [3, 4], [5, 6]]) => [1,2,3,4,5,6]\n    flattenArrays([[10], [20], [30]]) => [10,20,30]\n    flattenArrays([[1, 2, 3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenArrays(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "flattenArrays",
            "reference_solution": "function flattenArrays(arr) {\n  return arr.reduce(function(acc, el) { return acc.concat(el); }, []);\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2], [3, 4], [5, 6]] },
                "expectedOutput": "[1,2,3,4,5,6]"
              },
              {
                "input": { "arr": [[10], [20], [30]] },
                "expectedOutput": "[10,20,30]"
              },
              {
                "input": { "arr": [[1, 2, 3]] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "arr": [[5, 6], [7, 8, 9]] },
                "expectedOutput": "[5,6,7,8,9]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to filter even numbers.\n  Use reduce to create a new array with only even numbers (like filter).\n  Examples:\n    filterEvenWithReduce([1, 2, 3, 4, 5]) => [2,4]\n    filterEvenWithReduce([10, 15, 20]) => [10,20]\n    filterEvenWithReduce([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterEvenWithReduce(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterEvenWithReduce",
            "reference_solution": "function filterEvenWithReduce(arr) {\n  return arr.reduce(function(acc, n) {\n    if (n % 2 === 0) acc.push(n);\n    return acc;\n  }, []);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "[2,4]"
              },
              {
                "input": { "arr": [10, 15, 20] },
                "expectedOutput": "[10,20]"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [8] },
                "expectedOutput": "[8]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to double numbers.\n  Use reduce to create a new array with each number doubled (like map).\n  Examples:\n    doubleWithReduce([1, 2, 3, 4]) => [2,4,6,8]\n    doubleWithReduce([5, 10]) => [10,20]\n    doubleWithReduce([0]) => [0]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction doubleWithReduce(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "doubleWithReduce",
            "reference_solution": "function doubleWithReduce(arr) {\n  return arr.reduce(function(acc, n) {\n    acc.push(n * 2);\n    return acc;\n  }, []);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4] },
                "expectedOutput": "[2,4,6,8]"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "[10,20]"
              },
              {
                "input": { "arr": [0] },
                "expectedOutput": "[0]"
              },
              {
                "input": { "arr": [3, 7] },
                "expectedOutput": "[6,14]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to calculate total age.\n  Use reduce to calculate the total age of all people.\n  Examples:\n    calculateTotalAge([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}, {name: \"Charlie\", age: 35}]) => 90\n    calculateTotalAge([{name: \"Diana\", age: 20}]) => 20\n    calculateTotalAge([{name: \"Eve\", age: 22}, {name: \"Frank\", age: 28}]) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateTotalAge(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "calculateTotalAge",
            "reference_solution": "function calculateTotalAge(arr) {\n  return arr.reduce(function(acc, obj) { return acc + obj.age; }, 0);\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 30 }, { "name": "Charlie", "age": 35 }] },
                "expectedOutput": "90"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 20 }] },
                "expectedOutput": "20"
              },
              {
                "input": { "arr": [{ "name": "Eve", "age": 22 }, { "name": "Frank", "age": 28 }] },
                "expectedOutput": "50"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to calculate the average.\n  Use reduce to calculate the average.\n  Hint: Sum all numbers, then divide by array length.\n  Examples:\n    calculateAverage([5, 10, 15, 20]) => 12.5\n    calculateAverage([10, 20, 30]) => 20\n    calculateAverage([5]) => 5\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction calculateAverage(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "calculateAverage",
            "reference_solution": "function calculateAverage(arr) {\n  if (arr.length === 0) return 0;\n  return arr.reduce(function(acc, n) { return acc + n; }, 0) / arr.length;\n}",
            "testCases": [
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "12.5"
              },
              {
                "input": { "arr": [10, 20, 30] },
                "expectedOutput": "20"
              },
              {
                "input": { "arr": [5] },
                "expectedOutput": "5"
              },
              {
                "input": { "arr": [2, 4, 6, 8] },
                "expectedOutput": "5"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to map strings to their lengths.\n  Use reduce to create an object where keys are strings and values are their lengths.\n  Examples:\n    mapStringLengths([\"apple\", \"banana\", \"cherry\"]) => {\"apple\":5,\"banana\":6,\"cherry\":6}\n    mapStringLengths([\"hi\", \"hello\"]) => {\"hi\":2,\"hello\":5}\n    mapStringLengths([\"test\"]) => {\"test\":4}\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction mapStringLengths(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "mapStringLengths",
            "reference_solution": "function mapStringLengths(arr) {\n  return arr.reduce(function(acc, s) {\n    acc[s] = s.length;\n    return acc;\n  }, {});\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry"] },
                "expectedOutput": "{\"apple\":5,\"banana\":6,\"cherry\":6}"
              },
              {
                "input": { "arr": ["hi", "hello"] },
                "expectedOutput": "{\"hi\":2,\"hello\":5}"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "{\"test\":4}"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses reduce to extract x values.\n  Use reduce to extract all x values into a single array.\n  Examples:\n    extractXValues([{x: 1}, {x: 2}, {x: 3}]) => [1,2,3]\n    extractXValues([{x: 10}]) => [10]\n    extractXValues([{x: 5}, {x: 15}, {x: 25}]) => [5,15,25]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractXValues(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractXValues",
            "reference_solution": "function extractXValues(arr) {\n  return arr.reduce(function(acc, obj) {\n    acc.push(obj.x);\n    return acc;\n  }, []);\n}",
            "testCases": [
              {
                "input": { "arr": [{ "x": 1 }, { "x": 2 }, { "x": 3 }] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "arr": [{ "x": 10 }] },
                "expectedOutput": "[10]"
              },
              {
                "input": { "arr": [{ "x": 5 }, { "x": 15 }, { "x": 25 }] },
                "expectedOutput": "[5,15,25]"
              }
            ]
          }
        ]
      },
      {
        "id": "string-manipulations",
        "title": "Common string manipulations",
        "outcomes": [
          "trim(): Removing whitespace from Memory",
          "replace() and replaceAll(): Pattern Substitution",
          "repeat(): Generative Sequence Creation",
          "Padding: Aligning Data with padStart() and padEnd()"
        ],
        "topic_notes": `## 1. trim(): Removing whitespace from Memory

- str.trim() returns a new string with leading and trailing whitespace (spaces, tabs, newlines) removed. The original string is unchanged.
- Useful for cleaning user input or comparing strings without accidental spaces.

\`\`\`javascript
const s = "  Hello World  "
console.log(s.trim())
\`\`\`

## 2. replace() and replaceAll(): Pattern Substitution

- str.replace(search, replacement) replaces the first occurrence of search with replacement. str.replaceAll(search, replacement) replaces every occurrence.
- Both return a new string; they do not modify the original.

\`\`\`javascript
const s = "cat cat cat"
console.log(s.replace("cat", "dog"))
console.log(s.replaceAll("cat", "dog"))
\`\`\`

## 3. repeat(): Generative Sequence Creation

- str.repeat(count) returns a new string made by concatenating str count times. count must be non-negative. Useful for padding patterns or repeated characters.

\`\`\`javascript
console.log("ha".repeat(3))
console.log("0".repeat(5))
\`\`\`

## 4. Padding: Aligning Data with padStart() and padEnd()

- str.padStart(targetLength, padString) pads the start until the string length is targetLength (or returns str if already long enough). padEnd does the same at the end. padString defaults to space.

\`\`\`javascript
console.log("5".padStart(4, "0"))
console.log("hi".padEnd(5, "-"))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses trim() to remove whitespace.\n  Use trim() to remove leading and trailing whitespace.\n  Examples:\n    trimString(\"  Hello World  \") => \"Hello World\"\n    trimString(\"   JavaScript   \") => \"JavaScript\"\n    trimString(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction trimString(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "trimString",
            "reference_solution": "function trimString(str) {\n  return str.trim();\n}",
            "testCases": [
              {
                "input": { "str": "  Hello World  " },
                "expectedOutput": "Hello World"
              },
              {
                "input": { "str": "   JavaScript   " },
                "expectedOutput": "JavaScript"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "  " },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses replace() to substitute text.\n  Use replace() to replace the search term with the replacement.\n  Examples:\n    replaceText(\"Hello World\", \"World\", \"JavaScript\") => \"Hello JavaScript\"\n    replaceText(\"I love coding\", \"coding\", \"programming\") => \"I love programming\"\n    replaceText(\"test\", \"test\", \"exam\") => \"exam\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceText(str, search, replacement) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "replaceText",
            "reference_solution": "function replaceText(str, search, replacement) {\n  return str.replace(search, replacement);\n}",
            "testCases": [
              {
                "input": { "str": "Hello World", "search": "World", "replacement": "JavaScript" },
                "expectedOutput": "Hello JavaScript"
              },
              {
                "input": { "str": "I love coding", "search": "coding", "replacement": "programming" },
                "expectedOutput": "I love programming"
              },
              {
                "input": { "str": "test", "search": "test", "replacement": "exam" },
                "expectedOutput": "exam"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses replaceAll() to replace all occurrences.\n  Use replaceAll() to replace all occurrences of the search term with the replacement.\n  Examples:\n    replaceAllText(\"cat cat cat\", \"cat\", \"dog\") => \"dog dog dog\"\n    replaceAllText(\"hello hello\", \"hello\", \"hi\") => \"hi hi\"\n    replaceAllText(\"test\", \"test\", \"exam\") => \"exam\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceAllText(str, search, replacement) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "replaceAllText",
            "reference_solution": "function replaceAllText(str, search, replacement) {\n  return str.replaceAll(search, replacement);\n}",
            "testCases": [
              {
                "input": { "str": "cat cat cat", "search": "cat", "replacement": "dog" },
                "expectedOutput": "dog dog dog"
              },
              {
                "input": { "str": "hello hello", "search": "hello", "replacement": "hi" },
                "expectedOutput": "hi hi"
              },
              {
                "input": { "str": "test", "search": "test", "replacement": "exam" },
                "expectedOutput": "exam"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses repeat() to repeat a string.\n  Use repeat() to repeat the string the specified number of times.\n  Examples:\n    repeatString(\"ha\", 3) => \"hahaha\"\n    repeatString(\"abc\", 2) => \"abcabc\"\n    repeatString(\"x\", 5) => \"xxxxx\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction repeatString(str, count) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "repeatString",
            "reference_solution": "function repeatString(str, count) {\n  return str.repeat(count);\n}",
            "testCases": [
              {
                "input": { "str": "ha", "count": 3 },
                "expectedOutput": "hahaha"
              },
              {
                "input": { "str": "abc", "count": 2 },
                "expectedOutput": "abcabc"
              },
              {
                "input": { "str": "x", "count": 5 },
                "expectedOutput": "xxxxx"
              },
              {
                "input": { "str": "test", "count": 0 },
                "expectedOutput": ""
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses padStart() to pad a string at the beginning.\n  Use padStart() to pad the string to the specified length with the given character.\n  Examples:\n    padStringStart(\"5\", 4, \"0\") => \"0005\"\n    padStringStart(\"42\", 5, \"0\") => \"00042\"\n    padStringStart(\"7\", 3, \"0\") => \"007\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction padStringStart(str, length, padChar) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "padStringStart",
            "reference_solution": "function padStringStart(str, length, padChar) {\n  return str.padStart(length, padChar);\n}",
            "testCases": [
              {
                "input": { "str": "5", "length": 4, "padChar": "0" },
                "expectedOutput": "0005"
              },
              {
                "input": { "str": "42", "length": 5, "padChar": "0" },
                "expectedOutput": "00042"
              },
              {
                "input": { "str": "7", "length": 3, "padChar": "0" },
                "expectedOutput": "007"
              },
              {
                "input": { "str": "100", "length": 2, "padChar": "0" },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses padEnd() to pad a string at the end.\n  Use padEnd() to pad the string to the specified length with the given character.\n  Examples:\n    padStringEnd(\"5\", 4, \"0\") => \"5000\"\n    padStringEnd(\"42\", 5, \"0\") => \"42000\"\n    padStringEnd(\"7\", 3, \"0\") => \"700\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction padStringEnd(str, length, padChar) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "padStringEnd",
            "reference_solution": "function padStringEnd(str, length, padChar) {\n  return str.padEnd(length, padChar);\n}",
            "testCases": [
              {
                "input": { "str": "5", "length": 4, "padChar": "0" },
                "expectedOutput": "5000"
              },
              {
                "input": { "str": "42", "length": 5, "padChar": "0" },
                "expectedOutput": "42000"
              },
              {
                "input": { "str": "7", "length": 3, "padChar": "0" },
                "expectedOutput": "700"
              },
              {
                "input": { "str": "100", "length": 2, "padChar": "0" },
                "expectedOutput": "100"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses trim() and replace() to clean and modify text.\n  Use trim() to remove whitespace and replace() to replace \"awesome\" with \"great\".\n  Examples:\n    trimAndReplace(\"  JavaScript is awesome  \") => \"JavaScript is great\"\n    trimAndReplace(\"  coding is fun  \") => \"coding is great\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction trimAndReplace(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "trimAndReplace",
            "reference_solution": "function trimAndReplace(str) {\n  return str.trim().replace('awesome', 'great').replace('fun', 'great');\n}",
            "testCases": [
              {
                "input": { "str": "  JavaScript is awesome  " },
                "expectedOutput": "JavaScript is great"
              },
              {
                "input": { "str": "  coding is fun  " },
                "expectedOutput": "coding is great"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses replaceAll() to replace hyphens with spaces.\n  Use replaceAll() to replace all hyphens (-) with spaces.\n  Examples:\n    replaceHyphens(\"hello-world-javascript\") => \"hello world javascript\"\n    replaceHyphens(\"one-two-three\") => \"one two three\"\n    replaceHyphens(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceHyphens(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "replaceHyphens",
            "reference_solution": "function replaceHyphens(str) {\n  return str.replaceAll('-', ' ');\n}",
            "testCases": [
              {
                "input": { "str": "hello-world-javascript" },
                "expectedOutput": "hello world javascript"
              },
              {
                "input": { "str": "one-two-three" },
                "expectedOutput": "one two three"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "a-b-c-d" },
                "expectedOutput": "a b c d"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses repeat() to create repeated patterns.\n  Use repeat() to repeat the string the specified number of times.\n  Examples:\n    createPattern(\"*\", 10) => \"**********\"\n    createPattern(\"-\", 5) => \"-----\"\n    createPattern(\"#\", 7) => \"#######\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createPattern(str, count) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "createPattern",
            "reference_solution": "function createPattern(str, count) {\n  return str.repeat(count);\n}",
            "testCases": [
              {
                "input": { "str": "*", "count": 10 },
                "expectedOutput": "**********"
              },
              {
                "input": { "str": "-", "count": 5 },
                "expectedOutput": "-----"
              },
              {
                "input": { "str": "#", "count": 7 },
                "expectedOutput": "#######"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses padStart() and padEnd() to center-align text.\n  Use padStart() to center-align by padding with spaces to length 10.\n  Then use padEnd() on the result to make total length 14.\n  Examples:\n    centerAlignText(\"Code\") => \"   Code       \"\n    centerAlignText(\"Hi\") => \"    Hi        \"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction centerAlignText(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "centerAlignText",
            "reference_solution": "function centerAlignText(str) {\n  const startLen = 5 + Math.floor(str.length / 2);\n  return str.padStart(startLen).padEnd(14);\n}",
            "testCases": [
              {
                "input": { "str": "Code" },
                "expectedOutput": "   Code       "
              },
              {
                "input": { "str": "Hi" },
                "expectedOutput": "    Hi        "
              }
            ]
          }
        ]
      },
      {
        "id": "split-join",
        "title": "split and join",
        "outcomes": [
          "split Syntax: Deconstructing Strings into Arrays",
          "join Syntax: Reconstructing Arrays into Strings",
          "The Empty Separator: Character-level Tokenization",
          "The Round Trip: Splitting, Modifying, and Joining",
          "Implicit Join: Behavior with Missing or Default Separators"
        ],
        "topic_notes": `## 1. split Syntax: Deconstructing Strings into Arrays

- str.split(separator) returns an array of substrings. The separator (string or regex) is used to split; it is not included in the result. Empty string "" splits into single characters.

\`\`\`javascript
const s = "apple,banana,cherry"
console.log(s.split(","))
\`\`\`

## 2. join Syntax: Reconstructing Arrays into Strings

- array.join(separator) returns a string made by concatenating all elements with separator between them. Elements are converted to strings. Default separator is comma.

\`\`\`javascript
const arr = ["apple", "banana", "cherry"]
console.log(arr.join(","))
\`\`\`

## 3. The Empty Separator: Character-level Tokenization

- str.split("") splits the string into an array of single characters. Useful for character-by-character processing or reversing a string (split, reverse, join).

\`\`\`javascript
const s = "hello"
console.log(s.split(""))
\`\`\`

## 4. The Round Trip: Splitting, Modifying, and Joining

- A common pattern: split a string into an array, transform or filter the array, then join back into a string. Example: change words, change delimiter, or remove parts.

\`\`\`javascript
const s = "one two three"
const words = s.split(" ")
words[1] = words[1].toUpperCase()
console.log(words.join(" "))
\`\`\`

## 5. Implicit Join: Behavior with Missing or Default Separators

- arr.join() with no argument uses comma as separator. join("") concatenates with nothing between elements (useful after split("") or for building a string from characters).

\`\`\`javascript
console.log(["a", "b", "c"].join())
console.log(["a", "b", "c"].join(""))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses split() to convert string to array.\n  Use split() to convert it into an array using comma as separator.\n  Examples:\n    splitByComma(\"apple,banana,cherry\") => [\"apple\",\"banana\",\"cherry\"]\n    splitByComma(\"one,two,three\") => [\"one\",\"two\",\"three\"]\n    splitByComma(\"hello\") => [\"hello\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitByComma(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "splitByComma",
            "reference_solution": "function splitByComma(str) {\n  return str.split(',');\n}",
            "testCases": [
              {
                "input": { "str": "apple,banana,cherry" },
                "expectedOutput": "[\"apple\",\"banana\",\"cherry\"]"
              },
              {
                "input": { "str": "one,two,three" },
                "expectedOutput": "[\"one\",\"two\",\"three\"]"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "[\"test\"]"
              },
              {
                "input": { "str": "a,b" },
                "expectedOutput": "[\"a\",\"b\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses join() to convert array to string.\n  Use join() to convert it into a string with comma separator.\n  Examples:\n    joinWithComma([\"apple\", \"banana\", \"cherry\"]) => \"apple,banana,cherry\"\n    joinWithComma([\"one\", \"two\", \"three\"]) => \"one,two,three\"\n    joinWithComma([\"test\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinWithComma(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "joinWithComma",
            "reference_solution": "function joinWithComma(arr) {\n  return arr.join(',');\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry"] },
                "expectedOutput": "apple,banana,cherry"
              },
              {
                "input": { "arr": ["one", "two", "three"] },
                "expectedOutput": "one,two,three"
              },
              {
                "input": { "arr": ["test"] },
                "expectedOutput": "test"
              },
              {
                "input": { "arr": ["a", "b"] },
                "expectedOutput": "a,b"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses split('') to convert string to character array.\n  Use split('') to convert it into an array of characters.\n  Examples:\n    splitToCharacters(\"hello\") => [\"h\",\"e\",\"l\",\"l\",\"o\"]\n    splitToCharacters(\"abc\") => [\"a\",\"b\",\"c\"]\n    splitToCharacters(\"x\") => [\"x\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitToCharacters(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "splitToCharacters",
            "reference_solution": "function splitToCharacters(str) {\n  return str.split('');\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "[\"h\",\"e\",\"l\",\"l\",\"o\"]"
              },
              {
                "input": { "str": "abc" },
                "expectedOutput": "[\"a\",\"b\",\"c\"]"
              },
              {
                "input": { "str": "x" },
                "expectedOutput": "[\"x\"]"
              },
              {
                "input": { "str": "JS" },
                "expectedOutput": "[\"J\",\"S\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses join('') to convert character array to string.\n  Use join('') to convert it into a string with no separator.\n  Examples:\n    joinCharacters([\"H\", \"e\", \"l\", \"l\", \"o\"]) => \"Hello\"\n    joinCharacters([\"a\", \"b\", \"c\"]) => \"abc\"\n    joinCharacters([\"t\", \"e\", \"s\", \"t\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinCharacters(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "joinCharacters",
            "reference_solution": "function joinCharacters(arr) {\n  return arr.join('');\n}",
            "testCases": [
              {
                "input": { "arr": ["H", "e", "l", "l", "o"] },
                "expectedOutput": "Hello"
              },
              {
                "input": { "arr": ["a", "b", "c"] },
                "expectedOutput": "abc"
              },
              {
                "input": { "arr": ["t", "e", "s", "t"] },
                "expectedOutput": "test"
              },
              {
                "input": { "arr": ["x"] },
                "expectedOutput": "x"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses split() to convert string to word array.\n  Use split() with space separator to create an array.\n  Examples:\n    splitBySpace(\"one two three four\") => [\"one\",\"two\",\"three\",\"four\"]\n    splitBySpace(\"hello world\") => [\"hello\",\"world\"]\n    splitBySpace(\"test\") => [\"test\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitBySpace(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "splitBySpace",
            "reference_solution": "function splitBySpace(str) {\n  return str.split(' ');\n}",
            "testCases": [
              {
                "input": { "str": "one two three four" },
                "expectedOutput": "[\"one\",\"two\",\"three\",\"four\"]"
              },
              {
                "input": { "str": "hello world" },
                "expectedOutput": "[\"hello\",\"world\"]"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "[\"test\"]"
              },
              {
                "input": { "str": "a b c" },
                "expectedOutput": "[\"a\",\"b\",\"c\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses join() to create a sentence.\n  Use join() with space separator to create a sentence.\n  Examples:\n    joinWithSpace([\"JavaScript\", \"is\", \"awesome\"]) => \"JavaScript is awesome\"\n    joinWithSpace([\"Hello\", \"World\"]) => \"Hello World\"\n    joinWithSpace([\"one\"]) => \"one\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinWithSpace(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "joinWithSpace",
            "reference_solution": "function joinWithSpace(arr) {\n  return arr.join(' ');\n}",
            "testCases": [
              {
                "input": { "arr": ["JavaScript", "is", "awesome"] },
                "expectedOutput": "JavaScript is awesome"
              },
              {
                "input": { "arr": ["Hello", "World"] },
                "expectedOutput": "Hello World"
              },
              {
                "input": { "arr": ["one"] },
                "expectedOutput": "one"
              },
              {
                "input": { "arr": ["I", "love", "coding"] },
                "expectedOutput": "I love coding"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that checks if a string is a palindrome.\n  Split it into characters, reverse the array, then join back.\n  Check if the result equals the original string.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "isPalindrome",
            "reference_solution": "function isPalindrome(str) {\n  return str.split('').reverse().join('') === str;\n}",
            "testCases": [
              {
                "input": { "str": "racecar" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "madam" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that transforms words to uppercase and joins with hyphens.\n  Split into words, convert each word to uppercase, then join with hyphens.\n  Examples:\n    wordsToUppercaseHyphenated(\"hello world\") => \"HELLO-WORLD\"\n    wordsToUppercaseHyphenated(\"one two three\") => \"ONE-TWO-THREE\"\n    wordsToUppercaseHyphenated(\"test\") => \"TEST\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction wordsToUppercaseHyphenated(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "wordsToUppercaseHyphenated",
            "reference_solution": "function wordsToUppercaseHyphenated(str) {\n  return str.split(' ').map(function(w) { return w.toUpperCase(); }).join('-');\n}",
            "testCases": [
              {
                "input": { "str": "hello world" },
                "expectedOutput": "HELLO-WORLD"
              },
              {
                "input": { "str": "one two three" },
                "expectedOutput": "ONE-TWO-THREE"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "TEST"
              },
              {
                "input": { "str": "javascript is fun" },
                "expectedOutput": "JAVASCRIPT-IS-FUN"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that replaces hyphens with spaces using split and join.\n  Split by hyphen, then join with space.\n  Examples:\n    replaceHyphensWithSpaces(\"apple-banana-cherry\") => \"apple banana cherry\"\n    replaceHyphensWithSpaces(\"one-two-three\") => \"one two three\"\n    replaceHyphensWithSpaces(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceHyphensWithSpaces(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "replaceHyphensWithSpaces",
            "reference_solution": "function replaceHyphensWithSpaces(str) {\n  return str.split('-').join(' ');\n}",
            "testCases": [
              {
                "input": { "str": "apple-banana-cherry" },
                "expectedOutput": "apple banana cherry"
              },
              {
                "input": { "str": "one-two-three" },
                "expectedOutput": "one two three"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "a-b-c" },
                "expectedOutput": "a b c"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that reverses and uppercases a string.\n  Split into characters, reverse the array, join back, and convert to uppercase.\n  Examples:\n    reverseAndUppercase(\"hello\") => \"OLLEH\"\n    reverseAndUppercase(\"world\") => \"DLROW\"\n    reverseAndUppercase(\"test\") => \"TSET\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseAndUppercase(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "reverseAndUppercase",
            "reference_solution": "function reverseAndUppercase(str) {\n  return str.split('').reverse().join('').toUpperCase();\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "OLLEH"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "DLROW"
              },
              {
                "input": { "str": "abc" },
                "expectedOutput": "CBA"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "TSET"
              }
            ]
          }
        ]
      },
      {
        "id": "substring-slice",
        "title": "substring and slice",
        "outcomes": [
          "slice Syntax: Extracting String Segments",
          "substring Syntax: Standard Character Extraction",
          "The Exclusive End: Understanding the (Start, End) Boundary",
          "Implicit End: Omission for Remainder Extraction",
          "Negative Indices: Slicing from the End of the Sequence"
        ],
        "topic_notes": `## 1. slice Syntax: Extracting String Segments

- str.slice(start, end) returns the substring from index start up to but not including end. Omit end to get from start to the end of the string.
- slice does not modify the original string. Negative indices count from the end (-1 is last character).

\`\`\`javascript
const s = "JavaScript"
console.log(s.slice(0, 4))
console.log(s.slice(4))
\`\`\`

## 2. substring Syntax: Standard Character Extraction

- str.substring(start, end) returns the substring between start and end (end exclusive). If start > end, they are swapped. Omit end to get from start to the end.
- Unlike slice, substring does not accept negative indices; they are treated as 0.

\`\`\`javascript
const s = "Hello World"
console.log(s.substring(0, 5))
console.log(s.substring(6))
\`\`\`

## 3. The Exclusive End: Understanding the (Start, End) Boundary

- For both slice and substring, the end index is exclusive: the character at end is not included. So slice(0, 4) gives indices 0, 1, 2, 3 (four characters).

\`\`\`javascript
const s = "testing"
console.log(s.slice(0, 4))
\`\`\`

## 4. Implicit End: Omission for Remainder Extraction

- When you omit the second argument, you get from start to the end of the string. Useful for "everything after index n".

\`\`\`javascript
const s = "JavaScript"
console.log(s.slice(4))
\`\`\`

## 5. Negative Indices: Slicing from the End of the Sequence

- slice accepts negative indices: -1 is the last character, -2 is second-to-last, etc. slice(-3) gives the last three characters. substring does not support negative indices.

\`\`\`javascript
const s = "Hello World"
console.log(s.slice(-5))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses slice() to extract substring.\n  Use slice() to extract characters from start to end (exclusive).\n  Examples:\n    sliceString(\"JavaScript\", 0, 4) => \"Java\"\n    sliceString(\"Hello World\", 0, 5) => \"Hello\"\n    sliceString(\"testing\", 0, 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceString(str, start, end) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceString",
            "reference_solution": "function sliceString(str, start, end) {\n  return str.slice(start, end);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript", "start": 0, "end": 4 },
                "expectedOutput": "Java"
              },
              {
                "input": { "str": "Hello World", "start": 0, "end": 5 },
                "expectedOutput": "Hello"
              },
              {
                "input": { "str": "testing", "start": 0, "end": 4 },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "abc", "start": 0, "end": 2 },
                "expectedOutput": "ab"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() to extract from index to end.\n  Use slice() to extract from start index to the end.\n  Examples:\n    sliceFromIndex(\"JavaScript\", 4) => \"Script\"\n    sliceFromIndex(\"Hello World\", 6) => \"World\"\n    sliceFromIndex(\"testing\", 4) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceFromIndex(str, start) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceFromIndex",
            "reference_solution": "function sliceFromIndex(str, start) {\n  return str.slice(start);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript", "start": 4 },
                "expectedOutput": "Script"
              },
              {
                "input": { "str": "Hello World", "start": 6 },
                "expectedOutput": "World"
              },
              {
                "input": { "str": "testing", "start": 4 },
                "expectedOutput": "ing"
              },
              {
                "input": { "str": "abc", "start": 1 },
                "expectedOutput": "bc"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() with negative index.\n  Use slice() with negative index to extract from the end.\n  Examples:\n    sliceWithNegative(\"JavaScript\", -6) => \"Script\"\n    sliceWithNegative(\"Hello World\", -5) => \"World\"\n    sliceWithNegative(\"testing\", -3) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceWithNegative(str, start) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceWithNegative",
            "reference_solution": "function sliceWithNegative(str, start) {\n  return str.slice(start);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript", "start": -6 },
                "expectedOutput": "Script"
              },
              {
                "input": { "str": "Hello World", "start": -5 },
                "expectedOutput": "World"
              },
              {
                "input": { "str": "testing", "start": -3 },
                "expectedOutput": "ing"
              },
              {
                "input": { "str": "abcdef", "start": -2 },
                "expectedOutput": "ef"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses substring() to extract substring.\n  Use substring() to extract characters from start to end.\n  Examples:\n    substringExtract(\"JavaScript\", 0, 4) => \"Java\"\n    substringExtract(\"Hello World\", 0, 5) => \"Hello\"\n    substringExtract(\"testing\", 0, 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction substringExtract(str, start, end) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "substringExtract",
            "reference_solution": "function substringExtract(str, start, end) {\n  return str.substring(start, end);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript", "start": 0, "end": 4 },
                "expectedOutput": "Java"
              },
              {
                "input": { "str": "Hello World", "start": 0, "end": 5 },
                "expectedOutput": "Hello"
              },
              {
                "input": { "str": "testing", "start": 0, "end": 4 },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "abc", "start": 0, "end": 2 },
                "expectedOutput": "ab"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses substring() to extract from index to end.\n  Use substring() to extract from start index to the end.\n  Examples:\n    substringFromIndex(\"JavaScript\", 4) => \"Script\"\n    substringFromIndex(\"Hello World\", 6) => \"World\"\n    substringFromIndex(\"testing\", 4) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction substringFromIndex(str, start) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "substringFromIndex",
            "reference_solution": "function substringFromIndex(str, start) {\n  return str.substring(start);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript", "start": 4 },
                "expectedOutput": "Script"
              },
              {
                "input": { "str": "Hello World", "start": 6 },
                "expectedOutput": "World"
              },
              {
                "input": { "str": "testing", "start": 4 },
                "expectedOutput": "ing"
              },
              {
                "input": { "str": "abc", "start": 1 },
                "expectedOutput": "bc"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() to extract middle substring.\n  Use slice() to extract characters from start to end index.\n  Examples:\n    sliceMiddle(\"Hello World\", 6, 11) => \"World\"\n    sliceMiddle(\"JavaScript\", 4, 10) => \"Script\"\n    sliceMiddle(\"testing\", 2, 5) => \"sti\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceMiddle(str, start, end) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceMiddle",
            "reference_solution": "function sliceMiddle(str, start, end) {\n  return str.slice(start, end);\n}",
            "testCases": [
              {
                "input": { "str": "Hello World", "start": 6, "end": 11 },
                "expectedOutput": "World"
              },
              {
                "input": { "str": "JavaScript", "start": 4, "end": 10 },
                "expectedOutput": "Script"
              },
              {
                "input": { "str": "testing", "start": 2, "end": 5 },
                "expectedOutput": "sti"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() with negative indices.\n  Use slice() with negative indices to extract from start to end.\n  Examples:\n    sliceNegativeRange(\"Hello World\", -5, -1) => \"Worl\"\n    sliceNegativeRange(\"JavaScript\", -6, -1) => \"Scrip\"\n    sliceNegativeRange(\"testing\", -4, -1) => \"tin\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceNegativeRange(str, start, end) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceNegativeRange",
            "reference_solution": "function sliceNegativeRange(str, start, end) {\n  return str.slice(start, end);\n}",
            "testCases": [
              {
                "input": { "str": "Hello World", "start": -5, "end": -1 },
                "expectedOutput": "Worl"
              },
              {
                "input": { "str": "JavaScript", "start": -6, "end": -1 },
                "expectedOutput": "Scrip"
              },
              {
                "input": { "str": "testing", "start": -4, "end": -1 },
                "expectedOutput": "tin"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() to get first N characters.\n  Use slice() to get the first N characters.\n  Examples:\n    sliceFirstN(\"programming\", 7) => \"program\"\n    sliceFirstN(\"JavaScript\", 4) => \"Java\"\n    sliceFirstN(\"testing\", 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceFirstN(str, length) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceFirstN",
            "reference_solution": "function sliceFirstN(str, length) {\n  return str.slice(0, length);\n}",
            "testCases": [
              {
                "input": { "str": "programming", "length": 7 },
                "expectedOutput": "program"
              },
              {
                "input": { "str": "JavaScript", "length": 4 },
                "expectedOutput": "Java"
              },
              {
                "input": { "str": "testing", "length": 4 },
                "expectedOutput": "test"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses slice() to extract middle characters.\n  Use slice() to extract every character except the first and last.\n  Examples:\n    sliceMiddleChars(\"abcdefghij\") => \"bcdefghi\"\n    sliceMiddleChars(\"hello\") => \"ell\"\n    sliceMiddleChars(\"test\") => \"es\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceMiddleChars(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sliceMiddleChars",
            "reference_solution": "function sliceMiddleChars(str) {\n  return str.slice(1, -1);\n}",
            "testCases": [
              {
                "input": { "str": "abcdefghij" },
                "expectedOutput": "bcdefghi"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "ell"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "es"
              },
              {
                "input": { "str": "abc" },
                "expectedOutput": "b"
              }
            ]
          }
        ]
      },
      {
        "id": "string-searching",
        "title": "String searching and matching",
        "outcomes": [
          "indexOf(): Locating the First Occurrence",
          "lastIndexOf(): Searching from the End",
          "includes(): Simple Boolean Existence Checks",
          "startsWith() and endsWith(): Boundary Validation"
        ],
        "topic_notes": `## 1. indexOf(): Locating the First Occurrence

- str.indexOf(searchValue, fromIndex) returns the index of the first occurrence of searchValue, or -1 if not found. Optional fromIndex starts the search at that position.

\`\`\`javascript
const s = "Hello World"
console.log(s.indexOf("World"))
console.log(s.indexOf("x"))
\`\`\`

## 2. lastIndexOf(): Searching from the End

- str.lastIndexOf(searchValue, fromIndex) returns the index of the last occurrence of searchValue, searching backward. Returns -1 if not found. fromIndex limits how far back to search.

\`\`\`javascript
const s = "banana"
console.log(s.lastIndexOf("a"))
\`\`\`

## 3. includes(): Simple Boolean Existence Checks

- str.includes(searchValue) returns true if the string contains searchValue, false otherwise. Use it when you only need to know whether a substring exists, not its position.

\`\`\`javascript
const s = "JavaScript is awesome"
console.log(s.includes("awesome"))
console.log(s.includes("Python"))
\`\`\`

## 4. startsWith() and endsWith(): Boundary Validation

- str.startsWith(searchValue) returns true if the string begins with searchValue. str.endsWith(searchValue) returns true if it ends with searchValue. Useful for file extensions, prefixes, or validation.

\`\`\`javascript
const file = "report.pdf"
console.log(file.endsWith(".pdf"))
const lang = "JavaScript"
console.log(lang.startsWith("Java"))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses indexOf() to find position of substring.\n  Use indexOf() to find the position of the search term.\n  Examples:\n    findPosition(\"Hello World\", \"World\") => 6\n    findPosition(\"JavaScript\", \"Script\") => 4\n    findPosition(\"testing\", \"ing\") => 4\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findPosition(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findPosition",
            "reference_solution": "function findPosition(str, search) {\n  return str.indexOf(search);\n}",
            "testCases": [
              {
                "input": { "str": "Hello World", "search": "World" },
                "expectedOutput": "6"
              },
              {
                "input": { "str": "JavaScript", "search": "Script" },
                "expectedOutput": "4"
              },
              {
                "input": { "str": "testing", "search": "ing" },
                "expectedOutput": "4"
              },
              {
                "input": { "str": "hello", "search": "xyz" },
                "expectedOutput": "-1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses indexOf() to find first occurrence.\n  Use indexOf() to find the first occurrence of the search character.\n  Examples:\n    findFirstOccurrence(\"banana\", \"a\") => 1\n    findFirstOccurrence(\"hello\", \"l\") => 2\n    findFirstOccurrence(\"test\", \"t\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstOccurrence(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findFirstOccurrence",
            "reference_solution": "function findFirstOccurrence(str, search) {\n  return str.indexOf(search);\n}",
            "testCases": [
              {
                "input": { "str": "banana", "search": "a" },
                "expectedOutput": "1"
              },
              {
                "input": { "str": "hello", "search": "l" },
                "expectedOutput": "2"
              },
              {
                "input": { "str": "test", "search": "t" },
                "expectedOutput": "0"
              },
              {
                "input": { "str": "abc", "search": "c" },
                "expectedOutput": "2"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses lastIndexOf() to find last occurrence.\n  Use lastIndexOf() to find the last occurrence of the search character.\n  Examples:\n    findLastOccurrence(\"banana\", \"a\") => 5\n    findLastOccurrence(\"hello\", \"l\") => 3\n    findLastOccurrence(\"test\", \"t\") => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findLastOccurrence(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findLastOccurrence",
            "reference_solution": "function findLastOccurrence(str, search) {\n  return str.lastIndexOf(search);\n}",
            "testCases": [
              {
                "input": { "str": "banana", "search": "a" },
                "expectedOutput": "5"
              },
              {
                "input": { "str": "hello", "search": "l" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "test", "search": "t" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "abc", "search": "a" },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses includes() to check if string contains substring.\n  Use includes() to check if the string contains the search term.\n  Examples:\n    containsSubstring(\"JavaScript is awesome\", \"awesome\") => true\n    containsSubstring(\"Hello World\", \"World\") => true\n    containsSubstring(\"testing\", \"xyz\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction containsSubstring(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "containsSubstring",
            "reference_solution": "function containsSubstring(str, search) {\n  return str.includes(search);\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript is awesome", "search": "awesome" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "Hello World", "search": "World" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "testing", "search": "xyz" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "abc", "search": "ab" },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses startsWith() to check string prefix.\n  Use startsWith() to check if the string starts with the search term.\n  Examples:\n    startsWithPrefix(\"hello.txt\", \"hello\") => true\n    startsWithPrefix(\"JavaScript\", \"Java\") => true\n    startsWithPrefix(\"testing\", \"test\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction startsWithPrefix(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "startsWithPrefix",
            "reference_solution": "function startsWithPrefix(str, search) {\n  return str.startsWith(search);\n}",
            "testCases": [
              {
                "input": { "str": "hello.txt", "search": "hello" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "JavaScript", "search": "Java" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "testing", "search": "test" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "abc", "search": "xyz" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses endsWith() to check string suffix.\n  Use endsWith() to check if the string ends with the search term.\n  Examples:\n    endsWithSuffix(\"hello.txt\", \".txt\") => true\n    endsWithSuffix(\"document.pdf\", \".pdf\") => true\n    endsWithSuffix(\"image.png\", \".jpg\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction endsWithSuffix(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "endsWithSuffix",
            "reference_solution": "function endsWithSuffix(str, search) {\n  return str.endsWith(search);\n}",
            "testCases": [
              {
                "input": { "str": "hello.txt", "search": ".txt" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "document.pdf", "search": ".pdf" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "image.png", "search": ".jpg" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "test", "search": "st" },
                "expectedOutput": "true"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses indexOf() to find the second occurrence.\n  Use indexOf() to find the position of the second occurrence of \"the\".\n  Hint: Use indexOf() twice with a starting position parameter.\n  Examples:\n    findSecondOccurrence(\"the cat in the hat\") => 11\n    findSecondOccurrence(\"the thing in the box\") => 13\n    findSecondOccurrence(\"the the end\") => 4\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findSecondOccurrence(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "findSecondOccurrence",
            "reference_solution": "function findSecondOccurrence(str) {\n  const first = str.indexOf('the');\n  if (first === -1) return -1;\n  return str.indexOf('the', first + 1);\n}",
            "testCases": [
              {
                "input": { "str": "the cat in the hat" },
                "expectedOutput": "11"
              },
              {
                "input": { "str": "the thing in the box" },
                "expectedOutput": "13"
              },
              {
                "input": { "str": "the the end" },
                "expectedOutput": "4"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that checks if string starts with \"Java\" and ends with \"Script\".\n  Check if the string both starts with \"Java\" and ends with \"Script\".\n  Examples:\n    isJavaScript(\"JavaScript\") => true\n    isJavaScript(\"JavaCode\") => false\n    isJavaScript(\"TypeScript\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isJavaScript(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "isJavaScript",
            "reference_solution": "function isJavaScript(str) {\n  return str.startsWith('Java') && str.endsWith('Script');\n}",
            "testCases": [
              {
                "input": { "str": "JavaScript" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "JavaCode" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "TypeScript" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "Java" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that counts occurrences of a substring.\n  Count how many times the search term appears in the string.\n  Hint: Use indexOf() in a loop or count manually.\n  Examples:\n    countOccurrences(\"hello world hello\", \"hello\") => 2\n    countOccurrences(\"test test test\", \"test\") => 3\n    countOccurrences(\"banana\", \"a\") => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(str, search) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "countOccurrences",
            "reference_solution": "function countOccurrences(str, search) {\n  let count = 0;\n  let pos = 0;\n  while ((pos = str.indexOf(search, pos)) !== -1) {\n    count++;\n    pos += search.length;\n  }\n  return count;\n}",
            "testCases": [
              {
                "input": { "str": "hello world hello", "search": "hello" },
                "expectedOutput": "2"
              },
              {
                "input": { "str": "test test test", "search": "test" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "banana", "search": "a" },
                "expectedOutput": "3"
              },
              {
                "input": { "str": "abc", "search": "x" },
                "expectedOutput": "0"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that validates email format.\n  Check if it contains \"@\" and ends with \".com\".\n  Examples:\n    isValidEmail(\"example@email.com\") => true\n    isValidEmail(\"test@site.org\") => false\n    isValidEmail(\"invalid.com\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isValidEmail(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "isValidEmail",
            "reference_solution": "function isValidEmail(str) {\n  return str.includes('@') && str.endsWith('.com');\n}",
            "testCases": [
              {
                "input": { "str": "example@email.com" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "test@site.org" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "invalid.com" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "user@domain.com" },
                "expectedOutput": "true"
              }
            ]
          }
        ]
      },
      {
        "id": "regex",
        "title": "Pattern matching",
        "outcomes": [
          "Regular Expressions: Defining Patterns in Memory",
          "Literal vs. Constructor: Creating Regex Objects",
          "The .test() Method: Pattern Verification (Boolean)",
          "The .match() Method: Extracting Pattern Matches",
          "Advanced Substitution: replace() with Regex",
          "Character Classes: Searching for Types (\\d, \\w, \\s)",
          "Special Characters and Escaping",
          "Quantifiers: Managing Repetition (+, *, {n})",
          "Anchors: Start (^) and End ($) Boundaries",
          "Flags: Global (g) and Case-Insensitive (i) searches",
          "Capture Groups: Isolating Sub-patterns",
          "The .exec() Method: Iterative Pattern Matching"
        ],
        "topic_notes": `## 1. Regular Expressions: Defining Patterns in Memory

- A regular expression (regex) describes a pattern of characters. In JavaScript you create one with /pattern/ or new RegExp('pattern'). Use them to test, match, or replace text.

\`\`\`javascript
const re = /hello/
console.log(re.test("hello world"))
\`\`\`

## 2. Literal vs. Constructor: Creating Regex Objects

- Literal: /pattern/ — concise, pattern is fixed at write time. Constructor: new RegExp('pattern') — useful when the pattern is a string variable. Escape backslashes in the string (e.g. \\\\d for \\d).

\`\`\`javascript
const re1 = /\\d+/
const re2 = new RegExp('\\\\d+')
\`\`\`

## 3. The .test() Method: Pattern Verification (Boolean)

- regex.test(str) returns true if the pattern matches somewhere in str, false otherwise. Use it for validation or simple yes/no checks.

\`\`\`javascript
console.log(/\\d/.test("hello123"))
console.log(/\\d/.test("hello"))
\`\`\`

## 4. The .match() Method: Extracting Pattern Matches

- str.match(regex) returns an array of matches (or null). With the g flag it returns all matches; without g it returns the first match plus capture groups. Use it to extract substrings that match the pattern.

\`\`\`javascript
const s = "Price: $25.99"
const m = s.match(/\\d+\\.?\\d*/)
console.log(m ? m[0] : null)
\`\`\`

## 5. Advanced Substitution: replace() with Regex

- str.replace(regex, replacement) replaces the first match (or all matches if regex has the g flag). replacement can be a string or a function. Use regex for flexible find-and-replace.

\`\`\`javascript
console.log("hello   world".replace(/\\s+/g, " "))
\`\`\`

## 6. Character Classes: Searching for Types (\\\\d, \\\\w, \\\\s)

- \\d matches a digit, \\w matches a word character (letter, digit, underscore), \\s matches whitespace. Uppercase (\\D, \\W, \\S) matches the opposite. Use them to match kinds of characters instead of listing them.

\`\`\`javascript
console.log(/\\d/.test("abc5"))
console.log(/\\w+/.exec("hello world")[0])
\`\`\`

## 7. Special Characters and Escaping

- In a regex, . * + ? [ ] ( ) { } ^ $ | \\ have special meaning. To match them literally, escape with \\ (e.g. \\. for a literal dot). In a string passed to RegExp, use \\\\ for one backslash in the pattern.

\`\`\`javascript
console.log(/\\./.test("a.b"))
\`\`\`

## 8. Quantifiers: Managing Repetition (+, *, {n})

- + means one or more, * means zero or more, ? means zero or one. {n} means exactly n, {n,} means n or more, {n,m} means between n and m. They apply to the previous character or group.

\`\`\`javascript
console.log(/\\d{3}-\\d{4}/.test("555-1234"))
\`\`\`

## 9. Anchors: Start (^) and End ($) Boundaries

- ^ matches the start of the string, $ matches the end. Use them to require the whole string to match (e.g. /^\\d+$/ for a string that is only digits).

\`\`\`javascript
console.log(/^he/.test("hello"))
console.log(/ing$/.test("testing"))
\`\`\`

## 10. Flags: Global (g) and Case-Insensitive (i) searches

- g: find all matches (for match, replace). i: case-insensitive. Add after the closing slash: /pattern/gi or pass as second argument to RegExp.

\`\`\`javascript
console.log("Hello HELLO".match(/hello/gi))
\`\`\`

## 11. Capture Groups: Isolating Sub-patterns

- Parentheses ( ) create a capture group. match() returns the full match plus each group. In replace(), use $1, $2 to insert captured text.

\`\`\`javascript
const m = "2024-01-15".match(/(\\d{4})-(\\d{2})-(\\d{2})/)
console.log(m && m.slice(1))
\`\`\`

## 12. The .exec() Method: Iterative Pattern Matching

- regex.exec(str) returns one match at a time (with groups). Call repeatedly while it returns non-null to get successive matches; the regex's lastIndex is updated when using the g flag.

\`\`\`javascript
const re = /\\d+/g
let m
while ((m = re.exec("a1 b2 c3")) !== null) console.log(m[0])
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that uses regex to test if string contains digits.\n  Create a regex pattern to test if the string contains any digit.\n  Use the test() method.\n  Examples:\n    containsDigit(\"hello123\") => true\n    containsDigit(\"hello\") => false\n    containsDigit(\"test456\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction containsDigit(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "containsDigit",
            "reference_solution": "function containsDigit(str) {\n  return /\\d/.test(str);\n}",
            "testCases": [
              {
                "input": { "str": "hello123" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "hello" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "test456" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "abc" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to match all digits.\n  Create a regex to match all digits in the string.\n  Use the match() method with global flag.\n  Examples:\n    matchAllDigits(\"The year is 2024\") => [\"2\",\"0\",\"2\",\"4\"]\n    matchAllDigits(\"Room 101\") => [\"1\",\"0\",\"1\"]\n    matchAllDigits(\"No digits here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchAllDigits(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "matchAllDigits",
            "reference_solution": "function matchAllDigits(str) {\n  return str.match(/\\d/g);\n}",
            "testCases": [
              {
                "input": { "str": "The year is 2024" },
                "expectedOutput": "[\"2\",\"0\",\"2\",\"4\"]"
              },
              {
                "input": { "str": "Room 101" },
                "expectedOutput": "[\"1\",\"0\",\"1\"]"
              },
              {
                "input": { "str": "No digits here" },
                "expectedOutput": "null"
              },
              {
                "input": { "str": "42" },
                "expectedOutput": "[\"4\",\"2\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to replace spaces with hyphens.\n  Create a regex to replace all spaces with hyphens.\n  Use replace() with regex and global flag.\n  Examples:\n    replaceSpacesWithHyphens(\"Hello World\") => \"Hello-World\"\n    replaceSpacesWithHyphens(\"one two three\") => \"one-two-three\"\n    replaceSpacesWithHyphens(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceSpacesWithHyphens(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "replaceSpacesWithHyphens",
            "reference_solution": "function replaceSpacesWithHyphens(str) {\n  return str.replace(/ /g, '-');\n}",
            "testCases": [
              {
                "input": { "str": "Hello World" },
                "expectedOutput": "Hello-World"
              },
              {
                "input": { "str": "one two three" },
                "expectedOutput": "one-two-three"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "test"
              },
              {
                "input": { "str": "a b c" },
                "expectedOutput": "a-b-c"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses case-insensitive regex to match \"hello\".\n  Create a case-insensitive regex to match all occurrences of \"hello\".\n  Use match() with global and case-insensitive flags.\n  Examples:\n    matchHelloCaseInsensitive(\"hello HELLO HeLLo\") => [\"hello\",\"HELLO\",\"HeLLo\"]\n    matchHelloCaseInsensitive(\"Say hello and HELLO\") => [\"hello\",\"HELLO\"]\n    matchHelloCaseInsensitive(\"world\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchHelloCaseInsensitive(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "matchHelloCaseInsensitive",
            "reference_solution": "function matchHelloCaseInsensitive(str) {\n  return str.match(/hello/gi);\n}",
            "testCases": [
              {
                "input": { "str": "hello HELLO HeLLo" },
                "expectedOutput": "[\"hello\",\"HELLO\",\"HeLLo\"]"
              },
              {
                "input": { "str": "Say hello and HELLO" },
                "expectedOutput": "[\"hello\",\"HELLO\"]"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "null"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to match digit sequences.\n  Create a regex to match sequences of one or more digits.\n  Use match() with global flag.\n  Examples:\n    matchDigitSequences(\"abc123def456\") => [\"123\",\"456\"]\n    matchDigitSequences(\"test99x88\") => [\"99\",\"88\"]\n    matchDigitSequences(\"no digits\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchDigitSequences(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "matchDigitSequences",
            "reference_solution": "function matchDigitSequences(str) {\n  return str.match(/\\d+/g);\n}",
            "testCases": [
              {
                "input": { "str": "abc123def456" },
                "expectedOutput": "[\"123\",\"456\"]"
              },
              {
                "input": { "str": "test99x88" },
                "expectedOutput": "[\"99\",\"88\"]"
              },
              {
                "input": { "str": "no digits" },
                "expectedOutput": "null"
              },
              {
                "input": { "str": "42" },
                "expectedOutput": "[\"42\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex with ^ anchor to test string start.\n  Create a regex to test if the string starts with \"he\".\n  Use test() method with ^ anchor.\n  Examples:\n    startsWithHe(\"hello\") => true\n    startsWithHe(\"help\") => true\n    startsWithHe(\"world\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction startsWithHe(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "startsWithHe",
            "reference_solution": "function startsWithHe(str) {\n  return /^he/.test(str);\n}",
            "testCases": [
              {
                "input": { "str": "hello" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "help" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "world" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "the" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex with $ anchor to test string end.\n  Create a regex to test if the string ends with \"ing\".\n  Use test() method with $ anchor.\n  Examples:\n    endsWithIng(\"testing\") => true\n    endsWithIng(\"running\") => true\n    endsWithIng(\"test\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction endsWithIng(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "endsWithIng",
            "reference_solution": "function endsWithIng(str) {\n  return /ing$/.test(str);\n}",
            "testCases": [
              {
                "input": { "str": "testing" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "running" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "singer" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to match words ending with \"at\".\n  Create a regex to match all three-letter words ending with \"at\".\n  Use match() with global flag.\n  Examples:\n    matchWordsEndingWithAt(\"cat bat rat mat\") => [\"cat\",\"bat\",\"rat\",\"mat\"]\n    matchWordsEndingWithAt(\"sat fat\") => [\"sat\",\"fat\"]\n    matchWordsEndingWithAt(\"dog log\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchWordsEndingWithAt(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "matchWordsEndingWithAt",
            "reference_solution": "function matchWordsEndingWithAt(str) {\n  return str.match(/\\b\\wat\\b/g);\n}",
            "testCases": [
              {
                "input": { "str": "cat bat rat mat" },
                "expectedOutput": "[\"cat\",\"bat\",\"rat\",\"mat\"]"
              },
              {
                "input": { "str": "sat fat" },
                "expectedOutput": "[\"sat\",\"fat\"]"
              },
              {
                "input": { "str": "dog log" },
                "expectedOutput": "null"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to normalize spaces.\n  Create a regex to replace multiple consecutive spaces with a single space.\n  Use replace() with regex and global flag.\n  Examples:\n    normalizeSpaces(\"hello   world  test\") => \"hello world test\"\n    normalizeSpaces(\"one    two\") => \"one two\"\n    normalizeSpaces(\"a  b  c\") => \"a b c\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction normalizeSpaces(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "normalizeSpaces",
            "reference_solution": "function normalizeSpaces(str) {\n  return str.replace(/  +/g, ' ');\n}",
            "testCases": [
              {
                "input": { "str": "hello   world  test" },
                "expectedOutput": "hello world test"
              },
              {
                "input": { "str": "one    two" },
                "expectedOutput": "one two"
              },
              {
                "input": { "str": "a  b  c" },
                "expectedOutput": "a b c"
              },
              {
                "input": { "str": "test" },
                "expectedOutput": "test"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to test if string is alphanumeric.\n  Create a regex to test if the string contains only alphanumeric characters.\n  Use test() method.\n  Examples:\n    isAlphanumeric(\"abc123XYZ\") => true\n    isAlphanumeric(\"test123\") => true\n    isAlphanumeric(\"hello world\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isAlphanumeric(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "isAlphanumeric",
            "reference_solution": "function isAlphanumeric(str) {\n  return /^[a-zA-Z0-9]+$/.test(str);\n}",
            "testCases": [
              {
                "input": { "str": "abc123XYZ" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "test123" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "hello world" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "test@123" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to extract phone number.\n  Create a regex to match a phone pattern: 3 digits, hyphen, 4 digits.\n  Use match() method.\n  Examples:\n    extractPhoneNumber(\"My phone is 555-1234\") => \"555-1234\"\n    extractPhoneNumber(\"Call 123-4567 now\") => \"123-4567\"\n    extractPhoneNumber(\"No phone here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractPhoneNumber(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractPhoneNumber",
            "reference_solution": "function extractPhoneNumber(str) {\n  const m = str.match(/\\d{3}-\\d{4}/);\n  return m ? m[0] : null;\n}",
            "testCases": [
              {
                "input": { "str": "My phone is 555-1234" },
                "expectedOutput": "555-1234"
              },
              {
                "input": { "str": "Call 123-4567 now" },
                "expectedOutput": "123-4567"
              },
              {
                "input": { "str": "No phone here" },
                "expectedOutput": "null"
              },
              {
                "input": { "str": "999-0000" },
                "expectedOutput": "999-0000"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to extract price.\n  Create a regex to extract the dollar amount (digits and decimal).\n  Use match() to get the price.\n  Examples:\n    extractPrice(\"Price: $25.99\") => \"25.99\"\n    extractPrice(\"Cost: $100.50\") => \"100.50\"\n    extractPrice(\"$9.99 only\") => \"9.99\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractPrice(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractPrice",
            "reference_solution": "function extractPrice(str) {\n  const m = str.match(/\\d+(?:\\.\\d+)?/);\n  return m ? m[0] : null;\n}",
            "testCases": [
              {
                "input": { "str": "Price: $25.99" },
                "expectedOutput": "25.99"
              },
              {
                "input": { "str": "Cost: $100.50" },
                "expectedOutput": "100.50"
              },
              {
                "input": { "str": "$9.99 only" },
                "expectedOutput": "9.99"
              },
              {
                "input": { "str": "No price" },
                "expectedOutput": "null"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to validate email format.\n  Create a regex to validate basic email format.\n  Pattern: one or more word characters, @, one or more word characters, dot, 2-3 letters.\n  Examples:\n    validateEmail(\"email@example.com\") => true\n    validateEmail(\"test@site.org\") => true\n    validateEmail(\"invalid.email.com\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateEmail(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "validateEmail",
            "reference_solution": "function validateEmail(str) {\n  return /^\\w+@\\w+\\.[a-zA-Z]{2,3}$/.test(str);\n}",
            "testCases": [
              {
                "input": { "str": "email@example.com" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "test@site.org" },
                "expectedOutput": "true"
              },
              {
                "input": { "str": "invalid.email.com" },
                "expectedOutput": "false"
              },
              {
                "input": { "str": "user@domain" },
                "expectedOutput": "false"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to extract code pattern.\n  Create a regex to match the pattern: 3 uppercase letters, hyphen, 3 digits, hyphen, 3 uppercase letters.\n  Use match() method.\n  Examples:\n    extractCode(\"The code is ABC-123-XYZ\") => \"ABC-123-XYZ\"\n    extractCode(\"Code: DEF-456-GHI\") => \"DEF-456-GHI\"\n    extractCode(\"No code here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractCode(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractCode",
            "reference_solution": "function extractCode(str) {\n  const m = str.match(/[A-Z]{3}-\\d{3}-[A-Z]{3}/);\n  return m ? m[0] : null;\n}",
            "testCases": [
              {
                "input": { "str": "The code is ABC-123-XYZ" },
                "expectedOutput": "ABC-123-XYZ"
              },
              {
                "input": { "str": "Code: DEF-456-GHI" },
                "expectedOutput": "DEF-456-GHI"
              },
              {
                "input": { "str": "No code here" },
                "expectedOutput": "null"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses regex to extract URLs.\n  Create a regex to extract URLs that start with http:// or https://.\n  Use match() method.\n  Examples:\n    extractURL(\"Visit https://example.com for more\") => \"https://example.com\"\n    extractURL(\"Go to http://test.org\") => \"http://test.org\"\n    extractURL(\"No URL here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractURL(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractURL",
            "reference_solution": "function extractURL(str) {\n  const m = str.match(/https?:\\/\\/[^\\s]+/);\n  return m ? m[0] : null;\n}",
            "testCases": [
              {
                "input": { "str": "Visit https://example.com for more" },
                "expectedOutput": "https://example.com"
              },
              {
                "input": { "str": "Go to http://test.org" },
                "expectedOutput": "http://test.org"
              },
              {
                "input": { "str": "No URL here" },
                "expectedOutput": "null"
              }
            ]
          }
        ]
      },
      {
        "id": "array-advanced-patterns",
        "title": "Method chaining and nested arrays",
        "outcomes": [
          "Method Chaining: Building Logical Data Pipelines",
          "Code Readability: Formatting and Debugging Chains",
          "Multidimensional Arrays: Creating and Accessing 2D Grids",
          "Nested Iteration: Traversing Rows and Columns",
          "Array Flattening: Working with .flat() and Depth",
          "flatMap(): Combined Transformation and Flattening",
          "Architectural Logic: Choosing the Right Method for the Job"
        ],
        "topic_notes": `## 1. Method Chaining: Building Logical Data Pipelines

- Array methods that return arrays (map, filter, slice, etc.) can be chained: arr.filter(...).map(...). Each step gets the result of the previous one. Build a pipeline from left to right.

\`\`\`javascript
const arr = [1, 2, 3, 4, 5, 6]
const result = arr.filter(n => n % 2 === 0).map(n => n * 2)
console.log(result)
\`\`\`

## 2. Code Readability: Formatting and Debugging Chains

- Put each method call on its own line and indent for readability. To debug, log the array at a step: .map(x => { console.log(x); return x }) or break the chain and assign to variables.

\`\`\`javascript
const result = [1, 2, 3, 4]
  .filter(n => n > 1)
  .map(n => n * 2)
console.log(result)
\`\`\`

## 3. Multidimensional Arrays: Creating and Accessing 2D Grids

- A 2D array is an array of arrays. Access with arr[row][col]. Create with [[a,b],[c,d]] or by building rows and pushing them. Useful for grids, matrices, or tables.

\`\`\`javascript
const grid = [[1, 2], [3, 4], [5, 6]]
console.log(grid[1][0])
\`\`\`

## 4. Nested Iteration: Traversing Rows and Columns

- Use nested loops or nested map/forEach to visit every element. Outer loop over rows, inner over columns (or vice versa). Watch index order: grid[i][j] vs grid[j][i].

\`\`\`javascript
const grid = [[1, 2], [3, 4]]
grid.forEach((row, i) => {
  row.forEach((cell, j) => console.log(i, j, cell))
})
\`\`\`

## 5. Array Flattening: Working with .flat() and Depth

- arr.flat(depth) flattens nested arrays. depth defaults to 1. Use flat(Infinity) to flatten completely. flat() does not mutate the original array.

\`\`\`javascript
const arr = [[1, 2], [3, [4, 5]]]
console.log(arr.flat())
console.log(arr.flat(2))
\`\`\`

## 6. flatMap(): Combined Transformation and Flattening

- arr.flatMap(fn) is equivalent to arr.map(fn).flat(1). Use it when each element maps to zero or more items (e.g. map to an array and flatten). Saves a separate flat() call.

\`\`\`javascript
const arr = ["hello world", "test case"]
console.log(arr.flatMap(s => s.split(" ")))
\`\`\`

## 7. Architectural Logic: Choosing the Right Method for the Job

- Prefer chainable, declarative methods (map, filter, reduce, flatMap) when they fit. Use loops when you need early exit, complex state, or side effects. Combine flat + reduce for summing nested arrays, or map + filter for transform-then-select.

\`\`\`javascript
const nested = [[1, 2], [3, 4]]
const sum = nested.flat().reduce((a, n) => a + n, 0)
console.log(sum)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that chains filter and map.\n  Chain filter and map to: filter even numbers, then double them.\n  Examples:\n    filterAndDouble([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => [4,8,12,16,20]\n    filterAndDouble([5, 10, 15, 20]) => [20,40]\n    filterAndDouble([1, 3, 5]) => []\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterAndDouble(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterAndDouble",
            "reference_solution": "function filterAndDouble(arr) {\n  return arr.filter(n => n % 2 === 0).map(n => n * 2);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                "expectedOutput": "[4,8,12,16,20]"
              },
              {
                "input": { "arr": [5, 10, 15, 20] },
                "expectedOutput": "[20,40]"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": [2, 4] },
                "expectedOutput": "[4,8]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that chains filter and map for strings.\n  Chain filter and map to: filter strings longer than 5 characters, then convert to uppercase.\n  Examples:\n    filterLongAndUppercase([\"apple\", \"banana\", \"cherry\", \"date\"]) => [\"BANANA\",\"CHERRY\"]\n    filterLongAndUppercase([\"hi\", \"hello\", \"hey\"]) => []\n    filterLongAndUppercase([\"JavaScript\", \"is\", \"awesome\"]) => [\"JAVASCRIPT\",\"AWESOME\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterLongAndUppercase(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterLongAndUppercase",
            "reference_solution": "function filterLongAndUppercase(arr) {\n  return arr.filter(s => s.length > 5).map(s => s.toUpperCase());\n}",
            "testCases": [
              {
                "input": { "arr": ["apple", "banana", "cherry", "date"] },
                "expectedOutput": "[\"BANANA\",\"CHERRY\"]"
              },
              {
                "input": { "arr": ["hi", "hello", "hey"] },
                "expectedOutput": "[]"
              },
              {
                "input": { "arr": ["JavaScript", "is", "awesome"] },
                "expectedOutput": "[\"JAVASCRIPT\",\"AWESOME\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that chains map, filter, and reduce.\n  Chain map, filter, and reduce to: double each, filter even results, then sum them.\n  Examples:\n    mapFilterReduce([1, 2, 3, 4, 5]) => 30\n    mapFilterReduce([2, 4, 6]) => 24\n    mapFilterReduce([1, 3, 5]) => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction mapFilterReduce(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "mapFilterReduce",
            "reference_solution": "function mapFilterReduce(arr) {\n  return arr.map(n => n * 2).filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5] },
                "expectedOutput": "30"
              },
              {
                "input": { "arr": [2, 4, 6] },
                "expectedOutput": "24"
              },
              {
                "input": { "arr": [1, 3, 5] },
                "expectedOutput": "0"
              },
              {
                "input": { "arr": [10] },
                "expectedOutput": "20"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that accesses 2D array element.\n  Access the element at the specified row and column.\n  Examples:\n    access2DElement([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 2) => 6\n    access2DElement([[10, 20], [30, 40]], 0, 1) => 20\n    access2DElement([[5, 10, 15], [20, 25, 30]], 1, 0) => 20\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction access2DElement(arr, row, col) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "access2DElement",
            "reference_solution": "function access2DElement(arr, row, col) {\n  return arr[row][col];\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2, 3], [4, 5, 6], [7, 8, 9]], "row": 1, "col": 2 },
                "expectedOutput": "6"
              },
              {
                "input": { "arr": [[10, 20], [30, 40]], "row": 0, "col": 1 },
                "expectedOutput": "20"
              },
              {
                "input": { "arr": [[5, 10, 15], [20, 25, 30]], "row": 1, "col": 0 },
                "expectedOutput": "20"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that sums all elements in a 2D array.\n  Calculate the sum of all elements across all rows.\n  Examples:\n    sum2DArray([[1, 2], [3, 4], [5, 6]]) => 21\n    sum2DArray([[10, 20], [30, 40]]) => 100\n    sum2DArray([[5], [10], [15]]) => 30\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sum2DArray(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sum2DArray",
            "reference_solution": "function sum2DArray(arr) {\n  return arr.flat().reduce((sum, n) => sum + n, 0);\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2], [3, 4], [5, 6]] },
                "expectedOutput": "21"
              },
              {
                "input": { "arr": [[10, 20], [30, 40]] },
                "expectedOutput": "100"
              },
              {
                "input": { "arr": [[5], [10], [15]] },
                "expectedOutput": "30"
              },
              {
                "input": { "arr": [[1, 1, 1], [2, 2, 2]] },
                "expectedOutput": "9"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that extracts the first column from 2D array.\n  Extract the first column (all elements at index 0 of each row).\n  Examples:\n    extractFirstColumn([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) => [1,4,7]\n    extractFirstColumn([[10, 20], [30, 40], [50, 60]]) => [10,30,50]\n    extractFirstColumn([[5, 10, 15], [20, 25, 30]]) => [5,20]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractFirstColumn(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractFirstColumn",
            "reference_solution": "function extractFirstColumn(arr) {\n  return arr.map(row => row[0]);\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
                "expectedOutput": "[1,4,7]"
              },
              {
                "input": { "arr": [[10, 20], [30, 40], [50, 60]] },
                "expectedOutput": "[10,30,50]"
              },
              {
                "input": { "arr": [[5, 10, 15], [20, 25, 30]] },
                "expectedOutput": "[5,20]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses flat() to flatten array one level.\n  Use flat() to flatten it one level deep.\n  Examples:\n    flattenOneLevel([[1, 2], [3, [4, 5]], [6, 7]]) => [1,2,3,[4,5],6,7]\n    flattenOneLevel([[10], [20, [30]], [40]]) => [10,20,[30],40]\n    flattenOneLevel([[1, 2, 3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenOneLevel(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "flattenOneLevel",
            "reference_solution": "function flattenOneLevel(arr) {\n  return arr.flat();\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2], [3, [4, 5]], [6, 7]] },
                "expectedOutput": "[1,2,3,[4,5],6,7]"
              },
              {
                "input": { "arr": [[10], [20, [30]], [40]] },
                "expectedOutput": "[10,20,[30],40]"
              },
              {
                "input": { "arr": [[1, 2, 3]] },
                "expectedOutput": "[1,2,3]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses flat() with Infinity to completely flatten.\n  Use flat() with Infinity to completely flatten it.\n  Examples:\n    flattenCompletely([[1, [2, [3, [4]]]]]) => [1,2,3,4]\n    flattenCompletely([[5, [10, [15]]]]) => [5,10,15]\n    flattenCompletely([[1], [2], [3]]) => [1,2,3]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction flattenCompletely(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "flattenCompletely",
            "reference_solution": "function flattenCompletely(arr) {\n  return arr.flat(Infinity);\n}",
            "testCases": [
              {
                "input": { "arr": [[1, [2, [3, [4]]]]] },
                "expectedOutput": "[1,2,3,4]"
              },
              {
                "input": { "arr": [[5, [10, [15]]]] },
                "expectedOutput": "[5,10,15]"
              },
              {
                "input": { "arr": [[1], [2], [3]] },
                "expectedOutput": "[1,2,3]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses flatMap() to split strings into words.\n  Use flatMap() to split each string into words and flatten the result.\n  Examples:\n    splitAndFlatten([\"hello world\", \"test case\"]) => [\"hello\",\"world\",\"test\",\"case\"]\n    splitAndFlatten([\"one two\", \"three\"]) => [\"one\",\"two\",\"three\"]\n    splitAndFlatten([\"JavaScript\"]) => [\"JavaScript\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitAndFlatten(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "splitAndFlatten",
            "reference_solution": "function splitAndFlatten(arr) {\n  return arr.flatMap(s => s.split(' '));\n}",
            "testCases": [
              {
                "input": { "arr": ["hello world", "test case"] },
                "expectedOutput": "[\"hello\",\"world\",\"test\",\"case\"]"
              },
              {
                "input": { "arr": ["one two", "three"] },
                "expectedOutput": "[\"one\",\"two\",\"three\"]"
              },
              {
                "input": { "arr": ["JavaScript"] },
                "expectedOutput": "[\"JavaScript\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses flatMap() to duplicate numbers.\n  Use flatMap() to create an array where each number appears twice.\n  Examples:\n    duplicateNumbers([1, 2, 3]) => [1,1,2,2,3,3]\n    duplicateNumbers([5, 10]) => [5,5,10,10]\n    duplicateNumbers([7]) => [7,7]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction duplicateNumbers(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "duplicateNumbers",
            "reference_solution": "function duplicateNumbers(arr) {\n  return arr.flatMap(n => [n, n]);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "[1,1,2,2,3,3]"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "[5,5,10,10]"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "[7,7]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that uses flatMap() to extract all scores.\n  Use flatMap() to extract all scores into a single array.\n  Examples:\n    extractAllScores([{name: \"Alice\", scores: [85, 90]}, {name: \"Bob\", scores: [75, 80]}]) => [85,90,75,80]\n    extractAllScores([{name: \"Charlie\", scores: [95]}, {name: \"Diana\", scores: [88, 92]}]) => [95,88,92]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractAllScores(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "extractAllScores",
            "reference_solution": "function extractAllScores(arr) {\n  return arr.flatMap(obj => obj.scores);\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "scores": [85, 90] }, { "name": "Bob", "scores": [75, 80] }] },
                "expectedOutput": "[85,90,75,80]"
              },
              {
                "input": { "arr": [{ "name": "Charlie", "scores": [95] }, { "name": "Diana", "scores": [88, 92] }] },
                "expectedOutput": "[95,88,92]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that chains filter and map for adult names.\n  Chain filter and map to: filter adults (age >= 18), then extract just names.\n  Examples:\n    getAdultNames([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => [\"Alice\",\"Charlie\"]\n    getAdultNames([{name: \"Diana\", age: 16}, {name: \"Eve\", age: 20}]) => [\"Eve\"]\n    getAdultNames([{name: \"Frank\", age: 18}]) => [\"Frank\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction getAdultNames(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "getAdultNames",
            "reference_solution": "function getAdultNames(arr) {\n  return arr.filter(p => p.age >= 18).map(p => p.name);\n}",
            "testCases": [
              {
                "input": { "arr": [{ "name": "Alice", "age": 25 }, { "name": "Bob", "age": 17 }, { "name": "Charlie", "age": 30 }] },
                "expectedOutput": "[\"Alice\",\"Charlie\"]"
              },
              {
                "input": { "arr": [{ "name": "Diana", "age": 16 }, { "name": "Eve", "age": 20 }] },
                "expectedOutput": "[\"Eve\"]"
              },
              {
                "input": { "arr": [{ "name": "Frank", "age": 18 }] },
                "expectedOutput": "[\"Frank\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that calculates sum of each row.\n  Create a new array containing the sum of each row.\n  Examples:\n    sumEachRow([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) => [6,15,24]\n    sumEachRow([[10, 20], [30, 40]]) => [30,70]\n    sumEachRow([[5], [10], [15]]) => [5,10,15]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sumEachRow(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "sumEachRow",
            "reference_solution": "function sumEachRow(arr) {\n  return arr.map(row => row.reduce((a, b) => a + b, 0));\n}",
            "testCases": [
              {
                "input": { "arr": [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
                "expectedOutput": "[6,15,24]"
              },
              {
                "input": { "arr": [[10, 20], [30, 40]] },
                "expectedOutput": "[30,70]"
              },
              {
                "input": { "arr": [[5], [10], [15]] },
                "expectedOutput": "[5,10,15]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that chains filter, map, and reduce.\n  Chain methods to: filter numbers > 2, square them, then calculate the sum.\n  Examples:\n    filterSquareSum([1, 2, 3, 4, 5, 6]) => 86\n    filterSquareSum([1, 2, 3]) => 9\n    filterSquareSum([5, 10]) => 125\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterSquareSum(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterSquareSum",
            "reference_solution": "function filterSquareSum(arr) {\n  return arr.filter(n => n > 2).map(n => n * n).reduce((a, b) => a + b, 0);\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3, 4, 5, 6] },
                "expectedOutput": "86"
              },
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "9"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "125"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that chains filter, map, and join.\n  Chain methods to: filter strings with length > 3, convert to uppercase, then join with comma.\n  Examples:\n    filterUppercaseJoin([\"hi\", \"hello\", \"hey\", \"greetings\"]) => \"HELLO,GREETINGS\"\n    filterUppercaseJoin([\"test\", \"code\", \"js\"]) => \"TEST,CODE\"\n    filterUppercaseJoin([\"a\", \"b\"]) => \"\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction filterUppercaseJoin(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "filterUppercaseJoin",
            "reference_solution": "function filterUppercaseJoin(arr) {\n  return arr.filter(s => s.length > 3).map(s => s.toUpperCase()).join(',');\n}",
            "testCases": [
              {
                "input": { "arr": ["hi", "hello", "hey", "greetings"] },
                "expectedOutput": "HELLO,GREETINGS"
              },
              {
                "input": { "arr": ["test", "code", "js"] },
                "expectedOutput": "TEST,CODE"
              },
              {
                "input": { "arr": ["a", "ab", "abc"] },
                "expectedOutput": ""
              }
            ]
          }
        ]
      },
      {
        "id": "error-handling",
        "title": "Error handling with try-catch",
        "outcomes": [
          "Error Types: Identifying Reference, Syntax, and Type Errors",
          "Error Objects: Accessing .name and .message Properties",
          "try...catch Syntax: Creating a Safety Net for Logic",
          "The finally Block: Executing Cleanup regardless of outcome",
          "The throw Statement: Manually Triggering Logic Failures",
          "Custom Messaging: Providing Context for Debugging",
          "Error Propagation: Understanding how errors \"bubble up\"",
          "Strategic Usage: When to catch vs. when to let it fail"
        ],
        "topic_notes": `## 1. Error Types: Identifying Reference, Syntax, and Type Errors

- ReferenceError: variable or property is not defined. SyntaxError: invalid code (e.g. invalid JSON). TypeError: wrong type (e.g. calling something that is not a function). Each has a name and message you can use to handle or log.

\`\`\`javascript
try {
  JSON.parse("{ invalid }")
} catch (e) {
  console.log(e.name, e.message)
}
\`\`\`

## 2. Error Objects: Accessing .name and .message Properties

- Caught values are Error-like objects. e.name is the error type (e.g. "TypeError"). e.message is a human-readable description. Use them to decide how to handle or to show feedback to the user.

\`\`\`javascript
try {
  null.foo
} catch (e) {
  console.log(e.name, e.message)
}
\`\`\`

## 3. try...catch Syntax: Creating a Safety Net for Logic

- Wrap code that might throw in try { }. If it throws, execution jumps to catch (e) { } and e is the thrown value. Code after the try-catch runs normally. Use it to avoid crashes and to handle expected failures (e.g. parse errors).

\`\`\`javascript
try {
  const n = JSON.parse("not json")
} catch (e) {
  console.log("Parse failed:", e.message)
}
\`\`\`

## 4. The finally Block: Executing Cleanup regardless of outcome

- try { } catch (e) { } finally { } runs finally after try (and catch if there was an error). Use finally for cleanup that must run whether or not an error occurred (e.g. closing a resource, clearing a flag).

\`\`\`javascript
try {
  riskyOperation()
} catch (e) {
  console.log(e.message)
} finally {
  cleanup()
}
\`\`\`

## 5. The throw Statement: Manually Triggering Logic Failures

- throw value; throws an exception. Typically throw new Error('message'). The thrown value can be any type; catch receives it. Use throw for validation failures or invalid state that callers should handle.

\`\`\`javascript
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero")
  return a / b
}
\`\`\`

## 6. Custom Messaging: Providing Context for Debugging

- Prefer throw new Error('clear message') so logs and tools show what went wrong. Include relevant context (e.g. the invalid input or step) in the message. Custom error classes can extend Error for richer handling.

\`\`\`javascript
if (!input) throw new Error("Input is required")
if (input < 0) throw new Error("Input must be non-negative, got: " + input)
\`\`\`

## 7. Error Propagation: Understanding how errors bubble up

- If code in try throws and is not caught, or throw is inside a function called from try, the error propagates up until a catch handles it or the script fails. Catching at a higher level lets you handle many lower-level failures in one place.

\`\`\`javascript
function a() { b() }
function b() { throw new Error("from b") }
try { a() } catch (e) { console.log(e.message) }
\`\`\`

## 8. Strategic Usage: When to catch vs. when to let it fail

- Catch when you can recover, show a user message, or log and continue. Let errors propagate when the caller (or a global handler) should decide. Avoid empty catch blocks; at least log the error. Use try-catch around specific risky calls, not whole programs.

\`\`\`javascript
function safeParseJSON(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that demonstrates try-catch with undefined variable.\n  Create a try-catch block that attempts to access an undefined variable.\n  In the catch block, return the error message.\n  Examples:\n    catchUndefinedVariable() => \"undefinedVariable is not defined\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchUndefinedVariable() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "catchUndefinedVariable",
            "reference_solution": "function catchUndefinedVariable() {\n  try { return undefinedVariable; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "undefinedVariable is not defined"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates try-catch with JSON parsing.\n  Create a try-catch block that attempts to parse invalid JSON.\n  In the catch block, return the error name.\n  Examples:\n    catchJSONError(\"{broken json}\") => \"SyntaxError\"\n    catchJSONError(\"{invalid}\") => \"SyntaxError\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchJSONError(jsonString) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "catchJSONError",
            "reference_solution": "function catchJSONError(jsonString) {\n  try { JSON.parse(jsonString); } catch (e) { return e.name; }\n}",
            "testCases": [
              {
                "input": { "jsonString": "{broken json}" },
                "expectedOutput": "SyntaxError"
              },
              {
                "input": { "jsonString": "{invalid}" },
                "expectedOutput": "SyntaxError"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates try-catch-finally.\n  Create a try-catch-finally block.\n  In try: collect \"Trying\", in catch: collect \"Error occurred\", in finally: collect \"Cleanup\".\n  Test with code that throws an error and return the collected messages joined by newlines.\n  Examples:\n    tryCatchFinally() => \"Trying\\nError occurred\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction tryCatchFinally() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "tryCatchFinally",
            "reference_solution": "function tryCatchFinally() {\n  const parts = [];\n  try { parts.push('Trying'); throw new Error(); } catch (e) { parts.push('Error occurred'); } finally { parts.push('Cleanup'); }\n  return parts.join('\\n');\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Trying\nError occurred\nCleanup"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that throws custom error for negative numbers.\n  Create a function that throws a custom error if a number is negative.\n  Use throw new Error() with message \"Number must be positive\".\n  Wrap the function call in try-catch and return the error message.\n  Examples:\n    validatePositiveNumber(-5) => \"Number must be positive\"\n    validatePositiveNumber(-10) => \"Number must be positive\"\n    validatePositiveNumber(-1) => \"Number must be positive\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validatePositiveNumber(num) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "validatePositiveNumber",
            "reference_solution": "function validatePositiveNumber(num) {\n  try { if (num < 0) throw new Error('Number must be positive'); return num; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "num": -5 },
                "expectedOutput": "Number must be positive"
              },
              {
                "input": { "num": -10 },
                "expectedOutput": "Number must be positive"
              },
              {
                "input": { "num": -1 },
                "expectedOutput": "Number must be positive"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that safely divides numbers.\n  Create a function that takes two parameters: a and b.\n  Throw an error if b is 0 with message \"Cannot divide by zero\".\n  Otherwise return a / b. Wrap the call in try-catch and return error message if caught.\n  Examples:\n    safeDivide(10, 0) => \"Cannot divide by zero\"\n    safeDivide(20, 0) => \"Cannot divide by zero\"\n    safeDivide(5, 0) => \"Cannot divide by zero\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction safeDivide(a, b) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "safeDivide",
            "reference_solution": "function safeDivide(a, b) {\n  try { if (b === 0) throw new Error('Cannot divide by zero'); return a / b; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "a": 10, "b": 0 },
                "expectedOutput": "Cannot divide by zero"
              },
              {
                "input": { "a": 20, "b": 0 },
                "expectedOutput": "Cannot divide by zero"
              },
              {
                "input": { "a": 5, "b": 0 },
                "expectedOutput": "Cannot divide by zero"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates try-catch with non-existent function.\n  Create a try-catch block that attempts to call a non-existent function.\n  In the catch block, return both error name and message separated by \": \".\n  Examples:\n    catchFunctionError() => \"ReferenceError: nonExistentFunction is not defined\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction catchFunctionError() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "catchFunctionError",
            "reference_solution": "function catchFunctionError() {\n  try { nonExistentFunction(); } catch (e) { return e.name + ': ' + e.message; }\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "ReferenceError: nonExistentFunction is not defined"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that validates age with multiple error conditions.\n  Throw an error if age is less than 0 with message \"Age cannot be negative\".\n  Throw an error if age is greater than 150 with message \"Age is unrealistic\".\n  Otherwise return \"Valid age\". Wrap in try-catch and return error message if caught.\n  Examples:\n    validateAge(-5) => \"Age cannot be negative\"\n    validateAge(200) => \"Age is unrealistic\"\n    validateAge(-1) => \"Age cannot be negative\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateAge(age) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "validateAge",
            "reference_solution": "function validateAge(age) {\n  try { if (age < 0) throw new Error('Age cannot be negative'); if (age > 150) throw new Error('Age is unrealistic'); return 'Valid age'; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "age": -5 },
                "expectedOutput": "Age cannot be negative"
              },
              {
                "input": { "age": 200 },
                "expectedOutput": "Age is unrealistic"
              },
              {
                "input": { "age": -1 },
                "expectedOutput": "Age cannot be negative"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates try-catch-finally with successful parsing.\n  In try: attempt to parse valid JSON and collect \"Parsing successful\".\n  In finally: collect \"Done\".\n  Return the collected messages joined by newlines.\n  Examples:\n    parseJSONSuccessfully(\"{\\\"name\\\":\\\"Alice\\\"}\") => \"Parsing successful\\nDone\"\n    parseJSONSuccessfully(\"{\\\"age\\\":25}\") => \"Parsing successful\\nDone\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction parseJSONSuccessfully(jsonString) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "parseJSONSuccessfully",
            "reference_solution": "function parseJSONSuccessfully(jsonString) {\n  const parts = [];\n  try { JSON.parse(jsonString); parts.push('Parsing successful'); } finally { parts.push('Done'); }\n  return parts.join('\\n');\n}",
            "testCases": [
              {
                "input": { "jsonString": "{\"name\":\"Alice\"}" },
                "expectedOutput": "Parsing successful\nDone"
              },
              {
                "input": { "jsonString": "{\"age\":25}" },
                "expectedOutput": "Parsing successful\nDone"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that validates non-empty strings.\n  Throw an error if the string is empty with message \"String cannot be empty\".\n  Otherwise return the string length. Wrap in try-catch and return error message if caught.\n  Examples:\n    validateNonEmptyString(\"\") => \"String cannot be empty\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateNonEmptyString(str) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "validateNonEmptyString",
            "reference_solution": "function validateNonEmptyString(str) {\n  try { if (str === '') throw new Error('String cannot be empty'); return str.length; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "str": "" },
                "expectedOutput": "String cannot be empty"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that safely accesses array elements.\n  Throw an error if index is negative with message \"Index cannot be negative\".\n  Throw an error if index >= array length with message \"Index out of bounds\".\n  Otherwise return the element. Wrap in try-catch and return error message if caught.\n  Examples:\n    safeArrayAccess([1,2,3], 5) => \"Index out of bounds\"\n    safeArrayAccess([10,20], -1) => \"Index cannot be negative\"\n    safeArrayAccess([5], 10) => \"Index out of bounds\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction safeArrayAccess(arr, index) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "safeArrayAccess",
            "reference_solution": "function safeArrayAccess(arr, index) {\n  try { if (index < 0) throw new Error('Index cannot be negative'); if (index >= arr.length) throw new Error('Index out of bounds'); return arr[index]; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3], "index": 5 },
                "expectedOutput": "Index out of bounds"
              },
              {
                "input": { "arr": [10, 20], "index": -1 },
                "expectedOutput": "Index cannot be negative"
              },
              {
                "input": { "arr": [5], "index": 10 },
                "expectedOutput": "Index out of bounds"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates nested try-catch blocks.\n  Outer try: contains inner try-catch.\n  Inner try: throw error with message \"Inner error\".\n  Inner catch: collect the error message and re-throw the error.\n  Outer catch: collect \"Caught in outer: \" + error message.\n  Return collected messages joined by newlines.\n  Examples:\n    nestedTryCatch() => \"Inner error\\nCaught in outer: Inner error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction nestedTryCatch() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "nestedTryCatch",
            "reference_solution": "function nestedTryCatch() {\n  const parts = [];\n  try { try { throw new Error('Inner error'); } catch (e) { parts.push(e.message); throw e; } } catch (e) { parts.push('Caught in outer: ' + e.message); }\n  return parts.join('\\n');\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Inner error\nCaught in outer: Inner error"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that validates email format.\n  Throw an error if email doesn't contain \"@\" with message \"Invalid email: missing @\".\n  Throw an error if email doesn't contain \".\" with message \"Invalid email: missing domain\".\n  Otherwise return \"Valid email\". Wrap in try-catch and return error message if caught.\n  Examples:\n    validateEmailFormat(\"invalidemail.com\") => \"Invalid email: missing @\"\n    validateEmailFormat(\"test@invalid\") => \"Invalid email: missing domain\"\n    validateEmailFormat(\"notemail\") => \"Invalid email: missing @\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateEmailFormat(email) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "validateEmailFormat",
            "reference_solution": "function validateEmailFormat(email) {\n  try { if (!email.includes('@')) throw new Error('Invalid email: missing @'); if (!email.includes('.')) throw new Error('Invalid email: missing domain'); return 'Valid email'; } catch (e) { return e.message; }\n}",
            "testCases": [
              {
                "input": { "email": "invalidemail.com" },
                "expectedOutput": "Invalid email: missing @"
              },
              {
                "input": { "email": "test@invalid" },
                "expectedOutput": "Invalid email: missing domain"
              },
              {
                "input": { "email": "notemail" },
                "expectedOutput": "Invalid email: missing @"
              }
            ]
          }
        ]
      },
      {
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
        "topic_notes": `## 1. Classes as Blueprints: Defining the Template

- A class is a template for creating objects with the same shape and behavior. Declare it with class Name { }. Use new Name() to create instances. Classes group data (properties) and behavior (methods) together.

\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
const p = new Person("Alice", 25)
\`\`\`

## 2. The constructor Method: Initializing Instance State

- constructor(...args) runs when you call new ClassName(...). Use it to assign properties (e.g. this.x = x). You can only have one constructor per class. It initializes the instance state.

\`\`\`javascript
class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
}
\`\`\`

## 3. this in Classes: Referencing the Current Instance

- Inside a class, this refers to the instance being created (in constructor) or the instance the method was called on (in methods). Use this.property and this.method() to access instance data and other methods.

\`\`\`javascript
class Counter {
  constructor() { this.count = 0 }
  increment() { this.count++ }
  getValue() { return this.count }
}
\`\`\`

## 4. Methods: Defining Shared Behavior

- Methods are functions defined on the class. They are shared by all instances. Call them as instance.method(). They can use this to read and update instance state.

\`\`\`javascript
class Circle {
  constructor(radius) { this.radius = radius }
  getArea() { return Math.PI * this.radius ** 2 }
}
\`\`\`

## 5. Static Members: Properties and Methods belonging to the Blueprint

- static property or static method() belong to the class itself, not instances. Access as ClassName.staticMember. Use for constants (e.g. PI) or utilities that do not need instance data.

\`\`\`javascript
class MathUtils {
  static PI = 3.14159
  static double(x) { return x * 2 }
}
console.log(MathUtils.PI)
\`\`\`

## 6. Encapsulation: Using Getters and Setters for Data Control

- get name() { return this._name } and set name(v) { this._name = v } define property access. Getters and setters let you control or validate values when reading or writing. Use a backing property (e.g. _value) if needed.

\`\`\`javascript
class Temp {
  constructor(c) { this._c = c }
  get fahrenheit() { return (this._c * 9/5) + 32 }
  set fahrenheit(f) { this._c = (f - 32) * 5/9 }
}
\`\`\`

## 7. Inheritance: Extending Logic with extends and super

- class Child extends Parent makes Child inherit Parent's methods and can add or override. super(...) calls the parent constructor; super.method() calls the parent's method. Use extends for "is-a" relationships.

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name }
  speak() { return this.name + " makes a sound" }
}
class Dog extends Animal {
  constructor(name) { super(name) }
  speak() { return this.name + " barks" }
}
\`\`\`

## 8. Polymorphism: Overriding Methods for Specialized Logic

- A subclass can override a parent method by defining a method with the same name. When called on a subclass instance, the overridden version runs. Enables specialized behavior while keeping a common interface.

\`\`\`javascript
class Shape {
  area() { return 0 }
}
class Square extends Shape {
  constructor(side) { super(); this.side = side }
  area() { return this.side * this.side }
}
\`\`\`

## 9. Type Checking: Identifying Instances with instanceof

- value instanceof ClassName returns true if value is an instance of that class (or a subclass). Use it to check type before using class-specific methods or to branch logic by type.

\`\`\`javascript
const d = new Dog("Rex")
console.log(d instanceof Dog)
console.log(d instanceof Animal)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that creates a Person class and returns introduction.\n  Create a class named Person with a constructor that takes name and age.\n  Add a method introduce() that returns \"Hi, I'm {name} and I'm {age} years old\".\n  Create an instance and call introduce().\n  Examples:\n    createPersonAndIntroduce(\"Alice\", 25) => \"Hi, I'm Alice and I'm 25 years old\"\n    createPersonAndIntroduce(\"Bob\", 30) => \"Hi, I'm Bob and I'm 30 years old\"\n    createPersonAndIntroduce(\"Charlie\", 22) => \"Hi, I'm Charlie and I'm 22 years old\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createPersonAndIntroduce(name, age) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "createPersonAndIntroduce",
            "reference_solution": "function createPersonAndIntroduce(name, age) {\n  class Person { constructor(n, a) { this.name = n; this.age = a; }\n    introduce() { return \"Hi, I'm \" + this.name + \" and I'm \" + this.age + \" years old\"; } }\n  return new Person(name, age).introduce();\n}",
            "testCases": [
              {
                "input": { "name": "Alice", "age": 25 },
                "expectedOutput": "Hi, I'm Alice and I'm 25 years old"
              },
              {
                "input": { "name": "Bob", "age": 30 },
                "expectedOutput": "Hi, I'm Bob and I'm 30 years old"
              },
              {
                "input": { "name": "Charlie", "age": 22 },
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
                "input": { "width": 5, "height": 10, "method": "getArea" },
                "expectedOutput": "50"
              },
              {
                "input": { "width": 5, "height": 10, "method": "getPerimeter" },
                "expectedOutput": "30"
              },
              {
                "input": { "width": 7, "height": 3, "method": "getArea" },
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
                "input": { "operations": ["increment", "increment", "getValue"] },
                "expectedOutput": "2"
              },
              {
                "input": { "operations": ["increment", "decrement", "getValue"] },
                "expectedOutput": "0"
              },
              {
                "input": { "operations": ["increment", "increment", "increment", "getValue"] },
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
                "input": { "accountHolder": "Alice", "initialBalance": 100, "operations": [{ "type": "deposit", "amount": 50 }] },
                "expectedOutput": "150"
              },
              {
                "input": { "accountHolder": "Bob", "initialBalance": 200, "operations": [{ "type": "withdraw", "amount": 50 }] },
                "expectedOutput": "150"
              },
              {
                "input": { "accountHolder": "Charlie", "initialBalance": 500, "operations": [{ "type": "deposit", "amount": 100 }, { "type": "withdraw", "amount": 50 }] },
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
                "input": { "radius": 5, "method": "getArea" },
                "expectedOutput": "78.53975"
              },
              {
                "input": { "radius": 5, "method": "getCircumference" },
                "expectedOutput": "31.4159"
              },
              {
                "input": { "radius": 10, "method": "getArea" },
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
                "input": { "value": 0, "operation": "get" },
                "expectedOutput": "32"
              },
              {
                "input": { "value": 100, "operation": "get" },
                "expectedOutput": "212"
              },
              {
                "input": { "value": 32, "operation": "set" },
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
                "input": { "name": "Rex" },
                "expectedOutput": "Rex barks"
              },
              {
                "input": { "name": "Buddy" },
                "expectedOutput": "Buddy barks"
              },
              {
                "input": { "name": "Max" },
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
                "input": { "brand": "Toyota", "model": "Camry" },
                "expectedOutput": "Brand: Toyota, Model: Camry"
              },
              {
                "input": { "brand": "Honda", "model": "Civic" },
                "expectedOutput": "Brand: Honda, Model: Civic"
              },
              {
                "input": { "brand": "Ford", "model": "Mustang" },
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
                "input": { "type": "Square", "value": 4 },
                "expectedOutput": "16"
              },
              {
                "input": { "type": "Circle", "value": 5 },
                "expectedOutput": "78.53975"
              },
              {
                "input": { "type": "Square", "value": 10 },
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
                "input": { "name": "Alice", "checkClass": "Student" },
                "expectedOutput": "true"
              },
              {
                "input": { "name": "Bob", "checkClass": "Person" },
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
                "input": { "method": "add", "a": 5, "b": 3 },
                "expectedOutput": "8"
              },
              {
                "input": { "method": "multiply", "a": 5, "b": 3 },
                "expectedOutput": "15"
              },
              {
                "input": { "method": "add", "a": 10, "b": 20 },
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
                "input": { "username": "alice", "password": "secret123" },
                "expectedOutput": "*****"
              },
              {
                "input": { "username": "bob", "password": "pass456" },
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
                  "book1": { "title": "1984", "author": "Orwell", "pages": 328 },
                  "book2": { "title": "Dune", "author": "Herbert", "pages": 412 }
                },
                "expectedOutput": "Dune"
              },
              {
                "input": {
                  "book1": { "title": "Hobbit", "author": "Tolkien", "pages": 500 },
                  "book2": { "title": "Harry Potter", "author": "Rowling", "pages": 300 }
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
                "input": { "name": "Alice", "salary": 80000, "department": "IT" },
                "expectedOutput": "Alice, Salary: 80000, Department: IT"
              },
              {
                "input": { "name": "Bob", "salary": 90000, "department": "HR" },
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
                "input": { "name": "Laptop", "price": 1000, "discount": 10 },
                "expectedOutput": "$900"
              },
              {
                "input": { "name": "Phone", "price": 500, "discount": 20 },
                "expectedOutput": "$400"
              },
              {
                "input": { "name": "Tablet", "price": 300, "discount": 15 },
                "expectedOutput": "$255"
              }
            ]
          }
        ]
      },
      {
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
        "topic_notes": `## 1. Module Fundamentals: Encapsulation and Code Separation

- A module is a file that exports values (functions, classes, constants) for other files to use. Top-level variables in a module are not global; they are module-scoped. This keeps code organized and avoids naming collisions.

\`\`\`javascript
// utils.js
function greet(name) { return "Hello, " + name + "!" }
export { greet }
\`\`\`

## 2. Named Exports: Sharing Multiple Values per File

- export const x = 1; export function f() {} or export { x, f } at the end. A file can have many named exports. Import with import { x, f } from './file'. Names must match.

\`\`\`javascript
// math.js
export function add(a, b) { return a + b }
export function subtract(a, b) { return a - b }
\`\`\`

## 3. Default Exports: Defining the Primary Module Export

- export default value; a module can have only one default export. Use for the main thing the module provides (e.g. a single class or function). Import with import Name from './file' (any name).

\`\`\`javascript
// Calculator.js
export default class Calculator { add(a, b) { return a + b } }
\`\`\`

## 4. Import Logic: Named vs. Default Syntax

- Named: import { a, b } from './m'. Default: import C from './m'. Mixed: import C, { a, b } from './m'. The path is relative to the current file. Omit the extension in many bundlers.

\`\`\`javascript
import { add, subtract } from './math'
import Calculator from './Calculator'
\`\`\`

## 5. Alias Management: Renaming Imports to avoid Conflicts

- import { foo as myFoo } from './m' imports foo under the name myFoo. Use when two modules export the same name or when you want a clearer local name.

\`\`\`javascript
import { add as sum } from './math'
import { PI as pi } from './constants'
\`\`\`

## 6. Namespace Imports: Importing Everything as a Single Object (* as)

- import * as utils from './m' puts all named exports of m into the object utils. Access as utils.foo, utils.bar. Useful when you want one namespace or many names from one module.

\`\`\`javascript
import * as math from './math'
math.add(1, 2)
math.subtract(5, 3)
\`\`\`

## 7. Module Scope: Why variables stay private by default

- Top-level declarations in a module are not added to the global object. They are visible only inside that module unless exported. So you can use variables and functions internally without exposing them.

\`\`\`javascript
const secret = 42
export function getSecret() { return secret }
\`\`\`

## 8. Modern Patterns: Dynamic Imports for Performance

- import('./module') returns a Promise that resolves to the module object. Use it to load code only when needed (e.g. on route change or button click). Enables code-splitting and smaller initial bundles.

\`\`\`javascript
async function loadHelper() {
  const mod = await import('./heavyHelper')
  return mod.helper()
}
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that simulates module export and import.\n  Create a function named greet that takes a name parameter and returns \"Hello, {name}!\".\n  Simulate the module export/import pattern.\n  Examples:\n    simulateModuleGreet(\"Alice\") => \"Hello, Alice!\"\n    simulateModuleGreet(\"Bob\") => \"Hello, Bob!\"\n    simulateModuleGreet(\"Charlie\") => \"Hello, Charlie!\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateModuleGreet(name) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateModuleGreet",
            "reference_solution": "function simulateModuleGreet(name) {\n  return 'Hello, ' + name + '!';\n}",
            "testCases": [
              {
                "input": { "name": "Alice" },
                "expectedOutput": "Hello, Alice!"
              },
              {
                "input": { "name": "Bob" },
                "expectedOutput": "Hello, Bob!"
              },
              {
                "input": { "name": "Charlie" },
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
                "input": { "functionName": "add", "a": 10, "b": 5 },
                "expectedOutput": "15"
              },
              {
                "input": { "functionName": "subtract", "a": 10, "b": 5 },
                "expectedOutput": "5"
              },
              {
                "input": { "functionName": "add", "a": 20, "b": 30 },
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
                "input": { "a": 6, "b": 7 },
                "expectedOutput": "42"
              },
              {
                "input": { "a": 5, "b": 5 },
                "expectedOutput": "25"
              },
              {
                "input": { "a": 10, "b": 3 },
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
                "input": { "radius": 5 },
                "expectedOutput": "78.53975"
              },
              {
                "input": { "radius": 10 },
                "expectedOutput": "314.159"
              },
              {
                "input": { "radius": 2 },
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
                "input": { "constant": "E" },
                "expectedOutput": "2.71828"
              },
              {
                "input": { "constant": "PHI" },
                "expectedOutput": "1.61803"
              },
              {
                "input": { "constant": "SQRT2" },
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
                "input": { "method": "add", "a": 8, "b": 2 },
                "expectedOutput": "10"
              },
              {
                "input": { "method": "multiply", "a": 8, "b": 2 },
                "expectedOutput": "16"
              },
              {
                "input": { "method": "add", "a": 15, "b": 5 },
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
                "input": { "functionName": "divide", "a": 20, "b": 4 },
                "expectedOutput": "5"
              },
              {
                "input": { "functionName": "modulo", "a": 20, "b": 6 },
                "expectedOutput": "2"
              },
              {
                "input": { "functionName": "divide", "a": 100, "b": 10 },
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
                "input": { "operations": ["increment", "increment", "getCount"] },
                "expectedOutput": "2"
              },
              {
                "input": { "operations": ["increment", "getCount"] },
                "expectedOutput": "1"
              },
              {
                "input": { "operations": ["increment", "increment", "increment", "getCount"] },
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
                "input": { "functionName": "square", "n": 5 },
                "expectedOutput": "25"
              },
              {
                "input": { "functionName": "cube", "n": 3 },
                "expectedOutput": "27"
              },
              {
                "input": { "functionName": "square", "n": 10 },
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
                "input": { "property": "name" },
                "expectedOutput": "John"
              },
              {
                "input": { "property": "age" },
                "expectedOutput": "30"
              },
              {
                "input": { "property": "city" },
                "expectedOutput": "NYC"
              }
            ]
          }
        ]
      },
      {
        "id": "async-basics",
        "title": "Callbacks, timers, and async concepts",
        "outcomes": [
          "Execution Models: Synchronous vs. Asynchronous",
          "The Single Thread: Why JS can only do one thing at a time",
          "The Event Loop: Managing the Task Queue",
          "Timer Logic: setTimeout() and setInterval() Syntax",
          "Resource Management: Clearing Timers (clearTimeout/clearInterval)",
          "Callback Pattern: Passing logic to the future",
          "Control Flow: Understanding Non-blocking Execution Order",
          "Callback Hell: The limitation of nested callbacks",
          "Evolution: Why we need Promises"
        ],
        "topic_notes": `## 1. Execution Models: Synchronous vs. Asynchronous

- Synchronous code runs one statement after another; each must finish before the next runs. Asynchronous code schedules work (e.g. timers, I/O) and continues; the work completes later. JS uses callbacks, then Promises, then async/await to handle async results.

\`\`\`javascript
console.log("A")
setTimeout(() => console.log("B"), 0)
console.log("C")
\`\`\`

## 2. The Single Thread: Why JS can only do one thing at a time

- JavaScript has one main thread. Only one piece of code runs at a time. Long synchronous work blocks the thread; that is why async APIs (timers, network) schedule callbacks instead of blocking. Workers can run code in parallel in a separate thread.

\`\`\`javascript
setTimeout(() => console.log("later"), 100)
console.log("now")
\`\`\`

## 3. The Event Loop: Managing the Task Queue

- The event loop takes tasks from the queue and runs them one by one. When you call setTimeout(fn, ms), fn is added to the queue after (at least) ms. When the call stack is empty, the loop runs the next task. This gives non-blocking behavior.

\`\`\`javascript
function run() {
  console.log("Start")
  setTimeout(() => console.log("Timeout"), 0)
  console.log("End")
}
\`\`\`

## 4. Timer Logic: setTimeout() and setInterval() Syntax

- setTimeout(callback, delayMs) runs callback once after delayMs (minimum delay). setInterval(callback, delayMs) runs callback repeatedly every delayMs. Both return an id you can pass to clearTimeout/clearInterval to cancel.

\`\`\`javascript
const id = setTimeout(() => console.log("done"), 1000)
const id2 = setInterval(() => console.log("tick"), 500)
\`\`\`

## 5. Resource Management: Clearing Timers (clearTimeout/clearInterval)

- clearTimeout(id) cancels a pending setTimeout. clearInterval(id) stops a setInterval. Always clear intervals when you are done (e.g. when leaving a component or when a condition is met) to avoid leaks and unexpected callbacks.

\`\`\`javascript
const id = setInterval(() => { /* ... */ }, 1000)
clearInterval(id)
\`\`\`

## 6. Callback Pattern: Passing logic to the future

- A callback is a function you pass to async code; it is called when the work is done (e.g. when the timer fires or the request completes). Callback(err, result) is a common signature; Promises replace this with .then/.catch.

\`\`\`javascript
setTimeout(() => console.log("Hello"), 100)
\`\`\`

## 7. Control Flow: Understanding Non-blocking Execution Order

- Async calls return immediately; the callback runs later. So code after an async call runs before the callback. To sequence steps, put the next step inside the previous callback (or use Promises/async-await).

\`\`\`javascript
setTimeout(() => {
  console.log("first")
  setTimeout(() => console.log("second"), 0)
}, 0)
\`\`\`

## 8. Callback Hell: The limitation of nested callbacks

- Chaining many async steps with callbacks leads to deep nesting (callback inside callback). It is hard to read, error-prone, and difficult to handle errors. Promises and async/await flatten the flow.

\`\`\`javascript
getData((err, a) => {
  if (err) return
  getMore(a, (err, b) => {
    if (err) return
    getMore(b, (err, c) => { /* ... */ })
  })
})
\`\`\`

## 9. Evolution: Why we need Promises

- Promises represent a future value (or rejection). They can be chained with .then() and .catch(), composed with Promise.all/race, and consumed with async/await. They avoid deep callback nesting and standardize async flow and error handling.

\`\`\`javascript
fetch(url).then(r => r.json()).then(data => console.log(data)).catch(e => console.error(e))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that simulates setTimeout behavior.\n  Return the message that would be printed after the delay.\n  Examples:\n    simulateTimeout(\"Hello\", 1000) => \"Hello\"\n    simulateTimeout(\"World\", 1000) => \"World\"\n    simulateTimeout(\"Test\", 500) => \"Test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateTimeout(message, delay) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateTimeout",
            "reference_solution": "function simulateTimeout(message, delay) {\n  return message;\n}",
            "testCases": [
              {
                "input": { "message": "Hello", "delay": 1000 },
                "expectedOutput": "Hello"
              },
              {
                "input": { "message": "World", "delay": 1000 },
                "expectedOutput": "World"
              },
              {
                "input": { "message": "Test", "delay": 500 },
                "expectedOutput": "Test"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates event loop execution order.\n  Return the execution order as a string with newlines.\n  Examples:\n    simulateEventLoop() => \"Start\\nEnd\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateEventLoop() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateEventLoop",
            "reference_solution": "function simulateEventLoop() {\n  return 'Start\\nEnd';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Start\nEnd"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates countdown with setTimeout.\n  Return the countdown sequence as a string with newlines.\n  Examples:\n    simulateCountdown(3) => \"3\\n2\\n1\"\n    simulateCountdown(2) => \"2\\n1\"\n    simulateCountdown(5) => \"5\\n4\\n3\\n2\\n1\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateCountdown(n) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateCountdown",
            "reference_solution": "function simulateCountdown(n) {\n  let s = '';\n  for (let i = n; i >= 1; i--) s += (s ? '\\n' : '') + i;\n  return s;\n}",
            "testCases": [
              {
                "input": { "n": 3 },
                "expectedOutput": "3\n2\n1"
              },
              {
                "input": { "n": 2 },
                "expectedOutput": "2\n1"
              },
              {
                "input": { "n": 5 },
                "expectedOutput": "5\n4\n3\n2\n1"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates setInterval behavior.\n  Return the repeated message as a string with newlines.\n  Examples:\n    simulateInterval(\"Tick\", 3) => \"Tick\\nTick\\nTick\"\n    simulateInterval(\"Test\", 2) => \"Test\\nTest\"\n    simulateInterval(\"Count\", 4) => \"Count\\nCount\\nCount\\nCount\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateInterval(message, times) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateInterval",
            "reference_solution": "function simulateInterval(message, times) {\n  return Array(times).fill(message).join('\\n');\n}",
            "testCases": [
              {
                "input": { "message": "Tick", "times": 3 },
                "expectedOutput": "Tick\nTick\nTick"
              },
              {
                "input": { "message": "Test", "times": 2 },
                "expectedOutput": "Test\nTest"
              },
              {
                "input": { "message": "Count", "times": 4 },
                "expectedOutput": "Count\nCount\nCount\nCount"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates delayed greeting with callback.\n  Return the greeting message that would be passed to the callback.\n  Examples:\n    simulateDelayedGreeting(\"Alice\") => \"Hello, Alice\"\n    simulateDelayedGreeting(\"Bob\") => \"Hello, Bob\"\n    simulateDelayedGreeting(\"Charlie\") => \"Hello, Charlie\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateDelayedGreeting(name) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateDelayedGreeting",
            "reference_solution": "function simulateDelayedGreeting(name) {\n  return 'Hello, ' + name;\n}",
            "testCases": [
              {
                "input": { "name": "Alice" },
                "expectedOutput": "Hello, Alice"
              },
              {
                "input": { "name": "Bob" },
                "expectedOutput": "Hello, Bob"
              },
              {
                "input": { "name": "Charlie" },
                "expectedOutput": "Hello, Charlie"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates array processing with callbacks.\n  Return the processed array elements as a string with newlines.\n  Examples:\n    simulateProcessArray([1, 2, 3]) => \"1\\n2\\n3\"\n    simulateProcessArray([5, 10]) => \"5\\n10\"\n    simulateProcessArray([7]) => \"7\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateProcessArray(arr) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateProcessArray",
            "reference_solution": "function simulateProcessArray(arr) {\n  return arr.join('\\n');\n}",
            "testCases": [
              {
                "input": { "arr": [1, 2, 3] },
                "expectedOutput": "1\n2\n3"
              },
              {
                "input": { "arr": [5, 10] },
                "expectedOutput": "5\n10"
              },
              {
                "input": { "arr": [7] },
                "expectedOutput": "7"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates callback hell pattern.\n  Return the nested callback execution sequence as a string with newlines.\n  Examples:\n    simulateCallbackHell() => \"Step 1\\nStep 2\\nStep 3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateCallbackHell() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateCallbackHell",
            "reference_solution": "function simulateCallbackHell() {\n  return 'Step 1\\nStep 2\\nStep 3';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Step 1\nStep 2\nStep 3"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates timeout cancellation.\n  Return \"Cancelled\" if shouldCancel is true, otherwise \"Executed\".\n  Examples:\n    simulateTimeoutCancellation(true) => \"Cancelled\"\n    simulateTimeoutCancellation(false) => \"Executed\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateTimeoutCancellation(shouldCancel) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateTimeoutCancellation",
            "reference_solution": "function simulateTimeoutCancellation(shouldCancel) {\n  return shouldCancel ? 'Cancelled' : 'Executed';\n}",
            "testCases": [
              {
                "input": { "shouldCancel": true },
                "expectedOutput": "Cancelled"
              },
              {
                "input": { "shouldCancel": false },
                "expectedOutput": "Executed"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that demonstrates JavaScript execution order.\n  Return the execution sequence as a string with newlines.\n  Examples:\n    demonstrateExecutionOrder() => \"1\\n2\\n3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction demonstrateExecutionOrder() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "demonstrateExecutionOrder",
            "reference_solution": "function demonstrateExecutionOrder() {\n  return '1\\n2\\n3';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "1\n2\n3"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates repeated execution with interval.\n  Return the repeated message as a string with newlines.\n  Examples:\n    simulateRepeat(\"Hello\", 3, 1000) => \"Hello\\nHello\\nHello\"\n    simulateRepeat(\"Test\", 2, 500) => \"Test\\nTest\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateRepeat(message, times, interval) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateRepeat",
            "reference_solution": "function simulateRepeat(message, times, interval) {\n  return Array(times).fill(message).join('\\n');\n}",
            "testCases": [
              {
                "input": { "message": "Hello", "times": 3, "interval": 1000 },
                "expectedOutput": "Hello\nHello\nHello"
              },
              {
                "input": { "message": "Test", "times": 2, "interval": 500 },
                "expectedOutput": "Test\nTest"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async data fetching.\n  Return the name property from the provided data object.\n  Examples:\n    simulateFetchData({id: 1, name: \"User\"}) => \"User\"\n    simulateFetchData({id: 2, name: \"Alice\"}) => \"Alice\"\n    simulateFetchData({id: 3, name: \"Bob\"}) => \"Bob\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateFetchData(data) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateFetchData",
            "reference_solution": "function simulateFetchData(data) {\n  return data.name;\n}",
            "testCases": [
              {
                "input": { "data": { "id": 1, "name": "User" } },
                "expectedOutput": "User"
              },
              {
                "input": { "data": { "id": 2, "name": "Alice" } },
                "expectedOutput": "Alice"
              },
              {
                "input": { "data": { "id": 3, "name": "Bob" } },
                "expectedOutput": "Bob"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates a stopwatch.\n  Return the counting sequence with \"Stopped\" at the end as a string with newlines.\n  Examples:\n    simulateStopwatch(5) => \"1\\n2\\n3\\n4\\n5\\nStopped\"\n    simulateStopwatch(3) => \"1\\n2\\n3\\nStopped\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateStopwatch(maxSeconds) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateStopwatch",
            "reference_solution": "function simulateStopwatch(maxSeconds) {\n  let s = '';\n  for (let i = 1; i <= maxSeconds; i++) s += (s ? '\\n' : '') + i;\n  return s + (s ? '\\n' : '') + 'Stopped';\n}",
            "testCases": [
              {
                "input": { "maxSeconds": 5 },
                "expectedOutput": "1\n2\n3\n4\n5\nStopped"
              },
              {
                "input": { "maxSeconds": 3 },
                "expectedOutput": "1\n2\n3\nStopped"
              }
            ]
          }
        ]
      },
      {
        "id": "promises",
        "title": "Creating and consuming promises",
        "outcomes": [
          "Promise States: Pending, Fulfilled, and Rejected",
          "Constructor Logic: Using resolve and reject",
          "Consumption: Handling values with .then() and .catch()",
          "The finally Handler: Closing the loop",
          "Promise Chaining: Sequential Async Execution",
          "Value Passing: Why returning from .then() creates a new Promise",
          "Static Methods: Promise.all() and allSettled() for concurrency",
          "Optimization: Using Promise.race() for speed-based logic"
        ],
        "topic_notes": `## 1. Promise States: Pending, Fulfilled, and Rejected

- A Promise is pending until it is settled. It becomes fulfilled with a value or rejected with a reason. Once settled, it cannot change. Use .then() for fulfillment and .catch() (or .then(_, onRejected)) for rejection.

\`\`\`javascript
const p = new Promise((resolve) => setTimeout(() => resolve("done"), 100))
\`\`\`

## 2. Constructor Logic: Using resolve and reject

- new Promise((resolve, reject) => { ... }) receives two functions. Call resolve(value) to fulfill the promise, reject(reason) to reject it. Typically you call one of them from inside async work (e.g. after a timeout or request).

\`\`\`javascript
const p = new Promise((resolve, reject) => {
  if (ok) resolve(42)
  else reject(new Error("failed"))
})
\`\`\`

## 3. Consumption: Handling values with .then() and .catch()

- promise.then(onFulfilled, onRejected) runs onFulfilled when the promise fulfills, onRejected when it rejects. promise.catch(onRejected) is the same as .then(null, onRejected). Both return a new promise for chaining.

\`\`\`javascript
fetch(url).then(r => r.json()).then(data => console.log(data)).catch(e => console.error(e))
\`\`\`

## 4. The finally Handler: Closing the loop

- promise.finally(callback) runs callback when the promise settles (fulfilled or rejected). It does not receive a value. Use it for cleanup (e.g. hiding a loader). The returned promise keeps the same state and value/reason.

\`\`\`javascript
loadData().then(useData).catch(handleError).finally(() => setLoading(false))
\`\`\`

## 5. Promise Chaining: Sequential Async Execution

- Returning a value from .then() creates a promise resolved with that value. Returning a promise from .then() makes the chain wait for that promise. So you can chain .then().then().then() for sequential async steps.

\`\`\`javascript
fetchUser(id).then(u => fetchOrders(u.id)).then(orders => process(orders))
\`\`\`

## 6. Value Passing: Why returning from .then() creates a new Promise

- .then() returns a new promise. If the handler returns a plain value, that promise is fulfilled with it. If it returns a promise, the new promise follows that one. So you can transform values and pass them to the next .then().

\`\`\`javascript
Promise.resolve(5).then(x => x * 2).then(y => console.log(y))
\`\`\`

## 7. Static Methods: Promise.all() and allSettled() for concurrency

- Promise.all(promises) returns a promise that fulfills with an array of results when all promises fulfill, or rejects when the first rejects. Promise.allSettled(promises) waits for all and returns status and value/reason for each; it never rejects.

\`\`\`javascript
Promise.all([fetch(a), fetch(b)]).then(([r1, r2]) => console.log(r1, r2))
\`\`\`

## 8. Optimization: Using Promise.race() for speed-based logic

- Promise.race(promises) resolves or rejects as soon as one of the promises settles. Use it for timeouts (race(fetch(url), timeout(5000))) or to take the first of several sources. The rest keep running but their result is ignored.

\`\`\`javascript
Promise.race([slowRequest(), timeout(3000)]).then(handle).catch(handleTimeout)
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that simulates Promise resolution.\n  Return the resolved value that would be printed.\n  Examples:\n    simulatePromiseResolve(\"Success\") => \"Success\"\n    simulatePromiseResolve(\"Done\") => \"Done\"\n    simulatePromiseResolve(\"Complete\") => \"Complete\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseResolve(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseResolve",
            "reference_solution": "function simulatePromiseResolve(value) {\n  return value;\n}",
            "testCases": [
              {
                "input": { "value": "Success" },
                "expectedOutput": "Success"
              },
              {
                "input": { "value": "Done" },
                "expectedOutput": "Done"
              },
              {
                "input": { "value": "Complete" },
                "expectedOutput": "Complete"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise rejection handling.\n  Return the error message that would be caught and printed.\n  Examples:\n    simulatePromiseReject(\"Error occurred\") => \"Error occurred\"\n    simulatePromiseReject(\"Failed\") => \"Failed\"\n    simulatePromiseReject(\"Not found\") => \"Not found\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseReject(error) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseReject",
            "reference_solution": "function simulatePromiseReject(error) {\n  return error;\n}",
            "testCases": [
              {
                "input": { "error": "Error occurred" },
                "expectedOutput": "Error occurred"
              },
              {
                "input": { "error": "Failed" },
                "expectedOutput": "Failed"
              },
              {
                "input": { "error": "Not found" },
                "expectedOutput": "Not found"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise chaining with value transformation.\n  Return the doubled value that would result from the chain.\n  Examples:\n    simulatePromiseChain(5) => 10\n    simulatePromiseChain(10) => 20\n    simulatePromiseChain(7) => 14\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseChain(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseChain",
            "reference_solution": "function simulatePromiseChain(value) {\n  return value * 2;\n}",
            "testCases": [
              {
                "input": { "value": 5 },
                "expectedOutput": "10"
              },
              {
                "input": { "value": 10 },
                "expectedOutput": "20"
              },
              {
                "input": { "value": 7 },
                "expectedOutput": "14"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise with finally block.\n  Return the output sequence as a string with newlines.\n  Examples:\n    simulatePromiseFinally(\"Data\") => \"Data\\nCleanup\"\n    simulatePromiseFinally(\"Result\") => \"Result\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseFinally(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseFinally",
            "reference_solution": "function simulatePromiseFinally(value) {\n  return value + '\\nCleanup';\n}",
            "testCases": [
              {
                "input": { "value": "Data" },
                "expectedOutput": "Data\nCleanup"
              },
              {
                "input": { "value": "Result" },
                "expectedOutput": "Result\nCleanup"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates conditional Promise behavior.\n  Return \"Hello\" if condition is true, otherwise \"Error\".\n  Examples:\n    simulateConditionalPromise(true) => \"Hello\"\n    simulateConditionalPromise(false) => \"Error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateConditionalPromise(condition) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateConditionalPromise",
            "reference_solution": "function simulateConditionalPromise(condition) {\n  return condition ? 'Hello' : 'Error';\n}",
            "testCases": [
              {
                "input": { "condition": true },
                "expectedOutput": "Hello"
              },
              {
                "input": { "condition": false },
                "expectedOutput": "Error"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise.all() behavior.\n  Return the array of values as a JSON string.\n  Examples:\n    simulatePromiseAll([1, 2, 3]) => \"[1,2,3]\"\n    simulatePromiseAll([5, 10, 15]) => \"[5,10,15]\"\n    simulatePromiseAll([7, 14]) => \"[7,14]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAll(values) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseAll",
            "reference_solution": "function simulatePromiseAll(values) {\n  return JSON.stringify(values);\n}",
            "testCases": [
              {
                "input": { "values": [1, 2, 3] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "values": [5, 10, 15] },
                "expectedOutput": "[5,10,15]"
              },
              {
                "input": { "values": [7, 14] },
                "expectedOutput": "[7,14]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise.race() behavior.\n  Return the faster value (first parameter).\n  Examples:\n    simulatePromiseRace(\"Fast\", \"Slow\") => \"Fast\"\n    simulatePromiseRace(\"Quick\", \"Delayed\") => \"Quick\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseRace(fast, slow) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseRace",
            "reference_solution": "function simulatePromiseRace(fast, slow) {\n  return fast;\n}",
            "testCases": [
              {
                "input": { "fast": "Fast", "slow": "Slow" },
                "expectedOutput": "Fast"
              },
              {
                "input": { "fast": "Quick", "slow": "Delayed" },
                "expectedOutput": "Quick"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise chaining with calculations.\n  Perform the chain: add 5, then multiply by 2.\n  Examples:\n    simulatePromiseCalculation(10) => 30\n    simulatePromiseCalculation(5) => 20\n    simulatePromiseCalculation(20) => 50\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseCalculation(initial) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseCalculation",
            "reference_solution": "function simulatePromiseCalculation(initial) {\n  return (initial + 5) * 2;\n}",
            "testCases": [
              {
                "input": { "initial": 10 },
                "expectedOutput": "30"
              },
              {
                "input": { "initial": 5 },
                "expectedOutput": "20"
              },
              {
                "input": { "initial": 20 },
                "expectedOutput": "50"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates random Promise resolution.\n  Return \"Success\" if shouldResolve is true, otherwise \"Failure\".\n  Examples:\n    simulateRandomPromise(true) => \"Success\"\n    simulateRandomPromise(false) => \"Failure\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateRandomPromise(shouldResolve) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateRandomPromise",
            "reference_solution": "function simulateRandomPromise(shouldResolve) {\n  return shouldResolve ? 'Success' : 'Failure';\n}",
            "testCases": [
              {
                "input": { "shouldResolve": true },
                "expectedOutput": "Success"
              },
              {
                "input": { "shouldResolve": false },
                "expectedOutput": "Failure"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise.allSettled() behavior.\n  Return the formatted results as a string with newlines.\n  Examples:\n    simulatePromiseAllSettled(\"A\", \"B\") => \"fulfilled: A\\nrejected: B\"\n    simulatePromiseAllSettled(\"Success\", \"Error\") => \"fulfilled: Success\\nrejected: Error\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllSettled(resolveValue, rejectValue) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseAllSettled",
            "reference_solution": "function simulatePromiseAllSettled(resolveValue, rejectValue) {\n  return 'fulfilled: ' + resolveValue + '\\nrejected: ' + rejectValue;\n}",
            "testCases": [
              {
                "input": { "resolveValue": "A", "rejectValue": "B" },
                "expectedOutput": "fulfilled: A\nrejected: B"
              },
              {
                "input": { "resolveValue": "Success", "rejectValue": "Error" },
                "expectedOutput": "fulfilled: Success\nrejected: Error"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates chained data fetching.\n  Return the posts array as a JSON string.\n  Examples:\n    simulateChainedFetch(1, [\"Post1\", \"Post2\"]) => \"[\\\"Post1\\\",\\\"Post2\\\"]\"\n    simulateChainedFetch(2, [\"Article1\", \"Article2\", \"Article3\"]) => \"[\\\"Article1\\\",\\\"Article2\\\",\\\"Article3\\\"]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateChainedFetch(userId, posts) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateChainedFetch",
            "reference_solution": "function simulateChainedFetch(userId, posts) {\n  return JSON.stringify(posts);\n}",
            "testCases": [
              {
                "input": { "userId": 1, "posts": ["Post1", "Post2"] },
                "expectedOutput": "[\"Post1\",\"Post2\"]"
              },
              {
                "input": { "userId": 2, "posts": ["Article1", "Article2", "Article3"] },
                "expectedOutput": "[\"Article1\",\"Article2\",\"Article3\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates sequential Promise steps.\n  Return the step sequence as a string with newlines.\n  Examples:\n    simulateSequentialSteps() => \"Step 1\\nStep 2\\nStep 3\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialSteps() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateSequentialSteps",
            "reference_solution": "function simulateSequentialSteps() {\n  return 'Step 1\\nStep 2\\nStep 3';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Step 1\nStep 2\nStep 3"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise.all() with different delays.\n  Return the values in original order as JSON string (not completion order).\n  Examples:\n    simulatePromiseAllOrder([1, 2, 3]) => \"[1,2,3]\"\n    simulatePromiseAllOrder([5, 10, 15]) => \"[5,10,15]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllOrder(values) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseAllOrder",
            "reference_solution": "function simulatePromiseAllOrder(values) {\n  return JSON.stringify(values);\n}",
            "testCases": [
              {
                "input": { "values": [1, 2, 3] },
                "expectedOutput": "[1,2,3]"
              },
              {
                "input": { "values": [5, 10, 15] },
                "expectedOutput": "[5,10,15]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise error handling.\n  Return the error message that would be caught.\n  Examples:\n    simulatePromiseErrorHandling() => \"Invalid calculation\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseErrorHandling() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseErrorHandling",
            "reference_solution": "function simulatePromiseErrorHandling() {\n  return 'Invalid calculation';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Invalid calculation"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates Promise.all() with rejection.\n  Return the error message that would cause the rejection.\n  Examples:\n    simulatePromiseAllRejection(\"Error\") => \"Error\"\n    simulatePromiseAllRejection(\"Failed\") => \"Failed\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulatePromiseAllRejection(error) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulatePromiseAllRejection",
            "reference_solution": "function simulatePromiseAllRejection(error) {\n  return error;\n}",
            "testCases": [
              {
                "input": { "error": "Error" },
                "expectedOutput": "Error"
              },
              {
                "input": { "error": "Failed" },
                "expectedOutput": "Failed"
              }
            ]
          }
        ]
      },
      {
        "id": "async-await",
        "title": "Writing cleaner asynchronous code",
        "outcomes": [
          "async Keyword: Automatically Wrapping Functions in Promises",
          "await Keyword: Pausing Execution for Asynchronous Values",
          "Context Rules: Why await requires an async environment",
          "Return Logic: Understanding the Implicit Promise wrapper",
          "Error Handling: Integrating try...catch with Async flows",
          "Performance: Sequential vs. Parallel Await execution",
          "Modern Syntax: Async with Arrow Functions",
          "Propagation: How errors bubble through async chains"
        ],
        "topic_notes": `## 1. async Keyword: Automatically Wrapping Functions in Promises

- Declaring a function with async makes it return a Promise. If the function returns a value, that value becomes the fulfilled value; if it throws, the promise is rejected. You can await other promises inside it.

\`\`\`javascript
async function greet() { return "Hello" }
greet().then(console.log)
\`\`\`

## 2. await Keyword: Pausing Execution for Asynchronous Values

- await promise pauses the async function until the promise settles. If it fulfills, the expression evaluates to the value. If it rejects, the rejection is thrown and can be caught with try/catch. await can only be used inside an async function.

\`\`\`javascript
async function getData() {
  const res = await fetch(url)
  const data = await res.json()
  return data
}
\`\`\`

## 3. Context Rules: Why await requires an async environment

- await is only valid inside an async function (or top-level await in modules). This is because await suspends the function and the runtime needs an async context to resume it when the promise settles. Using await in a normal function is a SyntaxError.

\`\`\`javascript
async function run() {
  const x = await Promise.resolve(1)
  return x
}
\`\`\`

## 4. Return Logic: Understanding the Implicit Promise wrapper

- In an async function, return value is equivalent to return Promise.resolve(value). So the caller always gets a promise. Returning a promise just passes it through; the async function's promise follows that one.

\`\`\`javascript
async function one() { return 1 }
async function two() { return await one() }
\`\`\`

## 5. Error Handling: Integrating try...catch with Async flows

- Use try/catch inside async functions to handle rejections: await inside try, and catch (e) for errors. Rejected promises become thrown values, so you can use the same patterns as synchronous code. Add .catch() on the returned promise for unhandled errors.

\`\`\`javascript
async function safe() {
  try {
    const data = await fetchData()
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
\`\`\`

## 6. Performance: Sequential vs. Parallel Await execution

- await p1; await p2; runs p1 then p2 in sequence. To run in parallel, start both without awaiting, then await: const [a, b] = await Promise.all([p1, p2]). Use parallel when the calls are independent to reduce total time.

\`\`\`javascript
async function parallel() {
  const [a, b] = await Promise.all([fetch(url1), fetch(url2)])
  return [a, b]
}
\`\`\`

## 7. Modern Syntax: Async with Arrow Functions

- You can declare async arrow functions: const f = async () => { await something() }. Same rules: they return a promise and can use await. Handy for callbacks or short async helpers.

\`\`\`javascript
const fetchUser = async (id) => {
  const res = await fetch("/users/" + id)
  return res.json()
}
\`\`\`

## 8. Propagation: How errors bubble through async chains

- If an async function does not catch a rejection (from await or throw), the returned promise rejects. The caller can catch it with try/catch (if they await) or .catch(). So errors propagate up until handled, like synchronous throws.

\`\`\`javascript
async function a() { await b() }
async function b() { throw new Error("fail") }
a().catch(e => console.error(e))
\`\`\``,
        "tasks": [
          {
            "description": "/*\n  Implement the below function that simulates async function behavior.\n  Return the value that would be resolved by the async function.\n  Examples:\n    simulateAsyncFunction(\"Hello\") => \"Hello\"\n    simulateAsyncFunction(\"World\") => \"World\"\n    simulateAsyncFunction(\"Test\") => \"Test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncFunction(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncFunction",
            "reference_solution": "function simulateAsyncFunction(value) {\n  return value;\n}",
            "testCases": [
              {
                "input": { "value": "Hello" },
                "expectedOutput": "Hello"
              },
              {
                "input": { "value": "World" },
                "expectedOutput": "World"
              },
              {
                "input": { "value": "Test" },
                "expectedOutput": "Test"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates await behavior.\n  Return the value that would be awaited and printed.\n  Examples:\n    simulateAwait(\"Data\") => \"Data\"\n    simulateAwait(\"Result\") => \"Result\"\n    simulateAwait(\"Info\") => \"Info\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAwait(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAwait",
            "reference_solution": "function simulateAwait(value) {\n  return value;\n}",
            "testCases": [
              {
                "input": { "value": "Data" },
                "expectedOutput": "Data"
              },
              {
                "input": { "value": "Result" },
                "expectedOutput": "Result"
              },
              {
                "input": { "value": "Info" },
                "expectedOutput": "Info"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates sequential async operations.\n  Return the sum of both values.\n  Examples:\n    simulateSequentialAsync(5, 10) => 15\n    simulateSequentialAsync(20, 30) => 50\n    simulateSequentialAsync(7, 3) => 10\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialAsync(value1, value2) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateSequentialAsync",
            "reference_solution": "function simulateSequentialAsync(value1, value2) {\n  return value1 + value2;\n}",
            "testCases": [
              {
                "input": { "value1": 5, "value2": 10 },
                "expectedOutput": "15"
              },
              {
                "input": { "value1": 20, "value2": 30 },
                "expectedOutput": "50"
              },
              {
                "input": { "value1": 7, "value2": 3 },
                "expectedOutput": "10"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async error handling.\n  Return the error message that would be caught.\n  Examples:\n    simulateAsyncErrorHandling(\"Error occurred\") => \"Error occurred\"\n    simulateAsyncErrorHandling(\"Failed\") => \"Failed\"\n    simulateAsyncErrorHandling(\"Not found\") => \"Not found\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncErrorHandling(error) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncErrorHandling",
            "reference_solution": "function simulateAsyncErrorHandling(error) {\n  return error;\n}",
            "testCases": [
              {
                "input": { "error": "Error occurred" },
                "expectedOutput": "Error occurred"
              },
              {
                "input": { "error": "Failed" },
                "expectedOutput": "Failed"
              },
              {
                "input": { "error": "Not found" },
                "expectedOutput": "Not found"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates sequential async execution.\n  Return the values sequence as a string with newlines.\n  Examples:\n    simulateSequentialExecution([\"First\", \"Second\", \"Third\"]) => \"First\\nSecond\\nThird\"\n    simulateSequentialExecution([\"A\", \"B\", \"C\"]) => \"A\\nB\\nC\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateSequentialExecution(values) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateSequentialExecution",
            "reference_solution": "function simulateSequentialExecution(values) {\n  return values.join('\\n');\n}",
            "testCases": [
              {
                "input": { "values": ["First", "Second", "Third"] },
                "expectedOutput": "First\nSecond\nThird"
              },
              {
                "input": { "values": ["A", "B", "C"] },
                "expectedOutput": "A\nB\nC"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates parallel async execution.\n  Return the sum of both values.\n  Examples:\n    simulateParallelExecution(10, 20) => 30\n    simulateParallelExecution(5, 15) => 20\n    simulateParallelExecution(100, 200) => 300\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateParallelExecution(value1, value2) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateParallelExecution",
            "reference_solution": "function simulateParallelExecution(value1, value2) {\n  return value1 + value2;\n}",
            "testCases": [
              {
                "input": { "value1": 10, "value2": 20 },
                "expectedOutput": "30"
              },
              {
                "input": { "value1": 5, "value2": 15 },
                "expectedOutput": "20"
              },
              {
                "input": { "value1": 100, "value2": 200 },
                "expectedOutput": "300"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async arrow function.\n  Return the value that would be awaited.\n  Examples:\n    simulateAsyncArrow(\"Arrow\") => \"Arrow\"\n    simulateAsyncArrow(\"Function\") => \"Function\"\n    simulateAsyncArrow(\"Async\") => \"Async\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nconst simulateAsyncArrow = (value) => {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncArrow",
            "reference_solution": "function simulateAsyncArrow(value) {\n  return value;\n}",
            "testCases": [
              {
                "input": { "value": "Arrow" },
                "expectedOutput": "Arrow"
              },
              {
                "input": { "value": "Function" },
                "expectedOutput": "Function"
              },
              {
                "input": { "value": "Async" },
                "expectedOutput": "Async"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async data processing.\n  Return the name property from the data object.\n  Examples:\n    simulateAsyncDataProcessing({id: 1, name: \"User\"}) => \"User\"\n    simulateAsyncDataProcessing({id: 2, name: \"Alice\"}) => \"Alice\"\n    simulateAsyncDataProcessing({id: 3, name: \"Bob\"}) => \"Bob\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncDataProcessing(data) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncDataProcessing",
            "reference_solution": "function simulateAsyncDataProcessing(data) {\n  return data.name;\n}",
            "testCases": [
              {
                "input": { "data": { "id": 1, "name": "User" } },
                "expectedOutput": "User"
              },
              {
                "input": { "data": { "id": 2, "name": "Alice" } },
                "expectedOutput": "Alice"
              },
              {
                "input": { "data": { "id": 3, "name": "Bob" } },
                "expectedOutput": "Bob"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async try-catch-finally.\n  Return the result and cleanup message as a string with newlines.\n  Examples:\n    simulateAsyncTryCatchFinally(\"Success\") => \"Success\\nCleanup\"\n    simulateAsyncTryCatchFinally(\"Done\") => \"Done\\nCleanup\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncTryCatchFinally(value) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncTryCatchFinally",
            "reference_solution": "function simulateAsyncTryCatchFinally(value) {\n  return value + '\\nCleanup';\n}",
            "testCases": [
              {
                "input": { "value": "Success" },
                "expectedOutput": "Success\nCleanup"
              },
              {
                "input": { "value": "Done" },
                "expectedOutput": "Done\nCleanup"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates chained async operations.\n  Perform: double the initial value, then add 10.\n  Examples:\n    simulateChainedAsync(5) => 20\n    simulateChainedAsync(10) => 30\n    simulateChainedAsync(3) => 16\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateChainedAsync(initial) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateChainedAsync",
            "reference_solution": "function simulateChainedAsync(initial) {\n  return initial * 2 + 10;\n}",
            "testCases": [
              {
                "input": { "initial": 5 },
                "expectedOutput": "20"
              },
              {
                "input": { "initial": 10 },
                "expectedOutput": "30"
              },
              {
                "input": { "initial": 3 },
                "expectedOutput": "16"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async user and posts fetching.\n  Return the posts array as a JSON string.\n  Examples:\n    simulateAsyncUserPosts(1, [\"Post1\", \"Post2\"]) => \"[\\\"Post1\\\",\\\"Post2\\\"]\"\n    simulateAsyncUserPosts(2, [\"Article1\", \"Article2\"]) => \"[\\\"Article1\\\",\\\"Article2\\\"]\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncUserPosts(userId, posts) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncUserPosts",
            "reference_solution": "function simulateAsyncUserPosts(userId, posts) {\n  return JSON.stringify(posts);\n}",
            "testCases": [
              {
                "input": { "userId": 1, "posts": ["Post1", "Post2"] },
                "expectedOutput": "[\"Post1\",\"Post2\"]"
              },
              {
                "input": { "userId": 2, "posts": ["Article1", "Article2"] },
                "expectedOutput": "[\"Article1\",\"Article2\"]"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates nested error handling.\n  Return the final error message that would be caught.\n  Examples:\n    simulateNestedErrorHandling() => \"Failed to fetch data\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateNestedErrorHandling() {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateNestedErrorHandling",
            "reference_solution": "function simulateNestedErrorHandling() {\n  return 'Failed to fetch data';\n}",
            "testCases": [
              {
                "input": {},
                "expectedOutput": "Failed to fetch data"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async Promise.race().\n  Return the faster value (first parameter).\n  Examples:\n    simulateAsyncRace(\"Fast\", \"Slow\") => \"Fast\"\n    simulateAsyncRace(\"Quick\", \"Delayed\") => \"Quick\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncRace(fast, slow) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncRace",
            "reference_solution": "function simulateAsyncRace(fast, slow) {\n  return fast;\n}",
            "testCases": [
              {
                "input": { "fast": "Fast", "slow": "Slow" },
                "expectedOutput": "Fast"
              },
              {
                "input": { "fast": "Quick", "slow": "Delayed" },
                "expectedOutput": "Quick"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async validation.\n  Return \"Invalid number\" if number is negative, otherwise return number * 2.\n  Examples:\n    simulateAsyncValidation(-5) => \"Invalid number\"\n    simulateAsyncValidation(10) => 20\n    simulateAsyncValidation(-1) => \"Invalid number\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncValidation(number) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncValidation",
            "reference_solution": "function simulateAsyncValidation(number) {\n  return number < 0 ? 'Invalid number' : number * 2;\n}",
            "testCases": [
              {
                "input": { "number": -5 },
                "expectedOutput": "Invalid number"
              },
              {
                "input": { "number": 10 },
                "expectedOutput": "20"
              },
              {
                "input": { "number": -1 },
                "expectedOutput": "Invalid number"
              }
            ]
          },
          {
            "description": "/*\n  Implement the below function that simulates async array processing.\n  Return the sum of all values in the array.\n  Examples:\n    simulateAsyncArrayProcessing([1, 2, 3]) => 6\n    simulateAsyncArrayProcessing([5, 10, 15]) => 30\n    simulateAsyncArrayProcessing([2, 4, 6, 8]) => 20\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction simulateAsyncArrayProcessing(values) {\n  // Implementation here\n}",
            "solution_type": "function",
            "function_name": "simulateAsyncArrayProcessing",
            "reference_solution": "function simulateAsyncArrayProcessing(values) {\n  return values.reduce((a, b) => a + b, 0);\n}",
            "testCases": [
              {
                "input": { "values": [1, 2, 3] },
                "expectedOutput": "6"
              },
              {
                "input": { "values": [5, 10, 15] },
                "expectedOutput": "30"
              },
              {
                "input": { "values": [2, 4, 6, 8] },
                "expectedOutput": "20"
              }
            ]
          }
        ]
      }
    ]
  },
];

export default courses