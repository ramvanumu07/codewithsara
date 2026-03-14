# Curriculum topic refinement checklist

Use this when reviewing or refining any topic's outcome notes (e.g. `data/curriculum-parts/topic-*.js`).

---

## 1. Output code blocks

- [ ] **Every outcome that has runnable example code has a ## Output section.**
- [ ] Output is shown in a **fenced code block** (triple backticks), not as inline `// value` comments in the example.
- [ ] The example code block does **not** contain inline output comments (e.g. `// 42`). Remove those and put the actual output in the ## Output block below.
- [ ] **Output block shows exact output only.** Do not put "(example)", "e.g.", or similar qualifiers inside the ## Output fenced block. If output depends on time or locale, state that in the paragraph below the block, not inside the block.

**Why:** Keeps "code" and "what you see" clearly separated and matches the pattern used in console.log and other baseline topics. Exact output in the block avoids confusion; caveats go in the text.

---

## 2. No future-topic concepts

- [ ] **Outcome content and tasks use only concepts already introduced in the course order.** Do not use arrays, destructuring, or other later topics inside an earlier topic's examples, explanations, or assignment tasks. If you need a pattern that relies on a future topic, teach only the part that doesn't require it and use an alternative that stays within what the learner has seen.
- [ ] **Do not add forward references or "you'll learn X later" hints.** Phrases like "You'll see how to do Y after you learn arrays" switch the user's context and make them ask about the future topic. Teach only the current outcome; leave later topics for when they appear.

**Why:** Learners follow topics in order. Using a not-yet-taught concept or hinting at it causes confusion and breaks the learning path.

---

## 3. Practice questions: verify understanding, not "act like a terminal"

- [ ] **Practice questions are knowledge-checking, not just "write code that prints X".**
- [ ] **Every practice question must require the user to think.** The learner should have to reason, explain why, predict, or apply a concept—not just observe the example/output and state what they see ("see and say"). If the answer is literally in the output or example (e.g. "what values do a, b, c get?" → "10, 20, 30"), replace the question with one that asks *why*, *what would happen if*, or *how it works*.
- [ ] **Practice questions must only use concepts taught in that outcome.** Do not ask about behavior or concepts from a later outcome in the same topic (or a later topic). The question should be answerable from the current outcome's explanation and example alone.
- [ ] Prefer questions that ask for:
  - **Explanation / why:** e.g. "Why does ... ?", "Why do we use X instead of Y?"
  - **Prediction / what if:** e.g. "If we changed X to Y, what would happen?", "What would a and b be after ...?"
  - **Concepts / mechanism:** e.g. "Does the order matter? Why?", "What rule does ... follow?"
- [ ] Avoid practice that only asks the learner to type the same expression and run it (acting like a terminal). If the goal is to check understanding, ask for the answer or the reasoning instead.
- [ ] **One question per outcome.** Do not bundle multiple questions in a single Practice (e.g. "What is X? What about Y? And why?"). Ask one clear, focused question so the user can answer without overload.
- [ ] **Each outcome has a distinct practice question.** Do not repeat the same or nearly the same question in different outcomes within the same topic. If two outcomes would naturally suggest the same question, rephrase one to focus on a different aspect (e.g. "what do you get?" vs "what moment does it represent?").

**Why:** The main goal of practice is to verify that the user understood the outcome. Questions that require thinking (why, what if, how) reinforce that; "see and say" or "what values?" that repeat the example do not. One question per outcome keeps practice focused and easy to answer.

---

*Last updated when adding "must require thinking" rule for practice questions (no see-and-say).*
