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
        # we need to store the average for each one so we can compare them
        average = []
        _sum = 0.0
        # start keeps track of the oldest item, whic will get removed next
        # the newest item is automatically added by the for loop moving forward
        start = 0

        for index in range(len(nums)):
            _sum += nums[index]

            # keep moving forward until our index is at the correct window size
            # k - 1 is the index, in our case k-1 = 3 so we complete the if statemnt at index 3, our window is at size
            if index >= k-1:
                # weve hit the window size, add the average to the array
                average.append(_sum / k)
                # subtract the element leaving the window
                _sum -= nums[start]
                # slide the window right by one
                start += 1
        return max(average)


sol = Solution()
print(sol.findMaxAverage([1, 12, -5, -6, 50, 3], 4))
# => 12.75
# Time complexity = O(n)
