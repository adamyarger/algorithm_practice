

GRAPH = {
    'a': ['c'],
    'b': ['c', 'd'],
    'c': ['e'],
    'd': ['f'],
    'e': ['h', 'f'],
    'f': ['g'],
    'h': [],
    'g': []
}


def top_sort(graph, start):
    '''
    - start from any node
    - since we can satrt at any node, mean we need to keep track of visisted
    - we use a stack, that means depth first search
    - explore all nodes with either no children or no all children have been explored
    - that will put the deepest children at the bottom of the stack, i.e. the last to get popped off
    - DFS means all children get visited before their parents
    '''
    visited = set()
    stack = []

    def visit(node):
        for neighbor in graph[node]:
            if neighbor not in visited:
                visit(neighbor)
                visited.add(neighbor)
        # if were outside the for loop, then all its children have been visited
        stack.append(node)

    for key in graph.keys():
        if key not in visited:
            visit(key)

    out = []
    while stack:
        out.append(stack.pop())
    return out


print(top_sort(GRAPH, 'a'))
