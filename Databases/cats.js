var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// add a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log('something went wrong');
//     }
//     else {
//         console.log('we just saved a cat to the db: ');
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Snow White" ,
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(cat);
    }
});

// retrieve all cats from the DB - console.log each one
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("oh no, error");
        console.log(err);
    }
    else {
        console.log('all the cats....');
        console.log(cats);
    }
});