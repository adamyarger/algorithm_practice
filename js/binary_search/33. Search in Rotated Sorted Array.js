/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * binary search
 * find rotation direction
 * if rotation got pushed left then the left side is properly sorted
 * 
 * how does this change things?
 */
var search = function (nums, target) {
  let lo = 0
  let hi = nums.length - 1

  while (hi >= lo) {
    let mid = Math.floor((lo + hi) / 2)

    if (nums[mid] === target) {
      return mid
    }

    // means its properly sorted (left rotated)
    if (nums[lo] <= nums[mid]) {
      // means the answer is in that range cut the range in half set the new hi
      if (nums[lo] <= target && nums[mid] > target) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    } else {
      if (nums[hi] >= target && nums[mid] < target) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
  }

  return -1
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0))