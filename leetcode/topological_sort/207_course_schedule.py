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
'''
from types import List
from collections import deque


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # sorted list that holds all the courses in order, we check it at the end to make sure it matches the numCourses
        sorted_list = []

        if numCourses <= 0:
            return False

        # keep track of the graph in an adjacency list, the node will point to all its children (requisites)
        graph = {node: [] for node in range(numCourses)}
        # count incoming edges, need to know which ones are sources (0 incoming edges) and sinks (only incoming edges, no outgoing edges)
        in_degree = {node: 0 for node in range(numCourses)}

        # build the graph, fill in the in_degrees
        for prerequisite in prerequisites:
            parent, child = prerequisite[0], prerequisite[1]
            graph[parent].append(child)
            in_degree[child] += 1

        # find all sources
        sources = deque()
        for key in in_degree:
            if in_degree[key] == 0:
                sources.append(key)

        # topo sort (bfs)
        while sources:
            vertex = sources.popleft()
            # add any sources to sorted list, doesnt matter which order because they have no dependecies
            sorted_list.append(vertex)
            for child in graph[vertex]:
                # get the nodes child to decrement the indegrees, since we just poped off its parent (prerequisite)
                in_degree[child] -= 1
                if in_degree[child] == 0:
                    sources.append(child)

        return len(sorted_list) == numCourses


sol = Solution()
print(sol.canFinish(4, [[0, 1], [3, 4], [1, 2], [2, 3]]))
