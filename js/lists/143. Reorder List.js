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
  if (!head || !head.next) return
  // find 1 before the middle
  let slow = head
  let fast = head
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }

  // do this again and again
  // reverse after mid
  // pre before part that gets reverse
  let mid = slow
  // cur is first item in half that gets reversed
  let cur = slow.next
  while (cur.next) {
    let next = cur.next
    cur.next = next.next
    // this needs to come before mid.next gets set
    // mid.next is pointing to cur initially
    next.next = mid.next
    mid.next = next
  }

  // merge start and mid pointers
  // left side next is always a pointer, the value comes before the next

  // which pointers get overwritten? we need a reference for those
  slow = head
  fast = mid.next
  while (slow !== mid) {
    // swap
    mid.next = fast.next
    fast.next = slow.next
    slow.next = fast
    // iterate
    slow = fast.next
    fast = mid.next
  }
};

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)

reorderList(head)


let cur = head
while (cur) {
  console.log(cur.val)
  cur = cur.next
}