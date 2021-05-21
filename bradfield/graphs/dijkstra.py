'''
- shortest path in a graph between nodes
- returns the shortest distance to each node, not the path
- min heap with a breadth first search

'''
import heapq


def calculate_distances(graph, starting_vertex):
    # set each vertex default value to infinity {'U': inf, 'W': inf, 'V': inf, 'Y': inf, 'X': 0, 'Z': inf}
    distances = {vertex: float('infinity') for vertex in graph}
    # set the starting vertex {'X': 0}
    distances[starting_vertex] = 0

    # min heap, we want the shortest vertices at the top, since shorter vertex means shorter path
    # even if the vertex is large like 8, its still smaller than infinity which is what all the unvisited  apths are
    # add tuple with weight and where it came from i.e. X
    pq = [(0, starting_vertex)]
    while len(pq) > 0:
        current_distance, current_vertex = heapq.heappop(pq)
        # do breadth first search for the current vertex, we then add the vertexes children the the prioity queue which will bubble up the shortest path the use next

        if current_distance > distances[current_vertex]:
            continue

        # visit the current vertexes children
        # [('Y', 1), ('U', 1), ('W', 3), ('V', 2)]
        for neighbor, weight in graph[current_vertex].items():
            # distance will get aggragated, take the vurrent vertex weight and add the neighbors weight
            distance = current_distance + weight

            # only update the vertexes distance if its better, any time its first visted will be better since it starts at infinity but once it come up again it only updates if its smaller
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
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
