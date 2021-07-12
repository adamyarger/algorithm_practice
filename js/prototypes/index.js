

function Car() {
  this.make = 'audi'
  this.model = 'a4'
}

function Bmw() {
  this.price = 20000
}



const car = new Car()

// can only assign prototype to an instantiated object
Bmw.prototype = car

console.log(car)

Car.prototype.honk = function () {
  console.log('beep beep')
}
car.honk()

const bmw = new Bmw()


let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

console.log(`%c ${admin.fullName}`, 'background: black; color: orange;'); // John Smith

admin.fullName = "Alice Cooper"

console.log(admin.fullName) // Alice Cooper
console.log(user.fullName) // John Smith