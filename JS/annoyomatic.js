var answer = prompt('Are we there yet?');

// version 1
/* while (answer !== 'yes' && answer !== 'yeah') {
  var answer = prompt('Are we there yet?');
}*/

// version 2
while (answer.indexOf('yes') === -1 && answer.indexOf('yeah') === -1) {
  var answer = prompt('Are we there yet?');
}

alert("Yay, we made it!");
