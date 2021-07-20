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
  let longest = '';

  const find = (str, left, right) => {
    // were starting at the middle and moving outwards so left would move -- till it hit the edge of 0
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      // keep moving outwards
      left -= 1
      right += 1
    }
    // return a new string representing the palindrome
    // why + 1?
    return str.slice(left + 1, right)
  }

  for (let i = 0; i < s.length; i++) {
    // palin drome adds to count if its 1 letter or 2
    const cur1 = find(s, i, i)
    const cur2 = find(s, i, i + 1)
    const curMax = cur1.length > cur2.length ? cur1 : cur2

    if (curMax.length > longest.length) {
      //update we have a new one
      longest = curMax
    }
  }

  return longest
}

console.log(longestPalindrome('babad'))