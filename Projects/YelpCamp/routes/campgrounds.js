var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// Index Route - Show all campgrounds
router.get("/", function(req, res) {
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Create Route - Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name, 
        image: image,
        description: description,
        price: price,
        author: author
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
router.get("/:id", function(req, res) {
    // Find the capground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
       if (error || !foundCampground) {
           console.log(error);
       } 
       else {
           // Render show template with that campground
           res.render("campgrounds/show", { campground: foundCampground });
       }
    });
});

// Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Campground not found.");
        }
        else {
            res.render("campgrounds/edit", { campground: foundCampground });                           
        }
    });
});

// Update Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // Find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err || !updatedCampground) {
            console.log(err);
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        }
    // Redirect (show page)
        res.redirect("/campgrounds/" + updatedCampground._id);
    });
});

// Destroy Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        }
        else {
            res.flash("success", "Successfully deleted campground.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;