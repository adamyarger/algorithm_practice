/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.



Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]

 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 
 * moves all 0's the the end while keeping order
 * IN PLACE!!!
 * that means cyclic sort, swap corisponding values or ---- (store onor more different values at same pointer)
 * this is similar to the one where we swap value with their exact matching index and skipped the largest
 * 
 * naive way is the splice 0 when found and push it to the end
 * 
 * other way, use 2 pointers
 * find the first non zero and find the first 0
 * swap places
 * then find the next non zero and swap with the zero
 * if run into another zero skip it
 * this should lead to all zeros at the end
 * 
 * the essence is that we always need to know where the first 0 is, because that holds the spot or next non zero should be
 */
var moveZeroes = function (nums) {
  let index = 0

  for (let i = 0; i < nums.length; i++) {
    // dont need a while loop the for loop will take care of things
    if (nums[i] !== 0) {
      // set index to non 0, even if its the same item
      nums[index] = nums[i]
      // as long as our index issnt at the same place complete the swap
      if (index !== i) nums[i] = 0
      // no matter what we just made index a non 0 so we can move it forward
      index++
    }
  }
};

var nums = [0, 1, 0, 3, 12]
moveZeroes(nums)
console.log(nums)

nums = [0, 1]
moveZeroes(nums)
console.log(nums)