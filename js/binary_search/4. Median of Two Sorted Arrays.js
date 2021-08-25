/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).



Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
Example 3:

Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
Example 4:

Input: nums1 = [], nums2 = [1]
Output: 1.00000
Example 5:

Input: nums1 = [2], nums2 = []
Output: 2.00000
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 
 * use binary search
 * 
 * what are we looking for?
 * we want even number of items of both sides, once we hit that were done
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const len = nums1.length + nums2.length
  const nums = []
  let left = 0
  let right = 0
  let mid = len % 2 ? Math.floor(len / 2) : len / 2

  // can cut this time in half by stopping once left is >= half size
  while (nums.length <= mid) {
    if (right >= nums2.length || nums1[left] < nums2[right]) {
      nums.push(nums1[left])
      left += 1
    } else if (left >= nums1.length || nums1[left] >= nums2[right]) {
      nums.push(nums2[right])
      right += 1
    }
  }

  return len % 2
    ? nums[nums.length - 1]
    : (nums[nums.length - 1] + nums[nums.length - 2]) / 2
};

console.log(findMedianSortedArrays([1, 2], [3, 4]))
console.log(findMedianSortedArrays([1], [3]))