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
  "outcome_messages": [
    "Let's understand type coercion.\n\nWhen you use values of different types together (e.g. number and string), JavaScript may convert one type to another automatically so the operation can run. That automatic conversion is called coercion.\n\n## Example\n\n```javascript\nconsole.log(5 + \"3\");\nconsole.log(5 - \"3\");\n```\n\n## Output\n\n```\n53\n2\n```\n\nWith `+`, the number is turned into a string and the result is string concatenation. With `-`, the string is turned into a number and the result is subtraction. The operator and context decide how types are converted.\n\n## Practice\n\nWhat is the output of 10 + \"5\"? What is the output of 10 - \"5\"? Why are they different?",
    "Let's compare explicit and implicit conversion.\n\nExplicit conversion is when you convert on purpose (e.g. `Number(\"42\")`, `String(42)`). Implicit conversion is when JavaScript does it for you during an operation (e.g. `5 - \"3\"` turns \"3\" into 3). Both change the type; explicit is clear in code, implicit can be surprising.\n\n## Example\n\n```javascript\nconsole.log(Number(\"10\") + 5);\nconsole.log(\"10\" + 5);\nconsole.log(String(7) + \" apples\");\n```\n\n## Output\n\n```\n15\n105\n7 apples\n```\n\nUse explicit conversion when you want to be clear and avoid surprises. Implicit happens when you mix types with operators.\n\n## Practice\n\nWhat is the output of Number(\"10\") + 5? What is the output of \"10\" + 5? Which one is explicit conversion and which is implicit?",
    "Let's see how + favors strings.\n\nWith the `+` operator, if either side is a string, the other is converted to a string and the result is string concatenation. So number + string gives a string, not a number.\n\n## Example\n\n```javascript\nconsole.log(42 + \"10\");\nconsole.log(\"10\" + 42);\nconsole.log(7 + \"\");\n```\n\n## Output\n\n```\n4210\n1042\n7\n```\n\nEven when one operand is a number, + with a string produces a string. For numeric addition with string input, convert first: Number(str) + num.\n\n## Practice\n\nWhat is the output of 20 + \"4\"? Why is it not 24?",
    "Let's see how -, *, and / favor numbers.\n\nWith `-`, `*`, and `/`, JavaScript converts both sides to numbers. A numeric string like \"10\" becomes 10, so the result is a number. Non-numeric strings become NaN.\n\n## Example\n\n```javascript\nconsole.log(42 - \"10\");\nconsole.log(42 * \"10\");\nconsole.log(\"100\" / 5);\n```\n\n## Output\n\n```\n32\n420\n20\n```\n\nOnly + has string bias. Minus, times, and divide try to work with numbers, so strings are coerced to numbers.\n\n## Practice\n\nWhat is the output of \"50\" - 10 and \"50\" * 2? Why do these give numbers and not strings?",
    "Let's understand truthy and falsy.\n\nIn conditions, values are treated as true or false. Falsy values (treated as false) are: false, 0, \"\" (empty string), null, undefined, NaN. Everything else is truthy (treated as true).\n\n## Example\n\n```javascript\nconsole.log(Boolean(\"\"));\nconsole.log(Boolean(0));\nconsole.log(Boolean(\"hi\"));\nconsole.log(Boolean(1));\n```\n\n## Output\n\n```\nfalse\nfalse\ntrue\ntrue\n```\n\nBoolean() converts a value to true or false using these rules.\n\n## Practice\n\nWhat does Boolean(0) return? What does Boolean(\"hello\") return? Why?",
    "Let's understand NaN.\n\nNaN means \"Not a Number.\" It appears when a math operation has no sensible number result (e.g. 0/0, Number(\"abc\")). NaN is not equal to itself: NaN === NaN is false. Use Number.isNaN(x) to check for NaN.\n\n## Example\n\n```javascript\nconsole.log(0 / 0);\nconsole.log(Number(\"abc\"));\nconsole.log(NaN === NaN);\nconsole.log(Number.isNaN(NaN));\n```\n\n## Output\n\n```\nNaN\nNaN\nfalse\ntrue\n```\n\nOnce NaN appears in a calculation, it tends to spread. Check inputs or use Number.isNaN() when you might get invalid numbers.\n\n## Practice\n\nWhat is the result of Number(\"xyz\")? How would you check in code whether a value is NaN?",
    "Let's compare == and ===.\n\n`==` (loose equality) coerces types before comparing: \"5\" == 5 is true. `===` (strict equality) does not coerce: \"5\" === 5 is false. Same value and same type are required for ===.\n\n## Example\n\n```javascript\nconsole.log(\"5\" == 5);\nconsole.log(\"5\" === 5);\nconsole.log(0 == false);\nconsole.log(0 === false);\n```\n\n## Output\n\n```\ntrue\nfalse\ntrue\nfalse\n```\n\nPrefer === to avoid surprise coercions. Use == only when you intentionally want type coercion.\n\n## Practice\n\nAre \"10\" and 10 strictly equal (===)? Are they loosely equal (==)? Why?",
    "Let's write safer code around coercion.\n\nTo avoid bugs:\n\n1. Prefer === over ==.\n2. Convert explicitly with Number() or String() when mixing types.\n3. Check for NaN with Number.isNaN() after operations that can fail.\n4. Be aware that + with a string concatenates; use Number() first when you want numeric addition.\n\n## Example\n\n```javascript\nconst input = \"42\";\nconst num = Number(input);\nconsole.log(num + 10);\n```\n\n## Output\n\n```\n52\n```\n\nConverting with Number(input) first makes it clear we want a number. Without it, input + 10 would be \"4210\". Explicit conversion and strict equality reduce surprises from implicit coercion.\n\n## Practice\n\nIf you have a string \"7\" and want to add 3 to get 10, what should you do first and why?"
  ],
  "tasks": [
    {
      "description": "// Coercion lab: one script that shows how +, -, *, / behave with mixed types.\n// Do not rename num, str, flag1, flag2, val1, val2, text; we will change their values when testing.\n//\n// Print in order:\n// 1. num + str\n// 2. num - str\n// 3. num * str\n// 4. flag1 + 5\n// 5. flag2 * 10\n// 6. val1 + val2\n// 7. val1 - val2\n// 8. val1 / val2\n// 9. text * 1\n//\n// For num=42, str=\"10\", flag1=true, flag2=false, val1=\"7\", val2=\"3\", text=\"hello\" your output should be:\n// 4210\n// 32\n// 420\n// 6\n// 0\n// 73\n// 4\n// 2.3333333333333335\n// NaN",
      "solution_type": "script",
      "reference_solution": "const num = 42;\nconst str = \"10\";\nconst flag1 = true;\nconst flag2 = false;\nconst val1 = \"7\";\nconst val2 = \"3\";\nconst text = \"hello\";\nconsole.log(num + str);\nconsole.log(num - str);\nconsole.log(num * str);\nconsole.log(flag1 + 5);\nconsole.log(flag2 * 10);\nconsole.log(val1 + val2);\nconsole.log(val1 - val2);\nconsole.log(val1 / val2);\nconsole.log(text * 1);",
      "testCases": [
        {
          "input": {
            "num": 42,
            "str": "10",
            "flag1": true,
            "flag2": false,
            "val1": "7",
            "val2": "3",
            "text": "hello"
          },
          "expectedOutput": "4210\n32\n420\n6\n0\n73\n4\n2.3333333333333335\nNaN"
        },
        {
          "input": {
            "num": 15,
            "str": "5",
            "flag1": false,
            "flag2": true,
            "val1": "12",
            "val2": "4",
            "text": "abc"
          },
          "expectedOutput": "155\n10\n75\n5\n10\n124\n8\n3\nNaN"
        },
        {
          "input": {
            "num": 0,
            "str": "8",
            "flag1": true,
            "flag2": true,
            "val1": "8",
            "val2": "0",
            "text": "xyz"
          },
          "expectedOutput": "08\n-8\n0\n6\n10\n80\n8\nInfinity\nNaN"
        }
      ]
    },
    {
      "description": "// Do not rename x and y, use them as input for your program.\n// x and y may be null or undefined; we will change their values when testing.\n//\n// Print in order: x + 10, y + 10, x * 2, y * 2\n// For example, if x = null and y = undefined, your output should be:\n// 10\n// NaN\n// 0\n// NaN",
      "solution_type": "script",
      "reference_solution": "const x = null;\nconst y = undefined;\nconsole.log(x + 10);\nconsole.log(y + 10);\nconsole.log(x * 2);\nconsole.log(y * 2);",
      "testCases": [
        {
          "input": {
            "x": null,
            "y": undefined
          },
          "expectedOutput": "10\nNaN\n0\nNaN"
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
            "x": undefined,
            "y": undefined
          },
          "expectedOutput": "NaN\nNaN\nNaN\nNaN"
        },
        {
          "input": {
            "x": undefined,
            "y": null
          },
          "expectedOutput": "NaN\n10\nNaN\n0"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = \"5\";\nconst b = 5;\nconst c = 0;\n// Calculate a == b, a === b, c == false, c === false\n// Print all four boolean results\n// For example, if a = \"5\", b = 5, c = 0, your output should be:\n// true\n// false\n// true\n// false",
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
    }
  ]
};
