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

function runGenerator(g) {
  // call the generaator function to get an iterable in return
  const it = g();

  // define named function and iife it, need the name for recursion
  (function next(value) {
    // call to next gets our first yield. value will be a promise
    const ret = it.next(value)

    // only keep calling if its not done
    if (!ret.done) {
      // make sure its a promise
      if (isThenable(ret.value)) {
        // get the value from iterator, and pass on fulfilled callback with arg as recursive function
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