var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// Create Route - Add new campground to DB
router.post("/", function(req, res) {
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
router.get("/:id", function(req, res) {
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

module.exports = router;