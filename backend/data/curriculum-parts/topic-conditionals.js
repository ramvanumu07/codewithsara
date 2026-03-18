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
      "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 20;\n// Check if age is 18 or greater\n// If true, print: \"You are eligible to vote\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const age = 20;\nif (age >= 18) {\n  console.log(\"You are eligible to vote\");\n}",
      "testCases": [
        { "input": { "age": 20 }, "expectedOutput": "You are eligible to vote" },
        { "input": { "age": 18 }, "expectedOutput": "You are eligible to vote" },
        { "input": { "age": 15 }, "expectedOutput": "" },
        { "input": { "age": 0 }, "expectedOutput": "" }
      ]
    },
    {
      "description": "// Do not rename a and b, use them as input for your program.\n// While testing we will change their values.\nconst a = 8;\nconst b = 12;\n// Check if both a and b are greater than 5\n// If true, print: \"Both numbers are large\"\n// If false, print nothing",
      "solution_type": "script",
      "reference_solution": "const a = 8;\nconst b = 12;\nif (a > 5 && b > 5) {\n  console.log(\"Both numbers are large\");\n}",
      "testCases": [
        { "input": { "a": 8, "b": 12 }, "expectedOutput": "Both numbers are large" },
        { "input": { "a": 6, "b": 6 }, "expectedOutput": "Both numbers are large" },
        { "input": { "a": 4, "b": 10 }, "expectedOutput": "" },
        { "input": { "a": 10, "b": 3 }, "expectedOutput": "" },
        { "input": { "a": 2, "b": 3 }, "expectedOutput": "" }
      ]
    },
    {
      "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 7;\n// Check if number is even or odd\n// If even, print: \"Even\"\n// Otherwise, print: \"Odd\"",
      "solution_type": "script",
      "reference_solution": "const number = 7;\nif (number % 2 === 0) {\n  console.log(\"Even\");\n} else {\n  console.log(\"Odd\");\n}",
      "testCases": [
        { "input": { "number": 7 }, "expectedOutput": "Odd" },
        { "input": { "number": 10 }, "expectedOutput": "Even" },
        { "input": { "number": 0 }, "expectedOutput": "Even" },
        { "input": { "number": -3 }, "expectedOutput": "Odd" }
      ]
    },
    {
      "description": "// Do not rename age, use it as input for your program.\n// While testing we will change its value.\nconst age = 16;\n// Check if age is 18 or greater\n// If true, print: \"Adult\"\n// Otherwise, print: \"Minor\"",
      "solution_type": "script",
      "reference_solution": "const age = 16;\nif (age >= 18) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Minor\");\n}",
      "testCases": [
        { "input": { "age": 16 }, "expectedOutput": "Minor" },
        { "input": { "age": 18 }, "expectedOutput": "Adult" },
        { "input": { "age": 25 }, "expectedOutput": "Adult" },
        { "input": { "age": 0 }, "expectedOutput": "Minor" }
      ]
    },
    {
      "description": "// Do not rename score, use it as input for your program.\n// While testing we will change its value.\nconst score = 75;\n// Check the grade based on score:\n// If score >= 90, print: \"A\"\n// Else if score >= 80, print: \"B\"\n// Else if score >= 70, print: \"C\"\n// Else if score >= 60, print: \"D\"\n// Otherwise, print: \"F\"",
      "solution_type": "script",
      "reference_solution": "const score = 75;\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 80) {\n  console.log(\"B\");\n} else if (score >= 70) {\n  console.log(\"C\");\n} else if (score >= 60) {\n  console.log(\"D\");\n} else {\n  console.log(\"F\");\n}",
      "testCases": [
        { "input": { "score": 75 }, "expectedOutput": "C" },
        { "input": { "score": 95 }, "expectedOutput": "A" },
        { "input": { "score": 85 }, "expectedOutput": "B" },
        { "input": { "score": 60 }, "expectedOutput": "D" },
        { "input": { "score": 55 }, "expectedOutput": "F" },
        { "input": { "score": 90 }, "expectedOutput": "A" }
      ]
    },
    {
      "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 0;\n// Classify the number:\n// If number > 0, print: \"Positive\"\n// Else if number < 0, print: \"Negative\"\n// Otherwise, print: \"Zero\"",
      "solution_type": "script",
      "reference_solution": "const number = 0;\nif (number > 0) {\n  console.log(\"Positive\");\n} else if (number < 0) {\n  console.log(\"Negative\");\n} else {\n  console.log(\"Zero\");\n}",
      "testCases": [
        { "input": { "number": 0 }, "expectedOutput": "Zero" },
        { "input": { "number": 10 }, "expectedOutput": "Positive" },
        { "input": { "number": -5 }, "expectedOutput": "Negative" },
        { "input": { "number": 100 }, "expectedOutput": "Positive" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 15;\n// Check divisibility (order matters!):\n// If num is divisible by 15, print: \"Divisible by 15\"\n// Else if num is divisible by 5, print: \"Divisible by 5\"\n// Else if num is divisible by 3, print: \"Divisible by 3\"\n// Otherwise, print: \"Not divisible by 3, 5, or 15\"\n// Note: This demonstrates why condition order matters",
      "solution_type": "script",
      "reference_solution": "const num = 15;\nif (num % 15 === 0) {\n  console.log(\"Divisible by 15\");\n} else if (num % 5 === 0) {\n  console.log(\"Divisible by 5\");\n} else if (num % 3 === 0) {\n  console.log(\"Divisible by 3\");\n} else {\n  console.log(\"Not divisible by 3, 5, or 15\");\n}",
      "testCases": [
        { "input": { "num": 15 }, "expectedOutput": "Divisible by 15" },
        { "input": { "num": 10 }, "expectedOutput": "Divisible by 5" },
        { "input": { "num": 9 }, "expectedOutput": "Divisible by 3" },
        { "input": { "num": 30 }, "expectedOutput": "Divisible by 15" },
        { "input": { "num": 7 }, "expectedOutput": "Not divisible by 3, 5, or 15" },
        { "input": { "num": 25 }, "expectedOutput": "Divisible by 5" }
      ]
    },
    {
      "description": "// Do not rename age and hasLicense, use them as input for your program.\n// While testing we will change their values.\nconst age = 20;\nconst hasLicense = true;\n// Check if person can drive:\n// First check if age >= 18\n//   If true, then check if hasLicense is true\n//     If true, print: \"Can drive\"\n//     Otherwise, print: \"Has age but no license\"\n//   Otherwise, print: \"Too young to drive\"",
      "solution_type": "script",
      "reference_solution": "const age = 20;\nconst hasLicense = true;\nif (age >= 18) {\n  if (hasLicense) {\n    console.log(\"Can drive\");\n  } else {\n    console.log(\"Has age but no license\");\n  }\n} else {\n  console.log(\"Too young to drive\");\n}",
      "testCases": [
        { "input": { "age": 20, "hasLicense": true }, "expectedOutput": "Can drive" },
        { "input": { "age": 20, "hasLicense": false }, "expectedOutput": "Has age but no license" },
        { "input": { "age": 16, "hasLicense": true }, "expectedOutput": "Too young to drive" },
        { "input": { "age": 16, "hasLicense": false }, "expectedOutput": "Too young to drive" },
        { "input": { "age": 18, "hasLicense": true }, "expectedOutput": "Can drive" }
      ]
    },
    {
      "description": "// Do not rename number, use it as input for your program.\n// While testing we will change its value.\nconst number = 12;\n// Check if number is positive and even:\n// First check if number > 0\n//   If true, then check if number is even (divisible by 2)\n//     If true, print: \"Positive even number\"\n//     Otherwise, print: \"Positive odd number\"\n//   Otherwise, print: \"Not positive\"",
      "solution_type": "script",
      "reference_solution": "const number = 12;\nif (number > 0) {\n  if (number % 2 === 0) {\n    console.log(\"Positive even number\");\n  } else {\n    console.log(\"Positive odd number\");\n  }\n} else {\n  console.log(\"Not positive\");\n}",
      "testCases": [
        { "input": { "number": 12 }, "expectedOutput": "Positive even number" },
        { "input": { "number": 7 }, "expectedOutput": "Positive odd number" },
        { "input": { "number": -5 }, "expectedOutput": "Not positive" },
        { "input": { "number": 0 }, "expectedOutput": "Not positive" },
        { "input": { "number": 10 }, "expectedOutput": "Positive even number" }
      ]
    },
    {
      "description": "// Do not rename score and attendance, use them as input for your program.\n// While testing we will change their values.\nconst score = 85;\nconst attendance = 90;\n// Determine if student passes with distinction:\n// First check if score >= 75\n//   If true, then check if attendance >= 80\n//     If true, print: \"Pass with distinction\"\n//     Otherwise, print: \"Pass but low attendance\"\n//   Otherwise, print: \"Fail\"",
      "solution_type": "script",
      "reference_solution": "const score = 85;\nconst attendance = 90;\nif (score >= 75) {\n  if (attendance >= 80) {\n    console.log(\"Pass with distinction\");\n  } else {\n    console.log(\"Pass but low attendance\");\n  }\n} else {\n  console.log(\"Fail\");\n}",
      "testCases": [
        { "input": { "score": 85, "attendance": 90 }, "expectedOutput": "Pass with distinction" },
        { "input": { "score": 80, "attendance": 70 }, "expectedOutput": "Pass but low attendance" },
        { "input": { "score": 60, "attendance": 95 }, "expectedOutput": "Fail" },
        { "input": { "score": 75, "attendance": 80 }, "expectedOutput": "Pass with distinction" },
        { "input": { "score": 90, "attendance": 75 }, "expectedOutput": "Pass but low attendance" }
      ]
    }
  ]
};
