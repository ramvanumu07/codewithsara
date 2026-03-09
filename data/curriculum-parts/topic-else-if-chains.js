/** Topic: else if Chains (else-if-chains) */
export default {
  "id": "else-if-chains",
  "title": "else if Chains",
  "outcomes": [
    "The else if Syntax: Expanding Decision Branches",
    "Multi-state Logic: Handling more than two outcomes",
    "The Final else: Creating a Default Fallback",
    "Execution Flow: Why Condition Order Matters"
  ],
  "tasks": [
    {
      "description": "// Do not rename score, use it as input for your program.\n// While testing we will change its value.\nconst score = 75;\n\n// Check the grade based on score:\n// If score >= 90, print: \"A\"\n// Else if score >= 80, print: \"B\"\n// Else if score >= 70, print: \"C\"\n// Else if score >= 60, print: \"D\"\n// Otherwise, print: \"F\"",
      "solution_type": "script",
      "reference_solution": "const score = 75;\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 80) {\n  console.log(\"B\");\n} else if (score >= 70) {\n  console.log(\"C\");\n} else if (score >= 60) {\n  console.log(\"D\");\n} else {\n  console.log(\"F\");\n}",
      "testCases": [
        {
          "input": {
            "score": 75
          },
          "expectedOutput": "C"
        },
        {
          "input": {
            "score": 95
          },
          "expectedOutput": "A"
        },
        {
          "input": {
            "score": 85
          },
          "expectedOutput": "B"
        },
        {
          "input": {
            "score": 60
          },
          "expectedOutput": "D"
        },
        {
          "input": {
            "score": 55
          },
          "expectedOutput": "F"
        },
        {
          "input": {
            "score": 90
          },
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
          "input": {
            "age": 25
          },
          "expectedOutput": "Adult"
        },
        {
          "input": {
            "age": 10
          },
          "expectedOutput": "Child"
        },
        {
          "input": {
            "age": 15
          },
          "expectedOutput": "Teenager"
        },
        {
          "input": {
            "age": 65
          },
          "expectedOutput": "Senior"
        },
        {
          "input": {
            "age": 13
          },
          "expectedOutput": "Teenager"
        },
        {
          "input": {
            "age": 60
          },
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
          "input": {
            "temperature": 22
          },
          "expectedOutput": "Warm"
        },
        {
          "input": {
            "temperature": 35
          },
          "expectedOutput": "Hot"
        },
        {
          "input": {
            "temperature": 15
          },
          "expectedOutput": "Cool"
        },
        {
          "input": {
            "temperature": 5
          },
          "expectedOutput": "Cold"
        },
        {
          "input": {
            "temperature": 30
          },
          "expectedOutput": "Warm"
        },
        {
          "input": {
            "temperature": 31
          },
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
          "input": {
            "number": 0
          },
          "expectedOutput": "Zero"
        },
        {
          "input": {
            "number": 10
          },
          "expectedOutput": "Positive"
        },
        {
          "input": {
            "number": -5
          },
          "expectedOutput": "Negative"
        },
        {
          "input": {
            "number": 100
          },
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
          "input": {
            "dayNumber": 3
          },
          "expectedOutput": "Wednesday"
        },
        {
          "input": {
            "dayNumber": 1
          },
          "expectedOutput": "Monday"
        },
        {
          "input": {
            "dayNumber": 7
          },
          "expectedOutput": "Sunday"
        },
        {
          "input": {
            "dayNumber": 5
          },
          "expectedOutput": "Friday"
        },
        {
          "input": {
            "dayNumber": 0
          },
          "expectedOutput": "Invalid day"
        },
        {
          "input": {
            "dayNumber": 10
          },
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
          "input": {
            "hours": 14
          },
          "expectedOutput": "Afternoon"
        },
        {
          "input": {
            "hours": 8
          },
          "expectedOutput": "Morning"
        },
        {
          "input": {
            "hours": 18
          },
          "expectedOutput": "Evening"
        },
        {
          "input": {
            "hours": 22
          },
          "expectedOutput": "Night"
        },
        {
          "input": {
            "hours": 12
          },
          "expectedOutput": "Afternoon"
        },
        {
          "input": {
            "hours": 0
          },
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
          "input": {
            "num": 15
          },
          "expectedOutput": "Divisible by 15"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "Divisible by 5"
        },
        {
          "input": {
            "num": 9
          },
          "expectedOutput": "Divisible by 3"
        },
        {
          "input": {
            "num": 30
          },
          "expectedOutput": "Divisible by 15"
        },
        {
          "input": {
            "num": 7
          },
          "expectedOutput": "Not divisible by 3, 5, or 15"
        },
        {
          "input": {
            "num": 25
          },
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
          "input": {
            "price": 1500
          },
          "expectedOutput": "10% discount"
        },
        {
          "input": {
            "price": 2500
          },
          "expectedOutput": "20% discount"
        },
        {
          "input": {
            "price": 750
          },
          "expectedOutput": "5% discount"
        },
        {
          "input": {
            "price": 300
          },
          "expectedOutput": "No discount"
        },
        {
          "input": {
            "price": 2000
          },
          "expectedOutput": "20% discount"
        },
        {
          "input": {
            "price": 1000
          },
          "expectedOutput": "10% discount"
        }
      ]
    }
  ]
};
