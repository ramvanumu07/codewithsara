/** Topic: Pattern matching (regex) */
export default {
  "id": "regex",
  "title": "Pattern matching",
  "outcomes": [
    "What a Regex Is",
    "Literal Characters and Escaping",
    "Character Classes",
    "Quantifiers",
    "Anchors and Flags",
    "test()",
    "match()",
    "replace() with Regex",
    "Capture Groups",
    "Literal vs Constructor"
  ],
  "outcome_messages": [
    "Let's see what a regex is and how patterns work in JavaScript.\n\nA **regex** is a **pattern** you use to describe text. In JavaScript you create it with **/pattern/** and use it with **test()**, **match()**, and **replace()**. We'll learn how to build patterns (digits, spaces, repetition), then use them with those methods.\n\n```\n  You write    It means\n  /hello/      Matches the literal \"hello\" anywhere in the string\n  /cat/        Matches \"cat\" (e.g. in \"category\" or \"scatter\")\n  /5/          Matches the digit \"5\"\n```\n\n## Example\n\n```javascript\nconst re = /hello/;\nconsole.log(re.test(\"hello world\"));\nconsole.log(re.test(\"hi\"));\n```\n\n## Output\n\n```\ntrue\nfalse\n```\n\n## What happens\n\nThe pattern is the literal \"hello\". \"hello world\" contains it → true; \"hi\" does not → false.\n\n## Practice\n\nIn the example, why does the first test return true and the second false?",
    "Let's match literal text and escape characters that have special meaning in regex.\n\nMost characters match themselves (e.g. **/cat/** matches \"cat\"). Some have **special meaning**: **.** matches any single character; `*` and `?` mean repetition. To match those as plain text, put a **backslash** before them: **/\\./** matches a literal dot (e.g. in \"3.14\"), not any character.\n\n```\n  Pattern        Meaning / One-line example\n  /cat/, /5/    Match themselves: \"cat\", \"5\"\n  .             Any single character (special)\n  \\.            Literal dot (e.g. in \"3.14\")\n  \\*            Literal asterisk\n  \\?            Literal question mark\n```\n\n## Example\n\n```javascript\nconsole.log(/\\./.test(\"a.b\"));\nconsole.log(/./.test(\"a\"));\n```\n\n## Output\n\n```\ntrue\ntrue\n```\n\n## What happens\n\n`\\.` in the pattern matches only a dot; unescaped `.` matches any one character.\n\n## Practice\n\nIn the example, why do we use \\. to match a dot instead of just .?",
    "Let's use shorthand classes like \\d, \\w, and \\s to match kinds of characters.\n\nA **character class** matches **one** character of a certain type. **\\\\d** = any digit; **\\\\w** = letter, digit, or underscore; **\\\\s** = whitespace. Uppercase inverts (e.g. **\\\\D** = non-digit). Each matches exactly one character; for \"one or more\" you'll use a quantifier next.\n\n```\n  Pattern   Matches (one character)      Example\n  \\d       Any digit 0–9                 /\\d/.test(\"x9\") → true\n  \\w       Letter, digit, or underscore  /\\w/.test(\"hi\") → true\n  \\s       Whitespace (space, tab, etc.) /\\s/.test(\"a b\") → true\n  \\D       Non-digit                     /\\D/.test(\"a\") → true\n  \\W       Non-word character            /\\W/.test(\" \") → true\n  \\S       Non-whitespace                /\\S/.test(\"x\") → true\n```\n\n## Example\n\n```javascript\nconsole.log(/\\d/.test(\"x9\"));\nconsole.log(/\\s/.test(\"a b\"));\nconsole.log(/\\w/.test(\"hi\"));\n```\n\n## Output\n\n```\ntrue\ntrue\ntrue\n```\n\n## Practice\n\nIn the example, why does /\\\\d/.test(\"x9\") return true?",
    "Let's control repetition with quantifiers like +, *, ?, and {n,m}.\n\n**Quantifiers** say how many times the **previous** element can match: **+** = one or more, **\*** = zero or more, **?** = zero or one, **{n}** = exactly n, **{n,m}** = between n and m. They apply to the previous character, class, or group (e.g. **\\\\d+** = one or more digits).\n\n```\n  Pattern   Meaning        One-line example\n  +         One or more    /\\d+/.test(\"abc123\") → true\n  *         Zero or more   /\\d*/.test(\"abc\") → true\n  ?         Zero or one    /\\d?/.test(\"a\") → true\n  {n}       Exactly n      /\\d{2}/.test(\"x99y\") → true\n  {n,m}     Between n and m /\\d{2,4}/ matches \"12\", \"123\", \"1234\"\n```\n\n## Example\n\n```javascript\nconsole.log(/\\d+/.test(\"abc123\"));\nconsole.log(/\\d{2}/.test(\"x99y\"));\n```\n\n## Output\n\n```\ntrue\ntrue\n```\n\n## Practice\n\nIn the example, what does the + in \\\\d+ mean?",
    "Let's anchor patterns with ^ and $ and add flags like g and i.\n\n**Anchors** fix position: **^** = start of string, **$** = end. So **/^hi/** means \"starts with hi\"; **/^yes$/** means \"the whole string is exactly yes.\" **Flags** go after the closing slash: **g** = global (all matches), **i** = case-insensitive.\n\n```\n  Symbol   Meaning              One-line example\n  ^        Start of string      /^hi/.test(\"hi there\") → true\n  $        End of string        /ing$/.test(\"running\") → true\n  ^...$    Whole string only    /^yes$/.test(\"yes\") → true\n  g        Global (all matches) \"a1a2\".match(/\\d/g) → [\"1\",\"2\"]\n  i        Case-insensitive     /hello/i.test(\"HELLO\") → true\n```\n\n## Example\n\n```javascript\nconsole.log(/^hi/.test(\"hi there\"));\nconsole.log(/^hi/.test(\"say hi\"));\nconsole.log(/ing$/.test(\"running\"));\n```\n\n## Output\n\n```\ntrue\nfalse\ntrue\n```\n\n## Practice\n\nIn the example, why does /^hi/.test(\"say hi\") return false?",
    "Let's use regex.test(str) when you only need a true/false answer.\n\n**regex.test(str)** returns **true** if the pattern matches anywhere in the string, **false** otherwise. Use it when you only need a yes/no (e.g. \"does it contain a digit?\"). It does not return the matched text.\n\n```\n  Call               Returns                    Use when\n  regex.test(str)    true if match, else false  Yes/no only (e.g. \"has a digit?\")\n```\n\n## Example\n\n```javascript\nconsole.log(/\\d/.test(\"hello123\"));\nconsole.log(/\\d/.test(\"hello\"));\nconsole.log(/^a/.test(\"abc\"));\n```\n\n## Output\n\n```\ntrue\nfalse\ntrue\n```\n\n## Practice\n\nIn the example, when would you use test() instead of match()?",
    "Let's pull matched text out of a string with str.match().\n\n**str.match(regex)** returns the **first** match as an array (full match at index 0), or **null**. With the **g** flag it returns an **array of all** matches. Use match when you need the **text** that matched, not just true/false.\n\n```\n  Call                        Returns\n  str.match(regex)            First match as array (index 0), or null\n  str.match(regex) with g     Array of all matches, or null\n```\n\n## Example\n\n```javascript\nconsole.log(\"hello 123\".match(/\\d+/)[0]);\nconsole.log(\"a1 b2\".match(/\\d/g));\n```\n\n## Output\n\n```\n123\n[ '1', '2' ]\n```\n\n## Practice\n\nIn the example, why does the first match give one value but the second gives an array of two?",
    "Let's replace matches with str.replace()—use the g flag to replace every match.\n\n**str.replace(regex, replacement)** replaces the **first** match. With the **g** flag it replaces **every** match. Use it to change all occurrences or when the pattern is flexible (e.g. every digit, every space).\n\n```\n  Call                           Behavior\n  str.replace(regex, \"x\")       Replaces first match with \"x\"\n  str.replace(regex, \"x\") with g  Replaces every match with \"x\"\n```\n\n## Example\n\n```javascript\nconsole.log(\"one two three\".replace(/ /g, \"-\"));\n```\n\n## Output\n\n```\none-two-three\n```\n\n## Practice\n\nIn the example, why do we use the g flag in the regex?",
    "Let's capture parts of a match with parentheses and reuse them in replace ($1, $2, …).\n\n**Parentheses ( )** in the pattern create a **capture group**. The matched text is available as **match[1]**, **match[2]**, ... (**match[0]** is the full match). In **replace**, use **$1**, **$2**, ... in the replacement to insert captured text. Use groups to **extract** parts (e.g. year, month, day) or **reuse** them.\n\n```\n  Syntax              Meaning              One-line example\n  (pattern)           Capture this part    (\\d{4}) captures 4-digit year\n  match[0]            Full match            match[1], match[2] = 1st, 2nd group\n  $1, $2 in replace   Insert captured text \"2024-05\".replace(/(\\d{4})-(\\d{2})/, \"$2/$1\") → \"05/2024\"\n```\n\n## Example\n\n```javascript\nconst m = \"2024-05-15\".match(/(\\d{4})-(\\d{2})-(\\d{2})/);\nconsole.log(m[1], m[2], m[3]);\n```\n\n## Output\n\n```\n2024 05 15\n```\n\n## Practice\n\nIn the example, what do m[1], m[2], and m[3] contain?",
    "Let's choose between a /pattern/ literal and new RegExp() when the pattern comes from a variable.\n\n**Literal** **/pattern/flags** (e.g. **/\\\\d+/g**) — use when the pattern is **fixed** in code. **Constructor** **new RegExp('pattern', 'flags')** — use when the pattern is in a **variable** or built from strings. In the constructor, **double** backslashes in the string: **new RegExp('\\\\d+')** for \\d, because the string parser consumes one.\n\n```\n  Form                          When to use              Example\n  /pattern/flags                Pattern fixed in code     /\\d+/g\n  new RegExp('pattern', 'flags') Pattern in variable       new RegExp(search)\n```\n\n## Example\n\n```javascript\nconst literal = /ab/;\nconst search = \"ab\";\nconst dynamic = new RegExp(search);\nconsole.log(literal.test(\"abc\"), dynamic.test(\"abc\"));\n```\n\n## Output\n\n```\ntrue true\n```\n\n(Both match \"ab\" in \"abc\". You can't do `/search/` and have it use the variable—use the constructor.)\n\n## Practice\n\nIn the example, why can't we use /search/ to test with the variable?"
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
