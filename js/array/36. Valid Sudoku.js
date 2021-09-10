/**
 * @param {character[][]} board
 * @return {boolean}
 
 - only filled cells need to be validated
 - make sure theres no duplicates in 3 different ways
 - check row
 - check col
 - check box with modulo
 
 
 */
var isValidSudoku = function (board) {
  for (let i = 0; i < board.length; i++) {
    // create sets
    // this will happen 9 times (9 sqaures, cols, and rows)
    const rows = new Set()
    const cols = new Set()
    const boxes = new Set()
    console.log('------')

    for (let j = 0; j < board[0].length; j++) {
      let row = board[i][j]
      let col = board[j][i]

      let vert = 3 * Math.floor(i / 3) + Math.floor(j / 3)
      let hor = 3 * (i % 3) + (j % 3)
      let boxes

      console.log(box_row, box_col, board[vert][hor])
    }
  }

  return true
};

var board = [["8", "3", ".", ".", "7", ".", ".", ".", "."],
["6", ".", ".", "1", "9", "5", ".", ".", "."],
[".", "9", "8", ".", ".", ".", ".", "6", "."],
["8", ".", ".", ".", "6", ".", ".", ".", "3"],
["4", ".", ".", "8", ".", "3", ".", ".", "1"],
["7", ".", ".", ".", "2", ".", ".", ".", "6"],
[".", "6", ".", ".", ".", ".", "2", "8", "."],
[".", ".", ".", "4", "1", "9", ".", ".", "5"],
[".", ".", ".", ".", "8", ".", ".", "7", "9"]]

console.log(isValidSudoku(board))