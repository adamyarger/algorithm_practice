/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  // edge case if target is bigger than the biggest letter wrap around and return the smallest
  if (target >= letters[letters.length - 1]) return letters[0]
  let lo = 0;
  let hi = letters.length - 1

  // why not <= ??? 
  // the equals in <= is meant to handle the case where lo and hi are the same index
  // when lo and hi are the same index it means theres 1 index to search
  // this only matters when we need to compare for exact value
  // we dont care about exact value, we care about best aproximation so we can stop and just return that
  // the final index left is the answer, which both lo and hi will be the last index at that point
  while (lo < hi) {
    let mid = Math.floor((hi + lo) / 2)

    // why <= on this one?
    // because we want the next biggest, so even if it is equal we still want to move mid up by 1
    if (letters[mid] <= target) {
      // move lo up past mid to search the right half
      lo = mid + 1
    } else {
      hi = mid
    }
  }

  return letters[hi]
};

console.log(nextGreatestLetter(["c", "f", "j"], 'k')) //c

console.log(nextGreatestLetter(["c", "f", "j"], 'c')) // f