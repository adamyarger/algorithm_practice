'''
Least Recently Used Cache: organizes items in order of use,
this allows you to quickly see which item hasnt ben used for the longest time.

- uses a doubly linked list with a hash map (dict)
- both most recently used and least recently used can be accessed in O(1) time.
- but it can be space inefficient, since theres 2 data structures

- use the doubly linked list to keep track of recentcey
- use the hash table for directly looking up a value, which could be anywhere in the cache
'''


class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, size):
        self.size = size
        self.map = {}
        # I think the head and tail act as buffers so that the list is never pointing to None
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        # this makes it circular, why?
        # is it so the node is always a middle node then you only have to use one function
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key):
        if key in self.map:
            # the map has a reference to the node in he linked list
            # we can just skip straight to it, no while loop needed
            item = self.map[key]
            self._remove(item)
            # add is always the first element
            self._add(item)
            return item.value
        return -1

    def set(self, key, value):
        if key in self.map:
            self._remove(self.map[key])
        node = Node(key, value)
        self._add(node)
        self.map[key] = node
        if len(self.map) > self.size:
            # remove oldest
            node = self.head.next
            self._remove(node)
            del self.map[node.key]

    def _remove(self, node):
        prev = node.prev
        nxt = node.next
        prev.next = nxt
        nxt.prev = prev

    def _add(self, node):
        # prev is the head
        prev = self.tail.prev
        prev.next = node
        self.tail.prev = node
        node.prev = prev
        node.next = self.tail


cache = LRUCache(5)
cache.set('a', 'cool a')
cache.set('b', 'cool b')
cache.set('c', 'cool c')
cache.set('d', 'cool d')
cache.set('e', 'cool e')
print(cache.get('d'))
