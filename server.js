//Dependencies 

var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");


//These two dependencies make scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

//Gets the schemas constructors from saved.js and Articles.js
var db = require("./Saved");

var PORT = 3000;

//Initialize app
var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("Public"));


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var Database = mongoose.connection;
Database.on("error", console.error.bind(console, "connection error:"));
Database.once("open", function(){
    console.log("connected to Mongoose!");
});
//get route to scrape the 'nytimes.com' webpage.

app.get("/scrape", function(req, res){
console.log("3");
    axios.get("https://www.nytimes.com").then(function(response){
    var $ = cheerio.load(response.data);
   // console.log(response.data);
                    


    $("article h2").each(function(i, element){
        var result = {};
        result.title = $(element).text();

        result.link = $(element).parents("a").attr("href");
            
        db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(error){
                console.log(error);
            });
            
           //console.log(result);
    });

    res.send("Scraping complete boss");
    });

});

app.get("/SavedArticles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(error){
        res.json(error)
    });
});

app.post("/SavedArticles",function(req, res){
    db.Saved.create(req.body)
    .then(function(dbSaved){
        res.json(dbSaved);
    })
    .catch(function(error){
        res.json(error);
    });
});


app.listen(3000, function(){
    console.log("App running on port" + PORT);
});

app.get("/Articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(error){
        res.json(error)
    })
});





