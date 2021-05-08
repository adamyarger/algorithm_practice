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
    # counter is keeping track of what iteration were on
    # counter is an array so it keeps memory? Why is it an array?
    counter = [0]
    # when is the node discovered?
    # when is the node popped from the call stack?
    traversal_times = defaultdict(dict)

    def traverse(vertex):
        visited.add(vertex)
        counter[0] += 1
        traversal_times[vertex]['discovery'] = counter[0]

        # we use a for loop because a graph can be pointing to
        # any number of other nodes unlike a binary tree which always has 2
        for next_vertex in graph[vertex]:
            if next_vertex not in visited:
                traverse(next_vertex)

        # why is counter an array?
        counter[0] += 1
        traversal_times[vertex]['finish'] = counter[0]

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
