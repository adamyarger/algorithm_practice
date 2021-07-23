/**
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.



Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 
 vars
 array nums
 int target
 
 return indices in array format

 we solve 3sum by putting things in srted order then looking for a sum of 0

 options
 brute force double for loop O(n**2) time
 double for loop but start the inner loop at out loops index
 sort then find 2
 2 pointers if too big move right in if too small move left in O(n) time

 sort wont work, we need to return the indexes

 since there only 2 variables just look up in a map if weve seen this before
 */
var twoSum = function (nums, target) {
  const map = {}

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const remains = target - num
    if ((remains in map)) {
      return [map[remains], i]
    }
    map[num] = i
  }
  return [-1, -1]
};

console.log(twoSum([3, 2, 4], 6))
console.log(twoSum([2, 7, 11, 15], 9))
