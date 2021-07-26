/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.



Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 * 
 * replace and char up to k times
 * whats the longest substring of the same letter?
 * 
 * since its a substring we can use sliding window
 * keep growing the window as long as chars are the same and k other chars havent been exhausted yet
 * need a count of how many other chars have been used in the window
 * 
 * when we go over keep
 */
var characterReplacement = function (s, k) {
  const seen = {}
  let left = 0
  let max = 0
  let freq = 0

  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    seen[char] = seen[char] ? seen[char] + 1 : 1

    // most frequent char
    freq = Math.max(freq, seen[char])

    // while we go over k, remove left
    // (right - left + 1) gives us our range
    // freq
    // when (right - left + 1 - freq) is 0 it means all the chars are the same
    // the number goes up it represents how many different chars are in at
    while ((right - left + 1 - freq) > k) {
      const removeChar = s[left]
      seen[removeChar]--
      left++
    }

    max = Math.max(max, right - left + 1)
  }

  return max
};

console.log(characterReplacement('AABABBA', 1))