'''
- shortest path in a graph between nodes
- returns the shortest distance to each node, not the path
- min heap with a breadth first search

Whats the diffeerence between prims and dijstras?

dijkstra is the shortest distance to a certain node.

prims is the least amount of overall work to visit all nodes.
'''
import heapq


def calculate_distances(graph, starting_vertex):
    distances = {node: float('infinity') for node in graph}
    distances[starting_vertex] = 0
    pq = [(0, starting_vertex)]

    while len(pq) > 0:
        current_distance, current_node = heapq.heappop(pq)

        if current_distance > distances[current_node]:
            continue

        for neighbor, distance in graph[current_node].items():
            total_distance = current_distance + distance
            if total_distance < distances[neighbor]:
                heapq.heappush(pq, (total_distance, neighbor))
                distances[neighbor] = total_distance
    return distances


example_graph = {
    'U': {'V': 2, 'W': 5, 'X': 1},
    'V': {'U': 2, 'X': 2, 'W': 3},
    'W': {'V': 3, 'U': 5, 'X': 3, 'Y': 1, 'Z': 5},
    'X': {'U': 1, 'V': 2, 'W': 3, 'Y': 1},
    'Y': {'X': 1, 'W': 1, 'Z': 1},
    'Z': {'W': 5, 'Y': 1},
}

# this does not return the path, just the shortest distance to get to each node
print(calculate_distances(example_graph, 'X'))
# => {'U': 1, 'W': 2, 'V': 2, 'Y': 1, 'X': 0, 'Z': 2}

# ('Y', 1)
# ('U', 1)
# ('W', 3)
# ('V', 2)
# ('X', 1)
# ('W', 5)
# ('V', 2)
# ('X', 1)
# ('Z', 1)
# ('W', 1)
# ('X', 2)
# ('U', 2)
# ('W', 3)
# ('Y', 1)
# ('X', 3)
# ('Z', 5)
# ('U', 5)
# ('V', 3)
# ('Y', 1)
# ('W', 5)
