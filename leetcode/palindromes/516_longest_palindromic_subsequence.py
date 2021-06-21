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
                # since both on the outside match we can bring them both closer together to see if their is still symmetry
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
        size = len(s)
        memo = [[0] * size for _ in range(size)]

        # every sequence with 1 letter is a palindrom eof size 1
        for i in range(len(s)):
            memo[i][i] = 1

        # range in reverse order
        for start in range(size - 1, -1, -1):
            # range in ascending order
            for end in range(start + 1, size):
                if s[start] == s[end]:
                    # start and end are the same letter add 2
                    memo[start][end] = 2 + memo[start + 1][end - 1]
                else:
                    # skip one letter either from the beginning or end
                    memo[start][end] = max(
                        memo[start + 1][end], memo[start][end - 1])
        return memo[0][size - 1]


bu = BU()
print(bu.bottom_up('bbbab'))
