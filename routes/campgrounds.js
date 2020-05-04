const express = require("express")
const router = express.Router()
const Campground = require("../models/campground")
//campgrounds page route
//INDEX ROUTE
router.get("/", function (req, res) {  
    //get all campground from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
      })
})


//post route
//CREATE - add new campground to DB
router.post("/s", function (req, res) {  
    //get data from form and add to camps array
    let name = req.body.name
    let image = req.body.image
    let desc = req.body.description
    let newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect to camps page
            res.redirect("/campgrounds")
        }
      })
})

//NEW - show form to create new campground
router.get("/new", function (req, res) {  
    res.render("campgrounds/new")
})

//SHOW - shows more info about the one campground
router.get("/:id", function (req, res) {
    //find the with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})


module.exports = router