

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
    - used for dependency graphs, e.g. you need this dependency installed before you can install this other one
    - depth first search and add to a stack
    - by adding to the stack with a depth first search, the items added first will be the leaves, then it will work back up the tree
    - this leaves the items with no dependecies added last so then we can pop them off to create the sorted order
    '''
    visited = set()
    stack = []

    def visit(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visit(neighbor)
                # if you put it in here some nodes are never added to visited i.e. node a
        stack.append(node)

    for key in graph.keys():
        if key not in visited:
            visit(key)

    ordered = []
    while stack:
        ordered.append(stack.pop())
    return ordered


print(top_sort(GRAPH, 'a'))
# ['b', 'd', 'a', 'c', 'e', 'f', 'g', 'h']
