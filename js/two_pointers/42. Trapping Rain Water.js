

var trap = function (height) {
  if (height == null || height.length === 0) return 0

  let left = 0
  let right = height.length - 1

  let lmax = 0
  let rmax = 0

  let res = 0

  while (left < right) {
    lmax = Math.max(lmax, height[left])
    console.log(lmax, height[left])
    // if left < lmax then were in a valley
    if (height[left] < lmax) {
      console.log('hit')
      res += lmax - height[left]
    }

    rmax = Math.max(rmax, height[right])
    if (height[right] < rmax) {
      res += rmax - height[right]
    }

    // this will skip over until we have a valley
    height[left] < height[right] ? left++ : right--
  }

  return res
};

// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) //6

console.log(trap([5, 0, 0, 0])) //0