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
        # when we use subtraction we need less variables
        memo = [[0] * (n) for _ in range(m)]
        return self.recur(memo, m-1, n-1)

    def recur(self, memo, m, n):
        '''
        - if base m is 0 or n is 0
        - if win case return 1
        - if memo[m][n] > 0 return

        '''
        if m < 0 or n < 0:
            return 0
        if m == 0 and n == 0:
            # why is this or??
            return 1
        if memo[m][n] > 0:
            return memo[m][n]

        memo[m][n] = self.recur(memo, m-1, n) + self.recur(memo, m, n-1)
        return memo[m][n]


sol = Solution()
print(sol.uniquePaths(3, 7))


class BU:
    def uniquePaths(self, m: int, n: int) -> int:
        aux = [[1] * n for _ in range(m)]
        for row in range(1, m):
            for col in range(1, n):
                aux[row][col] = aux[row][col-1] + aux[row-1][col]
        return aux[-1][-1]


bu = BU()
print(bu.uniquePaths(3, 7))
