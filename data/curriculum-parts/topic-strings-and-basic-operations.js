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
    "Let's work with strings.\n\nA string is text: letters, digits, spaces, symbols. In JavaScript you create it with single or double quotes and store it in a variable.\n\nHere's a simple example:\n\n```javascript\nconst greeting = \"Hello\";\nconsole.log(greeting);    // Hello\n```\n\nStrings are values you can store and use. We'll see length and character access in the next outcomes.\n\nNow, let's try a simple practice task: Write code that stores your name in a variable and prints it.",
    "Let's create strings.\n\nYou can use single quotes `'...'` or double quotes `\"...\"`. Both create a string. Use the quote type that doesn't appear in your text so you don't have to escape.\n\nHere's a simple example:\n\n```javascript\nconst a = \"Hello\";\nconst b = 'World';\nconst c = 'It\\'s fun';    // apostrophe escaped with backslash\nconsole.log(a);    // Hello\nconsole.log(b);    // World\nconsole.log(c);    // It's fun\n```\n\nIn `'It\\'s fun'` we use single quotes for the whole string. The apostrophe in \"It's\" would normally end the string after \"It\", so JavaScript would treat the rest as invalid. The backslash before the apostrophe (`\\'`) escapes it: it tells JavaScript \"this is an apostrophe character inside the string, not the end of the string.\" The result is the string It's fun. Without the backslash you get a syntax error.\n\nNow, let's try a simple practice task: Write code that creates a string with your city name and prints it.",
    "Let's get the length of a string.\n\nEvery string has a `.length` property. It gives the number of characters (including spaces). No parentheses—length is a property, not a method.\n\nHere's a simple example:\n\n```javascript\nconst word = \"JavaScript\";\nconsole.log(word.length);    // 10\nconsole.log(\"hi\".length);    // 2\n```\n\nThe empty string `\"\"` has length 0. Length is read-only; you don't set it.\n\nNow, let's try a simple practice task: Write code that prints the length of the string \"hello\".",
    "Let's access characters by index.\n\nString positions start at 0. Use square brackets: `str[0]` is the first character, `str[1]` the second. The last character is `str[str.length - 1]`.\n\nHere's a simple example:\n\n```javascript\nconst word = \"Code\";\nconsole.log(word[0]);    // C\nconsole.log(word[1]);    // o\nconsole.log(word[word.length - 1]);    // e\n```\n\nIndex out of range (e.g. word[10]) gives `undefined`. Indexing is zero-based.\n\nNow, let's try a simple practice task: Write code that prints the first and last character of the string \"JavaScript\".",
    "Let's concatenate strings.\n\nUse `+` to join strings. The result is a new string. Remember: no automatic space between parts—add `\" \"` if you want a space.\n\nHere's a simple example:\n\n```javascript\nconst first = \"Hello\";\nconst second = \"World\";\nconsole.log(first + \" \" + second);    // Hello World\nconsole.log(first + second);       // HelloWorld\n```\n\nConcatenation works with variables and literals. Numbers mixed with + and strings get converted to strings in that expression.\n\nNow, let's try a simple practice task: Write code that joins \"Good\" and \"morning\" with a space and prints the result.",
    "Let's change string case.\n\n`.toLowerCase()` returns the string in lowercase. `.toUpperCase()` returns it in uppercase. The original string is unchanged; these methods return a new string.\n\nHere's a simple example:\n\n```javascript\nconst word = \"Hello\";\nconsole.log(word.toLowerCase());    // hello\nconsole.log(word.toUpperCase());    // HELLO\nconsole.log(word);    // Hello (unchanged)\n```\n\nMethods are called with parentheses. Use them when you need to compare or display in a specific case.\n\nNow, let's try a simple practice task: Write code that prints \"WORLD\" in lowercase.",
    "Let's chain string methods.\n\nYou can call one method on the result of another: `str.method1().method2()`. Each method returns a string, so you can keep calling methods on the result. Execution flows left to right.\n\nHere's a simple example:\n\n```javascript\nconst text = \"  Hello World  \";\nconsole.log(text.trim().toUpperCase());    // HELLO WORLD\n```\n\nStep 1 — `text.trim()` removes spaces at the start and end, so the result is `\"Hello World\"`. Step 2 — `.toUpperCase()` is called on that result and returns `\"HELLO WORLD\"`. So the final output is HELLO WORLD. Each step works on the result of the previous one.\n\nNow, let's try a simple practice task: Write code that takes \"  abc  \" and prints it trimmed and in uppercase."
  ],
  "tasks": [
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"JavaScript\";\n\n// Print the length of the string\n// For example, if str = \"JavaScript\", your output should be:\n// 10",
      "solution_type": "script",
      "reference_solution": "const str = \"JavaScript\";\nconsole.log(str.length);",
      "testCases": [
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "10"
        },
        {
          "input": {
            "str": "Programming"
          },
          "expectedOutput": "11"
        },
        {
          "input": {
            "str": "Code"
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "str": ""
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "str": "A"
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "str": "Development"
          },
          "expectedOutput": "11"
        }
      ]
    },
    {
      "description": "// Do not rename word, use it as input for your program.\n// While testing we will change its value.\nconst word = \"Programming\";\n\n// Print the first character and the last character\n// For example, if word = \"Programming\", your output should be:\n// P\n// g",
      "solution_type": "script",
      "reference_solution": "const word = \"Programming\";\nconsole.log(word[0]);\nconsole.log(word[word.length - 1]);",
      "testCases": [
        {
          "input": {
            "word": "Programming"
          },
          "expectedOutput": "P\ng"
        },
        {
          "input": {
            "word": "JavaScript"
          },
          "expectedOutput": "J\nt"
        },
        {
          "input": {
            "word": "Code"
          },
          "expectedOutput": "C\ne"
        },
        {
          "input": {
            "word": "A"
          },
          "expectedOutput": "A\nA"
        },
        {
          "input": {
            "word": "Algorithm"
          },
          "expectedOutput": "A\nm"
        },
        {
          "input": {
            "word": "Function"
          },
          "expectedOutput": "F\nn"
        }
      ]
    },
    {
      "description": "// Do not rename firstName and lastName, use them as input for your program.\n// While testing we will change their values.\nconst firstName = \"John\";\nconst lastName = \"Smith\";\n\n// Create and print: \"firstName lastName\" and \"lastName, firstName\"\n// For example, if firstName = \"John\" and lastName = \"Smith\", your output should be:\n// John Smith\n// Smith, John",
      "solution_type": "script",
      "reference_solution": "const firstName = \"John\";\nconst lastName = \"Smith\";\nconsole.log(firstName + \" \" + lastName);\nconsole.log(lastName + \", \" + firstName);",
      "testCases": [
        {
          "input": {
            "firstName": "John",
            "lastName": "Smith"
          },
          "expectedOutput": "John Smith\nSmith, John"
        },
        {
          "input": {
            "firstName": "Alice",
            "lastName": "Johnson"
          },
          "expectedOutput": "Alice Johnson\nJohnson, Alice"
        },
        {
          "input": {
            "firstName": "Bob",
            "lastName": "Brown"
          },
          "expectedOutput": "Bob Brown\nBrown, Bob"
        },
        {
          "input": {
            "firstName": "Emma",
            "lastName": "Davis"
          },
          "expectedOutput": "Emma Davis\nDavis, Emma"
        },
        {
          "input": {
            "firstName": "Michael",
            "lastName": "Wilson"
          },
          "expectedOutput": "Michael Wilson\nWilson, Michael"
        },
        {
          "input": {
            "firstName": "Sarah",
            "lastName": "Lee"
          },
          "expectedOutput": "Sarah Lee\nLee, Sarah"
        }
      ]
    },
    {
      "description": "// Do not rename text, use it as input for your program.\n// While testing we will change its value.\nconst text = \"Hello World\";\n\n// Transform to uppercase, then get its length\n// Print the uppercase version and its length\n// For example, if text = \"Hello World\", your output should be:\n// HELLO WORLD\n// 11",
      "solution_type": "script",
      "reference_solution": "const text = \"Hello World\";\nconst upper = text.toUpperCase();\nconsole.log(upper);\nconsole.log(upper.length);",
      "testCases": [
        {
          "input": {
            "text": "Hello World"
          },
          "expectedOutput": "HELLO WORLD\n11"
        },
        {
          "input": {
            "text": "JavaScript"
          },
          "expectedOutput": "JAVASCRIPT\n10"
        },
        {
          "input": {
            "text": "programming"
          },
          "expectedOutput": "PROGRAMMING\n11"
        },
        {
          "input": {
            "text": "Code"
          },
          "expectedOutput": "CODE\n4"
        },
        {
          "input": {
            "text": "a"
          },
          "expectedOutput": "A\n1"
        },
        {
          "input": {
            "text": "Data Structure"
          },
          "expectedOutput": "DATA STRUCTURE\n14"
        }
      ]
    },
    {
      "description": "// Do not rename a, b, c, use them as input for your program.\n// While testing we will change their values.\nconst a = \"Data\";\nconst b = \"Base\";\nconst c = \"System\";\n\n// Create: a+b, b+c, and a+b+c\n// Print all three combinations\n// For example, if a = \"Data\", b = \"Base\", c = \"System\", your output should be:\n// DataBase\n// BaseSystem\n// DataBaseSystem",
      "solution_type": "script",
      "reference_solution": "const a = \"Data\";\nconst b = \"Base\";\nconst c = \"System\";\nconsole.log(a + b);\nconsole.log(b + c);\nconsole.log(a + b + c);",
      "testCases": [
        {
          "input": {
            "a": "Data",
            "b": "Base",
            "c": "System"
          },
          "expectedOutput": "DataBase\nBaseSystem\nDataBaseSystem"
        },
        {
          "input": {
            "a": "Web",
            "b": "App",
            "c": "Dev"
          },
          "expectedOutput": "WebApp\nAppDev\nWebAppDev"
        },
        {
          "input": {
            "a": "Java",
            "b": "Script",
            "c": "Code"
          },
          "expectedOutput": "JavaScript\nScriptCode\nJavaScriptCode"
        },
        {
          "input": {
            "a": "A",
            "b": "B",
            "c": "C"
          },
          "expectedOutput": "AB\nBC\nABC"
        },
        {
          "input": {
            "a": "Front",
            "b": "End",
            "c": "Framework"
          },
          "expectedOutput": "FrontEnd\nEndFramework\nFrontEndFramework"
        },
        {
          "input": {
            "a": "Open",
            "b": "Source",
            "c": "Project"
          },
          "expectedOutput": "OpenSource\nSourceProject\nOpenSourceProject"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Function\";\n\n// Print characters at positions 0, 2, 4, and 6\n// For example, if str = \"Function\", your output should be:\n// F\n// n\n// t\n// o",
      "solution_type": "script",
      "reference_solution": "const str = \"Function\";\nconsole.log(str[0]);\nconsole.log(str[2]);\nconsole.log(str[4]);\nconsole.log(str[6]);",
      "testCases": [
        {
          "input": {
            "str": "Function"
          },
          "expectedOutput": "F\nn\nt\no"
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
            "str": "Development"
          },
          "expectedOutput": "D\nv\nl\nm"
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
      "description": "// Do not rename word, use it as input for your program.\n// While testing we will change its value.\nconst word = \"JavaScript\";\n\n// Print original, uppercase version, lowercase version, then length of uppercase\n// For example, if word = \"JavaScript\", your output should be:\n// JavaScript\n// JAVASCRIPT\n// javascript\n// 10",
      "solution_type": "script",
      "reference_solution": "const word = \"JavaScript\";\nconst upper = word.toUpperCase();\nconst lower = word.toLowerCase();\nconsole.log(word);\nconsole.log(upper);\nconsole.log(lower);\nconsole.log(upper.length);",
      "testCases": [
        {
          "input": {
            "word": "JavaScript"
          },
          "expectedOutput": "JavaScript\nJAVASCRIPT\njavascript\n10"
        },
        {
          "input": {
            "word": "Programming"
          },
          "expectedOutput": "Programming\nPROGRAMMING\nprogramming\n11"
        },
        {
          "input": {
            "word": "Code"
          },
          "expectedOutput": "Code\nCODE\ncode\n4"
        },
        {
          "input": {
            "word": "Algorithm"
          },
          "expectedOutput": "Algorithm\nALGORITHM\nalgorithm\n9"
        },
        {
          "input": {
            "word": "Function"
          },
          "expectedOutput": "Function\nFUNCTION\nfunction\n8"
        },
        {
          "input": {
            "word": "Variable"
          },
          "expectedOutput": "Variable\nVARIABLE\nvariable\n8"
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
          "expectedOutput": "Jav\nasc"
        },
        {
          "input": {
            "text": "Function"
          },
          "expectedOutput": "Fun\nct"
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
