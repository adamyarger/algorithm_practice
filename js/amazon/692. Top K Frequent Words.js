/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 
 k most reminds me of quick select or heap based on frequency
 
 - create a map with freq counts
 - do quick select
 */
var topKFrequent = function (words, k) {
  const freq = words.reduce((map, word) => {
    if (!map.has(word)) {
      map.set(word, 0)
    }
    map.set(word, map.get(word) + 1)
    return map
  }, new Map())

  const arr = [...freq]

  console.log(arr)

  return select(arr, 0, arr.length - 1, k)
};

// pivot lo hi,
// keep moving left forward as long as its <= pivot
// keep moving right down unil pivot is larger
// swap left and right
// when exhausted swap pivot and right until index k is sorted
function select(arr, lo, hi, k) {
  const swap = (a, b) => [arr[a], arr[b]] = [arr[b], arr[a]]
  const [word, count] = arr[lo]
  let left = lo + 1
  let right = hi

  while (true) {
    while (left <= right && arr[left][1] >= count) {
      left += 1
    }

    while (left <= right && arr[right][1] <= count) {
      right -= 1
    }

    if (right < left) break

    swap(left, right)
  }

  swap(lo, right)

  if (k === right + 1) {
    return arr.sort((a, b) => {
      if (b[1] === a[1]) {
        return a < b ? -1 : 1
      }
      return b[1] - a[1]
    }).map(item => item[0]).slice(0, k)
  } else if (k > right + 1) {
    return select(arr, right + 1, hi, k)
  } else {
    return select(arr, lo, right - 1, k)
  }
}

