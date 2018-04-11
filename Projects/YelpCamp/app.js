var express    = require("express"), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://cdn.pixabay.com/photo/2016/07/26/16/58/mountain-1543313_960_720.jpg",
//     description: "This is a huge granite hill, no bathrooms.  No water.  Beautiful granite!"
// }, function(error, campground) {
//     if(error) {
//         console.log(error);
//     }
//     else {
//         console.log(campground);
//     }
// });

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
    Campground.findById(req.params.id, function(error, foundCampground) {
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