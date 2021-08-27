/**
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.



Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 */

//https://leetcode.com/problems/lru-cache/discuss/617415/JavaScript-2-Solutions-(ES6-Map-vs-Doubly-linked-list)

class ListNode {
  constructor(key, val) {
    this.val = val
    this.key = key
    this.next = null
    this.prev = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  insert(node) {
    // make sure the node is clean
    node.next = null
    node.prev = null
    if (!this.head) {
      this.head = node
    } else {
      // add to the end
      this.tail.next = node
      node.prev = this.tail
    }
    // set new tail
    this.tail = node
  }

  delete(node) {
    if (node.prev) {
      node.prev.next = node.next
    } else {
      this.head = node.next
    }

    if (node.next) {
      node.next.prev = node.prev
    } else {
      this.tail = node.prev
    }

    // clean out the node
    node.next = null
    node.prev = null
  }
}

/**
 * @param {number} capacity
 * 
 * need a dict for o(1) access
 * need a linked list for  tracking recent use
 * linked list should be doubly linked so we can look it up and delete in o(1)
 * - if we were to use a singly linked list we would have to iterate throguh to find the reviousnode in order to remove
 */
var LRUCache = function (capacity) {
  this.list = new LinkedList()
  this.dict = {}
  this.capacity = capacity
};

LRUCache.prototype.insert = function (key, val) {
  const node = new ListNode(key, val)
  this.list.insert(node)
  this.dict[key] = node
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (key in this.dict) {
    const val = this.dict[key].val
    // delete it so we can move its position to the front
    this.list.delete(this.dict[key])
    this.insert(key, val)
    return val
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (key in this.dict) {
    // find the node to delete it before adding it back in at the front
    this.list.delete(this.dict[key])
  } else if (Object.keys(this.dict).length === this.capacity) {
    // delete the head since its the oldest
    // remove from dict
    delete this.dict[this.list.head.key]
    // remove from list
    this.list.delete(this.list.head)
  }
  this.insert(key, value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const cache = new LRUCache(2);
cache.put(1, 1); // cache is {1=1}
console.log(cache.dict)
cache.put(2, 2); // cache is {1=1, 2=2}
cache.get(1);    // return 1
cache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(cache.dict)
cache.get(2);    // returns -1 (not found)
cache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
cache.get(1);    // return -1 (not found)
cache.get(3);    // return 3
cache.get(4);    // return 4






class LRUCache2 {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const v = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, v);
    return this.cache.get(key);
  };

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);  // keys().next().value returns first item's key
    }
  };
}