/** Topic: Nested Conditions (nested-conditions) */
export default {
  "id": "nested-conditions",
  "title": "Nested Conditions",
  "outcomes": [
    "Nested Structures: Decisions inside Decisions",
    "Execution Hierarchy: Outer vs. Inner Flow",
    "Dependency Logic: Managing Complex Conditional Trees"
  ],
  "tasks": [
    {
      "description": "// Do not rename age and hasLicense, use them as input for your program.\n// While testing we will change their values.\nconst age = 20;\nconst hasLicense = true;\n\n// Check if person can drive:\n// First check if age >= 18\n//   If true, then check if hasLicense is true\n//     If true, print: \"Can drive\"\n//     Otherwise, print: \"Has age but no license\"\n//   Otherwise, print: \"Too young to drive\"",
      "solution_type": "script",
      "reference_solution": "const age = 20;\nconst hasLicense = true;\nif (age >= 18) {\n  if (hasLicense) {\n    console.log(\"Can drive\");\n  } else {\n    console.log(\"Has age but no license\");\n  }\n} else {\n  console.log(\"Too young to drive\");\n}",
      "testCases": [
        {
          "input": {
            "age": 20,
            "hasLicense": true
          },
          "expectedOutput": "Can drive"
        },
        {
          "input": {
            "age": 20,
            "hasLicense": false
          },
          "expectedOutput": "Has age but no license"
        },
        {
          "input": {
            "age": 16,
            "hasLicense": true
          },
          "expectedOutput": "Too young to drive"
        },
        {
          "input": {
            "age": 16,
            "hasLicense": false
          },
          "expectedOutput": "Too young to drive"
        },
        {
          "input": {
            "age": 18,
            "hasLicense": true
          },
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
          "input": {
            "number": 12
          },
          "expectedOutput": "Positive even number"
        },
        {
          "input": {
            "number": 7
          },
          "expectedOutput": "Positive odd number"
        },
        {
          "input": {
            "number": -5
          },
          "expectedOutput": "Not positive"
        },
        {
          "input": {
            "number": 0
          },
          "expectedOutput": "Not positive"
        },
        {
          "input": {
            "number": 10
          },
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
          "input": {
            "score": 85,
            "attendance": 90
          },
          "expectedOutput": "Pass with distinction"
        },
        {
          "input": {
            "score": 80,
            "attendance": 70
          },
          "expectedOutput": "Pass but low attendance"
        },
        {
          "input": {
            "score": 60,
            "attendance": 95
          },
          "expectedOutput": "Fail"
        },
        {
          "input": {
            "score": 75,
            "attendance": 80
          },
          "expectedOutput": "Pass with distinction"
        },
        {
          "input": {
            "score": 90,
            "attendance": 75
          },
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
          "input": {
            "temperature": 25,
            "isRaining": false
          },
          "expectedOutput": "Good day for outdoor activity"
        },
        {
          "input": {
            "temperature": 25,
            "isRaining": true
          },
          "expectedOutput": "Warm but raining"
        },
        {
          "input": {
            "temperature": 15,
            "isRaining": false
          },
          "expectedOutput": "Cold but dry"
        },
        {
          "input": {
            "temperature": 15,
            "isRaining": true
          },
          "expectedOutput": "Cold and raining"
        },
        {
          "input": {
            "temperature": 21,
            "isRaining": false
          },
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
          "input": {
            "age": 30,
            "income": 50000
          },
          "expectedOutput": "Eligible for loan"
        },
        {
          "input": {
            "age": 30,
            "income": 20000
          },
          "expectedOutput": "Age OK but income too low"
        },
        {
          "input": {
            "age": 65,
            "income": 50000
          },
          "expectedOutput": "Too old"
        },
        {
          "input": {
            "age": 18,
            "income": 50000
          },
          "expectedOutput": "Too young"
        },
        {
          "input": {
            "age": 21,
            "income": 30000
          },
          "expectedOutput": "Eligible for loan"
        },
        {
          "input": {
            "age": 60,
            "income": 40000
          },
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
          "input": {
            "num": 15
          },
          "expectedOutput": "Large positive"
        },
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "Small positive"
        },
        {
          "input": {
            "num": -8
          },
          "expectedOutput": "Negative"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "Zero"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "Small positive"
        },
        {
          "input": {
            "num": 11
          },
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
          "input": {
            "isMember": true,
            "purchaseAmount": 150
          },
          "expectedOutput": "20% member discount"
        },
        {
          "input": {
            "isMember": true,
            "purchaseAmount": 80
          },
          "expectedOutput": "10% member discount"
        },
        {
          "input": {
            "isMember": false,
            "purchaseAmount": 250
          },
          "expectedOutput": "5% non-member discount"
        },
        {
          "input": {
            "isMember": false,
            "purchaseAmount": 150
          },
          "expectedOutput": "No discount"
        },
        {
          "input": {
            "isMember": true,
            "purchaseAmount": 100
          },
          "expectedOutput": "20% member discount"
        },
        {
          "input": {
            "isMember": false,
            "purchaseAmount": 200
          },
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
          "input": {
            "year": 2024
          },
          "expectedOutput": "Leap year"
        },
        {
          "input": {
            "year": 2000
          },
          "expectedOutput": "Leap year"
        },
        {
          "input": {
            "year": 1900
          },
          "expectedOutput": "Not a leap year"
        },
        {
          "input": {
            "year": 2023
          },
          "expectedOutput": "Not a leap year"
        },
        {
          "input": {
            "year": 2020
          },
          "expectedOutput": "Leap year"
        },
        {
          "input": {
            "year": 1800
          },
          "expectedOutput": "Not a leap year"
        }
      ]
    }
  ]
};
