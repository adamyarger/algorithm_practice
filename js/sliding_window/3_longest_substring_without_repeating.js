/**
 *
 * Given a string s, find the length of the longest substring without repeating characters.



Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0
 */

/**
 * @param {string} s
 * @return {number}
 * 
 * keep map of last index we saw a letter
 * keep track of current longest substring
 * on repeat move the left pointer forward
 *  -- > do this in a while loop since we need to keep bringing left forward until we have a unique sub string again
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0
  let max = 0
  let map = {}

  for (let right = 0; right < s.length; right++) {
    const char = s[right]

    if ((char in map) && map[char] >= left) {
      // if we saw it again then move it up
      left = map[char] + 1
    } else {
      max = Math.max(max, right - left + 1)
    }
    map[char] = right
  }

  return max
};

console.log(lengthOfLongestSubstring('tmmzuxt'))