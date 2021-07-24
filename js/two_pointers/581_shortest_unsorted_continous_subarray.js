/**
 * 
 * Given an integer array nums, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.

Return the shortest such subarray and output its length.



Example 1:

Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Example 2:

Input: nums = [1,2,3,4]
Output: 0
Example 3:

Input: nums = [1]
Output: 0
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * find a subarray that if sorted sorts the whole array in ascending order
 * 
 * brute force:
 * 2 nested loops
 * check if j > i mark it as left index
 * then if j < i mark right boundary
 */
var brute = function (nums) {
  let left = nums.length
  let right = 0

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        left = Math.min(left, i)
        right = Math.max(right, j)
      }
    }
  }
  return right - left < 0 ? 0 : (right - left) + 1
};

// console.log(brute([2, 6, 4, 8, 10, 9, 15]))
// console.log(brute([1, 2, 3, 4]))



var sort = function (nums) {
  let snums = nums.slice()
  snums.sort((a, b) => a - b)
  let start = snums.length
  let end = 0

  for (let i = 0; i < snums.length; i++) {
    if (snums[i] != nums[i]) {
      start = Math.min(start, i)
      end = Math.max(end, i)
    }
  }

  return end - start >= 0 ? end - start + 1 : 0
};

// console.log(sort([2, 6, 4, 8, 10, 9, 15]))
// console.log(sort([1, 2, 3, 4]))


var twoPointer = function (nums) {
  let lo = 0
  let hi = nums.length - 1

  // find the first number out of sorting order at the beginning
  while (lo < nums.length - 1 && nums[lo] <= nums[lo + 1]) {
    lo++
  }

  // its already sorted
  if (lo == nums.length - 1) return 0

  // find the upp end that out of place
  while (hi > 0 && nums[hi] >= nums[hi - 1]) {
    hi--
  }

  // find the max and min of the subarray
  let min = Infinity
  let max = -Infinity
  for (let i = lo; i < hi + 1; i++) {
    min = Math.min(min, nums[i])
    max = Math.max(max, nums[i])
  }

  // extend low out
  while (lo > 0 && nums[lo - 1] > min) {
    lo--
  }

  // extend hi out
  while (hi < nums.length - 1 && nums[hi + 1] < max) {
    hi++
  }

  return (hi - lo) + 1
}

console.log(twoPointer([2, 6, 4, 8, 10, 9, 15]))
console.log(twoPointer([1, 2, 3, 4]))
console.log(twoPointer([1, 3, 2, 3, 3]))


