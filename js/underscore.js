// https://gist.github.com/alexhawkins/18c85450ff8ea9f3781d
// https://eloquentjavascript.net/05_higher_order.html
// implment common high order functions
var _ = {}

_.identity = function (val) {
  return val
}

_.first = function (array, n) {
  return n === undefined ? array[0] : array.slice(0, n)
}