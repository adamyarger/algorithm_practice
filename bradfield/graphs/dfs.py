'''
breadth_first_search uses a queue, traverse uses a stack
'''
from collections import defaultdict

simple_graph = {
    'A': ['B', 'D'],
    'B': ['C', 'D'],
    'C': [],
    'D': ['E'],
    'E': ['B', 'F'],
    'F': ['C']
}


def depth_first_search(graph, start):
    visited = set()
    traversal_times = defaultdict(dict)
    count = [0]

    def traverse(node):
        visited.add(node)
        count[0] += 1
        traversal_times[node]['discovery'] = count[0]

        for neighbor in graph[node]:
            if neighbor not in visited:
                traverse(neighbor)

        count[0] += 1
        traversal_times[node]['finish'] = count[0]

    traverse(start)
    return traversal_times


traversal_times = depth_first_search(simple_graph, 'A')
print(traversal_times)
# =>
# {
#     'A': {
#         'discovery': 1,
#         'finish': 12
#     },
#     'B': {
#         'discovery': 2,
#         'finish': 11
#     },
#     'C': {
#         'discovery': 3,
#         'finish': 4
#     },
#     'D': {
#         'discovery': 5,
#         'finish': 10
#     },
#     'E': {
#         'discovery': 6,
#         'finish': 9
#     },
#     'F': {
#         'discovery': 7,
#         'finish': 8
#     }
# }
