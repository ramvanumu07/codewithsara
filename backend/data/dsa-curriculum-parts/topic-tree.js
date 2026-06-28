/**
 * DSA topic: Tree (notes-only).
 */
export default {
    id: 'dsa-tree',
    title: 'Tree',
    description: 'Tree interview questions with explanations and reference solutions.',
    intro: 'Binary tree and BST traversal, construction, and validation problems.',
    questions: [
        {
            title: 'Maximum Depth of Binary Tree',
            problem: 'Given the root of a binary tree, return its maximum depth, defined as the number of nodes along the longest path from the root down to a leaf.',
            examples: `Input:  root = [3, 9, 20, null, null, 15, 7]
Output: 3
Explanation: The longest root-to-leaf path passes 3 -> 20 -> 15 (or 7).

Input:  root = [1, null, 2]
Output: 2
Explanation: Only one branch exists, of depth 2.`,
            approach: 'Recurse on both subtrees. The depth of a node is one plus the larger of its left and right subtree depths; an empty subtree has depth 0.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Driver Code
const a = new TreeNode(3);
a.left = new TreeNode(9);
a.right = new TreeNode(20);
a.right.left = new TreeNode(15);
a.right.right = new TreeNode(7);
console.log(maxDepth(a)); // 3

const b = new TreeNode(1);
b.right = new TreeNode(2);
console.log(maxDepth(b)); // 2`,
            output: `3
2`,
            complexity: 'Time O(n), Space O(h) for recursion (h = height).'
        },
        {
            title: 'Check for Mirror Trees',
            problem: 'Given the roots of two binary trees, determine whether one is the mirror image of the other.',
            examples: `Input:  t1 = [1, 2, 3], t2 = [1, 3, 2]
Output: true
Explanation: The left of one matches the right of the other at every level.

Input:  t1 = [1, 2, 3], t2 = [1, 2, 3]
Output: false
Explanation: Identical (not mirrored) trees are not mirror images here.`,
            approach: 'Recurse in tandem comparing the left subtree of one against the right subtree of the other and vice versa. Two empty nodes mirror; mismatched presence or values do not.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function areMirror(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return areMirror(a.left, b.right) && areMirror(a.right, b.left);
}

// Driver Code
const t1 = new TreeNode(1); t1.left = new TreeNode(2); t1.right = new TreeNode(3);
const t2 = new TreeNode(1); t2.left = new TreeNode(3); t2.right = new TreeNode(2);
console.log(areMirror(t1, t2)); // true

const t3 = new TreeNode(1); t3.left = new TreeNode(2); t3.right = new TreeNode(3);
console.log(areMirror(t1, t3)); // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(h).'
        },
        {
            title: 'Invert/Flip Binary Tree',
            problem: 'Given the root of a binary tree, invert it so that every left child becomes the right child and vice versa, then return the root.',
            examples: `Input:  root = [4, 2, 7, 1, 3, 6, 9]
Output: [4, 7, 2, 9, 6, 3, 1]
Explanation: Each node has its two children swapped recursively.

Input:  root = [1, 2]
Output: [1, null, 2]
Explanation: The single child moves to the opposite side.`,
            approach: 'Recursively swap the left and right child of every node. A simple post-order or pre-order traversal that swaps the two pointers at each node achieves the inversion.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

// Driver Code
function inorder(root, out = []) {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.val);
  inorder(root.right, out);
  return out;
}
const r = new TreeNode(4);
r.left = new TreeNode(2); r.right = new TreeNode(7);
r.left.left = new TreeNode(1); r.left.right = new TreeNode(3);
r.right.left = new TreeNode(6); r.right.right = new TreeNode(9);
console.log(inorder(invertTree(r))); // [9, 7, 6, 4, 3, 2, 1]`,
            output: `[ 9, 7, 6, 4, 3, 2, 1 ]`,
            complexity: 'Time O(n), Space O(h).'
        },
        {
            title: 'Binary Tree Maximum Path Sum',
            problem: 'Given the root of a binary tree, find the maximum sum of values along any path. A path is any sequence of connected nodes and need not pass through the root.',
            examples: `Input:  root = [1, 2, 3]
Output: 6
Explanation: The path 2 -> 1 -> 3 sums to 6.

Input:  root = [-10, 9, 20, null, null, 15, 7]
Output: 42
Explanation: The path 15 -> 20 -> 7 sums to 42.`,
            approach: 'Do a post-order DFS returning the best downward path sum from each node (node value plus the larger non-negative child contribution). At each node also consider the path that bends through it (left + node + right) to update a global maximum.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function maxPathSum(root) {
  let best = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const left = Math.max(gain(node.left), 0);
    const right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  gain(root);
  return best;
}

