/**
 * DSA topic: Stack, Queue and Deque (notes-only).
 */
export default {
    id: 'dsa-stack-queue',
    title: 'Stack, Queue and Deque',
    description: 'Stack, queue and deque interview questions with explanations and reference solutions.',
    intro: 'Monotonic stack, expression parsing, and sliding-window-with-deque problems.',
    questions: [
        {
            title: 'Infix to Postfix Expression',
            problem: 'Given a valid infix arithmetic expression with single-letter operands and the operators + - * / ^ plus parentheses, convert it to postfix (Reverse Polish) notation.',
            examples: `Input:  "a+b*c"
Output: "abc*+"
Explanation: Multiplication binds tighter than addition.

Input:  "(a+b)*c"
Output: "ab+c*"
Explanation: Parentheses force the addition to happen first.`,
            approach: 'Scan left to right (shunting-yard). Append operands to the output. For an operator, pop operators of greater-or-equal precedence first, then push it. Push an opening parenthesis; on a closing one, pop until the matching open. Finally pop any remaining operators.',
            solution: `function infixToPostfix(expr) {
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const out = [];
  const stack = [];
  const isOperand = (c) => /[a-zA-Z0-9]/.test(c);

  for (const c of expr) {
    if (isOperand(c)) {
      out.push(c);
    } else if (c === '(') {
      stack.push(c);
    } else if (c === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') out.push(stack.pop());
      stack.pop();
    } else if (prec[c]) {
      while (
        stack.length &&
        stack[stack.length - 1] !== '(' &&
        prec[stack[stack.length - 1]] >= prec[c]
      ) out.push(stack.pop());
      stack.push(c);
    }
  }
  while (stack.length) out.push(stack.pop());
  return out.join('');
}

// Driver Code
console.log(infixToPostfix("a+b*c"));   // "abc*+"
console.log(infixToPostfix("(a+b)*c")); // "ab+c*"`,
            output: `abc*+
ab+c*`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Next Greater Element',
            problem: 'Given an array, for each element find the first element to its right that is strictly greater. If no such element exists, report -1 for that position.',
            examples: `Input:  arr[] = [4, 5, 2, 25]
Output: [5, 25, 25, -1]
Explanation: Each value is paired with the next larger value to its right.

Input:  arr[] = [13, 7, 6, 12]
Output: [-1, 12, 12, -1]
Explanation: 13 has nothing larger to its right.`,
            approach: 'Use a monotonic decreasing stack of indices. Traverse left to right; while the current value is greater than the value at the stack top, that top has found its next greater element, so pop and record. Push the current index. Anything left on the stack gets -1.',
            solution: `function nextGreater(arr) {
  const res = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      res[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return res;
}

// Driver Code
console.log(nextGreater([4, 5, 2, 25]));  // [5, 25, 25, -1]
console.log(nextGreater([13, 7, 6, 12])); // [-1, 12, 12, -1]`,
            output: `[ 5, 25, 25, -1 ]
[ -1, 12, 12, -1 ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Largest Area in a Histogram',
            problem: 'Given an array of bar heights of a histogram where each bar has width 1, find the area of the largest rectangle that fits entirely within the histogram.',
            examples: `Input:  heights[] = [2, 1, 5, 6, 2, 3]
Output: 10
Explanation: Bars of height 5 and 6 form a 2-wide, 5-tall rectangle of area 10.

Input:  heights[] = [2, 4]
Output: 4
Explanation: The single bar of height 4 (or two of height 2) gives area 4.`,
            approach: 'Maintain a stack of indices with increasing heights. When the current bar is shorter than the bar at the stack top, pop and compute the area with the popped bar as the limiting height, using the new stack top to find the width. A sentinel of height 0 flushes the stack at the end.',
            solution: `function largestRectangleArea(heights) {
  const stack = [];
  let best = 0;
  const h = [...heights, 0];
  for (let i = 0; i < h.length; i++) {
    while (stack.length && h[i] < h[stack[stack.length - 1]]) {
      const height = h[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}

// Driver Code
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4]));             // 4`,
            output: `10
4`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Delete Middle Element of a Stack',
            problem: 'Given a stack, delete its middle element so that the relative order of the remaining elements is unchanged. For even sizes, remove the lower of the two middle positions.',
            examples: `Input:  stack (bottom to top) = [1, 2, 3, 4, 5]
Output: [1, 2, 4, 5]
Explanation: The middle element 3 is removed.

Input:  stack = [1, 2, 3, 4, 5, 6]
Output: [1, 2, 4, 5, 6]
Explanation: With six elements, position 3 (value 3) is deleted.`,
            approach: 'Compute the middle index. Recursively (or with a helper) pop elements until reaching the middle, drop it, then push the popped elements back so order is preserved.',
            solution: `function deleteMiddle(stack) {
  const mid = Math.floor(stack.length / 2);
  function helper(s, count) {
    if (count === mid) {
      s.pop();
      return;
    }
    const top = s.pop();
    helper(s, count + 1);
    s.push(top);
  }
  helper(stack, 0);
  return stack;
}

// Driver Code
console.log(deleteMiddle([1, 2, 3, 4, 5]));    // [1, 2, 4, 5]
console.log(deleteMiddle([1, 2, 3, 4, 5, 6])); // [1, 2, 4, 5, 6]`,
            output: `[ 1, 2, 4, 5 ]
[ 1, 2, 4, 5, 6 ]`,
            complexity: 'Time O(n), Space O(n) recursion.'
        },
        {
            title: 'Length of the Longest Valid Substring',
            problem: 'Given a string of only the characters ( and ), find the length of the longest contiguous substring of well-formed (correctly matched) parentheses.',
            examples: `Input:  "(()"
Output: 2
Explanation: The substring "()" is the longest valid run.

Input:  ")()())"
Output: 4
Explanation: The substring "()()" of length 4 is valid.`,
            approach: 'Keep a stack of indices seeded with -1 as a base. Push the index of each open bracket. On a close, pop; if the stack becomes empty push the current index as a new base, otherwise the distance from the current index to the new top is a valid length.',
            solution: `function longestValidParentheses(s) {
  const stack = [-1];
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) stack.push(i);
      else best = Math.max(best, i - stack[stack.length - 1]);
    }
  }
  return best;
}

// Driver Code
console.log(longestValidParentheses("(()"));    // 2
console.log(longestValidParentheses(")()())")); // 4`,
            output: `2
4`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Sum of Max of Subarrays',
            problem: 'Given an array, compute the sum of the maximum element over every contiguous subarray.',
            examples: `Input:  arr[] = [1, 3, 2]
Output: 15
Explanation: Subarray maxima are 1,3,2,3,3,3 summing to 15.

Input:  arr[] = [2, 1]
Output: 5
Explanation: Subarray maxima are 2, 1 and 2 (for [2,1]) summing to 5.`,
            approach: 'For each element, count how many subarrays have it as the maximum: the number of subarrays where it is the nearest strict-greater boundary on the left times the same on the right. Use monotonic stacks to find these spans, then add value times left times right.',
            solution: `function sumOfSubarrayMaxes(arr) {
  const n = arr.length;
  const left = new Array(n);
  const right = new Array(n);
  let stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) stack.pop();
    left[i] = stack.length ? i - stack[stack.length - 1] : i + 1;
    stack.push(i);
  }
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && arr[stack[stack.length - 1]] <= arr[i]) stack.pop();
    right[i] = stack.length ? stack[stack.length - 1] - i : n - i;
    stack.push(i);
  }

  let total = 0;
  for (let i = 0; i < n; i++) total += arr[i] * left[i] * right[i];
  return total;
}

// Driver Code
console.log(sumOfSubarrayMaxes([1, 3, 2])); // 15
console.log(sumOfSubarrayMaxes([2, 1]));    // 5`,
            output: `15
5`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Next Greater Element in a Circular Array',
            problem: 'Given a circular array (the element after the last wraps around to the first), find the next greater element for every position, or -1 if none exists.',
            examples: `Input:  arr[] = [1, 2, 1]
Output: [2, -1, 2]
Explanation: For the last 1, wrapping around reaches 2.

Input:  arr[] = [3, 8, 4, 1, 2]
Output: [8, -1, 8, 2, 3]
Explanation: Values wrap to find a greater element where needed.`,
            approach: 'Run the monotonic-stack next-greater scan over the array twice (using index modulo n) to simulate the wrap-around. Only set results during the conceptual first pass; the second pass resolves elements that needed to wrap.',
            solution: `function nextGreaterCircular(arr) {
  const n = arr.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * n; i++) {
    const cur = arr[i % n];
    while (stack.length && arr[stack[stack.length - 1]] < cur) {
      res[stack.pop()] = cur;
    }
    if (i < n) stack.push(i);
  }
  return res;
}

// Driver Code
console.log(nextGreaterCircular([1, 2, 1]));       // [2, -1, 2]
console.log(nextGreaterCircular([3, 8, 4, 1, 2])); // [8, -1, 8, 2, 3]`,
            output: `[ 2, -1, 2 ]
[ 8, -1, 8, 2, 3 ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Longest Bounded-Difference Subarray',
            problem: 'Given an array and a value x, find the length of the longest contiguous subarray in which the absolute difference between any two elements is at most x.',
            examples: `Input:  arr[] = [1, 2, 3, 4], x = 0
Output: 1
Explanation: With x = 0 every window must hold equal values, so length 1.

Input:  arr[] = [1, 3, 6, 4, 1, 2], x = 2
Output: 3
Explanation: The window [3,4,... ] of values within 2 reaches length 3.`,
            approach: 'Slide a window while maintaining the current window maximum and minimum with two monotonic deques. When max minus min exceeds x, shrink from the left, popping deque fronts that leave the window. Track the largest valid window.',
            solution: `function longestBoundedDiff(arr, x) {
  const maxDq = [];
  const minDq = [];
  let start = 0;
  let best = 0;
  for (let end = 0; end < arr.length; end++) {
    while (maxDq.length && arr[maxDq[maxDq.length - 1]] <= arr[end]) maxDq.pop();
    while (minDq.length && arr[minDq[minDq.length - 1]] >= arr[end]) minDq.pop();
    maxDq.push(end);
    minDq.push(end);
    while (arr[maxDq[0]] - arr[minDq[0]] > x) {
      start++;
      if (maxDq[0] < start) maxDq.shift();
      if (minDq[0] < start) minDq.shift();
    }
    best = Math.max(best, end - start + 1);
  }
  return best;
}

// Driver Code
console.log(longestBoundedDiff([1, 2, 3, 4], 0));       // 1
console.log(longestBoundedDiff([1, 3, 6, 4, 1, 2], 2)); // 3`,
            output: `1
3`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'K Sized Subarray Maximum',
            problem: 'Given an array and a window size k, return the maximum of every contiguous subarray (sliding window) of length k.',
            examples: `Input:  arr[] = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Output: [3, 3, 5, 5, 6, 7]
Explanation: The maximum of each window of size 3 in order.

Input:  arr[] = [9, 11], k = 2
Output: [11]
Explanation: Only one window of size 2 exists.`,
            approach: 'Use a deque holding indices of candidate maxima in decreasing value order. For each new element, drop smaller values from the back and out-of-window indices from the front; the front is always the current window maximum.',
            solution: `function maxSlidingWindow(arr, k) {
  const dq = [];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    while (dq.length && arr[dq[dq.length - 1]] <= arr[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) res.push(arr[dq[0]]);
  }
  return res;
}

// Driver Code
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
console.log(maxSlidingWindow([9, 11], 2));                    // [11]`,
            output: `[ 3, 3, 5, 5, 6, 7 ]
[ 11 ]`,
            complexity: 'Time O(n), Space O(k).'
        }
    ]
}
