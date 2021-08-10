/**
 * Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.



Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]
Example 4:

Input: nums = [1]
Output: [1]
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * source: https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
 * 1.) find the longest non increaing suffix (left most spot where i+1 > i)
 * 2.) this should give us the pivot element i
 * 3.) find right most item that is larger than the pivot i (dont include i)
 * 4.) swap pivot with found item
 * 5.) reverse suffix (items after pivot)
 */
var nextPermutation = function (nums) {
  if (nums.length <= 1) return nums

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      const large = nextLarge(i)
      swap(large, i)
      reverse(i + 1)
      return nums
    }
  }

  return nums.reverse()

  function swap(a, b) {
    [nums[a], nums[b]] = [nums[b], nums[a]]
  }

  function nextLarge(index) {
    // we can return the first since we already know the array sorted 
    // in descending order so the first found will be the smallest
    for (let i = nums.length - 1; i > index; i--) {
      if (nums[i] > nums[index]) return i
    }
  }

  function reverse(index) {
    let left = index
    let right = nums.length - 1
    while (left < right) {
      swap(left, right)
      left++
      right--
    }
  }
};

console.log(nextPermutation([1, 2, 3]))
console.log(nextPermutation([1, 3, 2]))

// console.log(nextPermutation([1, 1, 5, 2, 3]))

// console.log(nextPermutation([0, 1, 2, 5, 3, 3, 0]))
