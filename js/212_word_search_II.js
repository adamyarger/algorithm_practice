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
 * how could we use a trie? trie is for caching on each word search
 * https://leetcode.com/problems/word-search-ii/discuss/138279/Clean-JavaScript-solution
 */
var findWords = function (board, words) {
  // loop through matrix
  // acts similar to backtracking with out
  const found = []
  const root = buildTrie(words)

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      dfs(board, row, col, root, found)
    }
  }
  return found
};

// should it be 1 word passed in?
// is there a recurrance? can we memo?
function dfs(board, row, col, node, found) {
  // couldnt we get a false positive here half way through a word?
  if (node.end) { // found it
    found.push(node.end)
    // ensure its only printed once
    node.end = null
  }

  // boundries
  if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) return
  // the char is not set in the true
  if (!node[board[row][col]]) return

  // anything beyond here is a match
  let char = board[row][col]
  // dont repeat
  board[row][col] = '#'

  // search 4 ways
  // instaed of popping of chars from a single word we created a trie that tracks all the words
  // were just moving through the try and seeing if the word exists
  dfs(board, row + 1, col, node[char], found)
  dfs(board, row - 1, col, node[char], found)
  dfs(board, row, col + 1, node[char], found)
  dfs(board, row, col - 1, node[char], found)

  board[row][col] = char
  // return result
}

function buildTrie(words) {
  const root = {}
  for (const word of words) {
    let pointer = root

    for (const char of word) {
      if (!pointer[char]) pointer[char] = {}
      // set pointer to curent node for next iteration
      pointer = pointer[char]
    }
    // at end of word set end property to the word
    pointer.end = word
  }
  return root
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
  ["o", "a", "o", "a"],
  ["o", "t", "a", "e"],
  ["a", "h", "k", "r"],
  ["a", "f", "l", "v"]
]
words = ["oa", "oaa", "oaoa"]
console.log(findWords(board, words))
