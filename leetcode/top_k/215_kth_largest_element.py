'''
215. Kth Largest Element in an Array (Medium)

Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Time Complexity: O(N log K)
Space Complexity: O(K)
'''
from typing import List
from heapq import *


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []

        # fill up the heap with k elements
        # by using a min heap with the top k largest items, the kth largest is alwasys at the top
        for i in range(k):
            heappush(min_heap, nums[i])

        # we already looped over the first k, let continue the loop
        for i in range(k, len(nums)):
            if nums[i] > min_heap[0]:
                heappop(min_heap)
                heappush(min_heap, nums[i])

        return min_heap[0]
