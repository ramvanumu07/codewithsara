const BATCH_A = [
  'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
  'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alike', 'alive', 'allow', 'alone',
  'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple', 'apply', 'arena',
  'argue', 'arise', 'aside', 'asset', 'avoid', 'award', 'aware', 'badly', 'based', 'basic',
  'basis', 'beach', 'began', 'begin', 'being', 'below', 'bench', 'billy', 'black', 'blade',
  'blame', 'bland', 'blank', 'blast', 'blaze', 'bleed', 'blend', 'blind', 'block', 'blood',
  'bloom', 'blown', 'board', 'boost', 'bound', 'brain', 'brand', 'brave', 'bread', 'break',
  'breed', 'brick', 'brief', 'bring', 'broad', 'broke', 'brown', 'build', 'bunch', 'burst',
  'buyer', 'cabin', 'carry', 'catch', 'cause', 'chain', 'chair', 'charm', 'chart', 'chase',
  'cheap', 'check', 'cheek', 'chess', 'chest', 'chief', 'child', 'china', 'chunk', 'civic',
  'claim', 'class', 'clean', 'clear', 'climb', 'cling', 'clock', 'close', 'cloth', 'cloud',
  'coach', 'coast', 'coral', 'count', 'court', 'cover', 'crack', 'craft', 'crane', 'crash',
  'crazy', 'cream', 'crime', 'cross', 'crowd', 'crown', 'cruel', 'crush', 'curve', 'cycle',
  'daily', 'dance', 'debut', 'delay', 'depth', 'dirty', 'doubt', 'draft', 'drain', 'drama',
  'drank', 'drawn', 'dream', 'dress', 'dried', 'drink', 'drive', 'early', 'earth', 'eight',
  'elect', 'elite', 'empty', 'enemy', 'enjoy', 'enter', 'equal', 'error', 'event', 'every',
  'exact', 'exist', 'extra', 'faith', 'false', 'fault', 'fence', 'fever', 'fewer', 'fiber',
  'field', 'fifth', 'fifty', 'fight', 'final', 'first', 'fixed', 'flame', 'flash', 'fleet',
  'flesh', 'float', 'flood', 'floor', 'flour', 'fluid', 'focus', 'force', 'forge', 'forth',
  'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'froze', 'fruit', 'fully', 'ghost',
  'giant', 'glass', 'globe', 'grace', 'grade', 'grain', 'grand', 'grant', 'grass', 'grave',
  'great', 'green', 'grief', 'grill', 'group', 'grown', 'guard', 'guess', 'guest', 'guide',
  'habit', 'happy', 'harsh', 'heart', 'heavy', 'hello', 'horse', 'hotel', 'house', 'human',
  'humor', 'ideal', 'image', 'index', 'inner', 'input', 'issue', 'joint', 'judge', 'juice',
  'knife', 'knock', 'label', 'labor', 'large', 'laser', 'later', 'laugh', 'layer', 'learn',
  'lease', 'least', 'leave', 'legal', 'lemon', 'level', 'light', 'limit', 'local', 'logic',
  'loose', 'lover', 'lucky', 'lunch', 'lyric', 'magic', 'major', 'maker', 'march', 'match',
  'maybe', 'mayor', 'medal', 'media', 'metal', 'meter', 'might', 'minor', 'model', 'money',
  'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'movie', 'music', 'needs', 'never',
  'newly', 'night', 'noise', 'north', 'noted', 'nurse', 'occur', 'ocean', 'offer', 'often',
  'order', 'other', 'outer', 'owner', 'paint', 'panel', 'paper', 'party', 'peace', 'penny',
  'phase', 'phone', 'photo', 'piano', 'piece', 'pilot', 'pitch', 'place', 'plain', 'plane',
  'plant', 'plate', 'point', 'pound', 'power', 'press', 'price', 'pride', 'prime', 'print',
  'prior', 'prize', 'proof', 'proud', 'prove', 'pulse', 'queen', 'quick', 'quiet', 'quite',
  'radio', 'raise', 'range', 'rapid', 'ratio', 'reach', 'react', 'ready', 'refer', 'relax',
  'reply', 'reset', 'rhythm', 'rider', 'ridge', 'rifle', 'right', 'rigid', 'rival', 'river',
  'roast', 'robin', 'robot', 'rocky', 'rough', 'round', 'route', 'royal', 'rugged', 'ruler',
  'rural', 'scale', 'scare', 'scene', 'scope', 'score', 'scout', 'sense', 'serve', 'seven',
  'shade', 'shaft', 'shake', 'shame', 'shape', 'share', 'sharp', 'sheep', 'sheet', 'shelf',
  'shell', 'shift', 'shine', 'shirt', 'shock', 'shoes', 'shoot', 'short', 'shown', 'sight',
  'silent', 'silly', 'since', 'sixth', 'skill', 'skull', 'slate', 'sleep', 'slice', 'slide',
  'slope', 'small', 'smart', 'smile', 'smoke', 'snack', 'snake', 'solid', 'solve', 'sorry',
  'sound', 'south', 'space', 'spare', 'speak', 'speed', 'spell', 'spend', 'spice', 'spill',
  'spine', 'split', 'spoke', 'spoon', 'sport', 'staff', 'stage', 'stake', 'stall', 'stamp',
  'stand', 'start', 'state', 'steam', 'steel', 'stick', 'still', 'stock', 'stone', 'stood',
  'store', 'storm', 'story', 'strip', 'stuck', 'study', 'stuff', 'style', 'sugar', 'suite',
  'super', 'surge', 'swear', 'sweat', 'sweep', 'sweet', 'swift', 'swing', 'sword', 'table',
  'taken', 'taste', 'teach', 'teeth', 'tempo', 'terms', 'thank', 'theft', 'theme', 'thick',
  'thing', 'think', 'third', 'those', 'three', 'threw', 'throw', 'thumb', 'tiger', 'tight',
  'title', 'toast', 'today', 'token', 'tooth', 'torch', 'total', 'touch', 'tough', 'tower',
  'trace', 'track', 'trade', 'train', 'trash', 'treat', 'trend', 'trial', 'tribe', 'trick',
  'tried', 'truck', 'truly', 'trunk', 'trust', 'truth', 'twist', 'uncle', 'under', 'union',
  'unite', 'until', 'upper', 'upset', 'urban', 'usage', 'usual', 'valid', 'value', 'video',
  'visit', 'vital', 'vocal', 'voice', 'voter', 'wages', 'waist', 'watch', 'water', 'weary',
  'weave', 'weigh', 'weird', 'whale', 'wheat', 'wheel', 'where', 'which', 'whisk', 'white',
  'whole', 'whose', 'width', 'widow', 'wind', 'witch', 'woman', 'women', 'world', 'worry',
  'worse', 'worst', 'worth', 'wound', 'woven', 'write', 'wrong', 'wrote', 'yards', 'yeast',
  'young', 'youth', 'zebra', 'zones',
];

