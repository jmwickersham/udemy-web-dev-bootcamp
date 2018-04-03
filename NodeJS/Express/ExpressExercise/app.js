var express = require('express');
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var message = "The " + animal + " says '";
    var sound = '';
    
    if (animal === 'pig') {
        sound = 'Oink';
    }
    else if (animal === 'cow') {
        sound = "Moo";
    }
    else if (animal === 'dog') {
        sound = "Woof Woof!";
    }
    
    /*From solution video:
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    };
    
    sound = sounds[animal];*/
    
    res.send(message + sound + "'");
});

app.get("/repeat/:phrase/:count", function(req, res) {
    var phrase = req.params.phrase;
    var count = parseInt(req.params.count);
    var message = phrase;
    
    if (count > 1) {
        for (var i = 1; i < count; i++) {
            message += ' ' + phrase;
        }
    }
    
    res.send(message);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("server started");
});