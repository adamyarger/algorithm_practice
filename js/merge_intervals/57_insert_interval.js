/**
 * 
 * Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
Example 3:

Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]
Example 4:

Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]
Example 5:

Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]
 */

/**
 * https://leetcode.com/problems/insert-interval/discuss/298982/Javascript-Solution-95-fast
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  // non overlaping to begin with but could overlap when inserting a new interval

  const result = []

  for (const [start, end] of intervals) {
    if (!newInterval || end < newInterval[0]) {
      result.push([start, end])
    } else if (newInterval[1] < start) {
      // its smaller than the start at it at the beginning, then add the start end, then the rest of the looping will add the rest
      result.push(newInterval)
      newInterval = null // set new INterval to null once its been added
      result.push([start, end])
    } else {
      // theres an overlap and we need to merge
      newInterval[0] = Math.min(newInterval[0], start)
      newInterval[1] = Math.max(newInterval[1], end)
    }
  }

  // push it at the end if it hasnt been added yet
  if (newInterval) {
    result.push(newInterval)
  }
  return result
};

console.log(insert([[1, 3], [6, 9]], [2, 5]))