
// __proto__

{
  let point = {
    x: 12,
    y: 10
  }

  let point3D = {
    __proto__: point,
    z: 30
  }

  console.log(
    point3D.x,
    point3D.y,
    point3D.z
  )
}


/**
 * setPrototypeOf does the same thing but is an es5 thing
 * its also not very performant since were chaing the object prototype after its creation
 * and browsers optimize for prototype not to change
 */
{
  let point = {
    x: 12,
    y: 10
  }

  let point3D = {
    z: 30
  }

  Object.setPrototypeOf(point3D, point)

  console.log(
    point3D.x,
    point3D.y,
    point3D.z
  )
}


// we can also assign via the .prototype value

{
  function Point() {
    this.x = 10
    this.y = 12
  }

  function Point3D() {
    this.z = 23
  }

  Point3D.prototype = new Point()

  let point3D = new Point3D

  console.log(
    point3D.x,
    point3D.y,
    point3D.z
  )
}


// Object.create. this is a prefered way since its performant and associates the prototype at creation time

{
  let point = {
    x: 12,
    y: 10
  }

  let point3D = Object.create(point)

  point3D.z = 30

  console.log(
    point3D.x,
    point3D.y,
    point3D.z
  )
}


// extend
{
  class Point {
    constructor() {
      this.x = 23
      this.y = 4
    }
  }

  class Point3D extends Point {
    constructor() {
      super()
      this.z = 34
    }
  }

  const point3D = new Point3D()

  console.log(
    point3D.x,
    point3D.y,
    point3D.z
  )
}

// new
function Robot() {
  this.cool = true
}

Robot.prototype.fire = function () {
  console.log('fire away')
}

function IronMan() {
  // call parent constructor
  this.name = 'Iron Man'

  /**
   * this = {
   *   name: Iron Man
   * }
   * 
   * Robot is the function we want this to adopt
   * 
   * when fired the following hapepns
   * 
   * this = {
   *   name: iron man,
   *   [Symbol]: Robot() {}
   * }
   * 
   * then robot gets fired
   * and robots constructor does this
   * 
   * this.cool = true
   */
  Robot.call(this)
}

// the top part adopts Robots state
// now we need to adopt its prototypes
// assign ironmans prototype to robot
IronMan.prototype = new Robot()

// fix prototype point. whats that means???
// this pointed to Robot before, but it should point to IronMan now
// why do this???
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

// reset constructor to point to the function IronMan itself, this is a reference
IronMan.prototype.constructor = IronMan

let mark1 = new IronMan()

mark1.fire()






// bad inheritence
// function Animal() {
//   this.offspring = [];
// }

// Animal.prototype.makeBaby = function () {
//   var baby = new Animal();
//   // push will go up the prototype chain and push to the protypes array
//   this.offspring.push(baby);
//   return baby;
// };

// //create Cat as a sub-class of Animal
// function Cat() {
// }

// //Inherit from Animal
// Cat.prototype = new Animal();

// var puff = new Cat();
// puff.makeBaby();
// var colonel = new Cat();
// colonel.makeBaby();

// console.log(puff.offspring === colonel.offspring)