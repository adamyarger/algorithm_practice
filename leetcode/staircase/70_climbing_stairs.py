'''
LeetCode 70 - Climbing Stairs [easy]

You are climbing a stair case. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note:

Given n will be a positive integer.

Example 1:

Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
--> 1 step + 1 step
--> 2 steps
Example 2:

Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
--> 1 step + 1 step + 1 step
--> 1 step + 2 steps
--> 2 steps + 1 step
'''
from typing import List


def bruteClimb(n: int) -> int:
    if n == 0:
        return 0
    if n == 1:
        return 1
    if n == 2:
        return 2

    # if we take one step, we subtract one
    one = bruteClimb(n - 1)
    # if we take 2 steos we subtract 2
    two = bruteClimb(n - 2)

    return one + two


class Solution:
    '''
    memoization is all about first firguring out the vryute force way, then drawing out the
    call stack (tree) and seeing the repeating function calls, then we cache those in an array or dict
    '''

    def climbStairs(self, n: int) -> int:
        memo = [0 for x in range(n+1)]
        return self.recurClimb(memo, n)

    def recurClimb(self, memo: List[int], n: int) -> int:
        if n <= 2:
            return n

        # check if weve seen this step amount before, if we have use it
        # otherwise traverse
        if memo[n] == 0:
            one = self.recurClimb(memo, n-1)
            two = self.recurClimb(memo, n-2)
            memo[n] = one + two
        return memo[n]


# sol = Solution()
# print(sol.climbStairs(4))


def bottomUpClimb(n: int) -> int:
    tab = [0] * (n+1)
    # we dont take any steps, so theres only one way
    tab[0] = 1
    # we take one step to reach the end, this is the only way
    tab[1] = 1

    # we took care of the first 2, so skip them in the for loop
    for i in range(2, n+1):
        # this is looks like fibonacci
        tab[i] = tab[i-1] + tab[i-2]

    return tab[n]


# print(bottomUpClimb(4))

def bottomUpBetter(n: int) -> int:
    '''
    - we only need the last 2 to calculate the next, that means we
      dont need to store the rest of them and we can save on memory
    '''
    a = b = 1
    for _ in range(n):
        a, b = b, a + b
    return a


print(bottomUpBetter(4))
