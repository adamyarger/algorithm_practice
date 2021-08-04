/**
 * Given the head of a linked list, rotate the list to the right by k places.



Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
Example 2:


Input: head = [0,1,2], k = 4
Output: [2,0,1]
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
 * make a circle find slow set next to null
 * find neew head and return
 */
var rotateRight = function (head, k) {
  let dummy = new ListNode(0, head)
  let slow = dummy
  let fast = dummy
  let size = 0

  while (fast.next) {
    fast = fast.next
    size++
  }

  k = k % size

  // find new head
  for (let i = 0; i < size - k; i++) {
    slow = slow.next
  }

  // old tail connects to old head making it a circle
  fast.next = dummy.next

  // repurpose dummy to point to the new head
  dummy.next = slow.next

  // break circle new tail points to nothing
  slow.next = null

  return dummy.next
};



const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

var out = rotateRight(head, 2)

console.log('-----------')
var cur = out
while (cur) {
  console.log(cur.val)
  cur = cur.next
}