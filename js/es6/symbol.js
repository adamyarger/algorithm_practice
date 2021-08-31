

/**
 * Well Known Symbols
 * ---
 * built in symbols that expose once considered internal parts of JS.
 */

/**
 * Symbol.hasInstance
 *
 * obj instanceof Array
 *
 * is equivlant to
 *
 * Array[Symbol.hasInstance](obj)
 *
 * but why have 2 ways of doing the same thing?
 *
 * becuase you can change how instanceof works
 */

{
  function Foo() {
    this.x = 23
  }

  // here were overwriting hasInstance to always return false
  // this isnt possible when using the operator instanceof before hand
  Object.defineProperty(Foo, Symbol.hasInstance, {
    value: function (v) {
      return false
    }
  })

  let obj = new Foo()

  // we can still use the instanceof operator
  // since its internally using the Symbol.hasInstance function
  console.log(obj instanceof Foo)
}

