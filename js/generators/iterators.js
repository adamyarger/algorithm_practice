/**
 * 
 * TODO: create a dequeue iterator
 */

/**
 * 
 * @param {*} items 
 * @returns 
 * 
 * any object can be an iterator as long as we supply the correct interface
 * return an object here with next whiich returns done and value is the interface
 */
{
  function createIterator(items) {
    let i = 0

    return {
      next() {
        let done = (i >= items.length)
        let value = !done ? items[i++] : undefined

        return {
          done: done,
          value: value
        }
      }
    }
  }

  const iterator = createIterator([1, 2, 3])


  // console.log(iterator.next())
  // console.log(iterator.next())
  // console.log(iterator.next())

  // any further calls do this
  // {done: true, value: undefined}
  // console.log(iterator.next())
}

/**
 * GENERATORS
 * 
 * generators functions return itertors. aka they automatically create them.
 */

{
  function* createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      // for loop stops each time the yield statement is called
      // treat yield like you would return
      yield items[i]
    }
  }

  let iterator = createIterator([1, 2, 3])

  // when next is called, the for loop picks back up again
  // generators break the functions model of run to completion
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  // 4th one is out of bounds so undefined is returned
  console.log(iterator.next())
}


/**
 * ITERABLE
 * aka make an object work in for ... of
 */

{
  function isIterable(object) {
    return typeof object[Symbol.iterator] === 'function'
  }

  console.log(isIterable([1, 2, 3]))

  // weakmap and weakset have no iterable

  let arr = [1, 2, 3]
  console.log(arr[Symbol.iterator])
}

{
  // create your own iterable with a generator
  // need to defined Symbol.iterator
  // when a for of loop happens it looks for Symbol.iterator
  let collection = {
    items: [],
    *[Symbol.iterator]() {
      for (let item of this.items) {
        yield item
      }
    }
  }

  collection.items = [1, 2, 3]

  for (const item of collection) {
    // console.log(item * 2)
  }
}

{
  /**
   * collection iterators
   * default === arrays, maps & sets
   * 
   * .entries is for key value pairs
   * .values is values
   * .keys is keys
   * 
   * .values is the default iterator for sets and arrays
   * .entries is default iterator for maps
   * 
   * meaning when you use a for of loop it implicitly using those functions
   * 
   * they return tuple like arrays, mainly because set and map can have objects as keys
   * and array keys are integers so objects cant represent those options
   */

  [1, 2, 3].entries().next().value // [0, 1]

  let nums = [1, 2, 3, 4].values()

  // skip some, this is an alternative to for loop and starting at index 1
  nums.next()
  nums.next()

  for (const num of nums) {
    // console.log(num)
  }
}

{
  // passing args
  console.log('%c ------- args start ---------', 'color: orange; background: #333;')

  function* createIterator() {
    // cant pass arg to this one, we need a var
    let first = yield 1
    let second = yield first + 2
    yield second + 3

    // how its working
    /** iterator.next()
     *  yield 1 (SPECIAL CASE)
     * 
     * iterator.next(5)
     * first = 5
     * yield 5 + 2
     * 
     * iterator.next(2)
     * second = 2
     * yield 2 + 5
     */
  }

  let iterator = createIterator()

  console.log(iterator.next())
  // 5 will take the place of first
  console.log(iterator.next(5))
  console.log(iterator.next(2))
}


{
  // iterator error
  console.log('%c ------- error ---------', 'color: orange; background: #333;')
  function* createIterator() {
    let first = yield 1
    let second

    // since we can throw errors it means we can catch them as well
    // this allows us to continue
    try {
      second = yield first + 2
    } catch (e) {
      second = yield 6
    }

    yield second + 3
  }

  let iterator = createIterator()

  console.log(iterator.next())
  console.log(iterator.next(4))
  // exits and stops
  console.log(iterator.throw(new Error('wrong')))
  console.log(iterator.next(4))
}


{
  // return in generators
  console.log('%c ------- return ---------', 'color: orange; background: #333;')

  function* createIterator() {
    yield 1
    return 34
    yield 2
    yield 3
  }

  let iterator = createIterator()

  console.log(iterator.next())
  // this gets the return value. it liek a final
  console.log(iterator.next())
  // these are undefined
  console.log(iterator.next())
}


{
  // delegating generators
  console.log('%c ------- delgate ---------', 'color: orange; background: #333;')

  function* number() {
    yield 1
    yield 2
  }

  function* color() {
    yield 'red'
    yield 'green'
  }

  function* combine() {
    yield* number()
    yield* color()
    yield true
  }

  let iterator = combine()

  // does one function at a time then moves to the next
  console.log(iterator.next());           // "{ value: 1, done: false }"
  console.log(iterator.next());           // "{ value: 2, done: false }"

  console.log(iterator.next());           // "{ value: "red", done: false }"
  console.log(iterator.next());           // "{ value: "green", done: false }"

  console.log(iterator.next());           // "{ value: true, done: false }"
  console.log(iterator.next());           // "{ value: undefined, done: true }"
}


{
  // iterator class (for of loop)

  class Gen {
    constructor(items = []) {
      this.items = items
    }

    *[Symbol.iterator]() {
      for (let i = 0; i < this.items.length; i++) {
        yield this.items[i]
      }
    }
  }

  class Queue {
    constructor(items = []) {
      this.items = items
    }

    [Symbol.iterator]() {
      let i = 0

      return {
        next: () => {
          let done = (i >= this.items.length)
          let value = !done ? this.items[i++] : undefined

          return {
            done,
            value
          }
        }
      }
    }
  }

  const q = new Queue([9, 8, 7])

  for (let i of q) {
    console.log(i)
  }

  console.log('----gen---')
  const g = new Gen([3, 4, 5])
  for (let i of g) {
    console.log(i)
  }
}