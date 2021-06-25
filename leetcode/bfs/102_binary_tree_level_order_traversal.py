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
        '''
        if its empty return an empty array
        - need a levels array to push to
        - like all bfs, while queue has items iterate
        - use the length of the queue to gather and extract the next level of nodes
        - add left and right nodes to the queue if they exist

        - visited is only for graphs
        '''
        levels = []
        if root is None:
            return levels
        queue = deque([root])

        while queue:
            # normally id pop off right here, but we need to
            # know the length of the queue for the looping
            current_level = []
            size = len(queue)
            for _ in range(size):
                node = queue.popleft()
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            levels.append(current_level)
        return levels


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


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        '''
        if its empty return an empty array
        - need a levels array to push to
        - like all bfs, while queue has items iterate
        - use the length of the queue to gather and extract the next level of nodes
        - add left and right nodes to the queue if they exist

        - visited is only for graphs
        '''
        levels = []
        if root is None:
            return levels
        queue = deque([root])

        while queue:
            # normally id pop off right here, but we need to
            # know the length of the queue for the looping
            current_level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            levels.append(current_level)
        return levels
