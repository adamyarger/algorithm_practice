

// order of execution

function first() {
  third()

  const firstResponse = Promise.resolve('dude')

  setTimeout(() => {
    firstResponse.then(res => {
      console.log(res)
    })
  });
}

function third() {
  console.log('hello')
}

function secondFunction() {
  let i = 0;
  let start = Date.now();

  for (let j = 0; j < 5.e9; j++) {
    i++;
  }
  console.log("Loop done in " + (Date.now() - start) + 'ms');
}

// first()

//prints
// yoy
// dude
function trick() {
  new Promise((resolve) => {
    resolve('dude')
    Promise.resolve('yoyo').then(res => console.log(res))
  }).then(res => { // then hasent been reached yet, so its the second task in the micro task queue
    console.log(res)
  })
}

trick()

