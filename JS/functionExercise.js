function sing() {
  console.log('twinkle twinkle...');
  console.log('how i wonder...');
}

// setInterval(functionToCall, intervalInMilliseconds);
setInterval(sing, 1000);

// clearInterval(numberProvidedbySetInterval);
clearInterval(2);

// using an anonymous function
setInterval(function() {
  console.log('twinkle twinkle...');
  console.log('how i wonder...');
}, 2000);
