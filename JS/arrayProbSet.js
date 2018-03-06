function printReverse(array) {
  for (i = array.length - 1; i >= 0; i--) {
    console.log(array[i]);
  }
}

printReverse([1,2,3,4]);
//4
//3
//2
//1

printReverse(['a', 'b', 'c']);
//c
//b
//a

// ----------------

function isUniform(array) {
  for (i = 0; i < array.length - 1; i++) {
    if (array[i] !== array[i + 1]) {
      return false;
    }
  }
  return true;
}

// Solution from video
// function isUniform(array) {
//   var first = array[0];
//   for (var i = 1; i < array.length; i++) {
//     if (array[i] !== first) {
//       return false;
//     }
//   }
//   return true;
// }

isUniform([1,1,1,1]); //true
isUniform([2,1,1,1]); //false
isUniform(['a', 'b', 'p']); //false
isUniform(['b', 'b', 'b']); //true

// ----------------

function sumArray(array) {
  var result = 0;

  array.forEach(function(num) {
    result += num;
  })

  return result;
}

sumArray([1,2,3]); //6
sumArray([10,3,10,4]); //27
sumArray([-5,100]); //95

// ----------------

function max(array) {
  var max = array[0];
  // only optimization from video is starting loop at 1
  for (i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

max([1,2,3]); //3
max([10,3,10,4]); //10
max([-5,100]); //100
