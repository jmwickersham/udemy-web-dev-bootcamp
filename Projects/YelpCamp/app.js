// Require Packages
var express       = require("express"), 
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require('passport'),
    LocalStrategy = require('passport-local');
    
// Require JS Model Exports
var Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require('./models/user'),
    seedDB     = require("./seeds");
    
// Require JS Route Exports
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index');

// Set up App
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Passport Config
app.use(require('express-session')({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   next();
});

// Route config
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

mongoose.connect("mongodb://localhost/yelp_camp");

// seedDB(); // Seed the database

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server has started");
});