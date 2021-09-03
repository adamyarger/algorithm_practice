

{
  let target = {}

  // proxy forwards all operations directly to target
  let proxy = new Proxy(target, {})

  // anything we assign to proxy also gets forwarded to target
  // proxy is not storing the data, its just forwarding
  // that means the other way around is true as well, assign to target and it reflects in proxy
  proxy.name = 'proxy'
  proxy.dude = true
  // console.log(proxy)
  // console.log(target)

  target.name = 'target'
  // console.log(proxy)
  // console.log(target)
}


{
  /**
   * Why do we need this?
   * 
   * use case:
   * we want validation on an object property that only allows number values
   * we can use a set trap to intercept when that property is being set, and do our validation
   * 
   * proxy and reflection is like letting developers extend the native JS language
   */

  let target = {
    name: 'target'
  }

  let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
      // ignore existing values. only care about new ones
      if (!trapTarget.hasOwnProperty(key)) {
        // check that its a number
        if (isNaN(value)) {
          throw new TypeError('Property must be a number')
        }
      }

      // add the property
      return Reflect.set(trapTarget, key, value, receiver)
    }
  })

  // adding a new property (new properties must be number)
  proxy.count = 1
  console.log(proxy.count, target.count)

  proxy.name = 'foobar'
  console.log(proxy, target)

  // proxy.cool = 'shred' // error
}

{
  /**
   * throw an error when accessing an undefined object property
   * - this normally return undefined with no error
   */

  let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
      if (!(key in receiver)) {
        throw new TypeError(`property ${key} doesnt exist`)
      }

      return Reflect.get(trapTarget, key, receiver)
    }
  })

  // adding a property still works
  proxy.name = "proxy";
  // console.log(proxy.name);            // "proxy"

  // nonexistent properties throw an error
  // console.log(proxy.nme);             // throws error
}

{
  let target = {
    name: 'target',
    value: 42
  }

  let proxy = new Proxy(target, {
    deleteProperty(trapTarget, key) {
      if (key === 'value') {
        return false
      } else {
        return Reflect.deleteProperty(trapTarget, key)
      }
    }
  })

  // cant delete non configurable properties
  Object.defineProperty(target, 'name', { configurable: false })

  // console.log('value' in target)

  let result1 = delete proxy.value

  // console.log(result1) // false, unsuccefully deleted
}

{
  // validate function arguments
  function sum(...args) {
    return args.reduce((acc, val) => acc + val, 0)
  }

  let sumProxy = new Proxy(sum, {
    apply: function (trapTarget, thisArg, argumentList) {
      argumentList.forEach(item => {
        if (!Number.isInteger(item)) {
          throw new TypeError(' All arguments must be numbers')
        }
      })
      return Reflect.apply(trapTarget, thisArg, argumentList)
    },
    construct: function (trapTarget, thisArg, argumentList) {
      throw new TypeError('new operator not allowed')
    }
  })

  // console.log(sumProxy(1, 2, 3, 4))

  // console.log(sumProxy(1, '3', 3, 4)) // error

  // new sumProxy(1, 2, 3) //error
}

{
  // make class callable with out new keyword
  // each function has [[call]] and [[constructor]]
  // we could do the opposoite and make es5 constuctors act like classes by restrcting with proxies

  class Person {
    constructor(name) {
      this.name = name
    }
  }

  let PersonProxy = new Proxy(Person, {
    apply: function (trapTarget, thisArg, argumentList) {
      return new trapTarget(...argumentList)
    }
  })

  let me = PersonProxy('Adam')

  console.log(me)
}