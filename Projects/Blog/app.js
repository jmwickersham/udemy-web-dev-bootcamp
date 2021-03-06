var express         = require('express'),
    expressSanitizer= require('express-sanitizer'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override');
var app             = express();

// App config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/blog_app');

// Mongoose Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String, 
    created: {
        type: Date, 
        default: Date.now
    }
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg",
//   body: "Hello, this is a blog post!"
// });

// Restful Routes
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// Index Route
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
       if (err) {
           console.log(err);
       }
       else {
            res.render('index', { blogs: blogs });
       }
    });
});

// New Route
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// Create Route
app.post('/blogs', function(req, res) {
   // Create Blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog) {
       if (err) {
           res.render('new');
       }
       else {
            // Redirect
            res.redirect('/blogs');
       }
   });
});

// Show Route
app.get('/blogs/:id', function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if (err) {
           res.redirect('/blogs');
       }
       else {
           res.render('show', { blog: foundBlog } );
       }
   });
});

// Edit Route
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
       if (err) {
           res.redirect('/blogs');
       }
       else {
           res.render('edit', { blog: foundBlog } );
       }
   });
});

// Update Route
app.put('/blogs/:id', function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
       if (err) {
           res.redirect('/blogs');
       }
       else {
           res.redirect('/blogs/' + req.params.id);
       }
   });
});

// Delete Route
app.delete('/blogs/:id', function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect('/blogs');
       } 
       else {
           res.redirect('/blogs');
       }
    });
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('blog app is running');
});