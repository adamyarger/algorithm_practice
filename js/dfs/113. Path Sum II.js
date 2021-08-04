/**
 * Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.

A leaf is a node with no children.



Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: []
Example 3:

Input: root = [1,2], targetSum = 0
Output: []
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
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  if (!root) return []
  const out = []
  dfs(root, [], targetSum, out)
  return out
};

function dfs(node, cur, target, out) {
  if (target === node.val && !node.left && !node.right) {
    out.push(cur.concat(node.val))
    return
  }

  if (node.left) {
    dfs(node.left, cur.concat(node.val), target - node.val, out)
  }

  if (node.right) {
    dfs(node.right, cur.concat(node.val), target - node.val, out)
  }
}