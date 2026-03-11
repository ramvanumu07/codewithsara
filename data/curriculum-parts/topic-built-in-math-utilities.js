/** Topic: Built-in Math Utilities (built-in-math-utilities) */
export default {
  "id": "built-in-math-utilities",
  "title": "Built-in Math Utilities",
  "outcomes": [
    "The Math Object: Static Utilities for Computation",
    "Rounding Logic: Math.round() and Math.trunc()",
    "Directional Rounding: Math.floor() and Math.ceil()",
    "Absolute Values and Distance: Math.abs()",
    "Powers and Roots: Math.pow() and Math.sqrt()",
    "Boundary Logic: Finding Math.min() and Math.max()",
    "Stochastic Logic: Generating Math.random()",
    "Formula Design: Scaling Random Numbers to a Range",
    "Mathematical Constants: Math.PI and Math.E"
  ],
  "outcome_messages": [
    "Let's use the Math object.\n\n`Math` gives you ready-made maths: rounding, square root, random numbers, and more. You call them as `Math.name(value)` or `Math.name()`.\n\n**Example**\n\n```javascript\nconsole.log(Math.sqrt(16));    // 4\nconsole.log(Math.abs(-7));     // 7\n```\n\nMath methods are static: you use `Math.` and the method name. They take values and return a result.\n\n**Practice**\n\nWrite code that prints the square root of 25 using Math.",
    "Let's round numbers with Math.round() and Math.trunc().\n\n`Math.round(x)` rounds to the nearest integer (0.5 goes up). `Math.trunc(x)` drops the decimal part and keeps the integer part.\n\n**Example**\n\n```javascript\nconsole.log(Math.round(4.7));    // 5\nconsole.log(Math.round(4.3));    // 4\nconsole.log(Math.trunc(4.9));    // 4\nconsole.log(Math.trunc(-4.9));   // -4\n```\n\nRound moves to nearest; trunc always cuts toward zero. For positive numbers, trunc is like \"floor\"; for negatives, they differ.\n\n**Practice**\n\nWrite code that prints Math.trunc of 9.7.",
    "Let's use Math.floor() and Math.ceil().\n\n`Math.floor(x)` gives the largest integer less than or equal to x (rounds down). `Math.ceil(x)` gives the smallest integer greater than or equal to x (rounds up).\n\n**Example**\n\n```javascript\nconsole.log(Math.floor(4.7));    // 4\nconsole.log(Math.ceil(4.2));     // 5\nconsole.log(Math.floor(-4.2));   // -5\nconsole.log(Math.ceil(-4.7));    // -4\n```\n\nFloor goes down; ceil goes up. For negative numbers, \"down\" is more negative.\n\n**Practice**\n\nWrite code that prints Math.floor of 12.9 and Math.ceil of 12.1.",
    "Let's use Math.abs() for absolute value.\n\n`Math.abs(x)` gives the distance of x from zero: the value without its sign. Negative becomes positive; positive stays positive.\n\n**Example**\n\n```javascript\nconsole.log(Math.abs(5));     // 5\nconsole.log(Math.abs(-5));    // 5\nconsole.log(Math.abs(-3.2));   // 3.2\n```\n\nUse it when you care about size or distance, not direction. Handy for differences and distances.\n\n**Practice**\n\nWrite code that prints the absolute value of -15.",
    "Let's use Math.pow() and Math.sqrt().\n\n`Math.pow(base, exponent)` raises base to the power exponent. `Math.sqrt(x)` returns the square root of x (same as pow(x, 0.5)).\n\n**Example**\n\n```javascript\nconsole.log(Math.pow(2, 3));     // 8\nconsole.log(Math.sqrt(16));      // 4\nconsole.log(Math.pow(5, 2));     // 25\n```\n\nYou can also use the `**` operator (e.g. 2 ** 3). sqrt is for the positive square root only.\n\n**Practice**\n\nWrite code that prints 3 to the power of 4.",
    "Let's find the smallest and largest with Math.min() and Math.max().\n\n`Math.min(a, b, ...)` returns the smallest of the arguments. `Math.max(a, b, ...)` returns the largest. You can pass two or more numbers.\n\n**Example**\n\n```javascript\nconsole.log(Math.min(10, 3, 7));    // 3\nconsole.log(Math.max(10, 3, 7));    // 10\nconsole.log(Math.min(-1, -5));      // -5\n```\n\nUse them to clamp values or pick the lowest or highest from a list of numbers.\n\n**Practice**\n\nWrite code that prints the smaller of 20 and 35, then the larger.",
    "Let's generate random numbers with Math.random().\n\n`Math.random()` returns a decimal from 0 (inclusive) up to 1 (exclusive). Each call gives a new value. You don't pass any arguments.\n\n**Example**\n\n```javascript\nconsole.log(Math.random());    // e.g. 0.731234\nconsole.log(Math.random());    // e.g. 0.092341\n```\n\nThe result is different every time. To get integers in a range, you scale and round (next outcome).\n\n**Practice**\n\nWrite code that prints two random numbers (call Math.random() twice).",
    "Let's scale Math.random() to a range.\n\nTo get a random integer from min to max (inclusive): multiply random by the range size, add min, then use Math.floor. Formula: `Math.floor(Math.random() * (max - min + 1)) + min`.\n\n**Example**\n\n```javascript\n// Random integer from 1 to 6 (dice)\nconsole.log(Math.floor(Math.random() * 6) + 1);    // e.g. 4\n// Random integer from 10 to 20\nconsole.log(Math.floor(Math.random() * 11) + 10); // e.g. 15\n```\n\nRandom gives 0 to 1; multiply by how many values you want, then shift by the minimum.\n\n**Practice**\n\nWrite code that prints a random integer from 1 to 10.",
    "Let's use Math constants: Math.PI and Math.E.\n\n`Math.PI` is the number π (about 3.14159). `Math.E` is the number e (about 2.718). They are read-only constants—use them in formulas, don't assign to them.\n\n**Example**\n\n```javascript\nconsole.log(Math.PI);                    // 3.141592653589793\nconsole.log(Math.E);                     // 2.718281828459045\nconsole.log(2 * Math.PI * 5);           // 31.41592653589793 (circumference r=5)\n```\n\nUse PI for circles and angles; E appears in growth and log formulas. Names are in uppercase by convention.\n\n**Practice**\n\nWrite code that prints the area of a circle with radius 7 (area = π * r * r)."
  ],
  "tasks": [
    {
      "description": "// Do not rename num, neg, a, b, c, radius; we will change their values when testing.\n//\n// Line 1-4: Math.round(num), Math.floor(num), Math.ceil(num), Math.trunc(num)\n// Line 5: Math.abs(neg)\n// Line 6: Math.sqrt(16)\n// Line 7: Math.pow(2, 3)\n// Line 8: Math.min(a, b, c)\n// Line 9: Math.max(a, b, c)\n// Line 10: 2 * Math.PI * radius (circumference for given radius)\n// Line 11: Math.E\n//\n// For num=47.6, neg=-8, a=10, b=25, c=15, radius=5 your output should be:\n// 48\n// 47\n// 48\n// 47\n// 8\n// 4\n// 8\n// 10\n// 25\n// 31.41592653589793\n// 2.718281828459045",
      "solution_type": "script",
      "reference_solution": "const num = 47.6;\nconst neg = -8;\nconst a = 10;\nconst b = 25;\nconst c = 15;\nconst radius = 5;\nconsole.log(Math.round(num));\nconsole.log(Math.floor(num));\nconsole.log(Math.ceil(num));\nconsole.log(Math.trunc(num));\nconsole.log(Math.abs(neg));\nconsole.log(Math.sqrt(16));\nconsole.log(Math.pow(2, 3));\nconsole.log(Math.min(a, b, c));\nconsole.log(Math.max(a, b, c));\nconsole.log(2 * Math.PI * radius);\nconsole.log(Math.E);",
      "testCases": [
        {
          "input": {
            "num": 47.6,
            "neg": -8,
            "a": 10,
            "b": 25,
            "c": 15,
            "radius": 5
          },
          "expectedOutput": "48\n47\n48\n47\n8\n4\n8\n10\n25\n31.41592653589793\n2.718281828459045"
        },
        {
          "input": {
            "num": 12.3,
            "neg": -5,
            "a": 7,
            "b": 3,
            "c": 9,
            "radius": 10
          },
          "expectedOutput": "12\n12\n13\n12\n5\n4\n8\n3\n9\n62.83185307179586\n2.718281828459045"
        },
        {
          "input": {
            "num": -3.7,
            "neg": 4,
            "a": 20,
            "b": 15,
            "c": 25,
            "radius": 1
          },
          "expectedOutput": "-4\n-4\n-3\n-3\n4\n4\n8\n15\n25\n6.283185307179586\n2.718281828459045"
        }
      ]
    },
    {
      "description": "// Do not rename x1, y1, x2, y2, use them as input for your program.\n// While testing we will change their values.\nconst x1 = 3;\nconst y1 = 4;\nconst x2 = 7;\nconst y2 = 1;\n\n// Calculate the distance between points (x1, y1) and (x2, y2)\n// Distance formula: √[(x2-x1)² + (y2-y1)²]\n// Print the distance\n// For example, if points are (3,4) and (7,1), your output should be:\n// 5",
      "solution_type": "script",
      "reference_solution": "const x1 = 3;\nconst y1 = 4;\nconst x2 = 7;\nconst y2 = 1;\nconst distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\nconsole.log(distance);",
      "testCases": [
        {
          "input": {
            "x1": 3,
            "y1": 4,
            "x2": 7,
            "y2": 1
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "x1": 0,
            "y1": 0,
            "x2": 3,
            "y2": 4
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "x1": 1,
            "y1": 1,
            "x2": 4,
            "y2": 5
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "x1": 0,
            "y1": 0,
            "x2": 0,
            "y2": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "x1": -2,
            "y1": -3,
            "x2": 1,
            "y2": 1
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "x1": 5,
            "y1": 5,
            "x2": 5,
            "y2": 10
          },
          "expectedOutput": "5"
        }
      ]
    },
    {
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n\n// Calculate circumference and area of a circle\n// Circumference = 2πr, Area = πr²\n// Print circumference, then area\n// For example, if radius = 7, your output should be:\n// 43.982297150257104\n// 153.93804002589985",
      "solution_type": "script",
      "reference_solution": "const radius = 7;\nconst circumference = 2 * Math.PI * radius;\nconst area = Math.PI * radius * radius;\nconsole.log(circumference);\nconsole.log(area);",
      "testCases": [
        {
          "input": {
            "radius": 7
          },
          "expectedOutput": "43.982297150257104\n153.93804002589985"
        },
        {
          "input": {
            "radius": 10
          },
          "expectedOutput": "62.83185307179586\n314.1592653589793"
        },
        {
          "input": {
            "radius": 1
          },
          "expectedOutput": "6.283185307179586\n3.141592653589793"
        },
        {
          "input": {
            "radius": 5
          },
          "expectedOutput": "31.41592653589793\n78.53981633974483"
        },
        {
          "input": {
            "radius": 0
          },
          "expectedOutput": "0\n0"
        },
        {
          "input": {
            "radius": 100
          },
          "expectedOutput": "628.3185307179587\n31415.926535897932"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = 15;\nconst b = 25;\nconst c = 10;\n\n// Calculate absolute difference between a and b\n// Then calculate absolute difference between that result and c\n// Print both absolute differences\n// For example, if a = 15, b = 25, c = 10, your output should be:\n// 10\n// 0",
      "solution_type": "script",
      "reference_solution": "const a = 15;\nconst b = 25;\nconst c = 10;\nconst absDiffAB = Math.abs(a - b);\nconst absDiffFromC = Math.abs(absDiffAB - c);\nconsole.log(absDiffAB);\nconsole.log(absDiffFromC);",
      "testCases": [
        {
          "input": {
            "a": 15,
            "b": 25,
            "c": 10
          },
          "expectedOutput": "10\n0"
        },
        {
          "input": {
            "a": 50,
            "b": 20,
            "c": 15
          },
          "expectedOutput": "30\n15"
        },
        {
          "input": {
            "a": 100,
            "b": 100,
            "c": 0
          },
          "expectedOutput": "0\n0"
        },
        {
          "input": {
            "a": -10,
            "b": 10,
            "c": 20
          },
          "expectedOutput": "20\n0"
        },
        {
          "input": {
            "a": 7,
            "b": 3,
            "c": 2
          },
          "expectedOutput": "4\n2"
        },
        {
          "input": {
            "a": 0,
            "b": 0,
            "c": 0
          },
          "expectedOutput": "0\n0"
        }
      ]
    },
    {
      "description": "// Do not rename principal, rate, time, use them as input for your program.\n// While testing we will change their values.\nconst principal = 1000;\nconst rate = 5;\nconst time = 3;\n\n// Calculate final amount with compound interest\n// Amount = principal × (1 + rate/100)^time\n// Print the final amount\n// For example, if principal = 1000, rate = 5, time = 3, your output should be:\n// 1157.625",
      "solution_type": "script",
      "reference_solution": "const principal = 1000;\nconst rate = 5;\nconst time = 3;\nconst amount = principal * Math.pow(1 + rate / 100, time);\nconsole.log(amount);",
      "testCases": [
        {
          "input": {
            "principal": 1000,
            "rate": 5,
            "time": 3
          },
          "expectedOutput": "1157.625"
        },
        {
          "input": {
            "principal": 5000,
            "rate": 10,
            "time": 2
          },
          "expectedOutput": "6050"
        },
        {
          "input": {
            "principal": 2000,
            "rate": 8,
            "time": 5
          },
          "expectedOutput": "2938.6561536"
        },
        {
          "input": {
            "principal": 10000,
            "rate": 0,
            "time": 10
          },
          "expectedOutput": "10000"
        },
        {
          "input": {
            "principal": 1500,
            "rate": 6,
            "time": 1
          },
          "expectedOutput": "1590"
        },
        {
          "input": {
            "principal": 3000,
            "rate": 12,
            "time": 4
          },
          "expectedOutput": "4722.04364800000"
        }
      ]
    },
    {
      "description": "// Do not rename temp1, temp2, temp3, temp4, temp5, use them as input for your program.\n// While testing we will change their values.\nconst temp1 = 23.5;\nconst temp2 = 19.8;\nconst temp3 = 27.3;\nconst temp4 = 15.2;\nconst temp5 = 21.9;\n\n// Find minimum temperature, maximum temperature, and average\n// Round the average to 2 decimal places\n// Print min, max, rounded average in order\n// For example, if temps are 23.5, 19.8, 27.3, 15.2, 21.9, your output should be:\n// 15.2\n// 27.3\n// 21.54",
      "solution_type": "script",
      "reference_solution": "const temp1 = 23.5;\nconst temp2 = 19.8;\nconst temp3 = 27.3;\nconst temp4 = 15.2;\nconst temp5 = 21.9;\nconst minTemp = Math.min(temp1, temp2, temp3, temp4, temp5);\nconst maxTemp = Math.max(temp1, temp2, temp3, temp4, temp5);\nconst average = (temp1 + temp2 + temp3 + temp4 + temp5) / 5;\nconst roundedAvg = Math.round(average * 100) / 100;\nconsole.log(minTemp);\nconsole.log(maxTemp);\nconsole.log(roundedAvg);",
      "testCases": [
        {
          "input": {
            "temp1": 23.5,
            "temp2": 19.8,
            "temp3": 27.3,
            "temp4": 15.2,
            "temp5": 21.9
          },
          "expectedOutput": "15.2\n27.3\n21.54"
        },
        {
          "input": {
            "temp1": 10,
            "temp2": 20,
            "temp3": 30,
            "temp4": 40,
            "temp5": 50
          },
          "expectedOutput": "10\n50\n30"
        },
        {
          "input": {
            "temp1": 25.5,
            "temp2": 25.5,
            "temp3": 25.5,
            "temp4": 25.5,
            "temp5": 25.5
          },
          "expectedOutput": "25.5\n25.5\n25.5"
        },
        {
          "input": {
            "temp1": -10,
            "temp2": -5,
            "temp3": 0,
            "temp4": 5,
            "temp5": 10
          },
          "expectedOutput": "-10\n10\n0"
        },
        {
          "input": {
            "temp1": 32.14,
            "temp2": 28.76,
            "temp3": 35.89,
            "temp4": 30.12,
            "temp5": 33.55
          },
          "expectedOutput": "28.76\n35.89\n32.09"
        },
        {
          "input": {
            "temp1": 0,
            "temp2": 0,
            "temp3": 0,
            "temp4": 0,
            "temp5": 1
          },
          "expectedOutput": "0\n1\n0.2"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, use them as input for your program.\n// a and b are the two legs of a right triangle.\n// While testing we will change their values.\nconst a = 3;\nconst b = 4;\n\n// Calculate the hypotenuse of the right triangle\n// Pythagorean theorem: c = √(a² + b²)\n// Print the hypotenuse\n// For example, if a = 3 and b = 4, your output should be:\n// 5",
      "solution_type": "script",
      "reference_solution": "const a = 3;\nconst b = 4;\nconst hypotenuse = Math.sqrt(a * a + b * b);\nconsole.log(hypotenuse);",
      "testCases": [
        {
          "input": {
            "a": 3,
            "b": 4
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "a": 5,
            "b": 12
          },
          "expectedOutput": "13"
        },
        {
          "input": {
            "a": 8,
            "b": 15
          },
          "expectedOutput": "17"
        },
        {
          "input": {
            "a": 1,
            "b": 1
          },
          "expectedOutput": "1.4142135623730951"
        },
        {
          "input": {
            "a": 6,
            "b": 8
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "a": 9,
            "b": 12
          },
          "expectedOutput": "15"
        }
      ]
    },
    {
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 5;\n\n// Calculate the volume of a sphere\n// Volume = (4/3) × π × radius³\n// Print the volume\n// For example, if radius = 5, your output should be:\n// 523.5987755982989",
      "solution_type": "script",
      "reference_solution": "const radius = 5;\nconst volume = (4 / 3) * Math.PI * Math.pow(radius, 3);\nconsole.log(volume);",
      "testCases": [
        {
          "input": {
            "radius": 5
          },
          "expectedOutput": "523.5987755982989"
        },
        {
          "input": {
            "radius": 10
          },
          "expectedOutput": "4188.790204786391"
        },
        {
          "input": {
            "radius": 1
          },
          "expectedOutput": "4.1887902047863905"
        },
        {
          "input": {
            "radius": 3
          },
          "expectedOutput": "113.09733552923255"
        },
        {
          "input": {
            "radius": 0
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "radius": 7
          },
          "expectedOutput": "1436.755040241732"
        }
      ]
    },
    {
      "description": "// Do not rename base, exponent, use them as input for your program.\n// While testing we will change their values.\nconst base = 2;\nconst exponent = 10;\n\n// Calculate base raised to the power of exponent\n// Then calculate the exponent-th root of the result to verify\n// Print the power result, then the root verification\n// For example, if base = 2 and exponent = 10, your output should be:\n// 1024\n// 2",
      "solution_type": "script",
      "reference_solution": "const base = 2;\nconst exponent = 10;\nconst powerResult = Math.pow(base, exponent);\nconst rootVerification = Math.pow(powerResult, 1 / exponent);\nconsole.log(powerResult);\nconsole.log(rootVerification);",
      "testCases": [
        {
          "input": {
            "base": 2,
            "exponent": 10
          },
          "expectedOutput": "1024\n2"
        },
        {
          "input": {
            "base": 3,
            "exponent": 4
          },
          "expectedOutput": "81\n3"
        },
        {
          "input": {
            "base": 5,
            "exponent": 3
          },
          "expectedOutput": "125\n5"
        },
        {
          "input": {
            "base": 10,
            "exponent": 2
          },
          "expectedOutput": "100\n10"
        },
        {
          "input": {
            "base": 2,
            "exponent": 5
          },
          "expectedOutput": "32\n2"
        },
        {
          "input": {
            "base": 4,
            "exponent": 3
          },
          "expectedOutput": "64\n4"
        }
      ]
    }
  ]
};
