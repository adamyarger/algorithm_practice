/**
 *
 *
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.



Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 
 * merge all overlapping intervals
 * 
 * when we sort by the start value we only need to check for 3 cases
 * 1.) no overlap = do nothing
 * 2.) A encloses B = delete B
 * 3.) A overlaps B = take the start of a and the max end of either a or b
 * -- maybe that also takes care of completely encloses
 */
var merge = function (intervals) {
  if (intervals.length < 2) return intervals

  const out = []

  intervals.sort((a, b) => a[0] - b[0])

  let start = intervals[0][0]
  let end = intervals[0][1]

  // this might need to be a while loop because we have to repeat a step again after merging
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i]
    if (interval[0] <= end) {
      // merge
      //  set end to max between 2 this handle enclosing
      end = Math.max(end, interval[1])
      // dont add to list yet we might have to merge the next one
    } else if (interval[0] > end) {
      console.log(start, end)
      out.push([start, end])
      start = interval[0]
      end = interval[1]
    }
  }

  out.push([start, end])

  return out
};

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))