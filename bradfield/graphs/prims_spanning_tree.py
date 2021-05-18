'''
Use Cases
---
- used in gaming to broadcast a players location to everyone playing the game


Flooding: send out a message and let the routers handle it
- add a ttl greater than or equal to the furthest node jump count once the ttl is hit the message is distroyed
- each router gets a message then passes it to all its chldren routers

- considered a greedy algorithm
- each step we choose the cheapest next step
- prims cuts out the heaviest edges

While T is not yet a spanning tree
   Find an edge that is safe to add to the tree
   Add the new edge to T

- prims is similar to dijsras, they both use a priority queue
'''
from collections import defaultdict
import heapq


def create_spanning_tree(graph, starting_vertex):
    '''
    # looks like it uses breadth irst search
    - start at a node
    - explore neighbors of node
    - check if the neighbors exist in the heap map, if their value are smaller than whats in the map update them
    - popleft to the min value from the heap
    - we keep another map with the lowest to from edges
    - the KEYY point here is the heap and visiting the next smallest weight of a neighbor
    '''
    # mst will be our smallest weighted edges including the to and from nodes
    # this is what gets returned
    mst = defaultdict(set)
    visited = set([starting_vertex])
    # create the heap for smallest edges to explore next
    edges = [
        (cost, starting_vertex, to)
        for to, cost, in graph[starting_vertex].items()
    ]
    heapq.heapify(edges)

    while edges:
        # pop off the next smallest edge
        cost, frm, to = heapq.heappop(edges)
        # visited works here because we only care about visiting the smallest
        if to not in visited:
            visited.add(to)
            # add the edge to the output
            mst[frm].add(to)
            # visit neighbors
            for to_next, cost in graph[to].items():
                heapq.heappush(edges, (cost, to, to_next))

    return mst


example_graph = {
    'A': {'B': 2, 'C': 3},
    'B': {'A': 2, 'C': 1, 'D': 1, 'E': 4},
    'C': {'A': 3, 'B': 1, 'F': 5},
    'D': {'B': 1, 'E': 1},
    'E': {'B': 4, 'D': 1, 'F': 1},
    'F': {'C': 5, 'E': 1, 'G': 1},
    'G': {'F': 1},
}

out = dict(create_spanning_tree(example_graph, 'A'))
print(out)

# the set is the neighbors the current node should vist because their the smallest options
# {'A': set(['B']),
#  'B': set(['C', 'D']),
#  'D': set(['E']),
#  'E': set(['F']),
#  'F': set(['G'])}
