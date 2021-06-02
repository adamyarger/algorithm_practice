'''
LeetCode 112 - Path Sum [easy]

Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5 -> 4 -> 11 -> 2 which sum is 22.
'''


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        # if there is no root there is no sum
        if root is None:
            return False

        # base case
        # subtraction gos on below, we dont need it here, but techincally searching for zero would work but its more work
        # also need to check that its a leaf, other wise it could hit sum in the middle
        if root.val == sum and root.left is None and root.right is None:
            return True

        # keep searching, but we need to bubble up the results from the left node and the right node
        # we subtract from the sum until the last leaf is equal to the sum
        # if the last leaf equals whats left in the sum, then that route is the total sum
        return self.hasPathSum(root.left, sum - root.val) or self.hasPathSum(root.right, sum - root.val)
