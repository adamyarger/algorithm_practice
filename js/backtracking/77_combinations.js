/**
 * 
 * Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].

You may return the answer in any order.



Example 1:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
Example 2:

Input: n = 1, k = 1
Output: [[1]]
 */


/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 
 * max k
 * candidates = [1 - n]
 */
var combine = function (n, k) {
  const nums = Array(n).fill(0).map((_, i) => i + 1)
  const out = []
  backtrack(nums, k, [], out)
  return out
};

function backtrack(nums, k, cur, out) {
  if (cur.length === k) {
    out.push(cur)
    return
  }

  for (let i = 0; i < nums.length; i++) {
    backtrack(nums.slice(i + 1), k, cur.concat(nums[i]), out)
  }
}

console.log(combine(4, 2))