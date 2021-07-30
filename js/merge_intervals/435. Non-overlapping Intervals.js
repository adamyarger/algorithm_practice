/**
 * 
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.



Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 * 
 * do overlapping intervals exist?
 * how many?
 * 
 * sort first
 * 
 * choose the interval with the earliest end time
 * interval with earliest end time produces the max capaicty to hold the rest of the intervals
 */
var eraseOverlapIntervals = function (intervals) {
  // return overlapping first
  let end = -Infinity
  let count = 0

  intervals.sort((a, b) => a[1] - b[1])

  for (const [_start, _end] of intervals) {
    if (_start >= end) {
      // we have overlap
      end = _end
    } else {
      count += 1
    }
  }

  return count
};

console.log(eraseOverlapIntervals([[1, 2], [1, 3], [2, 3], [3, 4]]))