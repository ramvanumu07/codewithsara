/**
 * DSA topic: Matrix (notes-only).
 */
export default {
    id: 'dsa-matrix',
    title: 'Matrix',
    description: 'Matrix interview questions with explanations and reference solutions.',
    intro: 'Common matrix traversal and search problems.',
    questions: [
        {
            title: 'Spiral Matrix',
            problem: 'Given an m x n matrix, return all of its elements in spiral order, starting from the top-left corner and moving clockwise.',
            examples: `Input:  matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
Explanation: Walk the outer ring clockwise, then the inner cell.

Input:  matrix = [[1, 2, 3, 4], [5, 6, 7, 8]]
Output: [1, 2, 3, 4, 8, 7, 6, 5]
Explanation: Top row left-to-right, right column down, bottom row right-to-left.`,
            approach: 'Maintain four boundaries: top, bottom, left and right. Repeatedly traverse the top row, right column, bottom row and left column, shrinking the corresponding boundary after each pass, until the boundaries cross.',
            solution: `function spiralOrder(matrix) {
  const res = [];
  if (matrix.length === 0) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}

// Driver Code
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8]]));`,
            output: `[ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]
[ 1, 2, 3, 4, 8, 7, 6, 5 ]`,
            complexity: 'Time O(m*n), Space O(1) excluding the output.'
        },
        {
            title: 'Transpose of a Matrix',
            problem: 'Given a matrix, return its transpose, where the element at row i and column j moves to row j and column i.',
            examples: `Input:  matrix = [[1, 2, 3], [4, 5, 6]]
Output: [[1, 4], [2, 5], [3, 6]]
Explanation: A 2x3 matrix becomes a 3x2 matrix.

Input:  matrix = [[1, 2], [3, 4]]
Output: [[1, 3], [2, 4]]
Explanation: The diagonal stays fixed while off-diagonal cells swap.`,
            approach: 'Create a new matrix with swapped dimensions: rows become columns. Copy each element from position (i, j) of the input to position (j, i) of the result. For a square matrix this can also be done in place by swapping across the main diagonal.',
            solution: `function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const res = Array.from({ length: cols }, () => new Array(rows));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      res[j][i] = matrix[i][j];
    }
  }
  return res;
}

// Driver Code
console.log(transpose([[1, 2, 3], [4, 5, 6]]));
console.log(transpose([[1, 2], [3, 4]]));`,
            output: `[ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
[ [ 1, 3 ], [ 2, 4 ] ]`,
            complexity: 'Time O(m*n), Space O(m*n) for the new matrix.'
        },
        {
            title: 'Word Search',
            problem: 'Given a 2D grid of characters and a target word, determine whether the word can be formed from sequentially adjacent cells (horizontally or vertically). The same cell may not be used more than once in a single match.',
            examples: `Input:  grid = [['A','B','C','E'], ['S','F','C','S'], ['A','D','E','E']], word = "ABCCED"
Output: true
Explanation: A path A-B-C-C-E-D exists through adjacent cells.

Input:  grid = [['A','B'], ['C','D']], word = "ABDC"
Output: true
Explanation: A(0,0) -> B(0,1) -> D(1,1) -> C(1,0) are all adjacent.`,
            approach: 'Run a depth-first search from every cell that matches the first letter. At each step mark the current cell visited, try the four neighbours for the next letter, and backtrack (restore the cell) when a branch fails. Success when every letter is matched.',
            solution: `function exist(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
    if (grid[r][c] !== word[i]) return false;

    const temp = grid[r][c];
    grid[r][c] = '#';
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    grid[r][c] = temp;
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

// Driver Code
console.log(exist([['A','B','C','E'], ['S','F','C','S'], ['A','D','E','E']], 'ABCCED')); // true
console.log(exist([['A','B'], ['C','D']], 'ABDC')); // true`,
            output: `true
true`,
            complexity: 'Time O(m*n*4^L) where L is the word length, Space O(L) recursion depth.'
        }
    ]
}
