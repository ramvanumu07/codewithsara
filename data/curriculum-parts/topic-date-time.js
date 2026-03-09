/** Topic: Working with Dates (date-time) */
export default {
  "id": "date-time",
  "title": "Working with Dates",
  "outcomes": [
    "The Date Object: Tracking time in memory",
    "Capturing the current System Time",
    "Parsing Dates from Strings",
    "Constructing Dates from Numeric Components",
    "The Zero-indexed Month Pitfall",
    "Extracting Components (getMethods)",
    "Modifying Date Objects (setMethods)",
    "The Weekday Integer (getDay)",
    "Unix Timestamps and getTime()",
    "Temporal Logic: Comparing Two Dates",
    "Date Arithmetic: Adding and Subtracting Time",
    "Standard Formatting: ISO and Local Strings"
  ],
  "tasks": [
    {
      "description": "// Create a Date object for January 1, 2025\n// Remember: months are zero-indexed (0 = January, 11 = December)\n// Print the full date using toDateString()\n// Your output should be: Wed Jan 01 2025",
      "solution_type": "script",
      "reference_solution": "const d = new Date(2025, 0, 1);\nconsole.log(d.toDateString());",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Wed Jan 01 2025"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-06-15\";\n\n// Parse the date string and extract the year using getFullYear()\n// Print only the year\n// For \"2024-06-15\", your output should be: 2024",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-06-15\";\nconst d = new Date(dateStr);\nconsole.log(d.getFullYear());",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-06-15"
          },
          "expectedOutput": "2024"
        },
        {
          "input": {
            "dateStr": "2023-12-25"
          },
          "expectedOutput": "2023"
        },
        {
          "input": {
            "dateStr": "2025-01-01"
          },
          "expectedOutput": "2025"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-03-15\";\n\n// Parse the date string and extract the month number\n// Remember: getMonth() returns 0-11, so add 1 for human-readable month\n// Print the month number (1-12)\n// For \"2024-03-15\", your output should be: 3",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-03-15\";\nconst d = new Date(dateStr);\nconsole.log(d.getMonth() + 1);",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-03-15"
          },
          "expectedOutput": "3"
        },
        {
          "input": {
            "dateStr": "2024-01-10"
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "dateStr": "2024-12-25"
          },
          "expectedOutput": "12"
        },
        {
          "input": {
            "dateStr": "2024-07-04"
          },
          "expectedOutput": "7"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-08-25\";\n\n// Parse the date and get the day of the week\n// Use getDay() which returns 0 (Sunday) to 6 (Saturday)\n// Convert to day name and print it\n// For \"2024-08-25\", your output should be: Sunday",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-08-25\";\nconst days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\nconst d = new Date(dateStr);\nconsole.log(days[d.getDay()]);",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-08-25"
          },
          "expectedOutput": "Sunday"
        },
        {
          "input": {
            "dateStr": "2024-08-26"
          },
          "expectedOutput": "Monday"
        },
        {
          "input": {
            "dateStr": "2024-08-31"
          },
          "expectedOutput": "Saturday"
        },
        {
          "input": {
            "dateStr": "2024-01-01"
          },
          "expectedOutput": "Monday"
        }
      ]
    },
    {
      "description": "// Create a date for your birthday this year: December 25\n// Extract and print three components on separate lines:\n// - Day of month using getDate()\n// - Month number (remember to add 1 to getMonth())\n// - Year using getFullYear()\n// Your output should be:\n// 25\n// 12\n// 2025",
      "solution_type": "script",
      "reference_solution": "const d = new Date(2025, 11, 25);\nconsole.log(d.getDate());\nconsole.log(d.getMonth() + 1);\nconsole.log(d.getFullYear());",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "25\n12\n2025"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr1 and dateStr2, use them as input for your program.\n// While testing we will change their values.\nconst dateStr1 = \"2024-06-15\";\nconst dateStr2 = \"2024-08-20\";\n\n// Compare two dates and determine which is earlier\n// If dateStr1 is earlier, print: \"First date is earlier\"\n// If dateStr2 is earlier, print: \"Second date is earlier\"\n// If they are the same, print: \"Same date\"\n// Hint: You can compare Date objects directly with < and >",
      "solution_type": "script",
      "reference_solution": "const dateStr1 = \"2024-06-15\";\nconst dateStr2 = \"2024-08-20\";\nconst d1 = new Date(dateStr1);\nconst d2 = new Date(dateStr2);\nif (d1 < d2) {\n  console.log(\"First date is earlier\");\n} else if (d2 < d1) {\n  console.log(\"Second date is earlier\");\n} else {\n  console.log(\"Same date\");\n}",
      "testCases": [
        {
          "input": {
            "dateStr1": "2024-06-15",
            "dateStr2": "2024-08-20"
          },
          "expectedOutput": "First date is earlier"
        },
        {
          "input": {
            "dateStr1": "2024-12-25",
            "dateStr2": "2024-01-01"
          },
          "expectedOutput": "Second date is earlier"
        },
        {
          "input": {
            "dateStr1": "2024-07-04",
            "dateStr2": "2024-07-04"
          },
          "expectedOutput": "Same date"
        },
        {
          "input": {
            "dateStr1": "2025-01-01",
            "dateStr2": "2024-12-31"
          },
          "expectedOutput": "Second date is earlier"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-03-10\";\n\n// Parse the date and add 7 days to it\n// Use getDate() and setDate() methods\n// Print the new date in ISO format (YYYY-MM-DD) using toISOString().split('T')[0]\n// For \"2024-03-10\", your output should be: 2024-03-17",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-03-10\";\nconst d = new Date(dateStr);\nd.setDate(d.getDate() + 7);\nconsole.log(d.toISOString().split('T')[0]);",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-03-10"
          },
          "expectedOutput": "2024-03-17"
        },
        {
          "input": {
            "dateStr": "2024-12-28"
          },
          "expectedOutput": "2025-01-04"
        },
        {
          "input": {
            "dateStr": "2024-02-25"
          },
          "expectedOutput": "2024-03-03"
        },
        {
          "input": {
            "dateStr": "2024-01-01"
          },
          "expectedOutput": "2024-01-08"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr1 and dateStr2, use them as input for your program.\n// While testing we will change their values.\nconst dateStr1 = \"2024-01-01\";\nconst dateStr2 = \"2024-01-15\";\n\n// Calculate the difference in days between two dates\n// Use getTime() to get timestamps in milliseconds\n// Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)\n// Print the absolute difference in days\n// For \"2024-01-01\" and \"2024-01-15\", your output should be: 14",
      "solution_type": "script",
      "reference_solution": "const dateStr1 = \"2024-01-01\";\nconst dateStr2 = \"2024-01-15\";\nconst d1 = new Date(dateStr1);\nconst d2 = new Date(dateStr2);\nconst msPerDay = 24 * 60 * 60 * 1000;\nconst diff = d2.getTime() - d1.getTime();\nconst days = diff > 0 ? diff : -diff;\nconsole.log(Math.floor(days / msPerDay));",
      "testCases": [
        {
          "input": {
            "dateStr1": "2024-01-01",
            "dateStr2": "2024-01-15"
          },
          "expectedOutput": "14"
        },
        {
          "input": {
            "dateStr1": "2024-06-01",
            "dateStr2": "2024-06-30"
          },
          "expectedOutput": "29"
        },
        {
          "input": {
            "dateStr1": "2024-12-25",
            "dateStr2": "2024-12-31"
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "dateStr1": "2024-01-10",
            "dateStr2": "2024-01-10"
          },
          "expectedOutput": "0"
        }
      ]
    },
    {
      "description": "// Create a date for March 15, 2024\n// Modify it to change the month to June (month index 5)\n// Use setMonth() method\n// Print the modified date using toDateString()\n// Your output should be: Sat Jun 15 2024",
      "solution_type": "script",
      "reference_solution": "const d = new Date(2024, 2, 15);\nd.setMonth(5);\nconsole.log(d.toDateString());",
      "testCases": [
        {
          "input": {},
          "expectedOutput": "Sat Jun 15 2024"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-07-04\";\n\n// Parse the date and check if it falls on a weekend\n// Use getDay() - it returns 0 for Sunday, 6 for Saturday\n// If weekend (Saturday or Sunday), print: \"Weekend\"\n// Otherwise, print: \"Weekday\"",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-07-04\";\nconst d = new Date(dateStr);\nconst day = d.getDay();\nif (day === 0 || day === 6) {\n  console.log(\"Weekend\");\n} else {\n  console.log(\"Weekday\");\n}",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-07-04"
          },
          "expectedOutput": "Weekday"
        },
        {
          "input": {
            "dateStr": "2024-07-06"
          },
          "expectedOutput": "Weekend"
        },
        {
          "input": {
            "dateStr": "2024-07-07"
          },
          "expectedOutput": "Weekend"
        },
        {
          "input": {
            "dateStr": "2024-07-08"
          },
          "expectedOutput": "Weekday"
        }
      ]
    },
    {
      "description": "// Do not rename year, month, day (use them as input for your program).\n// While testing we will change their values.\nconst year = 2024;\nconst month = 2;  // Human-readable month (1-12)\nconst day = 29;\n\n// Create a Date object using year, month, and day\n// Remember: Date constructor uses 0-indexed months, so subtract 1 from month\n// Check if the date is valid by comparing if the day matches\n// If valid, print: \"Valid date\"\n// If invalid (e.g., Feb 30), print: \"Invalid date\"\n// Hint: new Date(2024, 1, 30) will roll over to March, so getDate() won't match",
      "solution_type": "script",
      "reference_solution": "const year = 2024;\nconst month = 2;\nconst day = 29;\nconst d = new Date(year, month - 1, day);\nif (d.getDate() === day && d.getMonth() === month - 1 && d.getFullYear() === year) {\n  console.log(\"Valid date\");\n} else {\n  console.log(\"Invalid date\");\n}",
      "testCases": [
        {
          "input": {
            "year": 2024,
            "month": 2,
            "day": 29
          },
          "expectedOutput": "Valid date"
        },
        {
          "input": {
            "year": 2024,
            "month": 2,
            "day": 30
          },
          "expectedOutput": "Invalid date"
        },
        {
          "input": {
            "year": 2024,
            "month": 4,
            "day": 31
          },
          "expectedOutput": "Invalid date"
        },
        {
          "input": {
            "year": 2024,
            "month": 12,
            "day": 31
          },
          "expectedOutput": "Valid date"
        }
      ]
    },
    {
      "description": "// Do not rename dateStr, use it as input for your program.\n// While testing we will change its value.\nconst dateStr = \"2024-08-15\";\n\n// Parse the date and format it as \"Month Day, Year\"\n// Create an array of month names: [\"January\", \"February\", ...]\n// Use getMonth(), getDate(), and getFullYear()\n// For \"2024-08-15\", your output should be: August 15, 2024",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-08-15\";\nconst months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\nconst d = new Date(dateStr);\nconsole.log(months[d.getMonth()] + \" \" + d.getDate() + \", \" + d.getFullYear());",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-08-15"
          },
          "expectedOutput": "August 15, 2024"
        },
        {
          "input": {
            "dateStr": "2024-01-01"
          },
          "expectedOutput": "January 1, 2024"
        },
        {
          "input": {
            "dateStr": "2024-12-25"
          },
          "expectedOutput": "December 25, 2024"
        },
        {
          "input": {
            "dateStr": "2024-07-04"
          },
          "expectedOutput": "July 4, 2024"
        }
      ]
    }
  ]
};
