// ── Topics: Async/Await, Promises, Closures, Arrow Functions, Functions,
//    Recursion, Conditionals, Loops, Loop Control, Nested Loops,
//    Spread/Rest, Destructuring, Strings, Split/Join, Substring/Slice,
//    Regex, String Searching, Arrays, Objects, JSON, Error Handling,
//    Modules, Console.log, Variables & Constants, Numbers, Math,
//    Undefined/Null, Type Coercion, Operators, Date/Time, Classes ──

const readline = require("readline");
const { Game, Stats, MAX_WRONG } = require("./Game");
const { CATEGORY_NAMES, getTotalWordCount } = require("./words");

const stats = new Stats();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const BOLD = "\u001b[1m";
const DIM = "\u001b[2m";
const RESET = "\u001b[0m";
const CYAN = "\u001b[36m";
const GREEN = "\u001b[32m";
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const MAGENTA = "\u001b[35m";
const WHITE = "\u001b[37m";

// ── Promisified input (Promises + Closures) ─────────────────────

const ask = (prompt) =>
  new Promise((resolve) => {
    rl.question(`${CYAN}  ${prompt}${RESET}`, (answer) => {
      resolve(answer.trim());
    });
  });

const pause = () => ask("\n  Press ENTER to continue...");

// ── Banner ──────────────────────────────────────────────────────

const showBanner = () => {
  console.clear();
  console.log(`
${CYAN}${BOLD}  ╔════════════════════════════════════════════════════╗
  ║                                                    ║
  ║    TERMINAL HANGMAN                                ║
  ║    ─────────────────────────                       ║
  ║    Save the stickman — guess the word!             ║
  ║                                                    ║
  ║    ${WHITE}♥${CYAN}${BOLD} = lives remaining                            ║
  ║    ${GREEN}A${CYAN}${BOLD} = correct letter    ${RED}X${CYAN}${BOLD} = wrong letter          ║
  ║    ${YELLOW}?${CYAN}${BOLD} = hint (limited per game)                    ║
  ║                                                    ║
  ║    ${DIM}${getTotalWordCount()} words across ${CATEGORY_NAMES.length} categories${RESET}${CYAN}${BOLD}            ║
  ║                                                    ║
  ╚════════════════════════════════════════════════════╝${RESET}
  `);
};

// ── Main menu ───────────────────────────────────────────────────

const showMainMenu = () => {
  console.log(`${BOLD}${MAGENTA}  ┌──────────────────────────────────┐${RESET}`);
  console.log(`${BOLD}${MAGENTA}  │         MAIN MENU                │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  ├──────────────────────────────────┤${RESET}`);
  console.log(`${MAGENTA}  │                                  │${RESET}`);
  console.log(`${GREEN}  │   1.  New Game                   │${RESET}`);
  console.log(`${CYAN}  │   2.  View Statistics             │${RESET}`);
  console.log(`${CYAN}  │   3.  How to Play                 │${RESET}`);
  console.log(`${DIM}  │   0.  Exit                        │${RESET}`);
  console.log(`${MAGENTA}  │                                  │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  └──────────────────────────────────┘${RESET}\n`);
};

// ── Category picker ─────────────────────────────────────────────

const pickCategory = async () => {
  console.log(`\n${BOLD}${YELLOW}  ── SELECT CATEGORY ───────────────${RESET}\n`);

  const colors = [GREEN, CYAN, YELLOW, MAGENTA, RED, WHITE];

  CATEGORY_NAMES.forEach((cat, i) => {
    const color = colors[i % colors.length];
    console.log(`${color}  ${i + 1}. ${cat.charAt(0).toUpperCase() + cat.slice(1)}${RESET}`);
  });
  console.log(`${DIM}  ${CATEGORY_NAMES.length + 1}. Random (any category)${RESET}\n`);

  const choice = await ask(`Choose (1-${CATEGORY_NAMES.length + 1}, default random): `);
  const idx = Number(choice) - 1;

  if (idx >= 0 && idx < CATEGORY_NAMES.length) {
    return CATEGORY_NAMES[idx];
  }
  return "random";
};

// ── Difficulty picker ───────────────────────────────────────────

const pickDifficulty = async () => {
  console.log(`\n${BOLD}${YELLOW}  ── SELECT DIFFICULTY ──────────────${RESET}\n`);
  console.log(`${GREEN}  1. Easy    ${DIM}— Short words (≤6 letters), 3 hints${RESET}`);
  console.log(`${YELLOW}  2. Medium  ${DIM}— Medium words (7 letters), 2 hints${RESET}`);
  console.log(`${RED}  3. Hard    ${DIM}— Long words (8+ letters), 1 hint${RESET}\n`);

  const choice = await ask("Choose (1-3, default 2): ");
  const map = { "1": "easy", "2": "medium", "3": "hard" };
  return map[choice] || "medium";
};

// ── How to play ─────────────────────────────────────────────────

