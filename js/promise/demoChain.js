

{
  // const promise = new Promise((resolve, reject) => {
  //   if (Math.random() > 0.5) {
  //     resolve('good job')
  //   } else {
  //     reject('ERROR')
  //   }
  // })

  // this will be in a fulfilled state right away
  // thats ok since the .then is what adds the async behavior
  // .resolve is syncrounous it just settles the state and fires tasks
  // .then adds new callbacks
  // console.log(promise)
}

{
  /**
   * force the promise to be resolved later
   */
  // const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (Math.random() > 0.5) {
  //       resolve('good job')
  //     } else {
  //       reject('ERROR')
  //     }
  //   }, 100);
  // })

  // this will be pending when its fired
  // console.log(promise)
}

{
  /**
   * force the promise to be resolved later
   */
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('good job')
    }, 100);
  })

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(resolve(promise) === promise)
    }, 100);
  })

  promise2.then(res => {
    console.log('did it', res)
  })


  /**
   * - the second .then will be skipped if its in a rejected state
   * - .then will always return a NEW promise, its argument will be your return value
   * - its IMPORTANT that then returns a new promise, since the existsing promise has been settled and is inmutable
   * - that means you can return a new Promise as well
   * - promises still work even if .then is empty, it does this by still creating a new promise and passing it forward
   * 
   * 
   * add thenable object
   * add nested thenable object
   * add nested promise
   * return nested promise
   */
  // promise.then(response => {
  //   console.log(response)
  //   return 23
  // }).then(res => {
  //   console.log(res)
  //   return Promise.resolve('dude')
  // }).then(res => {
  //   // unwraps the promise from Promise.resolve and feeds it in as a param
  //   console.log(res)
  //   // new promise is what happening behind the scenes
  //   return new Promise((resolve) => {
  //     resolve('inner')
  //   })
  // }).then(res => {
  //   console.log(res)
  //   return Promise.reject('error')
  // }).then(res => {
  //   // this will be skipped becuase the prior rejection hasnt been handled yet
  //   console.log(res)
  //   return new Promise((resolve, reject) => {
  //     resolve('nope')
  //   })
  // }).then()
  //   .catch(err => {
  //     console.log(err)
  //     return 'finalllly'
  //   }).finally(res => {
  //     console.log('done', res)
  //   })


  // promise.then(res => {
  //   console.log(0)
  //   Promise.resolve('1').then(res => {
  //     console.log(res)
  //     Promise.resolve('2').then(res => {
  //       console.log(res)
  //       Promise.resolve('3').then(res => {
  //         console.log(res)
  //       })
  //     })
  //   })
  // }).then(res => {
  //   console.log(4)
  // })


}
