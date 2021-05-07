'''
* to create a adjacency list, take the start word "pope" and create a bucket for each version of the word with one char missing. _ope, p_op
'''

from collections import defaultdict
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


if __name__ == '__main__':
    vocabulary_file = os.path.join(
        os.path.dirname(__file__), 'vocabulary_simple.txt')
    word_graph = build_graph(get_words(vocabulary_file))
    print(word_graph)
