/**
 * The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.

For examples, if arr = [2,3,4], the median is 3.
For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.
You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array. Answers within 10-5 of the actual value will be accepted.



Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
Explanation:
Window position                Median
---------------                -----
[1  3  -1] -3  5  3  6  7        1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7        3
 1  3  -1  -3 [5  3  6] 7        5
 1  3  -1  -3  5 [3  6  7]       6
Example 2:

Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * sliding window of size k
 * window moves elft to right the size is k
 * each time it moves right by one return the median
 * 
 * know we need 2 heaps
 * 
 * do a sliding window like normal
 * do this brute force first
 * 
 * this is the same idea as find median of data stream, just with a different way of adding and removing vals
 * move right means pop from left push from right
 * 
 * how do you remove the correct value from the heap?
 */
var medianSlidingWindow = function (nums, k) {
  let out = []
  let left = 0
  let right = 0
  let cur = []

  while (right < nums.length) {
    cur.push(nums[right])

    if (right - left + 1 === k) {
      const temp = cur.slice().sort((a, b) => a - b)

      console.log(temp)

      let median
      if (k % 2) {
        // grab the middle
        median = temp[Math.floor(k / 2)]
      } else {
        median = (temp[k / 2] + temp[k / 2 - 1]) / 2
      }

      out.push(median)
      // take it off for the next iteration
      cur.shift()
      left++
    }

    right++
  }

  return out
};

// console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))


console.log(medianSlidingWindow([1, 4, 2, 3], 4)) // 2.5