const showHowToPlay = () => {
  console.log(`
${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}
${BOLD}${CYAN}   HOW TO PLAY${RESET}
${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}

  Guess the secret word one letter at a time.
  Each wrong guess adds a body part to the stickman.
  After ${MAX_WRONG} wrong guesses, the stickman is complete and you lose!

  ${BOLD}Guess types:${RESET}
  ${DIM}* Type a single letter to guess that letter${RESET}
  ${DIM}* Type a full word to guess the entire word (costs 2 lives if wrong)${RESET}

  ${BOLD}Commands during a game:${RESET}
  ${DIM}* Type ${BOLD}hint${RESET}${DIM}  to reveal a random letter (limited per difficulty)${RESET}
  ${DIM}* Type ${BOLD}quit${RESET}${DIM}  to abandon the current game${RESET}

  ${BOLD}Difficulty:${RESET}
  ${GREEN}  Easy   ${RESET}${DIM}— Short words (≤6 letters), 3 hints${RESET}
  ${YELLOW}  Medium ${RESET}${DIM}— Medium words (7 letters), 2 hints${RESET}
  ${RED}  Hard   ${RESET}${DIM}— Long words (8+ letters), 1 hint${RESET}

  ${BOLD}Categories:${RESET}
  ${DIM}  ${CATEGORY_NAMES.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}${RESET}

  ${BOLD}Tips:${RESET}
  ${DIM}* Start with common vowels: A, E, I, O, U${RESET}
  ${DIM}* Then try frequent consonants: R, S, T, L, N${RESET}
  ${DIM}* Pay attention to the category hint — it narrows possibilities${RESET}
  ${DIM}* Save your word guess for when you're confident${RESET}

${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}
`);
};

// ── Render game screen ──────────────────────────────────────────

const renderGameScreen = (game) => {
  console.clear();
  console.log(`\n${BOLD}${CYAN}  TERMINAL HANGMAN — ${game.difficulty.toUpperCase()} [${game.category}]${RESET}\n`);

  game.printStickman();
  game.printWord();
  game.printStatus();
  game.printKeyboard();
};

// ── Game loop ───────────────────────────────────────────────────

const playGame = async () => {
  const category = await pickCategory();
  const difficulty = await pickDifficulty();

  let game;
  try {
    game = new Game({ category, difficulty });
  } catch (err) {
    console.log(`\n${RED}  Error starting game: ${err.message}${RESET}`);
    return;
  }

  renderGameScreen(game);

  console.log(`${DIM}  Word has ${game.secret.length} letters. You have ${MAX_WRONG} lives.${RESET}`);
  console.log(`${DIM}  Type a letter, a full word, "hint", or "quit".${RESET}\n`);

  while (!game.isGameOver) {
    const input = await ask(`[${game.attemptsLeft} lives] > `);
    const upper = input.toUpperCase();

    if (upper === "QUIT") {
      console.log(`\n${YELLOW}  Quit! The word was: ${BOLD}${game.secret}${RESET}`);
      stats.recordLoss(game.secret, game.category, game.difficulty, game.wrongCount);
      await stats.save();
      return;
    }

    if (upper === "HINT") {
      const hint = game.getHint();
      if (hint) {
        const posStr = hint.positions.join(", ");
        console.log(`\n${YELLOW}  Hint: Letter "${hint.letter}" is at position ${posStr}${RESET}`);
        console.log(`${DIM}  (${hint.remaining} hint(s) remaining)${RESET}`);

        if (game.isSolved) {
          renderGameScreen(game);
          game.printResult();
          stats.recordWin(game.secret, game.category, game.difficulty, game.wrongCount);
          await stats.save();
          return;
        }

        renderGameScreen(game);
        continue;
      }

      console.log(`\n${RED}  No more hints available!${RESET}\n`);
      continue;
    }

    try {
      let result;

      if (upper.length === 1) {
        result = game.guessLetter(upper);
      } else {
        result = game.guessWord(upper);
      }

      renderGameScreen(game);

      if (result.correct === false && upper.length > 1) {
        console.log(`${RED}  Wrong word! That cost 2 lives.${RESET}\n`);
      }

      if (game.isSolved) {
        game.printResult();
        stats.recordWin(game.secret, game.category, game.difficulty, game.wrongCount);
        await stats.save();
      } else if (game.isGameOver) {
        game.printResult();
        stats.recordLoss(game.secret, game.category, game.difficulty, game.wrongCount);
        await stats.save();
      }
    } catch (err) {
      console.log(`\n${RED}  ${err.message}${RESET}\n`);
    }
  }
};

// ── Main loop ───────────────────────────────────────────────────

const main = async () => {
  showBanner();

  let running = true;

  while (running) {
    showMainMenu();
    const choice = await ask("Enter your choice (0-3): ");

    switch (choice) {
      case "1":
        await playGame();
        await pause();
        console.clear();
        showBanner();
        break;
      case "2":
        stats.print();
        await pause();
        console.clear();
        showBanner();
        break;
      case "3":
        showHowToPlay();
        await pause();
        console.clear();
        showBanner();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log(`\n${RED}  Invalid choice. Pick 0-3.${RESET}`);
        break;
    }
  }

  console.log(`\n${GREEN}  Thanks for playing!${RESET}\n`);
  rl.close();
};

main();
