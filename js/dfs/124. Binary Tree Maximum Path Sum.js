/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. 
 * A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any path.



Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 */

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 * 
 * same idea as diameter of binary tree
 * but were looking for max sum instead of max length of path
 * 
 * how to handle negatives?
 */
var maxPathSum = function (root) {
  // so something gets set no matter what
  let max = -Infinity

  function dfs(node) {
    if (!node) return 0

    // dont choose left or right if below 0, because it has to be added to the root which by it self is gaurenteed to be higher
    let left = Math.max(dfs(node.left), 0)
    let right = Math.max(dfs(node.right), 0)

    // add up left right and the current root
    let curMax = node.val + left + right

    // is it the max weve seen yet?
    max = Math.max(max, curMax)

    // choose the largest branch from left or right
    // instead of adding a + 1 like the tree depth we add the current node value
    return node.val + Math.max(left, right)
  }

  dfs(root)
  return max
};

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
// root.right.left = new TreeNode(4)
// root.left.right = new TreeNode(5)

console.log(maxPathSum(root))