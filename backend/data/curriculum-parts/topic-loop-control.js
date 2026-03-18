/** Topic: Loop Control (break, continue) (loop-control) */
export default {
  "id": "loop-control",
  "title": "Loop Control (break, continue)",
  "outcomes": [
    "The break Statement: Immediate Loop Exit",
    "The continue Statement: Skipping the Current Cycle",
    "Early Termination: Optimizing Search Logic",
    "Conditional Skipping: Filtered Execution Flow"
  ],
  "outcome_messages": [
    "Let's exit a loop early with break.\n\nInside a loop, `break` immediately ends the loop—no more iterations, no running the update. Execution jumps to the first statement after the loop. Use break when you've found what you needed or hit a condition that means \"stop entirely.\"\n\n## Example\n\n```javascript\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n  if (i === 3) break;\n}\nconsole.log(\"Done\");\n```\n\n## Output\n\n```\n1\n2\n3\nDone\n```\n\nWe print 1, 2, 3, then break when i is 3. The loop doesn't run for 4 or 5. Break exits the whole loop, not just the current iteration.\n\n## Practice\n\nIn the example, does the loop run for i = 4 and i = 5 after the break? Why?",
    "Let's skip one iteration with continue.\n\nInside a loop, `continue` skips the rest of the current iteration and jumps to the next one—the update runs (in a for loop), then the condition is checked again. Use continue when you want to \"skip this one but keep going\" (e.g. skip even numbers, skip invalid input). The loop itself keeps running.\n\n## Example\n\n```javascript\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```\n\n## Output\n\n```\n1\n2\n4\n5\n```\n\nWhen i is 3, we skip the console.log and go to the next i. So 3 is never printed. Continue skips only the current cycle; break would have stopped the loop entirely.\n\n## Practice\n\nIn the example, why is 3 not printed?",
    "Use break to stop as soon as you find what you're looking for.\n\nWhen you're searching for something (e.g. the first number that meets a condition), you loop until you find it, then break so you don't keep looking. That avoids unnecessary iterations. Break makes the intent clear: \"we're done.\"\n\n## Example\n\n```javascript\nlet found = 0;\nfor (let i = 1; i <= 10; i++) {\n  if (i % 7 === 0) {\n    found = i;\n    break;\n  }\n}\nconsole.log(found);\n```\n\n## Output\n\n```\n7\n```\n\nWe stop as soon as we find the first number from 1 to 10 that is divisible by 7 (that's 7). Without break, the loop would run for 8, 9, 10 too.\n\n## Practice\n\nWhy do we use break in the example instead of letting the loop run to the end?",
    "Use continue to run the loop only for some items (filtered execution).\n\nWhen you want to process \"only when X is true\" (e.g. only odd numbers), you can check the opposite inside the loop and continue to skip the rest. The loop still runs for every iteration; you just skip the body for the ones you don't care about.\n\n## Example\n\n```javascript\nfor (let i = 1; i <= 6; i++) {\n  if (i % 2 === 0) continue;\n  console.log(i);\n}\n```\n\n## Output\n\n```\n1\n3\n5\n```\n\nWe only print when i is odd. For even i we continue and don't print.\n\n## Practice\n\nIn the example, what does continue do when i is 2?"
  ],
  "tasks": [
    {
      "description": "// Print numbers from 1 to 20, but stop when you reach 10\n// Use a for loop with break statement\n// Your output should be:\n// 1\n// 2\n// 3\n// ... up to 10",
      "solution_type": "script",
      "reference_solution": "for (let i = 1; i <= 20; i++) {\n  console.log(i);\n  if (i === 10) break;\n}",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n// Print numbers from 1 to n, but skip multiples of 3\n// Use continue statement to skip multiples of 3\n// For n = 20, your output should be:\n// 1\n// 2\n// 4\n// 5\n// 7\n// 8\n// ... (skipping 3, 6, 9, 12, 15, 18)",
      "solution_type": "script",
      "reference_solution": "const n = 20;\nfor (let i = 1; i <= n; i++) {\n  if (i % 3 === 0) continue;\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {
            "n": 15
          },
          "expectedOutput": "1\n2\n4\n5\n7\n8\n10\n11\n13\n14"
        },
        {
          "input": {
            "n": 10
          },
          "expectedOutput": "1\n2\n4\n5\n7\n8\n10"
        },
        {
          "input": {
            "n": 5
          },
          "expectedOutput": "1\n2\n4\n5"
        }
      ]
    },
    {
      "description": "// Do not rename str and target, use them as input for your program.\n// While testing we will change their values.\nconst str = \"JavaScript\";\nconst target = \"S\";\n// Find the first occurrence of target character in str\n// Print the index (position) where it's found\n// Use break to stop searching once found\n// If not found, print: -1\n// For str = \"JavaScript\" and target = \"S\", your output should be: 4",
      "solution_type": "script",
      "reference_solution": "const str = \"JavaScript\";\nconst target = \"S\";\nlet index = -1;\nfor (let i = 0; i < str.length; i++) {\n  if (str[i] === target) {\n    index = i;\n    break;\n  }\n}\nconsole.log(index);",
      "testCases": [
        {
          "input": {
            "str": "JavaScript",
            "target": "S"
          },
          "expectedOutput": "4"
        },
        {
          "input": {
            "str": "Hello",
            "target": "l"
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "str": "Code",
            "target": "x"
          },
          "expectedOutput": "-1"
        },
        {
          "input": {
            "str": "Programming",
            "target": "g"
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n// Print all even numbers from 1 to limit, but stop if you encounter a number greater than 20\n// Use continue for odd numbers and break for numbers > 20\n// For limit = 30, your output should be:\n// 2\n// 4\n// 6\n// ... up to 20",
      "solution_type": "script",
      "reference_solution": "const limit = 30;\nfor (let i = 1; i <= limit; i++) {\n  if (i % 2 !== 0) continue;\n  if (i > 20) break;\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {
            "limit": 30
          },
          "expectedOutput": "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
        },
        {
          "input": {
            "limit": 15
          },
          "expectedOutput": "2\n4\n6\n8\n10\n12\n14"
        },
        {
          "input": {
            "limit": 25
          },
          "expectedOutput": "2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello World\";\n// Print all characters except vowels (a, e, i, o, u)\n// Use continue to skip vowels\n// Case-insensitive: skip both 'a' and 'A'\n// For str = \"Hello World\", your output should be:\n// H\n// l\n// l\n//  \n// W\n// r\n// l\n// d",
      "solution_type": "script",
      "reference_solution": "const str = \"Hello World\";\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U') continue;\n  console.log(c);\n}",
      "testCases": [
        {
          "input": {
            "str": "Hello World"
          },
          "expectedOutput": "H\nl\nl\n \nW\nr\nl\nd"
        },
        {
          "input": {
            "str": "JavaScript"
          },
          "expectedOutput": "J\nv\nS\nc\nr\np\nt"
        },
        {
          "input": {
            "str": "Code"
          },
          "expectedOutput": "C\nd"
        }
      ]
    },
    {
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 84;\n// Find the smallest divisor of num (greater than 1)\n// Use break once you find the first divisor\n// Print the divisor\n// For num = 84, your output should be: 2",
      "solution_type": "script",
      "reference_solution": "const num = 84;\nlet divisor = num;\nfor (let i = 2; i < num; i++) {\n  if (num % i === 0) {\n    divisor = i;\n    break;\n  }\n}\nconsole.log(divisor);",
      "testCases": [
        {
          "input": {
            "num": 84
          },
          "expectedOutput": "2"
        },
        {
          "input": {
            "num": 15
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "num": 17
          },
          "expectedOutput": "17"
        },
        {
          "input": {
            "num": 21
          },
          "expectedOutput": "3"
        }
      ]
    },
    {
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 50;\n// Print numbers from 1 to n, but:\n// - Skip numbers divisible by 5\n// - Stop completely when you reach a number divisible by 7 and greater than 30\n// Use continue for divisible by 5, break for the stopping condition\n// For n = 50, your output should be numbers 1-34 (excluding 5, 10, 15, 20, 25, 30) and stopping at 35",
      "solution_type": "script",
      "reference_solution": "const n = 50;\nfor (let i = 1; i <= n; i++) {\n  if (i % 5 === 0) continue;\n  if (i % 7 === 0 && i > 30) break;\n  console.log(i);\n}",
      "testCases": [
        {
          "input": {
            "n": 50
          },
          "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29\n31\n32\n33\n34"
        },
        {
          "input": {
            "n": 40
          },
          "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29\n31\n32\n33\n34"
        },
        {
          "input": {
            "n": 30
          },
          "expectedOutput": "1\n2\n3\n4\n6\n7\n8\n9\n11\n12\n13\n14\n16\n17\n18\n19\n21\n22\n23\n24\n26\n27\n28\n29"
        }
      ]
    },
    {
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"a1b2c3d4\";\n// Print only the digit characters from the string\n// Use continue to skip non-digit characters\n// Hint: A character is a digit if it's between '0' and '9'\n// For str = \"a1b2c3d4\", your output should be:\n// 1\n// 2\n// 3\n// 4",
      "solution_type": "script",
      "reference_solution": "const str = \"a1b2c3d4\";\nfor (let i = 0; i < str.length; i++) {\n  const c = str[i];\n  if (c < '0' || c > '9') continue;\n  console.log(c);\n}",
      "testCases": [
        {
          "input": {
            "str": "a1b2c3d4"
          },
          "expectedOutput": "1\n2\n3\n4"
        },
        {
          "input": {
            "str": "hello123world"
          },
          "expectedOutput": "1\n2\n3"
        },
        {
          "input": {
            "str": "no digits here"
          },
          "expectedOutput": ""
        },
        {
          "input": {
            "str": "test567end"
          },
          "expectedOutput": "5\n6\n7"
        }
      ]
    }
  ]
};
