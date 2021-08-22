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
  const heap = new MinPriorityQueue({ priority: obj => obj.pair[0] + obj.pair[1] })
  const obj = {
    pair: [1, 2]
  }

  // keep adding to heap as long as nums eixst and under k amount
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      // heap.enqueue
    }
  }

};

// console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3))

console.log(kSmallestPairs([1, 1, 2], [1, 2, 3], 10))


// todo: create a ring buffer or data structure like dequeue to aboid O(n) shift time
// https://gist.github.com/tbjgolden/142f2e0b2c1670812959e3588c4fa8a2
// could track index instead