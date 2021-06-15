'''
LeetCode 136 - Single Number [easy]

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:

Input: [2, 2, 1]
Output: 1
Example 2:

Input: [4, 1, 2, 1, 2]
Output: 4
'''
from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        '''
        - all duplicated number will zero out, whatever is left over is the single number
        - xor returns 0 on a bit when they are the same (1 and 1 or 0 and 0)
        '''
        n = 0
        for num in nums:
            n = n ^ num
        return n


sol = Solution()
print(sol.singleNumber([4, 1, 2, 1, 2]))
