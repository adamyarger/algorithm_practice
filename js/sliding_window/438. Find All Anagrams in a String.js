/**
 * Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.



Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * 
 * ana grams are permutations
 * so this is similar to the permutations sliding window
 * the difference is that we push the start index to an array instead of returning right away
 */
var findAnagrams = function (s, p) {
  if (!s || !p || s.length < p.length) return []

  //create map
  const map = new Map()
  for (const char of p) {
    map.set(char, map.getOrDefault(char, 0) + 1)
  }

  // set pointers and uniq tracker
  let left = 0
  let right = 0
  let uniq = map.size
  let out = []

  while (right < s.length) {
    // move right pointer, find the end
    if (map.has(s[right])) {
      map.set(s[right], map.get(s[right]) - 1)
      if (map.get(s[right]) === 0) uniq--
    }

    right++

    while (uniq === 0) {
      if (map.has(s[left])) {
        map.set(s[left], map.get(s[left]) + 1)
        if (map.get(s[left]) > 0) uniq++
      }

      if (right - left === p.length) {
        out.push(left)
      }

      left++
    }
  }

  return out
};

Map.prototype.getOrDefault = function (key, value) {
  return this.has(key) ? this.get(key) : value
}


console.log(findAnagrams('cbaebabacd', 'abc'))