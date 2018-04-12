var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

var app = express();

// App config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('blog app is running');
});