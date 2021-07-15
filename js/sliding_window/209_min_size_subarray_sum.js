/**
 * 
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.



Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 * 
 * contigous subarray, makes me think of sliding window
 * 
 * start index at 0
 * end index gets incrmented by the for loop
 * if array sum < target keep moving end forward
 * if sum goes over target move left pointer forward (while sum is over limit)
 * 
 * to get sum we can subtract left and add right
 * 
 * nedd a way to track subarrays that have the target sum
 * if new found sum takes less number update the min which gets returned
 * 
 * 
 * MISSED the great than or equal part
 * 
 */
var minSubArrayLen = function (target, nums) {
  let min = Infinity
  let left = 0
  let sum = 0

  for (let right = 0; right < nums.length; right++) {
    // set distance inside the while loop not after
    // we set after when were looking for exact matches
    sum += nums[right]
    while (sum >= target) {
      min = Math.min(min, right + 1 - left)
      sum -= nums[left]
      left += 1
    }
  }

  return min === Infinity ? 0 : min
};

// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
// console.log(minSubArrayLen(4, [1, 3, 4]))
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5])) // expected 3