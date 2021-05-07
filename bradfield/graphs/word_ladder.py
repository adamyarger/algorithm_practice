'''
* to create a adjacency list, take the start word "pope" and create a bucket for each version of the word with one char missing. _ope, p_op

representing a graph as a dict
* the key 0 is the vertex (node), the nested dicts keys are the nodes it connects to, this creates the edges (0->1, 0->5)
* the value in the nested dict is the weight of the edge, so (0->1) has a weight of 5
{
    0: {1: 5, 5: 2},
    1: {2: 4},
    2: {3: 9},
    3: {4: 7, 5: 3},
    4: {0: 1},
    5: {4: 8}
}

* to navigate the graph were going to use breadth first search
* BFS goes layer by layer, it also uses a **queue** to keep track of what to explore next,
  we put the current nodes children in a queue
'''

from collections import defaultdict, deque
from itertools import product
import os


def build_graph(words):
    # set default dict to list, so we dont get an error when checking or setting a key that doesnt exist yet
    buckets = defaultdict(list)
    graph = defaultdict(set)

    for word in words:
        for i in range(len(word)):
            # generate the keys like: pool -> _ool, p_ol
            bucket = '{}_{}'.format(word[:i], word[i + 1:])
            buckets[bucket].append(word)

    # add vertices and edges for words in the same bucket
    # product combines every variation of cartesian product
    # .items returns the key value pair as list of tuples [(key, val),]
    for bucket, mutual_neighbors in buckets.items():
        for word1, word2 in product(mutual_neighbors, repeat=2):
            if word1 != word2:
                graph[word1].add(word2)
                graph[word2].add(word1)

    return graph


def get_words(vocabulary_file):
    # r is for reading the file
    # iterate through each line in the file and yield the word
    # we use yield to take up less memory
    for line in open(vocabulary_file, 'r'):
        yield line[:-1]


def traverse(graph, starting_vertex):
    visited = set()
    # dequeue allows O(1) for poping from the front of the array
    # why nested list? because the nested list represents the neighbors of each node?
    queue = deque([[starting_vertex]])
    while queue:
        # path is an array under a dict key like _OOL
        path = queue.popleft()
        vertex = path[-1]
        yield vertex, path
        for neighbor in graph[vertex] - visited:
            visited.add(neighbor)
            queue.append(path + [neighbor])


if __name__ == '__main__':
    vocabulary_file = os.path.join(
        os.path.dirname(__file__), 'vocabulary.txt')
    word_graph = build_graph(get_words(vocabulary_file))
    # print(word_graph)

    for vertex, path in traverse(word_graph, 'FOOL'):
        if vertex == 'SAGE':
            print(' -> '.join(path))
            # FOOL -> FOOD -> FOLD -> SOLD -> SOLE -> SALE -> SAGE
