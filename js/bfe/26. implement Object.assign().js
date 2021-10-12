


function objectAssign(target, ...sources) {
  if (target === undefined || target === null) {
    throw new Error('dkdkk')
  }
  target = Object(target)

  sources.forEach(source => {
    if (source === null || source === undefined) {
      return
    }

    Object.defineProperties(
      target,
      Object.getOwnPropertyDescriptors(source)
    )
  })

  return target
}


const out = objectAssign({}, { c: 23, [Symbol()]: 34 }, { a: 23, b: 21 })
console.log(out)



let arr = [1, 2]

arr.length = 23

for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i])
}