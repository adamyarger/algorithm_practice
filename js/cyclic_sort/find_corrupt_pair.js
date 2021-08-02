/**
 * Problem Challenge 1

Find the Corrupt Pair (easy)

We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’.
The array originally contained all the numbers from 1 to ‘n’, but due to a data error, one
of the numbers got duplicated which also resulted in one number going missing. Find both these numbers.

Example 1:

Input: [3, 1, 2, 5, 2]
Output: [2, 4]
Explanation: '2' is duplicated and '4' is missing.

Example 2:

Input: [3, 1, 2, 3, 6, 4]
Output: [3, 5]
Explanation: '3' is duplicated and '5' is missing.
 */

// which number is duplicated which number is missing
// find the missing number by i+1 where the duplicate is out of place
var findCorrupt = function (nums) {
  let i = 0
  while (i < nums.length) {
    const val = nums[i]
    if (nums[i] === i + 1 || nums[val - 1] === val) {
      i++
    } else {
      nums[i] = nums[val - 1]
      nums[val - 1] = val
    }
  }

  const out = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      out.push(i + 1, nums[i])
    }
  }

  return out
}

console.log(findCorrupt([3, 1, 2, 5, 2]))
console.log(findCorrupt([3, 1, 2, 3, 6, 4]))
