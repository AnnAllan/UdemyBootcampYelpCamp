var express = require("express");
var app = express();



app.set('port', process.env.PORT || 3000)
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104497f3c17da4ecb3bc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/eb30b80b21f3043ed1584d05fb1d4e97e07ee3d21cac104497f3c17da4efb5ba_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"}
  ]
  res.render("campgrounds", {campgrounds:campgrounds  });
});

app.listen(app.get('port'), function(){
  console.log("The YelpCamp Server has started");
});
