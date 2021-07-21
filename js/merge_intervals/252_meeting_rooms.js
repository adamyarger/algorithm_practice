/**
 * source: https://tenderleo.gitbooks.io/leetcode-solutions-/content/GoogleEasy/252.html
 * https://ttzztt.gitbooks.io/lc/content/sort/meeting-rooms.html
 *
 * Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

For example,

Given [[0, 30],[5, 10],[15, 20]],

return false.

Example 1:

Input:
[[0,30],[5,10],[15,20]]
Output: false
Example 2:

Input:[[7,10],[2,4]]

Output:true
 */

/**
 * 
 * @param {*} intervals 
 * 
 * remoinds me of merge intervals proplem
 * find any overlap of meeting, you would moranlly merge these
 * if we find mergable then we return false
 * 
 * if any overlaps return false
 * 
 * // sort first
 */
var canAttendMeetings = function (intervals) {
  // if a - b is less than 0 that means b is bigger than a so a would be sorted forst
  intervals.sort((a, b) => a[0] - b[0])

  let start = intervals[0][0]
  let end = intervals[0][1]

  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i]
    if (cur[1] < end) {
      return false
    }
    start = cur[0]
    end = cur[1]
  }

  return true
}

console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]]))
console.log(canAttendMeetings([[7, 10], [2, 4]]))