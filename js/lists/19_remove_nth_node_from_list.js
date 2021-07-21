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
 * 
 * 1.) find the node before the target node
 * 2.) point pre node to targetnode.next
 * 
 * iterate n amount
 * then start second pointer and iterate till first hits the end
 * we need it to stop at the last one NOT go past it
 * to do so we loop while fatspointer.next still exists
 */
var removeNthFromEnd = function (head, n) {
  let fast = head
  let slow = head

  // need to check length see how many are left over
  // then return early
  // whats the edge case here?
  for (let i = 0; i < n; i++) {
    fast = fast.next
  }

  // if n === lis.length we delete the head
  // which means we just return head.next as the new head
  if (!fast) return head.next

  while (fast && fast.next) {
    fast = fast.next
    slow = slow.next
  }

  slow.next = slow.next.next
  return head
};

let head = new ListNode(1)
head.next = new ListNode(2)
// head.next.next = new ListNode(3)
// head.next.next.next = new ListNode(4)
// head.next.next.next.next = new ListNode(5)

let node = removeNthFromEnd(head, 1)

console.log('-----')
while (node) {
  console.log(node.val)
  node = node.next
}
