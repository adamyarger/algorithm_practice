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
  return dfs(1, n)
};

function dfs(lo, hi) {
  if (lo >= hi) return 1

  let total = 0

  for (let i = lo; i <= hi; i++) {
    total += dfs(lo, i - 1) * dfs(i + 1, hi)
  }

  return total
}

console.log(numTrees(3))