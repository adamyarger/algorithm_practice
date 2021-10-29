

var addOperators = function (num, target) {
  const out = []

  function backtrack(str, cur, sum, prev) {
    if (!str.length && sum === target) out.push(cur.join(''))

    let len = str.length
    // loop will run once
    if (str[0] === '0') len = 1

    // why start at 1. its for the slice
    for (let i = 1; i <= len; i++) {
      // num is the different numbers wee trying. e.g. 1 or 12 or 123
      const num = parseInt(str.slice(0, i))

      // rest is the rest its what still needs to be dealt with nxt iteration. this is the backtacking.
      const rest = str.slice(i)

      if (!cur.length) {
        // if cur is empty then add the numrent number.
        backtrack(rest, [num], num, num)
      } else {
        backtrack(rest, cur.concat('+', num), sum + num, num)
        // why 0 - num??? incase a unary -5 ??? it for the prev
        backtrack(rest, cur.concat('-', num), sum - num, 0 - num)

        // why??? must be the order of operations problem.
        // 12 * 4 = 48 ---> 10 + (2*4) = 18
        // we need the prev value 2 so we can multiply it
        const prod = prev * num // this is the (2*4)
        // we do sum - prev to offset what was added before
        backtrack(rest, cur.concat('*', num), sum - prev + prod, prod)
      }
    }
  }

  backtrack(num, [], 0, 0)
  return out
}


console.log(addOperators('123', 6))

console.log(addOperators('105', 5))