/**
 * DSA topic: Linked List (notes-only).
 */
export default {
    id: 'dsa-linked-list',
    title: 'Linked List',
    description: 'Linked list interview questions with explanations and reference solutions.',
    intro: 'Pointer manipulation, cycle detection, and merging problems.',
    questions: [
        {
            title: 'Reverse a Linked List',
            problem: 'Given the head of a singly linked list, reverse the list and return the new head.',
            examples: `Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
Explanation: Every next pointer is flipped to point backwards.

Input:  1 -> 2 -> null
Output: 2 -> 1 -> null
Explanation: A two-node list is swapped end to end.`,
            approach: 'Walk the list with three references: previous, current and next. At each node, remember the next node, point the current node back at previous, then advance previous and current. When current becomes null, previous is the new head.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(reverseList(build([1, 2, 3, 4, 5])))); // [5, 4, 3, 2, 1]
console.log(toArray(reverseList(build([1, 2]))));          // [2, 1]`,
            output: `[ 5, 4, 3, 2, 1 ]
[ 2, 1 ]`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Detect Cycle in a Linked List',
            problem: 'Given the head of a singly linked list, determine whether the list contains a cycle (some node is revisited by following next pointers).',
            examples: `Input:  list with nodes 3 -> 2 -> 0 -> -4 and -4 linking back to node 2
Output: true
Explanation: Following next pointers loops forever, so a cycle exists.

Input:  list 1 -> 2 -> null
Output: false
Explanation: The list ends at null, so there is no cycle.`,
            approach: "Use Floyd's tortoise and hare. Advance one pointer by one step and another by two steps. If they ever meet, a cycle exists; if the fast pointer reaches null, the list is acyclic.",
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Driver Code
const a = new Node(3), b = new Node(2), c = new Node(0), d = new Node(-4);
a.next = b; b.next = c; c.next = d; d.next = b; // cycle
console.log(hasCycle(a)); // true

const x = new Node(1), y = new Node(2);
x.next = y;
console.log(hasCycle(x)); // false`,
            output: `true
false`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Merge Two Sorted Lists',
            problem: 'Given the heads of two sorted singly linked lists, merge them into one sorted list and return its head.',
            examples: `Input:  l1 = 1 -> 2 -> 4, l2 = 1 -> 3 -> 4
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4
Explanation: Nodes are interleaved in non-decreasing order.

Input:  l1 = null, l2 = 0
Output: 0
Explanation: Merging with an empty list returns the other list.`,
            approach: 'Use a dummy head and a tail pointer. Repeatedly attach the smaller of the two current nodes to the tail and advance that list. When one list runs out, attach the remainder of the other.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function mergeTwoLists(l1, l2) {
  const dummy = new Node(0);
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(mergeTwoLists(build([1, 2, 4]), build([1, 3, 4])))); // [1,1,2,3,4,4]
console.log(toArray(mergeTwoLists(null, build([0]))));                   // [0]`,
            output: `[ 1, 1, 2, 3, 4, 4 ]
[ 0 ]`,
            complexity: 'Time O(m + n), Space O(1).'
        },
        {
            title: 'Merge K Sorted Lists',
            problem: 'Given an array of k sorted linked lists, merge them all into one sorted linked list and return its head.',
            examples: `Input:  lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
Explanation: All nodes from the three lists in sorted order.

Input:  lists = []
Output: null
Explanation: With no lists there is nothing to merge.`,
            approach: 'Merge the lists pairwise (divide and conquer): repeatedly merge adjacent pairs using the two-list merge until a single list remains. This costs O(N log k) instead of O(N k) for sequential merging.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function mergeTwo(a, b) {
  const dummy = new Node(0);
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}

function mergeKLists(lists) {
  if (lists.length === 0) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      merged.push(mergeTwo(lists[i], lists[i + 1] || null));
    }
    lists = merged;
  }
  return lists[0];
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(mergeKLists([build([1, 4, 5]), build([1, 3, 4]), build([2, 6])])));
console.log(mergeKLists([]));`,
            output: `[ 1, 1, 2, 3, 4, 4, 5, 6 ]
null`,
            complexity: 'Time O(N log k) for N total nodes, Space O(1) extra.'
        },
        {
            title: 'Remove Nth Node From End of List',
            problem: 'Given the head of a linked list, remove the n-th node counting from the end and return the head of the modified list.',
            examples: `Input:  1 -> 2 -> 3 -> 4 -> 5, n = 2
Output: 1 -> 2 -> 3 -> 5
Explanation: The 2nd node from the end (value 4) is removed.

