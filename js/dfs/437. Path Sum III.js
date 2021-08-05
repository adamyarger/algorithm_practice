/**
 * Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).



Example 1:


Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
Example 2:

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 * 
 * 
 * do dfs like normal
 * if we find a sum add it to the count
 * when we go over remove the highest node from the current list
 * 
 * backtrack when we hit the bottom?
 * 
 * O(n^2)
 * this way does a dfs with each node as the new root, this is slow
 */
var pathSum = function (root, targetSum) {
  let count = 0

  const dfs = (node, sum) => {
    // could exit early
    if (!node) return
    sum -= node.val
    if (sum === 0) {
      count++
    }
    dfs(node.left, sum)
    dfs(node.right, sum)
  }

  const main = (node, sum) => {
    if (!node) return
    dfs(node, sum)
    main(node.left, sum)
    main(node.right, sum)
  }

  main(root, targetSum)
  return count
};


/**
 * 
 * @param {*} root 
 * @param {*} targetSum 
 * @returns 
 * 
 * O(n)
 */
var pathSum = function (root, targetSum) {
  const map = {}
  map[0] = 1
  return dfs(root, 0, targetSum, map)
};

function dfs(root, cur, target, map) {
  if (!root) return 0

  cur += root.val

  // crate a property if it doesnt exists for the number were looking for
  let res = map[cur - target] ? map[cur - target] : 0

  // mark cur as beeing seen
  map[cur] = map[cur] ? map[cur] + 1 : 1

  // add past res count and what we found in left and right nodes
  res += dfs(root.left, cur, target, map) + dfs(root.right, cur, target, map)
  // backtrack when we hit the bottom
  map[cur]--
  return res
}