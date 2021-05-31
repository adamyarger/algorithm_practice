'''
LeetCode 268 - Missing Number [easy]

Given an array containing n distinct numbers taken from 0, 1, 2, …, n,
find the one that is missing from the array.

Example 1:

Input: [3, 0, 1]
Output: 2
Example 2:

Input: [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8
Note:

Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?
'''
from typing import List


class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        '''
        - needs to be zero based since were using indexes

        - if the num value equals the arr length skip it for now
        '''
        start = 0

        # why use this over a for loop?
        while start < len(nums):
            num = nums[start]
            # we ignore the num that is the same size as the array
            # we ignore if the num equals the start, since that means
            # its in the right place already
            if num < len(nums) and num != start:
                nums[start], nums[num] = nums[num], nums[start]
            else:
                # move it forward
                start += 1

        # everything is in order now, find the index that
        # does match its value and return it
        for i in range(len(nums)):
            if nums[i] != i:
                return i

        # fallback value returned
        return len(nums)
