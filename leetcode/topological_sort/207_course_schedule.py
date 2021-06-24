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
        - find the source nodes = nodes with no incoming edges
        - keep track of which ones have no incoming edges, add them to a dict
        - bfs with while loop and sources stack add sources to out put array.
        - when we pop off a sort find its dependecies and subtract one, if that dep now has no incoming edges add it ass a source
        - return len of nums course == len topologically sorted array

        - NEED TO MAKE adjacency list
        - its 0 to n-1 that means its contigous order
        '''
        # create an adjacency list
        out = []
        graph = {node: [] for node in range(numCourses)}
        in_degrees = {node: 0 for node in range(numCourses)}

        # create the adjacency list
        for req, pre in prerequisites:
            graph[pre].append(req)
            in_degrees[req] += 1

        # get the sources with no incoming edges
        sources = deque()
        for node in in_degrees:
            if in_degrees[node] == 0:
                sources.append(node)

        # bfs, pop of the queue
        while sources:
            node = sources.popleft()
            out.append(node)
            for req in graph[node]:
                in_degrees[req] -= 1
                if in_degrees[req] == 0:
                    sources.append(req)

        return len(out) == numCourses


# the order is backwards at the end, but that doesnt really matter
# since were just detecting cycles
# even in the dfs topological sort we first sort in reverse order then pop off to correct the order
# maybe we always need to find the leaves then work up
sol = Solution()
print(sol.canFinish(4, [[1, 0], [2, 1], [3, 0]]))
