/**
 * The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.



Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
 */


var nextGreaterElement = function (nums1, nums2) {
  const map = {}
  const stack = []

  // create a map for each value in nums2 that points to its next biggest
  for (let i = nums2.length - 1; i >= 0; i--) {
    const num = nums2[i]

    // normal monotonic stack popping
    while (stack.length && stack[stack.length - 1] <= num) {
      stack.pop()
    }

    // if nothing is in stack then has to be -1
    if (stack.length === 0) {
      map[num] = -1
    } else {
      // set map val to the value
      map[num] = stack[stack.length - 1]
    }

    stack.push(num)
  }

  // extract the next biggest from the map
  const out = []
  for (const num of nums1) {
    out.push(map[num])
  }

  return out
}

let nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]

console.log(nextGreaterElement(nums1, nums2))