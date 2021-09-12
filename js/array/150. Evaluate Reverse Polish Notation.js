

var evalRPN = function (tokens) {
  const stack = []

  for (const char of tokens) {
    if (Number.isInteger(parseInt(char))) {
      stack.push(parseInt(char))
    } else {
      const right = stack.pop()
      const left = stack.pop()

      switch (char) {
        case '/':
          let val = left / right
          val = val < 0 ? Math.ceil(val) : Math.floor(val)
          stack.push(val)
          break;
        case '*':
          stack.push(left * right)
          break;
        case '+':
          stack.push(left + right)
          break;
        case '-':
          stack.push(left - right)
          break;
      }
    }
  }

  return stack.pop()
};

// console.log(evalRPN(["4", "13", "5", "/", "+"]))
console.log(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))

// console.log(evalRPN(["4", "-2", "-5", "*", "+"]))
