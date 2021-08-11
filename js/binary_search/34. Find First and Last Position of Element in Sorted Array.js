/**
 * Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 
 * find start and end index of target
 * 
 * use binary search
 * when we find out target grow left and right pointers till the number changes
 * this is similar to sort subarray to sort whole array
 */
var searchRange = function (nums, target) {
  let left = 0
  let right = nums.length - 1

  // what the diffeence between < and <= in binary search???
  // it means the routine get run 1 more time when left and right are the same, this is fine if your returning inside
  // other wise you can return on the outside
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)

    if (nums[mid] === target) {
      console.log(mid)
      let start = mid
      let end = mid
      // widen left and right
      while (start - 1 >= 0 && nums[start - 1] === target) {
        start--
      }

      while (end + 1 < nums.length && nums[end + 1] === target) {
        end++
      }

      return [start, end]
    } else if (target > nums[mid]) {
      // target is bigger move right
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return [-1, -1]
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
console.log(searchRange([2, 2], 2))