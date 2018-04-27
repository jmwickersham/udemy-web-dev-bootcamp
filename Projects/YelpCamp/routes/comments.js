var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// Comments New
router.get("/new", isLoggedIn, function(req, res) {
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

// Comments Create
router.post("/", isLoggedIn, function(req, res) {
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
                   // Add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                
                   // Save comment
                   comment.save();
                   
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

// Edit Route
router.get('/:comment_id/edit', checkCommentOwnership, function(req, res) {
   Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err) {
           console.log(err);
           res.redirect('back');
       }
       else {
            res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
       }
   });
});

// Update Route
router.put('/:comment_id', checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});

// Destroy Route
router.delete('/:comment_id', checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('back');
        }
        else {
            res.redirect('/campgrounds/' + req.params.id);   
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

function checkCommentOwnership(req, res, next) {
    // Is user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect('back');
            }
            else {
                // Does user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
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