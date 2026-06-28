/**
 * DSA topic: Searching and Sorting (notes-only).
 */
export default {
    id: 'dsa-searching-sorting',
    title: 'Searching and Sorting',
    description: 'Searching and sorting interview questions with explanations and reference solutions.',
    intro: 'Binary search variants and sorting-based problems.',
    questions: [
        {
            title: 'Search in Rotated Sorted Array',
            problem: 'Given a sorted array that has been rotated at an unknown pivot and contains distinct values, find the index of a target value, or -1 if it is absent. Aim for logarithmic time.',
            examples: `Input:  arr[] = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
Explanation: Value 0 sits at index 4.

Input:  arr[] = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
Explanation: 3 is not present in the array.`,
            approach: 'Binary search with a twist: at each midpoint, one half is always sorted. Check which half is sorted, decide whether the target lies within that sorted range, and discard the other half accordingly.',
            solution: `function searchRotated(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[lo] <= arr[mid]) {
      if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}

// Driver Code
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1`,
            output: `4
-1`,
            complexity: 'Time O(log n), Space O(1).'
        },
        {
            title: 'Peak Element',
            problem: 'Given an array, find a peak element, defined as an element strictly greater than its neighbours. Array ends are treated as having negative infinity beyond them. Return the index of any one peak.',
            examples: `Input:  arr[] = [1, 2, 3, 1]
Output: 2
Explanation: arr[2] = 3 is greater than both neighbours.

Input:  arr[] = [1, 2, 1, 3, 5, 6, 4]
Output: 5
Explanation: Index 5 (value 6) is a peak; index 1 is another valid answer.`,
            approach: 'Binary search on the slope. If the midpoint is on an ascending slope (arr[mid] < arr[mid+1]) a peak must lie to the right, otherwise it lies at mid or to the left. Narrow the range until it collapses to a peak.',
            solution: `function findPeak(arr) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// Driver Code
console.log(findPeak([1, 2, 3, 1]));             // 2
console.log(findPeak([1, 2, 1, 3, 5, 6, 4]));    // 5`,
            output: `2
5`,
            complexity: 'Time O(log n), Space O(1).'
        },
        {
            title: 'K-th Element of Two Sorted Arrays',
            problem: 'Given two sorted arrays and an integer k, return the k-th smallest element (1-indexed) of the combined sorted order of both arrays.',
            examples: `Input:  a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
Output: 6
Explanation: The merged order is [1,2,3,4,6,...]; the 5th element is 6.

Input:  a[] = [100, 112, 256], b[] = [99, 200, 300], k = 4
Output: 200
Explanation: Merged order [99,100,112,200,...]; the 4th element is 200.`,
            approach: 'Use a merge-style walk with two pointers, advancing whichever array has the smaller current value, until k elements have been consumed. (A binary-search partition can achieve O(log(min(m,n))), but the two-pointer scan is simpler and clear.)',
            solution: `function kthElement(a, b, k) {
  let i = 0;
  let j = 0;
  let count = 0;
  let result = -1;
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && a[i] <= b[j])) {
      result = a[i++];
    } else {
      result = b[j++];
    }
    if (++count === k) return result;
  }
  return result;
}

// Driver Code
console.log(kthElement([2, 3, 6, 7, 9], [1, 4, 8, 10], 5));  // 6
console.log(kthElement([100, 112, 256], [99, 200, 300], 4)); // 200`,
            output: `6
200`,
            complexity: 'Time O(k), Space O(1).'
        },
        {
            title: 'Allocate Minimum Pages',
            problem: 'Given an array where each value is the number of pages in a book and an integer m students, allocate contiguous blocks of books to students so that every book is assigned and the maximum pages any single student reads is minimized. Return that minimum possible maximum.',
            examples: `Input:  pages[] = [12, 34, 67, 90], m = 2
Output: 113
Explanation: Split as [12,34,67] and [90]; the larger load is 113, the smallest achievable.

Input:  pages[] = [10, 20, 30, 40], m = 2
Output: 60
Explanation: Split as [10,20,30] and [40] gives max 60.`,
            approach: 'Binary search on the answer (the maximum pages per student) between the largest single book and the total pages. For a candidate limit, greedily count how many students are needed; if more than m are required the limit is too small, otherwise try smaller.',
            solution: `function allocatePages(pages, m) {
  if (m > pages.length) return -1;

  function studentsNeeded(limit) {
    let count = 1;
    let sum = 0;
    for (const p of pages) {
      if (sum + p > limit) {
        count++;
        sum = p;
      } else {
        sum += p;
      }
    }
    return count;
  }

  let lo = Math.max(...pages);
  let hi = pages.reduce((a, b) => a + b, 0);
  let ans = hi;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (studentsNeeded(mid) <= m) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return ans;
}

// Driver Code
console.log(allocatePages([12, 34, 67, 90], 2)); // 113
console.log(allocatePages([10, 20, 30, 40], 2)); // 60`,
            output: `113
60`,
            complexity: 'Time O(n log(sum)), Space O(1).'
        },
        {
            title: 'Kth Missing Positive Number',
            problem: 'Given a sorted array of distinct positive integers and an integer k, return the k-th positive integer that is missing from the array.',
            examples: `Input:  arr[] = [2, 3, 4, 7, 11], k = 5
Output: 9
Explanation: Missing positives are 1,5,6,8,9,...; the 5th is 9.

Input:  arr[] = [1, 2, 3, 4], k = 2
Output: 6
Explanation: Missing positives are 5,6,7,...; the 2nd is 6.`,
            approach: 'At index i the value arr[i] would equal i+1 if nothing were missing, so arr[i] - (i+1) counts how many positives are missing up to that point. Binary search for the first index where that count reaches k, then offset k from the boundary.',
            solution: `function findKthMissing(arr, k) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const missing = arr[mid] - (mid + 1);
    if (missing < k) lo = mid + 1;
    else hi = mid;
  }
  return lo + k;
}

// Driver Code
console.log(findKthMissing([2, 3, 4, 7, 11], 5)); // 9
console.log(findKthMissing([1, 2, 3, 4], 2));     // 6`,
            output: `9
6`,
            complexity: 'Time O(log n), Space O(1).'
        },
        {
            title: 'Sort 0s, 1s and 2s',
            problem: 'Given an array containing only the values 0, 1 and 2, sort it in a single pass without using a library sort.',
            examples: `Input:  arr[] = [0, 1, 2, 0, 1, 2]
Output: [0, 0, 1, 1, 2, 2]
Explanation: All 0s first, then 1s, then 2s.

Input:  arr[] = [2, 0, 1]
Output: [0, 1, 2]
Explanation: A single pass partitions the three values.`,
            approach: 'Apply the Dutch National Flag algorithm with three pointers: low, mid and high. Send 0s to the front and 2s to the back by swapping, advancing mid through the array while low and high mark the boundaries of the sorted regions.',
            solution: `function sort012(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

// Driver Code
console.log(sort012([0, 1, 2, 0, 1, 2])); // [0, 0, 1, 1, 2, 2]
console.log(sort012([2, 0, 1]));          // [0, 1, 2]`,
            output: `[ 0, 0, 1, 1, 2, 2 ]
[ 0, 1, 2 ]`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Count Inversions',
            problem: 'Given an array, count the number of inversions, that is pairs of indices (i, j) with i < j but arr[i] > arr[j]. The count measures how far the array is from being sorted.',
            examples: `Input:  arr[] = [8, 4, 2, 1]
Output: 6
Explanation: Every pair is out of order, giving 6 inversions.

Input:  arr[] = [1, 20, 6, 4, 5]
Output: 5
Explanation: The inverted pairs are (20,6),(20,4),(20,5),(6,4),(6,5).`,
            approach: 'Use a modified merge sort. While merging two sorted halves, whenever an element from the right half is placed before remaining elements of the left half, every remaining left element forms an inversion, so add their count.',
            solution: `function countInversions(arr) {
  function sortCount(a) {
    if (a.length <= 1) return { sorted: a, count: 0 };
    const mid = a.length >> 1;
    const left = sortCount(a.slice(0, mid));
    const right = sortCount(a.slice(mid));
    const merged = [];
    let i = 0, j = 0, count = left.count + right.count;
    while (i < left.sorted.length && j < right.sorted.length) {
      if (left.sorted[i] <= right.sorted[j]) {
        merged.push(left.sorted[i++]);
      } else {
        merged.push(right.sorted[j++]);
        count += left.sorted.length - i;
      }
    }
    while (i < left.sorted.length) merged.push(left.sorted[i++]);
    while (j < right.sorted.length) merged.push(right.sorted[j++]);
    return { sorted: merged, count };
  }
  return sortCount(arr).count;
}

// Driver Code
console.log(countInversions([8, 4, 2, 1]));      // 6
console.log(countInversions([1, 20, 6, 4, 5]));  // 5`,
            output: `6
5`,
            complexity: 'Time O(n log n), Space O(n).'
        },
        {
            title: 'Merge Two Sorted Arrays Without Extra Space',
            problem: 'Given two sorted arrays a[] and b[], merge them so that a[] holds the smaller half and b[] holds the larger half, both sorted, without allocating an extra merged array.',
            examples: `Input:  a[] = [1, 5, 9, 10, 15, 20], b[] = [2, 3, 8, 13]
Output: a[] = [1, 2, 3, 5, 8, 9], b[] = [10, 13, 15, 20]
Explanation: The ten values are redistributed in sorted order across the two arrays.

Input:  a[] = [1, 3, 5, 7], b[] = [0, 2, 6, 8, 9]
Output: a[] = [0, 1, 2, 3], b[] = [5, 6, 7, 8, 9]
Explanation: Smaller values fill a[], larger values fill b[].`,
            approach: 'Compare the largest remaining element of a[] with the smallest of b[]; if a[] has the larger one, swap them. After all such swaps the two arrays hold the correct halves but unsorted, so sort each array. (The gap method achieves this without the final sorts in O((m+n) log(m+n)).)',
            solution: `function mergeNoExtra(a, b) {
  let i = a.length - 1;
  let j = 0;
  while (i >= 0 && j < b.length) {
    if (a[i] > b[j]) {
      [a[i], b[j]] = [b[j], a[i]];
      i--;
      j++;
    } else {
      break;
    }
  }
  a.sort((x, y) => x - y);
  b.sort((x, y) => x - y);
  return { a, b };
}

// Driver Code
console.log(mergeNoExtra([1, 5, 9, 10, 15, 20], [2, 3, 8, 13]));
console.log(mergeNoExtra([1, 3, 5, 7], [0, 2, 6, 8, 9]));`,
            output: `{ a: [ 1, 2, 3, 5, 8, 9 ], b: [ 10, 13, 15, 20 ] }
{ a: [ 0, 1, 2, 3 ], b: [ 5, 6, 7, 8, 9 ] }`,
            complexity: 'Time O((m+n) log(m+n)) due to the sorts, Space O(1).'
        },
        {
            title: 'Chocolate Distribution Problem',
            problem: 'Given an array where each value is the number of chocolates in a packet, distribute one packet to each of m students so that the difference between the largest and smallest packet given out is minimized. Return that minimum difference.',
            examples: `Input:  packets[] = [3, 4, 1, 9, 56, 7, 9, 12], m = 5
Output: 6
Explanation: Choosing [3,4,7,9,9] gives max-min = 9-3 = 6, the smallest possible.

Input:  packets[] = [7, 3, 2, 4, 9, 12, 56], m = 3
Output: 2
Explanation: Choosing [2,3,4] gives a difference of 2.`,
            approach: 'Sort the packets, then slide a window of size m across them. The minimum difference is the smallest gap between the first and last packet of any such window, because consecutive packets after sorting are closest in value.',
            solution: `function minChocoDiff(packets, m) {
  if (m === 0 || packets.length < m) return 0;
  packets.sort((a, b) => a - b);
  let best = Infinity;
  for (let i = 0; i + m - 1 < packets.length; i++) {
    const diff = packets[i + m - 1] - packets[i];
    if (diff < best) best = diff;
  }
  return best;
}

// Driver Code
console.log(minChocoDiff([3, 4, 1, 9, 56, 7, 9, 12], 5)); // 6
console.log(minChocoDiff([7, 3, 2, 4, 9, 12, 56], 3));    // 2`,
            output: `6
2`,
            complexity: 'Time O(n log n), Space O(1).'
        }
    ]
}
