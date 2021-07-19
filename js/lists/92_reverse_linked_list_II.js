/**
 *
 * Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.



Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 * 
 * left and right index == -1
 * 
 * how to handle the ends?
 * 
 * how to handle the middle?
 * 
 https://leetcode.com/problems/reverse-linked-list-ii/discuss/1167578/Javascript-iterative-solution-(Easy-to-understand)

 1.) find the start of the range, one short then use .next
 2.) 
 */
var reverseBetween = function (head, left, right) {
  if (!head || left === right) return head

  // why a dummy node?
  const dummy = new ListNode(0, head)

  // need pre cur and next
  // to find pre and cur find the edge of the range
  // if we didnt have the dummy node the loop would have set pre to cur
  let pre = dummy

  for (let i = 1; i < left; i++) {
    pre = pre.next
  }
  // should be at 2
  let cur = pre.next

  // go throguh range that needs to be flipped
  // will iterate 2 spots
  for (let i = 0; i < (right - left); i++) {
    // stash next in line for next iteration
    let next = cur.next
    // why this one?
    cur.next = next.next

    next.next = pre.next
    pre.next = next
  }

  // why?
  return dummy.next
};

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

var out = reverseBetween(head, 2, 4)

console.log('-----------')
var cur = out
while (cur) {
  console.log(cur.val)
  cur = cur.next
}