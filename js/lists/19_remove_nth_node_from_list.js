/**
 * 
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.



Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
 */



function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * 
 * this is nth from the end
 * could do fast and slow pointer, that way on hit the end while the other is in the middle and knows where to go to
 * 
 * step 1: find the nth to last node
 * step 2: remove node
 * - track prev
 * - point prev to cur.next
 * 
 * 
 * IDEA: move first poiter forward by n amount
 * then add a second pointer at the beginning and move forward until the first one hits the end
 * by that time the newer index will be in place
 */
var removeNthFromEnd = function (head, n) {
  let fast = head
  let slow = head

  for (let i = 0; i < n; i++) {
    fast = fast.next
  }

  // this is th safe gaurd
  // edge case: it mans we went through the whole list
  // so n to end is the head.next
  if (!fast) return head.next

  // by wayching fast.next instead we dont need to keep track of prev
  // instead it end sone early
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }

  // reset
  slow.next = slow.next.next

  return head
};

let head = new ListNode(1)
head.next = new ListNode(2)
// head.next.next = new ListNode(3)
// head.next.next.next = new ListNode(4)
// head.next.next.next.next = new ListNode(5)

let node = removeNthFromEnd(head, 2)

console.log('-----')
while (node) {
  console.log(node.val)
  node = node.next
}
