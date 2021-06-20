'''
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
'''
from typing import List


class Permutations:
    def permute(self, nums: List[int]) -> List[List[int]]:
        out = []
        self.backtrack(nums, [], out)
        return out

    def backtrack(self, nums, cur, out):
        # base case, if no canidates left, weve hit the arr size
        if len(nums) == 0:
            out.append(cur)
            return

        # when cur and nums are combinaed we get all the numbers
        # combine them together to shift the ordering
        # take away from nums to get the subsets
        for i in range(len(nums)):
            self.backtrack(nums[:i] + nums[i+1:], cur + [nums[i]], out)


perm = Permutations()
print(perm.permute([1, 2, 3]))
