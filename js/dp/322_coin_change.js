/**
 * 
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
Example 4:

Input: coins = [1], amount = 1
Output: 1
Example 5:

Input: coins = [1], amount = 2
Output: 2
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 
 - can repeat
 - order doesnt matter only total
 - this is similar to combination sum
 - find all combinations that add to amount
 - return the smallest one

 - do all variations from brute force to optimized
 - https://leetcode.com/problems/coin-change/discuss/77409/Evolve-from-brute-force-to-optimal-a-review-of-all-solutions
 */
var coinChange = function (coins, amount) {
  const out = []
  const cur = []
  // since were looking for an exact amount were going to subtract from amount
  backtrack(coins, amount, cur, out)
  console.log(out)
};

function backtrack(coins, amount, cur, out) {
  if (amount < 0) return
  if (amount === 0) {
    out.push(cur)
    return
  }

  for (let i = 0; i < coins.length; i++) {
    const newAmount = amount - coins[i]
    backtrack(coins.slice(i), newAmount, cur.concat(coins[i]), out)
  }
}

const change = coinChange([1, 2, 5], 11)
console.log(change)