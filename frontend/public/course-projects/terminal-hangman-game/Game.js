// ── Topics: Classes, Inheritance, Closures, Recursion, Promises, Async/Await,
//    Arrays, Objects, Destructuring, Spread/Rest, JSON, Map, Filter, Find,
//    Some/Every, Reduce, forEach, Arrow Functions, Functions, Loops,
//    Loop Control, Nested Loops, Conditionals, Operators, Regex,
//    String Manipulations, Split/Join, Substring/Slice, String Searching,
//    Error Handling, Numbers, Math, Undefined/Null, Type Coercion,
//    Date/Time, Console.log, Variables & Constants, Modules ──

const fs = require("fs");
const path = require("path");
const { getRandomWord, getCategoryForWord, CATEGORY_NAMES } = require("./words");

const STATS_FILE = path.join(__dirname, "stats.json");
const MAX_WRONG = 7;

// ── ANSI helpers ────────────────────────────────────────────────

const BOLD = "\u001b[1m";
const DIM = "\u001b[2m";
const RESET = "\u001b[0m";
const CYAN = "\u001b[36m";
const GREEN = "\u001b[32m";
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const MAGENTA = "\u001b[35m";
const WHITE = "\u001b[37m";

// ── Stickman art (7 stages) ──────────────────────────────────────

const STICKMAN = [
  // 0 wrong
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │         ",
    "  │         ",
    "  │         ",
    "  │         ",
    "══╧════════ ",
  ],
  // 1 wrong — head
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │         ",
    "  │         ",
    "  │         ",
    "══╧════════ ",
  ],
  // 2 wrong — body
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │       │ ",
    "  │         ",
    "  │         ",
    "══╧════════ ",
  ],
  // 3 wrong — left arm
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │      /│ ",
    "  │         ",
    "  │         ",
    "══╧════════ ",
  ],
  // 4 wrong — right arm
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │      /│\\",
    "  │         ",
    "  │         ",
    "══╧════════ ",
  ],
  // 5 wrong — left leg
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │      /│\\",
    "  │      /  ",
    "  │         ",
    "══╧════════ ",
  ],
  // 6 wrong — right leg
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       O ",
    "  │      /│\\",
    "  │      / \\",
    "  │         ",
    "══╧════════ ",
  ],
  // 7 wrong — face (dead)
  [
    "  ┌───────┐ ",
    "  │       │ ",
    "  │       X ",
    "  │      /│\\",
    "  │      / \\",
    "  │         ",
    "══╧════════ ",
  ],
];

// ── Hint generator (Closures) ───────────────────────────────────

const createHintSystem = (secretWord, maxHints) => {
  const letters = [...new Set(secretWord.split(""))];
  const revealed = new Set();
  let hintsGiven = 0;

  return (alreadyGuessed) => {
    if (hintsGiven >= maxHints) return null;

    const unrevealed = letters.filter(
      (ch) => !alreadyGuessed.has(ch) && !revealed.has(ch)
    );

    if (unrevealed.length === 0) return null;

    const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    revealed.add(pick);
    hintsGiven++;

    const positions = secretWord
      .split("")
      .map((ch, i) => (ch === pick ? i + 1 : -1))
      .filter((i) => i !== -1);

    return {
      letter: pick,
      positions,
      remaining: maxHints - hintsGiven,
    };
  };
};

// ── Stats persistence ───────────────────────────────────────────

class Stats {
  #data;

  constructor() {
    this.#data = this.#load();
  }

  #load() {
    try {
      if (fs.existsSync(STATS_FILE)) {
        const raw = fs.readFileSync(STATS_FILE, "utf-8");
        return JSON.parse(raw);
      }
    } catch {
      // corrupted — start fresh
    }

