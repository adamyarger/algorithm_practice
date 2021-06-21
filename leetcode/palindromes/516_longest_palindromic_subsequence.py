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
'''


class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        '''
        - how do we check for palindromes?
        - whats the base case?
        - whats the repeating sub problems?

        - does not need to be contigous, can delete certain chars
        - try all subsets, return value if is palindrome, then compare if its larger than the other branch
        '''
        memo = [[-1] * len(s) for _ in range(len(s))]
        return self.recur(memo, s, 0, len(s) - 1)

    def recur(self, memo, s, start, end):
        # weve hit the end, return 0 so nothing gets added
        if start > end:
            return 0

        if start == end:
            return 1

        if memo[start][end] == -1:
            if s[start] == s[end]:
                # since both on the outside match we can bring them both closer together to see if their is still symitry
                memo[start][end] = 2 + self.recur(memo, s, start + 1, end - 1)
            else:
                sub1 = self.recur(memo, s, start + 1, end)
                sub2 = self.recur(memo, s, start, end - 1)
                memo[start][end] = max(sub1, sub2)

        return memo[start][end]


sol = Solution()
print(sol.longestPalindromeSubseq('bbbab'))
