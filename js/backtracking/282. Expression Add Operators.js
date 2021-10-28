

var addOperators = function (num, target) {
  const out = []

  function backtrack(str, arr, sum, prev) {
    if (!str.length && sum === target) out.push(arr.join(''))

    let len = str.length
    // loop will run once
    if (str[0] === '0') len = 1

    // why start at 1. its for the slice
    for (let i = 1; i <= len; i++) {
      // cur is the different numbers wee trying. e.g. 1 or 12 or 123
      const cur = parseInt(str.slice(0, i))

      // rest is the rest its what still needs to be dealt with nxt iteration. this is the backtacking.
      const rest = str.slice(i)

      if (!arr.length) {
        // if arr is empty then add the current number.
        backtrack(rest, [cur], cur, cur)
      } else {
        backtrack(rest, arr.concat('+', cur), sum + cur, cur)
        // why 0 - cur??? incase a unary -5 ??? it for the prev
        backtrack(rest, arr.concat('-', cur), sum - cur, 0 - cur)

        // why??? must be the order of operations problem.
        // 12 * 4 = 48 ---> 10 + (2*4) = 18
        // we need the prev value 2 so we can multiply it
        const prod = prev * cur // this is the (2*4)
        // we do sum - prev to offset what was added before
        backtrack(rest, arr.concat('*', cur), sum - prev + prod, prod)
      }
    }
  }

  backtrack(num, [], 0, 0)
  return out
}


console.log(addOperators('123', 6))

console.log(addOperators('105', 5))