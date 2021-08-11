/**
 * Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.



Example 1:


Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
Example 2:

Input: n = 1
Output: [[1]]
 */


function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (n == 0) return [];
  return find(1, n)
};

function find(start, end) {
  const out = []

  if (start > end) {
    out.push(null)
    return out
  }

  if (start === end) {
    out.push(new TreeNode(start))
    return out
  }

  for (let i = start; i <= end; i++) {
    const left = find(start, i - 1)
    const right = find(i + 1, end)

    for (const l of left) {
      for (const r of right) {
        const root = new TreeNode(i)
        root.left = l
        root.right = r
        out.push(root)
      }
    }
  }

  return out
}