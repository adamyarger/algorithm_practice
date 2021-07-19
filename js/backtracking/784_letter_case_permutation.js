/**
 * 
 * Given a string s, we can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. You can return the output in any order.



Example 1:

Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
Example 2:

Input: s = "3z4"
Output: ["3z4","3Z4"]
Example 3:

Input: s = "12345"
Output: ["12345"]
Example 4:

Input: s = "0"
Output: ["0"]
 */


/**
 * @param {string} s
 * @return {string[]}
 * 
 * only letters can be uppercase --> do a check for number
 * 
 * how does this change candidates? should we make them up front?
 * if we make candidates up front we then have to watch for length max
 */
var letterCasePermutation = function (s) {
  let len = s.length
  let res = []
  let char = /[a-zA-Z]/
  let arr = []

  function backtrack(i) {
    // no need for looping
    if (i == len) {
      // weve hit the size, add it to the output
      res.push(arr.join(''))
      return
    }

    if (char.test(s[i])) { // is it a string?

      // this works by replacing the letters at the index on the way back up
      // there are 2 options but they need to stay in place just replace the index with the other option when bubbling up
      arr[i] = s[i].toLowerCase()
      backtrack(i + 1)
      arr[i] = s[i].toUpperCase()
      backtrack(i + 1)
    } else {
      // else set number
      arr[i] = s[i]
      backtrack(i + 1)
    }
  }

  backtrack(0)
  return res
};

console.log(letterCasePermutation('a1b2'))