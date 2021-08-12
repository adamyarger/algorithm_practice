/**
 * Problem Statement
Given an numsay of numbers sorted in ascending order,
find the element in the numsay that has the minimum difference with the given ‘key’.

Example 1:

Input: [4, 6, 10], key = 7
Output: 6
Explanation: The difference between the key '7' and '6' is minimum than any other number in the numsay

Example 2:

Input: [4, 6, 10], key = 4
Output: 4

Example 3:

Input: [1, 3, 8, 10, 15], key = 12
Output: 10

Example 4:

Input: [4, 6, 10], key = 17
Output: 10
 */

function search(nums, key) {
  let lo = 0
  let hi = nums.length - 1
  // handle edges
  if (key < nums[0]) return nums[0]
  if (key > nums[hi]) return nums[hi]

  // binary search
  // this only works if we do a while <=
  // since running it 1 more time on equals will make the lo the hi and the hi the lo
  // this gives us 2 items closest to compare against one another
  while (lo <= hi) {
    const mid = Math.floor((hi + lo) / 2)

    if (key < nums[mid]) {
      hi = mid - 1
    } else if (key > nums[mid]) {
      lo = mid + 1
    } else {
      return key
    }
  }

  // compare after, should be around 2 elements to compare
  // if we went over on the right side then hi will be the lo
  // if we went over on the left side then 
  if (Math.abs(nums[lo] - key) <= Math.abs(nums[hi] - key)) {
    return nums[lo]
  }
  return nums[hi]
}

console.log(search([4, 6, 10], 7))
console.log(search([3, 6, 10], 5))