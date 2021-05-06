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
        self.children = defaultdict(TrieNode)
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        cur = self.root
        for letter in word:
            cur = cur.children[letter]
        cur.is_word = True

    def search(self, word):
        cur = self.root
        for letter in word:
            cur = cur.children[letter]
            if cur is None:
                return False
        return cur.is_word

    def starts_with(self, prefix):
        cur = self.root
        for letter in prefix:
            cur = cur.children[letter]
            if cur is None:
                return False
        return True

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
    # t.delete("pprt")
    print t.search("ppa")
    # t.update("mnop", "pprt")