// Driver Code
const a = new TreeNode(1); a.left = new TreeNode(2); a.right = new TreeNode(3);
console.log(maxPathSum(a)); // 6

const b = new TreeNode(-10);
b.left = new TreeNode(9); b.right = new TreeNode(20);
b.right.left = new TreeNode(15); b.right.right = new TreeNode(7);
console.log(maxPathSum(b)); // 42`,
            output: `6
42`,
            complexity: 'Time O(n), Space O(h).'
        },
        {
            title: 'Binary Tree Level Order Traversal',
            problem: 'Given the root of a binary tree, return its level-order traversal: a list of levels, each containing the node values from left to right.',
            examples: `Input:  root = [3, 9, 20, null, null, 15, 7]
Output: [[3], [9, 20], [15, 7]]
Explanation: Nodes are grouped by depth.

Input:  root = [1]
Output: [[1]]
Explanation: A single node forms one level.`,
            approach: 'Use a breadth-first search with a queue. Process the tree level by level: for each level, record the size of the queue, then dequeue exactly that many nodes, collecting their values and enqueuing their children.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function levelOrder(root) {
  const res = [];
  if (!root) return res;
  let queue = [root];
  while (queue.length) {
    const level = [];
    const next = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(level);
    queue = next;
  }
  return res;
}

// Driver Code
const a = new TreeNode(3);
a.left = new TreeNode(9); a.right = new TreeNode(20);
a.right.left = new TreeNode(15); a.right.right = new TreeNode(7);
console.log(levelOrder(a)); // [[3], [9, 20], [15, 7]]`,
            output: `[ [ 3 ], [ 9, 20 ], [ 15, 7 ] ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Serialize and Deserialize Binary Tree',
            problem: 'Design functions to serialize a binary tree to a string and deserialize that string back into the identical tree structure.',
            examples: `Input:  root = [1, 2, 3, null, null, 4, 5]
Output: serialize then deserialize reproduces [1, 2, 3, null, null, 4, 5]
Explanation: The round trip yields a tree equal to the original.

Input:  root = null
Output: an empty tree
Explanation: Serializing nothing and deserializing yields null.`,
            approach: 'Serialize with a pre-order walk, writing each value and a marker (such as #) for null children, separated by commas. Deserialize by reading those tokens in the same pre-order sequence, rebuilding nodes recursively and stopping at null markers.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function serialize(root) {
  const out = [];
  (function dfs(node) {
    if (!node) { out.push('#'); return; }
    out.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  })(root);
  return out.join(',');
}

function deserialize(data) {
  const tokens = data.split(',');
  let i = 0;
  function build() {
    const t = tokens[i++];
    if (t === '#') return null;
    const node = new TreeNode(Number(t));
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}

// Driver Code
const a = new TreeNode(1);
a.left = new TreeNode(2); a.right = new TreeNode(3);
a.right.left = new TreeNode(4); a.right.right = new TreeNode(5);
const s = serialize(a);
console.log(s);                         // "1,2,#,#,3,4,#,#,5,#,#"
console.log(serialize(deserialize(s))); // same string`,
            output: `1,2,#,#,3,4,#,#,5,#,#
1,2,#,#,3,4,#,#,5,#,#`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Subtree of Another Tree',
            problem: 'Given the roots of two binary trees root and subRoot, determine whether subRoot is a subtree of root (a node in root whose entire structure and values match subRoot).',
            examples: `Input:  root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]
Output: true
Explanation: The left child of root matches subRoot exactly.

Input:  root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2]
Output: false
Explanation: The candidate subtree has an extra node, so it does not match.`,
            approach: 'For each node of the main tree, check whether the subtree rooted there is identical to subRoot using a helper that compares two trees node by node. Return true if any node yields an exact match.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function sameTree(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return sameTree(a.left, b.left) && sameTree(a.right, b.right);
}

