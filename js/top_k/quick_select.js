

/**
 * 
 * @param {*} nums 
 * @param {*} k 
 * 
 * if index === k we found kth mallest element
 * 
 * choose partition elelment (1st el)
 * choose left and right elements
 * 
 * while left <= k move left
 * 
 * while right >= k move right
 * 
 * when we stop right < k and left > k
 * that means we can swap them and continue
 * 
 * when right > left weve found our swappable element for the partition
 */
function quickselect(arr, k) {
  const part = partition(arr, 0, arr.length - 1, k)
  return arr[part]
}

function partition(arr, lo, hi, k) {
  function swap(a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }

  let pivot = arr[lo]
  let left = lo + 1
  let right = hi

  while (true) {
    while (left <= right && arr[left] < pivot) {
      left += 1
    }

    while (left <= right && arr[right] > pivot) {
      right -= 1
    }

    // swap left and right
    if (left > right) {
      break
    }

    swap(left, right)
  }

  // weve found the spot where partition belongs. everything on its left is smaller and everything on its right is bigger
  // how do we do this for just the kth element?
  // console.log(arr[lo], arr[right])
  swap(lo, right)

  // dont return till k === right-1
  // this acts like binary search, right is like mid
  // if right is not the match then search left or right half excluding right
  if (k === right + 1) {
    return right
  } else if (k > right + 1) {
    return partition(arr, right + 1, hi, k)
  } else {
    return partition(arr, lo, right - 1, k)
  }
}

console.log(quickselect([7, 10, 4, 3, 20, 15], 4))