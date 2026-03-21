class Game {
  #targetWord;
  #guesses;
  #maxAttempts;
  #status;
  #settings;
  #scoreGuess;

  constructor(targetWord, settings = {}) {
    this.#targetWord = targetWord.toLowerCase();
    this.#guesses = [];
    this.#maxAttempts = 6;
    this.#status = 'playing';
    const { hardMode = false, hintSystem = true } = settings;
    this.#settings = { hardMode, hintSystem };
    this.#scoreGuess = ((tgt) => (g) => Game.#matchWithNestedLoops(tgt, g))(this.#targetWord);
  }

  static #matchWithNestedLoops(target, guess) {
    const t = target.split('');
    const g = guess.toLowerCase().split('');
    const result = [];
    for (let i = 0; i < 5; i += 1) {
      result.push({ letter: g[i], status: 'absent' });
    }
    const targetPool = [...t];
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        if (i !== j) continue;
        if (g[i] === t[j]) {
          result[i].status = 'correct';
          targetPool[j] = null;
        }
      }
    }
    for (let i = 0; i < 5; i += 1) {
      if (result[i].status === 'correct') continue;
      for (let j = 0; j < 5; j += 1) {
        if (targetPool[j] === null) continue;
        if (g[i] === targetPool[j]) {
          result[i].status = 'present';
          targetPool[j] = null;
          break;
        }
      }
    }
    return result;
  }

  get settings() {
    return { ...this.#settings };
  }

  get guesses() {
    return this.#guesses.map((g) => ({ ...g, result: g.result.map((r) => ({ ...r })) }));
  }

  get isGameOver() {
    return this.#status !== 'playing';
  }

  get hasWon() {
    return this.#status === 'won';
  }

  get remainingAttempts() {
    return this.#maxAttempts - this.#guesses.length;
  }

  makeGuess(word) {
    if (this.isGameOver) return null;
    const normalized = word.toLowerCase();
    const result = this.#scoreGuess(normalized);
    this.#guesses.push({ word: normalized, result });
    const win = result.every((r) => r.status === 'correct');
    if (win) this.#status = 'won';
    else if (this.#guesses.length >= this.#maxAttempts) this.#status = 'lost';
    return result;
  }

  satisfiesHardMode(word) {
    if (!this.#settings.hardMode) return true;
    const g = word.toLowerCase().split('');
    if (g.length !== 5) return false;
    for (const { result } of this.#guesses) {
      for (let i = 0; i < 5; i += 1) {
        const { letter, status } = result[i];
        if (status === 'correct' && g[i] !== letter) return false;
        if (status === 'present' && !g.includes(letter)) return false;
      }
    }
    return true;
  }

  getKeyboardState() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const state = Object.fromEntries(alphabet.map((l) => [l, 'unused']));
    const rank = { unused: 0, absent: 1, present: 2, correct: 3 };
    this.#guesses.forEach(({ result }) => {
      result.forEach(({ letter, status }) => {
        const next = status;
        if (rank[next] > rank[state[letter]]) state[letter] = next;
      });
    });
    return state;
  }

  revealLetters(guessResult, index = 0) {
    if (index >= guessResult.length) return Promise.resolve();
    return new Promise((resolve) => {
      setTimeout(() => {
        this.revealLetters(guessResult, index + 1).then(resolve);
      }, 85);
    });
  }

  startRevealWithFrames(guessResult, onFrame) {
    const step = (i) => {
      if (i >= guessResult.length) return Promise.resolve();
      return new Promise((resolve) => {
        setTimeout(() => {
          onFrame(guessResult, i);
          step(i + 1).then(resolve);
        }, 95);
      });
    };
    return step(0);
  }
}

module.exports = { Game };
