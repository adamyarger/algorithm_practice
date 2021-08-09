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

  function dfs(digits, str) {
    if (digits.length === 0) {
      out.push(str)
      return
    }

    // loop through 'abc'
    // grab the first number and get its corrisponding letters
    // of each dfs we take away that number as an option, because the 
    // previous dfs is looping through it so it will be all used up

    // first level is for abc which will always be the first ltters
    // then we take away those as options and keep appending to either a b or c
    for (const char of map[digits[0]]) {
      dfs(digits.substr(1), str + char)
    }
  }

  dfs(digits, '')
  return out
};

console.log(letterCombinations('23'))