var app = app || {};

(function(b) {
    //initialize the google map
    function buildMap() {
        navigator.geolocation.getCurrentPosition(
            onSuccess, 
            onError
            );
    }
		
    // Run after successful transaction
    // Let's display the position data
    function onSuccess(position) {
        var latLng	= 
				new google.maps.LatLng(
						position.coords.latitude,
	 					position.coords.longitude);	
				
		var mapOptions = {
					center: latLng,
					panControl: false,
					zoomControl: true,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
		var map = new google.maps.Map(
								document.getElementById('map_canvas'),
								mapOptions	
							);
						
		var marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
        
        var markers = [];
        var defaultBounds = new google.maps.LatLngBounds(latLng);
        map.fitBounds(defaultBounds);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('target');
        var searchBox = new google.maps.places.SearchBox(input);

        // [START region_getplaces]
        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            var places = searchBox.getPlaces();

            for (var i = 0, marker; marker = markers[i]; i++) {
                marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location
                });

                markers.push(marker);

                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
        });
        // [END region_getplaces]

        // Bias the SearchBox results towards places that are within the bounds of the
        // current map's viewport.
        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });
    }

    // Run if we face an error 
    // obtaining the position data
    function onError(error) {
        var errString = '';
						
        // Check to see if we have received an error code	  
        if (error.code) {
            // If we have, handle it by case
            switch (error.code) {
                case 1: // PERMISSION_DENIED
                    errString = 
                    'Unable to obtain the location information ' + 
                    'because the device does not have permission ' +
                    'to the use that service.';
                    break;
                case 2: // POSITION_UNAVAILABLE
                    errString = 
                    'Unable to obtain the location information ' +
                    'because the device location could not be ' +
                    'determined.';
                    break;
                case 3: // TIMEOUT
                    errString = 
                    'Unable to obtain the location within the ' +
                    'specified time allocation.';
                    break;
                default: // UNKOWN_ERROR
                    errString = 
                    'Unable to obtain the location of the ' +
                    'device due to an unknown error.';
                    break;
            }
        }
					  
        // Handle any errors we may face
        //var element = document.getElementById('map_canvas');
        navigator.notification.alert(errString);
    }
    b.search = {
        buildMap:buildMap
    }
})(app);