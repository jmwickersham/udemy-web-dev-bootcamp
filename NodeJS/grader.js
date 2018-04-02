function average(scores) {
 var total = 0;
 for (var i = 0; i < scores.length; i++) {
  total += scores[i];   
 }
 total = total / scores.length;
 
 console.log(Math.round(total));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);

// Solution from video for reference
/*function average(scores) {
    //add all scores together
    var total = 0;
    scores.forEach(function(score){
        total += score;
    });
    //divide by total number of scores
    var avg = total/scores.length;
    
    //round average
    return Math.round(avg);
}

console.log("Average score for environmental science");
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); //should return 94

console.log("Average score for organic chemistry");
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); //should return 68*/