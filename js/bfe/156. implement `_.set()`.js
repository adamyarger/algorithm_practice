


/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 * 
 * end format is an array, 
 * 2 part
 * break into array
 * traverse array
 */
function set(obj, path, value) {
  const keys = Array.isArray(path) ? path : path.replaceAll('[', '.').replaceAll(']', '').split('.')
  if (keys.length === 0) return

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (i === keys.length - 1) {
      // if were on the final one
      obj[key] = value
      return
    }

    if (!obj.hasOwnProperty(key)) {
      const next = keys[i + 1]
      if (String(Number(next)) === next) {
        obj[key] = []
      } else {
        // invalid digit
        obj[key] = {}
      }
    }

    obj = obj[key]
  }
}


const obj = {
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
}

set(obj, 'a.b.c[1]', 'BFE')
console.log(obj.a.b.c[1], obj) // "BFE"