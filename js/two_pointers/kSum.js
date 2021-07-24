

var kSum = function (nums, target, k, result, results) {
  const len = nums.length

  if (len < k || k < 2) return

  if (k == 2) {
    let left = 0
    let right = len - 1

    while (left < right) {
      // 2 sum routine
      if (nums[left] + nums[right] === target) {
        results.push(result.concat(nums[left], nums[right]))

        while (left < right && nums[left] === nums[left - 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }

        left++
        right--
      } else if (nums[left] + nums[right] > target) {
        right--
      } else {
        left++
      }
    }
  } else {
    for (let i = 0; i < len - k + 1; i++) {
      // since its sorted we can break early
      if (target < nums[i] * k || target > nums[-1] * k) {
        break
      }

      if (i === 0 || i > 0 && nums[i - 1] !== nums[i]) {
        kSum(nums.slice(i + 1), target - nums[i], k - 1, result.concat(nums[i]), results)
      }
    }
  }

  return
};

function fourSum(nums, target) {
  nums.sort((a, b) => a - b)
  const out = []
  kSum(nums, target, 4, [], out)
  return out
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)) //[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2, 2, 2, 2, 2], 8))