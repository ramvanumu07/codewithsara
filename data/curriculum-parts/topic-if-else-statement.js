/** Topic: if...else Statement (if-else-statement) */
export default {
  "id": "if-else-statement",
  "title": "if...else Statement",
  "outcomes": [
    "The else Block: Defining the \"Otherwise\" Path",
    "Binary Logic: Designing Two-Way Decisions",
    "Mutual Exclusivity: Ensuring only one path executes"
  ],
  "tasks": [
    {
      "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 7;\n\n// Check if number is even or odd\n// If even, print: \"Even\"\n// Otherwise, print: \"Odd\"",
      "solution_type": "script",
      "reference_solution": "const number = 7;\nif (number % 2 === 0) {\n  console.log(\"Even\");\n} else {\n  console.log(\"Odd\");\n}",
      "testCases": [
        {
          "input": {
            "number": 7
          },
          "expectedOutput": "Odd"
        },
        {
          "input": {
            "number": 10
          },
          "expectedOutput": "Even"
        },
        {
          "input": {
            "number": 0
          },
          "expectedOutput": "Even"
        },
        {
          "input": {
            "number": -3
          },
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
          "input": {
            "age": 16
          },
          "expectedOutput": "Minor"
        },
        {
          "input": {
            "age": 18
          },
          "expectedOutput": "Adult"
        },
        {
          "input": {
            "age": 25
          },
          "expectedOutput": "Adult"
        },
        {
          "input": {
            "age": 0
          },
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
          "input": {
            "temperature": 15
          },
          "expectedOutput": "Cold"
        },
        {
          "input": {
            "temperature": 30
          },
          "expectedOutput": "Hot"
        },
        {
          "input": {
            "temperature": 25
          },
          "expectedOutput": "Cold"
        },
        {
          "input": {
            "temperature": 26
          },
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
          "input": {
            "score": 45
          },
          "expectedOutput": "Fail"
        },
        {
          "input": {
            "score": 50
          },
          "expectedOutput": "Pass"
        },
        {
          "input": {
            "score": 75
          },
          "expectedOutput": "Pass"
        },
        {
          "input": {
            "score": 0
          },
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
          "input": {
            "num1": 15,
            "num2": 20
          },
          "expectedOutput": "Second is larger or equal"
        },
        {
          "input": {
            "num1": 30,
            "num2": 20
          },
          "expectedOutput": "First is larger"
        },
        {
          "input": {
            "num1": 10,
            "num2": 10
          },
          "expectedOutput": "Second is larger or equal"
        },
        {
          "input": {
            "num1": 5,
            "num2": 3
          },
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
          "input": {
            "year": 2023
          },
          "expectedOutput": "Not a leap year"
        },
        {
          "input": {
            "year": 2024
          },
          "expectedOutput": "Leap year"
        },
        {
          "input": {
            "year": 2020
          },
          "expectedOutput": "Leap year"
        },
        {
          "input": {
            "year": 2021
          },
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
          "input": {
            "str": "Hello"
          },
          "expectedOutput": "Short"
        },
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "Long"
        },
        {
          "input": {
            "str": "Hi"
          },
          "expectedOutput": "Short"
        },
        {
          "input": {
            "str": "Code!"
          },
          "expectedOutput": "Short"
        },
        {
          "input": {
            "str": "Python"
          },
          "expectedOutput": "Long"
        }
      ]
    }
  ]
};
