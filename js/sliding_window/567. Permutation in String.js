/**
 * Given two strings s1 and s2, return true if s2 contains the permutation of s1.

In other words, one of s1's permutations is the substring of s2.



Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false

 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 * 
 * 
 * move right pointer forward until we use all the chars, thats our end point of the permutation
 * now we move the left pointer forward, if the length is just right we found it
 * if the length stops short its not a match

  // sliding window means start and end pointers

  // HARDEST PART
  // track uniq chars

  // TAKE CARE OF END POINTER
  // if char count hits zero subtract from unique chars
  // keep moving end

  // START POINTER
  // once uniw is 0 start moving the left pointers
  // add back unique when it goes over zero, its the inverse of the top
  // stop when end-start === s1.length
 */
var checkInclusion = function (s1, s2) {
  if (!s1 || !s2 || s1.length > s2.length) return false

  // need to pointers and trackers
  const map = new Map()
  for (const char of s1) {
    map.set(char, map.getOrDefault(char, 0) + 1)
  }

  let left = 0
  let right = 0
  let uniq = map.size

  while (right < s2.length) {
    // find stop point
    if (map.has(s2[right])) {
      map.set(s2[right], map.get(s2[right]) - 1)
      if (map.get(s2[right]) === 0) {
        uniq--
      }
    }

    right++

    // move left forward until we find the correct length
    while (uniq === 0) {
      if (map.has(s2[left])) {
        map.set(s2[left], map.get(s2[left]) + 1)

        if (map.get(s2[left]) > 0) {
          uniq++
        }
      }
      if (right - left === s1.length) return true
      left++
    }
  }

  return false
}

Map.prototype.getOrDefault = function (key, value) {
  return this.has(key) ? this.get(key) : value
}


console.log(checkInclusion('ab', 'eidbaooo'))
console.log(checkInclusion('ab', 'eidboaoo'))
console.log(checkInclusion("ad", "dcda"))

console.log(checkInclusion("hello", "ooolleoooleh")) // false

console.log(checkInclusion("ab", "a"))

// "hello"
// "ooolleoooleh"

