/**
 * DSA topic: Dynamic Programming and Greedy (notes-only).
 */
export default {
    id: 'dsa-dp-greedy',
    title: 'Dynamic Programming and Greedy',
    description: 'Dynamic programming and greedy interview questions with explanations and reference solutions.',
    intro: 'Classic DP recurrences and greedy strategies.',
    questions: [
        {
            title: "Count Ways to Reach the n'th Stair",
            problem: 'You are climbing a staircase of n steps and can take either 1 or 2 steps at a time. Count the distinct ways to reach the top.',
            examples: `Input:  n = 3
Output: 3
Explanation: The ways are (1,1,1), (1,2) and (2,1).

Input:  n = 4
Output: 5
Explanation: Five distinct step sequences reach the 4th stair.`,
            approach: 'The number of ways to reach stair n equals the ways to reach n-1 plus the ways to reach n-2, since the last move is either a single or a double step. This is the Fibonacci recurrence, computable bottom-up with two running values.',
            solution: `function countStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}

// Driver Code
console.log(countStairs(3)); // 3
console.log(countStairs(4)); // 5`,
            output: `3
5`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Coin Change',
            problem: 'Given coin denominations and a target amount, find the minimum number of coins needed to make the amount. Return -1 if it cannot be made. Coins may be used any number of times.',
            examples: `Input:  coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1 uses three coins.

Input:  coins = [2], amount = 3
Output: -1
Explanation: An odd amount cannot be formed with only 2s.`,
            approach: 'Build a table where dp[a] is the fewest coins to make amount a. Start with dp[0] = 0 and infinity elsewhere; for every amount, try each coin and take one plus the best result for the remainder.',
            solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Driver Code
console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3));        // -1`,
            output: `3
-1`,
            complexity: 'Time O(amount * coins), Space O(amount).'
        },
        {
            title: '0/1 Knapsack Problem',
            problem: 'Given weights and values of n items and a knapsack capacity W, maximize the total value of items placed in the knapsack. Each item may be taken at most once.',
            examples: `Input:  weights = [1, 3, 4, 5], values = [1, 4, 5, 7], W = 7
Output: 9
Explanation: Items with weight 3 and 4 give value 4 + 5 = 9.

Input:  weights = [2, 3], values = [4, 5], W = 1
Output: 0
Explanation: No item fits in capacity 1.`,
            approach: 'Use a one-dimensional DP over capacity. For each item, iterate capacities from high to low so each item is counted once, choosing the better of skipping the item or taking it (its value plus the best for the remaining capacity).',
            solution: `function knapsack(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = W; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
    }
  }
  return dp[W];
}

// Driver Code
console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9
console.log(knapsack([2, 3], [4, 5], 1));             // 0`,
            output: `9
0`,
            complexity: 'Time O(n * W), Space O(W).'
        },
        {
            title: 'Longest Increasing Subsequence',
            problem: 'Given an array, find the length of the longest strictly increasing subsequence (elements need not be contiguous).',
            examples: `Input:  arr[] = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
Explanation: A longest increasing subsequence is [2, 3, 7, 101].

Input:  arr[] = [0, 1, 0, 3, 2, 3]
Output: 4
Explanation: [0, 1, 2, 3] has length 4.`,
            approach: 'Maintain a tails array where tails[i] is the smallest possible tail of an increasing subsequence of length i+1. For each value, binary search its insertion point: extend the array if it is the largest, otherwise replace the first tail that is not smaller. The array length is the answer.',
            solution: `function lengthOfLIS(arr) {
  const tails = [];
  for (const x of arr) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}

// Driver Code
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));           // 4`,
            output: `4
4`,
            complexity: 'Time O(n log n), Space O(n).'
        },
        {
            title: 'Longest Common Subsequence',
            problem: 'Given two strings, find the length of their longest common subsequence: the longest sequence of characters appearing in both in the same relative order, not necessarily contiguous.',
            examples: `Input:  a = "abcde", b = "ace"
Output: 3
Explanation: The common subsequence "ace" has length 3.

Input:  a = "abc", b = "def"
Output: 0
Explanation: There are no shared characters.`,
            approach: 'Fill a table dp[i][j] = LCS length of the first i characters of a and first j of b. If the current characters match, extend the diagonal value by one, otherwise take the better of dropping one character from either string.',
            solution: `function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

// Driver Code
console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0`,
            output: `3
0`,
            complexity: 'Time O(m * n), Space O(m * n).'
        },
        {
            title: 'Word Break Problem',
            problem: 'Given a string s and a dictionary of words, determine whether s can be segmented into a sequence of one or more dictionary words.',
            examples: `Input:  s = "leetcode", dict = ["leet", "code"]
Output: true
Explanation: "leetcode" splits into "leet" + "code".

Input:  s = "applepie", dict = ["apple", "pen"]
Output: false
Explanation: No segmentation of "applepie" uses only dictionary words.`,
            approach: 'Let dp[i] mean the first i characters can be segmented. dp[0] is true; for each position i, it is reachable if some earlier position j is reachable and the substring from j to i is in the dictionary.',
            solution: `function wordBreak(s, dict) {
  const words = new Set(dict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

// Driver Code
console.log(wordBreak("leetcode", ["leet", "code"])); // true
console.log(wordBreak("applepie", ["apple", "pen"])); // false`,
            output: `true
false`,
            complexity: 'Time O(n^2) substring checks, Space O(n).'
        },
        {
            title: 'Dice Throw',
            problem: 'Given d dice each with f faces (values 1..f), count the number of ways to roll them so the face values sum to exactly a target.',
            examples: `Input:  d = 2, f = 6, target = 7
Output: 6
Explanation: The pairs summing to 7 are (1,6),(2,5),(3,4),(4,3),(5,2),(6,1).

Input:  d = 1, f = 6, target = 3
Output: 1
Explanation: A single die shows 3 in exactly one way.`,
            approach: 'Let dp[i][t] be the number of ways i dice sum to t. Each new die can show any face 1..f, so dp[i][t] is the sum of dp[i-1][t-face] over all valid faces. Build up from one die to d dice.',
            solution: `function diceThrow(d, f, target) {
  let dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= d; i++) {
    const next = new Array(target + 1).fill(0);
    for (let t = 1; t <= target; t++) {
      for (let face = 1; face <= f && face <= t; face++) {
        next[t] += dp[t - face];
      }
    }
    dp = next;
  }
  return dp[target];
}

// Driver Code
console.log(diceThrow(2, 6, 7)); // 6
console.log(diceThrow(1, 6, 3)); // 1`,
            output: `6
1`,
            complexity: 'Time O(d * target * f), Space O(target).'
        },
        {
            title: 'Egg Dropping Puzzle',
            problem: 'Given e eggs and a building of n floors, find the minimum number of trials needed in the worst case to determine the highest floor from which an egg can be dropped without breaking.',
            examples: `Input:  e = 2, n = 10
Output: 4
Explanation: With 2 eggs and 10 floors, 4 worst-case trials suffice.

Input:  e = 1, n = 5
Output: 5
Explanation: With one egg you must test each floor from the bottom up.`,
            approach: 'Let dp[t][e] be the maximum number of floors solvable with t trials and e eggs. Each trial either breaks the egg (covering floors below with one fewer egg) or not (covering floors above), so dp[t][e] = dp[t-1][e-1] + dp[t-1][e] + 1. Increase trials until the floor count is covered.',
            solution: `function eggDrop(eggs, floors) {
  const dp = Array.from({ length: floors + 1 }, () => new Array(eggs + 1).fill(0));
  let trials = 0;
  while (dp[trials][eggs] < floors) {
    trials++;
    for (let e = 1; e <= eggs; e++) {
      dp[trials][e] = dp[trials - 1][e - 1] + dp[trials - 1][e] + 1;
    }
  }
  return trials;
}

// Driver Code
console.log(eggDrop(2, 10)); // 4
console.log(eggDrop(1, 5));  // 5`,
            output: `4
5`,
            complexity: 'Time O(eggs * trials), Space O(eggs * floors).'
        },
        {
            title: 'Matrix Chain Multiplication',
            problem: 'Given the dimensions of a chain of matrices, find the minimum number of scalar multiplications needed to multiply the whole chain, choosing the best parenthesization.',
            examples: `Input:  dims = [40, 20, 30, 10, 30]
Output: 26000
Explanation: The optimal grouping costs 26000 multiplications.

Input:  dims = [10, 20, 30]
Output: 6000
Explanation: One multiplication of a 10x20 and 20x30 matrix costs 10*20*30 = 6000.`,
            approach: 'Let dp[i][j] be the minimum cost to multiply matrices i..j. Try every split point k between i and j: the cost is dp[i][k] + dp[k+1][j] plus the cost of multiplying the two resulting matrices. Solve over increasing chain lengths.',
            solution: `function matrixChainOrder(dims) {
  const n = dims.length - 1;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
}

// Driver Code
console.log(matrixChainOrder([40, 20, 30, 10, 30])); // 26000
console.log(matrixChainOrder([10, 20, 30]));         // 6000`,
            output: `26000
6000`,
            complexity: 'Time O(n^3), Space O(n^2).'
        },
        {
            title: 'Combination Sum',
            problem: 'Given an array of distinct positive integers and a target, return all unique combinations whose elements sum to the target. Each number may be used unlimited times.',
            examples: `Input:  candidates = [2, 3, 6, 7], target = 7
Output: [[2, 2, 3], [7]]
Explanation: Both combinations sum to 7.

Input:  candidates = [2, 4], target = 6
Output: [[2, 2, 2], [2, 4]]
Explanation: Two combinations reach 6.`,
            approach: 'Backtrack over the candidates. At each step either reuse the current candidate (staying at the same index) or advance to the next candidate, pruning branches whose running sum exceeds the target.',
            solution: `function combinationSum(candidates, target) {
  const res = [];
  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] <= remaining) {
        path.push(candidates[i]);
        backtrack(i, remaining - candidates[i], path);
        path.pop();
      }
    }
  }
  backtrack(0, target, []);
  return res;
}

// Driver Code
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2, 2, 3], [7]]
console.log(combinationSum([2, 4], 6));       // [[2, 2, 2], [2, 4]]`,
            output: `[ [ 2, 2, 3 ], [ 7 ] ]
[ [ 2, 2, 2 ], [ 2, 4 ] ]`,
            complexity: 'Time exponential in the worst case, Space O(target) recursion depth.'
        },
        {
            title: 'Subset Sum Problem',
            problem: 'Given an array of non-negative integers and a target sum, determine whether any subset of the array adds up exactly to the target.',
            examples: `Input:  arr[] = [3, 34, 4, 12, 5, 2], target = 9
Output: true
Explanation: The subset {4, 5} sums to 9.

Input:  arr[] = [1, 2, 5], target = 4
Output: false
Explanation: No subset of these values sums to 4.`,
            approach: 'Use a boolean DP over achievable sums. dp[s] is true if some subset sums to s. Process each number, updating sums from high to low so each element is used at most once per subset.',
            solution: `function subsetSum(arr, target) {
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of arr) {
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
  }
  return dp[target];
}

// Driver Code
console.log(subsetSum([3, 34, 4, 12, 5, 2], 9)); // true
console.log(subsetSum([1, 2, 5], 4));            // false`,
            output: `true
false`,
            complexity: 'Time O(n * target), Space O(target).'
        },
        {
            title: 'Maximum Possible Stolen Value',
            problem: 'Given houses in a row each holding some money, a thief cannot rob two adjacent houses. Find the maximum money that can be stolen.',
            examples: `Input:  houses = [6, 7, 1, 3, 8, 2, 4]
Output: 19
Explanation: Robbing houses with 6, 1, 8 and 4 yields 19.

Input:  houses = [5, 3, 4, 11, 2]
Output: 16
Explanation: Robbing houses with 5, 11 (5 + 11) yields 16.`,
            approach: 'For each house decide to skip it (keep the previous best) or rob it (its value plus the best up to two houses back). Track these two running values to avoid an explicit array.',
            solution: `function maxStolen(houses) {
  let incl = 0; // best including previous house
  let excl = 0; // best excluding previous house
  for (const money of houses) {
    const newIncl = excl + money;
    excl = Math.max(incl, excl);
    incl = newIncl;
  }
  return Math.max(incl, excl);
}

// Driver Code
console.log(maxStolen([6, 7, 1, 3, 8, 2, 4])); // 19
console.log(maxStolen([5, 3, 4, 11, 2]));      // 16`,
            output: `19
16`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Count Possible Decodings of a Given Digit Sequence',
            problem: 'A message of digits is encoded with A=1, B=2, ..., Z=26. Given the digit string, count how many ways it can be decoded into letters.',
            examples: `Input:  digits = "121"
Output: 3
Explanation: It decodes as "ABA", "AU" and "LA".

Input:  digits = "10"
Output: 1
Explanation: Only "J" is valid; a leading 0 cannot stand alone.`,
            approach: 'Let dp[i] be the number of decodings of the first i digits. A single digit (1..9) extends dp[i-1]; a valid two-digit pair (10..26) extends dp[i-2]. Add the contributions, treating leading zeros as invalid single digits.',
            solution: `function countDecodings(digits) {
  const n = digits.length;
  if (n === 0) return 0;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = digits[0] === '0' ? 0 : 1;
  for (let i = 2; i <= n; i++) {
    const one = Number(digits[i - 1]);
    const two = Number(digits.slice(i - 2, i));
    if (one >= 1) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
}

// Driver Code
console.log(countDecodings("121")); // 3
console.log(countDecodings("10"));  // 1`,
            output: `3
1`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Unique Paths in a Grid with Obstacles',
            problem: 'Given a grid where 1 marks an obstacle and 0 is free, count the number of paths from the top-left to the bottom-right cell moving only right or down, avoiding obstacles.',
            examples: `Input:  grid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
Output: 2
Explanation: Two obstacle-free paths reach the bottom-right.

Input:  grid = [[0, 1], [0, 0]]
Output: 1
Explanation: Only the down-then-right path is open.`,
            approach: 'Use a one-row DP where dp[c] holds the number of ways to reach the current cell. Obstacles set the count to 0; otherwise the count is the sum of the value from the left (same row) and from above (previous row value already stored in dp[c]).',
            solution: `function uniquePathsWithObstacles(grid) {
  const cols = grid[0].length;
  const dp = new Array(cols).fill(0);
  dp[0] = grid[0][0] === 1 ? 0 : 1;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) dp[c] = 0;
      else if (c > 0) dp[c] += dp[c - 1];
    }
  }
  return dp[cols - 1];
}

// Driver Code
console.log(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])); // 2
console.log(uniquePathsWithObstacles([[0, 1], [0, 0]]));                  // 1`,
            output: `2
1`,
            complexity: 'Time O(m * n), Space O(n).'
        },
        {
            title: 'Jump Game',
            problem: 'Given an array where each value is the maximum jump length from that position, determine whether you can reach the last index starting from the first.',
            examples: `Input:  arr[] = [2, 3, 1, 1, 4]
Output: true
Explanation: Jump 1 step to index 1, then 3 steps to the last index.

Input:  arr[] = [3, 2, 1, 0, 4]
Output: false
Explanation: Index 3 holds 0, trapping any path before the end.`,
            approach: 'Track the farthest index reachable so far while scanning left to right. If the current index ever exceeds that reach, the end is unreachable; otherwise extend the reach. Success if the reach covers the last index.',
            solution: `function canJump(arr) {
  let reach = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + arr[i]);
  }
  return true;
}

// Driver Code
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Cutting a Rod',
            problem: 'Given a rod of length n and a price for each length 1..n, find the maximum revenue obtainable by cutting the rod into pieces and selling them.',
            examples: `Input:  price = [1, 5, 8, 9, 10, 17, 17, 20], n = 8
Output: 22
Explanation: Cutting into lengths 2 and 6 yields 5 + 17 = 22.

Input:  price = [3, 5, 8, 9], n = 4
Output: 12
Explanation: Four pieces of length 1 give 4 * 3 = 12.`,
            approach: 'Let dp[len] be the best revenue for a rod of length len. For each length, try every possible first cut i and combine its price with the best revenue for the remaining length, keeping the maximum.',
            solution: `function rodCutting(price, n) {
  const dp = new Array(n + 1).fill(0);
  for (let len = 1; len <= n; len++) {
    for (let cut = 1; cut <= len; cut++) {
      dp[len] = Math.max(dp[len], price[cut - 1] + dp[len - cut]);
    }
  }
  return dp[n];
}

// Driver Code
console.log(rodCutting([1, 5, 8, 9, 10, 17, 17, 20], 8)); // 22
console.log(rodCutting([3, 5, 8, 9], 4));                 // 12`,
            output: `22
12`,
            complexity: 'Time O(n^2), Space O(n).'
        },
        {
            title: 'Maximum Product Cutting',
            problem: 'Given a rope of length n, cut it into at least two integer-length pieces so that the product of the piece lengths is maximized. Return that maximum product.',
            examples: `Input:  n = 10
Output: 36
Explanation: Cutting into 3 + 3 + 4 gives a product of 36.

Input:  n = 5
Output: 6
Explanation: Cutting into 2 + 3 gives a product of 6.`,
            approach: 'Let dp[len] be the best product from cutting a rope of length len. For each length try a first cut i, comparing the piece i alone (i times the leftover) with i times dp[leftover] which cuts the leftover further; take the maximum.',
            solution: `function maxProductCutting(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let len = 2; len <= n; len++) {
    for (let cut = 1; cut < len; cut++) {
      dp[len] = Math.max(dp[len], cut * (len - cut), cut * dp[len - cut]);
    }
  }
  return dp[n];
}

// Driver Code
console.log(maxProductCutting(10)); // 36
console.log(maxProductCutting(5));  // 6`,
            output: `36
6`,
            complexity: 'Time O(n^2), Space O(n).'
        },
        {
            title: 'Count Number of Ways to Cover a Distance',
            problem: 'Given a distance, count the number of ways to cover it taking steps of length 1, 2 or 3 at a time.',
            examples: `Input:  distance = 3
Output: 4
Explanation: The ways are (1,1,1), (1,2), (2,1) and (3).

Input:  distance = 4
Output: 7
Explanation: Seven distinct step sequences cover distance 4.`,
            approach: 'The ways to reach a distance equal the sum of the ways to reach the previous three distances, since the final step is of length 1, 2 or 3. Build the values bottom-up.',
            solution: `function countWays(distance) {
  if (distance < 0) return 0;
  const dp = [1, 1, 2];
  if (distance < 3) return dp[distance];
  for (let i = 3; i <= distance; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[distance];
}

// Driver Code
console.log(countWays(3)); // 4
console.log(countWays(4)); // 7`,
            output: `4
7`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Connect n Ropes with Minimum Cost',
            problem: 'Given n ropes of given lengths, repeatedly join two ropes at a cost equal to their combined length until one rope remains. Find the minimum total cost.',
            examples: `Input:  ropes = [4, 3, 2, 6]
Output: 29
Explanation: Joining the smallest ropes first yields total cost 29.

Input:  ropes = [1, 2, 3, 4, 5]
Output: 33
Explanation: Greedy joining of the two smallest each time totals 33.`,
            approach: 'Greedily join the two shortest ropes each time, since their length contributes to every subsequent join and should accumulate as little as possible. A min-heap supplies the two smallest; here a kept-sorted array simulates it.',
            solution: `function minConnectCost(ropes) {
  const heap = [...ropes].sort((a, b) => a - b);
  let cost = 0;
  while (heap.length > 1) {
    const sum = heap.shift() + heap.shift();
    cost += sum;
    let lo = 0, hi = heap.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (heap[mid] < sum) lo = mid + 1;
      else hi = mid;
    }
    heap.splice(lo, 0, sum);
  }
  return cost;
}

// Driver Code
console.log(minConnectCost([4, 3, 2, 6]));    // 29
console.log(minConnectCost([1, 2, 3, 4, 5])); // 33`,
            output: `29
33`,
            complexity: 'Time O(n^2) here (O(n log n) with a real heap), Space O(n).'
        },
        {
            title: 'Largest Number in One Swap',
            problem: 'Given a number as a string of digits, make at most one swap of two digits to produce the largest possible number. Return the result as a string.',
            examples: `Input:  num = "2736"
Output: "7236"
Explanation: Swapping the 2 and the 7 gives the largest value.

Input:  num = "9973"
Output: "9973"
Explanation: The digits are already in the largest order, so no swap helps.`,
            approach: 'Record the index of the last occurrence of each digit. Scan left to right; for each position look for a larger digit (9 down to current+1) that appears later and swap with its last occurrence. The first such swap yields the maximum.',
            solution: `function largestInOneSwap(num) {
  const digits = num.split('');
  const last = new Array(10).fill(-1);
  for (let i = 0; i < digits.length; i++) last[Number(digits[i])] = i;

  for (let i = 0; i < digits.length; i++) {
    const d = Number(digits[i]);
    for (let bigger = 9; bigger > d; bigger--) {
      if (last[bigger] > i) {
        [digits[i], digits[last[bigger]]] = [digits[last[bigger]], digits[i]];
        return digits.join('');
      }
    }
  }
  return digits.join('');
}

// Driver Code
console.log(largestInOneSwap("2736")); // "7236"
console.log(largestInOneSwap("9973")); // "9973"`,
            output: `7236
9973`,
            complexity: 'Time O(n) (10 is constant), Space O(1).'
        }
    ]
}
