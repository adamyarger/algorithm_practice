/**
 * 
 * 416. Partition Equal Subset Sum
Medium

4968

96

Add to List

Share
Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.



Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * were looking for a target value of half the sum
 * if the target sum exists return true
 */
var canPartition = function (nums) {
  const sum = nums.reduce((acc, item) => acc + item, 0)
  // needs to be even to be able to split
  if (sum % 2 !== 0) return false

  const target = sum / 2
  const memo = {}

  return dfs(memo, nums, target)
};

function dfs(memo, nums, target) {
  if (target === 0) return true

  if (target in memo) return memo[target]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target) continue

    if (dfs(memo, nums.slice(i + 1), target - nums[i])) {
      memo[target] = true
      return memo[target]
    }
  }

  memo[target] = false

  return memo[target]
}

console.log(canPartition([1, 5, 11, 5]))

console.log(canPartition([1, 2, 3, 5]))