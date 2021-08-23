/**
 *
 * Given an array of meeting time intervals consisting of start and end times[[s1,e1],[s2,e2],...](si< ei), find the minimum number of conference rooms required.

Example 1:

Meetings: [[1,4], [2,5], [7,9]]
Output: 2
Explanation: Since [1,4] and [2,5] overlap, we need two rooms to hold these two meetings. [7,9] can
occur in any of the two rooms later.

Example 2:

Meetings: [[6,7], [2,4], [8,12]]
Output: 1
Explanation: None of the meetings overlap, therefore we only need one room to hold all meetings.

Example 3:

Meetings: [[1,4], [2,3], [3,6]]
Output:2
Explanation: Since [1,4] overlaps with the other two meetings [2,3] and [3,6], we need two rooms to
hold all the meetings.

Example 4:

Meetings: [[4,5], [2,3], [2,4], [3,5]]
Output: 2
Explanation: We will need one room for [2,3] and [3,5], and another room for [2,4] and [4,5].

Here is a visual representation of Example 4:

https://github.com/Cokeeeeman/leetcode-solutions/blob/master/greedy/253.-meeting-rooms-ii.md

KET INSIGHT:
always push
pop when no overlap
 */

import MinHeap from '../utils/MinHeap.js'

var minMeetingRooms = function (intervals) {
  const size = intervals.length

  if (size <= 1) return size

  // sort by start time
  intervals.sort((a, b) => a[0] - b[0])

  // track end time, soonest to end is at top
  const rooms = new MinHeap()

  for (let [start, end] of intervals) {
    // the soonest end time is the most likely to have no overlap
    // which means we can pop off
    if (rooms.size > 0 && rooms.peek() <= start) {
      rooms.pop()
    }
    // this always gets called because we need at least one room
    // the pop acts as an offset when no overlap happens
    rooms.push(end)
  }

  return rooms.size
}


console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])) // 2
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20], [10, 20], [20, 30]])) // 3
console.log(minMeetingRooms([[7, 10], [2, 4]])) // 1

console.log(minMeetingRooms([[1, 4], [2, 3], [3, 6]])) // 2

