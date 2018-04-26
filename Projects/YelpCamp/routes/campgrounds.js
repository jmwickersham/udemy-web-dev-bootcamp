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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Create Route - Add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name, 
        image: image,
        description: description,
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
       if (error) {
           console.log(error);
       } 
       else {
           // Render show template with that campground
           res.render("campgrounds/show", { campground: foundCampground });
       }
    });
});

// Edit Route
router.get('/:id/edit', checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('campgrounds/edit', { campground: foundCampground });                           
        }
    });
});

// Update Route
router.put('/:id', checkCampgroundOwnership, function(req, res) {
    // Find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
    // Redirect (show page)
        res.redirect('/campgrounds/' + updatedCampground._id);
    });
});

// Destroy Route
router.delete('/:id', checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        else {
            res.redirect('/campgrounds');
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
    // Is user logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
            else {
                // Does user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();                     
                }
                // Otherwise, redirect
                else {
                    res.redirect('back');
                }
            }
        });
    }
    // If not, redirect
    else {
        res.redirect('back'); // previous page
    }
}

module.exports = router;