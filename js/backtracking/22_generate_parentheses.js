/**
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.



Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 */


/**
 * @param {number} n
 * @return {string[]}
 * 
 * 
 * its a combination problem with backtrakcing
 * what is combination
 * 
 * how do we track well formedness?
 * its out of line if there  are more right parans than left
 * base case add === of right and left are exhausted
 * 
 * n pairs = ()()()
 * 
 * 
 * keep track our res aray
 * backtrack function with left right string
 * since we start with an opening ( should always be bigger than or equal to closing
 * if l is 0 and right is 0 we found a match
 */
var generateParenthesis = function (n) {
  const out = []

  function dfs(left, right, str) {
    // 2 bases cases  one if we go over board aka more right than left
    // since left begins there should always b more or equal amount

    // this is about whats left not what weve added
    if (left > right) return

    // other case if we used them all
    // that means add it to out
    if (right === 0 && left === 0) {
      out.push(str)
      return
    }

    // try both ways
    if (left) {
      dfs(left - 1, right, str + '(')
    }

    if (right) {
      dfs(left, right - 1, str + ')')
    }
  }

  dfs(n, n, '')

  return out
};

console.log(generateParenthesis(3))