// {
//   function logThis() {
//     console.log(this);
//   }

//   const obj = {
//     foo: function () {
//       // was logThis acces from dot notation? == no
//       // was it binded, applied or called? == no
//       // was a constructor new used == no
//       // then its window by default or null or undefined in strict mode
//       // it about how you cannthe function
//       // logThis === window.logThis
//       // what object is the function currently living on???
//       logThis();
//     }
//   }

//   obj.foo()
// }


// practice callback bindings

{
  var myNew = (constructor, ...args) => {
    if (typeof constructor !== 'function') return

    // create a new object and set its prototype to the constructors prototype
    const obj = Object.create(constructor.prototype)

    // how does this.name = name work then?
    // were passing in obj which will now be this
    // so when this.name = is called it references the obj and creates and assign a new property
    let response = constructor.apply(obj, args)

    // only return an object, if its a primitive return the object we cerated
    return typeof response === 'object' && response !== null
      ? response
      : obj
  }

  function Foo(name) {
    this.name = name
    this.fn = () => console.log(this)
  }

  let obj = myNew(Foo, 'adam')
  obj.fn()


  let base = Object.create({})

  let bar = {
    name: 'adam',
    fn: () => console.log(this)
  }

  base.fn = bar.fn

  base.fn()
}