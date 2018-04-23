var mongoose = require('mongoose');

var Post = require('./models/post'),
    User = require('./models/user');

mongoose.connect('mongodb://localhost/blog_demo_2');

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// Post.create({
//     title: "How to cook the best burger Pt. 4",
//     content: "sdf asdfsdfa erfeaf sdfaesf asd"
// }, function(err, post) {
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
//       if (err) {
//           console.log(err);
//       } 
//       else {
//           foundUser.posts.push(post);
//           foundUser.save(function(err, data) {
//               if (err) {
//                   console.log(err);
//               }
//               else {
//                   console.log(data);
//               }
//           });
//       }
//     });
// });

// Find user
// Find all posts for that user
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
  if (err) {
      console.log(err);
  } 
  else {
      console.log(user);
  }
});