/**
 * Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.



Example 1:


Input: n = 3
Output: 5
Example 2:

Input: n = 1
Output: 1
 */

/**
 * @param {number} n
 * @return {number}
 * 
 * only 2 paths
 * 
 * the values are not the permutation
 * left and right are the permutations
 * 
 * left left
 * 
 */
var numTrees = function (n) {
  const memo = {}
  return dfs(memo, n)
};

function dfs(memo, n) {
  // return 1 for multiplication
  if (n <= 1) return 1

  let total = 0

  if (memo[n]) return memo[n]

  // i is the root val, this shifts what nodes are allowed on the left and right side
  for (let i = 1; i <= n; i++) {
    // i = 3 means all nodes fit on left side (3-1) = 2
    // 3-3=1
    total += dfs(memo, i - 1) * dfs(memo, n - i)
  }

  memo[n] = total

  return total
}

console.log(numTrees(3))