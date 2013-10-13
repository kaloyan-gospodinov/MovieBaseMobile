var app = app || {};

(function(a) {
    
    var apikey = "apikey=s6k62d4zdqbr3tetvar6meqm";
    var moviesUpcoming = 'http://api.rottentomatoes.com/api/public/v1.0/' + 'lists/movies/upcoming.json?' + apikey;

    function init() {
        
        httpRequest.getJSON(moviesUpcoming)
        .then(function(movies) {
            //$("#upcoming-holder").html(JSON.stringify(movies.movies));
            $("#upcoming-holder").kendoMobileListView({
                dataSource: movies.movies,
                template: kendo.template($("#template").html())
            });
        });        
    }
    a.upcoming={
        init:init
    }
}(app));