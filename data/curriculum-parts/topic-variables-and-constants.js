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
    "Let's understand variables.\n\nA variable is a named place to store a value. You give it a name, assign a value with `=`, and use the name later to read or change that value.\n\nHere's a simple example:\n\n```javascript\nconst name = \"Sara\";\nconsole.log(name);    // Sara\n```\n\nWe store the string \"Sara\" in a name, then print it. The name refers to the value.\n\nNow, let's try a simple practice task: Write code that stores your age in a variable and prints it.",
    "Let's declare constants with `const`.\n\n`const` creates a name for a value you don't plan to change. You must give it a value when you declare it.\n\nHere's a simple example:\n\n```javascript\nconst pi = 3.14;\nconsole.log(pi);    // 3.14\n```\n\nOnce assigned, the name always refers to that value. Use `const` when the value should stay the same.\n\nNow, let's try a simple practice task: Write code that declares a constant for your birth year and prints it.",
    "Let's declare mutable variables with `let`.\n\n`let` creates a name for a value you can change. You can assign a new value later with `=`.\n\nHere's a simple example:\n\n```javascript\nlet count = 0;\ncount = 1;\nconsole.log(count);    // 1\n```\n\nWe assign 0, then assign again. The name now refers to the new value. Use `let` when the value will change.\n\nNow, let's try a simple practice task: Write code that declares a variable, gives it a value, then changes it and prints the new value.",
    "Let's see why `const` cannot be reassigned.\n\nWith `const`, you bind the name to a value once. Assigning a new value to that name causes an error.\n\nHere's a simple example:\n\n```javascript\nconst x = 5;\nconsole.log(x);    // 5\nx = 10;            // TypeError: Assignment to constant variable\n```\n\nThe first line is fine. The reassignment is not allowed. Use `const` for values that won't change; use `let` when you need to reassign.\n\nNow, let's try a simple practice task: Write code that uses `const` for a value that won't change and prints it."
  ],
  "tasks": [
    {
      "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 15;\nconst b = 27;\n\n// Create 3 let variables: two for storing a and b, one for swapping\n// Swap the values using the third variable, then print both values after swapping\n// For example, if a = 15 and b = 27, your output should be:\n// 27\n// 15",
      "solution_type": "script",
      "reference_solution": "const a = 15;\nconst b = 27;\nlet valueA = a;\nlet valueB = b;\nlet temp = valueA;\nvalueA = valueB;\nvalueB = temp;\nconsole.log(valueA);\nconsole.log(valueB);",
      "testCases": [
        {
          "input": {
            "a": 15,
            "b": 27
          },
          "expectedOutput": "27\n15"
        },
        {
          "input": {
            "a": 100,
            "b": 200
          },
          "expectedOutput": "200\n100"
        },
        {
          "input": {
            "a": 7,
            "b": 3
          },
          "expectedOutput": "3\n7"
        }
      ]
    },
    {
      "description": "// Do not rename num1, num2, num3, use them as input for your program.\n// While testing we will change their values.\nconst num1 = 5;\nconst num2 = 12;\nconst num3 = 8;\n\n// Calculate a running sum: start with num1, add num2, then add num3\n// Print the sum after each addition\n// For example, if num1 = 5, num2 = 12, num3 = 8, your output should be:\n// 5\n// 17\n// 25",
      "solution_type": "script",
      "reference_solution": "const num1 = 5;\nconst num2 = 12;\nconst num3 = 8;\nlet sum = num1;\nconsole.log(sum);\nsum = sum + num2;\nconsole.log(sum);\nsum = sum + num3;\nconsole.log(sum);",
      "testCases": [
        {
          "input": {
            "num1": 5,
            "num2": 12,
            "num3": 8
          },
          "expectedOutput": "5\n17\n25"
        },
        {
          "input": {
            "num1": 10,
            "num2": 20,
            "num3": 30
          },
          "expectedOutput": "10\n30\n60"
        },
        {
          "input": {
            "num1": 1,
            "num2": 2,
            "num3": 3
          },
          "expectedOutput": "1\n3\n6"
        }
      ]
    },
    {
      "description": "// Do not rename start and increment, use them as input for your program.\n// While testing we will change their values.\nconst start = 10;\nconst increment = 3;\n\n// Create a counter starting at 'start' and increment it 4 times by 'increment'\n// Print the counter value after each increment\n// For example, if start = 10 and increment = 3, your output should be:\n// 13\n// 16\n// 19\n// 22",
      "solution_type": "script",
      "reference_solution": "const start = 10;\nconst increment = 3;\nlet counter = start;\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);\ncounter = counter + increment;\nconsole.log(counter);",
      "testCases": [
        {
          "input": {
            "start": 10,
            "increment": 3
          },
          "expectedOutput": "13\n16\n19\n22"
        },
        {
          "input": {
            "start": 0,
            "increment": 5
          },
          "expectedOutput": "5\n10\n15\n20"
        },
        {
          "input": {
            "start": 100,
            "increment": 10
          },
          "expectedOutput": "110\n120\n130\n140"
        }
      ]
    },
    {
      "description": "// Do not rename celsius, use it as input for your program.\n// While testing we will change its value.\nconst celsius = 100;\n\n// Convert celsius to Fahrenheit using: (celsius * 9/5) + 32, then store that result\n// Convert the Fahrenheit value to Kelvin using: (F - 32) * 5/9 + 273.15\n// Print both converted values (Fahrenheit first, then Kelvin)\n// For example, if celsius = 100, your output should be:\n// 212\n// 373.15",
      "solution_type": "script",
      "reference_solution": "const celsius = 100;\nconst fahrenheit = (celsius * 9 / 5) + 32;\nconst kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;\nconsole.log(fahrenheit);\nconsole.log(kelvin);",
      "testCases": [
        {
          "input": {
            "celsius": 100
          },
          "expectedOutput": "212\n373.15"
        },
        {
          "input": {
            "celsius": 0
          },
          "expectedOutput": "32\n273.15"
        },
        {
          "input": {
            "celsius": 25
          },
          "expectedOutput": "77\n298.15"
        }
      ]
    },
    {
      "description": "// Do not rename principal, rate, time, use them as input for your program.\n// While testing we will change their values.\nconst principal = 1000;\nconst rate = 5;\nconst time = 2;\n\n// Calculate simple interest: (principal * rate * time) / 100\n// Calculate total amount: principal + interest\n// Print the interest and then the total amount\n// For example, if principal = 1000, rate = 5, time = 2, your output should be:\n// 100\n// 1100",
      "solution_type": "script",
      "reference_solution": "const principal = 1000;\nconst rate = 5;\nconst time = 2;\nconst interest = (principal * rate * time) / 100;\nconst total = principal + interest;\nconsole.log(interest);\nconsole.log(total);",
      "testCases": [
        {
          "input": {
            "principal": 1000,
            "rate": 5,
            "time": 2
          },
          "expectedOutput": "100\n1100"
        },
        {
          "input": {
            "principal": 5000,
            "rate": 10,
            "time": 3
          },
          "expectedOutput": "1500\n6500"
        },
        {
          "input": {
            "principal": 2000,
            "rate": 7,
            "time": 1
          },
          "expectedOutput": "140\n2140"
        }
      ]
    },
    {
      "description": "// Do not rename length and width, use them as input for your program.\n// While testing we will change their values.\nconst length = 8;\nconst width = 5;\n\n// Calculate the area and perimeter of a rectangle\n// Area = length * width\n// Perimeter = 2 * (length + width)\n// Print area first, then perimeter\n// For example, if length = 8 and width = 5, your output should be:\n// 40\n// 26",
      "solution_type": "script",
      "reference_solution": "const length = 8;\nconst width = 5;\nconst area = length * width;\nconst perimeter = 2 * (length + width);\nconsole.log(area);\nconsole.log(perimeter);",
      "testCases": [
        {
          "input": {
            "length": 8,
            "width": 5
          },
          "expectedOutput": "40\n26"
        },
        {
          "input": {
            "length": 10,
            "width": 10
          },
          "expectedOutput": "100\n40"
        },
        {
          "input": {
            "length": 12,
            "width": 7
          },
          "expectedOutput": "84\n38"
        }
      ]
    },
    {
      "description": "// Do not rename score1, score2, score3, use them as input for your program.\n// While testing we will change their values.\nconst score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\n\n// Calculate the sum of all scores\n// Calculate the average (sum divided by 3)\n// Print the sum and then the average\n// For example, if scores are 85, 92, 78, your output should be:\n// 255\n// 85",
      "solution_type": "script",
      "reference_solution": "const score1 = 85;\nconst score2 = 92;\nconst score3 = 78;\nconst sum = score1 + score2 + score3;\nconst average = sum / 3;\nconsole.log(sum);\nconsole.log(average);",
      "testCases": [
        {
          "input": {
            "score1": 85,
            "score2": 92,
            "score3": 78
          },
          "expectedOutput": "255\n85"
        },
        {
          "input": {
            "score1": 90,
            "score2": 90,
            "score3": 90
          },
          "expectedOutput": "270\n90"
        },
        {
          "input": {
            "score1": 70,
            "score2": 80,
            "score3": 100
          },
          "expectedOutput": "250\n83.33333333333333"
        }
      ]
    },
    {
      "description": "// Do not rename distance and time, use them as input for your program.\n// While testing we will change their values.\nconst distance = 150;\nconst time = 3;\n\n// Calculate speed: distance / time\n// Calculate double the speed\n// Print original speed and then doubled speed\n// For example, if distance = 150 and time = 3, your output should be:\n// 50\n// 100",
      "solution_type": "script",
      "reference_solution": "const distance = 150;\nconst time = 3;\nconst speed = distance / time;\nconst doubledSpeed = speed * 2;\nconsole.log(speed);\nconsole.log(doubledSpeed);",
      "testCases": [
        {
          "input": {
            "distance": 150,
            "time": 3
          },
          "expectedOutput": "50\n100"
        },
        {
          "input": {
            "distance": 200,
            "time": 4
          },
          "expectedOutput": "50\n100"
        },
        {
          "input": {
            "distance": 360,
            "time": 6
          },
          "expectedOutput": "60\n120"
        }
      ]
    },
    {
      "description": "// Do not rename x, y, z, use them as input for your program.\n// While testing we will change their values.\nconst x = 6;\nconst y = 4;\nconst z = 2;\n\n// Calculate: (x + y) * z\n// Store the result and then calculate: result - x\n// Print both values\n// For example, if x = 6, y = 4, z = 2, your output should be:\n// 20\n// 14",
      "solution_type": "script",
      "reference_solution": "const x = 6;\nconst y = 4;\nconst z = 2;\nconst product = (x + y) * z;\nconst productMinusX = product - x;\nconsole.log(product);\nconsole.log(productMinusX);",
      "testCases": [
        {
          "input": {
            "x": 6,
            "y": 4,
            "z": 2
          },
          "expectedOutput": "20\n14"
        },
        {
          "input": {
            "x": 10,
            "y": 5,
            "z": 3
          },
          "expectedOutput": "45\n35"
        },
        {
          "input": {
            "x": 8,
            "y": 2,
            "z": 5
          },
          "expectedOutput": "50\n42"
        }
      ]
    }
  ]
};
