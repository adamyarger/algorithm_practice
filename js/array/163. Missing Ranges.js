/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 * 
 * 
 * 
 * Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]
Explanation: The ranges are:
[2,2] --> "2"
[4,49] --> "4->49"
[51,74] --> "51->74"
[76,99] --> "76->99"
 */
var findMissingRanges = function (nums, lower, upper) {
  const out = []

  if (!nums.length) out.push([lower, upper])

  for (let i = 0; i < nums.length; i++) {
    const next = nums[i]
    if (next > lower) {
      out.push([lower, next - 1])
    }
    lower = next + 1
  }

  const last = nums[nums.length - 1]
  if (last < upper) {
    out.push([last + 1, upper])
  }

  return out.map(([x, y]) => x === y ? x.toString() : `${x}->${y}`)
};