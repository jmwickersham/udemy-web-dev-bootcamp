var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var campgrounds = [
    {
        name: "Salmon Creek", 
        image: "https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981_960_720.jpg"
    },
    {
        name: "Granite Hill", 
        image: "https://cdn.pixabay.com/photo/2016/07/26/16/58/mountain-1543313_960_720.jpg"
    },
    {
        name: "Mountain Goat's Rest", 
        image: "https://cdn.pixabay.com/photo/2017/12/18/19/10/nature-3026732_960_720.jpg"
    },
        {
        name: "Salmon Creek", 
        image: "https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981_960_720.jpg"
    },
    {
        name: "Granite Hill", 
        image: "https://cdn.pixabay.com/photo/2016/07/26/16/58/mountain-1543313_960_720.jpg"
    },
    {
        name: "Mountain Goat's Rest", 
        image: "https://cdn.pixabay.com/photo/2017/12/18/19/10/nature-3026732_960_720.jpg"
    },
        {
        name: "Salmon Creek", 
        image: "https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981_960_720.jpg"
    },
    {
        name: "Granite Hill", 
        image: "https://cdn.pixabay.com/photo/2016/07/26/16/58/mountain-1543313_960_720.jpg"
    },
    {
        name: "Mountain Goat's Rest", 
        image: "https://cdn.pixabay.com/photo/2017/12/18/19/10/nature-3026732_960_720.jpg"
    }
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name, 
        image: image
        
    };
    
    campgrounds.push(newCampground);
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server has started");
});