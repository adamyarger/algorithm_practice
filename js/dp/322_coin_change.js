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
// var brute = function (coins, amount) {
//   return dfs(coins, amount)
// };

// function dfs(coins, amount) {
//   if (amount === 0) return 0

//   let result
//   let min = Number.MAX_SAFE_INTEGER

//   for (let i = 0; i < coins.length; i++) {
//     if (coins[i] > amount) continue

//     result = Math.min(min, dfs(coins, amount - coins[i]) + 1)
//   }

//   return result === Number.MAX_SAFE_INTEGER ? -1 : result
// }

// const change = brute([1, 2, 3], 11)
// console.log(change)


var coinChange = function (coins, amount) {
  const memo = {}
  const out = dfs(coins, amount, memo)
  return out === Infinity ? -1 : out
};

function dfs(coins, amount, memo) {
  if (amount === 0) return 0

  // why does this work???
  // whats the min amount of coins at each level, it might stay the same in between finding the next best
  if (memo[amount]) return memo[amount]

  // keep track of min outside the loop
  // this acts like a cache at the top of the call stack
  let min = Infinity

  for (let i = 0; i < coins.length; i++) {
    if (coins[i] > amount) continue

    let count = dfs(coins, amount - coins[i], memo)

    if (count < min) {
      min = count + 1
    }
  }
  memo[amount] = min
  return memo[amount]
}

// console.log(coinChange([1, 2, 3], 11))

// console.log(coinChange([2, 5, 10, 1], 27))


// https://leetcode.com/problems/coin-change/discuss/133487/Clean-JavaScript-solution

function bottomUp(coins, amount) {
  /**
   * we dont need a 2d matrix since we just need to compare to the last coins outcome, then we overwrite it
   * we look back by coin amount since that acts as subtraction from the current amount were looking for what ever worked 2 back +1 is the answer
   */

  // pad with 0 to make adding easy
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 0; i <= amount + 1; i++) {
    for (const coin of coins) {
      // check if coin is choosable else it stays at infinity
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  console.log(dp)

  return dp[amount]
}

const bottom = bottomUp([1, 2, 3], 5)
console.log(bottom)