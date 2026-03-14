# Curriculum topic refinement checklist

Use this when reviewing or refining any topic's outcome notes (e.g. `data/curriculum-parts/topic-*.js`).

---

## 1. Output code blocks

- [ ] **Every outcome that has runnable example code has a ## Output section.**
- [ ] Output is shown in a **fenced code block** (triple backticks), not as inline `// value` comments in the example.
- [ ] The example code block does **not** contain inline output comments (e.g. `// 42`). Remove those and put the actual output in the ## Output block below.

**Why:** Keeps "code" and "what you see" clearly separated and matches the pattern used in console.log and other baseline topics.

---

## 2. Practice questions: verify understanding, not "act like a terminal"

- [ ] **Practice questions are knowledge-checking, not just "write code that prints X".**
- [ ] Prefer questions that ask for:
  - **Predicted output:** e.g. "What is the output of 10 + \"5\"? What is the output of 10 - \"5\"? Why are they different?"
  - **Explanation:** e.g. "Why does ... ?", "How would you check ... ?", "What should you do first and why?"
  - **Concepts:** e.g. "Are X and Y strictly equal? Why?"
- [ ] Avoid practice that only asks the learner to type the same expression and run it (acting like a terminal). If the goal is to check understanding, ask for the answer or the reasoning instead.

**Why:** The main goal of practice is to verify that the user understood the outcome. Asking them to predict output or explain reinforces that; asking them only to run given code does not.

---

*Last updated when applying refinements to the Type Coercion topic.*
