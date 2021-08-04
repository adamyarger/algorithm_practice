/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 * 
 * same as flip bits but with letters
 * longest repeating char with k wildcards
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