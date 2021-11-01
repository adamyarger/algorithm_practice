/**
 * @param {string} s
 * @return {number}
 
 33 + 2 * 2
 */
// var calculate = function (s) {
//   if (!s) return 0

//   const stack = []
//   let num = 0
//   let op = '+'

//   for (let i = 0; i < s.length; i++) {
//     const char = s[i]

//     if (isNum(char)) {
//       num = num * 10 + parseInt(char)
//     }

//     if ((!isNum(char) && char !== ' ') || i === s.length - 1) {
//       console.log(stack, num, char)

//       if (op === '+') {
//         stack.push(num)
//       } else if (op === '-') {
//         stack.push(-num)
//       } else if (op === '*') {
//         stack.push(stack.pop() * num)
//       } else if (op === '/') {
//         stack.push(stack.pop() / num)
//       }
//     }



//     op = char
//     num = 0
//   }

//   let out = 0
//   while (stack.length) {
//     out += stack.pop()
//   }
//   return out
// };

var calculate = function (s) {
  let stack = []
  let prevSign = '+'
  let num = 0

  for (let i = 0; i < s.length; i++) {
    //If it is a number
    if (isNum(s[i])) {
      num = num * 10 + parseInt(s[i])
    }

    if (!isNum(s[i]) && s[i] !== ' ' || i === s.length - 1) {
      //We don't operate on '+' and '-' since '*' and '/' take priority
      if (prevSign === '+') stack.push(Number(num))
      else if (prevSign === '-') stack.push(Number(-num))
      else if (prevSign === '*') stack.push(Number(num) * stack.pop())
      else if (prevSign === '/') stack.push(Math.trunc(stack.pop() / Number(num)))

      prevSign = s[i]
      num = 0
    }
  }
  return stack.reduce((cur, sum) => cur + sum)
};

function isNum(num) {
  return Number.isInteger(parseInt(num))
}

console.log(calculate("3+2*2"))

console.log(calculate(" 3/2 "))