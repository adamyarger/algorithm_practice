/**
 *
 *
 * The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.
To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.

For example, the saying and conversion for digit string "3322251":


Given a positive integer n, return the nth term of the count-and-say sequence.



Example 1:

Input: n = 1
Output: "1"
Explanation: This is the base case.
Example 2:

Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
 */

/**
 * @param {number} n
 * @return {string}
 * 
 * 
 * digit string = numbers as strings
 * they get defined by a recursive function
 * 
 * split into min number of groups so each group is a contigous of all the same
 * 
 * group string together that are the same
 * 
 * after thats done say how many are in each grou i.e. 222 = three 2's => '32'
 * 
 * keep track of last iteration
 * 
 * if first iteration its 1
 * 
 * contigous of same brings up sliding window
 * 
 * if in an interview, draw out the forst couple strings by hand and confirm its correct
 */
var countAndSay = function (n) {
  let val = '1'

  for (let i = 0; i < n - 1; i++) {
    val = makeCount(val)
  }

  // let temp = makeCount(val)
  return val
};

function makeCount(val) {
  let start = 0
  let temp = ''

  for (let end = 1; end < val.length; end++) {
    // if start === current keep going
    // once weve hit a new num
    // take the subarray from start to j create a count append it to the value
    if (val[start] === val[end]) {
      continue
    }

    let count = end - start
    let num = val[start]
    temp += `${count}${num}`
    start = end
  }

  temp += (val.length - start) + val[start]
  return temp
}

console.log(countAndSay(5))