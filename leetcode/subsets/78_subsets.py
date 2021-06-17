'''
LeetCode 78 - Subsets [medium]

Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1, 2, 3]
Output:
[
  [3],
  [1],
  [2],
  [1, 2, 3],
  [1, 3],
  [2, 3],
  [1, 2],
  []
]

Whats tthe time and space complexity???

O(2**N)

N grows each iteration
'''
from typing import List


# do this recurisivly as well
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        '''
        - need every combination
        - start with an empty set, on each iteration make a copy then add the new number to the copy then add it to the list of subsets
        '''
        subsets = [[]]
        for num in nums:
            for index in range(len(subsets)):
                subsets.append(subsets[index] + [num])
        return subsets

    def recurSubsets(self, nums: List[int]) -> List[List[int]]:
        output = []
        max_size = len(nums)

        def backtrack(size, first=0, cur=[]):
            # make all combinations at the current level i.e. [1][2][3]
            if len(cur) == size:
                # its at size, make a copy and append it to subsets output
                output.append(cur[:])
                return

            # keep adding new numbers
            for i in range(first, max_size):
                cur.append(nums[i])
                # backtrack on the next number option
                backtrack(size, i+1, cur)
                # this is called after recursion is done
                # the pop is the backtracking, we hit the size already at this point and its been added
                # so we can take it off the cur and move back up
                print(cur)
                cur.pop()

        # why add 1? we need to handle the empty subset, that means 4 different variations of size
        # starts at size 0 then 1 then 2 then 3
        for size in range(max_size+1):
            print(f'----- {size} -----')
            backtrack(size)
        return output


def subsets(nums: List[int]) -> List[List[int]]:
    subsets = []

    def recur(index, cur):
        if index == len(nums):
            # weve hit the base case
            subsets.append(cur)
            return

        # keep the original
        recur(index + 1, cur)
        # add a new number to the original
        # just like the iterative one, make a copy and add the new number
        recur(index + 1, cur + [nums[index]])

    recur(0, [])

    return subsets


sol = Solution()
# print(sol.subsets([1, 2, 3]))
# print(sol.recurSubsets([1, 2, 3]))
print(subsets([1, 2, 3]))
'''
----- 0 -----
----- 1 -----
[1]
[2]
[3]
----- 2 -----
[1, 2]
[1, 3]
[1]
[2, 3]
[2]
[3]
----- 3 -----
[1, 2, 3]
[1, 2]
[1, 3]
[1]
[2, 3]
[2]
[3]
[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
'''
