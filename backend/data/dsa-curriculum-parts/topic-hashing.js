/**
 * DSA topic: Hashing (notes-only).
 */
export default {
    id: 'dsa-hashing',
    title: 'Hashing',
    description: 'Hashing interview questions with explanations and reference solutions.',
    intro: 'Hash-map and hash-set based problems.',
    questions: [
        {
            title: 'Print All Pairs with Given Sum',
            problem: 'Given an array and a target sum, print every pair of elements that adds up to the target.',
            examples: `Input:  arr[] = [1, 5, 7, -1, 5], target = 6
Output: (1, 5), (7, -1), (1, 5)
Explanation: Each unordered pair summing to 6 is reported, including the repeated 5.

Input:  arr[] = [2, 4, 3, 5], target = 7
Output: (4, 3), (2, 5)
Explanation: Two pairs reach the target sum.`,
            approach: 'Iterate once with a hash map counting values seen so far. For each value x, the complement (target - x) tells how many earlier elements pair with it; output that many pairs, then record x.',
            solution: `function printPairs(arr, target) {
  const seen = new Map();
  const pairs = [];
  for (const x of arr) {
    const complement = target - x;
    if (seen.has(complement)) {
      for (let c = 0; c < seen.get(complement); c++) pairs.push([complement, x]);
    }
    seen.set(x, (seen.get(x) || 0) + 1);
  }
  return pairs;
}

// Driver Code
console.log(printPairs([1, 5, 7, -1, 5], 6));
console.log(printPairs([2, 4, 3, 5], 7));`,
            output: `[ [ 1, 5 ], [ 7, -1 ], [ 1, 5 ] ]
[ [ 4, 3 ], [ 2, 5 ] ]`,
            complexity: 'Time O(n) on average, Space O(n).'
        },
        {
            title: 'Longest Subsequence with Adjacent Difference of 0 or 1',
            problem: 'Given an array, find the length of the longest subsequence such that two chosen values that are adjacent in the subsequence differ by at most 1. Order does not matter, so this reduces to counting values.',
            examples: `Input:  arr[] = [1, 2, 3, 4, 5]
Output: 5
Explanation: Consecutive integers differ by 1, so the whole array qualifies.

Input:  arr[] = [10, 9, 1, 2, 8, 3]
Output: 3
Explanation: {1,2,3} (or {8,9,10}) forms the longest chain of values within 1.`,
            approach: 'Count occurrences of every value in a map. For each distinct value v, the best chain ending around it combines count[v] with count[v+1]. Take the maximum such combined count across all values.',
            solution: `function longestAdjDiffSubseq(arr) {
  const freq = new Map();
  for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);
  let best = 0;
  for (const [v, c] of freq) {
    const withNext = c + (freq.get(v + 1) || 0);
    if (withNext > best) best = withNext;
  }
  return best;
}

// Driver Code
console.log(longestAdjDiffSubseq([1, 2, 3, 4, 5]));      // 5
console.log(longestAdjDiffSubseq([10, 9, 1, 2, 8, 3]));  // 3`,
            output: `5
3`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Longest Consecutive Sequence',
            problem: 'Given an unsorted array of integers, return the length of the longest run of consecutive integers (values that increase by exactly 1), in O(n) time.',
            examples: `Input:  arr[] = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The run 1,2,3,4 has length 4.

Input:  arr[] = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
Explanation: The values 0 through 8 form a consecutive run.`,
            approach: 'Put all values into a hash set. A value starts a new sequence only if value-1 is absent. From each such start, walk upward while the next value exists, measuring the run length and keeping the maximum.',
            solution: `function longestConsecutive(arr) {
  const set = new Set(arr);
  let best = 0;
  for (const x of set) {
    if (!set.has(x - 1)) {
      let length = 1;
      let current = x;
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      best = Math.max(best, length);
    }
  }
  return best;
}

// Driver Code
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));            // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));   // 9`,
            output: `4
9`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Count Subarrays with Given XOR',
            problem: 'Given an array and a target value k, count the number of contiguous subarrays whose elements XOR to exactly k.',
            examples: `Input:  arr[] = [4, 2, 2, 6, 4], k = 6
Output: 4
Explanation: Four subarrays have XOR equal to 6.

Input:  arr[] = [5, 6, 7, 8, 9], k = 5
Output: 2
Explanation: [5] and [5,6,7,8,9] both XOR to 5.`,
            approach: 'Maintain a running prefix XOR. A subarray ending at the current index has XOR k exactly when some earlier prefix equals (prefix XOR k). Count occurrences of each prefix in a map and add the matching count at each step.',
            solution: `function countSubarraysXor(arr, k) {
  const freq = new Map();
  freq.set(0, 1);
  let prefix = 0;
  let count = 0;
  for (const x of arr) {
    prefix ^= x;
    const needed = prefix ^ k;
    if (freq.has(needed)) count += freq.get(needed);
    freq.set(prefix, (freq.get(prefix) || 0) + 1);
  }
  return count;
}

// Driver Code
console.log(countSubarraysXor([4, 2, 2, 6, 4], 6)); // 4
console.log(countSubarraysXor([5, 6, 7, 8, 9], 5)); // 2`,
            output: `4
2`,
            complexity: 'Time O(n), Space O(n).'
        }
    ]
}
