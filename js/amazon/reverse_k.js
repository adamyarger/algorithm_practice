

var reverseStr = function (s, k) {
  let out = ''
  let left = 0
  let right = k - 1
  s = s.split('')

  console.log(s.length)

  // if (k >= s.length) return s.reverse().join('')

  while (true) {
    console.log(left, right)
    if (left >= s.length - 1) break

    if ((right + 1) % (2 * k) !== 0) {


      if (right >= s.length - 1) {
        console.log(left, s.length - 1)
        reverse(s, left, s.length - 1)
        break
      }

      reverse(s, left, right)
    }
    left += k
    right += k
  }

  return s.join('')
};

function reverse(s, left, right) {
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]]
    left += 1
    right -= 1
  }
  return s
}


// console.log(reverseStr("abcdefg", 8))

var out = reverseStr("hyzqyljrnigxvdtneasepfahmtyhlohwxmkqcdfehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqlimjkfnqcqnajmebeddqsgl", 39) === "fdcqkmxwholhytmhafpesaentdvxginrjlyqzyhehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqllgsqddebemjanqcqnfkjmi"
console.log(out)


// "fdcqkmxwholhytmhafpesaentdvxginrjlyqzyhehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjql imjkfnqcqnajmebeddqsgl"
// "fdcqkmxwholhytmhafpesaentdvxginrjlyqzyhehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqllgsqddebemjanqcqnfkjmi"