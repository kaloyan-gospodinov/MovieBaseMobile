var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        var networkState = navigator.network.connection.type;
        if(networkState != "wifi" && networkState != "ethernet") {
            navigator.notification.vibrate(2000);
            navigator.notification.alert("You should use a wi-fi connection.");
        } 
        
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("batterystatus", onBatteryStatus, false);
        
    });
    
    function onPause() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("Application Paused.", function() {
            navigator.app.exitApp();
        }, "Paused", "Exit");
    }
    
    function onResume() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("Application Resumed.", function() {
            navigator.app.exitApp();
        }, "Resumed", "Exit");
    }
    
    function onOnline() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("Application Online.", function() {
            navigator.app.exitApp();
        }, "Online", "Exit");
    }
    
    function onOffline() {
        navigator.notification.vibrate(2000);
        navigator.notification.alert("Application Offline.", function() {
            navigator.app.exitApp();
        }, "Offline", "Exit");
    }
    
    function onBatteryStatus(batteryInfo) {
        batteryLevel = batteryInfo.level,
		isPlugged = batteryInfo.isPlugged;
        navigator.notification.vibrate(2000);
        navigator.notification.alert("Battery level (" + batteryLevel + "%). " + 
								  "You are " + (isPlugged ? "" : "not") + "  plugged in.", function() {
            navigator.app.exitApp();
        }, "BatteryStatus", "Exit");
    }
})();