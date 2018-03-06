var nums = [1,2,3,4];

nums.forEach(function(num){
  console.log(num);
});

myForEach(nums, function(num) {
  console.log(num);
});

function myForEach(arr, func) {
  // loop through array
  for (i = 0; i < arr.length; i++) {
    // call func for each item in array
    func(arr[i]);
  }
}

var colors = ['red', 'orange', 'yellow'];

myForEach(colors, alert);

myForEach(colors, function(color) {
  console.log(color);
});

Array.prototype.myForEach = function(func) {
  // 'this' refers to the array we're calling the function on
  // loop through array
  for (i = 0; i < this.length; i++) {
    // call func for each item in array
    func(this[i]);
  }
}

var friends = ['charlie', 'dave', 'maddy', 'caitlin'];

friends.myForEach(alert);

friends.myForEach(function(name) {
  console.log('I love ' + name);
});
