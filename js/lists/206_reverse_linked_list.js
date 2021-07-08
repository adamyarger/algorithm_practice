/**
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.



Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
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
 * @return {ListNode}
 * 
 * 
 * need current and prev
 * while cur
 * stash cur next
 * set cur next to previous
 * set previous to current
 * set current to stashed next
 */


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var reverseList = function (head) {
  let cur = head
  let prev = null

  while (cur) {
    let _next = cur.next
    cur.next = prev
    prev = cur
    cur = _next
  }

  return prev
};