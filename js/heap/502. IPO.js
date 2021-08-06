/**
 * Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.



Example 1:

Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
Example 2:

Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
 */

import MinHeap from '../utils/MinHeap.js'

/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 * 
 * at most k projects
 * 
 * capital maps to profit
 * in order to get the profit you need enough capital
 * 
 * so if you start with no capital you can only choose a project that takes no capital
 * in return you grab the profit from the matching index
 * 
 * we want the largest value from profit - capital that we can possibly get
 * 
 * are the arrays sorted?
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const heap = new MinHeap()
  // merge the 2 arrays together
  const projects = zip(profits, capital).sort((a, b) => a[1] - b[1])
  let i = 0

  for (let j = 0; j < k; j++) {
    // on each iteration add all projects that are within budget
    // i makes sure we dont reuse the same project again
    while (i < projects.length && projects[i][1] <= w) {
      // use it as a max heap, we want the biggest profits
      heap.push(-projects[i][0])
      i++
    }

    if (heap.size) {
      // -= is to offset the max heap -
      // add the largest profit project to our capital
      w -= heap.pop()
    }
  }

  return w
};

function zip(...args) {
  const out = []
  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args[0].length; j++) {
      if (out.length < j + 1) {
        out.push([args[i][j]])
      } else {
        out[j].push(args[i][j])
      }
    }
  }
  return out
}

// console.log(zip(['a', 'b', 'c'], [1, 2, 3]))

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]))
