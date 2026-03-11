/** Topic: split and join (split-join) */
export default {
  "id": "split-join",
  "title": "split and join",
  "outcomes": [
    "What split() Does",
    "What join() Does",
    "split(\"\") for Characters",
    "Split, Modify, Join"
  ],
  "outcome_messages": [
    "**What split() does**\n\n**str.split(separator)** returns an **array of substrings**. The separator is where to cut; it is **not** included in the result. If the separator never appears, you get a one-element array containing the whole string. The original string is unchanged. Use split when you have delimited text (e.g. CSV, hyphenated words) and need to work with the pieces.\n\n**Example**\n\n```javascript\nconst s = \"one-two-three\";\nconsole.log(s.split(\"-\"));\n```\n\n**Output**\n\n```\n[ 'one', 'two', 'three' ]\n```\n\n**What happens**\n\n- The string is cut at each \"-\"; the hyphens are not included.\n- You get three elements. s is still \"one-two-three\".\n\n**Practice**\n\nWhat does \"apple,banana,cherry\".split(\",\") return? What about \"hello\".split(\",\")?",
    "**What join() does**\n\n**arr.join(separator)** returns a **string**: each element is converted to a string and the separator is placed **between** them (not before the first or after the last). The original array is unchanged. Use join when you have an array and want one string (e.g. a CSV line or a sentence). **join()** with no argument uses **comma** as the separator. **join(\"\")** puts nothing between elements. An empty array returns \"\" regardless of separator.\n\n**Example**\n\n```javascript\nconst arr = [\"x\", \"y\", \"z\"];\nconsole.log(arr.join(\"\"));\nconsole.log(arr.join(\", \"));\n```\n\n**Output**\n\n```\nxyz\nx, y, z\n```\n\n**What happens**\n\n- join(\"\"): no separator between elements → \"xyz\".\n- join(\", \"): comma and space between → \"x, y, z\".\n- arr is unchanged.\n\n**Practice**\n\nYou have [\"a\", \"b\", \"c\"]. Write a join call that produces \"a|b|c\". What does [].join(\",\") return?",
    "**split(\"\") for characters**\n\n**str.split(\"\")** splits the string into an array of **single characters**. Each character (including spaces) becomes one element. Use this when you need to work with each character—e.g. count, reverse, or transform. **arr.join(\"\")** does the opposite: it concatenates the array with nothing between, so you can go from string → characters → back to string after changes.\n\n**Example**\n\n```javascript\nconsole.log(\"abc\".split(\"\"));\n```\n\n**Output**\n\n```\n[ 'a', 'b', 'c' ]\n```\n\n**What happens**\n\n- Splitting with \"\" cuts between every character, so you get one element per character.\n- For normal text (letters, numbers, spaces), this is fine. For emoji or other complex characters, one \"character\" might take more than one array element.\n\n**Practice**\n\nHow do you get an array of characters from \"hello\"? What is the length of that array?",
    "**Split, modify, join**\n\nA common pattern: **split** a string into an array, **change** the array (with map, filter, etc.), then **join** back to a string. That way you use array methods on text—uppercase each word, remove empty parts, reorder, and so on.\n\n**Example**\n\n```javascript\nconst s = \"one two three\";\nconst out = s.split(\" \").map(function(w) { return w.toUpperCase(); }).join(\" \");\nconsole.log(out);\n```\n\n**Output**\n\n```\nONE TWO THREE\n```\n\n**What happens**\n\n- split(\" \") → [\"one\", \"two\", \"three\"].\n- map: each word becomes uppercase → [\"ONE\", \"TWO\", \"THREE\"].\n- join(\" \") → \"ONE TWO THREE\".\n\n**Practice**\n\nYou have \"a,b,c\" and want \"A,B,C\". Write the chain: split (by comma), then map (uppercase), then join (by comma). What is the result?"
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
