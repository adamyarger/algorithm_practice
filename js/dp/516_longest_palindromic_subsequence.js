/**
 *
 * Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.



Example 1:

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
Example 2:

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
 */

/**
 * @param {string} s
 * @return {number}
 - if start letter and end letter are equal move in start and end pointers to the middle
 - stop if pointers cross over eachother
 - if size is 1 return 1
 - if siz


 if start and end are equal move both in wards
 if crossover return weve gone through them all reutnr answer

  if length is 1 return 1 since 1 is a palinfrome

  if not mathcing try moving one in and try moving the other in
  return which ever is larger
 */
var longestPalindromeSubseq = function (s) {
  const memo = Array(s.length).fill(-1).map(_ => Array(s.length).fill(-1))
  return dfs(memo, s, 0, s.length - 1)
};

function dfs(memo, s, left, right) {
  // weve reached the leaf return 0 to start counting
  if (left > right) return 0

  // only 1 left
  if (left === right) return 1

  if (memo[left][right] === -1) {
    if (s[left] === s[right]) {
      memo[left][right] = dfs(memo, s, left + 1, right - 1) + 2
    } else {
      memo[left][right] = Math.max(
        dfs(memo, s, left + 1, right),
        dfs(memo, s, left, right - 1)
      )
    }
  }

  return memo[left][right]
}

console.log(longestPalindromeSubseq('bbbab'))


/**
 *
 * for bottom up we use the same string for x and y axis but we reverse one of them
 * this way its like comparing the start and end against one another
 * the traversing will be movinf up left to right
 * the middle diagonal cells will all be 0
 */