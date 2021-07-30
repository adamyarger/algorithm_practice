/**
 *
 * You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a < b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].



Example 1:


Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
Example 2:

Input: firstList = [[1,3],[5,9]], secondList = []
Output: []
Example 3:

Input: firstList = [], secondList = [[4,8],[10,12]]
Output: []
Example 4:

Input: firstList = [[1,7]], secondList = [[3,10]]
Output: [[3,7]]
 */

/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 * 
 * already sorted and they dont overlap within their own set
 * 
 * is equal it count at overlap represented as [5,5]
 * 
 * how is this similar to merge intervals or insert intervals?
 * 
 * merge was about handling 1 list this is about handling 2
 * 
 * reminds me of merge 2 sorted arrays, could have 2 lists then shft from themand compare values
 */
var intervalIntersection = function (firstList, secondList) {
  const out = []
  let first = firstList.shift()
  let second = secondList.shift()

  while (firstList.length || secondList.length) {
    // edge cases
    // one list has values the other is empty
    if ((!firstList.length && secondList.length) || (!secondList.length && firstList.length)) return out

    // we have an overlap
    // opposite logic would be true as well
    if (first[1] >= second[0] || second[1] >= first[0]) {
      // if intersection
      // min end and max start
      const end = Math.min(first[1], second[1])
      const start = Math.max(first[0], second[0])

      out.push([start, end])
      // who has the smaller end? go to the next one
      if (first[1] < second[1]) {
        first = firstList.shift()
      } else {
        second = secondList.shift()
      }

      // wheres the next end start?
    } else if (firstList.length && !secondList.length) {
      first = firstList.shift()
    } else if (!firstList.length && secondList.length) {
      second = secondList.shift()
    } else {
      first = firstList.shift()
      second = secondList.shift()
    }

    // when do we update first and second?

    // what if one interval was one big segment while the other was broken up?
  }

  return out
};

var firstList = [[0, 2], [5, 10], [13, 23], [24, 25]], secondList = [[1, 5], [8, 12], [15, 24], [25, 26]]

console.log(intervalIntersection(firstList, secondList))