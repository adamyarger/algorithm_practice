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
 * when we go over remove the highest node from the sumrent list
 * 
 * backtrack when we hit the bottom?
 * 
 * O(n^2)
 * this way does a dfs with each node as the new root, this is slow
 */
var pathSum = function (root, targetSum) {

};


/**
 * 
 * @param {*} root 
 * @param {*} targetSum 
 * @returns 
 * 
 * O(n)
 * 
 * if a target value exists then one of the curent sum minus a past sums must equal target since that what would be remaining
 * think of this in sums not node values
 * this reminds me of partition equal subsets, if we find the target the combo must exist
 */
var pathSum = function (root, targetSum) {
  // why??? we need to include root which represent 0 and would count as 1 frequency
  const map = { 0: 1 }
  return dfs(root, 0, targetSum, map)
};

function dfs(root, curPathSum, target, map) {
  if (!root) return 0

  // curPathSum gets added to on the way down
  curPathSum += root.val

  let oldPathSum = curPathSum - target

  // crate a property if it doesnt exists for the number were looking for
  let res = map[oldPathSum] ? map[oldPathSum] : 0

  // mark curPathSum as beeing seen
  map[curPathSum] = map[curPathSum] ? map[curPathSum] + 1 : 1

  // add past res count and what we found in left and right nodes
  // exhaust all nodes till we run out, this will fill the map
  res += dfs(root.left, curPathSum, target, map) + dfs(root.right, curPathSum, target, map)
  // backtrack when we hit the bottom
  map[curPathSum]--

  return res
}