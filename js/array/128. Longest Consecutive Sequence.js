/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.



Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 */

/**
 * @param {number[]} nums
 * @return {number}
 
 O(n) still means we can loop mltiple times
 create a set() which take o(n)
 then iterate through set and check if the next num exists
 this is o(n) and o(1) for get
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums)
  let best = 0
  // keep track of used
  for (const x of set) {
    // were looking for the start of a streak with x-1
    // this prevents double counting
    if (!set.has(x - 1)) {
      // we found the start, lets find the next one
      let y = x + 1
      while (set.has(y)) {
        // keep finding the next one
        y += 1
      }
      // get the count
      best = Math.max(best, y - x)
    }
  }
  return best
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))