    return {
      played: 0,
      won: 0,
      currentStreak: 0,
      maxStreak: 0,
      categoryWins: {},
      difficultyWins: { easy: 0, medium: 0, hard: 0 },
      history: [],
    };
  }

  async save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(STATS_FILE, JSON.stringify(this.#data, null, 2), "utf-8", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  recordWin(word, category, difficulty, wrongGuesses) {
    this.#data.played++;
    this.#data.won++;
    this.#data.currentStreak++;
    this.#data.maxStreak = Math.max(this.#data.maxStreak, this.#data.currentStreak);
    this.#data.categoryWins[category] = (this.#data.categoryWins[category] || 0) + 1;
    this.#data.difficultyWins[difficulty] = (this.#data.difficultyWins[difficulty] || 0) + 1;
    this.#pushHistory(word, category, difficulty, true, wrongGuesses);
  }

  recordLoss(word, category, difficulty, wrongGuesses) {
    this.#data.played++;
    this.#data.currentStreak = 0;
    this.#pushHistory(word, category, difficulty, false, wrongGuesses);
  }

  #pushHistory(word, category, difficulty, won, wrongGuesses) {
    this.#data.history.push({
      word,
      category,
      difficulty,
      won,
      wrongGuesses,
      date: new Date().toISOString(),
    });

    if (this.#data.history.length > 50) {
      this.#data.history = this.#data.history.slice(-50);
    }
  }

  get played() { return this.#data.played; }
  get won() { return this.#data.won; }
  get winRate() {
    return this.#data.played > 0
      ? Math.round((this.#data.won / this.#data.played) * 10000) / 100
      : 0;
  }
  get currentStreak() { return this.#data.currentStreak; }
  get maxStreak() { return this.#data.maxStreak; }
  get categoryWins() { return { ...this.#data.categoryWins }; }
  get difficultyWins() { return { ...this.#data.difficultyWins }; }
  get history() { return [...this.#data.history]; }

  print() {
    console.log(`\n${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${BOLD}${CYAN}   YOUR STATISTICS${RESET}`);
    console.log(`${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`  Played         : ${BOLD}${this.played}${RESET}`);
    console.log(`  Won            : ${GREEN}${this.won}${RESET}`);
    console.log(`  Win Rate       : ${YELLOW}${this.winRate}%${RESET}`);
    console.log(`  Current Streak : ${GREEN}${this.currentStreak}${RESET}`);
    console.log(`  Max Streak     : ${BOLD}${this.maxStreak}${RESET}`);

    const catWins = this.categoryWins;
    const hasCatWins = Object.values(catWins).some((v) => v > 0);
    if (hasCatWins) {
      console.log(`\n${BOLD}  Wins by Category:${RESET}`);
      const maxCat = Object.values(catWins).reduce((a, b) => Math.max(a, b), 0);
      Object.entries(catWins)
        .filter(([, count]) => count > 0)
        .sort(([, a], [, b]) => b - a)
        .forEach(([cat, count]) => {
          const barLen = maxCat > 0 ? Math.max(1, Math.round((count / maxCat) * 15)) : 1;
          const bar = `${GREEN}${"█".repeat(barLen)}${RESET}`;
          console.log(`  ${cat.padEnd(12)} │ ${bar} ${count}`);
        });
    }

    const diffWins = this.difficultyWins;
    const hasDiffWins = Object.values(diffWins).some((v) => v > 0);
    if (hasDiffWins) {
      console.log(`\n${BOLD}  Wins by Difficulty:${RESET}`);
      const colors = { easy: GREEN, medium: YELLOW, hard: RED };
      Object.entries(diffWins)
        .filter(([, count]) => count > 0)
        .forEach(([diff, count]) => {
          const c = colors[diff] ?? WHITE;
          console.log(`  ${c}${diff.padEnd(8)}${RESET} : ${count}`);
        });
    }

    if (this.history.length > 0) {
      console.log(`\n${BOLD}  Recent Games:${RESET}`);
      const recent = this.history.slice(-5).reverse();
      recent.forEach(({ word, category, difficulty, won, wrongGuesses, date }) => {
        const d = new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
        const result = won
          ? `${GREEN}WON (${wrongGuesses} wrong)${RESET}`
          : `${RED}LOST${RESET}`;
        console.log(`  ${DIM}${d}${RESET}  ${word.padEnd(12)} [${category}/${difficulty}]  ${result}`);
      });
    }

    console.log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
  }
}

// ── Core Game class ─────────────────────────────────────────────

class Game {
  #secret;
  #category;
  #difficulty;
  #guessedLetters = new Set();
  #wrongLetters = new Set();
  #correctLetters = new Set();
  #wrongCount = 0;
  #solved = false;
  #gameOver = false;
  #hintFn;
  #hintsUsed = 0;
  #maxHints;
  #startTime;

  constructor({ category, difficulty = "medium" } = {}) {
    const validDifficulties = ["easy", "medium", "hard"];
    if (!validDifficulties.includes(difficulty)) {
      throw new Error(`Difficulty must be one of: ${validDifficulties.join(", ")}`);
    }
    if (category && category !== "random" && !CATEGORY_NAMES.includes(category)) {
      throw new Error(`Category must be one of: ${CATEGORY_NAMES.join(", ")}, random`);
    }

    this.#difficulty = difficulty;
    const { word, category: resolvedCategory } = getRandomWord({ category, difficulty });
    this.#secret = word;
    this.#category = resolvedCategory;

    this.#maxHints = difficulty === "easy" ? 3 : difficulty === "medium" ? 2 : 1;
    this.#hintFn = createHintSystem(this.#secret, this.#maxHints);
    this.#startTime = Date.now();
  }

  get secret() { return this.#secret; }
  get category() { return this.#category; }
  get difficulty() { return this.#difficulty; }
  get wrongCount() { return this.#wrongCount; }
  get maxWrong() { return MAX_WRONG; }
  get attemptsLeft() { return MAX_WRONG - this.#wrongCount; }
  get isSolved() { return this.#solved; }
  get isGameOver() { return this.#gameOver; }
  get hintsUsed() { return this.#hintsUsed; }
  get maxHints() { return this.#maxHints; }
  get guessedLetters() { return new Set(this.#guessedLetters); }
  get wrongLetters() { return [...this.#wrongLetters]; }

  get elapsedSeconds() {
    return Math.floor((Date.now() - this.#startTime) / 1000);
  }

  get maskedWord() {
    return this.#secret
      .split("")
      .map((ch) => (this.#correctLetters.has(ch) ? ch : "_"))
      .join(" ");
  }

  get wordProgress() {
    const total = new Set(this.#secret.split("")).size;
    const found = this.#correctLetters.size;
    return { found, total, percent: Math.round((found / total) * 100) };
  }

  // ── Guess a letter ──────────────────────────────────────────

  guessLetter(input) {
    if (this.#gameOver) throw new Error("Game is already over.");

    if (!input || typeof input !== "string") {
      throw new Error("Please enter a letter.");
    }

    const letter = input.trim().toUpperCase();

    if (letter.length !== 1 || !/^[A-Z]$/.test(letter)) {
      throw new Error("Enter a single letter A-Z.");
    }

    if (this.#guessedLetters.has(letter)) {
      throw new Error(`You already guessed "${letter}". Try a different letter.`);
    }

    this.#guessedLetters.add(letter);

    const isCorrect = this.#secret.includes(letter);

    if (isCorrect) {
      this.#correctLetters.add(letter);

      const allRevealed = this.#secret
        .split("")
        .every((ch) => this.#correctLetters.has(ch));

      if (allRevealed) {
        this.#solved = true;
        this.#gameOver = true;
      }
    } else {
      this.#wrongLetters.add(letter);
      this.#wrongCount++;

      if (this.#wrongCount >= MAX_WRONG) {
        this.#gameOver = true;
      }
    }

    return {
      letter,
      correct: isCorrect,
      solved: this.#solved,
      gameOver: this.#gameOver,
      wrongCount: this.#wrongCount,
    };
  }

  // ── Guess full word ────────────────────────────────────────

  guessWord(input) {
    if (this.#gameOver) throw new Error("Game is already over.");

    if (!input || typeof input !== "string") {
      throw new Error("Please enter a word.");
    }

    const word = input.trim().toUpperCase();

    if (!/^[A-Z]+$/.test(word)) {
      throw new Error("Only letters A-Z are allowed.");
    }

    if (word.length !== this.#secret.length) {
      throw new Error(`The word has ${this.#secret.length} letters. You entered ${word.length}.`);
    }

    if (word === this.#secret) {
      this.#secret.split("").forEach((ch) => this.#correctLetters.add(ch));
      this.#solved = true;
      this.#gameOver = true;
      return { word, correct: true, solved: true, gameOver: true };
    }

    this.#wrongCount += 2;
    if (this.#wrongCount >= MAX_WRONG) {
      this.#wrongCount = MAX_WRONG;
      this.#gameOver = true;
    }

    return {
      word,
      correct: false,
      solved: false,
      gameOver: this.#gameOver,
      wrongCount: this.#wrongCount,
    };
  }

  // ── Hint ──────────────────────────────────────────────────────

  getHint() {
    const hint = this.#hintFn(this.#guessedLetters);
    if (!hint) return null;

    this.#hintsUsed++;
    this.#guessedLetters.add(hint.letter);
    this.#correctLetters.add(hint.letter);

    const allRevealed = this.#secret
      .split("")
      .every((ch) => this.#correctLetters.has(ch));

    if (allRevealed) {
      this.#solved = true;
      this.#gameOver = true;
    }

    return hint;
  }

  // ── Display helpers ───────────────────────────────────────────

  getStickmanArt() {
    const stage = Math.min(this.#wrongCount, STICKMAN.length - 1);
    return STICKMAN[stage];
  }

  printStickman() {
    const art = this.getStickmanArt();
    const color = this.#wrongCount >= 5 ? RED
      : this.#wrongCount >= 3 ? YELLOW
      : WHITE;

    art.forEach((line) => {
      console.log(`  ${color}${line}${RESET}`);
    });
  }

  printWord() {
    const display = this.#secret.split("").map((ch) => {
      if (this.#correctLetters.has(ch)) return `${GREEN}${BOLD} ${ch} ${RESET}`;
      return `${DIM} _ ${RESET}`;
    }).join("");

    console.log(`\n    ${display}`);

    const progress = this.wordProgress;
    console.log(`\n  ${DIM}Progress: ${progress.found}/${progress.total} unique letters (${progress.percent}%)${RESET}`);
  }

  printKeyboard() {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    console.log(`\n  ${DIM}──── Keyboard ────${RESET}`);

    rows.forEach((row, idx) => {
      const pad = "  ".repeat(idx);
      const keys = row.split("").map((ch) => {
        if (this.#correctLetters.has(ch)) return `${GREEN}${BOLD} ${ch} ${RESET}`;
        if (this.#wrongLetters.has(ch)) return `${RED}${DIM} ${ch} ${RESET}`;
        return ` ${ch} `;
      });
      console.log(`  ${pad}${keys.join("")}`);
    });

    console.log();
  }

  printStatus() {
    const hearts = "♥".repeat(this.attemptsLeft) + `${DIM}${"♡".repeat(this.#wrongCount)}${RESET}`;
    console.log(`  ${RED}Lives: ${hearts}${RESET}   ${DIM}Category: ${this.#category} | Difficulty: ${this.#difficulty}${RESET}`);

    if (this.wrongLetters.length > 0) {
      const wrong = this.wrongLetters.map((l) => `${RED}${l}${RESET}`).join(" ");
      console.log(`  ${DIM}Wrong:${RESET} ${wrong}`);
    }
  }

  printResult() {
    if (this.#solved) {
      const elapsed = this.elapsedSeconds;
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      const time = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

      console.log(`\n  ${GREEN}${BOLD}You saved the stickman!${RESET}`);
      console.log(`  ${GREEN}The word was: ${BOLD}${this.#secret}${RESET}`);
      console.log(`  ${DIM}Wrong guesses: ${this.#wrongCount} | Time: ${time}${RESET}`);
    } else {
      console.log(`\n  ${RED}${BOLD}The stickman didn't make it!${RESET}`);
      console.log(`  ${RED}The word was: ${BOLD}${this.#secret}${RESET}`);
    }

    if (this.#hintsUsed > 0) {
      console.log(`  ${DIM}(Hints used: ${this.#hintsUsed})${RESET}`);
    }
  }
}

module.exports = { Game, Stats, MAX_WRONG, STICKMAN };
