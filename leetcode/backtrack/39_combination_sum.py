'''
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
Example 4:

Input: candidates = [1], target = 1
Output: [[1]]
Example 5:

Input: candidates = [1], target = 2
Output: [[1,1]]
'''
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        '''
        - if the current sum is greater than the target stop
        - if the current sum if equal to targeet break, and return

        - this is similar to permutations, iterate through each and test against combinations
        '''
        res = []
        # makes it easy for us to check if the next one is too large
        # if so skip all from there on out
        candidates.sort()
        self.backtrack(candidates, [], res, target)
        return res

    def backtrack(self, candidates, path, res, target):
        # base case, when ever were looking for exact matches we usually subtract and check for 0
        # if its too small we went over
        if target < 0:
            return
        if target == 0:  # found it
            res.append(path)
            return
        for i in range(len(candidates)):
            # candidates[i:] move the candidates forward, like subsets
            # --> subsets moves this forward with i+1, we dont here so we can reuse to test repeats as many times as needed
            # we can reused when we backtrack up again??
            # path + [candidates[i]] test adding the new number to the path
            # target - candidates[i] work towards base case
            print(i, candidates[i:], path + [candidates[i]])
            self.backtrack(
                candidates[i:], path + [candidates[i]], res, target - candidates[i])


sol = Solution()
print(sol.combinationSum([2, 3, 6, 7], 7))
