/**
 *
 * Given an array of meeting time intervals consisting of start and end times[[s1,e1],[s2,e2],...](si< ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]

Output:1

sort

how do we determine meeting rooms?
how many meeting are happening at once?
 */

var minMeetingRooms = function (intervals) {
  let max = 0
  let cur = 0

  intervals.sort((a, b) => a[0] = b[0])

  let start = intervals[0][0]
  let end = intervals[0][1]

  // find max overlaps at once
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i]

    if (interval[0] < end) {
      // overlap add to cur count
      cur += 1
    } else {
      cur = 0
    }

    start = interval[0]
    end = interval[1]

    max = Math.max(max, cur)
  }

  return max
}


console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])) // 2
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20], [10, 20], [20, 30]])) // 3
console.log(minMeetingRooms([[7, 10], [2, 4]])) // 1
