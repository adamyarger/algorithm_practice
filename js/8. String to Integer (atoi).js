// the goal is to crate parseInt()

var myAtoi = function (s) {
  const MIN = -(2 ** 31)
  const MAX = (2 ** 31) - 1

  const out = Number(s.trimLeft().match(/^[-\+]?\d+/))

  if (out < MIN) return MIN
  if (out > MAX) return MAX

  return out
}