function markerClass(){
	this.markers = [];
}

markerClass.prototype.setMapOnAll=function(emptyOut){
	for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(emptyOut);
    }
}

markerClass.prototype.clearMarkers = function() {
    this.setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
markerClass.prototype.deleteMarkers = function() {
    this.clearMarkers();
    this.markers = [];
}


markerClass.prototype.findPrice = function() {
	for (var i = 0; i < this.markers.length; i++) {
        console.log(this.markers[i].price);
    }
}
markerClass.prototype.addMarker = function(origin,location,contentString) {
    var infowindowOpen = true;
    var output;
    var infowindow;
    var displayRoute;
    //var displayRoute;
    
    calculateRoute(origin,location).then( function(response){
        //console.log(distance,duration);
        //console.log(contentString);
        contentString.distance = response.routes[0].legs[0].distance.text;
        contentString.duration = response.routes[0].legs[0].duration.text;
        //console.log(contentString);
        displayRoute = response;
        output = infoWindowContent(contentString);
        //console.log( output);
        
    });
    
    infowindow = new google.maps.InfoWindow({
	    //content: output
	});
    
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: HOUSEICON
    });

    marker.price = "shit123";

    marker.addListener('click', function() {
        //$('#myTable').find('tbody:last').append('<tr>...</tr><tr>...</tr>');
        //calculateRoute(origin,location);
        directionsDisplay.setDirections(displayRoute);
        infowindow.setContent(output);
        infowindow.open(map, marker);
        infowindowOpen = false;
    });
    marker.addListener('mouseover', function() {
    	infowindow.setContent(output);
        infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function() {
        if(infowindowOpen){
            infowindow.close(map, marker);
        }
    });
    infowindow.addListener('closeclick',function() {
        infowindowOpen = true;
    });
    this.markers.push(marker);
}