//Dependencies 

var express = require("express");
var mongojs = require("mongojs");


//These two dependencies make scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");


//Initialize app
var app = express();

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//mongoose.connect(MONGODB_URI);


axios.get('https://www.nytimes.com').then(function(response){

var $ = cheerio.load(response.data);

var results = [];


$("h2.css-1qwxefa").each(function(i, element){
    var articleTitle = $(element).text();

    var articleLink = $(element).parent().attr("href");


    results.push({
        ArticleTitle: articleTitle,
        ArticleLink: articleLink
    });
});


console.log(results);
});


