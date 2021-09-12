

var evalRPN = function (tokens) {
  const stack = []

  for (let i = 0; i < tokens.length; i++) {
    console.log(stack, tokens[i])

    if (Number.isInteger(parseInt(tokens[i]))) {
      stack.push(parseInt(tokens[i]))
    } else if (tokens[i] === '/') {
      // push sum to stack, then no speacial cases
      const right = stack.pop()
      const left = stack.pop()
      let val = left / right
      if (val < 0) {
        val = Math.ceil(val)
      } else {
        val = Math.floor(val)
      }
      stack.push(val)

    } else if (tokens[i] === '*') {

      const right = stack.pop()
      const left = stack.pop()
      stack.push(left * right)

    } else if (tokens[i] === '+') {

      const right = stack.pop()
      const left = stack.pop()
      stack.push(left + right)

    } else if (tokens[i] === '-') {

      const right = stack.pop()
      const left = stack.pop()
      stack.push(left - right)
    }
  }

  return stack.pop()
};

// console.log(evalRPN(["4", "13", "5", "/", "+"]))
console.log(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))

// console.log(evalRPN(["4", "-2", "-5", "*", "+"]))
