

// const convert = (s, numRows) => {
//   // make an array with the zigzag sequence
//   const zigzag = [...Array(numRows).keys()]
//   zigzag.push(...zigzag.slice(1, -1).reverse()) // grabs 1,2 and reverse it then pushses it
//   // these are the indexes of the rows we want to fill
//   // [ 0, 1, 2, 3, 2, 1 ]
//   // this pattern then repeats

//   // make an array with as many strings as we need rows
//   const rows = Array(numRows).fill('');

//   console.log(rows);

//   // append the char to the row string in zigzag
//   ;[...s].forEach((item, index) => {
//     // use modulus to start over in zigzag index array
//     const zi = index % zigzag.length;
//     // append to the rows string
//     (rows[zigzag[zi]] += item)
//   })

//   console.log(rows)

//   return rows.join('')
// }


const other = function (s, numRows) {
  const out = []
  let row = 0
  let up = false

  for (let i = 0; i < s.length; i++) {
    out[row] = (out[row] || '') + s[i] // append letter to active row

    if (up) {
      row -= 1
      if (row === 0) up = false
    } else {
      row += 1
      if (row === numRows - 1) up = true
    }
  }

  return out.join('')
}

var convert = function (s, numRows) {
  const out = []

  console.log(out)

  let up = false
  let row = 0

  for (let i = 0; i < s.length; i++) {
    out[row] = (out[row] || '') + s[i]

    if (up) {
      row -= 1
      if (row === 0) {
        up = false
      }
    } else {
      row += 1
      if (row === numRows - 1) {
        up = true
      }
    }
  }

  console.log(out)

  return out.join('')
};


let s = 'PAYPALISHIRING'

console.log(convert(s, 4))

console.log(convert('AB', 1))