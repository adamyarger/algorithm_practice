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
 * DONT think push pop
 * THINK circle
 * 
 * we create a circle then find the head then set the tail to null
 */
var rotateRight = function (head, k) {
  // dummy takes care of having one node case so we can check node.next
  let dummy = new ListNode(0, head)
  let slow = dummy
  let fast = dummy
  // start at 0 since we have a dummy
  let size = 0

  while (fast.next) {
    fast = fast.next
    size += 1
  }

  // reduce work if big number
  k = k % size
  // find the new tail
  //size - k will give use the new tail node
  for (let i = 0; i < size - k; i++) {
    slow = slow.next
  }

  // make it a circle
  // point it at head to make a circle
  fast.next = dummy.next
  // point dummy to the new head
  dummy.next = slow.next
  // unpoint tail
  slow.next = null
  // return new head
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