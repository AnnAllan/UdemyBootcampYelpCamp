var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to campgroundsarray
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author: author}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
      // redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

// NEW form to create new campground
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// SHOW - show all information for one campground
router.get("/:id", function(req, res){
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

function isLoggedIn(req, res, next){
  if(req.isAuthenticated(0)){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
