/**
 * What does the code snippet to the right output by console.log?
 */


console.log(1)
const promise = new Promise((resolve) => {
  // called right away, no different then a normal function constructor call
  // console.log will be called right away
  console.log(2)

  // when does resolve get called?
  resolve()
  console.log(3)
})

console.log(4)

promise.then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

console.log(7)

setTimeout(() => {
  console.log(8)
}, 10)

setTimeout(() => {
  console.log(9)
}, 0)