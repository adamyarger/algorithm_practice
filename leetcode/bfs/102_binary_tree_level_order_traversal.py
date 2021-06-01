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

Time Complexity: O(N) where N is the total number of nodes in the tree.

Space Complexity: O(N),
since we need an O(N) space to return the result.
We will also need O(N) for the queue.
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
        result = []
        # if theres nothing return an empty array
        if root is None:
            return result

        queue = deque([root])
        while queue:
            # why does this work?
            level_size = len(queue)
            current_level = []
            for _ in range(level_size):
                current_node = queue.popleft()
                # add node in current level
                current_level.append(current_node.val)

                if current_node.left:
                    queue.append(current_node.left)
                if current_node.right:
                    queue.append(current_node.right)
            result.append(current_level)
        return result
