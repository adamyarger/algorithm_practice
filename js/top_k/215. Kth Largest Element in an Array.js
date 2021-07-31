/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.



Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 */

import MinHeap from '../utils/MinHeap.js'

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * any time we here k smallest or biggest its most likely a heap
 * 
 * to get the kth largest we create a heap of size k
 * then any time we see a number bigger than the top of the heap we replace the min with that number
 * by the end the kth will be the smallest in the heap
 */
var findKthLargest = function (nums, k) {
  const heap = new MinHeap()

  for (let i = 0; i < k; i++) {
    heap.push(nums[i])
  }

  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap.peek()) {
      heap.pop()
      heap.push(nums[i])
    }
  }
  console.log(heap.items)
  return heap.peek()
};


console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))
// [3, 2, 1, 5, 6, 4]
// [1, 2, 3, 4, 5, 6]