/** Topic: split and join (split-join) */
export default {
  "id": "split-join",
  "title": "split and join",
  "outcomes": [
    "split Syntax: Deconstructing Strings into Arrays",
    "join Syntax: Reconstructing Arrays into Strings",
    "The Empty Separator: Character-level Tokenization",
    "The Round Trip: Splitting, Modifying, and Joining",
    "Implicit Join: Behavior with Missing or Default Separators"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses split() to convert string to array.\n  Use split() to convert it into an array using comma as separator.\n  Examples:\n    splitByComma(\"apple,banana,cherry\") => [\"apple\",\"banana\",\"cherry\"]\n    splitByComma(\"one,two,three\") => [\"one\",\"two\",\"three\"]\n    splitByComma(\"hello\") => [\"hello\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitByComma(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "splitByComma",
      "reference_solution": "function splitByComma(str) {\n  return str.split(',');\n}",
      "testCases": [
        {
          "input": {
            "str": "apple,banana,cherry"
          },
          "expectedOutput": "[\"apple\",\"banana\",\"cherry\"]"
        },
        {
          "input": {
            "str": "one,two,three"
          },
          "expectedOutput": "[\"one\",\"two\",\"three\"]"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "[\"test\"]"
        },
        {
          "input": {
            "str": "a,b"
          },
          "expectedOutput": "[\"a\",\"b\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses join() to convert array to string.\n  Use join() to convert it into a string with comma separator.\n  Examples:\n    joinWithComma([\"apple\", \"banana\", \"cherry\"]) => \"apple,banana,cherry\"\n    joinWithComma([\"one\", \"two\", \"three\"]) => \"one,two,three\"\n    joinWithComma([\"test\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinWithComma(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "joinWithComma",
      "reference_solution": "function joinWithComma(arr) {\n  return arr.join(',');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry"
            ]
          },
          "expectedOutput": "apple,banana,cherry"
        },
        {
          "input": {
            "arr": [
              "one",
              "two",
              "three"
            ]
          },
          "expectedOutput": "one,two,three"
        },
        {
          "input": {
            "arr": [
              "test"
            ]
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "arr": [
              "a",
              "b"
            ]
          },
          "expectedOutput": "a,b"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses split('') to convert string to character array.\n  Use split('') to convert it into an array of characters.\n  Examples:\n    splitToCharacters(\"hello\") => [\"h\",\"e\",\"l\",\"l\",\"o\"]\n    splitToCharacters(\"abc\") => [\"a\",\"b\",\"c\"]\n    splitToCharacters(\"x\") => [\"x\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitToCharacters(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "splitToCharacters",
      "reference_solution": "function splitToCharacters(str) {\n  return str.split('');\n}",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "[\"h\",\"e\",\"l\",\"l\",\"o\"]"
        },
        {
          "input": {
            "str": "abc"
          },
          "expectedOutput": "[\"a\",\"b\",\"c\"]"
        },
        {
          "input": {
            "str": "x"
          },
          "expectedOutput": "[\"x\"]"
        },
        {
          "input": {
            "str": "JS"
          },
          "expectedOutput": "[\"J\",\"S\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses join('') to convert character array to string.\n  Use join('') to convert it into a string with no separator.\n  Examples:\n    joinCharacters([\"H\", \"e\", \"l\", \"l\", \"o\"]) => \"Hello\"\n    joinCharacters([\"a\", \"b\", \"c\"]) => \"abc\"\n    joinCharacters([\"t\", \"e\", \"s\", \"t\"]) => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinCharacters(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "joinCharacters",
      "reference_solution": "function joinCharacters(arr) {\n  return arr.join('');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "H",
              "e",
              "l",
              "l",
              "o"
            ]
          },
          "expectedOutput": "Hello"
        },
        {
          "input": {
            "arr": [
              "a",
              "b",
              "c"
            ]
          },
          "expectedOutput": "abc"
        },
        {
          "input": {
            "arr": [
              "t",
              "e",
              "s",
              "t"
            ]
          },
          "expectedOutput": "test"
        },
        {
          "input": {
            "arr": [
              "x"
            ]
          },
          "expectedOutput": "x"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses split() to convert string to word array.\n  Use split() with space separator to create an array.\n  Examples:\n    splitBySpace(\"one two three four\") => [\"one\",\"two\",\"three\",\"four\"]\n    splitBySpace(\"hello world\") => [\"hello\",\"world\"]\n    splitBySpace(\"test\") => [\"test\"]\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction splitBySpace(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "splitBySpace",
      "reference_solution": "function splitBySpace(str) {\n  return str.split(' ');\n}",
      "testCases": [
        {
          "input": {
            "str": "one two three four"
          },
          "expectedOutput": "[\"one\",\"two\",\"three\",\"four\"]"
        },
        {
          "input": {
            "str": "hello world"
          },
          "expectedOutput": "[\"hello\",\"world\"]"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "[\"test\"]"
        },
        {
          "input": {
            "str": "a b c"
          },
          "expectedOutput": "[\"a\",\"b\",\"c\"]"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses join() to create a sentence.\n  Use join() with space separator to create a sentence.\n  Examples:\n    joinWithSpace([\"JavaScript\", \"is\", \"awesome\"]) => \"JavaScript is awesome\"\n    joinWithSpace([\"Hello\", \"World\"]) => \"Hello World\"\n    joinWithSpace([\"one\"]) => \"one\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction joinWithSpace(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "joinWithSpace",
      "reference_solution": "function joinWithSpace(arr) {\n  return arr.join(' ');\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "JavaScript",
              "is",
              "awesome"
            ]
          },
          "expectedOutput": "JavaScript is awesome"
        },
        {
          "input": {
            "arr": [
              "Hello",
              "World"
            ]
          },
          "expectedOutput": "Hello World"
        },
        {
          "input": {
            "arr": [
              "one"
            ]
          },
          "expectedOutput": "one"
        },
        {
          "input": {
            "arr": [
              "I",
              "love",
              "coding"
            ]
          },
          "expectedOutput": "I love coding"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that checks if a string is a palindrome.\n  Split it into characters, reverse the array, then join back.\n  Check if the result equals the original string.\n  Examples:\n    isPalindrome(\"racecar\") => true\n    isPalindrome(\"hello\") => false\n    isPalindrome(\"madam\") => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction isPalindrome(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "isPalindrome",
      "reference_solution": "function isPalindrome(str) {\n  return str.split('').reverse().join('') === str;\n}",
      "testCases": [
        {
          "input": {
            "str": "racecar"
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
            "str": "madam"
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that transforms words to uppercase and joins with hyphens.\n  Split into words, convert each word to uppercase, then join with hyphens.\n  Examples:\n    wordsToUppercaseHyphenated(\"hello world\") => \"HELLO-WORLD\"\n    wordsToUppercaseHyphenated(\"one two three\") => \"ONE-TWO-THREE\"\n    wordsToUppercaseHyphenated(\"test\") => \"TEST\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction wordsToUppercaseHyphenated(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "wordsToUppercaseHyphenated",
      "reference_solution": "function wordsToUppercaseHyphenated(str) {\n  return str.split(' ').map(function(w) { return w.toUpperCase(); }).join('-');\n}",
      "testCases": [
        {
          "input": {
            "str": "hello world"
          },
          "expectedOutput": "HELLO-WORLD"
        },
        {
          "input": {
            "str": "one two three"
          },
          "expectedOutput": "ONE-TWO-THREE"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "TEST"
        },
        {
          "input": {
            "str": "javascript is fun"
          },
          "expectedOutput": "JAVASCRIPT-IS-FUN"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that replaces hyphens with spaces using split and join.\n  Split by hyphen, then join with space.\n  Examples:\n    replaceHyphensWithSpaces(\"apple-banana-cherry\") => \"apple banana cherry\"\n    replaceHyphensWithSpaces(\"one-two-three\") => \"one two three\"\n    replaceHyphensWithSpaces(\"test\") => \"test\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction replaceHyphensWithSpaces(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "replaceHyphensWithSpaces",
      "reference_solution": "function replaceHyphensWithSpaces(str) {\n  return str.split('-').join(' ');\n}",
      "testCases": [
        {
          "input": {
            "str": "apple-banana-cherry"
          },
          "expectedOutput": "apple banana cherry"
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
            "str": "a-b-c"
          },
          "expectedOutput": "a b c"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that reverses and uppercases a string.\n  Split into characters, reverse the array, join back, and convert to uppercase.\n  Examples:\n    reverseAndUppercase(\"hello\") => \"OLLEH\"\n    reverseAndUppercase(\"world\") => \"DLROW\"\n    reverseAndUppercase(\"test\") => \"TSET\"\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction reverseAndUppercase(str) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "reverseAndUppercase",
      "reference_solution": "function reverseAndUppercase(str) {\n  return str.split('').reverse().join('').toUpperCase();\n}",
      "testCases": [
        {
          "input": {
            "str": "hello"
          },
          "expectedOutput": "OLLEH"
        },
        {
          "input": {
            "str": "world"
          },
          "expectedOutput": "DLROW"
        },
        {
          "input": {
            "str": "abc"
          },
          "expectedOutput": "CBA"
        },
        {
          "input": {
            "str": "test"
          },
          "expectedOutput": "TSET"
        }
      ]
    }
  ]
};