class WordBank {
  #words;

  constructor() {
    const merged = [...BATCH_A];
    const seen = new Set();
    this.#words = merged.filter((w) => {
      if (seen.has(w)) return false;
      seen.add(w);
      return w.length === 5 && /^[a-z]+$/.test(w);
    });
  }

  getRandomWord() {
    const idx = Math.floor(Math.random() * this.#words.length);
    return this.#words[idx];
  }

  isValidWord(word) {
    const w = word.toLowerCase();
    return this.#words.findIndex((x) => x === w) !== -1;
  }

  getHint(word, revealedPositions) {
    const normalized = word.toLowerCase().split('').join('');
    if (this.#words.find((w) => w === normalized) === undefined) return null;
    const letters = normalized.split('');
    const slots = [0, 1, 2, 3, 4].filter((i) => !revealedPositions.has(i));
    if (slots.length === 0) return null;
    const pick = slots[Math.floor(Math.random() * slots.length)];
    return { index: pick, letter: letters[pick] };
  }

  hasAmbiguousPrefix(prefix) {
    const p = prefix.toLowerCase();
    const hits = this.#words.filter((w) => w.startsWith(p));
    return hits.length > 1 && hits.some((w) => w !== hits[0]);
  }

  get size() {
    return this.#words.length;
  }
}

module.exports = { WordBank, BATCH_A };
