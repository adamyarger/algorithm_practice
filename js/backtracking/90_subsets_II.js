/**
 * 
 * Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * allow duplicate mean dont start with i+1 for picking new candiddates
 * 
 * but dont allow repeat subset means we need to sort then check if the prior value matches before adding
 */
var subsetsWithDup = function (nums) {
  const out = []
  nums.sort()
  backtrack(nums, [], out)
  return out
};

function backtrack(nums, cur, out) {
  out.push(cur)
  for (let i = 0; i < nums.length; i++) {

    if (i && nums[i] === nums[i - 1]) continue

    backtrack(nums.slice(i + 1), cur.concat(nums[i]), out)
  }
}

console.log(subsetsWithDup([1, 2, 2]))