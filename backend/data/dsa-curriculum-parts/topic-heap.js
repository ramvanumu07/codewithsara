/**
 * DSA topic: Heap (notes-only).
 */
export default {
    id: 'dsa-heap',
    title: 'Heap',
    description: 'Heap interview questions with explanations and reference solutions.',
    intro: 'Priority-queue and streaming median problems.',
    questions: [
        {
            title: 'Top K Frequent Elements',
            problem: 'Given an array and an integer k, return the k elements that appear most frequently. Any order among the answers is acceptable.',
            examples: `Input:  arr[] = [1, 1, 1, 2, 2, 3], k = 2
Output: [1, 2]
Explanation: 1 appears three times and 2 appears twice, the two most frequent.

Input:  arr[] = [4, 4, 4, 6, 6, 7], k = 1
Output: [4]
Explanation: 4 is the single most frequent value.`,
            approach: 'Count each value with a hash map, then bucket the values by their frequency (bucket index = frequency). Walk the buckets from highest frequency downward, collecting values until k are gathered. This runs in linear time.',
            solution: `function topKFrequent(arr, k) {
  const freq = new Map();
  for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);

  const buckets = Array.from({ length: arr.length + 1 }, () => []);
  for (const [val, count] of freq) buckets[count].push(val);

  const res = [];
  for (let c = buckets.length - 1; c >= 0 && res.length < k; c--) {
    for (const val of buckets[c]) {
      res.push(val);
      if (res.length === k) break;
    }
  }
  return res;
}

// Driver Code
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([4, 4, 4, 6, 6, 7], 1)); // [4]`,
            output: `[ 1, 2 ]
[ 4 ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Find Median from Data Stream',
            problem: 'Design a structure that ingests integers one at a time and can report the median of all values seen so far at any moment.',
            examples: `Input:  add 1, add 2, median, add 3, median
Output: 1.5, then 2
Explanation: After {1,2} the median is 1.5; after {1,2,3} it is 2.

Input:  add 5, median
Output: 5
Explanation: With a single value the median is that value.`,
            approach: 'Maintain two heaps: a max-heap of the smaller half and a min-heap of the larger half, kept balanced in size. The median is the top of the larger heap (odd count) or the average of both tops (even count). Here the small halves are simulated with sorted insertion for clarity.',
            solution: `class MedianFinder {
  constructor() { this.nums = []; }
  addNum(num) {
    // insert keeping the array sorted (binary search position)
    let lo = 0, hi = this.nums.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.nums[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    this.nums.splice(lo, 0, num);
  }
  findMedian() {
    const n = this.nums.length;
    const mid = n >> 1;
    return n % 2 ? this.nums[mid] : (this.nums[mid - 1] + this.nums[mid]) / 2;
  }
}

// Driver Code
const mf = new MedianFinder();
mf.addNum(1); mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2`,
            output: `1.5
2`,
            complexity: 'Time O(n) per insert here (O(log n) with two heaps), O(1) query.'
        },
        {
            title: 'Largest Triplet Product in a Stream',
            problem: 'Given a stream of integers, after each new value print the product of the three largest values seen so far, or -1 if fewer than three values have arrived.',
            examples: `Input:  stream = [1, 2, 3, 4, 5]
Output: [-1, -1, 6, 24, 60]
Explanation: After three values 1*2*3 = 6; later 3*4*5 = 60.

Input:  stream = [10, 20, 30]
Output: [-1, -1, 6000]
Explanation: Only after the third value is a triplet product available.`,
            approach: 'Maintain the three largest values seen so far (a tiny fixed-size structure). After each value, update those three; once at least three exist, their product is the answer for that step.',
            solution: `function largestTripletProducts(stream) {
  const res = [];
  let top = []; // keeps the 3 largest, ascending
  for (const x of stream) {
    top.push(x);
    top.sort((a, b) => a - b);
    if (top.length > 3) top.shift();
    if (top.length < 3) res.push(-1);
    else res.push(top[0] * top[1] * top[2]);
  }
  return res;
}

// Driver Code
console.log(largestTripletProducts([1, 2, 3, 4, 5])); // [-1, -1, 6, 24, 60]
console.log(largestTripletProducts([10, 20, 30]));    // [-1, -1, 6000]`,
            output: `[ -1, -1, 6, 24, 60 ]
[ -1, -1, 6000 ]`,
            complexity: 'Time O(n) (constant work per element), Space O(1).'
        },
        {
            title: 'Connect n Ropes',
            problem: 'Given n ropes of different lengths, repeatedly connect two ropes at a cost equal to their combined length until one rope remains. Find the minimum total cost.',
            examples: `Input:  ropes[] = [4, 3, 2, 6]
Output: 29
Explanation: Combine 2+3=5, 5+4=9, 9+6=15; total 5+9+15 = 29.

Input:  ropes[] = [1, 2, 3]
Output: 9
Explanation: Combine 1+2=3 (cost 3), then 3+3=6 (cost 6); total 9.`,
            approach: 'Greedily always join the two shortest ropes, because their length is added to the running cost in every later join, so they should be combined earliest. A min-heap supplies the two smallest each step; here a re-sorted array simulates the heap.',
            solution: `function connectRopes(ropes) {
  const heap = [...ropes].sort((a, b) => a - b);
  let cost = 0;
  while (heap.length > 1) {
    const first = heap.shift();
    const second = heap.shift();
    const sum = first + second;
    cost += sum;
    // insert sum back keeping order
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
console.log(connectRopes([4, 3, 2, 6])); // 29
console.log(connectRopes([1, 2, 3]));    // 9`,
            output: `29
9`,
            complexity: 'Time O(n^2) here (O(n log n) with a real heap), Space O(n).'
        }
    ]
}
