/** Topic: Common string manipulations (string-manipulations) */
export default {
  "id": "string-manipulations",
  "title": "Common string manipulations",
  "outcomes": [
    "trim(): Removing Leading and Trailing Whitespace",
    "replace() and replaceAll()",
    "repeat()",
    "padStart() and padEnd()"
  ],
  "outcome_messages": [
    "Let's remove leading and trailing whitespace with trim().\n\n**str.trim()** returns a **new** string with spaces, tabs, and newlines removed from the **start and end** only. The original string is unchanged. Use trim when you're cleaning user input or comparing strings and don't want extra spaces at the edges to matter. Strings are immutable—trim never changes the original.\n\n## Example\n\n```javascript\nconst s = \"  hello  \";\nconsole.log(s.trim());\nconsole.log(s);\n```\n\n## Output\n\n```\nhello\n  hello  \n```\n\n## What happens\n\n- trim() returns a new string with the two leading spaces and two trailing spaces removed.\n- s is still \"  hello  \". trim does not remove spaces in the middle.\n\n## Practice\n\nIn the example, why does s still show spaces after we call s.trim()?",
    "Let's use replace() and replaceAll().\n\n**str.replace(search, replacement)** replaces the **first** occurrence of search with replacement and returns a new string. **str.replaceAll(search, replacement)** replaces **every** occurrence. The original string is unchanged. Use replace when you need to change one match; use replaceAll when you need to change all of them.\n\n## Example\n\n```javascript\nconst s = \"foo bar foo\";\nconsole.log(s.replace(\"foo\", \"baz\"));\nconsole.log(s.replaceAll(\"foo\", \"baz\"));\n```\n\n## Output\n\n```\nbaz bar foo\nbaz bar baz\n```\n\n## What happens\n\n- replace: only the first \"foo\" becomes \"baz\"; the second \"foo\" stays.\n- replaceAll: both \"foo\" become \"baz\".\n- s is still \"foo bar foo\".\n\n## Practice\n\nIn the example, why does replace give a different result than replaceAll?",
    "Let's repeat a string with repeat().\n\n**str.repeat(count)** returns a new string made by repeating str **count** times. count must be 0 or a positive integer. Use repeat for simple patterns—dashes, asterisks, or a repeated word. The original string is unchanged. \"\".repeat(n) is still \"\".\n\n## Example\n\n```javascript\nconsole.log(\"ab\".repeat(3));\nconsole.log(\"-\".repeat(5));\n```\n\n## Output\n\n```\nababab\n-----\n```\n\n## What happens\n\n- \"ab\" is concatenated three times → \"ababab\".\n- \"-\" is concatenated five times → \"-----\".\n\n## Practice\n\nIn the example, why does \"ab\".repeat(3) give \"ababab\" and not \"ab3\"?",
    "Let's pad strings with padStart() and padEnd().\n\n**str.padStart(targetLength, padString)** pads the **start** of the string until its length is targetLength, using padString (default is a space) repeated as needed. **str.padEnd(targetLength, padString)** pads the **end**. If the string is already at or longer than targetLength, no padding is added and you get the original string. Use them for fixed-width display, zero-padding numbers, or aligning output.\n\n## Example\n\n```javascript\nconsole.log(\"5\".padStart(3, \"0\"));\nconsole.log(\"hi\".padEnd(5, \".\"));\n```\n\n## Output\n\n```\n005\nhi...\n```\n\n## What happens\n\n- \"5\" has length 1; padStart(3, \"0\") adds two \"0\"s at the start → \"005\".\n- \"hi\" has length 2; padEnd(5, \".\") adds three \".\"s at the end → \"hi...\".\n\n## Practice\n\nIn the example, why does padStart(3, \"0\") add two zeros to \"5\" and not three?"
  ],
  "practise_tasks": [
    {
      "question": "In the example, why does s still show spaces after we call s.trim()?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does replace give a different result than replaceAll?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does \"ab\".repeat(3) give \"ababab\" and not \"ab3\"?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does padStart(3, \"0\") add two zeros to \"5\" and not three?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    }
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses trim() to remove whitespace.\n  Use trim() to remove leading and trailing whitespace.\n  Examples:\n    trimString(\"  Hello World  \") => \"Hello World\"\n    trimString(\"   JavaScript   \") => \"JavaScript\"\n    trimString(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction trimString(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "trimString",
      "reference_solution": "function trimString(str) {\n  return str.trim();\n}",
      "testCases": [
        {
          "input": {
            "str": "  Hello World  "
          },
          "expectedOutput": "Hello World"
        },
        {
          "input": {
            "str": "   JavaScript   "
          },
          "expectedOutput": "JavaScript"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "str": "  "
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses replace() to substitute text.\n  Use replace() to replace the search term with the replacement.\n  Examples:\n    replaceText(\"Hello World\", \"World\", \"JavaScript\") => \"Hello JavaScript\"\n    replaceText(\"I love coding\", \"coding\", \"programming\") => \"I love programming\"\n    replaceText(\"test\", \"test\", \"exam\") => \"exam\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceText(str, search, replacement) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "replaceText",
      "reference_solution": "function replaceText(str, search, replacement) {\n  return str.replace(search, replacement);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World",
            "search": "World",
            "replacement": "JavaScript"
          },
          "expectedOutput": "Hello JavaScript"
        },
        {
          "input": {
            "str": "I love coding",
            "search": "coding",
            "replacement": "programming"
          },
          "expectedOutput": "I love programming"
        },
        {
          "input": {
            "str": "test",
            "search": "test",
            "replacement": "exam"
          },
          "expectedOutput": "exam"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses replaceAll() to replace all occurrences.\n  Use replaceAll() to replace all occurrences of the search term with the replacement.\n  Examples:\n    replaceAllText(\"cat cat cat\", \"cat\", \"dog\") => \"dog dog dog\"\n    replaceAllText(\"hello hello\", \"hello\", \"hi\") => \"hi hi\"\n    replaceAllText(\"test\", \"test\", \"exam\") => \"exam\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceAllText(str, search, replacement) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "replaceAllText",
      "reference_solution": "function replaceAllText(str, search, replacement) {\n  return str.replaceAll(search, replacement);\n}",
      "testCases": [
        {
          "input": {
            "str": "cat cat cat",
            "search": "cat",
            "replacement": "dog"
          },
          "expectedOutput": "dog dog dog"
        },
        {
          "input": {
            "str": "hello hello",
            "search": "hello",
            "replacement": "hi"
          },
          "expectedOutput": "hi hi"
        },
        {
          "input": {
            "str": "test",
            "search": "test",
            "replacement": "exam"
          },
          "expectedOutput": "exam"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses repeat() to repeat a string.\n  Use repeat() to repeat the string the specified number of times.\n  Examples:\n    repeatString(\"ha\", 3) => \"hahaha\"\n    repeatString(\"abc\", 2) => \"abcabc\"\n    repeatString(\"x\", 5) => \"xxxxx\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction repeatString(str, count) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "repeatString",
      "reference_solution": "function repeatString(str, count) {\n  return str.repeat(count);\n}",
      "testCases": [
        {
          "input": {
            "str": "ha",
            "count": 3
          },
          "expectedOutput": "hahaha"
        },
        {
          "input": {
            "str": "abc",
            "count": 2
          },
          "expectedOutput": "abcabc"
        },
        {
          "input": {
            "str": "x",
            "count": 5
          },
          "expectedOutput": "xxxxx"
        },
        {
          "input": {
            "str": "test",
            "count": 0
          },
          "expectedOutput": ""
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses padStart() to pad a string at the beginning.\n  Use padStart() to pad the string to the specified length with the given character.\n  Examples:\n    padStringStart(\"5\", 4, \"0\") => \"0005\"\n    padStringStart(\"42\", 5, \"0\") => \"00042\"\n    padStringStart(\"7\", 3, \"0\") => \"007\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction padStringStart(str, length, padChar) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "padStringStart",
      "reference_solution": "function padStringStart(str, length, padChar) {\n  return str.padStart(length, padChar);\n}",
      "testCases": [
        {
          "input": {
            "str": "5",
            "length": 4,
            "padChar": "0"
          },
          "expectedOutput": "0005"
        },
        {
          "input": {
            "str": "42",
            "length": 5,
            "padChar": "0"
          },
          "expectedOutput": "00042"
        },
        {
          "input": {
            "str": "7",
            "length": 3,
            "padChar": "0"
          },
          "expectedOutput": "007"
        },
        {
          "input": {
            "str": "100",
            "length": 2,
            "padChar": "0"
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses padEnd() to pad a string at the end.\n  Use padEnd() to pad the string to the specified length with the given character.\n  Examples:\n    padStringEnd(\"5\", 4, \"0\") => \"5000\"\n    padStringEnd(\"42\", 5, \"0\") => \"42000\"\n    padStringEnd(\"7\", 3, \"0\") => \"700\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction padStringEnd(str, length, padChar) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "padStringEnd",
      "reference_solution": "function padStringEnd(str, length, padChar) {\n  return str.padEnd(length, padChar);\n}",
      "testCases": [
        {
          "input": {
            "str": "5",
            "length": 4,
            "padChar": "0"
          },
          "expectedOutput": "5000"
        },
        {
          "input": {
            "str": "42",
            "length": 5,
            "padChar": "0"
          },
          "expectedOutput": "42000"
        },
        {
          "input": {
            "str": "7",
            "length": 3,
            "padChar": "0"
          },
          "expectedOutput": "700"
        },
        {
          "input": {
            "str": "100",
            "length": 2,
            "padChar": "0"
          },
          "expectedOutput": "100"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses trim() and replace() to clean and modify text.\n  Use trim() to remove whitespace and replace() to replace \"awesome\" with \"great\".\n  Examples:\n    trimAndReplace(\"  JavaScript is awesome  \") => \"JavaScript is great\"\n    trimAndReplace(\"  coding is fun  \") => \"coding is great\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction trimAndReplace(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "trimAndReplace",
      "reference_solution": "function trimAndReplace(str) {\n  return str.trim().replace('awesome', 'great').replace('fun', 'great');\n}",
      "testCases": [
        {
          "input": {
            "str": "  JavaScript is awesome  "
          },
          "expectedOutput": "JavaScript is great"
        },
        {
          "input": {
            "str": "  coding is fun  "
          },
          "expectedOutput": "coding is great"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses replaceAll() to replace hyphens with spaces.\n  Use replaceAll() to replace all hyphens (-) with spaces.\n  Examples:\n    replaceHyphens(\"hello-world-javascript\") => \"hello world javascript\"\n    replaceHyphens(\"one-two-three\") => \"one two three\"\n    replaceHyphens(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceHyphens(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "replaceHyphens",
      "reference_solution": "function replaceHyphens(str) {\n  return str.replaceAll('-', ' ');\n}",
      "testCases": [
        {
          "input": {
            "str": "hello-world-javascript"
          },
          "expectedOutput": "hello world javascript"
        },
        {
          "input": {
            "str": "one-two-three"
          },
          "expectedOutput": "one two three"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "str": "a-b-c-d"
          },
          "expectedOutput": "a b c d"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses repeat() to create repeated patterns.\n  Use repeat() to repeat the string the specified number of times.\n  Examples:\n    createPattern(\"*\", 10) => \"**********\"\n    createPattern(\"-\", 5) => \"-----\"\n    createPattern(\"#\", 7) => \"#######\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction createPattern(str, count) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "createPattern",
      "reference_solution": "function createPattern(str, count) {\n  return str.repeat(count);\n}",
      "testCases": [
        {
          "input": {
            "str": "*",
            "count": 10
          },
          "expectedOutput": "**********"
        },
        {
          "input": {
            "str": "-",
            "count": 5
          },
          "expectedOutput": "-----"
        },
        {
          "input": {
            "str": "#",
            "count": 7
          },
          "expectedOutput": "#######"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses padStart() and padEnd() to center-align text.\n  Use padStart() to center-align by padding with spaces to length 10.\n  Then use padEnd() on the result to make total length 14.\n  Examples:\n    centerAlignText(\"Code\") => \"   Code       \"\n    centerAlignText(\"Hi\") => \"    Hi        \"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction centerAlignText(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "centerAlignText",
      "reference_solution": "function centerAlignText(str) {\n  const startLen = 5 + Math.floor(str.length / 2);\n  return str.padStart(startLen).padEnd(14);\n}",
      "testCases": [
        {
          "input": {
            "str": "Code"
          },
          "expectedOutput": "   Code       "
        },
        {
          "input": {
            "str": "Hi"
          },
          "expectedOutput": "    Hi        "
        }
      ]
    }
  ]
};
