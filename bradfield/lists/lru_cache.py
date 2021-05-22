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

    def loop(self):
        cur = self.head
        for _ in range(self.size + 2):
            print({'key': cur.key, 'value': cur.value})
            cur = cur.next

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
        if len(self.map) > self.size:
            # remove oldest
            node = self.head.next
            self._remove(node)

    def _remove(self, node):
        prev = node.prev
        nxt = node.next
        prev.next = nxt
        nxt.prev = prev
        del self.map[node.key]

    def _add(self, node):
        '''
        WE NEVER REPLACE HEAD AND TAIL!!!
        THEY ARE JUST BUFFERS.
        '''
        # new nodes prev will point here
        print(self.tail.prev.key, self.head.key, self.tail.key)
        prev = self.tail.prev
        # prevs next points to the new node
        prev.next = node
        # the tail points to the new node which is the new head
        self.tail.prev = node
        # new nodes prev is the old head
        node.prev = prev
        # new nodes next is the tail
        node.next = self.tail
        # add it to the map
        self.map[node.key] = node


cache = LRUCache(5)
cache.set('a', 'cool a')
cache.set('b', 'cool b')
cache.set('c', 'cool c')
cache.set('d', 'cool d')
cache.set('e', 'cool e')

# cache.loop()

print(cache.get('a'))
# cache.loop()

cache.set('f', 'cool f')
# cache.loop()

print(cache.get('b'))

# {'value': 0, 'key': 0}
# {'value': 'cool a', 'key': 'a'}
# {'value': 'cool b', 'key': 'b'}
# {'value': 'cool c', 'key': 'c'}
# {'value': 'cool d', 'key': 'd'}
# {'value': 'cool e', 'key': 'e'}
# {'value': 0, 'key': 0}
# cool a
# {'value': 0, 'key': 0}
# {'value': 'cool b', 'key': 'b'}
# {'value': 'cool c', 'key': 'c'}
# {'value': 'cool d', 'key': 'd'}
# {'value': 'cool e', 'key': 'e'}
# {'value': 'cool a', 'key': 'a'}
# {'value': 0, 'key': 0}
# {'value': 0, 'key': 0}
# {'value': 'cool c', 'key': 'c'}
# {'value': 'cool d', 'key': 'd'}
# {'value': 'cool e', 'key': 'e'}
# {'value': 'cool a', 'key': 'a'}
# {'value': 'cool f', 'key': 'f'}
# {'value': 0, 'key': 0}
