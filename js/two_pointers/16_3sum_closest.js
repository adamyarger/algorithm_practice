/**
 *
 * Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.



Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

 */


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * n integers
 * 
 * find 3 values in nums that the sum is closest to target
 * 
 * assume theres 1 solution
 * 
 * 3sum was about finding all unique combos that hit the target sum of 0
 * 
 * we dont have multiple outputs here, just 1 which ever one is closest
 * 
 * naive way would be to crate all permutations then return the one closest to target
 * 
 * what if we sort?
 * do we need to nest while loop?
 * dont need to skip duplicates besides not reusing the same val since there no out put only  a sum
 * 
 * how do we measure closeness?
 * absolute distance to 0 3sum - target === 0 mean exact was found
 * whatever absolute value is closer to 0
 * 
 * edge case negative target
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  // let distance = Infinity
  let min = Infinity

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1
    let right = nums.length - 1

    // 2sum while sorted type while loop
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      // absolute value takes care of both sides of negative or positive
      if ((Math.abs(sum - target)) < (Math.abs(min - target))) {
        min = sum
      }

      // WAS COMPARING WRONG SUM
      if (sum > target) {
        right--
      } else {
        left++
      }
    }
  }

  return min
};

console.log(threeSumClosest([-1, 2, 1, -4], 1))
console.log(threeSumClosest([1, 1, 1, 0], -100))