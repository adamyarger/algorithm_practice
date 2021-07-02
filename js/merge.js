
// its empty, that means we need to use arguments to get the params
function merge() {
  // why use call?
  /**
   * arguments is not an array, its an array like objects, this is why we have to use slice call to turn it into an array
   * 
   * [] is the array prototype, that means this is the array
   * so when we use call it passes in the arguments as this
   * how is this similar to Array.from ?
   * 
   * [].slice.call is the same as Array.prototype.slice.call
   */
  const args = [].slice.call(arguments)
  let deep = false

  // use the first param to signify a deep merge
  if (typeof args[0] == 'boolean') {
    deep = args.shift()
  }

  let result = args[0]
  if (isUnextendable(result)) {
    throw new Error('extendee must be an object')
  }

  // get the remaining args from 2index onwards
  let extenders = args.slice(1)
  let len = extenders.length

  for (let i = 0; i < len; i++) {
    let extender = extenders[i]

    // loop through the object now
    for (let key in extender) {
      // for in allows getting properties not in the immidiate prototype, use hasOwnproperty to only grab the current objects properties
      // why not just use extender.hasOwnProperty(key)?
      if (Object.prototype.hasOwnProperty.call(extender, key)) {
        let value = extender[key]

        if (deep && isCloneable(value)) {
          const base = Array.isArray(value) ? [] : {}
          result[key] = extend(
            true,
            Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key])
              ? result[key] // its a primitive value
              : base,
            value
          )
        } else {
          result[key] = value
        }
      }
    }
  }
  return result
}

function isCloneable(obj) {
  // why use call over obj.toString ?
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]'
}

function isUnextendable(val) {
  // is falsey
  // or is not an object and not a function
  return !val || (typeof val != 'object' && typeof val != 'function')
}

const obj = {
  a: 'b',
  b: {
    c: 'a',
    arr: [1, 2, 3],
    d: {
      f() {
        return 'f'
      },
      noop: null
    }
  }
}

const newObj = merge(obj, { a: 'dude', foo: 'var' })

console.log(newObj)