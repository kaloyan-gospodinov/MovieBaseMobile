var app = app || {};

(function(t) {
    var moviesTheaters = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=s6k62d4zdqbr3tetvar6meqm';

    function init() {
        
        httpRequest.getJSON(moviesTheaters)
        .then(function(theaters) {
            $("#theaters-holder").kendoMobileListView({
                dataSource: theaters.movies,
                template: kendo.template($("#theaters-template").html())
            });
        });      
        
        
    }
    
    function movie(e) {
         var div = document.getElementById("fmovie");
            while (div.firstChild){
                div.removeChild(div.firstChild);
            }
        
         httpRequest.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies/" + e.view.params.id + ".json?apikey=s6k62d4zdqbr3tetvar6meqm")
         .then(function(movie){
             var movieTag = document.getElementById("fmovie");
             $(movieTag).append("<h1>" + movie.title + "</h1>");
             $(movieTag).append("<img src=" +  movie.posters.profile + " />");
             $(movieTag).append("<p>" +  movie.synopsis + "</p>");
             });
         
    }
    
    t.theaters={
        init:init,
        movie: movie,
        
    }
}(app));