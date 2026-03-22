/** Topic: Working with Dates */
export default {
  "id": "date-time",
  "title": "Working with Dates",
  "outcomes": [
    "What is a Date?",
    "Getting \"now\": new Date() with no arguments",
    "Creating a date from year, month, and day",
    "Creating a date from a string (e.g. YYYY-MM-DD)",
    "Reading the parts: getFullYear(), getMonth(), getDate()",
    "Getting the weekday: getDay() and 0–6",
    "Showing a date: toDateString(), toISOString(), toLocale",
    "Changing a date in place: setFullYear, setMonth, setDate",
    "One number for the whole date: getTime()",
    "Comparing two dates",
    "Adding and subtracting time"
  ],
  "outcome_messages": [
    "Let's start with what a Date actually is.\n\nA Date is a value that represents a single moment in time—a certain date and time of day. In JavaScript you work with it by creating a Date object with `new Date(...)`, then using methods to read or change that moment. Under the hood it's stored as milliseconds since a fixed point (January 1, 1970 UTC), but you don't need to think about that yet. For now: create with `new Date()`, then use methods to get or set the date and time.\n\nHere's the simplest possible example—we'll build from here:\n\n```javascript\nconst d = new Date();\nconsole.log(d);\n```\n\n## Output\n\n```\nMon Mar 01 2025 12:00:00 GMT+0000\n```\n\nThe exact date and time depend on when you run the code. This creates a Date for \"right now.\" In the next steps we'll see the different ways to create a Date and how to read and format it.\n\n## Practice\n\nIn one line, what does `new Date()` with no arguments give you?",
    "Let's get the current moment with `new Date()` and no arguments.\n\nThe easiest way to create a Date is to ask for \"now.\"\n\nWhen you call `new Date()` with no arguments, you get a Date set to the exact moment the code runs—the current date and time on the system. Use this whenever you need the current time (e.g. \"when did the user do this?\").\n\n## Example\n\n```javascript\nconst now = new Date();\nconsole.log(now.toLocaleString());\n```\n\n## Output\n\n```\n3/1/2025, 12:00:00 PM\n```\n\nThe output depends on when you run it and your locale. No arguments = \"right now.\"\n\n## Practice\n\nWhen you call new Date() with no arguments, what moment in time does the Date represent?",
    "Let's build a Date from numeric year, month index, and day.\n\nWhen you know the year, month, and day, you can build a Date from those numbers.\n\nUse `new Date(year, monthIndex, day)`. The month is zero-indexed (0–11). Use this mapping:\n\n- 0 = January\n- 1 = February\n- 2 = March\n- 3 = April\n- 4 = May\n- 5 = June\n- 6 = July\n- 7 = August\n- 8 = September\n- 9 = October\n- 10 = November\n- 11 = December\n\nSo for March 15, 2024 you pass monthIndex 2; for December you pass 11.\n\n## Example\n\n```javascript\nconst d = new Date(2024, 2, 15);\nconsole.log(d.toDateString());\n```\n\n## Output\n\n```\nFri Mar 15 2024\n```\n\nYou can also pass hour, minute, second, and milliseconds; if you omit them, they default to 0. Start with year, month index, and day.\n\n## Practice\n\nWhat month index do you pass for January? For December?",
    "Let's parse a date string safely—ISO `YYYY-MM-DD` is the most reliable format.\n\nYou can create a Date from a string with `new Date(dateString)`. The format that works reliably everywhere is ISO: YYYY-MM-DD (and optionally time). Other formats can behave differently in different environments, so stick to YYYY-MM-DD when you can.\n\n## Example\n\n```javascript\nconst d = new Date(\"2024-06-15\");\nconsole.log(d.toDateString());\n```\n\n## Output\n\n```\nSat Jun 15 2024\n```\n\nOnce you have the Date object, you can use all the same methods (getFullYear, getMonth, etc.) as when you built it from numbers.\n\n## Practice\n\nWhat output do you get when you run toDateString() on new Date(\"2025-01-10\")?",
    "Let's read the calendar parts with getFullYear(), getMonth(), and getDate().\n\nOnce you have a Date, you often need to read its parts—year, month, day.\n\nUse `getFullYear()` for the year, `getMonth()` for the month, and `getDate()` for the day of the month. These all return numbers.\n\n## Example\n\n```javascript\nconst d = new Date(\"2024-07-04\");\nconsole.log(d.getFullYear());\nconsole.log(d.getMonth());\nconsole.log(d.getDate());\n```\n\n## Output\n\n```\n2024\n6\n4\n```\n\nThere are also getHours(), getMinutes(), getSeconds() when you need the time of day.\n\n## Practice\n\nWhat does getMonth() return for July—the number 7 or the number 6?",
    "Let's use getDay() for the weekday as a number from 0 (Sunday) through 6 (Saturday).\n\nTo get the day of the week, use getDay().\n\n`getDay()` returns a number 0–6 for the weekday. It does not return the day of the month—that's getDate(). Mapping:\n\n- 0 = Sunday\n- 1 = Monday\n- 2 = Tuesday\n- 3 = Wednesday\n- 4 = Thursday\n- 5 = Friday\n- 6 = Saturday\n\n0 = Sunday is a JavaScript convention. Use the number to check the weekday (e.g. 0 or 6 for weekend).\n\n## Example\n\n```javascript\nconst d = new Date(\"2024-08-25\");\nconsole.log(d.getDay());\n```\n\n## Output\n\n```\n0\n```\n\nAugust 25, 2024 is a Sunday, so getDay() returns 0.\n\n## Practice\n\nWhat does getDay() return for a Wednesday?",
    "Let's format a Date as a string for display, storage, or APIs.\n\nWhen you need to show a date to a user or send it somewhere, you format it as a string.\n\n`toDateString()` gives a readable date like \"Sat Jun 15 2024\" in local time. `toISOString()` gives UTC in a standard form like \"2024-06-15T00:00:00.000Z\"—good for storing or sending. `toLocaleDateString()` and `toLocaleString()` use the user's locale (e.g. 6/15/2024 or 15/6/2024). Pick the one that fits: display for users vs. storage/API.\n\n## Example\n\n```javascript\nconst d = new Date(2024, 5, 15);\nconsole.log(d.toDateString());\nconsole.log(d.toISOString());\nconsole.log(d.toLocaleDateString());\n```\n\n## Output\n\n```\nSat Jun 15 2024\n2024-06-15T00:00:00.000Z\n6/15/2024\n```\n\nUse toDateString or toLocale* for UI; use toISOString when you need a consistent, storable format.\n\n## Practice\n\nWhen would you use toISOString() instead of toDateString()?",
    "Let's mutate a Date in place with setFullYear(), setMonth(), and setDate().\n\nYou can change an existing Date instead of creating a new one.\n\nMethods like `setFullYear(year)`, `setMonth(monthIndex)`, `setDate(day)` update the Date in place.\n\n## Example\n\n```javascript\nconst d = new Date(2024, 0, 15);\nd.setMonth(5);\nd.setDate(1);\nconsole.log(d.toDateString());\n```\n\n## Output\n\n```\nSat Jun 01 2024\n```\n\nThe original variable d now refers to June 1, 2024. You didn't create a new Date—you changed this one.\n\n## Practice\n\nAfter calling d.setMonth(5) on a Date, does d refer to a new Date or the same Date changed in place?",
    "Let's use getTime() to get one number for a date.\n\n`getTime()` returns the number of milliseconds since January 1, 1970 UTC. One moment = one number. Use it to compare dates (a.getTime() < b.getTime()) or to subtract and get the difference in milliseconds. One day = 24 * 60 * 60 * 1000 ms.\n\n## Example\n\n```javascript\nconst d = new Date(\"2024-01-01\");\nconsole.log(d.getTime());\n```\n\n## Output\n\n```\n1704067200000\n```\n\n## Practice\n\nWhat does getTime() return—a number or a string?",
    "Let's compare two moments by comparing their getTime() values.\n\nTo know if one date is before or after another, compare them as numbers.\n\nCall `getTime()` on each Date and use <, >, or === on those numbers. Don't rely on comparing the Date objects themselves with == or ===—that compares references, not the actual moments. So: a.getTime() < b.getTime() means \"a is earlier than b.\"\n\n## Example\n\n```javascript\nconst a = new Date(\"2024-06-01\");\nconst b = new Date(\"2024-06-15\");\nconsole.log(a.getTime() < b.getTime());\n```\n\n## Output\n\n```\ntrue\n```\n\nYou can also subtract: b.getTime() - a.getTime() gives the difference in milliseconds.\n\n## Practice\n\nTo check if date d1 is before d2, should you use d1 < d2 or d1.getTime() < d2.getTime()?",
    "Let's add or subtract time by adding or subtracting milliseconds from getTime().\n\nTo get a date that is N days before or after another, work with milliseconds.\n\nGet the timestamp with getTime(), add or subtract the right number of milliseconds (e.g. one day = 24 * 60 * 60 * 1000), then create a new Date from that number: `new Date(d.getTime() + oneDayMs)`. That gives you a new Date without changing the original.\n\n## Example\n\n```javascript\nconst d = new Date(\"2024-01-15\");\nconst oneDayMs = 24 * 60 * 60 * 1000;\nconst tomorrow = new Date(d.getTime() + oneDayMs);\nconsole.log(tomorrow.toDateString());\n```\n\n## Output\n\n```\nTue Jan 16 2024\n```\n\nAdding milliseconds is predictable. For \"7 days later,\" add 7 * oneDayMs.\n\n## Practice\n\nTo get a Date 7 days after d, do you add 7 to d directly or use new Date(d.getTime() + 7 * oneDayMs)?"
  ],
  "tasks": [
    {
      "description": "// Create a Date for January 1, 2025 using new Date(year, monthIndex, day).\n// January = monthIndex 0; December = 11.\n// Print the date with toDateString().\n// Expected output: Wed Jan 01 2025",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-06-15\";\n// Step 1: Create a Date from the string: new Date(dateStr)\n// Step 2: Get the year with getFullYear()\n// Step 3: Print only that number (e.g. 2024 for \"2024-06-15\")",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-03-15\";\n// Create a Date from dateStr. Use getMonth() (returns 0-11). Add 1 to get calendar month 1-12.\n// Print that single number (e.g. 3 for March, 12 for December).\n// For \"2024-03-15\" output should be: 3",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-08-25\";\n// Create a Date from dateStr. Use getDay() (0=Sunday, 1=Monday, ..., 6=Saturday).\n// Print the weekday number only. For \"2024-08-25\" output should be: 0",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-08-25\";\nconst d = new Date(dateStr);\nconsole.log(d.getDay());",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-08-25"
          },
          "expectedOutput": "0"
        },
        {
          "input": {
            "dateStr": "2024-08-26"
          },
          "expectedOutput": "1"
        },
        {
          "input": {
            "dateStr": "2024-08-31"
          },
          "expectedOutput": "6"
        },
        {
          "input": {
            "dateStr": "2024-01-01"
          },
          "expectedOutput": "1"
        }
      ]
    },
    {
      "description": "// Create a Date for December 25 of the current year (use month index 11 for December).\n// Print three lines: (1) day of month with getDate(), (2) month number 1-12 with getMonth()+1, (3) year with getFullYear().\n// Expected output (for 2025):\n// 25\n// 12\n// 2025",
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
      "description": "// Do not rename dateStr1 or dateStr2; they are inputs. We may change them when testing.\nconst dateStr1 = \"2024-06-15\";\nconst dateStr2 = \"2024-08-20\";\n// Parse both strings into Date objects. Compare them (e.g. d1.getTime() < d2.getTime() or d1 < d2).\n// Print exactly one of: \"First date is earlier\" | \"Second date is earlier\" | \"Same date\"",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-03-10\";\n// Create a Date from dateStr. Add 7 days: setDate(getDate() + 7).\n// Print the new date as YYYY-MM-DD using toISOString().split('T')[0].\n// For \"2024-03-10\" expected output: 2024-03-17",
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
      "description": "// Do not rename dateStr1 or dateStr2; they are inputs. We may change them when testing.\nconst dateStr1 = \"2024-01-01\";\nconst dateStr2 = \"2024-01-15\";\n// Parse both into Dates. Get milliseconds with getTime(). Subtract, then convert to days (1 day = 24*60*60*1000 ms).\n// Print the absolute number of days between the two dates (e.g. 14 for Jan 1 and Jan 15).",
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
      "description": "// Create a Date for March 15, 2024 (March = month index 2).\n// Change the month to June with setMonth(5).\n// Print the result with toDateString(). Expected: Sat Jun 15 2024",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-07-04\";\n// Create a Date from dateStr. getDay() returns 0 (Sunday) or 6 (Saturday) for weekends.\n// If the day is Saturday or Sunday print \"Weekend\", otherwise print \"Weekday\".",
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
      "description": "// Do not rename year, month, or day; they are inputs (month is 1-12). We may change them when testing.\nconst year = 2024;\nconst month = 2;  // 1 = January, 12 = December\nconst day = 29;\n// Create a Date with new Date(year, month - 1, day) so the constructor gets 0-11 for month.\n// If the date is valid, the Date will have the same getDate(), getMonth()+1, and getFullYear() as the inputs.\n// If invalid (e.g. Feb 30), the Date rolls over so they won't match. Print \"Valid date\" or \"Invalid date\".",
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
      "description": "// Do not rename dateStr; it is the input. We may change it when testing.\nconst dateStr = \"2024-08-15\";\n// Create a Date from dateStr. Build a string with month (getMonth()+1), day (getDate()), year (getFullYear()).\n// Format: month day, year (e.g. 8 15, 2024 for August 15, 2024).\n// For \"2024-08-15\" expected output: 8 15, 2024",
      "solution_type": "script",
      "reference_solution": "const dateStr = \"2024-08-15\";\nconst d = new Date(dateStr);\nconsole.log((d.getMonth() + 1) + \" \" + d.getDate() + \", \" + d.getFullYear());",
      "testCases": [
        {
          "input": {
            "dateStr": "2024-08-15"
          },
          "expectedOutput": "8 15, 2024"
        },
        {
          "input": {
            "dateStr": "2024-01-01"
          },
          "expectedOutput": "1 1, 2024"
        },
        {
          "input": {
            "dateStr": "2024-12-25"
          },
          "expectedOutput": "12 25, 2024"
        },
        {
          "input": {
            "dateStr": "2024-07-04"
          },
          "expectedOutput": "7 4, 2024"
        }
      ]
    }
  ]
};
