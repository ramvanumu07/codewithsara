/** Topic: Understanding Undefined and Null (undefined-null-basics) */
export default {
  "id": "undefined-null-basics",
  "title": "Understanding Undefined and Null",
  "outcomes": [
    "The concept of Uninitialized Memory: undefined",
    "Intentional Absence of Value: null",
    "Logical Comparison: undefined vs. null",
    "Using the typeof operator for type inspection"
  ],
  "outcome_messages": [
    "Let's understand undefined.\n\nWhen a variable is declared but not given a value, the value is `undefined`. It means \"no value yet\" or \"not set.\"\n\n## Example\n\n```javascript\nlet x;\nconsole.log(x);\n```\n\n## Output\n\n```\nundefined\n```\n\nUndefined is the default for uninitialized variables. You can also assign it explicitly: `let x = undefined;`.\n\n## Practice\n\nWrite code that declares a variable without assigning a value and prints it.",
    "Let's understand null.\n\n`null` means \"no value\" by choice. You assign it when you want to say \"this has no value\" or \"this is empty.\" It is intentional; undefined often means \"not set yet.\"\n\n## Example\n\n```javascript\nlet name = null;\nconsole.log(name);\nlet score = 100;\nscore = null;\nconsole.log(score);\n```\n\n## Output\n\n```\nnull\nnull\n```\n\nUse null when you want to represent \"no value\" or reset something. It is a value you assign, not the default for missing.\n\n## Practice\n\nWrite code that sets a variable to null and prints it.",
    "Let's compare undefined and null.\n\nBoth mean \"no value\" in a loose sense, but they are different. `undefined` is the default for missing or unset; `null` is a value you assign to mean \"intentionally empty.\" They are not equal in strict comparison.\n\n## Example\n\n```javascript\nconsole.log(undefined == null);\nconsole.log(undefined === null);\n```\n\n## Output\n\n```\ntrue\nfalse\n```\n\nUse `===` to tell them apart. Loose equality treats them as equal; strict does not.\n\n## Practice\n\nAre undefined and null equal when you use strict equality (===)? Why or why not?",
    "Let's use the typeof operator.\n\n`typeof value` returns a string naming the type: \"number\", \"string\", \"boolean\", \"undefined\", \"object\", \"function\". It is useful to check what kind of value you have.\n\n## Example\n\n```javascript\nconsole.log(typeof 42);\nconsole.log(typeof \"hi\");\nconsole.log(typeof undefined);\nconsole.log(typeof null);\n```\n\n## Output\n\n```\nnumber\nstring\nundefined\nobject\n```\n\nNote: typeof null is \"object\" (a known quirk). For null, check with `value === null`.\n\n## Practice\n\nWrite code that prints the type of true and the type of null."
  ],
  "tasks": [
    {
      "description": "// Do not rename a, b, c, d, use them as input for your program.\n// While testing we will change their values.\nconst a = undefined;\nconst b = null;\nconst c = 42;\nconst d = \"hello\";\n// Print the type of each variable using typeof\n// For example, if a = undefined, b = null, c = 42, d = \"hello\", your output should be:\n// undefined\n// object\n// number\n// string",
      "solution_type": "script",
      "reference_solution": "const a = undefined;\nconst b = null;\nconst c = 42;\nconst d = \"hello\";\nconsole.log(typeof a);\nconsole.log(typeof b);\nconsole.log(typeof c);\nconsole.log(typeof d);",
      "testCases": [
        {
          "input": {
            "a": null,
            "b": null,
            "c": 42,
            "d": "hello"
          },
          "expectedOutput": "object\nobject\nnumber\nstring"
        },
        {
          "input": {
            "a": null,
            "b": null,
            "c": 100,
            "d": "world"
          },
          "expectedOutput": "object\nobject\nnumber\nstring"
        },
        {
          "input": {
            "a": null,
            "b": null,
            "c": 0,
            "d": ""
          },
          "expectedOutput": "object\nobject\nnumber\nstring"
        },
        {
          "input": {
            "a": null,
            "b": null,
            "c": -50,
            "d": "test"
          },
          "expectedOutput": "object\nobject\nnumber\nstring"
        },
        {
          "input": {
            "a": null,
            "b": null,
            "c": 3.14,
            "d": "JavaScript"
          },
          "expectedOutput": "object\nobject\nnumber\nstring"
        }
      ]
    }
  ]
};
