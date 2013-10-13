var app = app || {};

(function(m) {
    
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
             }), function (error) {
            };
         
    }
    
    m.movie={
        movie: movie
   }
}(app));