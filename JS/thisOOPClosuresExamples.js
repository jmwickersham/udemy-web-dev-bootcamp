function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.bark = function() {
        console.log(this.name + ' just barked!');
    }
}

var rusty = new Dog('Rusty', 3);
var fido = new Dog('Fido', 1);

rusty.bark();
fido.bark();

//--------
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

function Motorcycle(make, model, year) {
    Car.apply(this, arguments);
    this.numWheels = 2;
}

//--------
function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}

Vehicle.prototype.turnOn = function() {
    this.isRunning = true;
}
Vehicle.prototype.turnOff = function() {
    this.isRunning = false;
}
Vehicle.prototype.honk = function() {
    if (this.isRunning) {
        return "beep!";
    }
}

//--------
function classRoom() {
    var instructors = ["Colt", "Elie"];
    return {
        getInstructors: function() {
            return instructors;
        },
        addInstructors: function(instructor) {
            instructors.push(instructor);
            return instructors;
        }
    }
}

course1 = classRoom();
course1.getInstructors();
course1.addInstructors("Ian");
course1.getInstructors();

course2 = classRoom();
course.getInstructors();