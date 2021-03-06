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
 * return longest substring of the same letter
 * can have up to k wildcard letters
 *
 * need to know the most frequest letter since its the most liekly winner
 * but that means we need to track all letter lengths to know when frequency change
 *
 * going over moving left
 *
 * sliding window is almost always a nested while loop in a for loop
 *
 * MISSED point before:
 * // how do we check going over k?
 */
var characterReplacement = function (s, k) {
  let seen = {}
  let left = 0
  let right = 0
  let freq = 0
  let max = 0

  // how do we track frequency?
  // most used char

  while (right < s.length) {
    const char = s[right]
    seen[char] = seen[char] ? seen[char] + 1 : 1

    // set the most frquent
    freq = Math.max(seen[char], freq)

    right++

    // (right - left) - freq will be zero if everything is same char
    while ((right - left) - freq > k) {
      const leftChar = s[left]
      seen[leftChar]--
      left++
    }

    max = Math.max(max, right - left)
  }

  return max
};

console.log(characterReplacement('ABAB', 2))
console.log(characterReplacement('AABABBA', 1))