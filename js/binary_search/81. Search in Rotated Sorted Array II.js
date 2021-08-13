/**
 * There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].

Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.

You must decrease the overall operation steps as much as possible.



Example 1:

Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
Example 2:

Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 * 
 * duplicate values
 * its rotated
 * return true if target is found
 * 
 * remind me of rotated search combined with first and last poisition where we grew the subarray of same nums
 * 
 * need to find rotation direction
 * compare lo and high
 * lo and high could be the sme value, the whole thing could be the same value [2,2,2,3,2,2,2,2,2]
 * 
 * cant look one over since it couldbe more duplicates
 * do we use sliding window to grow till we find a change?
 */
var search = function (nums, target) {
  // look for num change
  // if hi and lo are equal move pointers inward till you find the bigger one
  let lo = 0
  let hi = nums.length - 1

  while (lo <= hi) {
    // while (lo < hi && nums[lo] === nums[hi]) {
    //   lo++
    //   hi--
    // }

    while (lo < hi && nums[lo] === nums[lo + 1]) {
      lo++
    }

    while (lo < hi && nums[hi] === nums[hi - 1]) {
      hi--
    }

    const mid = Math.floor((hi + lo) / 2)

    if (nums[mid] === target) {
      return true
    }

    console.log(lo, hi)

    // rotated just means 2 seperate sorted arrays appended to eachother
    // check which way its rotated
    if (nums[lo] <= nums[mid]) { // left side is normal sorted order
      // check if its in range now
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    } else {
      // right side is properly sorted
      if (target <= nums[hi] && target > nums[mid]) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
  }

  return false
};

console.log(search([2, 3, 2, 2, 2, 2, 2], 3))

console.log(search([2, 5, 6, 0, 0, 1, 2], 0))

console.log(search([2, 5, 6, 0, 0, 1, 2], 3))

console.log(search([1, 0, 1, 1, 1], 0))

console.log(search([1, 2, 1], 1))


