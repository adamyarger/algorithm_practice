/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 
 return sum of num1 + num2 as a string
 - loop backwards
 - track carry
 - add to out
 */
var addStrings = function (num1, num2) {
  const out = []
  let carry = 0
  let p1 = num1.length - 1
  let p2 = num2.length - 1

  while (p1 >= 0 || p2 >= 0) {
    let x1 = p1 >= 0 ? parseInt(num1[p1]) : 0
    let x2 = p2 >= 0 ? parseInt(num2[p2]) : 0
    let val = (x1 + x2 + carry) % 10
    carry = Math.floor((x1 + x2 + carry) / 10)
    out.push(val)
    p1 -= 1
    p2 -= 1
  }

  if (carry) out.push(carry)

  return out.reverse().join('')
};