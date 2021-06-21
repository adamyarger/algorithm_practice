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
        return self.recur(s, 0, len(s) - 1)

    def recur(self, s, start, end):
        # there nothing to check, size is 0
        if start > end:
            return 0

        # its only 1 letter, that automatically a palindrome
        if start == end:
            return 1

        # 2 letters match, that makes it size 2
        if s[start] == s[end]:
            # move towards the base case by moving both ends towards the middle
            # we need symitry for palindromes
            return 2 + self.recur(s, start + 1, end - 1)

        # try moving the left end towards the middle
        sub1 = self.recur(s, start + 1, end)
        # move the right towards the middle
        sub2 = self.recur(s, start, end - 1)
        return max(sub1, sub2)


sol = Solution()
print(sol.longestPalindromeSubseq('bbbab'))
