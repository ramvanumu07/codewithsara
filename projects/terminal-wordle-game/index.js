const readline = require('readline');
const path = require('path');
const { WordBank } = require('./WordBank.js');
const { Game } = require('./Game.js');
const { Stats } = require('./Stats.js');

const STATS_PATH = path.join(__dirname, 'stats.json');

const TILE = {
  correct: '🟩',
  present: '🟨',
  absent: '⬛',
};

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

const MENU = `
╔══════════════════════════════════════════════╗
║         🟩 TERMINAL WORDLE 🟩                ║
╠══════════════════════════════════════════════╣
║  1. Play Game                                ║
║  2. View Statistics                          ║
║  3. How to Play                              ║
║  4. Settings                                 ║
║  0. Exit                                     ║
╚══════════════════════════════════════════════╝
`;

const guessPattern = /^[A-Za-z]{5}$/;

const createPrompt = (rl) => (question) =>
  new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });

const formatRow = (result) => {
  const n = result.length;
  const sepTop = '┌' + Array(n).fill('───').join('┬') + '┐';
  const sepBot = '└' + Array(n).fill('───').join('┴') + '┘';
  const emojis = result.map((r) => ` ${TILE[r.status]} `).join('│');
  const letters = result.map((r) => ` ${r.letter.toUpperCase()} `).join('│');
  return [`  ${sepTop}`, `  │${emojis}│`, `  │${letters}│`, `  ${sepBot}`].join('\n');
};

const formatBoard = (guesses) => guesses.map(({ result }) => formatRow(result)).join('\n');

const formatKeyboard = (state) =>
  KEYBOARD_ROWS.map((row) =>
    row
      .split('')
      .map((ch) => {
        const s = state[ch];
        if (s === 'correct') return `${TILE.correct}${ch}`;
        if (s === 'present') return `${TILE.present}${ch}`;
        if (s === 'absent') return `${TILE.absent}${ch}`;
        return `·${ch}`;
      })
      .join(' '),
  ).join('\n');

const printHowToPlay = () => {
  const text = [
    'Guess the 5-letter word in six tries.',
    'After each guess, tiles show:',
    `  ${TILE.correct} correct letter and spot`,
    `  ${TILE.present} correct letter, wrong spot`,
    `  ${TILE.absent} letter not in the word`,
    'Guesses must be real words from the built-in word bank.',
    'Hard mode: every green/yellow clue from past guesses must be respected.',
    'Hints (if enabled): after four guesses, you can request a revealed position.',
  ].join('\n');
  console.log(text);
};

const runMenu = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const prompt = createPrompt(rl);

  let stats = await Stats.load(STATS_PATH);
  const wordBank = new WordBank();
  let sessionSettings = { hardMode: false, hintSystem: true };

  const saveStatsSafe = async () => {
    try {
      await stats.save(STATS_PATH);
    } catch (err) {
      console.error(`Could not save stats: ${err.message}`);
    }
  };

  const playOnce = async () => {
    const target = wordBank.getRandomWord();
    const game = new Game(target, sessionSettings);
    const revealedHint = new Set();
    let hintConsumed = false;

    console.log('\nNew game — six attempts. Good luck!\n');

    while (!game.isGameOver) {
      const used = game.guesses.length;
      const keyboard = game.getKeyboardState();
      console.log(formatBoard(game.guesses));
      console.log('\nKeyboard:\n' + formatKeyboard(keyboard) + '\n');

      const canHint =
        sessionSettings.hintSystem && used === 4 && !game.hasWon && !hintConsumed && !game.isGameOver;

      if (canHint) {
        console.log('You have used four guesses. Type H then Enter for a hint, or type your guess.\n');
      }

      const raw = (await prompt('Guess (5 letters): ')).trim();
      if (raw.length === 1 && raw.toLowerCase() === 'h' && canHint) {
        const hint = wordBank.getHint(target, revealedHint);
        if (hint) {
          const { index, letter } = hint;
          revealedHint.add(index);
          hintConsumed = true;
          console.log(`Hint: position ${index + 1} is "${letter.toUpperCase()}".\n`);
        }
        continue;
      }

      if (!guessPattern.test(raw)) {
        console.log('Invalid: need exactly five letters A–Z.\n');
        continue;
      }

      const guess = raw.toLowerCase();
      if (!wordBank.isValidWord(guess)) {
        console.log('Not in word bank.\n');
        continue;
      }

      if (!game.satisfiesHardMode(guess)) {
        console.log('Hard mode: use all known green/yellow clues.\n');
        continue;
      }

      const result = game.makeGuess(guess);
      if (!result) break;

      await game.startRevealWithFrames(result, (guessResult, idx) => {
        const partial = guessResult.map((cell, j) =>
          j <= idx ? cell : { letter: ' ', status: 'absent' },
        );
        console.log(formatRow(partial));
      });

      console.log('');

      if (game.hasWon) {
        console.log(`You won in ${game.guesses.length} ${game.guesses.length === 1 ? 'try' : 'tries'}!`);
        stats.recordWin(game.guesses.length);
        await saveStatsSafe();
        console.log('\n' + stats.summaryLines().join('\n'));
        console.log('\n' + stats.getDistributionChart());
        return;
      }

      if (game.isGameOver) {
        console.log(`Out of guesses. The word was: ${target.toUpperCase()}`);
        stats.recordLoss();
        await saveStatsSafe();
        console.log('\n' + stats.summaryLines().join('\n'));
        console.log('\n' + stats.getDistributionChart());
        return;
      }
    }
  };

  let running = true;
  while (running) {
    console.log(MENU);
    const choice = (await prompt('➤ Select an option: ')).trim();

    try {
      if (choice === '0') {
        running = false;
        console.log('Goodbye!');
      } else if (choice === '1') {
        await playOnce();
      } else if (choice === '2') {
        console.log('\n' + stats.summaryLines().join('\n'));
        console.log('\n' + stats.getDistributionChart() + '\n');
      } else if (choice === '3') {
        printHowToPlay();
        console.log('');
      } else if (choice === '4') {
        console.log('\nSettings:');
        console.log(`  1) Hard mode     [${sessionSettings.hardMode ? 'ON' : 'OFF'}]`);
        console.log(`  2) Hint system   [${sessionSettings.hintSystem ? 'ON' : 'OFF'}]`);
        console.log('  0) Back');
        const s = (await prompt('➤ Setting: ')).trim();
        if (s === '1') sessionSettings.hardMode = !sessionSettings.hardMode;
        if (s === '2') sessionSettings.hintSystem = !sessionSettings.hintSystem;
        console.log('');
      } else if (!choice) {
        console.log('Enter a number.\n');
      } else {
        const shown = choice.length > 24 ? `${choice.slice(0, 24)}…` : choice;
        console.log(`Unknown option "${shown}".\n`);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }

  rl.close();
};

runMenu().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
