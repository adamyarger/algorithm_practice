var hasGroupsSizeX = function (deck) {
  const map = {}
  let min = Infinity

  for (const num of deck) {
    map[num] = map[num] ? map[num] + 1 : 1
  }

  for (const [key, val] of Object.entries(map)) {
    min = Math.min(min, val)
  }

  for (const [key, val] of Object.entries(map)) {
    if (val % min) return false
  }

  return true
};


console.log(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3]))


[1, 1, 1, 1, 2, 2, 2, 2, 2, 2]