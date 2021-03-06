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


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 * 
 * find the middle
 * reverse half after the middle
 * start reorder one by one (merge)
 */
var reorderList = function (head) {
  if (!head || !head.next) return head

  // find 1 before the middle
  let slow = head
  let fast = head
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }

  // reverse second half
  let mid = slow
  let cur = slow.next
  while (cur.next) {
    const next = cur.next // 4
    cur.next = next.next
    next.next = mid.next
    mid.next = next
  }

  // merge together
  slow = head
  fast = mid.next
  while (slow !== mid) {
    // work from right to left
    mid.next = fast.next
    fast.next = slow.next
    slow.next = fast


    // set the next
    slow = fast.next
    fast = mid.next
  }
};

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)
head.next.next.next.next.next = new ListNode(6)

reorderList(head)


let cur = head
while (cur) {
  console.log(cur.val)
  cur = cur.next
}