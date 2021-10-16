/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (d, f, target) {
  const memo = Array(d + 1).fill(-1).map(_ => Array(target + 1).fill(-1))

  function dfs(dice, left) {
    if (left < dice || left > dice * f) return 0
    if (dice === 1) return left <= f
    if (memo[dice][left] !== -1) return memo[dice][left]

    let total = 0

    for (let i = 1; i <= f; i++) {
      total += dfs(dice - 1, left - i)
      total %= (10 ** 9 + 7)
    }

    memo[dice][left] = total
    return total
  }

  return dfs(d, target)
};