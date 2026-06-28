/**
 * DSA topic: Array (notes-only).
 * Fill each question's problem / examples / approach / solution / output / complexity.
 */
export default {
    id: 'dsa-array',
    title: 'Array',
    description: 'Top array interview questions with explanations and reference solutions.',
    intro: 'Classic array interview problems. Read the question, study the approach, then review the reference solution.',
    questions: [
        {
            title: 'Pair with the Given Sum',
            problem: 'Given an array arr[] of n integers and a target value, determine whether there exists a pair of elements whose sum equals the target.',
            examples: `Input:  arr[] = [0, -1, 2, -3, 1], target = -2
Output: true
Explanation: The pair (1, -3) sums to -2.

Input:  arr[] = [1, -2, 1, 0, 5], target = 0
Output: false
Explanation: No pair adds up to 0.`,
            approach: 'Scan the array once while keeping a Set of the values already seen. For each value x, the complement that would complete a pair is (target - x). If that complement is already in the Set, a valid pair exists. This replaces the naive O(n^2) double loop with a single pass.',
            solution: `function twoSumExists(arr, target) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(target - x)) return true;
    seen.add(x);
  }
  return false;
}

// Driver Code
console.log(twoSumExists([0, -1, 2, -3, 1], -2)); // true
console.log(twoSumExists([1, -2, 1, 0, 5], 0));   // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Best Time to Buy and Sell Stock',
            problem: 'Given an array prices[] where prices[i] is the price of a stock on day i, find the maximum profit obtainable from a single buy followed by a later sell. If no profit is possible, return 0.',
            examples: `Input:  prices[] = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy on day 2 (price 1) and sell on day 5 (price 6); profit = 6 - 1 = 5.

Input:  prices[] = [7, 6, 4, 3, 1]
Output: 0
Explanation: Prices only fall, so no profitable transaction exists.`,
            approach: 'Track the minimum price seen so far as you move left to right. On each day, the best profit if you sell that day equals (current price - minimum so far). Keep the running maximum of those values. One pass, constant memory.',
            solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > best) best = price - minPrice;
  }
  return best;
}

// Driver Code
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0`,
            output: `5
0`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Product of Array Except Self',
            problem: 'Given an array arr[] of n integers, return an array out[] where out[i] equals the product of every element except arr[i]. Solve it without using division.',
            examples: `Input:  arr[] = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation: out[0] = 2*3*4, out[1] = 1*3*4, and so on.

Input:  arr[] = [2, 0, 3]
Output: [0, 6, 0]
Explanation: Only the index sitting on the zero gets a non-zero product.`,
            approach: 'Build the result in two sweeps. First pass left to right stores the product of all elements before each index (prefix). Second pass right to left multiplies in the product of all elements after each index (suffix), kept in a running variable. No division required.',
            solution: `function productExceptSelf(arr) {
  const n = arr.length;
  const out = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    out[i] = prefix;
    prefix *= arr[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= arr[i];
  }
  return out;
}

// Driver Code
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([2, 0, 3]));    // [0, 6, 0]`,
            output: `[ 24, 12, 8, 6 ]
[ 0, 6, 0 ]`,
            complexity: 'Time O(n), Space O(1) excluding the output array.'
        },
        {
            title: 'Maximum Subarray',
            problem: 'Given an array arr[] of n integers, find the largest possible sum of any contiguous subarray (the subarray must contain at least one element).',
            examples: `Input:  arr[] = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum, 6.

Input:  arr[] = [-3, -1, -2]
Output: -1
Explanation: All values are negative, so the best single element is -1.`,
            approach: "Use Kadane's algorithm. Walk through the array maintaining the best sum of a subarray ending at the current index: either extend the previous subarray or start fresh at the current element. Track the global maximum of those running sums.",
            solution: `function maxSubArray(arr) {
  let current = arr[0];
  let best = arr[0];
  for (let i = 1; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);
    best = Math.max(best, current);
  }
  return best;
}

// Driver Code
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([-3, -1, -2]));                    // -1`,
            output: `6
-1`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Container With Most Water',
            problem: 'Given n non-negative heights[] where each value represents a vertical line on the x-axis, pick two lines that together with the x-axis form a container holding the most water. Return that maximum area.',
            examples: `Input:  heights[] = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
Explanation: Lines at index 1 (height 8) and index 8 (height 7) span width 7; area = 7 * min(8,7) = 49.

Input:  heights[] = [1, 1]
Output: 1
Explanation: Width 1 and height 1 give area 1.`,
            approach: 'Use two pointers starting at both ends. The area is width times the shorter of the two lines. Record it, then move the pointer at the shorter line inward, since keeping the shorter line can never increase the area while reducing width.',
            solution: `function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let best = 0;
  while (left < right) {
    const area = (right - left) * Math.min(heights[left], heights[right]);
    if (area > best) best = area;
    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return best;
}

// Driver Code
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1]));                      // 1`,
            output: `49
1`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Factorial of a Large Number',
            problem: 'Given an integer n, compute n! exactly. Because the result quickly exceeds the range of standard 64-bit numbers, return the full value (for example as a string of digits).',
            examples: `Input:  n = 5
Output: 120
Explanation: 5! = 5*4*3*2*1 = 120.

Input:  n = 20
Output: 2432902008176640000
Explanation: 20! has 19 digits and overflows ordinary integers.`,
            approach: 'JavaScript BigInt handles arbitrary precision, so multiply iteratively using BigInt to avoid overflow. (Alternatively, simulate grade-school multiplication on an array of digits.) Convert the BigInt to a string for display.',
            solution: `function largeFactorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result.toString();
}

// Driver Code
console.log(largeFactorial(5));  // "120"
console.log(largeFactorial(20)); // "2432902008176640000"`,
            output: `120
2432902008176640000`,
            complexity: 'Time O(n) BigInt multiplications, Space O(d) for the d-digit result.'
        },
        {
            title: 'Trapping Rain Water',
            problem: 'Given n non-negative heights[] representing an elevation map where each bar has width 1, compute how many units of water can be trapped after raining.',
            examples: `Input:  heights[] = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
Explanation: Water pools in the dips between taller bars, totalling 6 units.

Input:  heights[] = [4, 2, 0, 3, 2, 5]
Output: 9
Explanation: 9 units of water are held between the boundary bars.`,
            approach: 'Water above any bar equals min(highest bar to its left, highest bar to its right) minus the bar height. Use two pointers with running leftMax and rightMax; always advance the side with the smaller max, because the trapped water on that side is fully determined by it.',
            solution: `function trap(heights) {
  let left = 0;
  let right = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;
  while (left < right) {
    if (heights[left] < heights[right]) {
      leftMax = Math.max(leftMax, heights[left]);
      total += leftMax - heights[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, heights[right]);
      total += rightMax - heights[right];
      right--;
    }
  }
  return total;
}

// Driver Code
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5]));                   // 9`,
            output: `6
9`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Insert and Merge Intervals',
            problem: 'Given a list of non-overlapping intervals sorted by start time, insert a new interval and merge any intervals that overlap as a result. Return the updated sorted list.',
            examples: `Input:  intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
Output: [[1, 5], [6, 9]]
Explanation: [2,5] overlaps [1,3] and merges into [1,5].

Input:  intervals = [[1, 2], [3, 5], [6, 7], [8, 10]], newInterval = [4, 8]
Output: [[1, 2], [3, 10]]
Explanation: [4,8] merges [3,5], [6,7] and [8,10] into [3,10].`,
            approach: 'Walk the sorted intervals in three phases: copy all intervals that end before the new interval starts, merge every interval that overlaps the new one by widening its bounds, then copy the remaining intervals that start after the merged block ends.',
            solution: `function insertInterval(intervals, newInterval) {
  const res = [];
  let i = 0;
  const n = intervals.length;
  let [start, end] = newInterval;

  while (i < n && intervals[i][1] < start) res.push(intervals[i++]);

  while (i < n && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  res.push([start, end]);

  while (i < n) res.push(intervals[i++]);
  return res;
}

// Driver Code
console.log(insertInterval([[1, 3], [6, 9]], [2, 5]));
console.log(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10]], [4, 8]));`,
            output: `[ [ 1, 5 ], [ 6, 9 ] ]
[ [ 1, 2 ], [ 3, 10 ] ]`,
            complexity: 'Time O(n), Space O(n) for the output.'
        },
        {
            title: 'Merge Intervals',
            problem: 'Given a collection of intervals, merge all overlapping intervals and return a list of non-overlapping intervals covering the same ranges.',
            examples: `Input:  intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [[1, 6], [8, 10], [15, 18]]
Explanation: [1,3] and [2,6] overlap and merge into [1,6].

Input:  intervals = [[1, 4], [4, 5]]
Output: [[1, 5]]
Explanation: Intervals touching at 4 are considered overlapping.`,
            approach: 'Sort the intervals by start time. Sweep through them keeping the last merged interval; if the current interval starts before that interval ends, extend its end, otherwise push it as a new separate interval.',
            solution: `function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i].slice());
    }
  }
  return res;
}

// Driver Code
console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(mergeIntervals([[1, 4], [4, 5]]));`,
            output: `[ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
[ [ 1, 5 ] ]`,
            complexity: 'Time O(n log n) for sorting, Space O(n).'
        }
    ]
}
