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
        '''
        - start with an empty set
        - copy all existsing items and add the new number to each
        '''
        subsets = [[]]
        # this one loops through the nums array
        for num in nums:
            # this one loops through the substes array, each item is still an array (subset)
            # must use range otherwise well get stuck in a loop
            for i in range(len(subsets)):
                subsets.append([num] + subsets[i])
        return subsets


sol = Solution()
print(sol.subsets([1, 2, 3]))
