/**
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.



Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [1,1]
Output: 1
Example 4:

Input: nums = [1,1,2]
Output: 1
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * 1 to n makes it similar to find all duplicates
 * but only 1 repeated number
 * return the number instead of the index this time
 */
var modify = function (nums) {
  let i = 0
  while (i < nums.length) {
    const val = nums[i]
    if (i + 1 === val || nums[val - 1] === val) {
      // if i has the right value or the val we want to swap is already good, move i forward
      // main idea == skip indexs that are in place
      i++
    } else {
      nums[i] = nums[val - 1]
      nums[val - 1] = val
    }
  }

  return nums.find((item, index) => item !== index + 1)
};

// console.log(modify([1, 3, 4, 2, 2]))


// no modification 
// use fast slow pointer
// the single duplicate value means a cycle exists 
var findDuplicate = function (nums) {
  let slow = nums[0]
  let fast = nums[nums[0]]

  while (fast !== slow) {
    slow = nums[slow]
    fast = nums[nums[fast]]
  }

  slow = 0

  // set slow to the start and move both forward to find the cycle node
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[fast]
  }

  return slow
};

console.log(findDuplicate([1, 3, 4, 2, 2]))