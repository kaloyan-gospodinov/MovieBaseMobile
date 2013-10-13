var app = app || {};

(function(m) {
    var title;
    var poster;
    var link;
    
    function movie(e) {
        var div = document.getElementById("fmovie");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        
        httpRequest.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies/" + e.view.params.id + ".json?apikey=s6k62d4zdqbr3tetvar6meqm")
        .then(function(movie) {
            var movieTag = document.getElementById("fmovie");
            $(movieTag).append("<h1>" + movie.title + "</h1>");
            $(movieTag).append("<img src=" + movie.posters.profile + " />");
            $(movieTag).append("<p>" + movie.synopsis + "</p>");
            title = movie.title;
            poster = movie.posters.profile;
            link = movie.links.alternate;
        }), function (error) {
        };         
        
        jso_registerRedirectHandler(function(url) {
            inAppBrowserRef = window.open(url, "_blank");
            inAppBrowserRef.addEventListener('loadstop', function(e) {
                LocationChange(e.url)
            }, false);
        });
        
        function LocationChange(url) {
            url = decodeURIComponent(url);

            jso_checkfortoken('facebook', url, function() {
                
                inAppBrowserRef.close();
            });
        };
        
        jso_configure({
            "facebook": {
                client_id: "1419790494906111",
                redirect_uri: "http://www.facebook.com/connect/login_success.html",
                authorization: "https://www.facebook.com/dialog/oauth",
                presenttoken: "qs"
            }
        });
    }
    
    
    function cmdPost() {
        jso_ensureTokens({
                "facebook": ["read_stream", "publish_stream"]
        }),false;
        
        // Perform the protected OAuth calls.
        $.oajax({
            type: "POST",
            url: "https://graph.facebook.com/me/feed",
            jso_provider: "facebook",
            jso_scopes: ["read_stream", "publish_stream"],
            jso_allowia: true,
            dataType: 'json',
            data: {
                message: "Check this movie, I've just watched - " + title + "!",
                link: link
            },
            success: function(data) {
                navigator.notification.alert("Posted Successully!");
            },
            error: function(e) {
                navigator.notification.alert(e);
            }
        }),false;
    };
    
    m.movie = {
        movie: movie,
        cmdPost:cmdPost
    }
}(app));