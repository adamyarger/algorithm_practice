/**
 * Problem Statement
Find the maximum value in a given Bitonic array. An array is considered bitonic if it is monotonically increasing
and then monotonically decreasing. Monotonically increasing or decreasing means that for any index i in the array arr[i] != arr[i+1].

Example 1:

Input: [1, 3, 8, 12, 4, 2]
Output: 12
Explanation: The maximum number in the input bitonic array is '12'.

Example 2:

Input: [3, 8, 3, 1]
Output: 8

Example 3:

Input: [1, 3, 8, 12]
Output: 12

Example 4:

Input: [10, 9, 8]
Output: 10
 */

function search(nums) {
  let lo = 0
  let hi = nums.length - 1

  // only use < then we get a result no matter what as the final index
  while (lo < hi) {
    const mid = Math.floor((hi + lo) / 2)

    // only care about increasing side
    if (nums[mid] < nums[mid + 1]) {
      lo = mid + 1
    } else {
      // could be at the top so dont exclude the cirrent mid
      hi = mid
    }
  }

  return nums[lo]
}

console.log(search([1, 3, 8, 12, 4, 2]))
console.log(search([3, 8, 3, 1]))
console.log(search([1, 3, 8, 12]))
console.log(search([10, 9, 8]))
