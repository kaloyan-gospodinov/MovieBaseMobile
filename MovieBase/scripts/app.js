var app = app || {};

(function() {

    app.servicesBaseUrl = "http://api.rottentomatoes.com/api/public/v1.0/";
    
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        var networkState = navigator.network.connection.type;
        if(networkState != "wifi" && networkState != "ethernet") {
            navigator.notification.vibrate(2000);
            navigator.notification.alert("You should use a wi-fi connection.");
        } 
    });
})();