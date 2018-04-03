var express = require('express');
var app = express();

// "/" =? "Hi there!"

app.get("/", function(req, res) {
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    res.send("MEOW!");
});

// use a : in front of a variable name to set a parameter
app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName.toUpperCase();
    res.send("WELCOME TO THE " + subreddit + " SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("Welcome to the comments page!");
});

// catch all for anything not specified above (good for error pages, etc.)
app.get("*", function(req, res) {
    res.send("You are a star!");
});

// using port and IP from C9, can normally just put a port and callback function
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});