/** Topic: some and every (some-every) */
export default {
  "id": "some-every",
  "title": "some and every",
  "outcomes": [
    "What some Does",
    "What every Does",
    "Stopping Early",
    "Empty Arrays"
  ],
  "outcome_messages": [
    "Let's see what some() does.\n\n**array.some(callback)** returns **true** if **at least one** element makes the callback return true (or truthy); otherwise it returns **false**. It stops as soon as it finds one match. Use some when you need a yes/no answer: \"Is there any element that...?\"—e.g. \"Does this array have at least one even number?\" or \"Is any user active?\"\n\n## Example\n\n```javascript\nconst nums = [1, 3, 5, 8, 9];\nconst hasEven = nums.some(function(n) { return n % 2 === 0; });\nconsole.log(hasEven);\n```\n\n## Output\n\n```\ntrue\n```\n\n## What happens\n\n- 1 even? No. 3? No. 5? No. 8? Yes → return true and stop.\n- 9 is never checked. If none were even, some would return false.\n\n## Practice\n\nUse some on [\"apple\", \"banana\", \"cherry\"] to check if any string has length greater than 5. What does it return?",
    "Let's see what every() does.\n\n**array.every(callback)** returns **true** only if **every** element makes the callback return true; it returns **false** as soon as **one** element fails. Use every when you need: \"Do all elements...?\"—e.g. \"Are all numbers positive?\" or \"Does every item have an id?\"\n\n## Example\n\n```javascript\nconst a = [2, 4, 6, 8];\nconst allEven = a.every(function(n) { return n % 2 === 0; });\nconsole.log(allEven);\n```\n\n## Output\n\n```\ntrue\n```\n\n## What happens\n\n- 2 even? Yes. 4? Yes. 6? Yes. 8? Yes. All pass → true.\n- If any were odd, every would return false and stop at that element.\n\n## Practice\n\nUse every to check if all numbers in [10, 20, 30] are greater than 5. What does it return? What about [10, 3, 20]?",
    "Let's see how some and every stop early.\n\n**some** stops as soon as the callback returns true—one match is enough. **every** stops as soon as the callback returns false—one failure is enough. So the callback might not run for every element. That keeps things efficient and matches how we think: once you know the answer, you don't need to check the rest.\n\n## Example\n\n```javascript\nconst arr = [1, 2, 3, 4, 5];\nconst hasTwo = arr.some(function(x) { return x === 2; });\nconst allSmall = arr.every(function(x) { return x < 10; });\nconsole.log(hasTwo, allSmall);\n```\n\n## Output\n\n```\ntrue true\n```\n\n## What happens\n\n- some: 1 === 2? No. 2 === 2? Yes → true, stop. 3, 4, 5 are not checked.\n- every: checks 1, 2, 3, 4, 5; all are < 10, so true.\n\n## Practice\n\nFor [10, 20, 30], how many times does the callback run for some with a callback that returns true when n > 15? How many times for every with a callback that returns true when n > 0?",
    "Let's see how some() and every() behave on empty arrays.\n\nFor an **empty array**: **some()** returns **false** (there is no element that passes—there are no elements). **every()** returns **true** (no element fails—so \"all\" pass). This is easy to forget: an empty list \"has no one that…\" so some says false; \"every one …\" with no ones is treated as true.\n\n## Example\n\n```javascript\nconsole.log([].some(function(x) { return x > 0; }));\nconsole.log([].every(function(x) { return x > 0; }));\n```\n\n## Output\n\n```\nfalse\ntrue\n```\n\n## What happens\n\n- Empty array. some: no element makes the callback true → false.\n- every: no element fails the callback → true. Always consider empty arrays when you use some or every.\n\n## Practice\n\nWhat does [].some(function() { return true; }) return? What does [].every(function() { return false; }) return? Why is that useful to know?"
  ],
  "tasks": [
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is even.\n  Use some to check if at least one number is even.\n  Examples:\n    hasAnyEven([1, 3, 5, 7, 9]) => false\n    hasAnyEven([1, 2, 3]) => true\n    hasAnyEven([2, 4, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyEven(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyEven",
      "reference_solution": "function hasAnyEven(arr) {\n  return arr.some(function(n) { return n % 2 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              1,
              3,
              5,
              7,
              9
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              2,
              4,
              6
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are even.\n  Use every to check if all numbers are even.\n  Examples:\n    areAllEven([2, 4, 6, 8, 10]) => true\n    areAllEven([2, 3, 4]) => false\n    areAllEven([1, 3, 5]) => false\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllEven(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllEven",
      "reference_solution": "function areAllEven(arr) {\n  return arr.every(function(n) { return n % 2 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              2,
              4,
              6,
              8,
              10
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              2,
              3,
              4
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              1,
              3,
              5
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is greater than 45.\n  Use some to check if at least one number is greater than 45.\n  Examples:\n    hasAnyGreaterThan45([10, 20, 30, 40, 50]) => true\n    hasAnyGreaterThan45([10, 20, 30]) => false\n    hasAnyGreaterThan45([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyGreaterThan45(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyGreaterThan45",
      "reference_solution": "function hasAnyGreaterThan45(arr) {\n  return arr.some(function(n) { return n > 45; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40,
              50
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              10,
              20,
              30
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              100,
              200
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are greater than 3.\n  Use every to check if all numbers are greater than 3.\n  Examples:\n    areAllGreaterThan3([5, 10, 15, 20, 25]) => true\n    areAllGreaterThan3([1, 2, 3]) => false\n    areAllGreaterThan3([4, 5, 6]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllGreaterThan3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllGreaterThan3",
      "reference_solution": "function areAllGreaterThan3(arr) {\n  return arr.every(function(n) { return n > 3; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20,
              25
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              3
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              4,
              5,
              6
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one string starts with 'b'.\n  Use some to check if at least one string starts with 'b'.\n  Examples:\n    hasAnyStartsWithB([\"apple\", \"banana\", \"cherry\"]) => true\n    hasAnyStartsWithB([\"apple\", \"cherry\"]) => false\n    hasAnyStartsWithB([\"ball\", \"bat\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyStartsWithB(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyStartsWithB",
      "reference_solution": "function hasAnyStartsWithB(arr) {\n  return arr.some(function(s) { return s[0] === 'b'; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "apple",
              "banana",
              "cherry"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              "apple",
              "cherry"
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              "ball",
              "bat"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all strings have length greater than 3.\n  Use every to check if all strings have length greater than 3.\n  Examples:\n    areAllLongerThan3([\"hello\", \"world\", \"test\"]) => true\n    areAllLongerThan3([\"hi\", \"hello\"]) => false\n    areAllLongerThan3([\"code\", \"java\"]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllLongerThan3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllLongerThan3",
      "reference_solution": "function areAllLongerThan3(arr) {\n  return arr.every(function(s) { return s.length > 3; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              "hello",
              "world",
              "test"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              "hi",
              "hello"
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              "code",
              "java"
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one person is under 18.\n  Use some to check if at least one person is under 18.\n  Examples:\n    hasAnyMinor([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 17}, {name: \"Charlie\", age: 30}]) => true\n    hasAnyMinor([{name: \"Diana\", age: 20}, {name: \"Eve\", age: 25}]) => false\n    hasAnyMinor([{name: \"Frank\", age: 16}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyMinor(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyMinor",
      "reference_solution": "function hasAnyMinor(arr) {\n  return arr.some(function(obj) { return obj.age < 18; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "age": 25
              },
              {
                "name": "Bob",
                "age": 17
              },
              {
                "name": "Charlie",
                "age": 30
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 20
              },
              {
                "name": "Eve",
                "age": 25
              }
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Frank",
                "age": 16
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all people are 18 or older.\n  Use every to check if all people are 18 or older.\n  Examples:\n    areAllAdults([{name: \"Alice\", age: 25}, {name: \"Bob\", age: 30}, {name: \"Charlie\", age: 35}]) => true\n    areAllAdults([{name: \"Diana\", age: 17}, {name: \"Eve\", age: 20}]) => false\n    areAllAdults([{name: \"Frank\", age: 18}]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllAdults(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllAdults",
      "reference_solution": "function areAllAdults(arr) {\n  return arr.every(function(obj) { return obj.age >= 18; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              {
                "name": "Alice",
                "age": 25
              },
              {
                "name": "Bob",
                "age": 30
              },
              {
                "name": "Charlie",
                "age": 35
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Diana",
                "age": 17
              },
              {
                "name": "Eve",
                "age": 20
              }
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              {
                "name": "Frank",
                "age": 18
              }
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses some to check if at least one number is divisible by 3.\n  Use some to check if at least one number is divisible by 3.\n  Examples:\n    hasAnyDivisibleBy3([5, 10, 15, 20]) => true\n    hasAnyDivisibleBy3([1, 2, 4]) => false\n    hasAnyDivisibleBy3([9, 12]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction hasAnyDivisibleBy3(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "hasAnyDivisibleBy3",
      "reference_solution": "function hasAnyDivisibleBy3(arr) {\n  return arr.some(function(n) { return n % 3 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              5,
              10,
              15,
              20
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              1,
              2,
              4
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              9,
              12
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "false"
        }
      ]
    },
    {
      "description": "/*\n  Implement the below function that uses every to check if all numbers are divisible by 10.\n  Use every to check if all numbers are divisible by 10.\n  Examples:\n    areAllDivisibleBy10([10, 20, 30, 40]) => true\n    areAllDivisibleBy10([10, 15, 20]) => false\n    areAllDivisibleBy10([100, 200]) => true\n\n  YOUR FUNCTION MUST RETURN THE ANSWER\n  TO TEST YOUR FUNCTION YOU ARE FREE TO PRINT THE RESULT\n*/\n\nfunction areAllDivisibleBy10(arr) {\n  // Implementation here\n}",
      "solution_type": "function",
      "function_name": "areAllDivisibleBy10",
      "reference_solution": "function areAllDivisibleBy10(arr) {\n  return arr.every(function(n) { return n % 10 === 0; });\n}",
      "testCases": [
        {
          "input": {
            "arr": [
              10,
              20,
              30,
              40
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": [
              10,
              15,
              20
            ]
          },
          "expectedOutput": "false"
        },
        {
          "input": {
            "arr": [
              100,
              200
            ]
          },
          "expectedOutput": "true"
        },
        {
          "input": {
            "arr": []
          },
          "expectedOutput": "true"
        }
      ]
    }
  ]
};
