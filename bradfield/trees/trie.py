'''
use case:
* autocomplete
* spellchecker
* print words from dictionary in alphabetial order
* bad: take sup lots of memory
'''

# fixes problem of keys not existing
# if you try to access or modify a key that doesnt exist default dict will create one with a default value
from collections import defaultdict


class TrieNode:
    def __init__(self):
        pass


class Trie:
    def __init__(self):
        pass

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def delete(self, word):
        pass

    def update(self, old_word, new_word):
        pass


if __name__ == "__main__":
    strings = ["pqrs", "pprt", "psst", "qqrs", "pqrs"]
    t = Trie()
    for word in strings:
        t.insert(word)

    print t.search("pqrs")
    print t.search("pprt")
    t.delete("pprt")
    print t.search("pprt")
    t.update("mnop", "pprt")
