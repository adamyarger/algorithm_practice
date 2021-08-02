/**
 * 
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.



Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Example 2:

Input: nums = [1,1,2]
Output: [1]
Example 3:

Input: nums = [1]
Output: []
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * 1 to n so use val-1 for i
 * this is the same as duplicate numbers but return values instead of indexes
 */
var findDuplicates = function (nums) {
  let i = 0
  while (i < nums.length) {
    const val = nums[i]
    if (i + 1 === val || nums[val - 1] === val) {
      i++
    } else {
      nums[i] = nums[val - 1]
      nums[val - 1] = val
    }
  }

  return nums.filter((item, index) => item !== index + 1)
};


console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]))