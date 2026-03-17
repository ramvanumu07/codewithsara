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
    "Let's see why we need loops and what they do.\n\nImagine you need to print the numbers 1, 2, 3. You could write three separate lines:\n\n```javascript\nconsole.log(1);\nconsole.log(2);\nconsole.log(3);\n```\n\n## Output\n\n```\n1\n2\n3\n```\n\nBut what if you needed 1 to 100? Writing a hundred lines would be tedious and easy to get wrong.\n\n**What a loop does**\n\nA **loop** solves this: you write the action once and tell the computer to repeat it. You also say **when to stop** (e.g. \"stop after 5 times\" or \"stop when this condition is false\"). Each time the block runs is one **iteration**.\n\n**In JavaScript**\n\nWe have two kinds of loops: **while** and **for**. In both, the computer checks a condition before each run—if it's true, the block runs again; when it becomes false, the loop stops. We'll learn **while** first, then **for**.\n\n## Practice\n\nIn one sentence, what is a loop and what is one iteration?",
    "Let's use the **while** loop to repeat a block while a condition is true.\n\n## Syntax\n\n```text\nwhile (condition) {\n  body\n}\n```\n\n**How it works**\n\nThe computer checks the condition. If it is true, the body runs. Then the condition is checked again. This repeats until the condition is false.\n\nSomething **inside the body** must change a value that the condition uses. Otherwise the condition never becomes false and the loop runs forever (an **infinite loop**). So we usually use a variable: set it before the loop, use it in the condition, and update it inside the body.\n\n## Example\n\n```javascript\nlet n = 3;\nwhile (n > 0) {\n  console.log(n);\n  n--;\n}\n```\n\n## Output\n\n```\n3\n2\n1\n```\n\nIn the example above, the update `n--` makes `n` smaller each time. When `n` becomes 0, the condition `n > 0` is false and the loop stops.\n\n## Practice\n\nWhat would happen if you forgot to update the variable used in the while condition (e.g. never did n--)?",
    "Let's use the **for** loop when you know how many times to run (e.g. from 1 to 10). The start value, the condition, and the update are all written in one line.\n\n## Syntax\n\n```text\nfor (init; condition; update) {\n  body\n}\n```\n\n**The three parts**\n\n- **init** runs once at the start (e.g. set a counter).\n- **condition** is checked before each iteration; if false, the loop ends.\n- **update** runs after each iteration (e.g. add 1 to the counter).\n\nThe order is: init → check condition → run body → run update → check condition again → …\n\n## Example\n\n```javascript\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\n```\n\n## Output\n\n```\n1\n2\n3\n```\n\nWe start at 1, run while i is 3 or less, and add 1 after each run. The update is in the loop header, so we are less likely to forget it.\n\n## Practice\n\nIn the for loop example, what runs first—the init, the condition, or the body?",
    "Let's control the loop by choosing the **start** value, the **step** (how much to add or subtract each time), and the **stop** condition.\n\n**In a for loop**\n\n- Start goes in init, step in the update (e.g. `i++` or `i += 2`), and stop in the condition (e.g. `i <= 10`).\n- You can use the loop variable inside the body as a counter or as an **index** to access each character in a string (e.g. `str[i]`).\n\nA common pattern is to loop over a string by index: start at 0, stop when `i < str.length`, and use `str[i]` in the body.\n\n## Example\n\n```javascript\nconst str = \"Hi\";\nfor (let i = 0; i < str.length; i++) {\n  console.log(str[i]);\n}\n```\n\n## Output\n\n```\nH\ni\n```\n\n## Practice\n\nIn the example, what is the value of i in the first iteration?",
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
    }
  ]
};
