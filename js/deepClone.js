
function deepClone(obj) {
  const out = {}
  for (key in obj) {
    if (typeof obj[key] === 'object') {
      out[key] = deepClone(obj[key])
    } else {
      out[key] = obj[key]
    }
  }
  return out
}


const obj = {
  a: 'b',
  b: {
    c: 'a',
    d: {
      f() {
        return 'f'
      }
    }
  }
}

const clone = deepClone(obj)
clone.b.c = 'nice'
console.log(clone)
console.log(obj)

// this doesnt work
// clone.b.c = 'dude' => 
// this change both clone and obj since it does a shallow clone the deeper stuff is still by reference
// console.log(clone)
// console.log(obj)
// const clone = Object.assign({}, obj)

