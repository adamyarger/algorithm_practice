/**
 * 
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.



Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
 */


/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * 3sum is all about wrapping a for loop around the solution to 2sum sorted
 * 
 * looking for 0
 * 
 * needs to be sorted that O(nlogn)
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  out = []

  // skip 2 because those spots are taken by the start and end pointers
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      // needs to be inside while loop to get recalculated
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        out.push([nums[i], nums[left], nums[right]])

        // get rid of dups
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }

        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }

        // move left and right inwards so we dont duplicate
        left++
        right--
      } else if (sum > 0) {
        right--
      } else {
        left++
      }
    }

    // always look forward, we already handled this 1 time at this point, so skip it if the next one is the same
    while (nums[i] === nums[i + 1]) {
      i++
    }
  }

  return out
};

console.log(threeSum([-4, -1, -1, 0, 1, 2])) // [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]

console.log(threeSum([0, 0, 0, 0]))


// console.log(threeSum([34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57, -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47, 61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49]))