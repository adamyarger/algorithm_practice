/**
 * Given a string s, return the longest palindromic substring in s.



Example 1:

Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
Example 3:

Input: s = "a"
Output: "a"
Example 4:

Input: s = "ac"
Output: "a"
 */


/**
 * @param {string} s
 * @return {string}
 * 
 */
var longestPalindrome = function (s) {
  // iterate through each item
  // current item will be the middle
  // move left and right pointer out fro middle to check for palindrome
  // stop and exit when boundaries are hit

  let long = ''

  function find(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // its a palindrome
      // keep growing it
      left -= 1
      right += 1
    }
    // parties whats the palindrome
    // rights fine since it can go past
    // left has to come forward 1 since it went overboard
    return s.slice(left + 1, right)
  }

  for (let i = 0; i < s.length; i++) {
    const oneChar = find(i, i)
    const twoChar = find(i, i + 1)

    // it it bigger than the rest???
    const maxChar = oneChar.length > twoChar.length ? oneChar : twoChar
    if (maxChar.length > long.length) {
      long = maxChar
    }
  }

  return long
}

console.log(longestPalindrome('babad'))

console.log(longestPalindrome('cbbd'))