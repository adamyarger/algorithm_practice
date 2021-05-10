'''
Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
'''
from collections import deque

simple_graph = {
    'A': ['B', 'D'],
    'B': ['C', 'D'],
    'C': [],
    'D': ['E'],
    'E': ['B', 'F'],
    'F': ['C']
}


def dfs(graph, start, end):
    visited = set()
    found = [False]

    def traverse(node):
        visited.add(node)
        if node == end:
            found[0] = True
            return
        for neighbor in graph[node]:
            if neighbor not in visited:
                traverse(neighbor)
        return

    traverse(start)
    return found[0]


# we need visited, else the visited set gets reset each time the function is called
def is_route(graph, start, end, visited=None):
    if visited is None:
        visited = set()
    for node in graph[start]:
        if node not in visited:
            visited.add(node)
            # the key here is calling is_route again and if its already found
            # the mach to keep returning True till the stack is empty
            if node == end or is_route(graph, node, end, visited):
                return True
    return False


def is_route_bfs(graph, start, end):
    # check if match
    # bfs uses a queue
    # visited to prevent cycle loops
    # bfs uses a while loop to iterate
    # still need a for loop to look at neighbors
    if start == end:
        return True
    visited = set()
    q = deque([start])
    while q:
        node = q.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                if neighbor == end:
                    return True
                else:
                    q.append(neighbor)
        visited.add(node)
    return False


# print(dfs(simple_graph, 'A', 'E'))  # True
# print(dfs(simple_graph, 'A', 'B'))  # True
# print(dfs(simple_graph, 'A', 'C'))  # True
# print(dfs(simple_graph, 'A', 'R'))  # False


# print(is_route(simple_graph, 'A', 'E'))  # True
# print(is_route(simple_graph, 'A', 'B'))  # True
# print(is_route(simple_graph, 'A', 'C'))  # True
# print(is_route(simple_graph, 'A', 'R'))  # False
print(is_route_bfs(simple_graph, 'A', 'E'))  # True
print(is_route_bfs(simple_graph, 'A', 'B'))  # True
print(is_route_bfs(simple_graph, 'A', 'C'))  # True
print(is_route_bfs(simple_graph, 'A', 'R'))  # False
