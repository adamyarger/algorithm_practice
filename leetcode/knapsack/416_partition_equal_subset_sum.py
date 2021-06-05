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
'''
from typing import List


# memoization
class TopDown:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)

        # This is all about comparing 2 values that are equal, that means it has to have an event sum since x*2 is always event
        if s % 2 != 0:
            return False

        # initialize a 2 dimensional matrix set -1 as the default value
        # clean this up and make it easier to read
        # the value were looking for is sum/2
        # 14//2 + 1 = 8... why the plus 1?
        matrix = [[-1] * ((s//2)+1) for _ in range(len(nums))]

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
# print(td.canPartition([1, 5, 11, 5]))
# print(td.canPartition([1, 6, 7]))


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)

        if s % 2 != 0:
            return False

        s = int(s / 2)
        dp = [[False for x in range(s + 1)] for y in range(len(nums))]

        # populate s = 0 columns
        for i in range(0, len(nums)):
            dp[i][0] = True

        # form a subset only when the required sum is equal to its value
        for j in range(1, s + 1):
            dp[0][j] = nums[0] == j

        # [
        #     [True, True, False, False, False, False, False, False, False, False, False, False],
        #     [True, False, False, False, False, False, False, False, False, False, False, False],
        #     [True, False, False, False, False, False, False, False, False, False, False, False],
        #     [True, False, False, False, False, False, False, False, False, False, False, False]
        # ]

        # process all subsets for all sums
        for i in range(1, len(nums)):
            for j in range(1, s + 1):
                # if we can get the sum 'j' without the number at index 'i'
                if dp[i - 1][j]:
                    dp[i][j] = dp[i - 1][j]

                # else if we can find a subset to get the remaining sum
                elif j >= nums[i]:
                    dp[i][j] = dp[i - 1][j - nums[i]]

        print(dp)
        # [
        #     [True, True, False, False, False, False, False, False, False, False, False, False],
        #     [True, True, False, False, False, True, True, False, False, False, False, False],
        #     [True, True, False, False, False, True, True, False, False, False, False, True],
        #     [True, True, False, False, False, True, True, False, False, False, True, True]
        # ]

        # the bottom-right corner will have our answer
        return dp[len(nums) - 1][s]


class Solution2(object):
    def canFindSum(self, nums, target, ind, n, mem):
        if target in mem:
            return mem[target]
        if target == 0:
            mem[target] = True
        else:
            mem[target] = False
            if target > 0:
                for i in range(ind, n):
                    if self.canFindSum(nums, target - nums[i], i+1, n, mem):
                        mem[target] = True
                        break
        return mem[target]

    def canPartition(self, nums):
        s = sum(nums)
        if s % 2 != 0:
            return False
        return self.canFindSum(nums, s/2, 0, len(nums), {})


sol = Solution()
print(sol.canPartition([1, 5, 11, 5]))
