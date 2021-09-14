/**
 * @param {number[]} heights
 * @return {number}
 * 
 * how can we use stacks
 * grow as big as possible
 * https://leetcode.com/problems/largest-rectangle-in-histogram/discuss/1430546/Monotonique-Stack-Solution-Intuition-(Javascript)
 */
var largestRectangleArea = function (heights) {
  // why??
  heights.push(0)
  let stack = []
  let res = 0

  for (let i = 0; i < heights.length; i++) {
    // test at each item
    let heightStart = i

    //
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [pos, height] = stack.pop()
      res = Math.max(res, (i - pos) * height)
      heightStart = pos
    }

    // push starting index
    stack.push([heightStart, heights[i]])
  }

  return res
};


console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))