/**
 * DSA topic: String (notes-only).
 */
export default {
    id: 'dsa-string',
    title: 'String',
    description: 'String interview questions with explanations and reference solutions.',
    intro: 'Sliding-window, palindrome, and anagram string problems.',
    questions: [
        {
            title: 'Longest Substring Without Repeating',
            problem: 'Given a string s, find the length of the longest substring that contains no repeating characters.',
            examples: `Input:  s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3.

Input:  s = "bbbbb"
Output: 1
Explanation: The best substring is "b", with length 1.`,
            approach: 'Use a sliding window with a map from character to its last index. Expand the right edge one character at a time; when a repeat falls inside the window, jump the left edge to just past the previous occurrence. Track the maximum window width.',
            solution: `function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let start = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= start) {
      start = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}

// Driver Code
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1`,
            output: `3
1`,
            complexity: 'Time O(n), Space O(min(n, alphabet)).'
        },
        {
            title: 'Longest Repeating Character Replacement',
            problem: 'Given a string s and an integer k, you may replace at most k characters with any uppercase letter. Return the length of the longest substring containing a single repeated letter that you can produce.',
            examples: `Input:  s = "ABAB", k = 2
Output: 4
Explanation: Replace the two A characters with B (or vice versa) to get "BBBB".

Input:  s = "AABABBA", k = 1
Output: 4
Explanation: Replace the middle A to form "AABBBBA" containing "BBBB".`,
            approach: 'Slide a window while tracking the count of each letter inside it and the count of the most frequent letter. The window is valid when (window length - max frequency) is at most k, meaning the other letters can all be replaced. Shrink from the left when it becomes invalid.',
            solution: `function characterReplacement(s, k) {
  const count = {};
  let start = 0;
  let maxFreq = 0;
  let best = 0;
  for (let end = 0; end < s.length; end++) {
    const ch = s[end];
    count[ch] = (count[ch] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[ch]);
    while (end - start + 1 - maxFreq > k) {
      count[s[start]]--;
      start++;
    }
    best = Math.max(best, end - start + 1);
  }
  return best;
}

// Driver Code
console.log(characterReplacement("ABAB", 2));    // 4
console.log(characterReplacement("AABABBA", 1)); // 4`,
            output: `4
4`,
            complexity: 'Time O(n), Space O(1) (fixed alphabet).'
        },
        {
            title: 'Smallest Window Containing All Characters',
            problem: 'Given strings s and t, find the smallest substring of s that contains every character of t including duplicates. Return an empty string if no such window exists.',
            examples: `Input:  s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: "BANC" is the shortest window containing A, B and C.

Input:  s = "a", t = "aa"
Output: ""
Explanation: s does not contain two copies of a, so no window works.`,
            approach: 'Count the characters needed from t. Expand the right edge, decrementing needs; once every required character is covered, contract the left edge to shrink the window while it stays valid, recording the smallest valid window seen.',
            solution: `function minWindow(s, t) {
  if (t.length > s.length) return "";
  const need = {};
  for (const ch of t) need[ch] = (need[ch] || 0) + 1;
  let required = Object.keys(need).length;

  let left = 0, formed = 0;
  let best = [Infinity, 0, 0];
  const window = {};

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window[ch] = (window[ch] || 0) + 1;
    if (need[ch] && window[ch] === need[ch]) formed++;

    while (formed === required) {
      if (right - left + 1 < best[0]) best = [right - left + 1, left, right];
      const lch = s[left];
      window[lch]--;
      if (need[lch] && window[lch] < need[lch]) formed--;
      left++;
    }
  }
  return best[0] === Infinity ? "" : s.slice(best[1], best[2] + 1);
}

// Driver Code
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "aa"));              // ""`,
            output: `BANC
`,
            complexity: 'Time O(n + m), Space O(alphabet).'
        },
        {
            title: 'Print All Anagrams Together',
            problem: 'Given a list of words, group together all words that are anagrams of one another and return the groups.',
            examples: `Input:  words = ["cat", "dog", "tac", "god", "act"]
Output: [["cat", "tac", "act"], ["dog", "god"]]
Explanation: Words sharing the same letters land in the same group.

Input:  words = ["listen", "silent", "hello"]
Output: [["listen", "silent"], ["hello"]]
Explanation: "listen" and "silent" use identical letters.`,
            approach: 'Anagrams share the same multiset of letters, so the sorted version of a word is a canonical key. Hash each word by its sorted letters and collect words sharing a key into the same group.',
            solution: `function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return Array.from(groups.values());
}

// Driver Code
console.log(groupAnagrams(["cat", "dog", "tac", "god", "act"]));
console.log(groupAnagrams(["listen", "silent", "hello"]));`,
            output: `[ [ 'cat', 'tac', 'act' ], [ 'dog', 'god' ] ]
[ [ 'listen', 'silent' ], [ 'hello' ] ]`,
            complexity: 'Time O(n * k log k) for n words of length k, Space O(n * k).'
        },
        {
            title: 'Sentence Palindrome',
            problem: 'Given a sentence, decide whether it is a palindrome when only alphanumeric characters are considered and letter case is ignored (spaces, punctuation and case are dropped).',
            examples: `Input:  s = "A man, a plan, a canal: Panama"
Output: true
Explanation: Ignoring non-letters and case, it reads "amanaplanacanalpanama".

Input:  s = "race a car"
Output: false
Explanation: The cleaned text "raceacar" is not the same reversed.`,
            approach: 'Filter the string down to lowercase alphanumeric characters, then compare it with its reverse (or use two pointers moving inward). Equality means it is a palindrome.',
            solution: `function isSentencePalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let i = 0;
  let j = cleaned.length - 1;
  while (i < j) {
    if (cleaned[i] !== cleaned[j]) return false;
    i++;
    j--;
  }
  return true;
}

// Driver Code
console.log(isSentencePalindrome("A man, a plan, a canal: Panama")); // true
console.log(isSentencePalindrome("race a car"));                    // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(n) for the cleaned string.'
        },
        {
            title: 'Longest Palindromic Substring',
            problem: 'Given a string s, return the longest contiguous substring of s that reads the same forwards and backwards.',
            examples: `Input:  s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer of the same length.

Input:  s = "cbbd"
Output: "bb"
Explanation: The longest palindrome is the even-length "bb".`,
            approach: 'Expand around centers. Every palindrome has a center that is either a single character (odd length) or between two characters (even length). For each of the 2n-1 centers, expand outward while the characters match and keep the longest span found.',
            solution: `function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0;
  let maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}

// Driver Code
console.log(longestPalindrome("babad")); // "bab"
console.log(longestPalindrome("cbbd"));  // "bb"`,
            output: `bab
bb`,
            complexity: 'Time O(n^2), Space O(1).'
        },
        {
            title: 'Palindromic Substrings',
            problem: 'Given a string s, count how many of its contiguous substrings are palindromes. Single characters count, and different positions are counted separately even if the text is identical.',
            examples: `Input:  s = "abc"
Output: 3
Explanation: The palindromes are "a", "b" and "c".

Input:  s = "aaa"
Output: 6
Explanation: "a" x3, "aa" x2 and "aaa" x1 give 6 palindromic substrings.`,
            approach: 'Use the same expand-around-center idea but count every successful expansion instead of tracking the longest. Each center that keeps matching contributes one more palindrome.',
            solution: `function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}

// Driver Code
console.log(countSubstrings("abc")); // 3
console.log(countSubstrings("aaa")); // 6`,
            output: `3
6`,
            complexity: 'Time O(n^2), Space O(1).'
        }
    ]
}
