'''
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
'''


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        '''
        - this is similar to 2 step, fibonacci stairs
        - start with complete search, then add memo of past combinations

        - 2 choices go dow or go right
        '''
        return self.recur(m, n, 0, 1, 1)

    def recur(self, m, n, count, cur_m, cur_n):
        if cur_m > m or cur_n > n:
            return 0

        if cur_m == m and cur_n == n:
            return count + 1

        return self.recur(m, n, count, cur_m+1, cur_n) + self.recur(m, n, count, cur_m, cur_n+1)


sol = Solution()
print(sol.uniquePaths(3, 7))
