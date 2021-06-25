'''
Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0

'''
from typing import List


class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        '''
        - contigous
        - find product less than k --> product is multiplation of elements
        - were counting
        - find subarrays with product less than k

        - could use backtracking
        - but the contigous part

        - why does this work as a two pointers???
        '''
        left = 0
        prod = 1  # start at 1 for multiplication
        count = 0

        # loop through nums
        for right in range(len(nums)):
            prod *= nums[right]

            print(prod, left, right, count)
            # this wont kick in till our product goes over k
            # and the right and left pointers havent crossed yet
            while prod >= k and left <= right:
                prod /= nums[left]
                # move left forward
                left += 1
            # end result is a count its counting indexes
            # if we find a subarray with a good product, then all its subarrays also work
            # we subtract 1 for eachleft we move forward since it gets rid of an overlapping
            count += right - left + 1
        return count


sol = Solution()
print(sol.numSubarrayProductLessThanK([10, 5, 2], 100))
