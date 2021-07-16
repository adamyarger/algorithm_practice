/**
 * 
 * Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character


Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * 
 * brute force kind of reminds me of word search trying 4 different directions
 * on each dfs try insert, delete or replace
 * how would replace work?
 * 
 * looks like it moves in order
 * 
 * TIME comlexity => O(3**n)
 * 
 * we have 3 base branches were starting from
 */
var minDistance = function (word1, word2) {
  if (!word1) return word2.length
  if (!word2) return word1.length

  const memo = Array(word1.length).fill(-1).map(_ => Array(word2.length).fill(-1))

  return dfs(memo, word1, word2, 0, 0)
};

function dfs(memo, word1, word2, i, j) {
  /**
   * whats the base case?
   * since were returning a count we can pop off letters once there solved
   * if letters match in place already then move on and count nothing
   * otherwise figure out the change type needed and add 1
   * were converting word 1
   */

  // weve hit the end of one of our words, whatevers 
  // left needs to be added so just count that and return
  if (word1.length === i) return word2.length - j

  if (word2.length === j) return word1.length - i

  if (memo[i][j] !== -1) return memo[i][j]

  let out = null

  // their both the same, we can skip it and move forward on both
  if (word1[i] === word2[j]) {
    memo[i][j] = dfs(memo, word1, word2, i + 1, j + 1)
  } else {
    // try all 3 ways and return the min
    // how is this insert? were adding a new letter j didnt work so move j forward for next time
    let insert = dfs(memo, word1, word2, i, j + 1)

    // why is this delete?
    // were deleteing, i didnt work, so move it forward for next time
    let del = dfs(memo, word1, word2, i + 1, j)

    // swapped so move both forward
    // swapping works move both forward
    let sub = dfs(memo, word1, word2, i + 1, j + 1)

    // why + 1 => each counts as 1 move so add it on
    memo[i][j] = Math.min(insert, del, sub) + 1
  }

  return memo[i][j]
}

var word1 = "horse",
  word2 = "ros"

console.log(minDistance('horse', 'ros'))