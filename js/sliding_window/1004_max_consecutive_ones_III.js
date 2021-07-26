/**
 *
 * Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.



Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * just like longest repeat chars
 * but we only care about 1's and we can only flip 0's
 * 
 * how does this change things?
 */
var longestOnes = function (nums, k) {
  let zero = 0
  let max = 0
  let left = 0

  for (let right = 0; right < nums.length; right++) {
    const num = nums[right]

    if (num === 0) {
      zero++
    }

    while (zero > k) {
      const val = nums[left]
      if (val === 0) {
        zero--
      }
      left++
    }

    max = Math.max(max, right - left + 1)
  }

  return max
};

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))

console.log(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3))
