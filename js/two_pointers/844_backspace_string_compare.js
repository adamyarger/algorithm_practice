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

// console.log(backspaceCompare('ab#c', 'ad#c'))
// console.log(backspaceCompare('a', 'ad#'))
// console.log(backspaceCompare('ab##', 'c#d#'))
// console.log(backspaceCompare('a#c', 'b'))






var twoPointer = function (s, t) {
  let index1 = s.length - 1
  let index2 = t.length - 1

  while (index1 >= 0 || index2 >= 0) {
    let i1 = getNextChar(s, index1)
    let i2 = getNextChar(t, index2)

    // edge case of index 1 and 2 bein set to -1
    if (i1 < 0 && i2 < 0) {
      return true
    }

    if (s[i1] !== t[i2]) {
      return false
    }

    if (i1 < 0 || i2 < 0) {
      return false
    }

    index1 = i1 - 1
    index2 = i2 - 1
  }
  return true
};


// you were on track with this one
function getNextChar(str, index) {
  let removeCnt = 0
  while (index >= 0) {
    if (str[index] === '#') {
      removeCnt++
    } else if (removeCnt) {
      removeCnt--
    } else {
      break
    }
    index--
  }
  return index
}

console.log(twoPointer('ab#c', 'ad#c'))
console.log(twoPointer('a', 'ad#'))
console.log(twoPointer('ab##', 'c#d#'))
console.log(twoPointer('a#c', 'b'))