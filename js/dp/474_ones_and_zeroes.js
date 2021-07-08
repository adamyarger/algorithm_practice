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
 */
var findMaxForm = function (strs, m, n) {
  return recur(strs, m, n, 0)
};

function recur(strs, m, n, index) {
  // base case placeholder... this is not correct
  if (m < 0 || n < 0 || index >= strs.length) {
    return 0
  }

  // get the counts
  const counts = strs[index].split('').reduce((acc, next) => {
    if (next === '1') {
      acc.one += 1
    } else {
      acc.zero += 1
    }
    return acc
  }, { one: 0, zero: 0 })

  // console.log(counts)

  // choose an item or dont choose an item
  // n 1's and m 0's
  let choose0 = 0
  if (counts.zero) {
    choose0 = recur(strs, m - counts.zero, n, index + 1) + 1
  }
  let choose1 = 0
  if (counts.one) {
    choose1 = recur(strs, m, n - counts.one, index + 1) + 1
  }

  console.log(choose1, choose0)

  return Math.max(choose1, choose0)
}

const strs = ["10", "0001", "111001", "1", "0"]
const m = 5
const n = 3

console.log(findMaxForm(strs, m, n))