'''
LeetCode 643 - Maximum Average Subarray I [easy]

Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.

Example:

Input: [1, 12, -5, -6, 50, 3], k = 4
Output: 12.75
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
'''


class Solution:
    def findMaxAverage(self, nums, k):
        avgs = []
        # we need to know where the eindow starts, we know where it ends since the for loop takes care of that
        start = 0
        # the sum is what changes each time we add and subtract new items
        _sum = 0.0
        # keep growing the window till its the correct size, then do add and subtract
        for index, value in enumerate(nums):
            # the index is at window size when it hits index k-1
            _sum += value
            if index >= (k-1):
                avgs.append(_sum/k)
                _sum -= nums[start]
                start += 1
        return max(avgs)


sol = Solution()
print(sol.findMaxAverage([1, 12, -5, -6, 50, 3], 4))
# => 12.75
# Time complexity = O(n)
