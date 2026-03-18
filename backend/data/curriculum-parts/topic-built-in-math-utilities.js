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
    "Random numbers: Math.random()",
    "Formula Design: Scaling Random Numbers to a Range",
    "Mathematical Constants: Math.PI and Math.E"
  ],
  "outcome_messages": [
    "Let's use the Math object.\n\n`Math` gives you ready-made maths: rounding, square root, random numbers, and more.\n\n## Syntax\n\n```\nMath.methodName(value)\nMath.methodName()\n```\n\n## Practice\n\nMath in JavaScript is like using a calculator—you get answers without doing the work on paper. Do you understand the use case?",
    "Let's round numbers with Math.round() and Math.trunc().\n\n`Math.round(x)` rounds to the nearest integer (0.5 goes up). `Math.trunc(x)` drops the decimal part and keeps the integer part.\n\n## Example\n\n```javascript\nconsole.log(Math.round(4.7));\nconsole.log(Math.round(4.3));\nconsole.log(Math.trunc(4.9));\nconsole.log(Math.trunc(-4.9));\n```\n\n## Output\n\n```\n5\n4\n4\n-4\n```\n\nRound moves to nearest; trunc always cuts toward zero. For positive numbers, trunc is like \"floor\"; for negatives, they differ.\n\n## Practice\n\nWrite code that prints Math.round(9.7) and Math.trunc(9.7).",
    "Let's use Math.floor() and Math.ceil().\n\n`Math.floor(x)` gives the largest integer less than or equal to x (rounds down). `Math.ceil(x)` gives the smallest integer greater than or equal to x (rounds up).\n\n## Example\n\n```javascript\nconsole.log(Math.floor(4.7));\nconsole.log(Math.ceil(4.2));\nconsole.log(Math.floor(-4.2));\nconsole.log(Math.ceil(-4.7));\n```\n\n## Output\n\n```\n4\n5\n-5\n-4\n```\n\nFloor goes down; ceil goes up. For negative numbers, \"down\" is more negative.\n\n## Practice\n\nWrite code that prints Math.floor of 12.9 and Math.ceil of 12.1.",
    "Let's use Math.abs() for absolute value.\n\n`Math.abs(x)` gives the distance of x from zero: the value without its sign. Negative becomes positive; positive stays positive.\n\n## Example\n\n```javascript\nconsole.log(Math.abs(5));\nconsole.log(Math.abs(-5));\nconsole.log(Math.abs(-3.2));\n```\n\n## Output\n\n```\n5\n5\n3.2\n```\n\nUse it when you care about size or distance, not direction. Handy for differences and distances.\n\n## Practice\n\nWrite code that prints the absolute value of -15.",
    "Let's use Math.pow() and Math.sqrt().\n\n`Math.pow(base, exponent)` raises base to the power exponent. `Math.sqrt(x)` returns the square root of x (same as pow(x, 0.5)).\n\n## Example\n\n```javascript\nconsole.log(Math.pow(2, 3));\nconsole.log(Math.sqrt(16));\nconsole.log(Math.pow(5, 2));\n```\n\n## Output\n\n```\n8\n4\n25\n```\n\nYou can also use the `**` operator (e.g. 2 ** 3). sqrt is for the positive square root only.\n\n## Practice\n\nWrite code that prints 3 to the power of 4 and the square root of 16.",
    "Let's find the smallest and largest with Math.min() and Math.max().\n\n`Math.min(a, b, ...)` returns the smallest of the arguments. `Math.max(a, b, ...)` returns the largest. You can pass two or more numbers.\n\n## Example\n\n```javascript\nconsole.log(Math.min(10, 3, 7));\nconsole.log(Math.max(10, 3, 7));\nconsole.log(Math.min(-1, -5));\n```\n\n## Output\n\n```\n3\n10\n-5\n```\n\nUse them to clamp values or pick the lowest or highest from a list of numbers.\n\n## Practice\n\nWrite code that prints the smaller of 20 and 35, then the larger.",
    "Let's generate random numbers with Math.random().\n\n`Math.random()` returns a decimal from 0 (inclusive) up to 1 (exclusive). Each call gives a new value. You don't pass any arguments.\n\n## Example\n\n```javascript\nconsole.log(Math.random());\nconsole.log(Math.random());\n```\n\n## Output\n\n```\n0.7312345678901234\n0.0923415678901234\n```\n\nThe result is different every time (values above are examples).\n\n## Practice\n\nWrite code that prints two random numbers (call Math.random() twice).",
    "Let's scale Math.random() to a range.\n\nTo get a random integer from min to max (inclusive): multiply random by the range size, add min, then use Math.floor. Formula: `Math.floor(Math.random() * (max - min + 1)) + min`.\n\n## Example\n\n```javascript\n// Random integer from 1 to 6 (dice)\nconsole.log(Math.floor(Math.random() * 6) + 1);\n// Random integer from 10 to 20\nconsole.log(Math.floor(Math.random() * 11) + 10);\n```\n\n## Output\n\n```\n4\n15\n```\n\n(Values vary each run. Above are examples.) Random gives 0 to 1; multiply by how many values you want, then shift by the minimum.\n\n## Practice\n\nWrite code that prints a random integer from 1 to 10.",
    "Let's use Math constants: Math.PI and Math.E.\n\n`Math.PI` is the number π (about 3.14159). `Math.E` is the number e (about 2.718). They are read-only constants—use them in formulas, don't assign to them.\n\n## Example\n\n```javascript\nconsole.log(Math.PI);\nconsole.log(Math.E);\nconsole.log(2 * Math.PI * 5);\n```\n\n## Output\n\n```\n3.141592653589793\n2.718281828459045\n31.41592653589793\n```\n\nUse PI for circles and angles; E appears in growth and log formulas. Names are in uppercase by convention.\n\n## Practice\n\nWrite code that prints the area of a circle with radius 7 (area = π * r * r)."
  ],
  "tasks": [
    {
      "description": "// Do not rename x1, y1, x2, y2, use them as input for your program.\n// While testing we will change their values.\nconst x1 = 3;\nconst y1 = 4;\nconst x2 = 7;\nconst y2 = 1;\n// Calculate the distance between points (x1, y1) and (x2, y2)\n// Distance formula: √[(x2-x1)² + (y2-y1)²]\n// Print the distance\n// For example, if points are (3,4) and (7,1), your output should be:\n// 5",
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
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 7;\n// Calculate circumference and area of a circle\n// Circumference = 2πr, Area = πr²\n// Print circumference, then area\n// For example, if radius = 7, your output should be:\n// 43.982297150257104\n// 153.93804002589985",
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
      "description": "// Do not rename temp1, temp2, temp3, temp4, temp5, use them as input for your program.\n// While testing we will change their values.\nconst temp1 = 23.5;\nconst temp2 = 19.8;\nconst temp3 = 27.3;\nconst temp4 = 15.2;\nconst temp5 = 21.9;\n// Find minimum temperature, maximum temperature, and average\n// Round the average to 2 decimal places\n// Print min, max, rounded average in order\n// For example, if temps are 23.5, 19.8, 27.3, 15.2, 21.9, your output should be:\n// 15.2\n// 27.3\n// 21.54",
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
      "description": "// Do not rename a, b, use them as input for your program.\n// a and b are the two legs of a right triangle.\n// While testing we will change their values.\nconst a = 3;\nconst b = 4;\n// Calculate the hypotenuse of the right triangle\n// Pythagorean theorem: c = √(a² + b²)\n// Print the hypotenuse\n// For example, if a = 3 and b = 4, your output should be:\n// 5",
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
      "description": "// Do not rename radius, use it as input for your program.\n// While testing we will change its value.\nconst radius = 5;\n// Calculate the volume of a sphere\n// Volume = (4/3) × π × radius³\n// Print the volume\n// For example, if radius = 5, your output should be:\n// 523.5987755982989",
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
            "radius": 0
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "// Do not rename base, exponent, use them as input for your program.\n// While testing we will change their values.\nconst base = 2;\nconst exponent = 10;\n// Calculate base raised to the power of exponent\n// Then calculate the exponent-th root of the result to verify\n// Print the power result, then the root verification\n// For example, if base = 2 and exponent = 10, your output should be:\n// 1024\n// 2",
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
        }
      ]
    }
  ]
};
