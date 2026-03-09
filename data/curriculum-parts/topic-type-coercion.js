/** Topic: Type Coercion (type-coercion) */
export default {
  "id": "type-coercion",
  "title": "Type Coercion",
  "outcomes": [
    "Introduction to Coercion: Automatic Type Switching",
    "Explicit vs. Implicit: Manual vs. Automatic conversion",
    "The String Bias: Coercion with the + operator",
    "Numeric Focus: Coercion with -, *, and / operators",
    "Boolean Logic: The Truthy and Falsy concept",
    "The \"Not-a-Number\" (NaN) behavior and traps",
    "Equality Logic: Type coercion in == vs. ===",
    "Safe Coding: Strategies to avoid implicit bugs"
  ],
  "tasks": [
    {
      "description": "// Do not rename num and str, use them as input for your program.\n// While testing we will change their values.\nconst num = 42;\nconst str = \"10\";\n\n// Calculate num + str, num - str, num * str\n// Print all three results\n// For example, if num = 42 and str = \"10\", your output should be:\n// 4210\n// 32\n// 420",
      "solution_type": "script",
      "reference_solution": "const num = 42;\nconst str = \"10\";\nconsole.log(num + str);\nconsole.log(num - str);\nconsole.log(num * str);",
      "testCases": [
        {
          "input": {
            "num": 42,
            "str": "10"
          },
          "expectedOutput": "4210\n32\n420"
        },
        {
          "input": {
            "num": 15,
            "str": "5"
          },
          "expectedOutput": "155\n10\n75"
        },
        {
          "input": {
            "num": 100,
            "str": "20"
          },
          "expectedOutput": "10020\n80\n2000"
        },
        {
          "input": {
            "num": 7,
            "str": "3"
          },
          "expectedOutput": "73\n4\n21"
        },
        {
          "input": {
            "num": 0,
            "str": "8"
          },
          "expectedOutput": "08\n-8\n0"
        },
        {
          "input": {
            "num": 25,
            "str": "0"
          },
          "expectedOutput": "250\n25\n0"
        }
      ]
    },
    {
      "description": "// Do not rename flag1 and flag2, use them as input for your program.\n// While testing we will change their values.\nconst flag1 = true;\nconst flag2 = false;\n\n// Calculate flag1 + 5, flag2 + 5, flag1 * 10, flag2 * 10\n// Print all four results\n// For example, if flag1 = true and flag2 = false, your output should be:\n// 6\n// 5\n// 10\n// 0",
      "solution_type": "script",
      "reference_solution": "const flag1 = true;\nconst flag2 = false;\nconsole.log(flag1 + 5);\nconsole.log(flag2 + 5);\nconsole.log(flag1 * 10);\nconsole.log(flag2 * 10);",
      "testCases": [
        {
          "input": {
            "flag1": true,
            "flag2": false
          },
          "expectedOutput": "6\n5\n10\n0"
        },
        {
          "input": {
            "flag1": false,
            "flag2": true
          },
          "expectedOutput": "5\n6\n0\n10"
        },
        {
          "input": {
            "flag1": true,
            "flag2": true
          },
          "expectedOutput": "6\n6\n10\n10"
        },
        {
          "input": {
            "flag1": false,
            "flag2": false
          },
          "expectedOutput": "5\n5\n0\n0"
        }
      ]
    },
    {
      "description": "// Do not rename x and y, use them as input for your program.\n// While testing we will change their values.\nconst x = null;\nconst y = undefined;\n\n// Calculate x + 10, y + 10, x * 2, y * 2\n// Print all four results\n// For example, if x = null and y = undefined, your output should be:\n// 10\n// NaN\n// 0\n// NaN",
      "solution_type": "script",
      "reference_solution": "const x = null;\nconst y = undefined;\nconsole.log(x + 10);\nconsole.log(y + 10);\nconsole.log(x * 2);\nconsole.log(y * 2);",
      "testCases": [
        {
          "input": {
            "x": null,
            "y": null
          },
          "expectedOutput": "10\n10\n0\n0"
        },
        {
          "input": {
            "x": null,
            "y": null
          },
          "expectedOutput": "10\n10\n0\n0"
        },
        {
          "input": {
            "x": null,
            "y": null
          },
          "expectedOutput": "10\n10\n0\n0"
        },
        {
          "input": {
            "x": null,
            "y": null
          },
          "expectedOutput": "10\n10\n0\n0"
        }
      ]
    },
    {
      "description": "// Do not rename val1 and val2, use them as input for your program.\n// While testing we will change their values.\nconst val1 = \"7\";\nconst val2 = \"3\";\n\n// Calculate val1 + val2, val1 - val2, val1 / val2\n// Print all three results\n// For example, if val1 = \"7\" and val2 = \"3\", your output should be:\n// 73\n// 4\n// 2.3333333333333335",
      "solution_type": "script",
      "reference_solution": "const val1 = \"7\";\nconst val2 = \"3\";\nconsole.log(val1 + val2);\nconsole.log(val1 - val2);\nconsole.log(val1 / val2);",
      "testCases": [
        {
          "input": {
            "val1": "7",
            "val2": "3"
          },
          "expectedOutput": "73\n4\n2.3333333333333335"
        },
        {
          "input": {
            "val1": "12",
            "val2": "4"
          },
          "expectedOutput": "124\n8\n3"
        },
        {
          "input": {
            "val1": "20",
            "val2": "5"
          },
          "expectedOutput": "205\n15\n4"
        },
        {
          "input": {
            "val1": "15",
            "val2": "2"
          },
          "expectedOutput": "152\n13\n7.5"
        },
        {
          "input": {
            "val1": "100",
            "val2": "10"
          },
          "expectedOutput": "10010\n90\n10"
        },
        {
          "input": {
            "val1": "8",
            "val2": "0"
          },
          "expectedOutput": "80\n8\nInfinity"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = \"5\";\nconst b = 5;\nconst c = 0;\n\n// Calculate a == b, a === b, c == false, c === false\n// Print all four boolean results\n// For example, if a = \"5\", b = 5, c = 0, your output should be:\n// true\n// false\n// true\n// false",
      "solution_type": "script",
      "reference_solution": "const a = \"5\";\nconst b = 5;\nconst c = 0;\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(c == false);\nconsole.log(c === false);",
      "testCases": [
        {
          "input": {
            "a": "5",
            "b": 5,
            "c": 0
          },
          "expectedOutput": "true\nfalse\ntrue\nfalse"
        },
        {
          "input": {
            "a": "10",
            "b": 10,
            "c": 1
          },
          "expectedOutput": "true\nfalse\nfalse\nfalse"
        },
        {
          "input": {
            "a": "0",
            "b": 0,
            "c": 0
          },
          "expectedOutput": "true\nfalse\ntrue\nfalse"
        },
        {
          "input": {
            "a": "7",
            "b": 7,
            "c": 1
          },
          "expectedOutput": "true\nfalse\nfalse\nfalse"
        },
        {
          "input": {
            "a": "3",
            "b": 3,
            "c": 0
          },
          "expectedOutput": "true\nfalse\ntrue\nfalse"
        },
        {
          "input": {
            "a": "1",
            "b": 1,
            "c": 1
          },
          "expectedOutput": "true\nfalse\nfalse\nfalse"
        }
      ]
    },
    {
      "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"hello\";\n\n// Calculate text * 1, text - 0, text / 2\n// Print all three results\n// For example, if text = \"hello\", your output should be:\n// NaN\n// NaN\n// NaN",
      "solution_type": "script",
      "reference_solution": "const text = \"hello\";\nconsole.log(text * 1);\nconsole.log(text - 0);\nconsole.log(text / 2);",
      "testCases": [
        {
          "input": {
            "text": "hello"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        },
        {
          "input": {
            "text": "world"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        },
        {
          "input": {
            "text": "abc"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        },
        {
          "input": {
            "text": "test"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        },
        {
          "input": {
            "text": "javascript"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        },
        {
          "input": {
            "text": "code"
          },
          "expectedOutput": "NaN\nNaN\nNaN"
        }
      ]
    }
  ]
};
