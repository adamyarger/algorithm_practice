/**
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.



Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * 
 * How does this mix with 3sum and 2sum?
 * is there a sub problem?
 * its 2 sub problems one is the 2sum sorted problem of working end together
 * the other is the 3sum problem, put the 2sum in a for loop
 * 4sum is put it in another for loop
 * repeat for ksum
 * 
 * naive way is to use backtracking
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b)
  const out = []
  const len = nums.length

  // why - 3 ??? 3 other pointers
  // because we have 4 pointers total j will be outside by 1, left will be outside by 2, and right will be out by 3
  for (let i = 0; i < len - 3; i++) {
    for (let j = i + 1; j < len - 2; j++) {
      let left = j + 1
      let right = len - 1

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum === target) {
          out.push([nums[i], nums[j], nums[left], nums[right]])

          // get rid of duplicates
          while (left < right && nums[left] === nums[left + 1]) {
            left++
          }

          while (left < right && nums[right] === nums[right - 1]) {
            right--
          }
          left++
          right--
        } else if (sum > target) {
          right--
        } else {
          left++
        }
      }
      // skip dups, need to allow the work to be done at least 
      // once incase the whole set is repeats like[2, 2, 2, 2]
      while (nums[j] === nums[j + 1]) j++
    }
    // skip dups
    while (nums[i] === nums[i + 1]) i++
  }

  return out
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)) //[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2, 2, 2, 2, 2], 8))



var kSum = function (nums, target) {

};