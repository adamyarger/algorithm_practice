
function memo(func) {
  const memo = function (key) {
    const cache = memo.cache;
    const address = Array.prototype.slice.call(arguments).join('_')
    console.log(address)
    if (!(address in cache)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memo.cache = {};
  return memo;
}

const fibonacci = memo(function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
})

// var fibonacci = memo(fib);

console.log(fibonacci(15))

// console.log(fibonacci(4))
// console.log(fibonacci(3))