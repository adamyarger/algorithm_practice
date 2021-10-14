/**
 * Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.



Example 1:

Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;
The number 2 can't find next greater number.
The second 1's next greater number needs to search circularly, which is also 2.
Example 2:

Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
 */
var nextGreaterElements = function (nums) {
  const out = []
  const stack = []

  // iterate backwards
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) { // determine by height
      stack.pop() // short one go away while blocked
    }
    const tall = stack.length === 0 ? -1 : stack[stack.length - 1]
    out.push(tall)
    stack.push(nums[i])
  }

  return out
};

console.log(nextGreaterElements([2, 1, 2, 4, 3])) // [4,2,4,-1,-1]








var brute = function (nums) {
  const out = []

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    let j = i + 1

    while (true) {
      const index = (j % nums.length)
      if (nums[index] > num) {
        out.push(nums[index])
        break
      } else if ((index) === i) {
        out.push(-1)
        break
      }
      j += 1
    }
  }

  return out
};