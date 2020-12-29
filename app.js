//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "This is my first blog project and this is the home page of my blog project. In this i m going to write the blog and also add new one's. Anyone from the world can access the blogs and also can post there own blog on this post. Click on the add button to add a new blog to this timeline and it will be displayed over here. put on your views and what you want to share and i will share your thoughts to the world.";
const aboutContent = "I'm a web developer with expertise in building high-quality websites.My expertise range from building responsive sites, UI sites that work well across any browser. I'm flexible with my working hours. My specialties include : - Web design - responsive sites - user interface sites - backend development - php - node js - express - EJS - SQL - mongoDB - python. I can assure you that if you work with me once, you will always work with me for this kind of projects; I will do whatever it takes to deliver my 100% to this project.";
const contactContent = "Contact me on my linkedin profile or you can also contact via my phone number or email. one can also contact me on instagram and facebook on DM. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-abhishek:@Bhi2001@cluster0.axydn.mongodb.net/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

// let posts = [];

app.get("/", function(req, res) {
    Post.find({}, function(err, posts) {
        res.render("home", {
            hsc: homeStartingContent,
            posts: posts
        });
    });
    //res.sendFile(__dirname + "/home");
    //console.log(posts);

});

app.get("/about", function(req, res) {
    res.render("about", { ac: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { cc: contactContent });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    //console.log(req.body.title);
    //console.log(req.body.post);
    const post = new Post({
        title: req.body.title,
        content: req.body.postBody
    });
    post.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    });
    //console.log(newpost);
});

app.get("/posts/:postId", function(req, res) {
    //console.log(req.params.blogs);
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function(err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });


});

app.get("/post", function(req, res) {
    res.render("post");
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
});