'''
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
'''
from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        '''
        - can contain dups, means dont use i+1 like subsets, more like combination_sum
        - no duplicate subsets, how to check for this? == base case
        '''
        out = []
        nums.sort()
        self.backtrack(nums, 0, [], out)
        return out

    def backtrack(self, nums, index, cur, out):
        # need a different base case, other subsets was implied by the for loop
        # no duplicate sets == same as subsets orignal but check for dups
        out.append(cur)
        # only use nums from current index onwards --> aoiding repeats
        for i in range(index, len(nums)):
            # nums[i] == nums[i-1] is why we needed to sort
            # duplicate subsets only happen when there are duplicate nums
            # only check at the ending size of the subset
            if i > index and nums[i] == nums[i-1]:
                continue
            self.backtrack(nums, i+1, cur + [nums[i]], out)


sol = Solution()
print(sol.subsetsWithDup([1, 2, 2]))


# learn how to do it with pop as well

# class Solution:
#     def subsetsWithDup(self, nums: 'List[int]') -> 'List[List[int]]':
#         res = []
#         cur = []
#         nums.sort()
#         self.subsetsWithDup_helper(nums, 0, cur, res)
#         return res

#     def subsetsWithDup_helper(self, nums, idx, cur, res):
#         res.append(cur[:])
#         for i in range(idx, len(nums)):
#             if i > idx and nums[i] == nums[i-1]:
#                 continue
#             cur.append(nums[i])
#             self.subsetsWithDup_helper(nums, i+1, cur, res)
#             cur.pop()
