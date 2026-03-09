/** Topic: console.log (console-log) */
export default {
  "id": "console-log",
  "title": "console.log",
  "outcomes": [
    "console.log() basic syntax",
    "String literals (Single vs. Double quotes)",
    "Printing numeric values and decimals",
    "Basic arithmetic expressions in logs",
    "String concatenation (+) and the space problem",
    "Comma-separated logging and auto-spacing"
  ],
  "outcome_messages": [
    "Let's start with the basic syntax of `console.log()`.\n\n`console.log()` is a function in JavaScript that allows you to print messages to the console. The basic syntax is: `console.log(message);` — you put whatever you want to display inside the parentheses.\n\nHere's a simple example:\n\n```javascript\nconsole.log(\"Hello, World!\");    // Hello, World!\n```\n\nWhatever you put inside the parentheses is sent to the console. Strings must be wrapped in quotes; here we pass a string literal.\n\nNow, let's try a simple practice task: Write code that uses `console.log()` to print your name to the console.",
    "Let's look at string literals and how single vs double quotes work.\n\nA string literal is text wrapped in quotes. You can use either single quotes (`'...'`) or double quotes (`\"...\"`). Both work the same.\n\nHere's a simple example—printing a word with each kind of quote:\n\n```javascript\nconsole.log('banana');    // banana\nconsole.log(\"banana\");    // banana\n```\n\nSingle and double quotes both create strings and produce the same output. The choice of quote does not change the result.\n\nUse single quotes when your text contains double quotes inside, so you don't have to escape them—and vice versa.\n\n```javascript\nconsole.log('It is \"Sara\"');    // It is \"Sara\"\nconsole.log(\"It's Sara\");    // It's Sara\n```\n\nNow, let's try a simple practice task: Write code that prints your name in single quotes.",
    "Let's print numeric values and decimals.\n\nYou can pass numbers directly to `console.log()`: whole numbers (integers) like `42` or decimals like `3.14`. JavaScript has one number type for both.\n\nHere's a simple example:\n\n```javascript\nconsole.log(100);     // 100\nconsole.log(12.5);    // 12.5\n```\n\nNumbers can be printed directly without any quotes. Even numbers declared with quotes are treated as text.\n\nNow, let's try a simple practice task: Write code that prints your age.",
    "Let's use arithmetic expressions inside `console.log()`.\n\nYou can put a calculation inside the parentheses (add, subtract, multiply, divide). JavaScript works it out and prints the answer.\n\nHere's a simple example:\n\n```javascript\nconsole.log(147 + 289);    // 436\nconsole.log(100 / 8);       // 12.5\n```\n\nThe expression inside the parentheses is evaluated first. The console shows the result, not the calculation as text.\n\nNow, let's try a simple practice task: Write code that prints 10 plus 5.",
    "Let's combine strings with the `+` operator.\n\nYou join strings with `+`. The result is one longer string.\n\nHere's a simple example:\n\n```javascript\nconsole.log(\"Hello\" + \" \" + \"World\");    // Hello World\nconsole.log(\"The answer is\" + 42);         // The answer is42\n```\n\nThe `+` operator joins strings with no automatic space between them. The first line adds `\" \"` for a space; the second has no space before 42 because none was added. Add a space yourself when you need one.\n\nNow, let's try a simple practice task: Write code that prints your first name and last name with one space between them.",
    "Let's use comma-separated arguments for auto-spacing.\n\nYou can pass several values to `console.log()` with commas between them. Each value is printed with one space between them.\n\nHere's a simple example:\n\n```javascript\nconsole.log(100, \"items\", 50 * 2);    // 100 items 100\n```\n\nComma-separated values are printed with a single space between each. You don't need to add spaces yourself.\n\nNow, let's try a simple practice task: Write code that prints 10, the word items, and the number 20 using commas."
  ],
  "tasks": [
    {
      "description": "// Print the result of 147 + 289\n// Your output should be:\n// 436",
      "solution_type": "script",
      "reference_solution": "console.log(147 + 289)",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "436"
        }
      ]
    },
    {
      "description": "// Print the result of 100 divided by 8\n// Your output should be:\n// 12.5",
      "solution_type": "script",
      "reference_solution": "console.log(100 / 8)",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "12.5"
        }
      ]
    },
    {
      "description": "// Print the result of (15 + 25) * 3 - 10\n// Your output should be:\n// 110",
      "solution_type": "script",
      "reference_solution": "console.log((15 + 25) * 3 - 10)",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "110"
        }
      ]
    },
    {
      "description": "// Print three separate calculations, each on a new line:\n// 45 + 78\n// 200 - 63\n// 12 * 9\n// Your output should be:\n// 123\n// 137\n// 108",
      "solution_type": "script",
      "reference_solution": "console.log(45 + 78)\nconsole.log(200 - 63)\nconsole.log(12 * 9)",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "123\n137\n108"
        }
      ]
    },
    {
      "description": "// Print \"Hello\" and \"World\" with exactly one space between them using the + operator\n// Your output should be:\n// Hello World",
      "solution_type": "script",
      "reference_solution": "console.log(\"Hello\" + \" \" + \"World\")",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Hello World"
        }
      ]
    },
    {
      "description": "// Print the text \"The answer is\" followed by the calculation 7 * 6\n// Your output should be:\n// The answer is 42",
      "solution_type": "script",
      "reference_solution": "console.log(\"The answer is \" + (7 * 6))",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "The answer is 42"
        }
      ]
    },
    {
      "description": "// Print: He said \"JavaScript is amazing\"\n// (Include the double quotes in the output)\n// Your output should be:\n// He said \"JavaScript is amazing\"",
      "solution_type": "script",
      "reference_solution": "console.log('He said \"JavaScript is amazing\"')",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "He said \"JavaScript is amazing\""
        }
      ]
    },
    {
      "description": "// Print three values using comma separation: the number 100, the text \"items\", and the calculation 50 * 2\n// Your output should be:\n// 100 items 100",
      "solution_type": "script",
      "reference_solution": "console.log(100, \"items\", 50 * 2)",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "100 items 100"
        }
      ]
    }
  ]
};
