/**
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where they are divided into non-empty substrings such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.



Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 */


/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 * 
 * check that s1+s2 = s3.length
 * 
 * can we rearrange s1 and s2 to equal s3
 * 
 * if we combine s1 + s2 the question becomes does a permutation of s3 exist?
 * thats the backtakcing way
 * 
 * brute force
 * 
 * do a dfs keep 2 indexes for s1 and s2
 * if either current index has it choose it
 * will need to make banches
 * were looking for a true value so it will be a s1 or s2 return value
 */
var isInterleave = function (s1, s2, s3) {
  memo = {}
  return dfs(s1, s2, s3, memo)
};

function dfs(s1, s2, s3, memo) {
  if (s1.length === 0 && s2.length === 0 && s3.length === 0) {
    return true // found it
  }

  const key = `${s1.length}+${s2.length}`
  if (key in memo) {
    return false
  }

  if ((s1 && s1[0] === s3[0]) && dfs(s1.substr(1), s2, s3.substr(1), memo)) {
    return true
  }

  if ((s2 && s2[0] === s3[0]) && dfs(s1, s2.substr(1), s3.substr(1), memo)) {
    return true
  }

  // this sone dosnt work... save it
  memo[`${s1.length}+${s2.length}`] = true

  return false
}

let s1 = "aabcc"
let s2 = "dbbca"
let s3 = "aadbbcbcac"
console.log(isInterleave(s1, s2, s3))

s1 = "aabcc"
s2 = "dbbca"
s3 = "aadbbbaccc"
console.log(isInterleave(s1, s2, s3))


function bottommUp(s1, s2, s3) {
  if (s3.length !== s1.length + s2.length) return false

  const cols = s1.length + 1
  const rows = s2.length + 1

  const memo = Array(cols).fill(false).map(_ => Array(rows).fill(false))

  for (let row = 0; row < cols; row++) {
    for (let col = 0; col < rows; col++) {
      if (row == 0 && col == 0) {
        memo[row][col] = true
      } else if (row == 0) {

      }
    }
  }
}


s1 = "aabcc"
s2 = "dbbca"
s3 = "aadbbcbcac"
console.log(bottommUp(s1, s2, s3))

// s1 = "aabcc"
// s2 = "dbbca"
// s3 = "aadbbbaccc"
// console.log(bottommUp(s1, s2, s3))


// public class Solution {
//   public boolean isInterleave(String s1, String s2, String s3) {
//     if (s3.length() != s1.length() + s2.length()) {
//       return false;
//     }
//     boolean dp[][] = new boolean[s1.length() + 1][s2.length() + 1];
//     for (int i = 0; i <= s1.length(); i++) {
//       for (int j = 0; j <= s2.length(); j++) {
//         if (i == 0 && j == 0) {
//           dp[i][j] = true;
//         } else if (i == 0) {
//           dp[i][j] = dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1);
//         } else if (j == 0) {
//           dp[i][j] = dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1);
//         } else {
//           dp[i][j] = (dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
//         }
//       }
//     }
//     return dp[s1.length()][s2.length()];
//   }
// }