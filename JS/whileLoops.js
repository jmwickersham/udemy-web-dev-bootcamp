console.log('Print all numbers between -10 and 19');
var num = -10;

while (num < 20) {
  console.log(num);
  num++;
}

console.log('Print all even numbers between 10 and 40');
var num = 10;

// caveat - only even if you start with an even number
while (num <= 40) {
  console.log(num);
  num+=2;
}

// alternate solution from video - not as efficient but guarantees an even number
/*while (counter <= 40) {
    if (num % 2 === 0) {
      console.log(num);
    }
    num++;
}*/

console.log('Print all odd numbers between 300 and 333');
/*var num = 301;

while (num <= 333) {
  console.log(num);
  num+=2;
}*/
// video solution
var num = 300;

while (num <= 333) {
  if (num % 2 !== 0) {
    console.log(num);
  }
  num++;
}

console.log('Print all numbers divisible by 5 and 3 between 5 and 50');
var num = 5;

while (num <= 50) {
  if (num % 3 === 0 && num % 5 === 0) {
      console.log(num);
  }
  num++;
}
