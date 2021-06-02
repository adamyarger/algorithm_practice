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

Whats tthe time and space complexity???

O(2**N)

N grows each iteration
'''
from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        subsets = [[]]

        for num in nums:
            for i in range(len(subsets)):
                subsets.append(subsets[i] + [num])
        return subsets


sol = Solution()
print(sol.subsets([1, 2, 3]))
