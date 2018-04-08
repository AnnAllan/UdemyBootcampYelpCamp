var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000)
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
Campground.create(
  {
    name: "Granite Hill",
    image: "https://pixabay.com/get/eb30b80b21f3043ed1584d05fb1d4e97e07ee3d21cac104497f3c17da4efb5ba_340.jpg",
    description: "This is a huge granite hill, no bathrooms, no water.  Beautiful granite."
  }, function(err, campground){
    if(err){
      console.log(err);
    } else {
      console.log("newly");
      console.log(campground);
    }
  });


app.get("/", function(req, res){
  res.render("landing");
});
// Index - show all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds:allCampgrounds  });
    }
  });
});
// Create - add new campground to db
app.post("/campgrounds", function(req, res){
  // get data from form and add to campgroundsarray
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
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
// New show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});
// Show - show all information for one campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided ID
  // render show template with that campground
  res.send("show");
});

app.listen(app.get('port'), function(){
  console.log("The YelpCamp Server has started");
});
