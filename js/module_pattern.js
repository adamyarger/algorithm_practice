/**
 * create a revealing module manager
 * - should be able to register modules
 * - should allow modules to have dependecies
 */

// register name, deps, instance

const Modules = (function Manager() {
  const modules = {}

  // this closure sets a new module
  function define(name, deps, impl) {
    for (let i = 0; i < deps.length; i++) {
      // add dependencies to the module being registered
      // create an array of deps by looking them up in modules then passing them through apply
      deps[i] = modules[deps[i]]
    }
    // pass in dependencies via apply
    modules[name] = impl.apply(impl, deps)
  }

  // this closure retrieves a module
  function get(name) {
    return modules[name]
  }

  return {
    define,
    get
  }
})()

// a module instance will have access to depenedencies
Modules.define('bar', [], function () {
  function hello(who) {
    return `hello, ${who}`
  }

  return {
    hello
  }
})

// deps get passed in as an array
Modules.define('dude', ['bar'], function (bar) {
  const happy = 'happy'

  function cool() {
    console.log(bar.hello(happy))
  }

  return {
    cool
  }
})

const dude = Modules.get('dude')

console.log(dude.cool())
