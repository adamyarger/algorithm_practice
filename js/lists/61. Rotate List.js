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
  let dummy = new ListNode(0, head)
  let tail = dummy
  let fast = dummy
  // need len so we can handle going around multiple time
  let len = 0

  // get the tail and the length of the list
  // we can use the length later to loop around to grab a new prev
  while (fast.next) {
    fast = fast.next
    len++
  }

  // wrap around if k is large
  k = k % len
  // we need to find the new tail
  for (let i = 0; i < len - k; i++) {
    tail = tail.next
  }

  // tail = head
  fast.next = dummy.next
  // dummy.next is like using a variable
  dummy.next = tail.next
  // tail is the tail
  tail.next = null

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