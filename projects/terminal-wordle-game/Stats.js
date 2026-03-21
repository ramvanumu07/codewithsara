const fs = require('fs');
const path = require('path');

class Serializable {
  toJSON() {
    throw new Error('Serializable#toJSON must be implemented');
  }

  static fromJSON() {
    throw new Error('Serializable.fromJSON must be implemented');
  }
}

class Stats extends Serializable {
  constructor({
    gamesPlayed = 0,
    gamesWon = 0,
    currentStreak = 0,
    maxStreak = 0,
    guessDistribution = {},
  } = {}) {
    super();
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
    this.currentStreak = currentStreak;
    this.maxStreak = maxStreak;
    const base = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 };
    this.guessDistribution = { ...base, ...guessDistribution };
  }

  toJSON() {
    const { gamesPlayed, gamesWon, currentStreak, maxStreak, guessDistribution } = this;
    return {
      gamesPlayed,
      gamesWon,
      currentStreak,
      maxStreak,
      guessDistribution: { ...guessDistribution },
    };
  }

  static fromJSON(raw) {
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      const {
        gamesPlayed = 0,
        gamesWon = 0,
        currentStreak = 0,
        maxStreak = 0,
        guessDistribution = {},
      } = parsed;
      const dist = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, ...guessDistribution };
      return new Stats({
        gamesPlayed,
        gamesWon,
        currentStreak,
        maxStreak,
        guessDistribution: dist,
      });
    } catch (err) {
      throw new Error(`Stats.fromJSON failed: ${err.message}`);
    }
  }

  recordWin(attempts) {
    const n = Math.min(6, Math.max(1, attempts));
    const key = String(n);
    this.gamesPlayed += 1;
    this.gamesWon += 1;
    this.currentStreak += 1;
    if (this.currentStreak > this.maxStreak) this.maxStreak = this.currentStreak;
    this.guessDistribution[key] = (this.guessDistribution[key] || 0) + 1;
  }

  recordLoss() {
    this.gamesPlayed += 1;
    this.currentStreak = 0;
  }

  getWinPercentage() {
    if (this.gamesPlayed === 0) return 0;
    return Math.round((this.gamesWon / this.gamesPlayed) * 100);
  }

  getDistributionChart() {
    const entries = ['1', '2', '3', '4', '5', '6'].map((k) => [k, this.guessDistribution[k] || 0]);
    const maxBar = entries.reduce((m, [, v]) => Math.max(m, v), 0) || 1;
    const lines = entries.map(([guessCount, wins]) => {
      const width = Math.round((wins / maxBar) * 12);
      const bar = '█'.repeat(width) || (wins > 0 ? '█' : '·');
      return `  ${guessCount}  ${bar} ${wins}`;
    });
    return ['Guess distribution:', ...lines].join('\n');
  }

  summaryLines() {
    const pct = this.getWinPercentage();
    return [
      `Games played : ${this.gamesPlayed}`,
      `Win rate     : ${pct}%`,
      `Current streak: ${this.currentStreak}`,
      `Best streak  : ${this.maxStreak}`,
    ];
  }

  static readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static writeFilePromise(filePath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async save(filePath) {
    const target = filePath ?? path.join(__dirname, 'stats.json');
    const payload = JSON.stringify(this.toJSON(), null, 2);
    await Stats.writeFilePromise(target, `${payload}\n`);
  }

  static async load(filePath) {
    const target = filePath ?? path.join(__dirname, 'stats.json');
    try {
      const raw = await Stats.readFilePromise(target);
      return Stats.fromJSON(raw);
    } catch (err) {
      if (err.code === 'ENOENT') return new Stats();
      throw err;
    }
  }
}

module.exports = { Serializable, Stats };
