var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        var networkState = navigator.network.connection.type;
        if(networkState != "wifi" && networkState != "ethernet") {
            navigator.notification.vibrate(2000);
            navigator.notification.alert("You should use a wi-fi connection.");
        } 
        document.addEventListener("offline", onOffline, false);
        
    });
    
    function onOffline() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("You need a connection to use this app.", function() {
            navigator.app.exitApp();
        }, "No connection", "Exit");
    }
})();