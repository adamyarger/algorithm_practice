import unittest
from collections import deque

# Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

# VISUAL OF TEST GRAPH:

# A -- B
# |    |
# C -- D
# |
# E -- F -- G -- H
#      | \
#      O   I -- J -- K
#               |
#               L

# P -- Q
# |  /
# R


def is_route(graph, start, end, visited=None):
    '''
    - depth first search, this mean use a stack
    - keep track of visited
    - this is similar to dijstras, without the priority queue
    - since were returning true, we need to bubble up that answer when its found, since we could
      be deep in the stack and still have to pop off until back to the top
    '''
    if start == end:
        return True
    if visited is None:
        visited = set()
    # we need to visit neihtbors, in a graph that means a for loop
    for neighbor in graph[start]:
        if neighbor in visited:
            continue

        visited.add(neighbor)

        if is_route(graph, neighbor, end, visited):
            return True
    return False


def is_route_bfs(graph, start, end):
    '''
    - bfs means queue (deque)
    - needs visited
    - popleft until nothing is left
    '''
    visited = set()
    q = deque([start])
    while q:
        node = q.popleft()
        visited.add(node)
        if node == end:
            return True
        for neighbor in graph[node]:
            if neighbor not in visited:
                q.append(neighbor)
    return False


class Test(unittest.TestCase):

    graph = {
        "A": ["B", "C"],
        "B": ["D"],
        "C": ["D", "E"],
        "D": ["B", "C"],
        "E": ["C", "F"],
        "F": ["E", "O", "I", "G"],
        "G": ["F", "H"],
        "H": ["G"],
        "I": ["F", "J"],
        "O": ["F"],
        "J": ["K", "L", "I"],
        "K": ["J"],
        "L": ["J"],
        "P": ["Q", "R"],
        "Q": ["P", "R"],
        "R": ["P", "Q"],
    }

    tests = [
        ("A", "L", True),
        ("A", "B", True),
        ("H", "K", True),
        ("L", "D", True),
        ("P", "Q", True),
        ("Q", "P", True),
        ("Q", "G", False),
        ("R", "A", False),
        ("P", "B", False),
    ]

    def test_is_route(self):
        for [start, end, expected] in self.tests:
            actual = is_route(self.graph, start, end)
            assert actual == expected

    def test_is_route_bfs(self):
        for [start, end, expected] in self.tests:
            actual = is_route_bfs(self.graph, start, end)
            assert actual == expected


if __name__ == "__main__":
    unittest.main()
