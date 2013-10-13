var app = app || {};

(function(t) {
    var moviesTheaters = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=s6k62d4zdqbr3tetvar6meqm';

    function init() {
        
        httpRequest.getJSON(moviesTheaters)
        .then(function(theaters) {
            $("#theaters-holder").kendoMobileListView({
                dataSource: theaters.movies,
                template: kendo.template($("#theaters-template").html()),
                 click: function(e) {
                    //console.log(e.dataItem.title, e.dataItem.synopsis);
                     var movie = document.getElementById("movie");
                     movie.innerHtml="";
                     $(movie).append("<p>" + e.dataItem.title + "</p>");
                     $(movie).append("<img src=" +  e.dataItem.posters.thumbnail + "/>");
                     $(movie).append("<p>" +  e.dataItem.synopsis + "</p>");
                 }
                 
            });
        });      
        
        
    }
    
    t.theaters={
        init:init
    }
}(app));