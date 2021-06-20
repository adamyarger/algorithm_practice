'''
Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].

You may return the answer in any order.

 

Example 1:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
Example 2:

Input: n = 1, k = 1
Output: [[1]]
'''
from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        '''
        options = 1 through 4 = [1,2,3,4]
        number of items per combination = k = 2
        - similar to permutations since it will be the same length expect order does NOT matter
        '''
        out = []
        options = range(1, n+1)
        self.backtrack(options, [], k, out)
        return out

    def backtrack(self, options, cur, size, out):
        # max size hit, stop and return
        if len(cur) == size:
            out.append(cur)
            return
        # like subsets we need to take away options once using them so we dont repeat
        for i in range(len(options)):
            self.backtrack(options[i+1:], cur + [options[i]], size, out)


sol = Solution()
print(sol.combine(4, 2))
