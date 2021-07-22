/**
 * Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.



Example 1:

Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.
Example 2:

Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.
Example 3:

Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * must be in order from left to right and number must be in increasing order like 1,2,3
 * does something like 1,0,2,3 also work? can there be other numbers in between?
 * or does it have to be contigous? NO it does look like it
 * 
 * could treat it like 3sum
 * start with left mid and right pointers
 * 
 * use first item as partition then left = i + 1 and right
 * mve mid and test each then move left forward and repeat
 * 
 * reason why? because index matters so left mid and right matters
 * 
 * will be around O(n^2)
 */
var increasingTriplet = function (nums) {
  let min = nums[0]
  // the mid value which must be bigger than min and smaller than end
  let secondMinUpdatedAfterMin = Infinity

  for (let cur of nums) {
    // wil compare current and prev
    // if cur is smaller than the min min will no longer work
    if (cur <= min) {
      min = cur
    } else if (cur <= secondMinUpdatedAfterMin) {
      // second min is our middle value it need to be 
      // if we reach this statement it means min is less than cur so now we need cur to be greater than mid
      secondMinUpdatedAfterMin = cur
    } else {
      return true
    }
  }
  return false
};

var nums = [2, 0, 5, 1, 7, 6] // -> 017

console.log(increasingTriplet(nums))