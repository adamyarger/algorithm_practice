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
    this.length = 0
  }

  push(key, val) {
    const node = new ListNode(key, val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length += 1
    return node
  }

  remove(node) {
    if (!node.next && !node.prev) {
      this.head = null
      this.tail = null
    } else if (!node.prev) { // head
      this.head = node.next
      this.head.prev = null
    } else if (!node.next) { // tail
      this.tail = node.prev
      this.tail.next = null
    } else {
      const prev = node.prev
      const next = node.next
      prev.next = next
      next.prev = prev
    }
    this.length -= 1
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
  this.map = {}
  this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map[key]) return -1
  // move to front if exists
  // return value
  const val = this.map[key].val
  this.list.remove(this.map[key])
  // this creates a new node. is that best?
  this.map[key] = this.list.push(key, val)
  return val
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map[key]) {
    this.list.remove(this.map[key])
  } else if (this.list.length === this.capacity) {
    const head = this.list.head
    delete this.map[head.key]
    this.list.remove(head)
  }
  this.map[key] = this.list.push(key, value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const cache = new LRUCache(2);
cache.put(1, 1); // cache is {1=1}
console.log(cache.map)
cache.put(2, 2); // cache is {1=1, 2=2}
cache.get(1);    // return 1
cache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(cache.map)
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