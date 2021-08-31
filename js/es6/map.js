

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