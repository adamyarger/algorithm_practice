from typing import List


class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        - find right most value where i < i-1
        - if we cant find it reverse the nums and return (thats the min)
        - use i as a pivot item, then search from right to left to find the first val > i
        - we want the smallest value thats bigger than i, any thing to the right is in ascending order form right to left
        - swap the values
        - reverse the right side, make it ascending from LEFT to RIGHT, aka make it the smallest possible
        """
        pivot = None
        for i in range(len(nums) - 2, -1, -1):
            print(i)
            if nums[i] < nums[i+1]:
                pivot = i
                break

        if pivot is None:
            nums.reverse()
            return

        # find the swap
        for i in range(len(nums) - 1, pivot, -1):
            if nums[i] > nums[pivot]:
                nums[i], nums[pivot] = nums[pivot], nums[i]
                break

        # reverse everything after pivot
        # while loop with swaps
        left = pivot + 1
        right = len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1


_list = [1, 3, 2]

Solution().nextPermutation(_list)

print(_list)
