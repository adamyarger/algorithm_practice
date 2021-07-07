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
 * 
 * if newinterval is not set or current interval goes before new interval starts... add the current interval
 * if newinterval end is less than current interval start... add it, then set newinterval to null, then add the current interval
 * else recalulate the new interval/ this is mergeing
 * after loop check and add the interval if it hasent
 * 
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  out = []

  for ([start, end] of intervals) {
    // MISSED!!! end < newInterval[0] --> this would mean the new interval is in front of the current interval... so add its not time for the ne winterval yet
    // we need to add the newinterval in the future or we already added it, so just add the current interval
    if (!newInterval || end < newInterval[0]) {
      // its already been added, just add the rest
      out.push([start, end])
    } else if (newInterval[1] < start) {
      // the end is before the first one, push it to the beginning
      out.push(newInterval)
      newInterval = null
      out.push([start, end])
      continue
    } else {
      newInterval[0] = Math.min(newInterval[0], start)
      newInterval[1] = Math.max(newInterval[1], end)
    }
  }

  if (newInterval) {
    out.push(newInterval)
  }

  return out
};

console.log(insert([[1, 3], [6, 9]], [2, 5]))