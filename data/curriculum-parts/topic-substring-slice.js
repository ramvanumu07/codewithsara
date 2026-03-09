/** Topic: substring and slice (substring-slice) */
export default {
  "id": "substring-slice",
  "title": "substring and slice",
  "outcomes": [
    "slice Syntax: Extracting String Segments",
    "substring Syntax: Standard Character Extraction",
    "The Exclusive End: Understanding the (Start, End) Boundary",
    "Implicit End: Omission for Remainder Extraction",
    "Negative Indices: Slicing from the End of the Sequence"
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
