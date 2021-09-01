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
      yield items[i]
    }
  }

  let iterator = createIterator([1, 2, 3])

  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  // 4th one is out of bounds so undefined is returned
  console.log(iterator.next())
}