/** Topic: substring and slice (substring-slice) */
export default {
  "id": "substring-slice",
  "title": "substring and slice",
  "outcomes": [
    "What slice() Does",
    "substring()",
    "Negative Indices with slice()"
  ],
  "outcome_messages": [
    "**What slice() does**\n\n**str.slice(start, end)** returns the substring from index **start** up to but **not including** index **end**—the end index is **exclusive**. The character at end is not in the result. **str.slice(start)** with one argument returns from start to the **end of the string**. The original string is unchanged. Use slice when you need a segment by position—e.g. first few characters, or \"from here to the end.\" Result length with two arguments is **end - start** when in range.\n\n**Example**\n\n```javascript\nconst s = \"JavaScript\";\nconsole.log(s.slice(0, 4));\nconsole.log(s.slice(4));\n```\n\n**Output**\n\n```\nJava\nScript\n```\n\n**What happens**\n\n- slice(0, 4): indices 0, 1, 2, 3 → \"Java\". Index 4 is not included.\n- slice(4): one argument → from index 4 to the end → \"Script\".\n- s is unchanged.\n\n**Practice**\n\nFor \"Hello World\", what does slice(0, 5) return? You have \"javascript\" and want \"script\". What slice call do you use (one argument)?",
    "**substring()**\n\n**str.substring(start, end)** returns the substring from start up to but not including end—same **exclusive end** idea as slice. If **start > end**, substring **swaps** them for you. **Negative** or invalid indices are treated as 0. **substring(start)** with one argument returns from start to the end. The original string is unchanged. In new code, **prefer slice**—it matches array.slice and supports negative indices. substring is still common in existing code.\n\n**Example**\n\n```javascript\nconst s = \"Hello\";\nconsole.log(s.substring(1, 4));\nconsole.log(s.substring(4, 1));\n```\n\n**Output**\n\n```\nell\nell\n```\n\n**What happens**\n\n- substring(1, 4): indices 1, 2, 3 → \"ell\".\n- substring(4, 1): start > end, so they are swapped → same as (1, 4) → \"ell\".\n\n**Practice**\n\nWhat does \"abcdef\".substring(2, 5) return? How many characters is that?",
    "**Negative indices with slice()**\n\nWith **slice**, a **negative** index counts from the **end**: **-1** is the last character, **-2** is the second-to-last, and so on. So **str.slice(-3)** gives the **last 3 characters**; **str.slice(1, -1)** gives from index 1 up to (but not including) the last character—it drops the first and last. **substring** does not support negative indices; it treats them as 0. Use slice when you need \"last n characters\" or \"everything except the ends.\"\n\n**Example**\n\n```javascript\nconst s = \"abcdef\";\nconsole.log(s.slice(-2));\nconsole.log(s.slice(1, -1));\n```\n\n**Output**\n\n```\nef\nbcde\n```\n\n**What happens**\n\n- slice(-2): start 2 positions from the end → \"ef\".\n- slice(1, -1): from index 1 to one before the last → \"bcde\" (first and last dropped).\n\n**Practice**\n\nHow do you get the last character of a string str using slice? What does \"hello\".slice(-3) return?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses slice() to extract substring.\n  Use slice() to extract characters from start to end (exclusive).\n  Examples:\n    sliceString(\"JavaScript\", 0, 4) => \"Java\"\n    sliceString(\"Hello World\", 0, 5) => \"Hello\"\n    sliceString(\"testing\", 0, 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceString(str, start, end) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceString",
      "reference_solution": "function sliceString(str, start, end) {\n  return str.slice(start, end);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "start": 0,
            "end": 4
          },
          "expectedOutput": "Java"
        },
        {
          "input": {
            "str": "Hello World",
            "start": 0,
            "end": 5
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "str": "testing",
            "start": 0,
            "end": 4
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "str": "abc",
            "start": 0,
            "end": 2
          },
          "expectedOutput": "ab"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() to extract from index to end.\n  Use slice() to extract from start index to the end.\n  Examples:\n    sliceFromIndex(\"JavaScript\", 4) => \"Script\"\n    sliceFromIndex(\"Hello World\", 6) => \"World\"\n    sliceFromIndex(\"testing\", 4) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceFromIndex(str, start) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceFromIndex",
      "reference_solution": "function sliceFromIndex(str, start) {\n  return str.slice(start);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "start": 4
          },
          "expectedOutput": "Script"
        },
        {
          "input": {
            "str": "Hello World",
            "start": 6
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "str": "testing",
            "start": 4
          },
          "expectedOutput": "ing"
        },
        {
          "input": {
            "str": "abc",
            "start": 1
          },
          "expectedOutput": "bc"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() with negative index.\n  Use slice() with negative index to extract from the end.\n  Examples:\n    sliceWithNegative(\"JavaScript\", -6) => \"Script\"\n    sliceWithNegative(\"Hello World\", -5) => \"World\"\n    sliceWithNegative(\"testing\", -3) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceWithNegative(str, start) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceWithNegative",
      "reference_solution": "function sliceWithNegative(str, start) {\n  return str.slice(start);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "start": -6
          },
          "expectedOutput": "Script"
        },
        {
          "input": {
            "str": "Hello World",
            "start": -5
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "str": "testing",
            "start": -3
          },
          "expectedOutput": "ing"
        },
        {
          "input": {
            "str": "abcdef",
            "start": -2
          },
          "expectedOutput": "ef"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses substring() to extract substring.\n  Use substring() to extract characters from start to end.\n  Examples:\n    substringExtract(\"JavaScript\", 0, 4) => \"Java\"\n    substringExtract(\"Hello World\", 0, 5) => \"Hello\"\n    substringExtract(\"testing\", 0, 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction substringExtract(str, start, end) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "substringExtract",
      "reference_solution": "function substringExtract(str, start, end) {\n  return str.substring(start, end);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "start": 0,
            "end": 4
          },
          "expectedOutput": "Java"
        },
        {
          "input": {
            "str": "Hello World",
            "start": 0,
            "end": 5
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "str": "testing",
            "start": 0,
            "end": 4
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "str": "abc",
            "start": 0,
            "end": 2
          },
          "expectedOutput": "ab"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses substring() to extract from index to end.\n  Use substring() to extract from start index to the end.\n  Examples:\n    substringFromIndex(\"JavaScript\", 4) => \"Script\"\n    substringFromIndex(\"Hello World\", 6) => \"World\"\n    substringFromIndex(\"testing\", 4) => \"ing\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction substringFromIndex(str, start) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "substringFromIndex",
      "reference_solution": "function substringFromIndex(str, start) {\n  return str.substring(start);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "start": 4
          },
          "expectedOutput": "Script"
        },
        {
          "input": {
            "str": "Hello World",
            "start": 6
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "str": "testing",
            "start": 4
          },
          "expectedOutput": "ing"
        },
        {
          "input": {
            "str": "abc",
            "start": 1
          },
          "expectedOutput": "bc"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() to extract middle substring.\n  Use slice() to extract characters from start to end index.\n  Examples:\n    sliceMiddle(\"Hello World\", 6, 11) => \"World\"\n    sliceMiddle(\"JavaScript\", 4, 10) => \"Script\"\n    sliceMiddle(\"testing\", 2, 5) => \"sti\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceMiddle(str, start, end) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceMiddle",
      "reference_solution": "function sliceMiddle(str, start, end) {\n  return str.slice(start, end);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World",
            "start": 6,
            "end": 11
          },
          "expectedOutput": "World"
        },
        {
          "input": {
            "str": "JavaScript",
            "start": 4,
            "end": 10
          },
          "expectedOutput": "Script"
        },
        {
          "input": {
            "str": "testing",
            "start": 2,
            "end": 5
          },
          "expectedOutput": "sti"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() with negative indices.\n  Use slice() with negative indices to extract from start to end.\n  Examples:\n    sliceNegativeRange(\"Hello World\", -5, -1) => \"Worl\"\n    sliceNegativeRange(\"JavaScript\", -6, -1) => \"Scrip\"\n    sliceNegativeRange(\"testing\", -4, -1) => \"tin\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceNegativeRange(str, start, end) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceNegativeRange",
      "reference_solution": "function sliceNegativeRange(str, start, end) {\n  return str.slice(start, end);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World",
            "start": -5,
            "end": -1
          },
          "expectedOutput": "Worl"
        },
        {
          "input": {
            "str": "JavaScript",
            "start": -6,
            "end": -1
          },
          "expectedOutput": "Scrip"
        },
        {
          "input": {
            "str": "testing",
            "start": -4,
            "end": -1
          },
          "expectedOutput": "tin"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() to get first N characters.\n  Use slice() to get the first N characters.\n  Examples:\n    sliceFirstN(\"programming\", 7) => \"program\"\n    sliceFirstN(\"JavaScript\", 4) => \"Java\"\n    sliceFirstN(\"testing\", 4) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceFirstN(str, length) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceFirstN",
      "reference_solution": "function sliceFirstN(str, length) {\n  return str.slice(0, length);\n}",
      "testCases": [
        {
          "input": {
            "str": "programming",
            "length": 7
          },
          "expectedOutput": "program"
        },
        {
          "input": {
            "str": "JavaScript",
            "length": 4
          },
          "expectedOutput": "Java"
        },
        {
          "input": {
            "str": "testing",
            "length": 4
          },
          "expectedOutput": "test"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses slice() to extract middle characters.\n  Use slice() to extract every character except the first and last.\n  Examples:\n    sliceMiddleChars(\"abcdefghij\") => \"bcdefghi\"\n    sliceMiddleChars(\"hello\") => \"ell\"\n    sliceMiddleChars(\"test\") => \"es\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction sliceMiddleChars(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "sliceMiddleChars",
      "reference_solution": "function sliceMiddleChars(str) {\n  return str.slice(1, -1);\n}",
      "testCases": [
        {
          "input": {
            "str": "abcdefghij"
          },
          "expectedOutput": "bcdefghi"
        },
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "ell"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "es"
        },
        {
          "input": {
            "str": "abc"
          },
          "expectedOutput": "b"
        }
      ]
    }
  ]
};
