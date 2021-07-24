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
 * 
 * sub problems
 * - remove duplicates (skip duplicates)
 * - sort then use 2 pointers
 * - its like a normal 2 pointers atrting on the ends to find a sum in 2sum
 * - but we have a 3rd pointer in the middle that needs to iterate through
 * 
 * end gets reset every time
 * we use a for loop to shrink the array
 * 
 * can this be broken up to make easier to rememeber?
 * 
 * like classic 2sum there 3 scenarios
 * if equal if larger if less
 * 
 * reframe: 3 sum is the same as sorted 2 sum, we just repeat it in a for loop while setting a new 3rd partition item on each new iteration
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const out = []

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break

    // stop duplicates
    if (i && nums[i] === nums[i - 1]) continue

    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        out.push([nums[i], nums[left], nums[right]])
        // remove dups
        // if we didnt skip the other 2 pointers would be the same and the 3rd as well making it a duplicate
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }

        while (right > left && nums[right] === nums[right - 1]) {
          right--
        }

        // its a match we used both, move both in so we dont repeat
        right--
        left++
      } else if (sum > 0) {
        // move right in
        right--
      } else {
        // move left in
        left++
      }
    }
  }

  return out
};

console.log(threeSum([-4, -1, -1, 0, 1, 2])) // [ [ -1, -1, 2 ], [ -1, 0, 1 ], [ -1, 0, 1 ] ]

console.log(threeSum([0, 0, 0, 0]))


// console.log(threeSum([34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57, -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47, 61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49]))