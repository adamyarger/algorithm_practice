/**
 * Problem Statement
Given a word, write a function to generate all of its unique generalized abbreviations.

Generalized abbreviation of a word can be generated by replacing each substring of the word by the count of characters in the substring.
Take the example of “ab” which has four substrings: “”, “a”, “b”, and “ab”. After replacing these substrings in the actual word by
the count of characters we get all the generalized abbreviations: “ab”, “1b”, “a1”, and “2”.

Example 1:

Input: "BAT"
Output: "BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"

Example 2:

Input: "code"
Output: "code", "cod1", "co1e", "co2", "c1de", "c1d1", "c2e", "c3", "1ode", "1od1", "1o1e", "1o2",
"2de", "2d1", "3e", "4"
 */

/**
 * 
 * @param {*} params 
 * 
 * reminds me of subsets
 * 
 * do it iterately as well https://medium.com/@yilingliu1994/leetcode-320-generalized-abbreviation-python-backtracking-way-5fddd4a9a90f
 */
function generate(word) {
  const out = []
  backtrack(word, '', 0, 0, out)
  return out
}

function backtrack(word, cur, index, count, out) {
  // base case
  if (index === word.length) {
    if (count !== 0) {
      cur += count
    }
    out.push(cur)
    return
  }

  // why backtrack called 2 times?
  // this one adds a number then other one a letter
  // this is like choosing left and right in a tree -> similar to letter case permutations
  backtrack(word, cur.slice(), index + 1, count + 1, out)

  let newWord = cur + (count ? count : '') + word[index]

  // add to index -> move towards base case
  backtrack(word, newWord, index + 1, 0, out)
}

console.log(generate('word'))
console.log(generate('ab'))