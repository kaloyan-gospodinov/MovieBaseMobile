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
        }), function (error) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert("Error while reading movies in theaters!");
        };      
        
        
    }
    
    t.theaters={
        init:init
        
    }
}(app));