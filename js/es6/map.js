

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

{
  // Map

  // you can initialize Map with array tuple like ['name', 'value']
  // the reason it does this instea of an object is becuase objects keys
  // do not allow onjects, but arrays do

  let obj = { a: 2 }
  const map = new Map([[obj, 'dude']])

  console.log(map)
}

{
  function Person(params) {
    let _id = 0
    // this is a closure and will hold values across different instances
    // even when that instance is deleted, thats a memory leak
    const data = {}

    function Person() {
      this.name = 'dude'
    }

    Person.prototype.setData = function (id, value) {
      if (!data[_id]) {
        id += 1
      }

      data[id] = value
    }
  }

  function Pep() {
    const data = new WeakMap()

    function Pep() {
      // keep a reference the instance which will be garbage collected if delete aka weakmap
    }

    Pep.prototype.setData = function (key, value) {
      // this will be the instances object
      data.set(this, {
        key,
        value
      })
    }
  }
}