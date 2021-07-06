/**
 * Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by
deleting some or no elements without changing the order of the remaining elements.

Example 1:

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
Example 2:

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".

Time Complexity: O(N2) because memoization array, memo[len(s)][len(s)]. We will not have more than N*N subsequences.

Space Complexity: O(N2 + N) == O(N2) because we used N2 for memoization array and N for recursive stack.
 */


/**
 * start with pointers at start and end
 * if both end match move both in and add 2
 * if 1 return 1
 * @param {*} s 
 */
var longestPalindromeSubseq = function (s) {
  const len = s.length
  const memo = Array(len).fill(-1).map(() => Array(len).fill(-1))
  return recur(memo, s, 0, len - 1)
};

function recur(memo, s, start, end) {
  if (start > end) {
    return 0
  }

  if (start == end) {
    return 1
  }

  if (memo[start][end] === -1) {
    if (s[start] === s[end]) {
      memo[start][end] = 2 + recur(memo, s, start + 1, end - 1)
    } else {
      // move left forward and recur
      // move right forward and recur
      // choose the max
      // we dont add anything here since it breaks the palindrome chain
      const left = recur(memo, s, start + 1, end)
      const right = recur(memo, s, start, end - 1)
      memo[start][end] = Math.max(left, right)
    }
  }
  return memo[start][end]
}

console.log(longestPalindromeSubseq('baccbb'))