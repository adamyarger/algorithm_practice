/**
 * 
 * You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.



Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
 */

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 
 * 
 * can have 5 zeroes max
 * can have 3 ones max
 * 
 * this is similar to knapsack having items with weight and values then 
 * trying to find the maximum value while staying within the max weight
 * 
 * were tracking 2 totals 1's and 0's
 * 
 * 
 * how do we head towards the base case?
 * 0's left and 1's left if either either runs out you cant choose it
 * 
 * strs are the items
 * we can either choose one or not choose one
 * 
 * the big difference is tracking 2 values that work towards the base case instead of one total weight
 *  
 * well be adding together since were counting
 * 
 * https://leetcode.com/problems/ones-and-zeroes/discuss/814077/Dedicated-to-Beginners
 */
var findMaxForm = function (strs, m, n) {
  // create an array of zero and one counts
  const counts = strs.reduce((acc, next) => {
    const arr = next.split('')
    const level = [0, 0]

    arr.forEach(item => {
      if (item === '0') {
        level[0] += 1
      } else {
        level[1] += 1
      }
    })
    acc.push(level)

    return acc
  }, [])

  return recur(counts, m, n, 0)
};

function recur(counts, mZeroes, nOnes, index) {
  const curCounts = counts[index]
  // base cases
  // 1. both m and n are equal to 0 or index is out of bounds
  // 0 and 0 is an edge case
  if ((mZeroes == 0 && nOnes == 0) || index >= counts.length) return 0

  // 2. n or m is less than 0, call recur again to skip this one
  // if either will go over then we cant pick it, move onto the next one
  if (curCounts[0] > mZeroes || curCounts[1] > nOnes) {
    return recur(counts, mZeroes, nOnes, index + 1)
  }

  const include = recur(counts, mZeroes - curCounts[0], nOnes = curCounts[1], index + 1) + 1
  const exclude = recur(counts, mZeroes, nOnes, index + 1)

  return Math.max(include, exclude)
}

const strs = ["10", "0001", "111001", "1", "0"]
const m = 5
const n = 3

console.log(findMaxForm(strs, m, n))