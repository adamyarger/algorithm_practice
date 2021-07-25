/**
 * Problem Statement #
Given a string, find the length of the longest substring in it with no more than K distinct characters.

Example 1:

Input: String="araaci", K=2
Output: 4
Explanation: The longest substring with no more than '2' distinct characters is "araa".

Example 2:

Input: String="araaci", K=1
Output: 2
Explanation: The longest substring with no more than '1' distinct characters is "aa".

Example 3:

Input: String="cbbebi", K=3
Output: 5
Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".
 */

/**
 * 
 * @param {string} str 
 * @param {number} k 
 * 
 * find the longest substring but your only allowed to use k different letters
 * substring and contigous are give aways for sliding window
 * 
 * grow the window until the count of uniqu chars goes over
 * how to track unique chars? map? or set?
 * with a a set we can use length
 * remove from set when left is moved
 */
var longest_substring_with_k_distinct = function (str, k) {
  // need count so need dict
  // could use set of lenth 26 to keep count then use reduce for sum
  const used = {}
  let left = 0
  let count = 0

  for (let right = 0; right < str.length; right++) {
    const char = str[right]
    used[char] = char in used ? used[char] + 1 : 1

    // const chars = Object.keys(used)
    while (Object.keys(used).length > k) {
      // remove from left, could be repeating chars like aaaa
      const val = str[left]
      used[val]--
      left++
      if (used[val] === 0) {
        delete used[val]
      }
    }

    // check if new sum is larger
    const sum = Object.values(used).reduce((acc, item) => acc + item, 0)
    count = Math.max(sum, count)
  }

  return count
}


console.log(longest_substring_with_k_distinct('araaci', 2)) //araa
console.log(longest_substring_with_k_distinct("cbbebi", 3))
