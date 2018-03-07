var movieDB = [
  {
    title: "In Bruges",
    rating: "5 stars",
    hasWatched: true
  },
  {
    title: "Frozen",
    rating: "4.5 stars",
    hasWatched: false
  },
  {
    title: "Mad Max Fury Road",
    rating: "5 stars",
    hasWatched: true
  },
  {
    title: "Les Miserables",
    rating: "3.5 stars",
    hasWatched: false
  }
];

for (i = 0; i < movieDB.length; i++) {
  if (movieDB[i].hasWatched == true) {
    console.log('You have watched "' + movieDB[i].title + '" - ' + movieDB[i].rating);
  }
  else {
    console.log('You have not seen "' + movieDB[i].title + '" - ' + movieDB[i].rating);
  }
}

movieDB.forEach(function(movie) {
  if (movie.hasWatched == true) {
    console.log('You have watched "' + movie.title + '" - ' + movie.rating);
  }
  else {
    console.log('You have not seen "' + movie.title + '" - ' + movie.rating);
  }
});

// Could also do something like
// var movieDB = [
//   {
//     title: "In Bruges",
//     rating: 5,
//     hasWatched: true
//   }
// ];
// movies.forEach(function(movie) {
//   console.log(buildString(movie));
// });
// function buildString(movie) {
// var result = "You have ";
  // if (movie.hasWatched) {
  //   result += "watched ";
  // }
  // else {
  //   result += "not seen ";
  // }
  // result += "\"" + movie.title + "\" - " + movie.rating + " stars";
  // console.log(result);
// }
