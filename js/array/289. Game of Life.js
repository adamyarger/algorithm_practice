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
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = build(board, i, j)
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = Math.abs(board[i][j] % 2)
    }
  }
};

function build(board, row, col) {
  const neighbors = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col + 1],
    [row + 1, col + 1],
    [row + 1, col],
    [row + 1, col - 1],
    [row, col - 1],
  ]
  let isLive = board[row][col] === 1

  let liveCnt = neighbors.filter(([row, col]) => {
    return row >= 0
      && col >= 0
      && row < board.length
      && col < board[0].length
      && board[row][col] >= 1
  }).length

  // return its next state
  if (isLive) {
    if (liveCnt < 2 || liveCnt > 3) {
      return 2
    }
  } else if (liveCnt === 3) {
    return -1
  }

  return board[row][col]
}

var board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]
gameOfLife(board)
console.log(board)