function isSubtree(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  if (sameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

// Driver Code
const root = new TreeNode(3);
root.left = new TreeNode(4); root.right = new TreeNode(5);
root.left.left = new TreeNode(1); root.left.right = new TreeNode(2);
const sub = new TreeNode(4);
sub.left = new TreeNode(1); sub.right = new TreeNode(2);
console.log(isSubtree(root, sub)); // true

root.left.right.left = new TreeNode(0);
console.log(isSubtree(root, sub)); // false`,
            output: `true
false`,
            complexity: 'Time O(n*m) worst case, Space O(h).'
        },
        {
            title: 'Construct Binary Tree from Preorder and Inorder Traversal',
            problem: 'Given preorder and inorder traversal arrays of a binary tree with unique values, reconstruct the tree and return its root.',
            examples: `Input:  preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]
Output: tree [3, 9, 20, null, null, 15, 7]
Explanation: 3 is the root; 9 lies left of it in inorder, the rest lie right.

Input:  preorder = [1, 2], inorder = [2, 1]
Output: tree [1, 2]
Explanation: 2 is the left child of root 1.`,
            approach: 'The first preorder value is always the current root. Find it in the inorder array to split into left and right subtrees, then recurse. A value-to-index map over inorder makes each lookup O(1).',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function buildTree(preorder, inorder) {
  const idx = new Map();
  inorder.forEach((v, i) => idx.set(v, i));
  let pre = 0;
  function build(lo, hi) {
    if (lo > hi) return null;
    const rootVal = preorder[pre++];
    const node = new TreeNode(rootVal);
    const mid = idx.get(rootVal);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  }
  return build(0, inorder.length - 1);
}

// Driver Code
function preorderVals(root, out = []) {
  if (!root) return out;
  out.push(root.val);
  preorderVals(root.left, out);
  preorderVals(root.right, out);
  return out;
}
const t = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(preorderVals(t)); // [3, 9, 20, 15, 7]`,
            output: `[ 3, 9, 20, 15, 7 ]`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Validate Binary Search Tree',
            problem: 'Given the root of a binary tree, determine whether it is a valid binary search tree: every node is greater than all nodes in its left subtree and less than all nodes in its right subtree.',
            examples: `Input:  root = [2, 1, 3]
Output: true
Explanation: 1 < 2 < 3 satisfies the BST property.

Input:  root = [5, 1, 4, null, null, 3, 6]
Output: false
Explanation: Node 3 lies in the right subtree of 5 but is smaller than 5.`,
            approach: 'Recurse carrying an allowed (min, max) range for each node. The root may be any value; a left child must be below the parent, a right child above. Any value outside its range invalidates the tree.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function isValidBST(root, low = -Infinity, high = Infinity) {
  if (!root) return true;
  if (root.val <= low || root.val >= high) return false;
  return isValidBST(root.left, low, root.val) &&
         isValidBST(root.right, root.val, high);
}

// Driver Code
const a = new TreeNode(2); a.left = new TreeNode(1); a.right = new TreeNode(3);
console.log(isValidBST(a)); // true

const b = new TreeNode(5);
b.left = new TreeNode(1); b.right = new TreeNode(4);
b.right.left = new TreeNode(3); b.right.right = new TreeNode(6);
console.log(isValidBST(b)); // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(h).'
        },
        {
            title: 'Kth Smallest Element in a BST',
            problem: 'Given the root of a binary search tree and an integer k, return the k-th smallest value in the tree (1-indexed).',
            examples: `Input:  root = [3, 1, 4, null, 2], k = 1
Output: 1
Explanation: The smallest value in the BST is 1.

Input:  root = [5, 3, 6, 2, 4, null, null, 1], k = 3
Output: 3
Explanation: The third smallest value in sorted order is 3.`,
            approach: 'An in-order traversal of a BST visits values in ascending order. Traverse in-order with a counter and stop as soon as the k-th value is reached.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  while (stack.length || node) {
    while (node) { stack.push(node); node = node.left; }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
  return -1;
}

