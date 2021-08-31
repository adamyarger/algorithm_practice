

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

{
  let collection = {
    0: 'dude',
    1: 'wheres my car',
    length: 2,
    // allows object that looks like an array to be concated
    [Symbol.isConcatSpreadable]: true
  }

  // concat works with both arrays and values
  // it does this because `Symbol.isConcatSpreadable` allows arrays to be split apart into individual arguments
  let messages = ['Hey'].concat(collection)

  console.log(messages)
}

{
  /**
   * Symbol.match, replace, search, split
   * allows for overwritting Regex object
   * 
   * the main bebefit of this is doing more programatic regex matches
   * while still using the native functions
   */

  let hasLength10 = {
    [Symbol.match]: function (value) {
      return value.length === 10 ? [value] : null
    }
  }

  let msg = 'Hello John'

  console.log(msg.match(hasLength10))
}