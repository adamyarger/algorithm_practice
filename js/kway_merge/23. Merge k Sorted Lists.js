/**
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.



Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 */

import MinHeap from '../utils/MinHeap.js'

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * 
 * create a min heap
 * put the first items from each list in the heap
 * 
 * grab the next smallest of the
 */

// TODO: add compare attribute to minheap

var mergeKLists = function (lists) {
  const heap = new MinHeap()

  // only need to do this once then we can traverse linked lists
  for (const list of lists) {
    if (list) {
      heap.push(list)
    }
  }

  let dummy = new ListNode(0)
  let cur = dummy

  while (heap.size) {
    cur.next = heap.pop()
    cur = cur.next

    // how to add back to heap?
    if (cur.next) {
      heap.push(cur.next)
    }
  }

  return dummy.next
};