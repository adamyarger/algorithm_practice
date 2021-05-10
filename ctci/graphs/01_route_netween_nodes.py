'''
Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
'''


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


print(dfs(simple_graph, 'A', 'E'))  # True
print(dfs(simple_graph, 'A', 'B'))  # True
print(dfs(simple_graph, 'A', 'C'))  # True
print(dfs(simple_graph, 'A', 'R'))  # False
