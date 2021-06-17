'''
LeetCode 207 - Course Schedule [medium]

There are a total of n courses you have to take, labeled from 0 to n - 1.
Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0, 1]
Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

Example 1:

Input: 2, [[1, 0]]
Output: true
Explanation: There are a total of 2 courses to take.
             To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: 2, [[1, 0], [0, 1]]
Output: false
Explanation: There are a total of 2 courses to take.
             To take course 1 you should have finished course 0, and to take course 0
             you should also have finished course 1. So it is impossible.

Note:
The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
You may assume that there are no duplicate edges in the input prerequisites.

---

Time Complexity: O(V + E) where V is the total number of courses and E is the total number of prerequisites.
Space Complexity: O(V + E) since we are storing all of the prerequisites for each course in an adjacency list.
'''
from typing import List
from collections import deque

# Try it with dfs and proper sorting order


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        '''
        - this will end up being backwards in order, do the problem 2 to do it in order
        - create an adjcency list (graph) of nodes with lists of prerequisites
        - create dict of in degrees, this is actually outdegrees but whatever, how many postrequisites does each class have
        - build the graph fill it up, also fill up the indegrees
        - create sources, nodes with no indegrees, these will actually be leaves
        - use bfs to add to sorted output array, decrement childs indegrees when one is added to sorted
        - check that the array length is equal and return
        '''
        out = []

        # req, pre
        graph = {node: [] for node in range(numCourses)}
        out_degrees = {node: 0 for node in range(numCourses)}

        # build the graph
        for req, pre in prerequisites:
            graph[pre].append(req)
            out_degrees[req] += 1

        # print(graph)
        # print(out_degrees)

        # create sources, grab the leaf nodes
        sources = deque()
        for node in graph:
            if out_degrees[node] == 0:
                sources.append(node)

        # print(sources)

        while sources:
            node = sources.popleft()
            out.append(node)
            for neighbor in graph[node]:
                out_degrees[neighbor] -= 1
                if out_degrees[neighbor] == 0:
                    sources.append(neighbor)

        # print(out)
        return len(out) == numCourses


# the order is backwards at the end, but that doesnt really matter
# since were just detecting cycles
# even in the dfs topological sort we first sort in reverse order then pop off to correct the order
# maybe we always need to find the leaves then work up
sol = Solution()
print(sol.canFinish(4, [[1, 0], [2, 1], [3, 0]]))
