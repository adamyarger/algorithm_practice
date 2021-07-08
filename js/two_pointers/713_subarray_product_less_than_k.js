/**
 * Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.



Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 *  keep track of product which needs to start at 1 for multiplication
 * we need 2 pointers a left one and a right one
 * the left will will be instatiated outside a for loop
 * need a count outside
 * 
 * start looping through nums
 * calculate product
 * 
 * add while loop in for loop that runs if the product goes over or equals k
 * inside we can take away from the product by dividing the curren num
 * move left forward
 * 
 * after while loop update the count
 * count = count + right - left + 1
 * 
 * why?? because [1,2] has 3 products below 4 [1], [2], and [1,2]
 * the single digit ones are represented by the count so far since the first iteratio 
 * adds 1 and the second adds to 2 but we need that extra 1 at the end to get 3
 * 
 * we subtract left since we care about the current size of the subarray from left to right then add it on
 */
var numSubarrayProductLessThanK = function (nums, k) {
  let count = 0
  let product = 1
  let left = 0

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right]

    // make sure left and right havent crossed
    // left can only cross over if the while loop kept pushing it forwards
    // at that point we want the for loop to move things forward
    while (product >= k && left <= right) {
      // take away the left num and shrink the subarray
      product /= nums[left]
      left += 1
    }

    count = count + (right - left) + 1
  }

  return count
};

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100))