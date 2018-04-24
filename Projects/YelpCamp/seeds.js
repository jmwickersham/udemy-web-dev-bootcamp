var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Plaid kickstarter mixtape selfies narwhal PBR&B. Fixie ramps man braid post-ironic messenger bag, pitchfork hoodie poke adaptogen. Artisan pabst everyday carry, DIY normcore gastropub gluten-free snackwave keffiyeh la croix subway tile butcher pok pok iceland. Vice cronut fam jianbing la croix yuccie farm-to-table squid, asymmetrical man bun +1 pitchfork bitters tousled. Freegan trust fund everyday carry yr ethical wayfarers put a bird on it celiac, PBR&B mlkshk. Umami pitchfork twee meh, jean shorts listicle street art poke selvage four loko plaid cornhole snackwave blog everyday carry."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Flexitarian occupy lo-fi meggings pabst subway tile. Raw denim semiotics wolf ethical, affogato asymmetrical brooklyn. Blog umami asymmetrical yr tousled farm-to-table. Chartreuse blue bottle gastropub, keytar farm-to-table blog pour-over. Gastropub williamsburg semiotics typewriter, +1 celiac mumblecore mlkshk. Gentrify put a bird on it intelligentsia small batch, yuccie chartreuse vegan beard tousled chicharrones. Brunch 3 wolf moon flexitarian man bun kogi fingerstache trust fund."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Hashtag blue bottle stumptown meditation, umami trust fund master cleanse green juice tofu pok pok fashion axe everyday carry raclette swag freegan. Biodiesel lomo gastropub taiyaki, flannel pinterest freegan godard. Fanny pack tousled you probably haven't heard of them copper mug etsy, cornhole neutra aesthetic meditation iceland. Seitan slow-carb pickled, sustainable mlkshk vaporware thundercats fanny pack poke."
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        else {
            console.log('removed campgrounds');
            
            // Add a few campgrounds
            data.forEach(function(seed) {
               Campground.create(seed, function(err, campground) {
                   if (err) {
                       console.log(err);
                   }
                   else {
                       console.log('added a campground');
                       
                        // Add a few comments
                        Comment.create(
                           { 
                               text: "This place is great but I wish there was internet",
                               author: "Homer"
                               
                           }, function(err, comment) {
                               if (err) {
                                   console.log(err);
                               }
                               else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log('created new comment');
                               }
                           });
                   }
               });
            });
        }
    });
}

module.exports = seedDB;