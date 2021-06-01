'''
LeetCode 78 - Subsets [medium]

Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1, 2, 3]
Output:
[
  [3],
  [1],
  [2],
  [1, 2, 3],
  [1, 3],
  [2, 3],
  [1, 2],
  []
]
'''
from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # start with an empty set
        subsets = [[]]

        # loop through the original nums param
        for num in nums:
            # This will grow as time progresses,
            # we need to copy each on the existing subsets and add the new number to it
            for i in range(len(subsets)):
                subsets.append(subsets[i] + [num])
        return subsets
