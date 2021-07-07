/**
 * 
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.



Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 
 - same cell cant be used again = track cell usage with matrix
 - search horizontal and vertical = 4 ways
 
 - create loop to find starting letter
 - if we find the first letter do a depth first search 4 ways
 */
var exist = function (board, word) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (dfs(board, word, row, col)) {
        return true
      }
    }
  }

  return false
};

function isOutOfBounds(board, row, col) {
  return row < 0 || col < 0 || row >= board.length || col >= board[0].length
}

// subtrack from the word, then we dont need a visited
// this is just like the backtracking permutations where we take away candidates
function dfs(board, word, row, col) {
  // Check bases cases
  if (!word.length) return true // we found it
  // now that were popping off the front char were always looking to match the first char
  if (isOutOfBounds(board, row, col) || board[row][col] !== word[0]) return false

  // take away a candidate
  const curChar = board[row][col]
  const newWord = word.substr(1)

  // disable the current char (just like count number of islands)
  board[row][col] = '#'

  const results = dfs(board, newWord, row + 1, col)
    || dfs(board, newWord, row, col + 1)
    || dfs(board, newWord, row - 1, col)
    || dfs(board, newWord, row, col - 1)

  // this is the backtracking, just like arr.pop()
  // but why?
  board[row][col] = curChar

  return results
}


const board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
const word = "ABCCED"

const board2 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
const word2 = "ABCB"

const board3 = [["A", "B", "C", "E"], ["S", "F", "E", "S"], ["A", "D", "E", "E"]]
const word3 = "ABCESEEEFS"

console.log(exist(board, word))
console.log(exist(board2, word2))
console.log(exist(board3, word3))