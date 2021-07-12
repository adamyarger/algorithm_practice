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


 since were looking for the smallest amoujt of coins... the best answer will contain the largest coins possible that work
 start with the largest coins and work down till you find a solution
 thats a greedy algorithm
 */
var coinChange = function (coins, amount) {
  if (amount < 0) return -1
  if (amount === 0) return 0
  // set to negative one since thats the default failure answer
  let cc = -1

  for (let i = 0; i < coins.length; i++) {
    // move it towards the base case
    const coin = coinChange(coins, amount - coins[i])
    if (coin >= 0) {
      cc = cc < 0 ? coin : Math.min(cc, coin)
    }
  }

  return cc < 0 ? -1 : cc + 1
};

const change = coinChange([1, 2, 5], 11)
console.log(change)