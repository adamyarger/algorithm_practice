//https://www.lintcode.com/problem/850/

/**
 * Description
We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

The Intervals is an 1d-array. Each two numbers shows an interval. For example, [1,2,8,10] represents that the employee works in [1,2] and [8,10].

Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

1.schedule and schedule[i] are lists with lengths in range [1, 100].
2.0 <= schedule[i].start < schedule[i].end <= 10^8.

Example
Example 1:

Input：schedule = [[1,2,5,6],[1,3],[4,10]]
Output：[(3,4)]
Explanation:
There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.
Example 2:

Input：schedule = [[1,3,6,7],[2,4],[2,5,9,12]]
Output：[(5,6),(7,9)]
Explanation：
There are a total of three employees, and all common
free time intervals would be [-inf, 1], [5, 6], [7, 9],[12,inf].
We discard any intervals that contain inf as they aren't finite.
 */

/**
 * 
 * @param {*} schedule 
 * 
 * no overlap and sorted
 * 
 * return the free time, that means the time in between intervals
 * 
 * [1,2,8,10] means [1,2] & [8, 10]
 * 
 * only include middle dont include ends
 * 
 * PARTS
 * break up intervals that are > 2
 * find where no overlap
 * 
 * options 1 go thrgouh and break up arrays > 2
 * then sort and find gaps
 * 
 * option2 go through break up arrays > 2
 * put them anything after the first 2 in a seperate array
 * 
 * then start mergeing together
 * 
 * then find gaps
 */
var employeeFreeTime = function (intervals) {
  const out = []
  let start = intervals[0][0]
  let end = intervals[0][1]

  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i]

    if (cur[0] > end) {
      out.push([end, cur[0]])
    }

    start = cur[0]
    end = cur[1]
  }

  return out
}

console.log(employeeFreeTime([[1, 2], [1, 3], [4, 10], [5, 6]]))
// console.log(employeeFreeTime([[1, 2, 5, 6], [1, 3], [4, 10]]))