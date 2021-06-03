'''
33. Search in Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the
resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
'''
from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        '''
        - which way is it rotated?
        - check if the target is in the non rotated part by checking the lo and mid or mid and hi
        - this is a form of binary search, we need a base case, which is aas long as there one item left in the sub array were searching
        '''
        lo = 0
        hi = len(nums) - 1

        # GOT THIS WRONG!!!
        while hi >= lo:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            # we need to find out which way its rotated
            # left rotated mean everything from the mid to the lo are in sorted order
            if nums[lo] <= nums[mid]:
                if nums[lo] <= target and nums[mid] > target:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:
                # its right rotated, the right side of properly sorted
                if nums[mid] < target and nums[hi] >= target:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return -1


sol = Solution()
arr = [4, 5, 6, 7, 0, 1, 2]
print(sol.search(arr, 0))
