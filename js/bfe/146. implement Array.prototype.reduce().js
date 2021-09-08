



Array.prototype.myReduce = function (fn, initial) {
  if (!this.length && !initial) throw new Error()

  let acc = initial

  for (let i = 0; i < this.length; i++) {
    acc = arguments.length === 1 && i === 0 ? this[i] : fn(acc, this[i], i, this)
  }

  return acc
}



const arr = [1, 2, 3, 4, 5, 6].reverse()
const reducer = (a, b) => a - b

console.log(arr.myReduce(reducer))