'''
33. Search in Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

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
        - sorted and distinct values
        - order is rotated... means we need to find the starting point
        - find the target values index, this is binary search with a twist

        ideas:
        keep track of prev and current, if current < prev we found the starting index
        - could use modulus for indexes since it acts like a wrap around
        - finding the change point could be linear, that wont work, need to start with binary search

        idea 2
        - compare left and right values to see whats bigger
        '''
        lo = 0
        hi = len(nums) - 1
        # keep searching as long as theres one item
        while lo <= hi:
            mid = (lo+hi) // 2
            if nums[mid] == target:
                return mid

            # if mid is larger than the lo then the left side is in the correct order bu t has been shifted left
            # its left rotated
            if nums[mid] >= nums[lo]:
                # make sure the target is still in the left sides range before binary searching
                if nums[lo] <= target and target < nums[mid]:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:  # its right rotated
                # check that the target is in the right side
                if nums[mid] < target and target <= nums[hi]:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return -1


sol = Solution()
arr = [4, 5, 6, 7, 0, 1, 2]
print(sol.search(arr, 0))