// Driver Code
const a = new TreeNode(3);
a.left = new TreeNode(1); a.right = new TreeNode(4);
a.left.right = new TreeNode(2);
console.log(kthSmallest(a, 1)); // 1

const b = new TreeNode(5);
b.left = new TreeNode(3); b.right = new TreeNode(6);
b.left.left = new TreeNode(2); b.left.right = new TreeNode(4);
b.left.left.left = new TreeNode(1);
console.log(kthSmallest(b, 3)); // 3`,
            output: `1
3`,
            complexity: 'Time O(h + k), Space O(h).'
        },
        {
            title: 'Lowest Common Ancestor of BST',
            problem: 'Given a binary search tree and two nodes, find their lowest common ancestor: the deepest node that has both given nodes as descendants (a node can be a descendant of itself).',
            examples: `Input:  BST = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 8
Output: 6
Explanation: 2 and 8 split at the root, whose value lies between them.

Input:  BST = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 4
Output: 2
Explanation: 4 is in the subtree of 2, so 2 is the ancestor.`,
            approach: 'Exploit the BST ordering. Starting at the root, if both targets are smaller go left, if both are larger go right; the first node that sits between them (or equals one of them) is their lowest common ancestor.',
            solution: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p < node.val && q < node.val) node = node.left;
    else if (p > node.val && q > node.val) node = node.right;
    else return node.val;
  }
  return -1;
}

// Driver Code
const root = new TreeNode(6);
root.left = new TreeNode(2); root.right = new TreeNode(8);
root.left.left = new TreeNode(0); root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7); root.right.right = new TreeNode(9);
console.log(lowestCommonAncestor(root, 2, 8)); // 6
console.log(lowestCommonAncestor(root, 2, 4)); // 2`,
            output: `6
2`,
            complexity: 'Time O(h), Space O(1).'
        },
        {
            title: 'Implement Trie (Prefix Tree)',
            problem: 'Implement a trie supporting insert(word), search(word) for an exact word, and startsWith(prefix) to test whether any inserted word begins with the given prefix.',
            examples: `Input:  insert "apple"; search "apple"; search "app"; startsWith "app"
Output: true, false, true
Explanation: "app" is a prefix but was not inserted as a whole word.

Input:  insert "app"; search "app"
Output: true
Explanation: After inserting "app" the exact search succeeds.`,
            approach: 'Each trie node holds a map of child characters and a flag marking the end of a word. Insert walks or creates child nodes per character and sets the end flag. Search and startsWith walk the path; search additionally requires the end flag at the final node.',
            solution: `class TrieNode {
  constructor() { this.children = new Map(); this.isEnd = false; }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }
  _find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }
  search(word) {
    const node = this._find(word);
    return node !== null && node.isEnd;
  }
  startsWith(prefix) {
    return this._find(prefix) !== null;
  }
}

// Driver Code
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));     // true
console.log(trie.search("app"));       // false
console.log(trie.startsWith("app"));   // true
trie.insert("app");
console.log(trie.search("app"));       // true`,
            output: `true
false
true
true`,
            complexity: 'Time O(L) per operation for word length L, Space O(total characters).'
        }
    ]
}
