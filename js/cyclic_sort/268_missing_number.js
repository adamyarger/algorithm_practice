/**
 * 
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?



Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
Example 4:

Input: nums = [0]
Output: 1
Explanation: n = 1 since there is 1 number, so all numbers are in the range [0,1]. 1 is the missing number in the range since it does not appear in nums.
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * if i == ival do nothing
 * if i is max number do nothing
 * swap i val with i
 * 
 * if see n do nothing or if i === val do nothing
 * else swap with i
 */
var missingNumber = function (nums) {
  let i = 0

  while (i < nums.length) {
    const val = nums[i]
    if (i === val || val === nums.length) {
      i++
    } else {
      // why not go forward on swap?
      // because what you just swapped is not in place yet
      // for loop would have skipped this
      nums[i] = nums[val]
      nums[val] = val
    }
  }

  let out = nums.findIndex(item => item === nums.length)

  return out !== -1 ? out : nums.length
};


console.log(missingNumber([3, 0, 1]))
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
