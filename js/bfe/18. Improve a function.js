




/**
 * @param {object[]} items
 * @excludes { Array< {k: string, v: any} >} excludes
 */

/**
 * @param {object[]} items
 * @param { Array< {k: string, v: any} >} excludes
 * @return {object[]}
 */
// function excludeItems(items, excludes) {
//   return items.filter(item => {
//     let exclude = true
//     for (const ex of excludes) {
//       if (item[ex.k] === ex.v) {
//         exclude = false
//       }
//     }
//     return exclude
//   })
// }


/**
 * create obj with key val concated key
 * items.filter
 * use soem inside filter
 */

function excludeItems(items, excludes) {
  const map = excludes.reduce((acc, item) => {
    const key = `${item.k}_${item.v}`
    acc.add(key)
    return acc
  }, new Set())


  return items.filter(item => {
    return !Object.entries(item).some(([key, val]) => map.has(`${key}_${val}`))
  })
}



let items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'blue', type: 'book', age: 17 }
]

// an exclude array made of key value pair
const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
]

console.log(excludeItems(items, excludes))