

/*elements with classes of 'NewArticles' will call a get method to scrape new articles.
After the get method has stored the information in the 'articles.js' file in the 'Saved' folder.
It will empty the div tag with the 'alert' class. 
Then it will create elements for each scraped article and append them to the div with
the 'alert' class.
*/
function Scraping(){
    console.log("2");
    $(".alert").empty();
    $.getJSON("/Articles", function(data){
    for( i = 0; i < 10; i++){
        console.log(data[i]);
            $(".alert").append("<div class='card text-white'><div class='card-header bg-primary'>"+data[i].title + "</div><div class='card-body text-dark'><h4><a href ='nytimes.com"+data[i].link + "'>"+"nytimes.com"+data[i].link+"</h4><button type = 'submit' class = 'save'>Save</button></div></div><br>");
        };
    });
}


//Ajax method that 
$(".NewArticles").on('click', function(){
    console.log("1");
    $.ajax({
        method:"GET",
        url: "/scrape"
    }).then(function(data){
        console.log(data);
        Scraping();
    });
});