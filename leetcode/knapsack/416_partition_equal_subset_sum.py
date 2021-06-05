'''
416. Partition Equal Subset Sum

Given a non-empty array nums containing only positive integers, find if the array
can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
'''
from typing import List


# memoization
class TopDown:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)

        if s % 2 != 0:
            return False

        # initialize a 2 dimensional matrix set -1 as the default value
        # clean this up and make it easier to read
        matrix = [[-1 for _ in range(int(s/2)+1)] for _ in range(len(nums))]

        if self.can_partition_recursive(matrix, nums, int(s/2), 0) == 1:
            return True
        else:
            return False

    def can_partition_recursive(self, matrix, nums, sum, current_index):
        if sum == 0:
            return 1

        # if no more array or where at the last index return 0 which results in false
        if len(nums) == 0 or current_index >= len(nums):
            return 0

        # -1 means we havent processed this number
        if matrix[current_index][sum] == -1:
            if nums[current_index] <= sum:
                if self.can_partition_recursive(matrix, nums, sum - nums[current_index], current_index + 1) == 1:
                    matrix[current_index] = 1
                    return 1
            matrix[current_index][sum] = self.can_partition_recursive(
                matrix, nums, sum, current_index + 1)
        return matrix[current_index][sum]


td = TopDown()
print(td.canPartition([1, 5, 11, 5]))


# class Solution:
#     def canPartition(self, nums: List[int]) -> bool:
#         pass
