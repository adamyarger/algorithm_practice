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
  const heap = new HoMinHeap((child, parent) => child[0] < parent[0])
  const map = {}

  heap.push([3, 3])
  heap.push([2, 3])
  heap.push([1, 3])
  heap.push([4, 3])

  console.log(heap.items)

  nums.forEach(item => {
    map[item] = map[item] ? map[item] + 1 : 1

    if (heap.size < k) {
      // how to combine ke and count in min heap
    }
  })
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))