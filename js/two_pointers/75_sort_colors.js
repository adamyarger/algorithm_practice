/**
 *
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.



Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
Example 3:

Input: nums = [0]
Output: [0]
Example 4:

Input: nums = [1]
Output: [1]
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * // sort in place
  // merge sort uses an auxilary array quick sort uses in place
  // we need to use the quick sort partition
  // pick a partition item at the start, set left and right pointers
  // move left forward as long as its smaller than partition
  // move right inwards as long as its bigger than partition
  // when they meet swap partition for last item

  since we only have 3 possibilities we just chose which position to switch them to
  swap 0 to its placethen swap 2 and 1 if needed
  then mve in
 */
var sortColors = function (nums) {
  function swap(a, b) {
    [nums[a], nums[b]] = [nums[b], nums[a]]
  }

  let cur = 0
  let left = 0
  let right = nums.length - 1

  while (cur <= right) {
    const val = nums[cur]
    if (val === 0) {
      swap(cur, left)
      left++
      cur++
    } else if (val == 2) {
      swap(cur, right)
      right--
    } else {
      cur++
    }
  }

  return nums
};

console.log(sortColors([2, 0, 2, 1, 1, 0]))