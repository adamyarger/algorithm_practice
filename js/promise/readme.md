# Todo
- Primitive functions
  - Promises from scratch
  - .resolve
  - .reject
- Combinator Functions
  - .all
  - .race
  - .any
  - .allSettled
- Bonus
  - Promisify: turn callbacks into promises
  - Promise unwrapping by example



```js
const promise = new Prom((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve('fulfilled')
  } else {
    reject('rejected')
  }
})

promise.then(response => {
  console.log(response)
}, err => {
  console.log(err)
})
```