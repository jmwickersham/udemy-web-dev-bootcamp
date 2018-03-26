var numberOfSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupSquares() {
  for (i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;

      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        h1.style.backgroundColor = clickedColor;
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
      }
      else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
      reset();
    });
  }
}

function reset() {
  // generate all new colors
  colors = generateRandomColors(numberOfSquares);

  // pick a new random color from array
  pickedColor = pickColor();

  // change color display to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";

  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display ="block";
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display ="none";
    }
  }
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  // loop through all squares
  for (i = 0; i < squares.length; i++) {
    // change each color to match given colors
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var colorArray = [];

  // add num random colors to array
  for (var i = 0; i < num; i++) {
    // get random color and push into arr
    colorArray.push(randomColor());
  }

  // return array
  return colorArray;
}

function randomColor() {
  // pick a "red" from 0-255
  var red = Math.floor(Math.random() * 256);

  // pick a "green" from 0-255
  var green = Math.floor(Math.random() * 256);

  // pick a "blue" from 0-255
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
