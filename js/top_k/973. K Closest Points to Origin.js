/**
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).



Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 * 
 * what the top k closest points to 0, 0
 * 
 * how do we find the closest point?
 * 
 * euclidan formula tells us closeness to target
 * 
 * if we had an array of all euclidan formulas they will all be positive
 * put them in sorted order and the smallest are the closest (just like k smallest)
 * 
 * 
 */
var kClosest = function (points, k) {
  if (k === points.length) return points
  // const arr = points.map(point => euc(point, [0, 0]))
  return partition(points, 0, points.length - 1, k)
};

function euc(point1, point2 = [0, 0]) {
  return Math.sqrt(
    ((point1[0] - point2[0]) ** 2) + ((point1[1] - point2[1]) ** 2)
  )
}

function partition(points, lo, hi, k) {
  function swap(a, b) {
    [points[a], points[b]] = [points[b], points[a]]
  }

  let pivot = euc(points[lo])
  let left = lo + 1
  let right = hi

  while (true) {
    while (left <= right && euc(points[left]) <= pivot) {
      left += 1
    }

    while (left <= right && euc(points[right]) >= pivot) {
      right -= 1
    }

    if (left > right) {
      break
    }

    swap(left, right)
  }
  swap(lo, right)

  if (right === k) {
    return points.slice(0, right)
  } else if (k > right) {
    // search right
    return partition(points, right + 1, hi, k)
  } else {
    return partition(points, lo, right - 1, k)
  }
}

// console.log(kClosest([[1, 3], [-2, 2]], 1))

// console.log(kClosest([[3, 3], [5, -1], [-2, 4]], 2))

console.log(kClosest([[0, 1], [1, 0]], 2))
