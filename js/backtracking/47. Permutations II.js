/**
 * Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.



Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * permutations with dups
 */
var permuteUnique = function (nums) {
  const out = []

  nums.sort((a, b) => a - b)

  function backtrack(nums, cur) {
    // take away from nums
    if (nums.length === 0) {
      out.push(cur)
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (i && nums[i] === nums[i - 1]) continue

      backtrack(
        [...nums.slice(0, i), ...nums.slice(i + 1)],
        cur.concat(nums[i])
      )
    }
  }

  backtrack(nums, [])
  return out
};


console.log(permuteUnique([1, 1, 2]))

test('should pass', () => {
  expect(permuteUnique([1, 1, 2])).toEqual([[1, 1, 2],
  [1, 2, 1],
  [2, 1, 1]])
})
