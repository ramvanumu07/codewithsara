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
    "Let's start with the basic syntax of `console.log()`.\n\n`console.log()` is a function in JavaScript that allows you to print messages to the console. You put whatever you want to display inside the parentheses.\n\n## Syntax\n\n```text\nconsole.log(message);\n```\n\n## Example\n\n```javascript\nconsole.log(\"Hello, World!\");\n```\n\n## Output\n\n```\nHello, World!\n```\n\nWhatever you put inside the parentheses is sent to the console. Strings must be wrapped in quotes; here we pass a string literal.\n\n## Practice\n\nWrite code that uses `console.log()` to print your name to the console.",
    "Let's look at string literals and how single vs double quotes work.\n\nA string literal is text wrapped in quotes. You can use either single quotes (`'...'`) or double quotes (`\"...\"`). Both work the same.\n\nHere's a simple example—printing a word with each kind of quote:\n\n```javascript\nconsole.log('banana');\nconsole.log(\"banana\");\n```\n\n## Output\n\n```\nbanana\nbanana\n```\n\nSingle and double quotes both create strings and produce the same output. The choice of quote does not change the result.\n\nUse single quotes when your text contains double quotes inside, so you don't have to escape them—and vice versa.\n\n```javascript\nconsole.log('It is \"Sara\"');\nconsole.log(\"It's Sara\");\n```\n\n## Output\n\n```\nIt is \"Sara\"\nIt's Sara\n```\n\n## Practice\n\nWrite code that prints your name in single quotes.",
    "Let's print numeric values and decimals.\n\nYou can pass numbers directly to `console.log()`: whole numbers (integers) like `42` or decimals like `3.14`. JavaScript has one number type for both.\n\n## Example\n\n```javascript\nconsole.log(100);\nconsole.log(12.5);\n```\n\n## Output\n\n```\n100\n12.5\n```\n\nNumbers can be printed directly without any quotes. Even numbers declared with quotes are treated as text.\n\n## Practice\n\nWrite code that prints your age.",
    "Let's use arithmetic expressions inside `console.log()`.\n\nYou can put a calculation inside the parentheses (add, subtract, multiply, divide). JavaScript works it out and prints the answer.\n\n## Example\n\n```javascript\nconsole.log(147 + 289);\nconsole.log(100 / 8);\n```\n\n## Output\n\n```\n436\n12.5\n```\n\nThe expression inside the parentheses is evaluated first. The console shows the result, not the calculation as text.\n\n## Practice\n\nWrite code that prints 10 plus 5.",
    "Let's combine strings with the `+` operator.\n\nYou join strings with `+`. The result is one longer string.\n\n## Example\n\n```javascript\nconsole.log(\"Hello\" + \" \" + \"World\");\nconsole.log(\"The answer is\" + 42);\n```\n\n## Output\n\n```\nHello World\nThe answer is42\n```\n\nThe `+` operator joins strings with no automatic space between them. The first line adds `\" \"` for a space; the second has no space before 42 because none was added. Add a space yourself when you need one.\n\n## Practice\n\nWrite code that prints your first name and last name with one space between them.",
    "Let's use comma-separated arguments for auto-spacing.\n\nYou can pass several values to `console.log()` with commas between them. Each value is printed with one space between them.\n\n## Example\n\n```javascript\nconsole.log(100, \"items\", 50 * 2);\n```\n\n## Output\n\n```\n100 items 100\n```\n\nComma-separated values are printed with a single space between each. You don't need to add spaces yourself.\n\n## Practice\n\nWrite code that prints 10, the word items, and the number 20 using commas."
  ],
  "tasks": [
    {
      "description": "// Print two lines: first line the number 7, second line the result of 20 minus 3.\n// Use console.log for each line.\n// Your output should be exactly:\n// 7\n// 17\n",
      "solution_type": "script",
      "reference_solution": "console.log(7);\nconsole.log(20 - 3);",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "7\n17"
        }
      ]
    },
    {
      "description": "// Print one line: the word Hello, a single space, then the word World.\n// Use string concatenation (+) and include a space between the two words.\n// Your output should be exactly:\n// Hello World\n",
      "solution_type": "script",
      "reference_solution": "console.log(\"Hello\" + \" \" + \"World\");",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Hello World"
        }
      ]
    },
    {
      "description": "// Print one line with three values separated by spaces: the number 10, the word items, and the expression 50 * 2.\n// Use comma-separated arguments in a single console.log (e.g. console.log(a, b, c)).\n// Your output should be exactly:\n// 10 items 100\n",
      "solution_type": "script",
      "reference_solution": "console.log(10, \"items\", 50 * 2);",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "10 items 20"
        }
      ]
    },
    {
      "description": "// Print: He said \"JavaScript is amazing\"\n// Your output should be exactly:\n// He said \"JavaScript is amazing\"\n",
      "solution_type": "script",
      "reference_solution": "console.log('He said \"JavaScript is amazing\"')",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "He said \"JavaScript is amazing\""
        }
      ]
    }
  ]
};