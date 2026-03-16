/** Topic: Conditionals (if, else if, else, nested) */
export default {
  "id": "conditionals",
  "title": "Conditionals (if, else if, else, nested)",
  "outcomes": [
    "The if Statement: Conditional Execution Syntax",
    "The else Block: Defining the \"Otherwise\" Path",
    "The else if Syntax: Expanding Decision Branches",
    "Nested Structures: Decisions inside Decisions",
  ],
  "outcome_messages": [
    "Let's use the if statement.\n\nAn if statement runs code only when a condition is true.\n\n## Syntax\n\n```text\nif (condition) {\n  code\n}\n```\n\nThe condition goes in parentheses; the code to run goes in curly braces. When the condition is false, the block is skipped.\n\n## Example\n\n```javascript\nconst age = 20;\nif (age >= 18) {\n  console.log(\"You can vote\");\n}\n```\n\n## Output\n\n```\nYou can vote\n```\n\nWith age 20, age >= 18 is true, so the message prints. If age were 15, the block would not run and nothing would print.\n\n## Practice\n\nIf num is -3, would the block inside `if (num > 0)` run?",
    "Let's add an else block.\n\nWhen you want one path when the condition is true and a different path when it is false, use `else`.\n\n## Syntax\n\n```text\nif (condition) {\n  code A\n} else {\n  code B\n}\n```\n\nIf the condition is true, code A runs; if false, code B runs. One of the two blocks always runs.\n\n## Example\n\n```javascript\nconst age = 16;\nif (age >= 18) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Minor\");\n}\n```\n\n## Output\n\n```\nMinor\n```\n\nWith age 16, the condition is false, so the else block runs and prints Minor. With age 20, the if block would run and print Adult.\n\n## Practice\n\nIf age is 16, which block runs—the if or the else?",
    "Let's add else if branches.\n\nWhen you have more than two cases, chain conditions with `else if`.\n\n## Syntax\n\n```text\nif (cond1) {\n  ...\n} else if (cond2) {\n  ...\n} else {\n  ...\n}\n```\n\nConditions are checked from top to bottom; the first one that is true runs, and the rest are skipped. Only one block runs.\n\n## Example\n\n```javascript\nconst score = 75;\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 80) {\n  console.log(\"B\");\n} else if (score >= 70) {\n  console.log(\"C\");\n} else if (score >= 60) {\n  console.log(\"D\");\n} else {\n  console.log(\"F\");\n}\n```\n\n## Output\n\n```\nC\n```\n\nScore 75 hits the third condition (score >= 70), so only \"C\" prints. The chain stops at the first true condition.\n\n## Practice\n\nFor score 75, what gets printed?",
    "Let's put an if inside an if.\n\nYou can place an if (or if/else) inside the block of another if. That is a nested condition: the inner condition is only checked when the outer condition is true. Use nesting when the second check only makes sense after the first passes (e.g. \"if old enough, then check if has license\").\n\n## Example\n\n```javascript\nconst age = 20;\nconst hasLicense = true;\nif (age >= 18) {\n  if (hasLicense) {\n    console.log(\"Can drive\");\n  } else {\n    console.log(\"Has age but no license\");\n  }\n} else {\n  console.log(\"Too young to drive\");\n}\n```\n\n## Output\n\n```\nCan drive\n```\n\nWith age 20 and hasLicense true, the outer condition is true, so we enter the block and check the inner if; hasLicense is true, so \"Can drive\" prints. The inner if runs only when the outer condition is true.\n\n## Practice\n\nFor age 20 and hasLicense true, what is printed?",
  ],
  "tasks": [
    {
      "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 20;\n\n// Check if age is 18 or greater\n// If true, print: \"You are eligible to vote\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const age = 20;\nif (age >= 18) {\n  console.log(\"You are eligible to vote\");\n}",
      "testCases": [
        {
          "input": {
            "age": 20
          },
          "expectedOutput": "You are eligible to vote"
        },
        {
          "input": {
            "age": 18
          },
          "expectedOutput": "You are eligible to vote"
        },
        {
          "input": {
            "age": 15
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "age": 0
          },
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
          "input": {
            "number": 10
          },
          "expectedOutput": "Even number"
        },
        {
          "input": {
            "number": 0
          },
          "expectedOutput": "Even number"
        },
        {
          "input": {
            "number": 7
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "number": -4
          },
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
          "input": {
            "str": "Hello"
          },
          "expectedOutput": "Long string"
        },
        {
          "input": {
            "str": "Test"
          },
          "expectedOutput": "Long string"
        },
        {
          "input": {
            "str": "Hi"
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "str": "Cat"
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "str": ""
          },
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
          "input": {
            "a": 8,
            "b": 12
          },
          "expectedOutput": "Both numbers are large"
        },
        {
          "input": {
            "a": 6,
            "b": 6
          },
          "expectedOutput": "Both numbers are large"
        },
        {
          "input": {
            "a": 4,
            "b": 10
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "a": 10,
            "b": 3
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "a": 2,
            "b": 3
          },
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
          "input": {
            "value": 5
          },
          "expectedOutput": "Truthy value"
        },
        {
          "input": {
            "value": "Hello"
          },
          "expectedOutput": "Truthy value"
        },
        {
          "input": {
            "value": 0
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "value": ""
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "value": null
          },
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
          "input": {
            "x": 10,
            "y": 20
          },
          "expectedOutput": "Sum is large"
        },
        {
          "input": {
            "x": 15,
            "y": 15
          },
          "expectedOutput": "Sum is large"
        },
        {
          "input": {
            "x": 10,
            "y": 15
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "x": 12,
            "y": 13
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "x": 13,
            "y": 13
          },
          "expectedOutput": "Sum is large"
        }
      ]
    },
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
    },
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
    },
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
