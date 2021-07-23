/**
 *
 *
 * 
 * Given an integer array nums sorted in non-decreasing order, return an array of the squares of each 
 number sorted in non-decreasing order.



Example 1:

Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
Example 2:

Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
 */


/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * return an array in increasing order after squaring each value
 * - negative values are the hard part hear
 * - take the absoute value then square it then put it in order
 * - were in order, so we can use two pointers
 * - the smaller the negative the more likely it need to shift to the other side of the array after squaring
 * 
 * left point right pointer
 * square left 
 * if bigger than squareed right add it after
 * 
 * says nothing about in place: could keep unshifting smaller items
 */
var sortedSquares = function (nums) {
  const out = []
  let left = 0
  let right = nums.length - 1

  // need equals as well since were creating a new array that means we need to push the last item
  // if it was in place we wouldnt since we would just lave it
  while (left <= right) {
    let left_val = Math.abs(nums[left]) ** 2
    let right_val = Math.abs(nums[right]) ** 2

    // we want to unshift the smallest
    // so start with the biggest

    if (left_val >= right_val) {
      // add it after right val
      out.unshift(left_val)
      left++
    } else {
      out.unshift(right_val)
      right--
    }
  }

  return out
};

console.log(sortedSquares([-7, -3, 2, 3, 11]))