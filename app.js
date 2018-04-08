var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000)
app.set("view engine", "ejs");

seedDB();


app.get("/", function(req, res){
  res.render("landing");
});
// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds:allCampgrounds  });
    }
  });
});
// CREATE- add new campground to db
app.post("/campgrounds", function(req, res){
  // get data from form and add to campgroundsarray
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});
// NEW form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});
// SHOW - show all information for one campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided ID
Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  if(err){
    console.log(err);
  } else {
    // render show template with that campground
    res.render("campgrounds/show", {campground: foundCampground});
  }
});
});



app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err)
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      })


    }
  })
});

app.listen(app.get('port'), function(){
  console.log("The YelpCamp Server has started");
});
