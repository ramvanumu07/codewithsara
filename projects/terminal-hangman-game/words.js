// ── Topics: Arrays, Objects, Functions, Arrow Functions, Math Utilities,
//    Spread/Rest, Filter, Map, Reduce, String Manipulations, Modules ──

const CATEGORIES = {
  animals: [
    "elephant", "giraffe", "penguin", "dolphin", "cheetah",
    "gorilla", "hamster", "leopard", "octopus", "panther",
    "pelican", "buffalo", "flamingo", "lobster", "sparrow",
    "vulture", "walrus", "parrot", "falcon", "jaguar",
    "rabbit", "turtle", "salmon", "condor", "coyote",
  ],
  countries: [
    "argentina", "australia", "brazil", "canada", "colombia",
    "denmark", "egypt", "finland", "germany", "hungary",
    "iceland", "jamaica", "kenya", "lebanon", "mexico",
    "nepal", "portugal", "romania", "singapore", "thailand",
    "ukraine", "vietnam", "croatia", "morocco", "ireland",
  ],
  foods: [
    "avocado", "burrito", "cheddar", "dumpling", "espresso",
    "focaccia", "granola", "hazelnut", "jalapeno", "lasagna",
    "meatball", "noodles", "pancake", "popcorn", "pretzel",
    "ravioli", "sausage", "truffle", "vanilla", "waffle",
    "brownie", "biscuit", "custard", "yoghurt", "cashew",
  ],
  science: [
    "asteroid", "bacteria", "catalyst", "electron", "friction",
    "gravity", "habitat", "isotope", "kingdom", "neutron",
    "nucleus", "organic", "photon", "quantum", "reactor",
    "solvent", "theorem", "uranium", "voltage", "crystal",
    "density", "entropy", "formula", "microbe", "protein",
  ],
  sports: [
    "baseball", "basketball", "bowling", "cricket", "cycling",
    "fencing", "football", "gymnast", "hockey", "javelin",
    "karate", "lacrosse", "marathon", "netball", "rowing",
    "sailing", "skiing", "soccer", "surfing", "tennis",
    "archery", "boxing", "diving", "hurdles", "squash",
  ],
  technology: [
    "algorithm", "bluetooth", "compiler", "database", "ethernet",
    "firewall", "graphics", "hardware", "internet", "keyboard",
    "malware", "network", "password", "printer", "program",
    "quantum", "robotics", "software", "terminal", "wireless",
    "browser", "encrypt", "hosting", "monitor", "silicon",
  ],
};

const CATEGORY_NAMES = Object.keys(CATEGORIES);

const DIFFICULTY_MAP = {
  easy: { minLen: 0, maxLen: 6 },
  medium: { minLen: 7, maxLen: 7 },
  hard: { minLen: 8, maxLen: Infinity },
};

const getWordsByCategory = (category) => {
  const words = CATEGORIES[category];
  if (!words) throw new Error(`Unknown category: ${category}`);
  return [...words];
};

const getWordsByDifficulty = (difficulty) => {
  const { minLen, maxLen } = DIFFICULTY_MAP[difficulty] ?? DIFFICULTY_MAP.medium;
  return Object.values(CATEGORIES)
    .flat()
    .filter((w) => w.length >= minLen && w.length <= maxLen);
};

const getRandomWord = ({ category, difficulty } = {}) => {
  let pool;

  if (category && category !== "random") {
    pool = getWordsByCategory(category);
    if (difficulty) {
      const { minLen, maxLen } = DIFFICULTY_MAP[difficulty] ?? DIFFICULTY_MAP.medium;
      pool = pool.filter((w) => w.length >= minLen && w.length <= maxLen);
    }
  } else if (difficulty) {
    pool = getWordsByDifficulty(difficulty);
  } else {
    pool = Object.values(CATEGORIES).flat();
  }

  if (pool.length === 0) {
    pool = Object.values(CATEGORIES).flat();
  }

  const index = Math.floor(Math.random() * pool.length);
  return {
    word: pool[index].toUpperCase(),
    category: category && category !== "random"
      ? category
      : CATEGORY_NAMES.find((cat) => CATEGORIES[cat].includes(pool[index])) ?? "unknown",
  };
};

const getCategoryForWord = (word) => {
  const lower = word.toLowerCase();
  return CATEGORY_NAMES.find((cat) => CATEGORIES[cat].includes(lower)) ?? "unknown";
};

const getTotalWordCount = () =>
  Object.values(CATEGORIES).reduce((sum, arr) => sum + arr.length, 0);

module.exports = {
  CATEGORIES,
  CATEGORY_NAMES,
  DIFFICULTY_MAP,
  getRandomWord,
  getWordsByCategory,
  getWordsByDifficulty,
  getCategoryForWord,
  getTotalWordCount,
};
