/**
 * 
 * Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.



Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:

Input: nums = [1]
Output: 1
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23

// other sliding window was looking for a target which made it easy to decide to move left pointer
 */

var maxSubArray = function (nums) {
  // sum is for current sum tracking
  let prev = 0
  let max = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < nums.length; i++) {
    // either keep the existing subarray or only choose the new number
    prev = Math.max(prev + nums[i], nums[i])

    max = Math.max(max, prev)
  }

  return max
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))