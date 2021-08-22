/**
 * You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

Define a pair (u, v) which consists of one element from the first array and one element from the second array.

Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.



Example 1:

Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
Example 2:

Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
Example 3:

Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]
 */

import { MinPriorityQueue } from '@datastructures-js/priority-queue'
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 * 
 * create pairs from 2 sorted lists
 * return k pairs with smallest sum
 * can repeat num in list
 * 
 * use 2 heaps to track smallest values. store as object so we can track arr index and value.
 * prvent duplicate pairs. remove the largest pair number from heap keep the smallest.
 * fill in forst k pairs is all we need since its already in sorted order
 */
var kSmallestPairs = function (nums1, nums2, k) {
  if (!nums1.length || !nums2.length) return out

  const visited = new Set()
  const heap = new MinPriorityQueue({ priority: obj => obj.sum })
  const out = []

  heap.enqueue({ sum: nums1[0] + nums2[0], i: 0, j: 0 })
  visited.add([0, 0].join('-'))

  while (out.length < k && heap.size()) {
    const val = heap.dequeue().element
    out.push([nums1[val.i], nums2[val.j]])

    if (val.i + 1 < nums1.length && !visited.has([val.i + 1, val.j].join('-'))) {
      heap.enqueue({ sum: nums1[val.i + 1] + nums2[val.j], i: val.i + 1, j: val.j })
      visited.add([val.i + 1, val.j].join('-'))
    }

    if (val.j + 1 < nums2.length && !visited.has([val.i, val.j + 1].join('-'))) {
      heap.enqueue({ sum: nums1[val.i] + nums2[val.j + 1], i: val.i, j: val.j + 1 })
      visited.add([val.i, val.j + 1].join('-'))
    }
  }

  return out
};

console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3))

console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 10))


// todo: create a ring buffer or data structure like dequeue to aboid O(n) shift time
// https://gist.github.com/tbjgolden/142f2e0b2c1670812959e3588c4fa8a2
// could track index instead