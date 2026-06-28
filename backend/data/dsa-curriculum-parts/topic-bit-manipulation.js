/**
 * DSA topic: Bit Manipulation (notes-only).
 */
export default {
    id: 'dsa-bit-manipulation',
    title: 'Bit Manipulation',
    description: 'Bit manipulation interview questions with explanations and reference solutions.',
    intro: 'Bitwise tricks and subset/XOR problems.',
    questions: [
        {
            title: 'Counting Bits',
            problem: 'Given an integer n, return an array of length n+1 where the i-th entry is the number of set bits (1s) in the binary representation of i.',
            examples: `Input:  n = 5
Output: [0, 1, 1, 2, 1, 2]
Explanation: For example 3 is binary 11 (two 1s) and 5 is binary 101 (two 1s).

Input:  n = 2
Output: [0, 1, 1]
Explanation: 0 has zero 1s, 1 and 2 each have one.`,
            approach: 'Use the relation count[i] = count[i >> 1] + (i & 1): the bits of i are the bits of i with its last bit dropped, plus that last bit. This fills the table in a single linear pass.',
            solution: `function countBits(n) {
  const res = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    res[i] = res[i >> 1] + (i & 1);
  }
  return res;
}

// Driver Code
console.log(countBits(5)); // [0, 1, 1, 2, 1, 2]
console.log(countBits(2)); // [0, 1, 1]`,
            output: `[ 0, 1, 1, 2, 1, 2 ]
[ 0, 1, 1 ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Missing Number (1 to n Range)',
            problem: 'Given an array containing n distinct numbers taken from the range 1 to n+1 with exactly one number missing, find the missing number.',
            examples: `Input:  arr[] = [1, 2, 4, 5], n = 4
Output: 3
Explanation: The numbers 1..5 are expected; 3 is absent.

Input:  arr[] = [2, 3, 4], n = 3
Output: 1
Explanation: From 1..4 the value 1 is missing.`,
            approach: 'XOR all numbers from 1 to n+1 together, then XOR in every array element. Pairs of equal values cancel out, leaving only the missing number. This avoids overflow and uses constant space.',
            solution: `function findMissing(arr) {
  const total = arr.length + 1;
  let x = 0;
  for (let i = 1; i <= total; i++) x ^= i;
  for (const num of arr) x ^= num;
  return x;
}

// Driver Code
console.log(findMissing([1, 2, 4, 5])); // 3
console.log(findMissing([2, 3, 4]));    // 1`,
            output: `3
1`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Find XOR of All Subsets of a Set',
            problem: 'Given a set of integers, compute the XOR of the XOR-values of every subset (including the empty subset). Return that overall result.',
            examples: `Input:  arr[] = [1, 5, 6]
Output: 0
Explanation: With more than one element every bit appears an even number of times, so the result is 0.

Input:  arr[] = [3]
Output: 3
Explanation: The subsets are {} and {3}; their XOR-values XOR to 3.`,
            approach: 'For a set with more than one element, each element appears in exactly half of all subsets, an even count, so every bit cancels and the answer is 0. For a single-element set the answer is that element itself.',
            solution: `function xorOfAllSubsets(arr) {
  if (arr.length === 1) return arr[0];
  return 0;
}

// Driver Code
console.log(xorOfAllSubsets([1, 5, 6])); // 0
console.log(xorOfAllSubsets([3]));       // 3`,
            output: `0
3`,
            complexity: 'Time O(1), Space O(1).'
        }
    ]
}
