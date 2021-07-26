/**
 * 
 * Time Complexity: O(n^{k - 1})O(nk−1), or O(n^3)O(n3) for 4Sum. We have k - 2k−2 loops, and twoSum is O(n)O(n).

Note that for k > 2k>2, sorting the array does not change the overall time complexity.

Space Complexity: O(n)O(n). We need O(k)O(k) space for the recursion. kk can be the same as nn in the worst case for the generalized algorithm.

Note that, for the purpose of complexity analysis, we ignore the memory required for the output.


start the sorted 2sum pointers when k is 2
start with loops and work towards 2sum

 */

var kSum = function (nums, target, k, result, results) {
  if (k == 2) {
    twoSum(nums, target, result, results)
  } else {
    backtrack(nums, target, k, result, results)
  }
  return
};

function twoSum(nums, target, result, results) {
  const len = nums.length
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
}

function backtrack(nums, target, k, result, results) {
  const len = nums.length
  // len-k is subtracting other pointers
  // for 3sum it was len-3, because there are 3 pointers beside the current i pointer
  for (let i = 0; i < len - k + 1; i++) {
    // what does nums[i] * k do?
    // nums[i] is the smallest number well see for the rest of the array
    // so if nums[i] was repeated the rest of the times and still bigger than target, it not possible to find the target

    // why nums[nums.length - 1] * k
    // nums[nums.length - 1] is the last item in the array, and also the biggest
    // so if the biggest number possible * how many pointers we need is smaller than the target, its not possible
    if (target < nums[i] * k || target > nums[nums.length - 1] * k) {
      break
    }

    // recursivly call ksum if neighbors are not duplicates
    // were in a for loop so it will get skipped
    if (i === 0 || i > 0 && nums[i - 1] !== nums[i]) {
      // backtracking type stuff
      kSum(nums.slice(i + 1), target - nums[i], k - 1, result.concat(nums[i]), results)
    }
  }
}

function fourSum(nums, target) {
  nums.sort((a, b) => a - b)
  const out = []
  kSum(nums, target, 4, [], out)
  return out
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)) //[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2, 2, 2, 2, 2], 8))



// REDO LATTER

// https://leetcode.com/problems/4sum/solution/