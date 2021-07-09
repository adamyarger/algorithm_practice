
function memo(func) {
  const memo = function (key) {
    const cache = memo.cache;
    console.log(cache)
    const address = '' + key;
    if (!(address in cache)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memo.cache = {};
  return memo;
}

const fib = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

var fibonacci = memo(fib);

console.log(fibonacci(15))

// console.log(fibonacci(4))
// console.log(fibonacci(3))