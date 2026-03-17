/** Topic: Numbers and Basic Arithmetic (numbers-and-basic-arithmetic) */
export default {
  "id": "numbers-and-basic-arithmetic",
  "title": "Numbers and Basic Arithmetic",
  "outcomes": [
    "Numbers",
    "Basic Arithmetic",
    "Modulo Operator",
    "Operator Precedence",
    "Compound assignment"
  ],
  "outcome_messages": [
    "Let's work with numbers.\n\nJavaScript has one number type: whole numbers (integers) and decimals both use the same type. You can use positive, negative, and decimal values.\n\n## Example\n\n```javascript\nconst a = 42;\nconst b = 3.14;\nconsole.log(a);\nconsole.log(b);\n```\n\n## Output\n\n```\n42\n3.14\n```\n\nNo quotes around numbers—they are values, not text. Integers and decimals are both numbers.\n\n## Practice\n\nWrite code that stores 42 and 3.14 and prints both.",
    "Let's use basic arithmetic.\n\nThe operators are `+` (add), `-` (subtract), `*` (multiply), and `/` (divide). They work on numbers and produce a number.\n\n## Example\n\n```javascript\nconsole.log(10 + 3);\nconsole.log(10 - 3);\nconsole.log(10 * 3);\nconsole.log(10 / 3);\n```\n\n## Output\n\n```\n13\n7\n30\n3.3333333333333335\n```\n\nDivision can produce a decimal. The result is computed and printed.\n\n## Practice\n\nWrite code that prints the result of 20 minus 7.",
    "Let's use the modulo operator.\n\n`%` gives the remainder after division. It is useful for getting the remainder—for example, checking if a number is even (remainder 0 when divided by 2), wrapping values, and more.\n\n## Example\n\n```javascript\nconsole.log(10 % 3);\nconsole.log(8 % 2);\nconsole.log(17 % 5);\n```\n\n## Output\n\n```\n1\n0\n2\n```\n\n10 divided by 3 is 3 with remainder 1. 8 divided by 2 has no remainder.\n\n## Practice\n\nWrite code that prints the remainder when 23 is divided by 4.",
    "Let's understand operator precedence.\n\nMultiplication and division happen before addition and subtraction. Use parentheses to change the order or make it clear.\n\n## Example\n\n```javascript\nconsole.log(2 + 3 * 4);\nconsole.log((2 + 3) * 4);\n```\n\n## Output\n\n```\n14\n20\n```\n\nIn the first line, 3 * 4 is done first, then 2 + 12. In the second, the parentheses force 2 + 3 first.\n\n## Practice\n\nCan you tell the values of (10 + 5) * 2 and 10 + (5 * 2)? Why are they different?",
    "Let's use compound assignment.\n\nYou can combine an operator with `=`: `+=`, `-=`, `*=`, `/=`. For example, `x += 5` means \"add 5 to x\" and is the same as `x = x + 5`.\n\n## Example\n\n```javascript\nlet n = 10;\nn += 3;\nconsole.log(n);\nn *= 2;\nconsole.log(n);\n```\n\n## Output\n\n```\n13\n26\n```\n\nThe variable is updated in place. Shorter and clear when you're changing a value by an amount.\n\n## Practice\n\nStart with a variable set to 10, use += to add 5, then print the value."
  ],
  "tasks": [
    {
      "description": "// Do not rename obtained and total, use them as input for your program.\n// While testing we will change their values.\nconst obtained = 427;\nconst total = 500;\n\n// Calculate the percentage: (obtained / total) * 100\n// Print the percentage value\n// For example, if obtained = 427 and total = 500, your output should be:\n// Percentage: 85.4",
      "solution_type": "script",
      "reference_solution": "const obtained = 427;\nconst total = 500;\nconst percentage = (obtained / total) * 100;\nconsole.log(\"Percentage:\", percentage);",
      "testCases": [
        {
          "input": {
            "obtained": 427,
            "total": 500
          },
          "expectedOutput": "Percentage: 85.4"
        },
        {
          "input": {
            "obtained": 360,
            "total": 400
          },
          "expectedOutput": "Percentage: 90"
        },
        {
          "input": {
            "obtained": 75,
            "total": 150
          },
          "expectedOutput": "Percentage: 50"
        },
        {
          "input": {
            "obtained": 500,
            "total": 500
          },
          "expectedOutput": "Percentage: 100"
        },
        {
          "input": {
            "obtained": 0,
            "total": 100
          },
          "expectedOutput": "Percentage: 0"
        },
        {
          "input": {
            "obtained": 33,
            "total": 100
          },
          "expectedOutput": "Percentage: 33"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// num will be a positive integer.\n// While testing we will change its value.\nconst num = 5847;\n\n// Extract and print the last digit of num\n// Hint: Use the modulo operator\n// For example, if num = 5847, your output should be:\n// Last digit of 5847 is 7",
      "solution_type": "script",
      "reference_solution": "const num = 5847;\nconst lastDigit = num % 10;\nconsole.log(\"Last digit of\", num, \"is\", lastDigit);",
      "testCases": [
        {
          "input": {
            "num": 5847
          },
          "expectedOutput": "Last digit of 5847 is 7"
        },
        {
          "input": {
            "num": 1234
          },
          "expectedOutput": "Last digit of 1234 is 4"
        },
        {
          "input": {
            "num": 9990
          },
          "expectedOutput": "Last digit of 9990 is 0"
        },
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "Last digit of 5 is 5"
        },
        {
          "input": {
            "num": 10000
          },
          "expectedOutput": "Last digit of 10000 is 0"
        }
      ]
    },
    {
      "description": "// Do not rename amount, use it as input for your program.\n// amount will be a positive integer representing total rupees.\n// While testing we will change its value.\nconst amount = 1847;\n\n// Break down the amount into 500, 100, 50, and remaining rupees\n// Calculate how many 500 notes, then from remainder how many 100 notes,\n// then from that remainder how many 50 notes, and finally the remaining amount\n// Print all four values in order\n// For example, if amount = 1847, your output should be:\n// 500 notes: 3\n// 100 notes: 3\n// 50 notes: 0\n// Remaining amount: 47",
      "solution_type": "script",
      "reference_solution": "const amount = 1847;\nconst notes500 = (amount - amount % 500) / 500;\nlet remainder = amount % 500;\nconst notes100 = (remainder - remainder % 100) / 100;\nremainder = remainder % 100;\nconst notes50 = (remainder - remainder % 50) / 50;\nremainder = remainder % 50;\nconsole.log(\"500 notes:\", notes500);\nconsole.log(\"100 notes:\", notes100);\nconsole.log(\"50 notes:\", notes50);\nconsole.log(\"Remaining amount:\", remainder);",
      "testCases": [
        {
          "input": {
            "amount": 1847
          },
          "expectedOutput": "500 notes: 3\n100 notes: 3\n50 notes: 0\nRemaining amount: 47"
        },
        {
          "input": {
            "amount": 2750
          },
          "expectedOutput": "500 notes: 5\n100 notes: 2\n50 notes: 1\nRemaining amount: 0"
        },
        {
          "input": {
            "amount": 649
          },
          "expectedOutput": "500 notes: 1\n100 notes: 1\n50 notes: 0\nRemaining amount: 49"
        },
        {
          "input": {
            "amount": 25
          },
          "expectedOutput": "500 notes: 0\n100 notes: 0\n50 notes: 0\nRemaining amount: 25"
        },
        {
          "input": {
            "amount": 500
          },
          "expectedOutput": "500 notes: 1\n100 notes: 0\n50 notes: 0\nRemaining amount: 0"
        },
        {
          "input": {
            "amount": 3999
          },
          "expectedOutput": "500 notes: 7\n100 notes: 4\n50 notes: 1\nRemaining amount: 49"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 47;\n\n// Calculate the remainder when num is divided by 2\n// Print the remainder (0 for even, 1 for odd)\n// For example, if num = 47, your output should be:\n// Remainder: 1",
      "solution_type": "script",
      "reference_solution": "const num = 47;\nconst remainder = num % 2;\nconsole.log(\"Remainder:\", remainder);",
      "testCases": [
        {
          "input": {
            "num": 47
          },
          "expectedOutput": "Remainder: 1"
        },
        {
          "input": {
            "num": 100
          },
          "expectedOutput": "Remainder: 0"
        },
        {
          "input": {
            "num": 89
          },
          "expectedOutput": "Remainder: 1"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "Remainder: 0"
        },
        {
          "input": {
            "num": 1
          },
          "expectedOutput": "Remainder: 1"
        },
        {
          "input": {
            "num": 1000
          },
          "expectedOutput": "Remainder: 0"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// num will be a two-digit number.\n// While testing we will change its value.\nconst num = 73;\n\n// Reverse the digits and print the reversed number\n// Extract tens and units digits, then form reversed number\n// For example, if num = 73, your output should be:\n// Reversed number: 37",
      "solution_type": "script",
      "reference_solution": "const num = 73;\nconst tens = (num - num % 10) / 10;\nconst units = num % 10;\nconst reversed = units * 10 + tens;\nconsole.log(\"Reversed number:\", reversed);",
      "testCases": [
        {
          "input": {
            "num": 73
          },
          "expectedOutput": "Reversed number: 37"
        },
        {
          "input": {
            "num": 45
          },
          "expectedOutput": "Reversed number: 54"
        },
        {
          "input": {
            "num": 91
          },
          "expectedOutput": "Reversed number: 19"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "Reversed number: 1"
        },
        {
          "input": {
            "num": 99
          },
          "expectedOutput": "Reversed number: 99"
        },
        {
          "input": {
            "num": 20
          },
          "expectedOutput": "Reversed number: 2"
        }
      ]
    },
    {
      "description": "// Do not rename principal and rate, use them as input for your program.\n// While testing we will change their values.\nconst principal = 10000;\nconst rate = 8;\n\n// Calculate the amount after 1 year with compound interest\n// Formula: principal * (1 + rate/100)\n// Print the final amount\n// For example, if principal = 10000 and rate = 8, your output should be:\n// Final amount: 10800",
      "solution_type": "script",
      "reference_solution": "const principal = 10000;\nconst rate = 8;\nconst amount = principal * (1 + rate / 100);\nconsole.log(\"Final amount:\", amount);",
      "testCases": [
        {
          "input": {
            "principal": 10000,
            "rate": 8
          },
          "expectedOutput": "Final amount: 10800"
        },
        {
          "input": {
            "principal": 5000,
            "rate": 10
          },
          "expectedOutput": "Final amount: 5500"
        },
        {
          "input": {
            "principal": 20000,
            "rate": 5
          },
          "expectedOutput": "Final amount: 21000"
        },
        {
          "input": {
            "principal": 1000,
            "rate": 0
          },
          "expectedOutput": "Final amount: 1000"
        },
        {
          "input": {
            "principal": 15000,
            "rate": 12
          },
          "expectedOutput": "Final amount: 16800"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, d, use them as input for your program.\n// While testing we will change their values.\nconst a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\n\n// Calculate: a + b * c - d\n// Then calculate: (a + b) * (c - d)\n// Print both results\n// For example, if a = 10, b = 5, c = 3, d = 2, your output should be:\n// Without parentheses: 23\n// With parentheses: 15",
      "solution_type": "script",
      "reference_solution": "const a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\nconst withoutParentheses = a + b * c - d;\nconst withParentheses = (a + b) * (c - d);\nconsole.log(\"Without parentheses:\", withoutParentheses);\nconsole.log(\"With parentheses:\", withParentheses);",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 5,
            "c": 3,
            "d": 2
          },
          "expectedOutput": "Without parentheses: 23\nWith parentheses: 15"
        },
        {
          "input": {
            "a": 20,
            "b": 4,
            "c": 5,
            "d": 3
          },
          "expectedOutput": "Without parentheses: 37\nWith parentheses: 48"
        },
        {
          "input": {
            "a": 8,
            "b": 6,
            "c": 2,
            "d": 1
          },
          "expectedOutput": "Without parentheses: 19\nWith parentheses: 14"
        },
        {
          "input": {
            "a": 0,
            "b": 0,
            "c": 0,
            "d": 0
          },
          "expectedOutput": "Without parentheses: 0\nWith parentheses: 0"
        },
        {
          "input": {
            "a": 100,
            "b": 10,
            "c": 2,
            "d": 1
          },
          "expectedOutput": "Without parentheses: 119\nWith parentheses: 110"
        },
        {
          "input": {
            "a": 5,
            "b": 3,
            "c": 3,
            "d": 3
          },
          "expectedOutput": "Without parentheses: 11\nWith parentheses: 0"
        }
      ]
    },
    {
      "description": "// Do not rename hours, minutes, seconds, use them as input for your program.\n// While testing we will change their values.\nconst hours = 2;\nconst minutes = 15;\nconst seconds = 30;\n\n// Convert the total time to seconds\n// 1 hour = 3600 seconds, 1 minute = 60 seconds\n// Print total seconds\n// For example, if hours = 2, minutes = 15, seconds = 30, your output should be:\n// Total seconds: 8130",
      "solution_type": "script",
      "reference_solution": "const hours = 2;\nconst minutes = 15;\nconst seconds = 30;\nconst totalSeconds = hours * 3600 + minutes * 60 + seconds;\nconsole.log(\"Total seconds:\", totalSeconds);",
      "testCases": [
        {
          "input": {
            "hours": 2,
            "minutes": 15,
            "seconds": 30
          },
          "expectedOutput": "Total seconds: 8130"
        },
        {
          "input": {
            "hours": 1,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "Total seconds: 3600"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 45,
            "seconds": 20
          },
          "expectedOutput": "Total seconds: 2720"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "Total seconds: 0"
        },
        {
          "input": {
            "hours": 24,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "Total seconds: 86400"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 1,
            "seconds": 1
          },
          "expectedOutput": "Total seconds: 61"
        }
      ]
    },
    {
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n\n// Calculate the area of a circle: π * radius * radius\n// Use 3.14159 as the value of π\n// Print the area\n// For example, if radius = 7, your output should be:\n// 153.93804",
      "solution_type": "script",
      "reference_solution": "const radius = 7;\nconst pi = 3.14159;\nconst area = pi * radius * radius;\nconsole.log(\"Area:\", area);",
      "testCases": [
        {
          "input": {
            "radius": 7
          },
          "expectedOutput": "Area: 153.93804"
        },
        {
          "input": {
            "radius": 10
          },
          "expectedOutput": "Area: 314.159"
        },
        {
          "input": {
            "radius": 5
          },
          "expectedOutput": "Area: 78.53975"
        },
        {
          "input": {
            "radius": 1
          },
          "expectedOutput": "Area: 3.14159"
        },
        {
          "input": {
            "radius": 0
          },
          "expectedOutput": "Area: 0"
        },
        {
          "input": {
            "radius": 100
          },
          "expectedOutput": "Area: 31415.9"
        }
      ]
    },
    {
      "description": "// Do not rename costPrice and sellingPrice, use them as input for your program.\n// While testing we will change their values.\nconst costPrice = 850;\nconst sellingPrice = 1020;\n\n// Calculate the profit or loss amount (sellingPrice - costPrice)\n// Then calculate the profit/loss percentage: (difference / costPrice) * 100\n// Print the amount first, then the percentage\n// For example, if costPrice = 850 and sellingPrice = 1020, your output should be:\n// Profit/Loss amount: 170\n// Profit/Loss percentage: 20",
      "solution_type": "script",
      "reference_solution": "const costPrice = 850;\nconst sellingPrice = 1020;\nconst difference = sellingPrice - costPrice;\nconst percentage = (difference / costPrice) * 100;\nconsole.log(\"Profit/Loss amount:\", difference);\nconsole.log(\"Profit/Loss percentage:\", percentage);",
      "testCases": [
        {
          "input": {
            "costPrice": 850,
            "sellingPrice": 1020
          },
          "expectedOutput": "Profit/Loss amount: 170\nProfit/Loss percentage: 20"
        },
        {
          "input": {
            "costPrice": 1000,
            "sellingPrice": 1200
          },
          "expectedOutput": "Profit/Loss amount: 200\nProfit/Loss percentage: 20"
        },
        {
          "input": {
            "costPrice": 500,
            "sellingPrice": 400
          },
          "expectedOutput": "Profit/Loss amount: -100\nProfit/Loss percentage: -20"
        },
        {
          "input": {
            "costPrice": 1000,
            "sellingPrice": 1000
          },
          "expectedOutput": "Profit/Loss amount: 0\nProfit/Loss percentage: 0"
        },
        {
          "input": {
            "costPrice": 200,
            "sellingPrice": 300
          },
          "expectedOutput": "Profit/Loss amount: 100\nProfit/Loss percentage: 50"
        },
        {
          "input": {
            "costPrice": 1500,
            "sellingPrice": 1200
          },
          "expectedOutput": "Profit/Loss amount: -300\nProfit/Loss percentage: -20"
        }
      ]
    },
  ]
};
