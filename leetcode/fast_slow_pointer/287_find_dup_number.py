'''
287. Find the Duplicate Number
Medium

7698

802

Add to List

Share
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.



Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [1,1]
Output: 1
Example 4:

Input: nums = [1,1,2]
Output: 1


Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.


Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
'''


class Solution(object):
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int

        Whats the pigeon whole problem?
        - given 4 containers and 5 items, one container hash to have more than one item... thats the duplicate

        Brute Force:
        - sort the list then iterate through wih 2 pointers to find the dups
        - use a map to keep track of items and how many times they have been seen

        Solution
        - since all numbers are in the range of possible indexes we can use them as pointers like a linked list
        - KEY insight: can the number values be used as indexes? YES, then we have a linked list, with that we can use cycle detection.
        """
