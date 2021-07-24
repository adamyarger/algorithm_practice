/**
 * Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.



Example 1:

Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.
Example 2:

Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.
Example 3:

Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * 
 * its not about pointers and indexes its about values
 * one constraints is order of indexes which just means move linearly
 * which mean if we find one that bigger then nother bigger than that one then another bigger than that we win
 */
var increasingTriplet = function (nums) {
  let lo = nums[0]
  let mid = Infinity

  for (cur of nums) {
    if (cur <= lo) {
      // set low to the lowest value we find
      lo = cur
    } else if (cur <= mid) {
      mid = cur
    } else {
      // this will return early
      return true
    }
  }

  return false
};

var nums = [2, 0, 5, 1, 7, 6] // -> 017

console.log(increasingTriplet(nums))