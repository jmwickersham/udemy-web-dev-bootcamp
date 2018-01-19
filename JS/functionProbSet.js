function isEven(num) {
  if (num % 2 === 0) {
    return true;
  }
  else {
    return false;
  }
}

/* shorter option from video since it will return true/false
function isEven(num) {
  return num % 2 === 0;
}
*/

console.log(isEven(4));
console.log(isEven(21));
console.log(isEven(68));
console.log(isEven(333));

function factorial(num) {
    if (num === 1 || num === 0) {
      return 1;
    }
    else {
      return num * factorial(num - 1);
    }
}

/* longer options from video
function factorial(num) {
  var result = 1;
  for(var i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

function factorial(num) {
  if (num === 0) {
    return 1;
  }

  var result = num;
  for(var i = num - 1; i >= 1; i--) {
    result *= i;
  }
  return result;
}
*/

console.log(factorial(5));
console.log(factorial(2));
console.log(factorial(10));
console.log(factorial(0));

function kebabToSnake(phrase) {
  return phrase.replace("-", "_");
}

/* another option from video
function kebabToSnake(str) {
  var newStr = str.replace(/-/g, "_");
  return newStr;
}
*/

console.log(kebabToSnake("hello-world"));
console.log(kebabToSnake("dogs-are-awesome"));
console.log(kebabToSnake("blah"));
