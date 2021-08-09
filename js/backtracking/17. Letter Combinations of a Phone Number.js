/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.





Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 */

/**
 * @param {string} digits
 * @return {string[]}
 * 
 * not permutations since we cant combine letters on same number key
 */
var letterCombinations = function (digits) {
  if (digits == null || digits.length === 0) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }

  const out = []
  // index based backtracking
  function dfs(i, cur) {
    if (i === digits.length) {
      out.push(cur)
      return
    }

    // loop through string 'abc'
    for (const char of map[digits[i]]) {
      dfs(i + 1, cur + char)
    }
  }

  dfs(0, '')
  return out
};

console.log(letterCombinations('23'))