// Select all divs and give them a purple background
$("div").css("background", "purple");

// Select the divs with class "highlight" and make them 200px wide
$(".highlight").css("width", "200px");

// Select the div with id "third" and give it an orange border
$("#third").css("border", "orange solid 1px");

// Bonus: Select the first div only and change its font color to pink
// from video, didn't solve this
$("div:first-of-type").css("color", "pink"); // native css selector
$("div:first").css("color", "pink"); // a little slower since it's a jQuery shortcut and not native
