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
  for (let row = 0; row < board.length; row++) {
    const rows = new Set()
    const cols = new Set()
    const boxes = new Set()

    for (let col = 0; col < board[0].length; col++) {
      let _row = board[row][col]
      let _col = board[col][row]
      let _box = board[3 * Math.floor(row / 3) + Math.floor(col / 3)][3 * (row % 3) + (col % 3)]

      if (_row != '.') {
        if (rows.has(_row)) return false
        rows.add(_row)
      }

      if (_col != '.') {
        if (cols.has(_col)) return false
        cols.add(_col)
      }

      if (_box != '.') {
        if (boxes.has(_box)) return false
        boxes.add(_box)
      }
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