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
    if start == end:
        return True
    if visited is None:
        visited = set()
    for node in graph[start]:
        # check if its been visited, once were past the visited gate, we add it to visited
        if node not in visited:
            visited.add(node)
            # if its a match or if one of its children was a matach, return true, this needs to bubble up
            if node == end or is_route(graph, node, end, visited):
                return True
    # if we hit this point weve visited all the children, and none matched, so return false
    return False


def is_route_bfs(graph, start, end):
    # bfs uses a queue
    visited = set()
    q = deque([start])
    while q:
        node = q.popleft()
        if node not in visited:
            visited.add(node)
            if node == end:
                return True
            for neighbor in graph[node]:
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
