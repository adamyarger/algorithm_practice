/**
 * this is a varition of a mixin which allows us to use the parents class overriden function
 * similar to super() in other languages, its kind of what classes in js do behind the scenes
 * 
 * we dont need to use new with the Car function since were only using the Vehicle
 * when we use new with it it will be discarded, so we could just use Car() iwthout new
 */

function Vehicle() {
  this.engines = 1
}

Vehicle.prototype.ignition = function () {
  console.log('ignition')
}

Vehicle.prototype.drive = function () {
  this.ignition()
  console.log("Steering and moving forward!");
}

// parasitic class
// we tack onto the vehicle instance and return it
function Car() {
  // create new instance aka a new object
  const car = new Vehicle()

  // set new property
  car.wheels = 4

  // save a reference to drive
  const veDrive = car.drive

  car.drive = function () {
    veDrive.call(this)
    console.log('they see my rollin')
  }

  return car
}

const car = new Car()

car.drive()