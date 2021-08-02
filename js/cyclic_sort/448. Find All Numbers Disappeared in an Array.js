/**
 * 
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.



Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:

Input: nums = [1,1]
Output: [2]
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * same as missing number but the lower bound moved up by one
 * the count is right, but there duplicates
 * 
 * put in place the first time
 * if already in right place use duplicate as placeholder
 * 
 * swap i +1 with val
 * 
 * one second loop if index not === val +1 add to ouput array
 */
var findDisappearedNumbers = function (nums) {
  let i = 0
  while (i < nums.length) {
    const val = nums[i]
    // check if duplicate already in place
    // i is current, 
    if (i + 1 === val || nums[val - 1] === val) {
      i++
    } else {
      // why this order???
      // this acts the same as temp swap
      nums[i] = nums[val - 1]
      nums[val - 1] = val
    }
  }

  const out = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      out.push(i + 1)
    }
  }

  return out
};

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))