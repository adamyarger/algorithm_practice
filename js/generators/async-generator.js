/**
 *
 * run throw an iterator in chrome
 *
 * foloow this: https://davidwalsh.name/async-generators
 * https://davidwalsh.name/concurrent-generators
 *
 * then your done for the day
 */

const BASE = 'https://pokeapi.co'

function req(url) {
  return fetch(url)
}

// function runGenerator(g) {
//   // take in a generator callback
//   // is there a way to detect a genrator type?
//   let it = g()
//   let ret

//   (function iterate(val) {
//     ret = it.next()

//     if (!ret.done) {
//       if (isThenable(ret.value)) {
//         ret.value.then(iterate)
//       } else {
//         // avoid sync recursion
//         setTimeout(() => {
//           iterate(ret.value)
//         }, 0);
//       }
//     }
//   })()
// }

function runGenerator(g) {
  const it = g();
  (function next(value) {
    const ret = it.next(value)
    if (!ret.done) {
      if (isThenable(ret.value)) {
        ret.value.then(next)
      } else {
        // allow returned cahced result while staying async
        setTimeout(() => {
          next(ret.value)
        }, 0);
      }
    }
  })()
}

function isThenable(obj) {
  return typeof obj === 'object'
    && obj !== null
    && typeof obj.then === 'function'
}

const pages = []

window.addEventListener('load', () => {
  runGenerator(function* main() {
    const res1 = yield req(`${BASE}/api/v2/pokemon/ditto`)
    const page1 = yield res1.json()
    pages.push(page1)

    const res2 = yield req(`${BASE}/api/v2/pokemon/2`)
    const page2 = yield res2.json()
    pages.push(page2)

    console.log(pages)

    pages.forEach(page => {
      const box = document.querySelector('.box')
      const img = document.createElement('img')
      img.setAttribute('src', page.sprites.front_shiny)
      box.appendChild(img)
    })
  })
})