Input:  1 -> 2, n = 2
Output: 2
Explanation: Removing the 2nd from the end deletes the head.`,
            approach: 'Use two pointers with a dummy node before the head. Advance the fast pointer n+1 steps, then move both pointers until fast reaches the end. The slow pointer now sits just before the target, so unlink it.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function removeNthFromEnd(head, n) {
  const dummy = new Node(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(removeNthFromEnd(build([1, 2, 3, 4, 5]), 2))); // [1, 2, 3, 5]
console.log(toArray(removeNthFromEnd(build([1, 2]), 2)));          // [2]`,
            output: `[ 1, 2, 3, 5 ]
[ 2 ]`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Reorder List',
            problem: 'Given a singly linked list L0 -> L1 -> ... -> Ln, reorder it in place to L0 -> Ln -> L1 -> Ln-1 -> ... without changing node values, only rearranging the links.',
            examples: `Input:  1 -> 2 -> 3 -> 4
Output: 1 -> 4 -> 2 -> 3
Explanation: Front and back nodes are interleaved.

Input:  1 -> 2 -> 3 -> 4 -> 5
Output: 1 -> 5 -> 2 -> 4 -> 3
Explanation: The middle node ends up last.`,
            approach: 'Find the middle with slow and fast pointers, reverse the second half, then merge the two halves by alternating nodes from the front and the reversed back.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function reorderList(head) {
  if (!head || !head.next) return head;

  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }

  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) { const n = second.next; second.next = prev; prev = second; second = n; }

  let first = head;
  let back = prev;
  while (back) {
    const fn = first.next, bn = back.next;
    first.next = back;
    back.next = fn;
    first = fn;
    back = bn;
  }
  return head;
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(reorderList(build([1, 2, 3, 4]))));    // [1, 4, 2, 3]
console.log(toArray(reorderList(build([1, 2, 3, 4, 5])))); // [1, 5, 2, 4, 3]`,
            output: `[ 1, 4, 2, 3 ]
[ 1, 5, 2, 4, 3 ]`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Add 1 to a Number Represented as Linked List',
            problem: 'A non-negative number is stored as a linked list of digits with the most significant digit first. Add one to the number and return the head of the resulting list.',
            examples: `Input:  1 -> 2 -> 3
Output: 1 -> 2 -> 4
Explanation: 123 + 1 = 124.

Input:  9 -> 9 -> 9
Output: 1 -> 0 -> 0 -> 0
Explanation: 999 + 1 = 1000, which needs an extra leading digit.`,
            approach: 'Reverse the list so the least significant digit comes first, add one while propagating carry, then reverse back. If a carry remains after the most significant digit, prepend a new node.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

function reverse(head) {
  let prev = null;
  while (head) { const n = head.next; head.next = prev; prev = head; head = n; }
  return prev;
}

function addOne(head) {
  head = reverse(head);
  let carry = 1;
  let curr = head;
  let last = head;
  while (curr) {
    const sum = curr.val + carry;
    curr.val = sum % 10;
    carry = Math.floor(sum / 10);
    last = curr;
    curr = curr.next;
  }
  if (carry) last.next = new Node(carry);
  return reverse(head);
}

// Driver Code
function build(arr) {
  const dummy = new Node(0);
  let t = dummy;
  for (const v of arr) { t.next = new Node(v); t = t.next; }
  return dummy.next;
}
function toArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}
console.log(toArray(addOne(build([1, 2, 3])))); // [1, 2, 4]
console.log(toArray(addOne(build([9, 9, 9])))); // [1, 0, 0, 0]`,
            output: `[ 1, 2, 4 ]
[ 1, 0, 0, 0 ]`,
            complexity: 'Time O(n), Space O(1).'
        },
        {
            title: 'Clone a Linked List',
            problem: 'Given a linked list where each node has a next pointer and a random pointer that may point to any node or null, build a deep copy of the list and return its head.',
            examples: `Input:  nodes [1, 2, 3] where 1.random -> 3, 2.random -> 1, 3.random -> 3
Output: an identical list of new nodes with the same value and random structure
Explanation: The copy must not share any node object with the original.

Input:  empty list
Output: null
Explanation: Cloning nothing yields nothing.`,
            approach: 'Map each original node to its copy using a hash map in one pass, then a second pass wires up the next and random pointers of the copies by looking up the mapped clones.',
            solution: `class Node {
  constructor(val) { this.val = val; this.next = null; this.random = null; }
}

function cloneList(head) {
  if (!head) return null;
  const map = new Map();
  let curr = head;
  while (curr) { map.set(curr, new Node(curr.val)); curr = curr.next; }
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    copy.next = curr.next ? map.get(curr.next) : null;
    copy.random = curr.random ? map.get(curr.random) : null;
    curr = curr.next;
  }
  return map.get(head);
}

// Driver Code
const n1 = new Node(1), n2 = new Node(2), n3 = new Node(3);
n1.next = n2; n2.next = n3;
n1.random = n3; n2.random = n1; n3.random = n3;
const copy = cloneList(n1);
console.log(copy.val, copy.next.val, copy.random.val); // 1 2 3
console.log(copy === n1); // false (deep copy)`,
            output: `1 2 3
false`,
            complexity: 'Time O(n), Space O(n).'
        }
    ]
}
