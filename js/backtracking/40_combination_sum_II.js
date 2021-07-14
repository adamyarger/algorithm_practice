/**
 *
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.



Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 
 * 
 * unique combos that add up to  target sum
 * the unlimted choosing of a number is like the coin change problem
 * both can work by finsing all combos
 * this one is about reurning all unique combos, as in order doesnt matter
 * 
 * we check for unique by sorting it so all same numbers are next to eachother
 */
var combinationSum2 = function (candidates, target) {
  const out = []
  candidates.sort()
  backtrack(candidates, target, [], out)
  return out
};

function backtrack(nums, target, cur, out) {
  if (target === 0) {
    out.push(cur)
    return
  }


  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target || nums[i] === nums[i - 1]) continue

    backtrack(nums.slice(i + 1), target - nums[i], cur.concat(nums[i]), out)
  }
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))