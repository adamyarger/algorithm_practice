/**
 * 
 * Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 *  use the pop way
 */
var isubsets = function (nums) {
  const out = []
  backtrack(nums, [], out)
  return out
};

function backtrack(nums, cur, out) {
  out.push(cur)
  nums.forEach((item, i) => {
    backtrack(nums.slice(i + 1), cur.concat(item), out)
  })
}

console.log(isubsets([1, 2, 3]))


var subsets = function (nums) {
  let len = nums.length
  const out = []

  function backtrack(start, cur) {
    // needs to be a copy... why?
    // because were using the same array and it wouold be pushing by reference
    out.push(cur.slice())

    for (let i = start; i < len; i++) {
      // when using push we need to pop after because arrrrays are passed by reference
      // the concat in the other one returns  anew array so its not a problem
      cur.push(nums[i])
      backtrack(i + 1, cur)
      cur.pop()
    }
  }

  backtrack(0, [])
  return out
};



console.log(subsets([1, 2, 3]))