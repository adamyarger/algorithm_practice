/**
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) return []

  const queue = [root]
  let out = []
  let deep = 0

  while (queue.length) {
    // use const to capture size as a primitive immutable number
    const size = queue.length
    const level = []

    for (let i = 0; i < size; i++) {
      // we shift because its bfs and thats always a queue
      const node = queue.shift()
      if (deep % 2 === 0) {
        // from right to left
        level.push(node.val)
      } else {
        // from left to right
        level.unshift(node.val)
      }

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    out.push(level)
    deep++
  }

  return out
};