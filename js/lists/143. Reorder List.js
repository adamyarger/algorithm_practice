/**
 * 
 * 143. Reorder List
Medium

3593

157

Add to List

Share
You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.



Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 * 
 * find the middle
 * reverse half after the middle
 * start reorder one by one
 */
var reorderList = function (head) {
  if (!head || !head.next) return

  let slow = head
  let fast = head
  // why next.next? because it stops it early when there an even amount of nodes
  // and we need to reverse the half after the middle
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }

  // reverse half after middle node
  let mid = slow
  let cur = slow.next
  while (cur.next) {
    let next = cur.next
    cur.next = next.next
    next.next = mid.next
    mid.next = next
  }

  slow = head
  fast = mid.next
  while (slow !== mid) {
    mid.next = fast.next
    fast.next = slow.next
    slow.next = fast
    slow = fast.next
    fast = mid.next
  }
};