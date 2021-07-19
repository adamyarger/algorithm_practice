/**
 * 
 * Given the head of a singly linked list, return true if it is a palindrome.



Example 1:


Input: head = [1,2,2,1]
Output: true
Example 2:


Input: head = [1,2]
Output: false
 */


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {boolean}
 * 
 * easy way: extract an array then use 2 pointers from each end to check
 */
var isPalindrome = function (head) {
  const arr = []

  let cur = head
  while (cur) {
    arr.push(cur.val)
    cur = cur.next
  }

  if (arr.length === 1) return true

  let isPal = false
  let left = 0
  let right = arr.length - 1
  while (right > left) {
    if (arr[left] === arr[right]) {
      isPal = true
      left++
      right--
    } else if (left === right) {
      return true
    } else {
      return false
    }
  }

  return isPal
};

let head = new ListNode(1)
head.next = new ListNode(2)
// head.next.next = new ListNode(2)
// head.next.next.next = new ListNode(1)

console.log(isPalindrome(head))