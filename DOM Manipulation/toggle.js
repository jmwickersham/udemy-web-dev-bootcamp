var button = document.querySelector('button');
var body = document.querySelector('body');

button.addEventListener("click", function() {
  if (body.style.background == 'white') {
    body.style.background = 'purple';
  }
  else {
    body.style.background = 'white';
  }
});


/* from video
var button = document.querySelector("button");
var isPurple = false;

button.addEventListener("click", function() {
  if(isPurple){
    document.body.style.background = "white";
    // isPurple = false;
  } else {
    document.body.style.background = "purple";
    // isPurple = true;
  }
  isPurple = !isPurple;
});
*/

/* from video
var button = document.querySelector("button");

button.addEventListener("click", function() {
  document.body.classList.toggle("purple");
});
*/
