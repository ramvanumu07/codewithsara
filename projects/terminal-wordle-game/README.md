# Terminal Wordle

A **Wordle-style** word game for the terminal, built with **Node.js** and **`readline`**. Guesses are checked against a built-in bank of common five-letter words; stats persist in `stats.json`.

## How to run

From the repo root:

```bash
cd projects/terminal-wordle-game
node index.js
```

Or:

```bash
npm start
```

Requires **Node.js 18+** (for private class fields `#`).

## Features

- **Menu-driven CLI** — play, stats, how-to, settings, exit
- **Color tiles** — 🟩 correct position, 🟨 wrong position, ⬛ absent
- **Keyboard tracker** — letter states update after each guess
- **Strict guesses** — exactly five letters, alphabetic, must exist in the word bank
- **Duplicate-aware scoring** — same rules as standard Wordle (e.g. target `apple` vs guess `papal`)
- **Statistics** — games played, win rate, streaks, guess distribution bar chart; saved with **async** `fs` + Promises
- **Hard mode** — every green/yellow clue from previous guesses must be satisfied on later guesses
- **Hints** — after four guesses, optional hint reveals one unrevealed position (if hints are enabled in settings)
- **Reveal animation** — recursive `setTimeout` + `Promise` stepping through each letter’s tile

## Example gameplay

```
╔══════════════════════════════════════════════╗
║         🟩 TERMINAL WORDLE 🟩                ║
╠══════════════════════════════════════════════╣
║  1. Play Game                                ║
║  2. View Statistics                          ║
║  3. How to Play                              ║
║  4. Settings                                 ║
║  0. Exit                                     ║
╚══════════════════════════════════════════════╝

  ┌───┬───┬───┬───┬───┐
  │ 🟨 │ ⬛ │ 🟩 │ ⬛ │ ⬛ │
  │  S │  T │  A │  R │  E │
  └───┴───┴───┴───┴───┘

Keyboard:
·q ·w ·e 🟨r ·t ·y ·u ·i ·o ·p
·a 🟩s ·d ·f ·g ·h ·j ·k ·l
·z ·x ·c ·v ·b ·n ·m
```

## JavaScript topics covered

| Topic | Where it appears |
|--------|------------------|
| Console / logging | `index.js`, `Stats.js` |
| Variables & constants | `const` / `let` throughout |
| Numbers & arithmetic | scoring indices, `Math.random`, `Math.floor`, `Math.round`, `Math.max` / `Math.min` |
| `Math` utilities | `WordBank.js`, `Stats.js` |
| `undefined` / `null` | optional hint, `readline` callbacks |
| Strings & operations | normalization, `toUpperCase`, `toLowerCase`, `padEnd`, template literals |
| Type coercion | numeric keys vs string keys in stats JSON |
| Comparison & logical operators | game state, validation |
| Conditionals | menus, validation branches |
| Loops | `for`, `while`, `for...of` |
| Loop control | `break`, `continue` |
| Nested loops | letter matching in `Game.js` |
| Arrays | word bank, guesses, keyboard rows |
| Objects | keyboard state, settings, distribution map |
| Destructuring | `Stats`, settings, `Game` constructor |
| Spread / rest | copies of settings, guesses, merged stats |
| JSON | `stats.json`, `toJSON` / `fromJSON` |
| Functions & arrow functions | helpers, callbacks, `createPrompt` |
| Recursion | `revealLetters`, `startRevealWithFrames` in `Game.js` |
| Closures | `createPrompt(rl)`, guess scorer closure in `Game` |
| `forEach` | keyboard aggregation |
| `map` | rendering rows, shallow copies |
| `filter` | word bank hygiene, slot picking |
| `find` / `findIndex` | hints, `isValidWord` |
| `some` / `every` | win check (`every` correct), `hasAmbiguousPrefix` |
| `reduce` | distribution chart scaling |
| String manipulation | trim, split, join |
| `split` / `join` | rows, words |
| `substring` / `slice` | menu / error display |
| String searching | `includes` in hard mode |
| Regex | `/^[A-Za-z]{5}$/` for guesses |
| Array patterns | batches + dedupe in `WordBank`, keyboard layout |
| Error handling | `try` / `catch` in CLI and `Stats.fromJSON` |
| Classes (basics) | `WordBank`, `Game`, `Stats`, `Serializable` |
| Inheritance | `Stats extends Serializable` |
| Modules | CommonJS `require` / `module.exports` |
| Async basics | `async` main menu / game flow |
| Promises | `createPrompt`, `fs` wrappers, animation chain |
| `async` / `await` | `Stats.load` / `save`, game loop |

## File structure

```
projects/terminal-wordle-game/
├── index.js        # readline CLI, menus, rendering
├── Game.js         # session state, scoring, keyboard, reveal animation
├── WordBank.js     # large built-in word list (200+ required; current bank has 500+ unique words)
├── Stats.js        # Serializable base class + persisted statistics
├── stats.json      # saved stats (updated by the game)
├── package.json    # "type": "commonjs"
└── README.md
```

## License

MIT
