/**
 * 289. Game of Life
Medium

3138

364

Add to List

Share
According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0).
Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.



Example 1:


Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
Example 2:


Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
 */

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 * 
 * - is the cell currently dead or alive?
 * - will the cell be dead or alive next gen?
 * - need a way to mark current state and next state at the same time
 * 
 * dead to alive = -1
 * dead to dead = 0
 * alive to dead = 2
 * alive to alive = 1
 * 
 * using  cell % 2 turns them into their proper values
 */
var gameOfLife = function (board) {
  // update for next iteration
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      board[row][col] = bfs(board, row, col)
    }
  }

  // translate back to 1's and 0's
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      board[row][col] = Math.abs(board[row][col] % 2)
    }
  }
};

function bfs(board, row, col) {
  let isDead = board[row][col] === 0
  let liveCellCnt = 0
  const moves = [
    [row - 1, col - 1], // top-left
    [row - 1, col], // top-mid
    [row - 1, col + 1], // top-right
    [row, col + 1], // right
    [row + 1, col + 1], // bottom-right
    [row + 1, col], // bottom-mid
    [row + 1, col - 1], // bottom-left
    [row, col - 1], // left
  ]

  // loops through moves for current cell
  for (let i = 0; i < moves.length; i++) {
    const [irow, icol] = moves[i]

    // why >= 1??? means cell is alive now
    if (isInBounds(board, irow, icol) && board[irow][icol] >= 1) {
      liveCellCnt += 1
    }
  }

  if (isDead) {
    // dead to alive
    if (liveCellCnt === 3) return -1

    // dead to dead
    return 0
  } else {
    // alive to dead
    if (liveCellCnt < 2 || liveCellCnt > 3) return 2

    // alive to alive
    else if (liveCellCnt === 2 || liveCellCnt === 3) return 1
  }
}

function isInBounds(board, row, col) {
  return row >= 0
    && col >= 0
    && row < board.length
    && col < board[0].length
}

var board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]
gameOfLife(board)
console.log(board)