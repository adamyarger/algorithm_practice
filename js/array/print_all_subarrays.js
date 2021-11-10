

function subarrs(arr) {
  const out = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      out.push(arr.slice(i, j + 1))
    }
  }

  return out
}

console.log(subarrs([1, 2, 3, 4]))