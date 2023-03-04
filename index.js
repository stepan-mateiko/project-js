const year = {
  currentYear: 2023,
};

class Car {
  constructor(brand, year, color) {
    (this.brand = brand), (this.year = year), (this.color = color);
  }
  // call
  getCarInfo() {
    return `Car brand is ${this.brand}, year is ${this.year}, color is ${this.color}`;
  }
  // bind
  getCartTotalAge() {
    const age = year.currentYear - this.year;
    return `this car is ${age} years old`;
  }
  // apply
  getTransmition(transition) {
    return `${this.brand} uses ${transition} transition`;
  }

  // get total age of car
  // if transition
}

const toyota = new Car("Toyota", 2020, "blue");
const carInfo = toyota.getCarInfo;
const getCarTotalAge = toyota.getCartTotalAge.bind(toyota);
const getTransmition = toyota.getTransmition;

console.log(carInfo.call(toyota));
console.log(getTransmition.apply(toyota, ["manual"]));
console.log(getCarTotalAge());

const bmw = new Car("BMW", 2003, "silver");
console.log(carInfo.call(bmw));
console.log(getTransmition.apply(bmw, ["automatic"]));

//
const car = {
  year: 2005,
  calculateYear() {
    return year.currentYear - this.year;
  },
};

const calculateYear = car.calculateYear.bind(car);
console.log(calculateYear());

const newCar = {
  year: 2005,
  showTotalAge: function () {
    const age = this.year;
    return function () {
      return this.currentYear - age;
    }.call(year);
  },
};

const showTotalAge = newCar.showTotalAge;
console.log(showTotalAge.call(newCar));
