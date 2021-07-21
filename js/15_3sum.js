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
 * backtracking will exceed time limit
 * since were looking for 0, we can solve this faster when the array is Sorted
 * 
 * sort
 * loop through
 * skip duplicates
 * use 2 pointers left and right since they ar most likely to cancel eachother out
 * while left and right havent crossed
 * check the sum (we have 2 pointer left and right then the middle i is shifting, on each shift were seeing if the sum is 0)
 * if sum is 0
 *  append
 *  shift left and right so theres no duplicates (while loops) 
 * elseif sum > 0 move end
 * else move start
 * 
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const out = []
  const len = nums.length

  for (let i = 0; i < nums.length; i++) {
    // the start gets set by the i + 1 so if 1 < 0 everything after is bigger than 0 and cant create a sum of 0
    if (nums[i] > 0) break

    // skip duplicates
    if (i && nums[i] == nums[i - 1]) continue

    start = i + 1 // why +1
    end = len - 1
    while (end > start) {
      const sum = nums[start] + nums[i] + nums[end]

      if (sum === 0) {
        out.push([nums[start], nums[i], nums[end]])

        // get rid of dups
        while (start < end && nums[start] === nums[start + 1]) {
          start += 1
        }
        while (end > start && nums[end] === nums[end - 1]) {
          end -= 1
        }
        start += 1
        end -= 1
      } else if (sum > 0) {
        // move in end
        end -= 1
      } else {
        start += 1
      }
    }
  }

  return out
};

console.log(threeSum([-4, -1, -1, 0, 1, 2]))

//[34,55,79,28,46,33,2,48,31,-3,84,71,52,-3,93,15,21,-43,57,-6,86,56,94,74,83,-14,28,-66,46,-49,62,-11,43,65,77,12,47,61,26,1,13,29,55,-82,76,26,15,-29,36,-29,10,-70,69,17,49]