'''
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
'''


class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        start = 0
        max_length = 0
        # char as key and its index as the value
        used = {}

        for index, char in enumerate(s):
            # char has been seen before, (we cant have repeating characters)
            # char get over written when a new one is seen

            # we saw a repeat, reset the window start
            # what does this do start <= used[char]??? if our start is already ahead then just ignore it
            if char in used and start <= used[char]:
                start = used[char] + 1
            else:
                # is something we saw before bigger i.e. max_lngth... or have we found a bigger substring?
                max_length = max(max_length, index - start + 1)
            # always add the newest seen char and its index
            used[char] = index
        return max_length


solution = Solution()

# print(solution.lengthOfLongestSubstring('abcabcbb'))
print(solution.lengthOfLongestSubstring("tmmzuxt"))  # => 5
