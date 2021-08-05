/**
 * Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.



Example 1:


Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
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
 * path can go from one leaf to another like 4->2->1->3
 * 
 * how do we measure that?
 * 
 * at each node count max nodes of left and right branches
 */
var diameterOfBinaryTree = function (root) {
  function dfs(node) {
    if (!node) return 0

    let left = dfs(node.left) + 1
    console.log(left)
    let right = dfs(node.right) + 1


  }

  dfs(root)
};

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.left.right = new TreeNode(5)
root.right = new TreeNode(3)
root.right.left = new TreeNode(4)

console.log(diameterOfBinaryTree(root))