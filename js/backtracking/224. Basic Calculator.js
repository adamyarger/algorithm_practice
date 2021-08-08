/**
 * Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().



Example 1:

Input: s = "1 + 1"
Output: 2
Example 2:

Input: s = " 2-1 + 2 "
Output: 3
Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
 */

/**
 * @param {string} s
 * @return {number}
 * 
 * evalute expression like a calulator
 * cant use eval
 * 
 * this is what interrepters do
 * they usually use a stack, but the infix of operators makes it difficult
 * 
 * Algorithm
If character exists to be read:

If character is operand push on the operand stack, if character is (, push on the operator stack.
Else if character is operator
While the top of the operator stack is not of smaller precedence than this character.
Pop operator from operator stack.
Pop two operands (op1 and op2) from operand stack.
Store op1 op op2 on the operand stack back to 2.1.
Else if character is ), do the same as 2.2 - 2.4 till you encounter (.
Else (no more character left to read):

Pop operators untill operator stack is not empty.
Pop top 2 operands and push op1 op op2 on the operand stack.
return the top value from operand stack.
 */
var calculate = function (s) {
  let len = s.length
  let sign = 1
  let out = 0
  const stack = []

  for (let i = 0; i < len; i++) {
    const val = s[i]

    // if we get a number and a number is also in the stack we know we have to evaluate
    if (Number.isInteger(parseInt(s[i]))) {
      // indiviual numbers get pushed to the stack, so we have to put them together to make bigger numbers
      let sum = parseInt(s[i])
      while (i + 1 < len && Number.isInteger(parseInt(s[i + 1]))) {
        sum = sum * 10 + parseInt(s[i + 1])
        i++
      }
      out += sign * sum
    } else if (s[i] === '+') {
      sign = 1
    } else if (s[i] === '-') {
      sign = -1
    } else if (s[i] === '(') {
      console.log(out, sign)
      // push what ever out value we have now
      stack.push(out)
      // add to sign as well
      stack.push(sign)
      // reset out, this is going to get set by the values in the parenthsis
      out = 0
      // reset sign to positiive
      sign = 1
    } else if (s[i] === ')') {
      // first pop will be the sign which will turn it negative if needed
      out = out * stack.pop() + stack.pop()
    }
  }

  return out
};

console.log(calculate('80 + 5 - (3 + 2)'))

if (typeof test === 'function') {
  test('should equal 80', () => {
    expect(calculate('80 + 5 - (3 + 2)')).toBe(80)
  })
}