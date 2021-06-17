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


- for each value we can pick it or not, this is the essence of 0/1 knapsack problem

https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/3jEPRo5PDvx
'''
from typing import List


# brute
class TopDown:
    def canPartition(self, nums: List[int]) -> bool:
        '''
        - since were trying to create 2 subsets of equal sum, the total sum needs to be even, we cant deal with fractions
        - The target combination were looking for is sum/2, if we find it the it exists
        - brute force were going to create veery combination possible of either choosing a number or nt choosing a number
        - then we work our way up, if we find our target value by combining numbers together then we have a match
        '''
        if sum(nums) % 2 > 0:
            return False

        target = sum(nums) // 2

        memo = [[None] * (target+1) for _ in range(len(nums))]
        return self.can_partition_recursive(memo, nums, target, 0)

    def can_partition_recursive(self, memo, nums, target, current_index):
        # had len(nums) == 0 missing???
        if current_index >= len(nums) or len(nums) == 0:
            return False

        if memo[current_index][target] is not None:
            return memo[current_index][target]

        if nums[current_index] == target:
            return True

        memo[current_index][target] = self.can_partition_recursive(memo, nums, target-nums[current_index], current_index + 1) \
            or self.can_partition_recursive(memo, nums, target, current_index + 1)

        return memo[current_index][target]


td = TopDown()
# print(td.canPartition([1, 5, 11, 5]))
# print(td.canPartition([1, 6, 7]))


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        _sum = sum(nums)
        if _sum % 2 != 0:
            return False
        target = _sum // 2

        row_len = target + 1
        col_len = len(nums) + 1

        matrix = [[None] * row_len for _ in range(col_len)]

        for row in range(col_len):
            for col in range(row_len):
                # up and back value amount
                if row == 0 or col == 0:
                    matrix[row][col] = True
                elif matrix[row-1][col]:
                    matrix[row][col] = matrix[row-1][col]
                elif col >= nums[row-1]:
                    matrix[row][col] = matrix[row-1][col-nums[row-1]]

        return matrix[-1][-1]


sol = Solution()
print(sol.canPartition([14, 9, 8, 4, 3, 2]))
print(td.canPartition([14, 9, 8, 4, 3, 2]))

##############################
##############################
##############################
##############################
############ OLD #############
##############################
##############################
##############################
##############################
##############################


# brute
# class TopDown:
#     def canPartition(self, nums: List[int]) -> bool:
#         '''
#         - in order for both subsets to be equal, the sum total must be even, becuase were dealing with integers
#         - This problem essentially means find if a number combination adds up to a specfic number, that number is sum/2
#         -
#         '''
#         _sum = sum(nums)
#         if _sum % 2 != 0:
#             return False

#         return self.can_partition_recursive(nums, _sum/2, 0)

#     def can_partition_recursive(self, nums, sum, current_index):
#         '''
#         - choose or dont choose
#         - if we choose subtract the current number from the sum, were looking
#           to get to a sum of zero because that means weve found a subset that hits the target
#         - if we find any sum that hits the target it works, because we already checked that the total sum is even,
#           so if you find the sum in a subset it means the remainder subset have to add up to the saem
#         '''
#         if sum == 0:
#             return True

#         size = len(nums)
#         if current_index >= size or size == 0:
#             return False

#         if nums[current_index] <= sum:
#             # whenever recursion is returning a true or false, put the recursive call in the if check
#             if self.can_partition_recursive(nums, sum-nums[current_index], current_index+1):
#                 return True

#         return self.can_partition_recursive(nums, sum, current_index+1)


# td = TopDown()
# # print(td.canPartition([1, 5, 11, 5]))
# print(td.canPartition([1, 6, 7]))


# # memoization
# class TopDown:
#     def canPartition(self, nums: List[int]) -> bool:
#         s = sum(nums)

#         # This is all about comparing 2 values that are equal, that means it has to have an event sum since x*2 is always event
#         if s % 2 != 0:
#             return False

#         # initialize a 2 dimensional matrix set -1 as the default value
#         # clean this up and make it easier to read
#         # the value were looking for is sum/2
#         # 14//2 + 1 = 8... why the plus 1?
#         matrix = [[-1] * ((s//2)+1) for _ in range(len(nums))]

#         if self.can_partition_recursive(matrix, nums, int(s/2), 0) == 1:
#             return True
#         else:
#             return False

#     def can_partition_recursive(self, matrix, nums, sum, current_index):
#         if sum == 0:
#             return 1

#         # if no more array or where at the last index return 0 which results in false
#         if len(nums) == 0 or current_index >= len(nums):
#             return 0

#         # -1 means we havent processed this number
#         if matrix[current_index][sum] == -1:
#             if nums[current_index] <= sum:
#                 if self.can_partition_recursive(matrix, nums, sum - nums[current_index], current_index + 1) == 1:
#                     matrix[current_index] = 1
#                     return 1
#             matrix[current_index][sum] = self.can_partition_recursive(
#                 matrix, nums, sum, current_index + 1)
#         return matrix[current_index][sum]


# td = TopDown()
# # print(td.canPartition([1, 5, 11, 5]))
# # print(td.canPartition([1, 6, 7]))


# class Solution:
#     def canPartition(self, nums: List[int]) -> bool:
#         s = sum(nums)

#         if s % 2 != 0:
#             return False

#         s = int(s / 2)
#         dp = [[False for x in range(s + 1)] for y in range(len(nums))]

#         # populate s = 0 columns
#         for i in range(0, len(nums)):
#             dp[i][0] = True

#         # form a subset only when the required sum is equal to its value
#         for j in range(1, s + 1):
#             dp[0][j] = nums[0] == j

#         # [
#         #     [True, True, False, False, False, False, False, False, False, False, False, False],
#         #     [True, False, False, False, False, False, False, False, False, False, False, False],
#         #     [True, False, False, False, False, False, False, False, False, False, False, False],
#         #     [True, False, False, False, False, False, False, False, False, False, False, False]
#         # ]

#         # process all subsets for all sums
#         for i in range(1, len(nums)):
#             for j in range(1, s + 1):
#                 # if we can get the sum 'j' without the number at index 'i'
#                 if dp[i - 1][j]:
#                     dp[i][j] = dp[i - 1][j]

#                 # else if we can find a subset to get the remaining sum
#                 elif j >= nums[i]:
#                     dp[i][j] = dp[i - 1][j - nums[i]]

#         print(dp)
#         # [
#         #     [True, True, False, False, False, False, False, False, False, False, False, False],
#         #     [True, True, False, False, False, True, True, False, False, False, False, False],
#         #     [True, True, False, False, False, True, True, False, False, False, False, True],
#         #     [True, True, False, False, False, True, True, False, False, False, True, True]
#         # ]

#         # the bottom-right corner will have our answer
#         return dp[len(nums) - 1][s]


# class Solution2(object):
#     def canFindSum(self, nums, target, ind, n, mem):
#         if target in mem:
#             return mem[target]
#         if target == 0:
#             mem[target] = True
#         else:
#             mem[target] = False
#             if target > 0:
#                 for i in range(ind, n):
#                     if self.canFindSum(nums, target - nums[i], i+1, n, mem):
#                         mem[target] = True
#                         break
#         return mem[target]

#     def canPartition(self, nums):
#         s = sum(nums)
#         if s % 2 != 0:
#             return False
#         return self.canFindSum(nums, s/2, 0, len(nums), {})


# sol = Solution()
# print(sol.canPartition([1, 5, 11, 5]))
