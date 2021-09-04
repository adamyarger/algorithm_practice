
// reflect is like a fucntion alternative to default operators
// https://github.com/sangaline/awesome-es2015-proxy/blob/master/examples/array.js
function pyArr(arr) {
  return new Proxy(arr, {
    get(target, key, receiver) {

      if (key < 0) {
        const index = target.length - ((key * -1) % target.length)
        return target[index]
      }

      // return default behavior
      return Reflect.get(target, key, receiver)
    }
  })
}

const arr = pyArr([1, 2, 3, 4])

// console.log(arr[0])

console.log(arr[-2])
console.log(arr[-5])

console.log(arr['0:2'])