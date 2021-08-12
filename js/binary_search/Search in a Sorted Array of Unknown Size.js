/**
 * Problem Statement
Given an infinite sorted array (or an array with unknown size),
find if a given number ‘key’ is present in the array.
Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.

Since it is not possible to define an array with infinite (unknown) size,
 you will be provided with an interface ArrayReader to read elements of the array.
 ArrayReader.get(index) will return the number at index;
 if the array’s size is smaller than the index, it will return Integer.MAX_VALUE.

Example 1:

Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 16
Output: 6
Explanation: The key is present at index '6' in the array.

Example 2:

Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 11
Output: -1
Explanation: The key is not present in the array.

Example 3:

Input: [1, 3, 8, 10, 15], key = 15
Output: 4
Explanation: The key is present at index '4' in the array.

Example 4:

Input: [1, 3, 8, 10, 15], key = 200
Output: -1
Explanation: The key is not present in the array.
 */

function ArrayReader(arr) {
  this.arr = arr
}

ArrayReader.prototype.get = function get(index) {
  if (index >= this.arr.length) {
    return Infinity
  }
  return this.arr[index]
}

/**
 * 
 * @param {*} reader 
 * @param {*} key 
 * 
 * we dont know the upper bounds
 * this means we dont know hi which means we cant calculate mid
 * mid is normally half the size of hi so in order to find the hi
 * we should multiply by 2 and keep expanding until our search value is within the range
 * once in range we can start a normal binary search
 * 
 * this acts like a sliding window where we keep growing the hi side bigger till it include out value, if we go past and our value is not in range then return -1
 * 
 * start array at size 1 (so we an multiply) keep doubling until it within range our we go out of bounds
 * 
 * what if a double on hi goes out of bounds and skipped th last tail amount
 * could keep a last index then iterate one by one till the edge
 */
function search(reader, key) {
  // grow hi pointer
  let lo = 0
  let hi = 1
  let prev = 0
  while (reader.get(hi) < Infinity && reader.get(hi) < key) {
    prev = hi
    hi = hi * 2
  }

  if (hi === Infinity) {
    return -1
  }

  // now do normal binary search
  while (lo <= hi) {
    let mid = Math.floor((hi + lo) / 2)

    if (reader.get(mid) === key) {
      return mid
    } else if (reader.get(mid) > key) {
      // search left
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  // POSSIBLE HERE SINCE WE DO WHILE <= which will return value if it exists
  return -1
}


console.log(search(new ArrayReader([-1, 0, 3, 5, 9, 12]), 9))

console.log(search(new ArrayReader([-1, 0, 3, 5, 9, 12]), 12))