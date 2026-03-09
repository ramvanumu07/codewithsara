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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 20;\n\n// Print numbers from 1 to n, but skip multiples of 3\n// Use continue statement to skip multiples of 3\n// For n = 20, your output should be:\n// 1\n// 2\n// 4\n// 5\n// 7\n// 8\n// ... (skipping 3, 6, 9, 12, 15, 18)",
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
      "description": "// Do not rename str and target, use them as input for your program.\n// While testing we will change their values.\nconst str = \"JavaScript\";\nconst target = \"S\";\n\n// Find the first occurrence of target character in str\n// Print the index (position) where it's found\n// Use break to stop searching once found\n// If not found, print: -1\n// For str = \"JavaScript\" and target = \"S\", your output should be: 4",
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
      "description": "// Do not rename limit, use it as input for your program.\n// While testing we will change its value.\nconst limit = 30;\n\n// Print all even numbers from 1 to limit, but stop if you encounter a number greater than 20\n// Use continue for odd numbers and break for numbers > 20\n// For limit = 30, your output should be:\n// 2\n// 4\n// 6\n// ... up to 20",
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
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"Hello World\";\n\n// Print all characters except vowels (a, e, i, o, u)\n// Use continue to skip vowels\n// Case-insensitive: skip both 'a' and 'A'\n// For str = \"Hello World\", your output should be:\n// H\n// l\n// l\n//  \n// W\n// r\n// l\n// d",
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
      "description": "// Do not rename num, use it as input for your program.\n// While testing we will change its value.\nconst num = 84;\n\n// Find the smallest divisor of num (greater than 1)\n// Use break once you find the first divisor\n// Print the divisor\n// For num = 84, your output should be: 2",
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
      "description": "// Do not rename n, use it as input for your program.\n// While testing we will change its value.\nconst n = 50;\n\n// Print numbers from 1 to n, but:\n// - Skip numbers divisible by 5\n// - Stop completely when you reach a number divisible by 7 and greater than 30\n// Use continue for divisible by 5, break for the stopping condition\n// For n = 50, your output should be numbers 1-34 (excluding 5, 10, 15, 20, 25, 30) and stopping at 35",
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
      "description": "// Do not rename str, use it as input for your program.\n// While testing we will change its value.\nconst str = \"a1b2c3d4\";\n\n// Print only the digit characters from the string\n// Use continue to skip non-digit characters\n// Hint: A character is a digit if it's between '0' and '9'\n// For str = \"a1b2c3d4\", your output should be:\n// 1\n// 2\n// 3\n// 4",
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
