

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
  console.log(proxy.name);            // "proxy"

  // nonexistent properties throw an error
  // console.log(proxy.nme);             // throws error
}