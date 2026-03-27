/** Topic: String searching and matching (string-searching) */
export default {
  "id": "string-searching",
  "title": "String searching and matching",
  "outcomes": [
    "indexOf()",
    "lastIndexOf()",
    "includes()",
    "startsWith() and endsWith()"
  ],
  "outcome_messages": [
    "Let's find the position of a substring with indexOf().\n\n**str.indexOf(searchValue)** returns the **index** (0-based) of the **first** occurrence of searchValue in the string, or **-1** if not found. Optional second argument: **indexOf(searchValue, fromIndex)** starts the search from that position. Use indexOf when you need the **position**—e.g. to slice from there or to replace. Checking for -1 tells you whether the substring exists. All of these methods are **case-sensitive**.\n\n## Example\n\n```javascript\nconst s = \"Hello World\";\nconsole.log(s.indexOf(\"World\"));\nconsole.log(s.indexOf(\"xyz\"));\n```\n\n## Output\n\n```\n6\n-1\n```\n\n## What happens\n\n- \"World\" starts at index 6, so indexOf returns 6.\n- \"xyz\" is not in the string, so indexOf returns -1.\n- The original string is unchanged.\n\n## Practice\n\nIn the example, why does indexOf(\"xyz\") return -1?",
    "Let's find the last occurrence with lastIndexOf().\n\n**str.lastIndexOf(searchValue)** returns the **index** of the **last** occurrence of searchValue, or **-1** if not found. Optional second argument: **lastIndexOf(searchValue, fromIndex)** searches **backward** from that index (finds the last occurrence at or before that position). Use lastIndexOf when you need the **rightmost** match—e.g. the last \".\" in a filename for the extension, or the final occurrence of a delimiter.\n\n## Example\n\n```javascript\nconst s = \"banana\";\nconsole.log(s.lastIndexOf(\"a\"));\nconsole.log(s.lastIndexOf(\"na\"));\n```\n\n## Output\n\n```\n5\n4\n```\n\n## What happens\n\n- The last \"a\" is at index 5.\n- The last \"na\" starts at index 4.\n- If the substring were not found, lastIndexOf would return -1.\n\n## Practice\n\nIn the example, why does lastIndexOf(\"na\") return 4 and not 2?",
    "Let's check if a string contains a substring with includes().\n\n**str.includes(searchValue)** returns **true** if the substring exists **anywhere** in the string, **false** otherwise. Optional second argument: **includes(searchValue, fromIndex)** starts the search from that index. Use includes when you only need a **yes/no** answer—\"does this string contain X?\"—without caring about the position. Clearer than writing indexOf(...) !== -1. Case-sensitive.\n\n## Example\n\n```javascript\nconst s = \"JavaScript\";\nconsole.log(s.includes(\"Script\"));\nconsole.log(s.includes(\"python\"));\n```\n\n## Output\n\n```\ntrue\nfalse\n```\n\n## What happens\n\n- \"Script\" appears in the string → true.\n- \"python\" does not → false.\n- Good for conditionals: if (str.includes(\"@\")) { ... }\n\n## Practice\n\nIn the example, when would you use includes instead of indexOf?",
    "Let's check prefixes and suffixes with startsWith() and endsWith().\n\n**str.startsWith(searchValue)** returns **true** if the string **begins** with searchValue; **str.endsWith(searchValue)** returns **true** if it **ends** with searchValue. Otherwise **false**. Use them for **prefixes and suffixes**—e.g. \"https://\" for URLs, \".txt\" or \".json\" for file extensions, or simple validation. Case-sensitive. Optional second arguments let you check from a given position or treat the string as a different length.\n\n## Example\n\n```javascript\nconst s = \"https://example.com\";\nconsole.log(s.startsWith(\"https\"));\nconsole.log(s.endsWith(\".com\"));\n```\n\n## Output\n\n```\ntrue\ntrue\n```\n\n## What happens\n\n- The string starts with \"https\" → true.\n- The string ends with \".com\" → true.\n- No need to use slice or indexOf for simple start/end checks.\n\n## Practice\n\nIn the example, why use startsWith and endsWith instead of slice or indexOf for these checks?"
  ],
  "practise_tasks": [
    {
      "question": "In the example, why does indexOf(\"xyz\") return -1?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why does lastIndexOf(\"na\") return 4 and not 2?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, when would you use includes instead of indexOf?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    },
    {
      "question": "In the example, why use startsWith and endsWith instead of slice or indexOf for these checks?",
      "type": "context_dependent",
      "validation_hint": "Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary."
    }
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses indexOf() to find position of substring.\n  Use indexOf() to find the position of the search term.\n  Examples:\n    findPosition(\"Hello World\", \"World\") => 6\n    findPosition(\"JavaScript\", \"Script\") => 4\n    findPosition(\"testing\", \"ing\") => 4\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findPosition(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findPosition",
      "reference_solution": "function findPosition(str, search) {\n  return str.indexOf(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World",
            "search": "World"
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "str": "JavaScript",
            "search": "Script"
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "str": "testing",
            "search": "ing"
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "str": "hello",
            "search": "xyz"
          },
          "expectedOutput": "-1"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses indexOf() to find first occurrence.\n  Use indexOf() to find the first occurrence of the search character.\n  Examples:\n    findFirstOccurrence(\"banana\", \"a\") => 1\n    findFirstOccurrence(\"hello\", \"l\") => 2\n    findFirstOccurrence(\"test\", \"t\") => 0\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findFirstOccurrence(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findFirstOccurrence",
      "reference_solution": "function findFirstOccurrence(str, search) {\n  return str.indexOf(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "banana",
            "search": "a"
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "str": "hello",
            "search": "l"
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "str": "test",
            "search": "t"
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "str": "abc",
            "search": "c"
          },
          "expectedOutput": "2"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses lastIndexOf() to find last occurrence.\n  Use lastIndexOf() to find the last occurrence of the search character.\n  Examples:\n    findLastOccurrence(\"banana\", \"a\") => 5\n    findLastOccurrence(\"hello\", \"l\") => 3\n    findLastOccurrence(\"test\", \"t\") => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findLastOccurrence(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findLastOccurrence",
      "reference_solution": "function findLastOccurrence(str, search) {\n  return str.lastIndexOf(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "banana",
            "search": "a"
          },
          "expectedOutput": "5"
        },
        {
          "input": {
            "str": "hello",
            "search": "l"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "test",
            "search": "t"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "abc",
            "search": "a"
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses includes() to check if string contains substring.\n  Use includes() to check if the string contains the search term.\n  Examples:\n    containsSubstring(\"JavaScript is awesome\", \"awesome\") => true\n    containsSubstring(\"Hello World\", \"World\") => true\n    containsSubstring(\"testing\", \"xyz\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction containsSubstring(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "containsSubstring",
      "reference_solution": "function containsSubstring(str, search) {\n  return str.includes(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript is awesome",
            "search": "awesome"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "Hello World",
            "search": "World"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "testing",
            "search": "xyz"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "abc",
            "search": "ab"
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses startsWith() to check string prefix.\n  Use startsWith() to check if the string starts with the search term.\n  Examples:\n    startsWithPrefix(\"hello.txt\", \"hello\") => true\n    startsWithPrefix(\"JavaScript\", \"Java\") => true\n    startsWithPrefix(\"testing\", \"test\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction startsWithPrefix(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "startsWithPrefix",
      "reference_solution": "function startsWithPrefix(str, search) {\n  return str.startsWith(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "hello.txt",
            "search": "hello"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "JavaScript",
            "search": "Java"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "testing",
            "search": "test"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "abc",
            "search": "xyz"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses endsWith() to check string suffix.\n  Use endsWith() to check if the string ends with the search term.\n  Examples:\n    endsWithSuffix(\"hello.txt\", \".txt\") => true\n    endsWithSuffix(\"document.pdf\", \".pdf\") => true\n    endsWithSuffix(\"image.png\", \".jpg\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction endsWithSuffix(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "endsWithSuffix",
      "reference_solution": "function endsWithSuffix(str, search) {\n  return str.endsWith(search);\n}",
      "testCases": [
        {
          "input": {
            "str": "hello.txt",
            "search": ".txt"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "document.pdf",
            "search": ".pdf"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "image.png",
            "search": ".jpg"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "test",
            "search": "st"
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses indexOf() to find the second occurrence.\n  Use indexOf() to find the position of the second occurrence of \"the\".\n  Hint: Use indexOf() twice with a starting position parameter.\n  Examples:\n    findSecondOccurrence(\"the cat in the hat\") => 11\n    findSecondOccurrence(\"the thing in the box\") => 13\n    findSecondOccurrence(\"the the end\") => 4\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction findSecondOccurrence(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "findSecondOccurrence",
      "reference_solution": "function findSecondOccurrence(str) {\n  const first = str.indexOf('the');\n  if (first === -1) return -1;\n  return str.indexOf('the', first + 1);\n}",
      "testCases": [
        {
          "input": {
            "str": "the cat in the hat"
          },
          "expectedOutput": "11"
        },
        {
          "input": {
            "str": "the thing in the box"
          },
          "expectedOutput": "13"
        },
        {
          "input": {
            "str": "the the end"
          },
          "expectedOutput": "4"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that checks if string starts with \"Java\" and ends with \"Script\".\n  Check if the string both starts with \"Java\" and ends with \"Script\".\n  Examples:\n    isJavaScript(\"JavaScript\") => true\n    isJavaScript(\"JavaCode\") => false\n    isJavaScript(\"TypeScript\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isJavaScript(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "isJavaScript",
      "reference_solution": "function isJavaScript(str) {\n  return str.startsWith('Java') && str.endsWith('Script');\n}",
      "testCases": [
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "JavaCode"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "TypeScript"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "Java"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that counts occurrences of a substring.\n  Count how many times the search term appears in the string.\n  Hint: Use indexOf() in a loop or count manually.\n  Examples:\n    countOccurrences(\"hello world hello\", \"hello\") => 2\n    countOccurrences(\"test test test\", \"test\") => 3\n    countOccurrences(\"banana\", \"a\") => 3\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction countOccurrences(str, search) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "countOccurrences",
      "reference_solution": "function countOccurrences(str, search) {\n  let count = 0;\n  let pos = 0;\n  while ((pos = str.indexOf(search, pos)) !== -1) {\n    count++;\n    pos += search.length;\n  }\n  return count;\n}",
      "testCases": [
        {
          "input": {
            "str": "hello world hello",
            "search": "hello"
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "str": "test test test",
            "search": "test"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "banana",
            "search": "a"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "str": "abc",
            "search": "x"
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that validates email format.\n  Check if it contains \"@\" and ends with \".com\".\n  Examples:\n    isValidEmail(\"example@email.com\") => true\n    isValidEmail(\"test@site.org\") => false\n    isValidEmail(\"invalid.com\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isValidEmail(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "isValidEmail",
      "reference_solution": "function isValidEmail(str) {\n  return str.includes('@') && str.endsWith('.com');\n}",
      "testCases": [
        {
          "input": {
            "str": "example@email.com"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "test@site.org"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "invalid.com"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "user@domain.com"
          },
          "expectedOutput": "true"
        }
      ]
    }
  ]
};
