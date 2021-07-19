/**
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.



Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 */



/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 * 
 * no repeating cell in a word
 * 
 * similar to word search expcept we need to return all
 * 
 * do it brute force with backtracking
 * 
 * but since were repeating finding words again could we use dynamic programming?
 * 
 * the reason we cant find all words at once is the chance of overlapping
 * what if we changed them to uppercase we found in a word
 * if we can tell the dofference but still compare we can tell it when to discount
 * 
 * how could we use a trie?
 */
var findWords = function (board, words) {
  // loop through matrix
  const found = []
  words.forEach(word => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (word[0] === board[row][col] && dfs(board, row, col, word) && !found.includes(word)) {
          found.push(word)
        }
      }
    }
  })
  return found
};

// should it be 1 word passed in?
// is there a recurrance? can we memo?
function dfs(board, row, col, word) {
  // base case for out of bounds
  if (word.length === 0) return true

  if (row < 0 || col < 0 || row >= board.length || col >= board[0].length || word[0] !== board[row][col]) return false

  // anything beyonf here is a match
  let char = word[0]
  let newWord = word.substr(1)
  board[row][col] = '#'

  // search 4 ways
  const result = dfs(board, row + 1, col, newWord)
    || dfs(board, row - 1, col, newWord)
    || dfs(board, row, col + 1, newWord)
    || dfs(board, row, col - 1, newWord)

  board[row][col] = char
  return result
}


var board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"]
]
var words = ["oath", "pea", "eat", "rain"]

// console.log(findWords(board, words))

board = [
  ["o", "a", "b", "n"],
  ["o", "t", "a", "e"],
  ["a", "h", "k", "r"],
  ["a", "f", "l", "v"]
]
words = ["oa", "oaa"]
console.log(findWords(board, words))
