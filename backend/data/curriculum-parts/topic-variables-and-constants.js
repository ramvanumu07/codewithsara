/** Topic: Variables and Constants (variables-and-constants) */
export default {
  "id": "variables-and-constants",
  "title": "Variables and Constants",
  "outcomes": [
    "Variables",
    "Declaring constants with const",
    "Declaring mutable variables with let",
    "Immutability: Why const cannot be reassigned"
  ],
  "outcome_messages": [
    "Let's understand variables.\n\nA variable is a named place to store a value. You give it a name, assign a value with `=`, and use the name later to read or change that value.\n\n## Example\n\n```javascript\nconst name = \"Sara\";\nconsole.log(name);\n```\n\n## Output\n\n```\nSara\n```\n\nWe store the string \"Sara\" in a name, then print it. The name refers to the value.\n\n## Practice\n\nWrite code that stores your age in a variable and prints it.",
    "Let's declare constants with `const`.\n\n`const` creates a name for a value you don't plan to change. You must give it a value when you declare it.\n\n## Example\n\n```javascript\nconst pi = 3.14;\nconsole.log(pi);\n```\n\n## Output\n\n```\n3.14\n```\n\nOnce assigned, the name always refers to that value. Use `const` when the value should stay the same.\n\n## Practice\n\nWrite code that declares a constant for your birth year and prints it.",
    "Let's declare mutable variables with `let`.\n\n`let` creates a name for a value you can change. You can assign a new value later with `=`.\n\n## Example\n\n```javascript\nlet count = 0;\ncount = 1;\nconsole.log(count);\n```\n\n## Output\n\n```\n1\n```\n\nWe assign 0, then assign again. The name now refers to the new value. Use `let` when the value will change.\n\n## Practice\n\nWrite code that stores your nickname in a variable and prints it, then changes it to your real name and prints again.",
    "Let's see why `const` cannot be reassigned.\n\nWith `const`, you bind the name to a value once. Assigning a new value to that name causes an error.\n\n## Example\n\n```javascript\nconst x = 5;\nconsole.log(x);\nx = 10;\n```\n\n## Output\n\n```\n5\nTypeError: Assignment to constant variable.\n```\n\nWe print 5 with `console.log(x)`. The reassignment `x = 10` then throws the error. Use `const` for values that won't change; use `let` when you need to reassign.\n\n## Practice\n\nWhat happens if you assign a new value to a variable declared with const?"
  ],
  "tasks": [
    {
      "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 15;\nconst b = 27;\n// Create 3 let variables: two for storing a and b, one for swapping\n// Swap the values using the third variable, then print both values after swapping\n// For example, if a = 15 and b = 27, your output should be:\n//Value of a: 27\n//Value of b: 15",
      "solution_type": "script",
      "reference_solution": "const a = 15;\nconst b = 27;\nlet valueA = a;\nlet valueB = b;\nlet temp = valueA;\nvalueA = valueB;\nvalueB = temp;\nconsole.log(\"Value of a:\", valueA);\nconsole.log(\"Value of b:\", valueB);",
      "testCases": [
        {
          "input": {
            "a": 15,
            "b": 27
          },
          "expectedOutput": "Value of a: 27\nValue of b: 15"
        },
        {
          "input": {
            "a": 100,
            "b": 200
          },
          "expectedOutput": "Value of a: 200\nValue of b: 100"
        },
        {
          "input": {
            "a": 7,
            "b": 3
          },
          "expectedOutput": "Value of a: 3\nValue of b: 7"
        }
      ]
    },
    {
      "description": "// Do not rename celsius, use it as input for your program.\n// While testing we will change its value.\nconst celsius = 100;\n// Convert celsius to Fahrenheit using: (celsius * 9/5) + 32, then store that result\n// Convert the Fahrenheit value to Kelvin using: (F - 32) * 5/9 + 273.15\n// Print both converted values (Fahrenheit first, then Kelvin)\n// For example, if celsius = 100, your output should be:\n//Fahrenheit: 212\n//Kelvin: 373.15",
      "solution_type": "script",
      "reference_solution": "const celsius = 100;\nconst fahrenheit = (celsius * 9 / 5) + 32;\nconst kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;\nconsole.log(\"Fahrenheit:\", fahrenheit);\nconsole.log(\"Kelvin:\", kelvin);",
      "testCases": [
        {
          "input": {
            "celsius": 100
          },
          "expectedOutput": "Fahrenheit: 212\nKelvin: 373.15"
        },
        {
          "input": {
            "celsius": 0
          },
          "expectedOutput": "Fahrenheit: 32\nKelvin: 273.15"
        },
        {
          "input": {
            "celsius": 25
          },
          "expectedOutput": "Fahrenheit: 77\nKelvin: 298.15"
        }
      ]
    },
    {
      "description": "// Do not rename principal, rate, time, use them as input for your program.\n// While testing we will change their values.\nconst principal = 1000;\nconst rate = 5;\nconst time = 2;\n// Calculate simple interest: (principal * rate * time) / 100\n// Calculate total amount: principal + interest\n// Print the interest and then the total amount\n// For example, if principal = 1000, rate = 5, time = 2, your output should be:\n//Interest: 100\n//Total amount: 1100",
      "solution_type": "script",
      "reference_solution": "const principal = 1000;\nconst rate = 5;\nconst time = 2;\nconst interest = (principal * rate * time) / 100;\nconst total = principal + interest;\nconsole.log(\"Interest:\", interest);\nconsole.log(\"Total amount:\", total);",
      "testCases": [
        {
          "input": {
            "principal": 1000,
            "rate": 5,
            "time": 2
          },
          "expectedOutput": "Interest: 100\nTotal amount: 1100"
        },
        {
          "input": {
            "principal": 5000,
            "rate": 10,
            "time": 3
          },
          "expectedOutput": "Interest: 1500\nTotal amount: 6500"
        },
        {
          "input": {
            "principal": 2000,
            "rate": 7,
            "time": 1
          },
          "expectedOutput": "Interest: 140\nTotal amount: 2140"
        }
      ]
    },
    {
      "description": "// Do not rename length and width, use them as input for your program.\n// While testing we will change their values.\nconst length = 8;\nconst width = 5;\n// Calculate the area and perimeter of a rectangle\n// Area = length * width\n// Perimeter = 2 * (length + width)\n// Print area first, then perimeter\n// For example, if length = 8 and width = 5, your output should be:\n//Area: 40\n//Perimeter: 26",
      "solution_type": "script",
      "reference_solution": "const length = 8;\nconst width = 5;\nconst area = length * width;\nconst perimeter = 2 * (length + width);\nconsole.log(\"Area:\", area);\nconsole.log(\"Perimeter:\", perimeter);",
      "testCases": [
        {
          "input": {
            "length": 8,
            "width": 5
          },
          "expectedOutput": "Area: 40\nPerimeter: 26"
        },
        {
          "input": {
            "length": 10,
            "width": 10
          },
          "expectedOutput": "Area: 100\nPerimeter: 40"
        },
        {
          "input": {
            "length": 12,
            "width": 7
          },
          "expectedOutput": "Area: 84\nPerimeter: 38"
        }
      ]
    },
    {
      "description": "// Do not rename score1, score2, score3, use them as input for your program.\n// While testing we will change their values.\nconst score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\n// Calculate the sum of all scores\n// Calculate the average (sum divided by 3)\n// Print the sum and then the average\n// For example, if scores are 85, 92, 78, your output should be:\n//Sum: 255\n//Average: 85",
      "solution_type": "script",
      "reference_solution": "const score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\nconst sum = score1 + score2 + score3;\nconst average = sum / 3;\nconsole.log(\"Sum:\", sum);\nconsole.log(\"Average:\", average);",
      "testCases": [
        {
          "input": {
            "score1": 85,
            "score2": 92,
            "score3": 78
          },
          "expectedOutput": "Sum: 255\nAverage: 85"
        },
        {
          "input": {
            "score1": 90,
            "score2": 90,
            "score3": 90
          },
          "expectedOutput": "Sum: 270\nAverage: 90"
        },
        {
          "input": {
            "score1": 70,
            "score2": 80,
            "score3": 100
          },
          "expectedOutput": "Sum: 250\nAverage: 83.33333333333333"
        }
      ]
    }
  ]
};
