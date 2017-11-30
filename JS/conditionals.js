//var age = Number(prompt("What is your age?")); // Solution video
var age = prompt('How old are you?');

if (age < 0) {
  console.log('error');
}
else if (age == 21) {
  console.log('happy 21st birthday!!');
}
else if (age % 2 != 0) {
  console.log('your age is odd!!');
}
else if (age % Math.sqrt(age) == 0) {
  console.log('perfect square!');
}
