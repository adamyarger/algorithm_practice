'''
LeetCode 102 - Binary Tree Level Order Traversal [medium]

Given a binary tree, return the level order traversal of its nodes’ values. (ie, from left to right, level by level).

For example:

Given binary tree: [3, 9, 20, null, null, 15, 7]

    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:

[
  [3],
  [9,20],
  [15,7]
]
'''
from collections import deque
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        pass
