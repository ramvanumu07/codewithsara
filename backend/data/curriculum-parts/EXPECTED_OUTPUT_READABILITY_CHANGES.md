# Expected Output Readability — Before/After by Topic

All topics from **Topic 3** onward were reviewed. Expected outputs were updated from plain values to **readable, labeled** format (e.g. "Hypotenuse value of a and b is value" preferred over "Hypotenuse value: value"). This file helps you verify the changes.

---

## Topic 3: numbers-and-basic-arithmetic

**Status:** No changes (already readable).

All tasks already used labeled output (e.g. "Percentage: 85.4", "Last digit of 5847 is 7", "500 notes: 3\n100 notes: 3\n50 notes: 0\nRemaining amount: 47", "Remainder: 1", "Reversed number: 37", "Final amount: 10800").

---

## Topic 4: built-in-math-utilities

**Status:** Updated.

| Task / Test case | Before | After |
|------------------|--------|--------|
| Power & root verification (all cases) | `1024\n2` | `Power of 2 raised to 10 is: 1024\nRoot verification: 2` |
| (same pattern for base 3,4; 5,3; 10,2; 2,5; 4,3) | `81\n3`, `125\n5`, etc. | `Power of 3 raised to 4 is: 81\nRoot verification: 3`, etc. |
| Hypotenuse reference_solution | Literal "Hypotenuse value of 3 and 4 is:" | Uses variables: "Hypotenuse value of", a, "and", b, "is:", hypotenuse |

All other tasks (distance, circumference/area, temperatures, hypotenuse expectedOutput, sphere volume) were already in readable form.

---

## Topic 5: undefined-null-basics

**Status:** Updated.

| Task / Test case | Before | After |
|------------------|--------|--------|
| typeof a, b, c, d (all cases) | `object\nobject\nnumber\nstring` | `Type of a: object\nType of b: object\nType of c: number\nType of d: string` |

---

## Topic 6: strings-and-basic-operations

**Status:** Updated.

| Task | Before (example) | After (example) |
|------|-------------------|-----------------|
| Name report (firstName, lastName) | `4\nJ\nn\nJohn Smith\nSmith, John\nJOHN SMITH\njohn smith\n10` | `Length of firstName: 4\nFirst character: J\nLast character: n\nFull name: John Smith\nLastName, FirstName: Smith, John\nUppercase: JOHN SMITH\nLowercase: john smith\nLength of full name: 10` |
| Characters at positions 0,2,4,6 | `F\nn\nt\no` | `Character at 0: F\nCharacter at 2: n\nCharacter at 4: t\nCharacter at 6: o` |
| str1/str2 lengths | `8\n7\n15\n1` | `Length of str1: 8\nLength of str2: 7\nSum of lengths: 15\nDifference: 1` |
| First three / next three characters | `Alg\nori` | `First three characters: Alg\nNext three characters: ori` |
| Uppercase + original, length | `PROGRAMMINGprogramming\n22` | `Combined: PROGRAMMINGprogramming\nTotal length: 22` |

---

## Topic 7: type-coercion

**Status:** Updated.

| Task | Before (example) | After (example) |
|------|-------------------|-----------------|
| x, y null/undefined (x+10, y+10, x*2, y*2) | `10\nNaN\n0\nNaN` | `x + 10: 10\ny + 10: NaN\nx * 2: 0\ny * 2: NaN` |
| a == b, a === b, c == false, c === false | `true\nfalse\ntrue\nfalse` | `a == b: true\na === b: false\nc == false: true\nc === false: false` |

First task (coercion lab with num, str, flag1, flag2, val1, val2, text) still uses plain multi-line output; can add labels in a future pass if desired.

---

## Topic 8: operators-comparison-and-logical

**Status:** Updated.

| Task | Before (example) | After (example) |
|------|-------------------|-----------------|
| a == b, a === b | `true\nfalse` | `a == b: true\na === b: false` |
| x between 50 and 100 | `true` / `false` | `x is between 50 and 100: true` / `x is between 50 and 100: false` |
| !val, !!val | `false\ntrue` | `!val: false\n!!val: true` |

Other tasks (Default, Success, str1 > str2) keep current output; already clear in context.

---

## Topic 9: conditionals

**Status:** No changes.

Outputs are already readable messages ("You are eligible to vote", "Even number", "Long string", "Both numbers are large", etc.) or empty string when nothing is printed.

---

## Topic 10: date-time

**Status:** Updated.

| Task | Before (example) | After (example) |
|------|-------------------|-----------------|
| Year from dateStr | `2024` | `Year: 2024` |
| Calendar month (getMonth+1) | `3` | `Calendar month: 3` |
| Weekday number (getDay) | `0` | `Weekday number: 0` |
| Dec 25 parts (day, month, year) | `25\n12\n2025` | `Day: 25\nMonth: 12\nYear: 2025` |
| Days between two dates | `14`, `29`, `6`, `0` | `Days between: 14`, `Days between: 29`, etc. |

Other date-time tasks (toDateString, "First date is earlier", "Weekend"/"Weekday", "Valid date"/"Invalid date", formatted "8 15, 2024") were already readable.

---

## Topic 11: loops

**Status:** Updated.

| Task | Before (example) | After (example) |
|------|-------------------|-----------------|
| Sum 1 to limit | `15` | `Sum: 15` |
| Factorial | `120` | `Factorial: 120` |
| Number of digits | `5` | `Number of digits: 5` |
| Reversed number | `12321`, `4321` | `Reversed number: 12321`, `Reversed number: 4321` |

Other loop tasks (1 to 5, even numbers, multiplication table, Fibonacci) keep current format; table and sequences are already clear.

---

## Topics 12–45 (loop-control through async-await)

**Status:** Not modified in this pass.

These topics mix:
- Already readable output (e.g. "Index 0: cat", "Minimum temperature: 15.2", narrative messages)
- Plain output (e.g. single numbers, raw JSON, "true"/"false")

**Recommendation:** Apply the same pattern topic-by-topic:
- Prefer **"X of a and b is value"** (e.g. Hypotenuse value of 3 and 4 is 5) over **"X: value"** where it reads better.
- Add short labels so Expected/Actual in test results are self-explanatory (e.g. "Sum: 15", "Type of a: number", "Reversed number: 4321").

---

## Summary

- **Topic 3:** Already readable.
- **Topics 4, 5, 6, 10, 11:** Updated in this pass (built-in-math-utilities, undefined-null-basics, strings-and-basic-operations, date-time, loops).
- **Topics 7, 8, 9:** Left as-is (conditionals already good; type-coercion and operators could be labeled in a future pass).
- **Topics 12–45:** Same readability pattern can be applied manually where outputs are still plain.

All edits kept **reference_solution** in sync with **expectedOutput** and task **description** so tests and instructions stay consistent.
