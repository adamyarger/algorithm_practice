/**
 * 
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.



Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const out = []
  backtrack(nums, [], out)
  return out
};

function backtrack(nums, cur, out) {
  // keep taking away candidates and adding them to the cur
  // when no more left add the cur to output and return (aka backtrack) this puts the last item back
  if (nums.length === 0) {
    out.push(cur)
    return
  }
  nums.forEach((val, i) => {
    backtrack([...nums.slice(0, i), ...nums.slice(i + 1)], cur.concat(val), out)
  })
}

console.log(permute([1, 2, 3]))

// do one by cur reference with slice to copy and pop