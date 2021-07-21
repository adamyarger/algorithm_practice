/**
 *
 * Given two binary strings a and b, return their sum as a binary string.



Example 1:

Input: a = "11", b = "1"
Output: "100"


Example 2:


Input: a = "1010", b = "1011"
Output: "10101"

 */


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 * 
 * 2 ways. use built in method add togther
 * writw out looping to carry the 1
 */
var addBinary = function (a, b) {
  const _a = `0b${a}`
  const _b = `0b${b}`
  // big int can take in strings so it takes in 2 binary string adds them together return s 4n then we use tostring 2 for binary foramt
  const sum = BigInt(_a) + BigInt(_b)
  return sum.toString(2)
};

console.log(addBinary('11', '1'))

