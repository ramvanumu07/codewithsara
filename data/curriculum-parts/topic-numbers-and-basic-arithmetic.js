/** Topic: Numbers and Basic Arithmetic (numbers-and-basic-arithmetic) */
export default {
  "id": "numbers-and-basic-arithmetic",
  "title": "Numbers and Basic Arithmetic",
  "outcomes": [
    "Numbers",
    "Basic Arithmetic",
    "Modulo Operator",
    "Operator Precedence",
    "Compound Logic"
  ],
  "outcome_messages": [
    "Let's work with numbers.\n\nJavaScript has one number type: whole numbers (integers) and decimals both use the same type. You can use positive, negative, and decimal values.\n\n**Example**\n\n```javascript\nconst a = 42;\nconst b = 3.14;\nconsole.log(a);    // 42\nconsole.log(b);    // 3.14\n```\n\nNo quotes around numbers—they are values, not text. Integers and decimals are both numbers.\n\n**Practice**\n\nWrite code that stores two numbers and prints their sum.",
    "Let's use basic arithmetic.\n\nThe operators are `+` (add), `-` (subtract), `*` (multiply), and `/` (divide). They work on numbers and produce a number.\n\n**Example**\n\n```javascript\nconsole.log(10 + 3);    // 13\nconsole.log(10 - 3);    // 7\nconsole.log(10 * 3);    // 30\nconsole.log(10 / 3);    // 3.3333333333333335\n```\n\nDivision can produce a decimal. The result is computed and printed.\n\n**Practice**\n\nWrite code that prints the result of 20 minus 7.",
    "Let's use the modulo operator.\n\n`%` gives the remainder after division. It is useful for checking if a number is even (remainder 0 when divided by 2) or for wrapping values.\n\n**Example**\n\n```javascript\nconsole.log(10 % 3);    // 1\nconsole.log(8 % 2);     // 0\nconsole.log(17 % 5);    // 2\n```\n\n10 divided by 3 is 3 with remainder 1. 8 divided by 2 has no remainder.\n\n**Practice**\n\nWrite code that prints the remainder when 23 is divided by 4.",
    "Let's understand operator precedence.\n\nMultiplication and division happen before addition and subtraction. Use parentheses to change the order or make it clear.\n\n**Example**\n\n```javascript\nconsole.log(2 + 3 * 4);      // 14\nconsole.log((2 + 3) * 4);    // 20\n```\n\nIn the first line, 3 * 4 is done first, then 2 + 12. In the second, the parentheses force 2 + 3 first.\n\n**Practice**\n\nWrite code that prints the result of (10 + 5) * 2.",
    "Let's use compound assignment.\n\nYou can combine an operator with `=`: `+=`, `-=`, `*=`, `/=`. For example, `x += 5` means \"add 5 to x\" and is the same as `x = x + 5`.\n\n**Example**\n\n```javascript\nlet n = 10;\nn += 3;\nconsole.log(n);    // 13\nn *= 2;\nconsole.log(n);    // 26\n```\n\nThe variable is updated in place. Shorter and clear when you're changing a value by an amount.\n\n**Practice**\n\nWrite code that uses `+=` to add 5 to a variable and prints it."
  ],
  "tasks": [
    {
      "description": "// Do not rename obtained and total, use them as input for your program.\n// While testing we will change their values.\nconst obtained = 427;\nconst total = 500;\n\n// Calculate the percentage: (obtained / total) * 100\n// Print the percentage value\n// For example, if obtained = 427 and total = 500, your output should be:\n// 85.4",
      "solution_type": "script",
      "reference_solution": "const obtained = 427;\nconst total = 500;\nconst percentage = (obtained / total) * 100;\nconsole.log(percentage);",
      "testCases": [
        {
          "input": {
            "obtained": 427,
            "total": 500
          },
          "expectedOutput": "85.4"
        },
        {
          "input": {
            "obtained": 360,
            "total": 400
          },
          "expectedOutput": "90"
        },
        {
          "input": {
            "obtained": 75,
            "total": 150
          },
          "expectedOutput": "50"
        },
        {
          "input": {
            "obtained": 500,
            "total": 500
          },
          "expectedOutput": "100"
        },
        {
          "input": {
            "obtained": 0,
            "total": 100
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "obtained": 33,
            "total": 100
          },
          "expectedOutput": "33"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// num will be a positive integer.\n// While testing we will change its value.\nconst num = 5847;\n\n// Extract and print the last digit of num\n// Hint: Use the modulo operator\n// For example, if num = 5847, your output should be:\n// 7",
      "solution_type": "script",
      "reference_solution": "const num = 5847;\nconst lastDigit = num % 10;\nconsole.log(lastDigit);",
      "testCases": [
        {
          "input": {
            "num": 5847
          },
          "expectedOutput": "7"
        },
        {
          "input": {
            "num": 1234
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "num": 9990
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "num": 5
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "num": 10000
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "// Do not rename amount, use it as input for your program.\n// amount will be a positive integer representing total rupees.\n// While testing we will change its value.\nconst amount = 1847;\n\n// Break down the amount into 500, 100, 50, and remaining rupees\n// Calculate how many 500 notes, then from remainder how many 100 notes,\n// then from that remainder how many 50 notes, and finally the remaining amount\n// Print all four values in order\n// For example, if amount = 1847, your output should be:\n// 3\n// 3\n// 0\n// 47",
      "solution_type": "script",
      "reference_solution": "const amount = 1847;\nconst notes500 = (amount - amount % 500) / 500;\nlet remainder = amount % 500;\nconst notes100 = (remainder - remainder % 100) / 100;\nremainder = remainder % 100;\nconst notes50 = (remainder - remainder % 50) / 50;\nremainder = remainder % 50;\nconsole.log(notes500);\nconsole.log(notes100);\nconsole.log(notes50);\nconsole.log(remainder);",
      "testCases": [
        {
          "input": {
            "amount": 1847
          },
          "expectedOutput": "3\n3\n0\n47"
        },
        {
          "input": {
            "amount": 2750
          },
          "expectedOutput": "5\n2\n1\n0"
        },
        {
          "input": {
            "amount": 649
          },
          "expectedOutput": "1\n1\n0\n49"
        },
        {
          "input": {
            "amount": 25
          },
          "expectedOutput": "0\n0\n0\n25"
        },
        {
          "input": {
            "amount": 500
          },
          "expectedOutput": "1\n0\n0\n0"
        },
        {
          "input": {
            "amount": 3999
          },
          "expectedOutput": "7\n4\n1\n49"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 47;\n\n// Calculate the remainder when num is divided by 2\n// Print the remainder (0 for even, 1 for odd)\n// For example, if num = 47, your output should be:\n// 1",
      "solution_type": "script",
      "reference_solution": "const num = 47;\nconst remainder = num % 2;\nconsole.log(remainder);",
      "testCases": [
        {
          "input": {
            "num": 47
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 100
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "num": 89
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "num": 1
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 1000
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// num will be a two-digit number.\n// While testing we will change its value.\nconst num = 73;\n\n// Reverse the digits and print the reversed number\n// Extract tens and units digits, then form reversed number\n// For example, if num = 73, your output should be:\n// 37",
      "solution_type": "script",
      "reference_solution": "const num = 73;\nconst tens = (num - num % 10) / 10;\nconst units = num % 10;\nconst reversed = units * 10 + tens;\nconsole.log(reversed);",
      "testCases": [
        {
          "input": {
            "num": 73
          },
          "expectedOutput": "37"
        },
        {
          "input": {
            "num": 45
          },
          "expectedOutput": "54"
        },
        {
          "input": {
            "num": 91
          },
          "expectedOutput": "19"
        },
        {
          "input": {
            "num": 10
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "num": 99
          },
          "expectedOutput": "99"
        },
        {
          "input": {
            "num": 20
          },
          "expectedOutput": "2"
        }
      ]
    },
    {
      "description": "// Do not rename principal and rate, use them as input for your program.\n// While testing we will change their values.\nconst principal = 10000;\nconst rate = 8;\n\n// Calculate the amount after 1 year with compound interest\n// Formula: principal * (1 + rate/100)\n// Print the final amount\n// For example, if principal = 10000 and rate = 8, your output should be:\n// 10800",
      "solution_type": "script",
      "reference_solution": "const principal = 10000;\nconst rate = 8;\nconst amount = principal * (1 + rate / 100);\nconsole.log(amount);",
      "testCases": [
        {
          "input": {
            "principal": 10000,
            "rate": 8
          },
          "expectedOutput": "10800"
        },
        {
          "input": {
            "principal": 5000,
            "rate": 10
          },
          "expectedOutput": "5500"
        },
        {
          "input": {
            "principal": 20000,
            "rate": 5
          },
          "expectedOutput": "21000"
        },
        {
          "input": {
            "principal": 1000,
            "rate": 0
          },
          "expectedOutput": "1000"
        },
        {
          "input": {
            "principal": 15000,
            "rate": 12
          },
          "expectedOutput": "16800"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, d, use them as input for your program.\n// While testing we will change their values.\nconst a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\n\n// Calculate: a + b * c - d\n// Then calculate: (a + b) * (c - d)\n// Print both results\n// For example, if a = 10, b = 5, c = 3, d = 2, your output should be:\n// 23\n// 15",
      "solution_type": "script",
      "reference_solution": "const a = 10;\nconst b = 5;\nconst c = 3;\nconst d = 2;\nconst withoutParentheses = a + b * c - d;\nconst withParentheses = (a + b) * (c - d);\nconsole.log(withoutParentheses);\nconsole.log(withParentheses);",
      "testCases": [
        {
          "input": {
            "a": 10,
            "b": 5,
            "c": 3,
            "d": 2
          },
          "expectedOutput": "23\n15"
        },
        {
          "input": {
            "a": 20,
            "b": 4,
            "c": 5,
            "d": 3
          },
          "expectedOutput": "37\n48"
        },
        {
          "input": {
            "a": 8,
            "b": 6,
            "c": 2,
            "d": 1
          },
          "expectedOutput": "19\n14"
        },
        {
          "input": {
            "a": 0,
            "b": 0,
            "c": 0,
            "d": 0
          },
          "expectedOutput": "0\n0"
        },
        {
          "input": {
            "a": 100,
            "b": 10,
            "c": 2,
            "d": 1
          },
          "expectedOutput": "119\n110"
        },
        {
          "input": {
            "a": 5,
            "b": 3,
            "c": 3,
            "d": 3
          },
          "expectedOutput": "11\n0"
        }
      ]
    },
    {
      "description": "// Do not rename hours, minutes, seconds, use them as input for your program.\n// While testing we will change their values.\nconst hours = 2;\nconst minutes = 15;\nconst seconds = 30;\n\n// Convert the total time to seconds\n// 1 hour = 3600 seconds, 1 minute = 60 seconds\n// Print total seconds\n// For example, if hours = 2, minutes = 15, seconds = 30, your output should be:\n// 8130",
      "solution_type": "script",
      "reference_solution": "const hours = 2;\nconst minutes = 15;\nconst seconds = 30;\nconst totalSeconds = hours * 3600 + minutes * 60 + seconds;\nconsole.log(totalSeconds);",
      "testCases": [
        {
          "input": {
            "hours": 2,
            "minutes": 15,
            "seconds": 30
          },
          "expectedOutput": "8130"
        },
        {
          "input": {
            "hours": 1,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "3600"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 45,
            "seconds": 20
          },
          "expectedOutput": "2720"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "hours": 24,
            "minutes": 0,
            "seconds": 0
          },
          "expectedOutput": "86400"
        },
        {
          "input": {
            "hours": 0,
            "minutes": 1,
            "seconds": 1
          },
          "expectedOutput": "61"
        }
      ]
    },
    {
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n\n// Calculate the area of a circle: π * radius * radius\n// Use 3.14159 as the value of π\n// Print the area\n// For example, if radius = 7, your output should be:\n// 153.93804",
      "solution_type": "script",
      "reference_solution": "const radius = 7;\nconst pi = 3.14159;\nconst area = pi * radius * radius;\nconsole.log(area);",
      "testCases": [
        {
          "input": {
            "radius": 7
          },
          "expectedOutput": "153.93804"
        },
        {
          "input": {
            "radius": 10
          },
          "expectedOutput": "314.159"
        },
        {
          "input": {
            "radius": 5
          },
          "expectedOutput": "78.53975"
        },
        {
          "input": {
            "radius": 1
          },
          "expectedOutput": "3.14159"
        },
        {
          "input": {
            "radius": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "radius": 100
          },
          "expectedOutput": "31415.9"
        }
      ]
    },
    {
      "description": "// Do not rename costPrice and sellingPrice, use them as input for your program.\n// While testing we will change their values.\nconst costPrice = 850;\nconst sellingPrice = 1020;\n\n// Calculate the profit or loss amount (sellingPrice - costPrice)\n// Then calculate the profit/loss percentage: (difference / costPrice) * 100\n// Print the amount first, then the percentage\n// For example, if costPrice = 850 and sellingPrice = 1020, your output should be:\n// 170\n// 20",
      "solution_type": "script",
      "reference_solution": "const costPrice = 850;\nconst sellingPrice = 1020;\nconst difference = sellingPrice - costPrice;\nconst percentage = (difference / costPrice) * 100;\nconsole.log(difference);\nconsole.log(percentage);",
      "testCases": [
        {
          "input": {
            "costPrice": 850,
            "sellingPrice": 1020
          },
          "expectedOutput": "170\n20"
        },
        {
          "input": {
            "costPrice": 1000,
            "sellingPrice": 1200
          },
          "expectedOutput": "200\n20"
        },
        {
          "input": {
            "costPrice": 500,
            "sellingPrice": 400
          },
          "expectedOutput": "-100\n-20"
        },
        {
          "input": {
            "costPrice": 1000,
            "sellingPrice": 1000
          },
          "expectedOutput": "0\n0"
        },
        {
          "input": {
            "costPrice": 200,
            "sellingPrice": 300
          },
          "expectedOutput": "100\n50"
        },
        {
          "input": {
            "costPrice": 1500,
            "sellingPrice": 1200
          },
          "expectedOutput": "-300\n-20"
        }
      ]
    },
    {
      "description": "// Do not rename weight and height, use them as input for your program.\n// weight is in kilograms, height is in meters.\n// While testing we will change their values.\nconst weight = 70;\nconst height = 1.75;\n\n// Calculate BMI: weight / (height * height)\n// Print the BMI value\n// For example, if weight = 70 and height = 1.75, your output should be:\n// 22.857142857142858",
      "solution_type": "script",
      "reference_solution": "const weight = 70;\nconst height = 1.75;\nconst bmi = weight / (height * height);\nconsole.log(bmi);",
      "testCases": [
        {
          "input": {
            "weight": 70,
            "height": 1.75
          },
          "expectedOutput": "22.857142857142858"
        },
        {
          "input": {
            "weight": 80,
            "height": 1.8
          },
          "expectedOutput": "24.691358024691358"
        },
        {
          "input": {
            "weight": 60,
            "height": 1.65
          },
          "expectedOutput": "22.038567493112947"
        },
        {
          "input": {
            "weight": 100,
            "height": 2
          },
          "expectedOutput": "25"
        },
        {
          "input": {
            "weight": 50,
            "height": 1.5
          },
          "expectedOutput": "22.22222222222222"
        },
        {
          "input": {
            "weight": 90,
            "height": 1.9
          },
          "expectedOutput": "24.930747922437675"
        }
      ]
    }
  ]
};
