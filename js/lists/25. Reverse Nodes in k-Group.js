/**
 * Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.



Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
Example 3:

Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]
Example 4:

Input: head = [1], k = 1
Output: [1]
 */


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * 
 * if k == 2 then reverse every 2 nodes
 * if k is not left over at the end then leave it
 */
var reverseKGroup = function (head, k) {
  if (!head) return null

  // find the range of node were reversing
  // break out early if there not enough nodes
  let tail = head
  for (let i = 1; i < k; i++) {
    tail = tail.next
    if (!tail) return head
  }

  let next = tail.next
  tail.next = null
  reverse(head)
  // do it again for the next sub section
  head.next = reverseKGroup(next, k)
  return tail
};

// normal reverse
function reverse(cur) {
  let prev = null
  while (cur) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

var out = reverseKGroup(head)

console.log('-----------')
var cur = out
while (cur) {
  console.log(cur.val)
  cur = cur.next
}