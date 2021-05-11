

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
    # use depth first search, this mean use a stack
    visited = set()
    # add to stack onde all children have been explored
    # the first items in the stack be be those with no children
    stack = []

    def visit(node):
        for neighbor in graph[node]:
            if neighbor not in visited:
                visit(neighbor)
            visited.add(neighbor)
        # if we get to here then weve explored all of the ndoes children, since the for loop iterates through all children
        # that means add it to the stack
        stack.append(node)

    for key in graph.keys():
        if key not in visited:
            visit(key)

    ordered = []
    while stack:
        ordered.append(stack.pop())

    return ordered


print(top_sort(GRAPH, 'a'))
