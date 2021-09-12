

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
          stack.push(Math.trunc(left / right))
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
