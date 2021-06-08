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


# do this recurisivly as well
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        '''
        - start witth an empty array like so: [[]]
        - iterate through each number [1,2,3], make a copy of the existing subarrays, then add the new number to each in the copy
        - be sure to use len and range for the loop, other wise well get stuf in a loop
        '''
        subsets = [[]]
        for num in nums:
            for index in range(len(subsets)):
                subsets.append(subsets[index] + [num])
        return subsets

    def recurSubsets(self, nums: List[int]) -> List[List[int]]:
        '''
        - get all subset at each length
        - subsets at 0 []
        subsets at 1 [1][2][3]
        subsets at 2 [1,2][2,3][1,3]
        subsets at 3 [1,2,3]
        '''
        output = []
        max_size = len(nums)

        def backtrack(size, first=0, curr=[]):
            # were making all combination at the current level, so check if its done
            # base case
            if len(curr) == size:
                # when its at size, make a copy and append it to the output
                output.append(curr[:])
                return
            for i in range(first, max_size):
                curr.append(nums[i])
                backtrack(size, i + 1, curr)
                curr.pop()

        for size in range(max_size + 1):
            backtrack(size)
        return output


sol = Solution()
# print(sol.subsets([1, 2, 3]))
print(sol.recurSubsets([1, 2, 3]))
