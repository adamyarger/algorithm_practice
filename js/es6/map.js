

{
  class ISet extends Set {
    map(fn) {
      const out = new Set()
      this.forEach(item => {
        out.add(fn(item))
      })
      return out
    }
  }

  let set = new ISet([1, 2, 3, 4])

  console.log(set)

  let sum = set.map(item => item * 2)

  console.log(sum)
}

{
  // set keeps reference event when deleted
  let set = new Set()
  let key = { a: 23 }

  // add reference to key object
  set.add(key)
  // console.log(set)

  // set key to null, no more reference
  key = null

  // size is still 1 event though refeence no longer exists
  console.log(set)

  // we can get the reference back
  key = [...set][0]

  // console.log(key)
}

{
  // WeakSet DOM node use case

  // let set = new Set()
  let weak = new WeakSet()

  // set.add(document.querySelector('.one'))
  weak.add(document.querySelector('.one'))

  console.log('weak', weak.has(document.querySelector('.one'))) // true

  document.querySelector('.one').remove()

  // console.log('set', set)
  console.log('weak', weak.has(document.querySelector('.one'))) // false, it got delete

  // it doesnt exist, but set still references it
  // if we use WekSet it wont
  // console.log(document.querySelector('.one'))
}