'''
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
'''


class Solution(object):
    def lengthOfLongestSubstring(self, s: str) -> int:
        '''
        - its sliding window, so we need to keep track of start variable for the beginning of the window
        - we need to track repeating, so well use a dict to keep track of the last time we saw a letter
        - our output is max_length so well track the longest substring along the way
        - should be linear in time
        '''
        start = 0
        past = {}
        max_length = 0

        # we need the value and the index so we need enumerate
        for index, char in enumerate(s):
            # either the non repeating ends or it continues
            if (char in past and start <= past[char]):
                # we set the start to 1 ahead of the last repeated char
                start = past[char] + 1
            else:
                # repeating continues, but is it longer than the previous max length
                max_length = max(max_length, index - start + 1)
            # no matter what we update the past seen dict and replace the old value with the current
            past[char] = index
        return max_length


solution = Solution()

# print(solution.lengthOfLongestSubstring('abcabcbb'))
print(solution.lengthOfLongestSubstring("tmmzuxt"))  # => 5
