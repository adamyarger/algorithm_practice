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

//  https://github.com/mission-peace/interview/blob/master/src/com/interview/dynamic/CoinChangingMinimumCoin.java


 since were looking for the smallest amoujt of coins... the best answer will contain the largest coins possible that work
 start with the largest coins and work down till you find a solution
 thats a greedy algorithm

 // iterate through coins
 call recursion while subtracting the coins value from the amount
 if coin value is greater than amount coninure the array

 */
var coinChange = function (coins, amount) {
  const memo = {}

  function dfs(amount) {
    if (amount === 0) return 0
    if (amount in memo) return memo[amount]

    let min = Infinity

    for (let i = 0; i < coins.length; i++) {
      if (coins[i] > amount) continue
      let count = dfs(amount - coins[i])

      if (count < min) {
        min = count
      }
    }
    memo[amount] = min === -1 ? min : min + 1
    return memo[amount]
  }

  return dfs(amount)
};

const change = coinChange([1, 2, 3], 5)
console.log(change)