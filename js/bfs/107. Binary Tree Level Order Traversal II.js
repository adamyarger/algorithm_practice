/**
 * 
 Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []} root
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
 * @return {number[][]}
 * 
 * use unshift instead of push
 */
var levelOrderBottom = function (root) {
  if (!root) return []
  const out = []
  const q = [root]

  while (q.length) {
    const level = []
    const len = q.length
    for (let i = 0; i < len; i++) {
      const node = q.shift()
      level.push(node.val)

      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
    out.unshift(level)
  }

  return out
};