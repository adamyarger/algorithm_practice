/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 
 merge result into nums1
 nums1 array is already at length
 only use the 1st m element to merge
 
 would swapping work
 if nums1 is less or equal keep it and move ahead
 if nums < swap the 2
 once at end swap all

 insta dof swap
 add to front
 take away 0 from back
 */
var merge = function (nums1, m, nums2, n) {
  // work backwords to fill in the array
  // we want largest first


  // i and j represent number indexes
  let i = m - 1
  let j = n - 1
  // k represent all indexes in nums1
  let k = n + m - 1

  while (i >= 0 || j >= 0) {
    if (i < 0) { // fill in from num2
      nums1[k--] = nums2[j--]
    } else if (j < 0) { // fill in from nums1
      nums1[k--] = nums1[i--]
    } else if (nums1[i] >= nums2[j]) {
      nums1[k--] = nums1[i--]
    } else {
      nums1[k--] = nums2[j--]
    }
  }
};



var one = [4, 5, 6, 0, 0, 0]
var two = [1, 2, 3]
merge(one, 3, two, 3)
console.log(one)

one = [1, 2, 3, 0, 0, 0]
two = [2, 5, 6]

merge(one, 3, two, 3)

console.log(one)