/**
 *
 * Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.



Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a##c", t = "#a#c"
Output: true
Explanation: Both s and t become "c".
Example 4:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 
 * # deletes previous letter
 * 
 * naive:
 * go through both chars and delete all # and prev chars
 * then compare

 */
var backspaceCompare = function (s, t) {
  return build(s) === build(t)
};

// use a stack and pop off whenever you see a '#'
function build(str) {
  out = []
  for (char of str) {
    if (char !== '#') {
      out.push(char)
    } else if (out.length) {
      out.pop()
    }
  }
  return out.join('')
}

console.log(backspaceCompare('ab#c', 'ad#c'))
console.log(backspaceCompare('a', 'ad#'))
console.log(backspaceCompare('ab##', 'c#d#'))
console.log(backspaceCompare('a#c', 'b'))