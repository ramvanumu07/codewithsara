# Topics whose tasks have verification issues

These four topics have at least one task where the **reference solution** does not pass all test cases when run by `verify-topic-tasks.mjs`. Below is what each task does and why it fails.

---

## 1. **console-log** — Task 3

**What the task does:**  
Print one line with three values separated by spaces: the number `10`, the word `items`, and the **expression** `50 * 2`, using comma-separated arguments in a single `console.log`.

**Reference solution:**  
`console.log(10, "items", 50 * 2);`  
So the third value is the **result** of `50 * 2`, which is **100**.

**What goes wrong:**  
- **Expected output** in the test is: `10 items 20`  
- **Actual output** from the reference solution: `10 items 100`  
So the test expects `20` instead of the evaluated expression `50 * 2` (100). The task description says to print “the expression 50 * 2”, which in practice means printing its **value** (100). The curriculum is inconsistent: either the expected output is wrong (should be `10 items 100`), or the description/reference should be changed to print `20` explicitly (e.g. `console.log(10, "items", 20);`).

**Fix:**  
- **Option A (recommended):** Set the test’s `expectedOutput` to `10 items 100` so it matches the current reference and the “expression 50 * 2” wording.  
- **Option B:** Change the task so the third value is the number 20 (e.g. “the number 20” and `console.log(10, "items", 20);`) and keep expected output `10 items 20`.

---

## 2. **strings-and-basic-operations** — Task 1

**What the task does:**  
Use the **input** variable `str`. Print the characters at positions **0, 2, 4, and 6** (one per line). Test cases use different values of `str` (e.g. `"Water Melon"`, `"Programming"`, `"Development"`, `"Computer"`).

**Reference solution:**  
It uses a **literal** string instead of the input:  
`const str = "Water Melon";` then `console.log(str[0]); console.log(str[2]); ...`  
So the solution is written for one fixed string, not for the injected `str` from the test.

**What goes wrong:**  
- For most test inputs the literal `"Water Melon"` happens to give the same indices as the intended word in the test, so several cases pass.  
- For `str = "Development"` the test expects: `D\nv\nl\nm` (indices 0, 2, 4, and **7** — the last character is `m` at index 7).  
- The reference uses indices 0, 2, 4, **6**, so for any string the fourth character is at index 6. For `"Development"` index 6 is `p`, so actual output is `D\nv\nl\np`.  
So there are two issues: (1) the reference ignores the input and uses a literal; (2) for `"Development"` the test expects the fourth character to be `m` (index 7), which does not match “positions 0, 2, 4, and 6”.

**Fix:**  
- **Reference solution:** Use the input `str` and print `str[0]`, `str[2]`, `str[4]`, `str[6]` (no literal string).  
- **Test case for "Development":** If the spec is “positions 0, 2, 4, 6”, the expected output should be `D\nv\nl\np` (index 6 is `p`). If the spec is “0, 2, 4, and the last character”, then the description and the reference (and all test expectations) need to be aligned to that.

---

## 3. **error-handling** — Task 6

**What the task does:**  
Catch a **ReferenceError**: call a function that does not exist (e.g. `nonExistentFunction()`) inside a try/catch and return something like `e.name + ': ' + e.message`. The test expects the string:  
`ReferenceError: nonExistentFunction is not defined`.

**Reference solution:**  
Defines a function named `catchFunctionError()` that calls `nonExistentFunction()` in a try block and returns the error’s name and message in the catch block.

**What goes wrong:**  
Before the code runs, the **SecureCodeExecutor** checks for “dangerous” patterns. One of them is the regex for the **Function constructor**: `/Function\s*\(/g`. That pattern matches the substring **`Function(`** anywhere in the code. The function name **`catchFunctionError`** contains that substring, so the executor throws:  
`Dangerous operation detected: Function constructor is not allowed`  
and the real ReferenceError never runs. So the test sees this security message instead of the expected error string.

**Fix:**  
- **Option A (recommended):** Rename the reference function so it does not contain the substring `Function(` (e.g. `catchRefError()` or `catchMissingFnError()`). Then the reference solution can run and the test can expect `ReferenceError: nonExistentFunction is not defined`.  
- **Option B:** Change the executor so that the forbidden pattern does not match inside identifier names (e.g. only reject actual `Function(` calls). That’s a broader change and might allow code you want to block.

---

## 4. **async-await** — Task 1

**What the task does:**  
Simulate an async-style function that returns the given `value`. The test injects inputs like `{ value: "Hello" }` and expects the output to be that value (e.g. `Hello`).

**Reference solution:**  
Defines a function named **`simulateAsyncFunction(value)`** that returns `value`. When the script is run with injected `value`, the intended behavior is that this function is called (or its result is used) and the value is printed.

**What goes wrong:**  
Same executor check as in error-handling: the pattern `/Function\s*\(/g` matches the substring **`Function(`** in the identifier **`simulateAsyncFunction`**. The executor throws:  
`Dangerous operation detected: Function constructor is not allowed`  
so the script is never executed normally and the test gets this message instead of `Hello` (or whatever the input value is).

**Fix:**  
- **Option A (recommended):** Rename the reference function so it does not contain `Function(` (e.g. `simulateAsyncOp(value)` or `asyncSim(value)`). Then the script can run and the test can expect the injected value.  
- **Option B:** Relax the executor’s pattern so it does not treat identifier names containing the letters “Function(” as use of the Function constructor (same trade-offs as in error-handling).

---

## Summary

| Topic                    | Task | Cause |
|--------------------------|------|--------|
| **console-log**          | 3    | Test expects `10 items 20` but reference correctly prints `50 * 2` → `10 items 100`. Fix: align expected output or task wording. |
| **strings-and-basic-operations** | 1 | Reference uses a literal string instead of input `str`; one test case expects index 7 for “Development” while description says 0,2,4,6. Fix: use `str` in reference and correct expected for index 6. |
| **error-handling**       | 6    | Function name `catchFunctionError` contains `Function(`, so executor blocks the script. Fix: rename function (e.g. `catchRefError`). |
| **async-await**          | 1    | Function name `simulateAsyncFunction` contains `Function(`, so executor blocks the script. Fix: rename function (e.g. `simulateAsyncOp`). |

After applying these fixes, re-run:

- `node backend/scripts/verify-topic-tasks.mjs <topic-id>`  
- or `node backend/scripts/verify-all-topics.mjs`  
to confirm all tasks pass.
