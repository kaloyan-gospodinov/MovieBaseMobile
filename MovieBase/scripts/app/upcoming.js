var app = app || {};

(function(a) {
    
    var apikey = "apikey=s6k62d4zdqbr3tetvar6meqm";
    var moviesUpcoming = app.servicesBaseUrl + 'lists/movies/upcoming.json?' + apikey;

    function init() {
        
        httpRequest.getJSON(moviesUpcoming)
        .then(function(movies) {
            $("#upcoming-holder").html(JSON.stringify(movies));
        });
    }
    a.upcoming={
        init:init
    }
}(app));