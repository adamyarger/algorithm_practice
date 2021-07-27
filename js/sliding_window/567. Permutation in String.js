/**
 * Given two strings s1 and s2, return true if s2 contains the permutation of s1.

In other words, one of s1's permutations is the substring of s2.



Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false

 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 * 
 * does s2 contain a permutation of s1
 * 
 * get permutations of s1
 * 
 * we know the sliding window will be a certain size
 * so grow the sliding window to size then move it forward
 * 
 * if have all permutations we can check if window exists in permutations
 * 
 * options 2:
 * dont need permutations just need to know if all chars get used up
 * add to array when yu find a char
 * 
 * could make a map of chars with counts, check if key exists
 */
var checkInclusion = function (s1, s2) {
  if (!s1 || !s2 || s1.length > s2.length) return false;

  let map = new Map();
  for (let s of s1) {
    map.set(s, map.getOrDefault(s, 0) + 1);
  }
  let start = 0
  let end = 0
  let uniq = map.size

  while (end < s2.length) {
    if (map.has(s2[end])) {
      // decrement count of char
      map.set(s2[end], map.get(s2[end]) - 1);
      // if we hit zero no more of that char needed
      if (map.get(s2[end]) === 0) uniq--;
    }
    // move forward like a for loop
    end++;

    // wont get first till the end
    // this will be sliding up the left
    // in order to start the while loop, every char will have to have been found
    while (uniq === 0) {
      console.log(map)
      if (map.has(s2[start])) {

        console.log('fire', start, s2[start])

        map.set(s2[start], map.get(s2[start]) + 1);
        if (map.get(s2[start]) > 0) uniq++;
      }
      //
      console.log(end, start, uniq)
      if (end - start === s1.length) return true;
      start++;
    }
  }
  return false;
}

Map.prototype.getOrDefault = function (key, value) {
  return this.has(key) ? this.get(key) : value
}


// console.log(checkInclusion('ab', 'eidbaooo'))
// console.log(checkInclusion('ab', 'eidboaoo'))
console.log(checkInclusion("ad", "dcda"))

// console.log(checkInclusion("hello", "ooolleoooleh")) // false

// "hello"
// "ooolleoooleh"
