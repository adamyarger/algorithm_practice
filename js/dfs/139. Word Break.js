



/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 
 need whole s word to be used broken up by spaces
 can reuse the same word
 
 ideas:
 trie for lookup of dict words
 create a trie fill it with wordDict then iterate through s
 
 
 */
var wordBreak = function (s, wordDict) {
  const memo = new Map()
  const set = new Set(wordDict)
  return dfs(set, s, memo)
};

function dfs(set, s, memo) {
  // see if it worked before
  if (memo.has(s)) return memo.get(s)

  // if all thats left in s can be found in set then were done
  if (set.has(s)) return true

  for (let i = 0; i < s.length; i++) {
    // test if the current substring exists as a word
    if (set.has(s.substring(0, i)) && dfs(set, s.substring(i, s.length), memo)) {
      memo.set(s, true)
      return true
    }
  }

  memo.set(s, false)
  return false
}

var s = "leetcode", wordDict = ["leet", "code"]
// console.log(wordBreak(s, wordDict))


var s = "cars", wordDict = ["car", "ca", "rs"]
console.log(wordBreak(s, wordDict))