/**
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.



Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 */

import { HoMinHeap } from '../utils/MinHeap.js'
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * return top k most frequent elements
 * 
 * time complexity must be better than O(n log n)
 * 
 * naive: sort the array, then loop through and count the k most frquent
 * 
 * create a dict with counts for each element, that n+n
 * 
 * create dict with counts, on each time we add check to see if its count bats the min in a heap if so add it
 * only allow k element in the heap.
 * 
 * n log n woul be the complexity
 */
var topKFrequent = function (nums, k) {
  const heap = new HoMinHeap((lt, gt) => lt[1] < gt[1])
  const map = {}

  nums.forEach(item => {
    map[item] = map[item] ? map[item] + 1 : 1
  })

  for (const [key, val] of Object.entries(map)) {
    console.log(key, val, heap.peek())

    if (heap.size < k || val > heap.peek()[1]) {



      if (heap.size === k) {
        heap.pop()
      }
      heap.push([key, val])
    }
  }

  console.log('--------')
  console.log(map)
  console.log(heap.items)

  return Array(k).fill(null).map(item => {
    return parseInt(heap.pop()[0])
  })
};

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))

console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))

