/** Topic: Pattern matching (regex) */
export default {
  "id": "regex",
  "title": "Pattern matching",
  "outcomes": [
    "Regular Expressions: Defining Patterns in Memory",
    "Literal vs. Constructor: Creating Regex Objects",
    "The .test() Method: Pattern Verification (Boolean)",
    "The .match() Method: Extracting Pattern Matches",
    "Advanced Substitution: replace() with Regex",
    "Character Classes: Searching for Types (\\d, \\w, \\s)",
    "Special Characters and Escaping",
    "Quantifiers: Managing Repetition (+, *, {n})",
    "Anchors: Start (^) and End ($) Boundaries",
    "Flags: Global (g) and Case-Insensitive (i) searches",
    "Capture Groups: Isolating Sub-patterns",
    "The .exec() Method: Iterative Pattern Matching"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses regex to test if string contains digits.\n  Create a regex pattern to test if the string contains any digit.\n  Use the test() method.\n  Examples:\n    containsDigit(\"hello123\") => true\n    containsDigit(\"hello\") => false\n    containsDigit(\"test456\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction containsDigit(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "containsDigit",
      "reference_solution": "function containsDigit(str) {\n  return /\\d/.test(str);\n}",
      "testCases": [
        {
          "input": {
            "str": "hello123"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "test456"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "abc"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to match all digits.\n  Create a regex to match all digits in the string.\n  Use the match() method with global flag.\n  Examples:\n    matchAllDigits(\"The year is 2024\") => [\"2\",\"0\",\"2\",\"4\"]\n    matchAllDigits(\"Room 101\") => [\"1\",\"0\",\"1\"]\n    matchAllDigits(\"No digits here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchAllDigits(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "matchAllDigits",
      "reference_solution": "function matchAllDigits(str) {\n  return str.match(/\\d/g);\n}",
      "testCases": [
        {
          "input": {
            "str": "The year is 2024"
          },
          "expectedOutput": "[\"2\",\"0\",\"2\",\"4\"]"
        },
        {
          "input": {
            "str": "Room 101"
          },
          "expectedOutput": "[\"1\",\"0\",\"1\"]"
        },
        {
          "input": {
            "str": "No digits here"
          },
          "expectedOutput": "null"
        },
        {
          "input": {
            "str": "42"
          },
          "expectedOutput": "[\"4\",\"2\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to replace spaces with hyphens.\n  Create a regex to replace all spaces with hyphens.\n  Use replace() with regex and global flag.\n  Examples:\n    replaceSpacesWithHyphens(\"Hello World\") => \"Hello-World\"\n    replaceSpacesWithHyphens(\"one two three\") => \"one-two-three\"\n    replaceSpacesWithHyphens(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceSpacesWithHyphens(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "replaceSpacesWithHyphens",
      "reference_solution": "function replaceSpacesWithHyphens(str) {\n  return str.replace(/ /g, '-');\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World"
          },
          "expectedOutput": "Hello-World"
        },
        {
          "input": {
            "str": "one two three"
          },
          "expectedOutput": "one-two-three"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "str": "a b c"
          },
          "expectedOutput": "a-b-c"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses case-insensitive regex to match \"hello\".\n  Create a case-insensitive regex to match all occurrences of \"hello\".\n  Use match() with global and case-insensitive flags.\n  Examples:\n    matchHelloCaseInsensitive(\"hello HELLO HeLLo\") => [\"hello\",\"HELLO\",\"HeLLo\"]\n    matchHelloCaseInsensitive(\"Say hello and HELLO\") => [\"hello\",\"HELLO\"]\n    matchHelloCaseInsensitive(\"world\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchHelloCaseInsensitive(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "matchHelloCaseInsensitive",
      "reference_solution": "function matchHelloCaseInsensitive(str) {\n  return str.match(/hello/gi);\n}",
      "testCases": [
        {
          "input": {
            "str": "hello HELLO HeLLo"
          },
          "expectedOutput": "[\"hello\",\"HELLO\",\"HeLLo\"]"
        },
        {
          "input": {
            "str": "Say hello and HELLO"
          },
          "expectedOutput": "[\"hello\",\"HELLO\"]"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "null"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to match digit sequences.\n  Create a regex to match sequences of one or more digits.\n  Use match() with global flag.\n  Examples:\n    matchDigitSequences(\"abc123def456\") => [\"123\",\"456\"]\n    matchDigitSequences(\"test99x88\") => [\"99\",\"88\"]\n    matchDigitSequences(\"no digits\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchDigitSequences(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "matchDigitSequences",
      "reference_solution": "function matchDigitSequences(str) {\n  return str.match(/\\d+/g);\n}",
      "testCases": [
        {
          "input": {
            "str": "abc123def456"
          },
          "expectedOutput": "[\"123\",\"456\"]"
        },
        {
          "input": {
            "str": "test99x88"
          },
          "expectedOutput": "[\"99\",\"88\"]"
        },
        {
          "input": {
            "str": "no digits"
          },
          "expectedOutput": "null"
        },
        {
          "input": {
            "str": "42"
          },
          "expectedOutput": "[\"42\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex with ^ anchor to test string start.\n  Create a regex to test if the string starts with \"he\".\n  Use test() method with ^ anchor.\n  Examples:\n    startsWithHe(\"hello\") => true\n    startsWithHe(\"help\") => true\n    startsWithHe(\"world\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction startsWithHe(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "startsWithHe",
      "reference_solution": "function startsWithHe(str) {\n  return /^he/.test(str);\n}",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "help"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "the"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex with $ anchor to test string end.\n  Create a regex to test if the string ends with \"ing\".\n  Use test() method with $ anchor.\n  Examples:\n    endsWithIng(\"testing\") => true\n    endsWithIng(\"running\") => true\n    endsWithIng(\"test\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction endsWithIng(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "endsWithIng",
      "reference_solution": "function endsWithIng(str) {\n  return /ing$/.test(str);\n}",
      "testCases": [
        {
          "input": {
            "str": "testing"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "running"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "singer"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to match words ending with \"at\".\n  Create a regex to match all three-letter words ending with \"at\".\n  Use match() with global flag.\n  Examples:\n    matchWordsEndingWithAt(\"cat bat rat mat\") => [\"cat\",\"bat\",\"rat\",\"mat\"]\n    matchWordsEndingWithAt(\"sat fat\") => [\"sat\",\"fat\"]\n    matchWordsEndingWithAt(\"dog log\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction matchWordsEndingWithAt(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "matchWordsEndingWithAt",
      "reference_solution": "function matchWordsEndingWithAt(str) {\n  return str.match(/\\b\\wat\\b/g);\n}",
      "testCases": [
        {
          "input": {
            "str": "cat bat rat mat"
          },
          "expectedOutput": "[\"cat\",\"bat\",\"rat\",\"mat\"]"
        },
        {
          "input": {
            "str": "sat fat"
          },
          "expectedOutput": "[\"sat\",\"fat\"]"
        },
        {
          "input": {
            "str": "dog log"
          },
          "expectedOutput": "null"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to normalize spaces.\n  Create a regex to replace multiple consecutive spaces with a single space.\n  Use replace() with regex and global flag.\n  Examples:\n    normalizeSpaces(\"hello   world  test\") => \"hello world test\"\n    normalizeSpaces(\"one    two\") => \"one two\"\n    normalizeSpaces(\"a  b  c\") => \"a b c\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction normalizeSpaces(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "normalizeSpaces",
      "reference_solution": "function normalizeSpaces(str) {\n  return str.replace(/  +/g, ' ');\n}",
      "testCases": [
        {
          "input": {
            "str": "hello   world  test"
          },
          "expectedOutput": "hello world test"
        },
        {
          "input": {
            "str": "one    two"
          },
          "expectedOutput": "one two"
        },
        {
          "input": {
            "str": "a  b  c"
          },
          "expectedOutput": "a b c"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "test"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to test if string is alphanumeric.\n  Create a regex to test if the string contains only alphanumeric characters.\n  Use test() method.\n  Examples:\n    isAlphanumeric(\"abc123XYZ\") => true\n    isAlphanumeric(\"test123\") => true\n    isAlphanumeric(\"hello world\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isAlphanumeric(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "isAlphanumeric",
      "reference_solution": "function isAlphanumeric(str) {\n  return /^[a-zA-Z0-9]+$/.test(str);\n}",
      "testCases": [
        {
          "input": {
            "str": "abc123XYZ"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "test123"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "hello world"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "test@123"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to extract phone number.\n  Create a regex to match a phone pattern: 3 digits, hyphen, 4 digits.\n  Use match() method.\n  Examples:\n    extractPhoneNumber(\"My phone is 555-1234\") => \"555-1234\"\n    extractPhoneNumber(\"Call 123-4567 now\") => \"123-4567\"\n    extractPhoneNumber(\"No phone here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractPhoneNumber(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractPhoneNumber",
      "reference_solution": "function extractPhoneNumber(str) {\n  const m = str.match(/\\d{3}-\\d{4}/);\n  return m ? m[0] : null;\n}",
      "testCases": [
        {
          "input": {
            "str": "My phone is 555-1234"
          },
          "expectedOutput": "555-1234"
        },
        {
          "input": {
            "str": "Call 123-4567 now"
          },
          "expectedOutput": "123-4567"
        },
        {
          "input": {
            "str": "No phone here"
          },
          "expectedOutput": "null"
        },
        {
          "input": {
            "str": "999-0000"
          },
          "expectedOutput": "999-0000"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to extract price.\n  Create a regex to extract the dollar amount (digits and decimal).\n  Use match() to get the price.\n  Examples:\n    extractPrice(\"Price: $25.99\") => \"25.99\"\n    extractPrice(\"Cost: $100.50\") => \"100.50\"\n    extractPrice(\"$9.99 only\") => \"9.99\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractPrice(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractPrice",
      "reference_solution": "function extractPrice(str) {\n  const m = str.match(/\\d+(?:\\.\\d+)?/);\n  return m ? m[0] : null;\n}",
      "testCases": [
        {
          "input": {
            "str": "Price: $25.99"
          },
          "expectedOutput": "25.99"
        },
        {
          "input": {
            "str": "Cost: $100.50"
          },
          "expectedOutput": "100.50"
        },
        {
          "input": {
            "str": "$9.99 only"
          },
          "expectedOutput": "9.99"
        },
        {
          "input": {
            "str": "No price"
          },
          "expectedOutput": "null"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to validate email format.\n  Create a regex to validate basic email format.\n  Pattern: one or more word characters, @, one or more word characters, dot, 2-3 letters.\n  Examples:\n    validateEmail(\"email@example.com\") => true\n    validateEmail(\"test@site.org\") => true\n    validateEmail(\"invalid.email.com\") => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction validateEmail(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "validateEmail",
      "reference_solution": "function validateEmail(str) {\n  return /^\\w+@\\w+\\.[a-zA-Z]{2,3}$/.test(str);\n}",
      "testCases": [
        {
          "input": {
            "str": "email@example.com"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "test@site.org"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "invalid.email.com"
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "str": "user@domain"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to extract code pattern.\n  Create a regex to match the pattern: 3 uppercase letters, hyphen, 3 digits, hyphen, 3 uppercase letters.\n  Use match() method.\n  Examples:\n    extractCode(\"The code is ABC-123-XYZ\") => \"ABC-123-XYZ\"\n    extractCode(\"Code: DEF-456-GHI\") => \"DEF-456-GHI\"\n    extractCode(\"No code here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractCode(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractCode",
      "reference_solution": "function extractCode(str) {\n  const m = str.match(/[A-Z]{3}-\\d{3}-[A-Z]{3}/);\n  return m ? m[0] : null;\n}",
      "testCases": [
        {
          "input": {
            "str": "The code is ABC-123-XYZ"
          },
          "expectedOutput": "ABC-123-XYZ"
        },
        {
          "input": {
            "str": "Code: DEF-456-GHI"
          },
          "expectedOutput": "DEF-456-GHI"
        },
        {
          "input": {
            "str": "No code here"
          },
          "expectedOutput": "null"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses regex to extract URLs.\n  Create a regex to extract URLs that start with http:// or https://.\n  Use match() method.\n  Examples:\n    extractURL(\"Visit https://example.com for more\") => \"https://example.com\"\n    extractURL(\"Go to http://test.org\") => \"http://test.org\"\n    extractURL(\"No URL here\") => null\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction extractURL(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "extractURL",
      "reference_solution": "function extractURL(str) {\n  const m = str.match(/https?:\\/\\/[^\\s]+/);\n  return m ? m[0] : null;\n}",
      "testCases": [
        {
          "input": {
            "str": "Visit https://example.com for more"
          },
          "expectedOutput": "https://example.com"
        },
        {
          "input": {
            "str": "Go to http://test.org"
          },
          "expectedOutput": "http://test.org"
        },
        {
          "input": {
            "str": "No URL here"
          },
          "expectedOutput": "null"
        }
      ]
    }
  ]
};
