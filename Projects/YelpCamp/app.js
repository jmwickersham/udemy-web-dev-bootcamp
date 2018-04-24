// Require Packages
var express    = require("express"), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
// Require JS Model Exports
var Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
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
           res.render("campgrounds/index", { campgrounds: allCampgrounds });    
       }
    });
});

// New Route - Show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
           res.render("campgrounds/show", { campground: foundCampground });
       }
    });
});

// ======== Comments Routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
    // Find campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('comments/new', { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // Find campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            // Create a new comment
            Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } 
               else {
                   // Connect new comment to campground
                   campground.comments.push(comment);
                   campground.save();
                   
                    // Redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server has started");
});