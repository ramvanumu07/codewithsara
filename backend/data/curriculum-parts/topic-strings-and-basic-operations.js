/** Topic: Strings and Basic Operations (strings-and-basic-operations) */
export default {
  "id": "strings-and-basic-operations",
  "title": "Strings and Basic Operations",
  "outcomes": [
    "Strings",
    "String Creation",
    "String Length",
    "String Indexing",
    "String Concatenation",
    "String Case Transformation",
    "String Method Chaining"
  ],
  "outcome_messages": [
    "Let's work with strings.\n\nA string is text: letters, digits, spaces, symbols. In JavaScript you create it with single or double quotes and store it in a variable.\n\n## Example\n\n```javascript\nconst greeting = \"Hello\";\nconsole.log(greeting);\n```\n\n## Output\n\n```\nHello\n```\n\nStrings are values you can store and use. We'll see length and character access in the next outcomes.\n\n## Practice\n\nWrite code that stores your name in a variable and prints it.",
    "Let's create strings.\n\nYou can use single quotes `'...'` or double quotes `\"...\"`. Both create a string. Use the quote type that doesn't appear in your text so you don't have to escape.\n\n## Example\n\n```javascript\nconst a = \"Hello\";\nconst b = 'World';\nconst c = 'It\\'s fun';    // apostrophe escaped with backslash\nconsole.log(a);    // Hello\nconsole.log(b);    // World\nconsole.log(c);    // It's fun\n```\n\nIn `'It\\'s fun'` we use single quotes for the whole string. The apostrophe in \"It's\" would normally end the string after \"It\", so JavaScript would treat the rest as invalid.\n\nThe backslash before the apostrophe (`\\'`) escapes it: it tells JavaScript \"this is an apostrophe character inside the string, not the end of the string.\" The result is the string It's fun.\n\nWithout the backslash you get a syntax error.\n\n## Practice\n\nWrite code that creates a string with your city name and prints it.",
    "Let's get the length of a string.\n\nEvery string has a `.length` property. It gives the number of characters (including spaces). No parentheses—length is a property, not a method.\n\n## Example\n\n```javascript\nconst word = \"JavaScript\";\nconsole.log(word.length);\nconsole.log(\"hi\".length);\n```\n\n## Output\n\n```\n10\n2\n```\n\nThe empty string `\"\"` has length 0. Length is read-only; you don't set it.\n\n## Practice\n\nWrite code that prints the length of the string \"hello\".",
    "Let's access characters by index.\n\nString positions start at 0. Use square brackets: `str[0]` is the first character, `str[1]` the second. The last character is `str[str.length - 1]`.\n\n## Example\n\n```javascript\nconst word = \"Code\";\nconsole.log(word[0]);\nconsole.log(word[1]);\nconsole.log(word[word.length - 1]);\n```\n\n## Output\n\n```\nC\no\ne\n```\n\nIndex out of range (e.g. word[10]) gives `undefined`. Indexing is zero-based.\n\n## Practice\n\nWrite code that prints the first and last character of the string \"JavaScript\".",
    "Let's concatenate strings.\n\nUse `+` to join strings. The result is a new string. Remember: no automatic space between parts—add `\" \"` if you want a space.\n\n## Example\n\n```javascript\nconst first = \"Hello\";\nconst second = \"World\";\nconsole.log(first + \" \" + second);\nconsole.log(first + second);\n```\n\n## Output\n\n```\nHello World\nHelloWorld\n```\n\nConcatenation works with variables and literals. Numbers mixed with + and strings get converted to strings in that expression.\n\n## Practice\n\nWrite code that joins \"Good\" and \"morning\" with a space and prints the result.",
    "Let's change string case.\n\n`.toLowerCase()` returns the string in lowercase. `.toUpperCase()` returns it in uppercase. The original string is unchanged; these methods return a new string.\n\n## Example\n\n```javascript\nconst word = \"Hello\";\nconsole.log(word.toLowerCase());\nconsole.log(word.toUpperCase());\nconsole.log(word);\n```\n\n## Output\n\n```\nhello\nHELLO\nHello\n```\n\nMethods are called with parentheses. Use them when you need to compare or display in a specific case.\n\n## Practice\n\nWrite code that prints \"WORLD\" in lowercase.",
    "Let's chain string methods.\n\nYou can call one method on the result of another: `str.method1().method2()`. Each method returns a string, so you can keep calling methods on the result. Execution flows left to right.\n\n## Example\n\n```javascript\nconst text = \"  Hello World  \";\nconsole.log(text.trim().toUpperCase());\n```\n\n## Output\n\n```\nHELLO WORLD\n```\n\nStep 1 — `text.trim()` removes spaces at the start and end, so the result is `\"Hello World\"`.\n\nStep 2 — `.toUpperCase()` is called on that result and returns `\"HELLO WORLD\"`. So the final output is HELLO WORLD. Each step works on the result of the previous one.\n\n## Practice\n\nWrite code that takes \"  abc  \" and prints it trimmed and in uppercase."
  ],
  "tasks": [
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Function\";\n\n// Print characters at positions 0, 2, 4, and 6\n// For example, if str = \"Function\", your output should be:\n// F\n// n\n// t\n// o",
      "solution_type": "script",
      "reference_solution": "const str = \"Water Melon\";\nconsole.log(str[0]);\nconsole.log(str[2]);\nconsole.log(str[4]);\nconsole.log(str[6]);",
      "testCases": [
        {
          "input": {
            "str": "Water Melon"
          },
          "expectedOutput": "W\nt\nr\nM"
        },
        {
          "input": {
            "str": "Programming"
          },
          "expectedOutput": "P\no\nr\nm"
        },
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "J\nv\nS\nr"
        },
        {
          "input": {
            "str": "Algorithm"
          },
          "expectedOutput": "A\ng\nr\nt"
        },
        {
          "input": {
            "str": "Computer"
          },
          "expectedOutput": "C\nm\nu\ne"
        }
      ]
    },
    {
      "description": "// Do not rename str1 and str2, use them as input for your program.\n// While testing we will change their values.\nconst str1 = \"Computer\";\nconst str2 = \"Science\";\n\n// Calculate: length of str1, length of str2, sum of both lengths, difference of lengths\n// Print all four values\n// For example, if str1 = \"Computer\" and str2 = \"Science\", your output should be:\n// 8\n// 7\n// 15\n// 1",
      "solution_type": "script",
      "reference_solution": "const str1 = \"Computer\";\nconst str2 = \"Science\";\nconst len1 = str1.length;\nconst len2 = str2.length;\nconsole.log(len1);\nconsole.log(len2);\nconsole.log(len1 + len2);\nconsole.log(Math.abs(len1 - len2));",
      "testCases": [
        {
          "input": {
            "str1": "Computer",
            "str2": "Science"
          },
          "expectedOutput": "8\n7\n15\n1"
        },
        {
          "input": {
            "str1": "JavaScript",
            "str2": "Programming"
          },
          "expectedOutput": "10\n11\n21\n1"
        },
        {
          "input": {
            "str1": "Web",
            "str2": "Development"
          },
          "expectedOutput": "3\n11\n14\n8"
        },
        {
          "input": {
            "str1": "Code",
            "str2": "Test"
          },
          "expectedOutput": "4\n4\n8\n0"
        },
        {
          "input": {
            "str1": "Algorithm",
            "str2": "Data"
          },
          "expectedOutput": "9\n4\n13\n5"
        },
        {
          "input": {
            "str1": "Function",
            "str2": "Variable"
          },
          "expectedOutput": "8\n8\n16\n0"
        }
      ]
    },
    {
      "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"Algorithm\";\n\n// Extract characters at positions 0, 1, 2 and concatenate them\n// Then extract characters at positions 3, 4, 5 and concatenate them\n// Print both results\n// For example, if text = \"Algorithm\", your output should be:\n// Alg\n// ori",
      "solution_type": "script",
      "reference_solution": "const text = \"Algorithm\";\nconst part1 = text[0] + text[1] + text[2];\nconst part2 = text[3] + text[4] + text[5];\nconsole.log(part1);\nconsole.log(part2);",
      "testCases": [
        {
          "input": {
            "text": "Algorithm"
          },
          "expectedOutput": "Alg\nori"
        },
        {
          "input": {
            "text": "Programming"
          },
          "expectedOutput": "Pro\ngra"
        },
        {
          "input": {
            "text": "JavaScript"
          },
          "expectedOutput": "Jav\naSc"
        },
        {
          "input": {
            "text": "Function"
          },
          "expectedOutput": "Fun\ncti"
        },
        {
          "input": {
            "text": "Computer"
          },
          "expectedOutput": "Com\nput"
        },
        {
          "input": {
            "text": "Development"
          },
          "expectedOutput": "Dev\nelo"
        }
      ]
    },
    {
      "description": "// Do not rename input, use it as input for your program.\n// While testing we will change its value.\nconst input = \"programming\";\n\n// Convert to uppercase, then concatenate with original lowercase version\n// Print the combined result and its total length\n// For example, if input = \"programming\", your output should be:\n// PROGRAMMINGprogramming\n// 22",
      "solution_type": "script",
      "reference_solution": "const input = \"programming\";\nconst upper = input.toUpperCase();\nconst combined = upper + input;\nconsole.log(combined);\nconsole.log(combined.length);",
      "testCases": [
        {
          "input": {
            "input": "programming"
          },
          "expectedOutput": "PROGRAMMINGprogramming\n22"
        },
        {
          "input": {
            "input": "javascript"
          },
          "expectedOutput": "JAVASCRIPTjavascript\n20"
        },
        {
          "input": {
            "input": "code"
          },
          "expectedOutput": "CODEcode\n8"
        },
        {
          "input": {
            "input": "function"
          },
          "expectedOutput": "FUNCTIONfunction\n16"
        },
        {
          "input": {
            "input": "algorithm"
          },
          "expectedOutput": "ALGORITHMalgorithm\n18"
        },
        {
          "input": {
            "input": "variable"
          },
          "expectedOutput": "VARIABLEvariable\n16"
        }
      ]
    }
  ]
};
