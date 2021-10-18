/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (d, f, target) {
  // why  + 1. becuase its 1 based not 0 based
  const memo = Array(d + 1).fill(-1).map(_ => Array(target + 1).fill(-1))

  function dfs(dice, target) {
    // target < dice. the min is 1 * dice count
    if (((dice * f) < target) || target < dice) return 0
    // if one dice left were in the end game
    // if target is in die face range we have a winner
    if (dice === 1) return target <= f
    if (memo[dice][target] !== -1) return memo[dice][target]

    let total = 0

    for (let i = 1; i <= f; i++) {
      total += dfs(dice - 1, target - i)
      total %= (10 ** 9 + 7)
    }

    memo[dice][target] = total
    return total
  }

  return dfs(d, target)
};