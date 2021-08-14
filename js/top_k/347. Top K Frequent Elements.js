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
    heap.push([key, val])
    if (heap.size > k) {
      heap.pop()
    }
  }

  return Array(k).fill(null).map(item => {
    return parseInt(heap.pop()[0])
  })
};

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))
// console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))



// quick select
function quick(nums, k) {
  const map = {}

  nums.forEach(item => {
    map[item] = map[item] ? map[item] + 1 : 1
  })

  console.log(map)

  const counts = Object.entries(map)

  return partition(counts, 0, counts.length - 1, k).map(item => item[0])
}

/**
 * 
 * goal is to get every thing on the left lower than the pivot and everything on the right higher than the pivot
 * once left and right are the same index we swap with pivot to make it true
 * https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/664455/JavaScript-Iterative-Quick-Select-O(N)-Heavily-Commented
 */
function partition(counts, lo, hi, k) {
  const pivot = counts[lo][1]
  let left = lo + 1
  let right = hi

  while (left < right) {
    while (left < right && counts[left][1] <= pivot) {
      left += 1
    }

    while (right > left && counts[right][1] >= pivot) {
      right -= 1
    }

    // console.log(counts[left])

    [counts[left], counts[right]] = [counts[right], counts[left]]
  }
  [counts[lo], counts[left]] = [counts[left], counts[lo]]

  console.log(counts)

  // if enough values on he left are in place we should be good
  if (left + 1 === k) {
    return counts.slice(0, left + 1)
  } else if (left + 1 < k) {
    return partition(left + 1, hi)
  } else {
    return partition(lo, left - 1)
  }
}

function swap(a, b) {
  [counts[a], counts[b]] = [counts[b], counts[a]]
}

console.log(quick([4, 1, -1, 2, -1, 2, 3], 2))

// console.log(quick([2, 3, 1, 8, 3, 5, 2, 6], 2))
