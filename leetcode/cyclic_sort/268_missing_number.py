'''
LeetCode 268 - Missing Number [easy]

Given an array containing n distinct numbers taken from 0, 1, 2, ..., n,
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
        - cyclic sort, look for range of numbers and find the missing
        - this is only truly efficient if the numbers can be used as indexes otherwise a cycle sort is O(n**2) since we have to scan each pass through
        - if the item is not in position swap it with the index spot, otherwise ignore
        - when everything is in place loop through and find the index of the biggest item
        '''
        start = 0
        hi = len(nums)
        while start < hi:
            num = nums[start]
            # compare the index and the num
            if num == start or num == hi:
                start += 1
            else:
                nums[num], nums[start] = nums[start], nums[num]

        for i in range(hi):
            if nums[i] == hi:
                return i

        # if everything is in place then the big number is missing
        return hi


sol = Solution()
print(sol.missingNumber([3, 0, 1]))
