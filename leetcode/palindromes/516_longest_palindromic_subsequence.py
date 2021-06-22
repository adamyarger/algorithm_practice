'''
Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by 
deleting some or no elements without changing the order of the remaining elements.

Example 1:

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
Example 2:

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".

Time Complexity: O(N2) because memoization array, memo[len(s)][len(s)]. We will not have more than N*N subsequences.

Space Complexity: O(N2 + N) == O(N2) because we used N2 for memoization array and N for recursive stack.
'''


class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        memo = [[-1] * len(s) for _ in range(len(s))]
        return self.recur(memo, s, 0, len(s) - 1)

    def recur(self, memo, s, start, end):
        if start > end:
            return 0

        if start == end:
            return 1

        if memo[start][end] == -1:
            if s[start] == s[end]:
                memo[start][end] = 2 + self.recur(memo, s, start + 1, end - 1)
            else:
                sub1 = self.recur(memo, s, start + 1, end)
                sub2 = self.recur(memo, s, start, end - 1)
                memo[start][end] = max(sub1, sub2)
        return memo[start][end]


# sol = Solution()
# print(sol.longestPalindromeSubseq('bbbab'))


class BU:
    def bottom_up(self, s: str) -> int:
        '''
        - the matrix is about start at and ends at points thats why theres a diagnol of 1's
        - because its daying it starts at 4 and ends at 4, so the palindrom elength is 1
        - we go through each size level and check for subsequences
        - we look for the max when there not a match at start and end
        - when its not matching its the max of left cell or bottom cell
        - if matching its 2 + diagnol cell
        '''
        size = len(s)
        memo = [[0] * size for _ in range(size)]

        for i in range(size):
            memo[i][i] = 1

        # we make it size-1 since that cell has already been dilled with a 1 value
        for start in range(size-1, -1, -1):
            for end in range(start+1, size):
                if s[start] == s[end]:
                    # start and end match, 2 + diagonal
                    memo[start][end] = 2 + memo[start + 1][end - 1]
                else:
                    # max value from bottom cell or left cell
                    memo[start][end] = max(
                        memo[start+1][end], memo[start][end-1])
        return memo[0][size-1]


bu = BU()
print(bu.bottom_up('bbbab'))

'''
[
    [1, 2, 3, 3, 4], 
    [0, 1, 2, 2, 3], 
    [0, 0, 1, 1, 3], 
    [0, 0, 0, 1, 1], 
    [0, 0, 0, 0, 1]
]
'''
