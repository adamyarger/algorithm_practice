'''
edges
a -> b
a -> d
b -> c
b -> d
d -> e
e -> b
e -> f
f -> c

Pick any node, visit the adjacent unvisited vertex, mark it as visited, display it, and insert it in a queue.
If there are no remaining adjacent vertices left, remove the first vertex from the queue.
Repeat step 1 and step 2 until the queue is empty or the desired node is found.
'''
from collections import defaultdict, deque

GRAPH = {
    'A': ['B', 'D'],
    'B': ['C', 'D'],
    'C': [],
    'D': ['E'],
    'E': ['B', 'F'],
    'F': ['C']
}


def bfs(graph, start):
    visited = set(start)
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)


if __name__ == '__main__':
    bfs(GRAPH, 'A')
