/** Topic: Loops (loops) */
export default {
  "id": "loops",
  "title": "Loops",
  "outcomes": [
    "Loops: repeating code under a condition or count",
    "The while loop: condition-first, update in body",
    "The for loop: init, condition, update in one place",
    "Controlling iteration: start, step, stop and index-based loops",
    "When to use for vs while"
  ],
  "outcome_messages": [
    "Let's see why we need loops and what they do.\n\nImagine you need to print the numbers 1, 2, 3, 4, 5. You could write five separate lines:\n\n```javascript\nconsole.log(1);\nconsole.log(2);\nconsole.log(3);\n```\n\nBut what if you needed 1 to 100? Writing a hundred lines would be tedious and easy to get wrong.\n\n**What a loop does**\n\nA **loop** solves this: you write the action once and tell the computer to repeat it. You also say **when to stop** (e.g. \"stop after 5 times\" or \"stop when this condition is false\"). Each time the block runs is one **iteration**.\n\n**In JavaScript**\n\nWe have two kinds of loops: **while** and **for**. In both, the computer checks a condition before each run—if it's true, the block runs again; when it becomes false, the loop stops. We'll learn **while** first, then **for**.\n\n## Practice\n\nIn one sentence, what is a loop and what is one iteration?",
    "Let's use the **while** loop to repeat a block while a condition is true.\n\n## Syntax\n\n```text\nwhile (condition) {\n  body\n}\n```\n\n**How it works**\n\nThe computer checks the condition. If it is true, the body runs. Then the condition is checked again. This repeats until the condition is false.\n\nSomething **inside the body** must change a value that the condition uses. Otherwise the condition never becomes false and the loop runs forever (an **infinite loop**). So we usually use a variable: set it before the loop, use it in the condition, and update it inside the body.\n\n## Example\n\n```javascript\nlet n = 3;\nwhile (n > 0) {\n  console.log(n);\n  n--;\n}\n```\n\n## Output\n\n```\n3\n2\n1\n```\n\nIn the example above, the update `n--` makes `n` smaller each time. When `n` becomes 0, the condition `n > 0` is false and the loop stops.\n\n## Practice\n\nWrite a while loop that prints the numbers 1, 2, and 3, each on its own line.",
    "Let's use the **for** loop when you know how many times to run (e.g. from 1 to 10). The start value, the condition, and the update are all written in one line.\n\n## Syntax\n\n```text\nfor (init; condition; update) {\n  body\n}\n```\n\n**The three parts**\n\n- **init** runs once at the start (e.g. set a counter).\n- **condition** is checked before each iteration; if false, the loop ends.\n- **update** runs after each iteration (e.g. add 1 to the counter).\n\nThe order is: init → check condition → run body → run update → check condition again → …\n\n## Example\n\n```javascript\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\n```\n\n## Output\n\n```\n1\n2\n3\n```\n\nWe start at 1, run while i is 3 or less, and add 1 after each run. The update is in the loop header, so we are less likely to forget it.\n\n## Practice\n\nWrite a for loop that prints 1 through 5, each on its own line.",
    "Let's control the loop by choosing the **start** value, the **step** (how much to add or subtract each time), and the **stop** condition.\n\n**In a for loop**\n\n- Start goes in init, step in the update (e.g. `i++` or `i += 2`), and stop in the condition (e.g. `i <= 10`).\n- You can use the loop variable inside the body as a counter or as an **index** to access each character in a string or each item in an array.\n\nA common pattern is to loop over a string by index: start at 0, stop when `i < str.length`, and use `str[i]` in the body.\n\n## Example\n\n```javascript\nconst str = \"Hi\";\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}\n```\n\n## Output\n\n```\nH\ni\n```\n\n## Practice\n\nWrite a for loop that prints the even numbers 2, 4, 6, 8, 10 (use `i += 2` in the update).",
    "Let's decide when to use for vs while.\n\n- Use **for** when you have a clear range or count: \"from 1 to 10\", \"for each index of this string.\" The start, condition, and update are in one place, so it is easy to read and hard to forget the update.\n- Use **while** when the number of runs is not a simple counter: \"until the user quits\", \"until we find a match.\"\n\nBoth can do the same job. Choose the one that makes your intent clearer.\n\n## Practice\n\nIn one sentence, when do you prefer a for loop over a while loop?"
  ],
  "tasks": [
    {
      "description": "// Print numbers from 1 to 5 using a while loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// 4\n// 5",
      "solution_type": "script",
      "reference_solution": "let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}",
      "testCases": [{ "input": {}, "expectedOutput": "1\n2\n3\n4\n5" }]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 10;\n\n// Print all even numbers from 2 to n (inclusive)\n// Each number should be on a new line\n// For n = 10, your output should be:\n// 2\n// 4\n// 6\n// 8\n// 10",
      "solution_type": "script",
      "reference_solution": "const n = 10;\nlet i = 2;\nwhile (i <= n) {\n  console.log(i);\n  i += 2;\n}",
      "testCases": [
        { "input": { "n": 10 }, "expectedOutput": "2\n4\n6\n8\n10" },
        { "input": { "n": 6 }, "expectedOutput": "2\n4\n6" },
        { "input": { "n": 2 }, "expectedOutput": "2" },
        { "input": { "n": 1 }, "expectedOutput": "" }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 5;\n\n// Calculate the sum of numbers from 1 to limit\n// Print only the final sum\n// For limit = 5, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
      "solution_type": "script",
      "reference_solution": "const limit = 5;\nlet sum = 0;\nlet i = 1;\nwhile (i <= limit) {\n  sum += i;\n  i++;\n}\nconsole.log(sum);",
      "testCases": [
        { "input": { "limit": 5 }, "expectedOutput": "15" },
        { "input": { "limit": 10 }, "expectedOutput": "55" },
        { "input": { "limit": 1 }, "expectedOutput": "1" },
        { "input": { "limit": 100 }, "expectedOutput": "5050" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 7;\n\n// Print the multiplication table for num from 1 to 10\n// Format: num x i = result\n// For num = 7, your output should be:\n// 7 x 1 = 7\n// 7 x 2 = 14\n// ... up to 7 x 10 = 70",
      "solution_type": "script",
      "reference_solution": "const num = 7;\nlet i = 1;\nwhile (i <= 10) {\n  console.log(num + \" x \" + i + \" = \" + (num * i));\n  i++;\n}",
      "testCases": [
        { "input": { "num": 7 }, "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" },
        { "input": { "num": 3 }, "expectedOutput": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 5;\n\n// Calculate the factorial of num\n// Factorial of n = n × (n-1) × (n-2) × ... × 1\n// Print only the final result\n// For num = 5, your output should be: 120",
      "solution_type": "script",
      "reference_solution": "const num = 5;\nlet result = 1;\nlet i = 1;\nwhile (i <= num) {\n  result *= i;\n  i++;\n}\nconsole.log(result);",
      "testCases": [
        { "input": { "num": 5 }, "expectedOutput": "120" },
        { "input": { "num": 3 }, "expectedOutput": "6" },
        { "input": { "num": 1 }, "expectedOutput": "1" },
        { "input": { "num": 7 }, "expectedOutput": "5040" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Count the number of digits in num\n// Use a while loop to repeatedly divide by 10\n// Print only the count\n// For num = 12345, your output should be: 5",
      "solution_type": "script",
      "reference_solution": "const num = 12345;\nlet count = 0;\nlet n = num;\nif (n === 0) {\n  count = 1;\n} else {\n  if (n < 0) n = -n;\n  while (n > 0) {\n    count++;\n    n = Math.floor(n / 10);\n  }\n}\nconsole.log(count);",
      "testCases": [
        { "input": { "num": 12345 }, "expectedOutput": "5" },
        { "input": { "num": 7 }, "expectedOutput": "1" },
        { "input": { "num": 1000 }, "expectedOutput": "4" },
        { "input": { "num": 999999 }, "expectedOutput": "6" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12321;\n\n// Reverse the digits of num\n// For num = 12321, your output should be: 12321\n// For num = 1234, output should be: 4321\n// Hint: Use modulo (%) to extract last digit, then divide by 10",
      "solution_type": "script",
      "reference_solution": "const num = 12321;\nlet n = num;\nif (n < 0) n = -n;\nlet reversed = 0;\nwhile (n > 0) {\n  reversed = reversed * 10 + (n % 10);\n  n = Math.floor(n / 10);\n}\nconsole.log(reversed);",
      "testCases": [
        { "input": { "num": 12321 }, "expectedOutput": "12321" },
        { "input": { "num": 1234 }, "expectedOutput": "4321" },
        { "input": { "num": 500 }, "expectedOutput": "5" },
        { "input": { "num": 9876 }, "expectedOutput": "6789" }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 7;\n\n// Print the first n numbers in the Fibonacci sequence\n// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, ...\n// Each number is the sum of the previous two\n// Print each number on a new line\n// For n = 7, your output should be:\n// 0\n// 1\n// 1\n// 2\n// 3\n// 5\n// 8",
      "solution_type": "script",
      "reference_solution": "const n = 7;\nlet a = 0;\nlet b = 1;\nlet i = 0;\nwhile (i < n) {\n  console.log(a);\n  const next = a + b;\n  a = b;\n  b = next;\n  i++;\n}",
      "testCases": [
        { "input": { "n": 7 }, "expectedOutput": "0\n1\n1\n2\n3\n5\n8" },
        { "input": { "n": 5 }, "expectedOutput": "0\n1\n1\n2\n3" },
        { "input": { "n": 1 }, "expectedOutput": "0" },
        { "input": { "n": 10 }, "expectedOutput": "0\n1\n1\n2\n3\n5\n8\n13\n21\n34" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 29;\n\n// Check if num is a prime number\n// A prime number is only divisible by 1 and itself\n// Print: \"Prime\" if it's prime, otherwise print: \"Not prime\"\n// Hint: Check divisibility from 2 to num-1",
      "solution_type": "script",
      "reference_solution": "const num = 29;\nif (num < 2) {\n  console.log(\"Not prime\");\n} else {\n  let isPrime = true;\n  let i = 2;\n  while (i < num) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n    i++;\n  }\n  if (isPrime) {\n    console.log(\"Prime\");\n  } else {\n    console.log(\"Not prime\");\n  }\n}",
      "testCases": [
        { "input": { "num": 29 }, "expectedOutput": "Prime" },
        { "input": { "num": 15 }, "expectedOutput": "Not prime" },
        { "input": { "num": 2 }, "expectedOutput": "Prime" },
        { "input": { "num": 1 }, "expectedOutput": "Not prime" },
        { "input": { "num": 17 }, "expectedOutput": "Prime" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 28;\n\n// Check if num is a perfect number\n// A perfect number equals the sum of its proper divisors (excluding itself)\n// Example: 28 = 1 + 2 + 4 + 7 + 14\n// Print: \"Perfect number\" if true, otherwise print: \"Not perfect\"",
      "solution_type": "script",
      "reference_solution": "const num = 28;\nlet sum = 0;\nlet i = 1;\nwhile (i < num) {\n  if (num % i === 0) {\n    sum += i;\n  }\n  i++;\n}\nif (sum === num) {\n  console.log(\"Perfect number\");\n} else {\n  console.log(\"Not perfect\");\n}",
      "testCases": [
        { "input": { "num": 28 }, "expectedOutput": "Perfect number" },
        { "input": { "num": 6 }, "expectedOutput": "Perfect number" },
        { "input": { "num": 12 }, "expectedOutput": "Not perfect" },
        { "input": { "num": 496 }, "expectedOutput": "Perfect number" }
      ]
    },
    {
      "description": "// Print numbers from 1 to 10 using a for loop\n// Each number should be on a new line\n// Your output should be:\n// 1\n// 2\n// 3\n// ... up to 10",
      "solution_type": "script",
      "reference_solution": "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}",
      "testCases": [{ "input": {}, "expectedOutput": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" }]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 15;\n\n// Print all odd numbers from 1 to n (inclusive)\n// Each number should be on a new line\n// For n = 15, your output should be:\n// 1\n// 3\n// 5\n// ... up to 15",
      "solution_type": "script",
      "reference_solution": "const n = 15;\nfor (let i = 1; i <= n; i += 2) {\n  console.log(i);\n}",
      "testCases": [
        { "input": { "n": 15 }, "expectedOutput": "1\n3\n5\n7\n9\n11\n13\n15" },
        { "input": { "n": 10 }, "expectedOutput": "1\n3\n5\n7\n9" },
        { "input": { "n": 5 }, "expectedOutput": "1\n3\n5" },
        { "input": { "n": 1 }, "expectedOutput": "1" }
      ]
    },
    {
      "description": "// Do not rename start and end, use them as input for your program.\n// While testing we will change their values.\nconst start = 5;\nconst end = 10;\n\n// Print numbers from start to end (inclusive) in reverse order\n// Each number should be on a new line\n// For start = 5 and end = 10, your output should be:\n// 10\n// 9\n// 8\n// 7\n// 6\n// 5",
      "solution_type": "script",
      "reference_solution": "const start = 5;\nconst end = 10;\nfor (let i = end; i >= start; i--) {\n  console.log(i);\n}",
      "testCases": [
        { "input": { "start": 5, "end": 10 }, "expectedOutput": "10\n9\n8\n7\n6\n5" },
        { "input": { "start": 1, "end": 5 }, "expectedOutput": "5\n4\n3\n2\n1" },
        { "input": { "start": 8, "end": 12 }, "expectedOutput": "12\n11\n10\n9\n8" }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n\n// Calculate the sum of all numbers from 1 to n that are divisible by 3\n// Print only the final sum\n// For n = 20, the numbers are: 3, 6, 9, 12, 15, 18\n// Your output should be: 63",
      "solution_type": "script",
      "reference_solution": "const n = 20;\nlet sum = 0;\nfor (let i = 1; i <= n; i++) {\n  if (i % 3 === 0) {\n    sum += i;\n  }\n}\nconsole.log(sum);",
      "testCases": [
        { "input": { "n": 20 }, "expectedOutput": "63" },
        { "input": { "n": 10 }, "expectedOutput": "18" },
        { "input": { "n": 30 }, "expectedOutput": "165" },
        { "input": { "n": 5 }, "expectedOutput": "3" }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello\";\n\n// Print each character of the string on a new line\n// Use str.length to get the length and str[i] to access characters\n// For str = \"Hello\", your output should be:\n// H\n// e\n// l\n// l\n// o",
      "solution_type": "script",
      "reference_solution": "const str = \"Hello\";\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}",
      "testCases": [
        { "input": { "str": "Hello" }, "expectedOutput": "H\ne\nl\nl\no" },
        { "input": { "str": "JS" }, "expectedOutput": "J\nS" },
        { "input": { "str": "Code" }, "expectedOutput": "C\no\nd\ne" }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"JavaScript\";\n\n// Count the number of vowels (a, e, i, o, u) in the string\n// Case-insensitive: treat 'A' and 'a' as the same\n// Print only the count\n// For str = \"JavaScript\", your output should be: 3",
      "solution_type": "script",
      "reference_solution": "const str = \"JavaScript\";\nlet count = 0;\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U') {\n    count++;\n  }\n}\nconsole.log(count);",
      "testCases": [
        { "input": { "str": "JavaScript" }, "expectedOutput": "3" },
        { "input": { "str": "Hello World" }, "expectedOutput": "3" },
        { "input": { "str": "AEIOU" }, "expectedOutput": "5" },
        { "input": { "str": "xyz" }, "expectedOutput": "0" }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 5;\n\n// Print a pattern of stars forming a right triangle\n// For n = 5, your output should be:\n// *\n// **\n// ***\n// ****\n// *****",
      "solution_type": "script",
      "reference_solution": "const n = 5;\nlet line = \"\";\nfor (let i = 0; i < n; i++) {\n  line += \"*\";\n  console.log(line);\n}",
      "testCases": [
        { "input": { "n": 5 }, "expectedOutput": "*\n**\n***\n****\n*****" },
        { "input": { "n": 3 }, "expectedOutput": "*\n**\n***" },
        { "input": { "n": 1 }, "expectedOutput": "*" },
        { "input": { "n": 7 }, "expectedOutput": "*\n**\n***\n****\n*****\n******\n*******" }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 12345;\n\n// Calculate the sum of all digits in num\n// Convert num to a string to iterate through digits\n// Print only the final sum\n// For num = 12345, your output should be: 15\n// (Because 1 + 2 + 3 + 4 + 5 = 15)",
      "solution_type": "script",
      "reference_solution": "const num = 12345;\nconst str = String(num);\nlet sum = 0;\nfor (let i = 0; i < str.length; i++) {\n  sum += Number(str[i]);\n}\nconsole.log(sum);",
      "testCases": [
        { "input": { "num": 12345 }, "expectedOutput": "15" },
        { "input": { "num": 999 }, "expectedOutput": "27" },
        { "input": { "num": 1000 }, "expectedOutput": "1" },
        { "input": { "num": 246 }, "expectedOutput": "12" }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"racecar\";\n\n// Check if str is a palindrome (reads the same forwards and backwards)\n// Compare characters from start and end moving towards center\n// Print: \"Palindrome\" if true, otherwise print: \"Not palindrome\"\n// Hint: Compare str[i] with str[str.length - 1 - i]",
      "solution_type": "script",
      "reference_solution": "const str = \"racecar\";\nlet isPalindrome = true;\nfor (let i = 0; i < str.length; i++) {\n  if (str[i] !== str[str.length - 1 - i]) {\n    isPalindrome = false;\n    break;\n  }\n}\nif (isPalindrome) {\n  console.log(\"Palindrome\");\n} else {\n  console.log(\"Not palindrome\");\n}",
      "testCases": [
        { "input": { "str": "racecar" }, "expectedOutput": "Palindrome" },
        { "input": { "str": "hello" }, "expectedOutput": "Not palindrome" },
        { "input": { "str": "madam" }, "expectedOutput": "Palindrome" },
        { "input": { "str": "a" }, "expectedOutput": "Palindrome" },
        { "input": { "str": "noon" }, "expectedOutput": "Palindrome" }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 50;\n\n// Print all prime numbers from 2 to limit\n// A prime number is only divisible by 1 and itself\n// Each prime should be on a new line\n// For limit = 50, your output should be:\n// 2\n// 3\n// 5\n// 7\n// ... up to 47",
      "solution_type": "script",
      "reference_solution": "const limit = 50;\nfor (let num = 2; num <= limit; num++) {\n  let isPrime = true;\n  for (let i = 2; i < num; i++) {\n    if (num % i === 0) {\n      isPrime = false;\n      break;\n    }\n  }\n  if (isPrime) {\n    console.log(num);\n  }\n}",
      "testCases": [
        { "input": { "limit": 20 }, "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19" },
        { "input": { "limit": 10 }, "expectedOutput": "2\n3\n5\n7" },
        { "input": { "limit": 30 }, "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19\n23\n29" }
      ]
    }
  ]
};
