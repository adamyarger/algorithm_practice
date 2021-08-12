/**
 * Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses constant extra space.



Example 1:

Input: nums = [1,2,0]
Output: 3
Example 2:

Input: nums = [3,4,-1,1]
Output: 2
Example 3:

Input: nums = [7,8,9,11,12]
Output: 1
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * always choose 1 if it doesnt exist since its the smallest positve
 * work up from there
 * 
 * task:
 * find the smallest positive number in the array
 * determine if we have to go above that number or below that number
 * 
 * we can use the first part of the array as a sorted ranking
 * if 1 exists put it in the 0 spot
 * anything that out of range can be deleted
 * if we find nothing default to 1
 */
var firstMissingPositive = function (nums) {
  let i = 0
  while (i < nums.length) {
    const val = nums[i]
    // check for numbers that fit the start of the array indexs + 1
    // is it above 0 and within the range of indexes and not already in the correct position
    // MISSED checking that its bigger than 0
    // looking for val thats out of place but within index range
    if (val > 0 && val <= nums.length && nums[val - 1] !== val) {
      // swap, just like the rest of cyclic sort
      nums[i] = nums[val - 1]
      nums[val - 1] = val
    } else {
      i++
    }
  }

  for (let i = 0; i < nums.length; i++) {
    // return the first non matching
    if (nums[i] !== i + 1) return i + 1
  }

  return i + 1
};


console.log(firstMissingPositive([0, 2, 2, 1, 1]))

console.log(firstMissingPositive([1, 2, 0]))
console.log(firstMissingPositive([3, 4, -1, 1]))
console.log(firstMissingPositive([7, 8, 9, 11, 12]))