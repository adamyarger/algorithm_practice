/**
 *
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.



Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 
 * return sunstring of s that uses every char in t (including duplicates 1.e if t has 2 a's)
 * there can be other chars in between
 * 
 * need to track min length when found
 * this is similar to permutaations since t could be in any order
 * 
 * the main difference is that chars could be inbetween now
 * THAT MEANS CHECKING FOR LENGTH WONT WORK
 * 
 * could do the same as permutations
 * but instead of ending when it no longer matches we save the substring as the current shortest
 * then continue and update shortest id we find one
 */
var minWindow = function (s, t) {
  if (!s || !t || t.length > s.length) return ''

  // create map
  const map = new Map()
  for (const char of t) {
    map.set(char, map.getOrDefault(char, 0) + 1)
  }

  // set pointers
  let left = 0
  let right = 0
  let uniq = map.size
  let out = ''

  while (right < s.length) {
    if (map.has(s[right])) {
      map.set(s[right], map.get(s[right]) - 1)
      if (map.get(s[right]) === 0) {
        uniq--
      }
    }

    right++

    while (uniq === 0) {
      out = out && out.length < (right - left) ? out : s.slice(left, right)

      if (map.has(s[left])) {
        map.set(s[left], map.get(s[left]) + 1)
        if (map.get(s[left]) > 0) {
          uniq++
        }
      }
      left++
    }
  }

  return out
};

Map.prototype.getOrDefault = function (key, val) {
  return this.has(key) ? this.get(key) : val
}

// s = "ADOBECODEBANC", t = "ABC"
console.log(minWindow('ADOBECODEBANC', 'ABC'))