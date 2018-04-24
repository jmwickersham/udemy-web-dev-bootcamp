// Require Packages
var express    = require("express"), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
// Require JS Model Exports
var Campground = require("./models/campground"),
    seedDB     = require("./seeds");

// Set up App
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

// Index Route - Show all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from the DB
    Campground.find({}, function(error, allCampgrounds) {
       if (error) {
           console.log(error);
       } 
       else {
           res.render("index", { campgrounds: allCampgrounds });    
       }
    });
});

// New Route - Show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// Create Route - Add new campground to DB
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name, 
        image: image,
        description: description
    };
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(error, newlyCreated) {
        if(error) {
            console.log(error);
        }
        else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// Show route - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // Find the capground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
       if (error) {
           console.log(error);
       } 
       else {
           // Render show template with that campground
           res.render("show", { campground: foundCampground });
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server has started");
});