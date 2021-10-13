/**
 * @param {number[]} nums
 * @return {number}
 
 last index in min jumps
 staircase expcept the value of index determines max jump amaount
 */
var jump = function (nums) {
  const memo = Array(nums.length).fill(0)

  function dfs(index) {
    if (index >= nums.length - 1) return 0
    if (!nums[index]) return Infinity
    if (memo[index]) return memo[index]

    let min = Infinity

    // test the outcome ate each amount, moves the start point forward
    for (let i = index + 1; i <= index + nums[index]; i++) {
      min = Math.min(min, dfs(i) + 1)
    }

    memo[index] = min
    return min
  }

  return dfs(0)
};