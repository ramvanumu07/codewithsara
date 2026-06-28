/**
 * DSA topic: Graph (notes-only).
 */
export default {
    id: 'dsa-graph',
    title: 'Graph',
    description: 'Graph interview questions with explanations and reference solutions.',
    intro: 'BFS/DFS, cycle detection, connectivity, and topological ordering problems.',
    questions: [
        {
            title: 'Clone Graph',
            problem: 'Given a reference to a node in a connected undirected graph, return a deep copy of the whole graph. Each node holds a value and a list of neighbours.',
            examples: `Input:  graph with nodes 1-2-3-4 in a square (1-2, 2-3, 3-4, 4-1)
Output: an identical graph made of brand new node objects
Explanation: The copy preserves values and adjacency without sharing objects.

Input:  a single node with no neighbours
Output: a new single node with an empty neighbour list
Explanation: Cloning an isolated node yields one new node.`,
            approach: 'Traverse with BFS or DFS while keeping a map from each original node to its clone. When visiting a node, create its clone if absent, then connect cloned neighbours by looking them up (creating them on demand) in the map.',
            solution: `class GraphNode {
  constructor(val) { this.val = val; this.neighbors = []; }
}

function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const copy = new GraphNode(n.val);
    map.set(n, copy);
    for (const nb of n.neighbors) copy.neighbors.push(dfs(nb));
    return copy;
  }
  return dfs(node);
}

// Driver Code
const n1 = new GraphNode(1), n2 = new GraphNode(2), n3 = new GraphNode(3), n4 = new GraphNode(4);
n1.neighbors = [n2, n4]; n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4]; n4.neighbors = [n3, n1];
const copy = cloneGraph(n1);
console.log(copy.val, copy.neighbors.map(n => n.val)); // 1 [2, 4]
console.log(copy === n1); // false`,
            output: `1 [ 2, 4 ]
false`,
            complexity: 'Time O(V + E), Space O(V).'
        },
        {
            title: 'Course Schedule',
            problem: 'Given numCourses courses labelled 0..n-1 and a list of prerequisite pairs [a, b] meaning b must be taken before a, determine whether it is possible to finish all courses.',
            examples: `Input:  numCourses = 2, prerequisites = [[1, 0]]
Output: true
Explanation: Take course 0 then course 1.

Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: false
Explanation: The two courses depend on each other, forming a cycle.`,
            approach: 'The courses form a directed graph; finishing all of them is possible exactly when the graph has no cycle. Compute in-degrees and run Kahn topological sort: repeatedly remove zero-in-degree nodes. If every node is removed, there is no cycle.',
            solution: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let seen = 0;
  while (queue.length) {
    const node = queue.shift();
    seen++;
    for (const next of adj[node]) {
      if (--indeg[next] === 0) queue.push(next);
    }
  }
  return seen === numCourses;
}

// Driver Code
console.log(canFinish(2, [[1, 0]]));         // true
console.log(canFinish(2, [[1, 0], [0, 1]])); // false`,
            output: `true
false`,
            complexity: 'Time O(V + E), Space O(V + E).'
        },
        {
            title: 'Pacific Atlantic Water Flow',
            problem: 'Given a grid of heights, water flows from a cell to neighbours of equal or lower height. The Pacific touches the top and left edges, the Atlantic the bottom and right edges. Return all cells from which water can reach both oceans.',
            examples: `Input:  heights = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
Output: cells such as [0,4], [1,3], [1,4], [2,2], [3,0], [3,1], [4,0]
Explanation: From each listed cell water can descend to both oceans.

Input:  heights = [[1]]
Output: [[0, 0]]
Explanation: The single cell borders both oceans.`,
            approach: 'Instead of simulating outward flow from every cell, reverse it: from each ocean edge, DFS uphill to cells that can drain into that ocean. Cells reachable from both ocean searches are the answer.',
            solution: `function pacificAtlantic(heights) {
  if (!heights.length) return [];
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));

  function dfs(r, c, visited, prev) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (visited[r][c] || heights[r][c] < prev) return;
    visited[r][c] = true;
    dfs(r + 1, c, visited, heights[r][c]);
    dfs(r - 1, c, visited, heights[r][c]);
    dfs(r, c + 1, visited, heights[r][c]);
    dfs(r, c - 1, visited, heights[r][c]);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, -Infinity);
    dfs(r, cols - 1, atl, -Infinity);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, -Infinity);
    dfs(rows - 1, c, atl, -Infinity);
  }

  const res = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}

// Driver Code
console.log(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]).length); // 7
console.log(pacificAtlantic([[1]])); // [[0, 0]]`,
            output: `7
[ [ 0, 0 ] ]`,
            complexity: 'Time O(m*n), Space O(m*n).'
        },
        {
            title: 'Number of Islands',
            problem: 'Given a 2D grid of 1s (land) and 0s (water), count the number of islands. An island is a maximal group of land cells connected horizontally or vertically.',
            examples: `Input:  grid = [['1','1','0','0'], ['1','0','0','1'], ['0','0','1','1']]
Output: 2
Explanation: One island top-left, one bottom-right.

Input:  grid = [['1','1','1'], ['1','1','1']]
Output: 1
Explanation: All land is connected into a single island.`,
            approach: 'Scan every cell; when an unvisited land cell is found, increment the island count and flood-fill (DFS or BFS) all connected land, marking it visited so it is not counted again.',
            solution: `function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function sink(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    sink(r + 1, c); sink(r - 1, c);
    sink(r, c + 1); sink(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; sink(r, c); }
    }
  }
  return count;
}

// Driver Code
console.log(numIslands([['1','1','0','0'], ['1','0','0','1'], ['0','0','1','1']])); // 2
console.log(numIslands([['1','1','1'], ['1','1','1']]));                            // 1`,
            output: `2
1`,
            complexity: 'Time O(m*n), Space O(m*n) recursion worst case.'
        },
        {
            title: 'Snake and Ladder Problem',
            problem: 'Given a board of n*n cells numbered in boustrophedon order with snakes and ladders, find the minimum number of dice throws needed to reach the last cell from the first.',
            examples: `Input:  30-cell board with ladders 2->21, 4->7, 10->25, 19->28 and snakes 26->0, 20->8, 24->16, 23->18
Output: 3
Explanation: A shortest sequence of dice rolls reaches cell 30 in 3 throws.

Input:  board with no snakes or ladders, n = 6 (36 cells)
Output: 7
Explanation: Each roll covers at most 6 cells, so 35 steps need ceil(35/6) = 7 throws.`,
            approach: 'Model cells as graph nodes; from any cell a dice roll connects to the next six cells (after applying any snake or ladder). The fewest throws is the shortest path, found with BFS from cell 0.',
            solution: `function minDiceThrows(n, jumps) {
  // jumps: map from cell -> destination (snakes and ladders)
  const visited = new Array(n).fill(false);
  const queue = [[0, 0]]; // [cell, throws]
  visited[0] = true;
  while (queue.length) {
    const [cell, throws] = queue.shift();
    if (cell === n - 1) return throws;
    for (let d = 1; d <= 6 && cell + d < n; d++) {
      let next = cell + d;
      if (jumps[next] !== undefined) next = jumps[next];
      if (!visited[next]) { visited[next] = true; queue.push([next, throws + 1]); }
    }
  }
  return -1;
}

// Driver Code
const jumps = { 2: 21, 4: 7, 10: 25, 19: 28, 26: 0, 20: 8, 24: 16, 23: 18 };
console.log(minDiceThrows(30, jumps)); // 3
console.log(minDiceThrows(36, {}));    // 7`,
            output: `3
7`,
            complexity: 'Time O(n), Space O(n).'
        },
        {
            title: 'Detect Cycle in a Directed Graph',
            problem: 'Given a directed graph, determine whether it contains a cycle.',
            examples: `Input:  4 nodes, edges = [[0, 1], [1, 2], [2, 0], [2, 3]]
Output: true
Explanation: 0 -> 1 -> 2 -> 0 forms a cycle.

Input:  3 nodes, edges = [[0, 1], [1, 2]]
Output: false
Explanation: The graph is a simple chain with no cycle.`,
            approach: 'Run DFS while tracking nodes currently on the recursion stack. If DFS reaches a node that is already in the current recursion path, a back edge and therefore a cycle exists. A separate visited set avoids reprocessing finished nodes.',
            solution: `function hasCycleDirected(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) adj[u].push(v);

  const visited = new Array(n).fill(false);
  const inStack = new Array(n).fill(false);

  function dfs(node) {
    visited[node] = true;
    inStack[node] = true;
    for (const next of adj[node]) {
      if (!visited[next] && dfs(next)) return true;
      if (inStack[next]) return true;
    }
    inStack[node] = false;
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i] && dfs(i)) return true;
  }
  return false;
}

// Driver Code
console.log(hasCycleDirected(4, [[0, 1], [1, 2], [2, 0], [2, 3]])); // true
console.log(hasCycleDirected(3, [[0, 1], [1, 2]]));                 // false`,
            output: `true
false`,
            complexity: 'Time O(V + E), Space O(V).'
        },
        {
            title: 'Bridges in a Graph',
            problem: 'Given an undirected connected graph, find all bridges: edges whose removal increases the number of connected components.',
            examples: `Input:  5 nodes, edges = [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]]
Output: [[1, 3], [3, 4]]
Explanation: Removing either edge disconnects part of the graph; the triangle 0-1-2 has no bridges.

Input:  2 nodes, edges = [[0, 1]]
Output: [[0, 1]]
Explanation: The only edge is a bridge.`,
            approach: "Run a DFS assigning each node a discovery time and a low-link value (the earliest reachable discovery time). An edge (u, v) is a bridge when v's low-link exceeds u's discovery time, meaning v's subtree has no back edge bypassing the edge.",
            solution: `function findBridges(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const bridges = [];
  let timer = 0;

  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    for (const v of adj[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([u, v]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}

// Driver Code
console.log(findBridges(5, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]])); // [[1, 3], [3, 4]]
console.log(findBridges(2, [[0, 1]]));                                 // [[0, 1]]`,
            output: `[ [ 1, 3 ], [ 3, 4 ] ]
[ [ 0, 1 ] ]`,
            complexity: 'Time O(V + E), Space O(V).'
        },
        {
            title: 'Check for Bipartite',
            problem: 'Given an undirected graph, determine whether it is bipartite: whether its vertices can be split into two groups so that every edge connects vertices from different groups.',
            examples: `Input:  4 nodes, edges = [[0, 1], [1, 2], [2, 3], [3, 0]]
Output: true
Explanation: An even cycle can be two-coloured.

Input:  3 nodes, edges = [[0, 1], [1, 2], [2, 0]]
Output: false
Explanation: An odd cycle cannot be two-coloured.`,
            approach: 'Try to two-colour the graph with BFS or DFS. Colour a start node, then give every neighbour the opposite colour. If an edge ever connects two same-coloured nodes, the graph is not bipartite.',
            solution: `function isBipartite(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

  const color = new Array(n).fill(-1);
  for (let start = 0; start < n; start++) {
    if (color[start] !== -1) continue;
    color[start] = 0;
    const queue = [start];
    while (queue.length) {
      const node = queue.shift();
      for (const next of adj[node]) {
        if (color[next] === -1) {
          color[next] = color[node] ^ 1;
          queue.push(next);
        } else if (color[next] === color[node]) {
          return false;
        }
      }
    }
  }
  return true;
}

// Driver Code
console.log(isBipartite(4, [[0, 1], [1, 2], [2, 3], [3, 0]])); // true
console.log(isBipartite(3, [[0, 1], [1, 2], [2, 0]]));         // false`,
            output: `true
false`,
            complexity: 'Time O(V + E), Space O(V).'
        },
        {
            title: 'Largest Region in Boolean Matrix',
            problem: 'Given a binary matrix, find the size of the largest region of connected 1s, where cells connect horizontally, vertically or diagonally (eight directions).',
            examples: `Input:  matrix = [[0, 0, 1, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 1]]
Output: 6
Explanation: The cluster of connected 1s in the top region has size 6.

Input:  matrix = [[1, 0], [0, 1]]
Output: 2
Explanation: The two 1s touch diagonally, forming one region of size 2.`,
            approach: 'Scan each cell; on an unvisited 1, run an eight-directional DFS that counts all connected 1s, marking them visited. Track the maximum region size encountered.',
            solution: `function largestRegion(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  let best = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || matrix[r][c] !== 1) return 0;
    matrix[r][c] = 0;
    let size = 1;
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++)
        if (dr || dc) size += dfs(r + dr, c + dc);
    return size;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (matrix[r][c] === 1) best = Math.max(best, dfs(r, c));
  return best;
}

// Driver Code
console.log(largestRegion([[0, 0, 1, 1, 0], [1, 0, 1, 1, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 1]])); // 6
console.log(largestRegion([[1, 0], [0, 1]])); // 2`,
            output: `6
2`,
            complexity: 'Time O(m*n), Space O(m*n) recursion worst case.'
        },
        {
            title: 'Flood Fill Algorithm',
            problem: 'Given an image as a grid of pixel colours, a starting pixel and a new colour, recolour the starting pixel and all connected pixels of the same original colour (four-directionally).',
            examples: `Input:  image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr = 1, sc = 1, newColor = 2
Output: [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
Explanation: The connected region of 1s around (1,1) becomes 2.

Input:  image = [[0, 0, 0], [0, 0, 0]], sr = 0, sc = 0, newColor = 5
Output: [[5, 5, 5], [5, 5, 5]]
Explanation: The whole same-coloured region is recoloured.`,
            approach: 'Record the original colour at the start pixel. DFS or BFS outward, recolouring every connected pixel that matches the original colour. Guard against infinite recursion when the new colour equals the original.',
            solution: `function floodFill(image, sr, sc, newColor) {
  const original = image[sr][sc];
  if (original === newColor) return image;
  const rows = image.length, cols = image[0].length;
  function fill(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || image[r][c] !== original) return;
    image[r][c] = newColor;
    fill(r + 1, c); fill(r - 1, c);
    fill(r, c + 1); fill(r, c - 1);
  }
  fill(sr, sc);
  return image;
}

// Driver Code
console.log(floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2));
console.log(floodFill([[0, 0, 0], [0, 0, 0]], 0, 0, 5));`,
            output: `[ [ 2, 2, 2 ], [ 2, 2, 0 ], [ 2, 0, 1 ] ]
[ [ 5, 5, 5 ], [ 5, 5, 5 ] ]`,
            complexity: 'Time O(m*n), Space O(m*n) recursion worst case.'
        },
        {
            title: 'Strongly Connected Components',
            problem: 'Given a directed graph, count its strongly connected components: maximal groups of vertices where every vertex is reachable from every other vertex in the same group.',
            examples: `Input:  5 nodes, edges = [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]]
Output: 3
Explanation: {0,1,2} form one component; {3} and {4} are singletons.

Input:  3 nodes, edges = [[0, 1], [1, 2], [2, 0]]
Output: 1
Explanation: All three nodes are mutually reachable.`,
            approach: "Use Kosaraju's algorithm: do a DFS pushing nodes onto a stack in order of finish time, transpose the graph (reverse all edges), then pop nodes and DFS in the transposed graph. Each DFS in the second pass discovers one strongly connected component.",
            solution: `function countSCC(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const radj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); radj[v].push(u); }

  const visited = new Array(n).fill(false);
  const order = [];
  function dfs1(u) {
    visited[u] = true;
    for (const v of adj[u]) if (!visited[v]) dfs1(v);
    order.push(u);
  }
  for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);

  visited.fill(false);
  function dfs2(u) {
    visited[u] = true;
    for (const v of radj[u]) if (!visited[v]) dfs2(v);
  }
  let count = 0;
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!visited[u]) { dfs2(u); count++; }
  }
  return count;
}

// Driver Code
console.log(countSCC(5, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]])); // 3
console.log(countSCC(3, [[0, 1], [1, 2], [2, 0]]));                 // 1`,
            output: `3
1`,
            complexity: 'Time O(V + E), Space O(V + E).'
        },
        {
            title: 'Topological Sorting',
            problem: 'Given a directed acyclic graph, return a topological ordering of its vertices: a linear order in which every directed edge u -> v has u appearing before v.',
            examples: `Input:  6 nodes, edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]
Output: a valid order such as [4, 5, 2, 3, 1, 0]
Explanation: Every edge points from an earlier to a later vertex in the order.

Input:  3 nodes, edges = [[0, 1], [1, 2]]
Output: [0, 1, 2]
Explanation: The chain dictates a single ordering.`,
            approach: "Use Kahn's algorithm: compute in-degrees, start a queue with all zero-in-degree vertices, and repeatedly remove a vertex, append it to the order, and decrement its neighbours' in-degrees, enqueuing any that reach zero.",
            solution: `function topologicalSort(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indeg = new Array(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); indeg[v]++; }

  const queue = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);

  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) queue.push(v);
  }
  return order;
}

// Driver Code
console.log(topologicalSort(6, [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]));
console.log(topologicalSort(3, [[0, 1], [1, 2]])); // [0, 1, 2]`,
            output: `[ 4, 5, 2, 0, 3, 1 ]
[ 0, 1, 2 ]`,
            complexity: 'Time O(V + E), Space O(V + E).'
        }
    ]
}
