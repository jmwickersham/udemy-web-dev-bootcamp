var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Is user logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err || !foundCampground) {
                console.log(err);
                req.flash("error", "Campground not found.");
                res.redirect("back");
            }
            else {
                // Does user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();                     
                }
                // Otherwise, redirect
                else {
                    req.flash("error", "You don"t have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }
    // If not, redirect
    else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back"); // previous page
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Is user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log(err);
                req.flash("error", "Comment not found.");
                res.redirect("back");
            }
            else {
                // Does user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();                     
                }
                // Otherwise, redirect
                else {
                    req.flash("error", "You don"t have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }
    // If not, redirect
    else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back"); // previous page
    }
};

// Middleware
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj;




// other ways to set up export functions
// module.exports = function {
    
// };

// var middlewareObj = {
//     checkCampgroundOwnership: function() {
        
//     }
// };