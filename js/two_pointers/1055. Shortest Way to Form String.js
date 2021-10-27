

/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {
  let cur = 0
  let prev = 0
  let count = 0
  if (!source || !target) return -1

  while (cur !== prev) { // if pointer did not move, then return -1
    count += 1
    prev = cur // set prev to cur


    for (let char of source) {
      let targetChar = target[cur]

      if (targetChar === char) cur += 1
      if (target[cur] === undefined) return count
    }
  }

  return -1
};