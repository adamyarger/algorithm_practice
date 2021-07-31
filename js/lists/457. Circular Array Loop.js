/**
 * You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i:

If nums[i] is positive, move nums[i] steps forward, and
If nums[i] is negative, move nums[i] steps backward.
Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.

A cycle in the array consists of a sequence of indices seq of length k where:

Following the movement rules above results in the repeating index sequence seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...
Every nums[seq[j]] is either all positive or all negative.
k > 1
Return true if there is a cycle in nums, or false otherwise.



Example 1:

Input: nums = [2,-1,1,2,2]
Output: true
Explanation:
There is a cycle from index 0 -> 2 -> 3 -> 0 -> ...
The cycle's length is 3.


Example 2:

Input: nums = [-1,2]
Output: false
Explanation:
The sequence from index 1 -> 1 -> 1 -> ... is not a cycle because the sequence's length is 1.
By definition the sequence's length must be strictly greater than 1 to be a cycle.
Example 3:

Input: nums = [-2,1,-1,-2,-2]
Output: false
Explanation:
The sequence from index 1 -> 2 -> 1 -> ... is not a cycle because nums[1] is positive, but nums[2] is negative.
Every nums[seq[j]] must be either all positive or all negative.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * no going over or under since its circular
 * 
 * in order to be cicular it need to go through the last item and loop around again
 * a cycle the DOES NOT cover all nodes wont count
 * 
 * nums you hit must be either all positive or all negative
 */
var circularArrayLoop = function (nums) {
  // loop because the cycle can start at any index
  for (let i = 0; i < nums.length; i++) {
    // negative to move back, needs to all be the same
    let isForward = nums[i] >= 0
    let slow = i
    let fast = i

    // if slow or fast becomes -1 we cant find a cycle
    while (true) {
      // move one step for slow pointer
      slow = findNextIndex(nums, isForward, slow)
      fast = findNextIndex(nums, isForward, fast)

      // console.log(fast)

      if (fast !== -1) {
        // if we havent broke the rule move fast forward more
        fast = findNextIndex(nums, isForward, fast)
      }

      // why fast === slow??? because that means weve gone through a whole cycle
      if (slow === -1 || fast === -1 || fast === slow) break
    }

    if (slow !== -1 && slow === fast) return true
  }

  return false
};

function findNextIndex(nums, isForward, index) {
  let direction = nums[index] >= 0

  // change direction, this breaks the rules
  // console.log(isForward, direction)
  if (isForward !== direction) {
    return -1
  }

  // its circular so use modulo
  // python handles negative indexes and js doesnt
  let next = (index + nums[index]) % nums.length

  // -1 index means count from the back
  // so in js we need the remainder to calculate the positive index
  if (next < 0) {
    next = next + nums.length
  }

  // check if weve hit a loop of landing on the same index every time???
  // a 1 element cycle
  if (next === index) {
    next = -1
  }

  return next
}

console.log(circularArrayLoop([2, -1, 1, 2, 2]))

// console.log(circularArrayLoop([2, -1, 1, -2, -2])) // this causes a loop

console.log(circularArrayLoop([-2, 1, -1, -2, -2]))

