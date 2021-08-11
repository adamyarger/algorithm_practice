/**
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.



Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
 */

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * return the min element in array
 * we have a a target
 * if mid > mid-1
 * edge case  its in normal order then return min, can do this in if statement on top
 * 
 * this is like the find next biggest except we care about the other way
 */
var findMin = function (nums) {
  // handle unrotated edge case 
  // <= handle array like [1] with only 1 element which is first and last
  if (nums[0] <= nums[nums.length - 1]) return nums[0]
  let lo = 0
  let hi = nums.length - 1

  // do we need = in <=??? its not an exact target so im leaning towards no
  while (lo < hi) {
    let mid = Math.floor((hi + lo) / 2)

    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1]
    }

    if (nums[mid] < nums[mid - 1]) {
      return nums[mid]
    }

    if (nums[mid] > nums[lo]) {
      // search right, we already took care of the edge case of min being unrotated
      // so now if lo is smaller we know its in the right half
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
};

console.log(findMin([3, 4, 5, 1, 2]))

console.log(findMin([4, 5, 6, 7, 0, 1, 2]))