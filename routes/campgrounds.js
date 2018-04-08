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
