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
 * unique combos of sum
 * were looking for a target value
 * no repeats
 * 
 * how do we check if weve already seen a combo?
 * we take away from candidates each time we use one
 * == remove from nums add to cur selection
 * 
 * recursive call in a loop
 * if we go over target sum continue
 * this is kind of like coin change problem but instead of returning the smallest combo we return all and theres no repeats
 * 
 * 
 * what are the little trick for different vaiations of backtracking
 * - no repeats
 * - no reordering
 * - allow repeats
 * - allow reordering
 */
var combinationSum2 = function (candidates, target) {
  const out = []
  candidates.sort()
  backtrack(candidates, target, [], out, 0)
  return out
};

function backtrack(nums, target, cur, out, index) {
  if (target === 0) {
    out.push(cur)
    return
  }

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i]
    if (val > target || (nums[i] == nums[i - 1])) {
      continue
    }

    backtrack(nums.slice(i + 1), target - val, cur.concat(val), out, i + 1)
  }
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))