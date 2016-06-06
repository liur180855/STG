function markerClass(){
	this.markers = [];
	this.originMarker = new google.maps.Marker();
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
    this.originMarker.setMap(null);
    this.originMarker = null;
}

markerClass.prototype.findMax=function(max){
	if (this.markers.length ==0){return max;}
	var max = this.markers[0].price;
	for (var i = 1; i < this.markers.length; i++) {
        if (max<this.markers[i].price){
        	var max = this.markers[i].price;
        }
    }
    return parseInt(max);
}
markerClass.prototype.findMin=function(min){
	if (this.markers.length ==0){return min;}
	var min = this.markers[0].price;
	for (var i = 1; i < this.markers.length; i++) {
        if (min>this.markers[i].price){
        	var min = this.markers[i].price;
        }
    }
    return parseInt(min);
}
markerClass.prototype.hideMarkerWithPrice = function(min,max) {
	if (this.markers.length ==0){return;}
	for (var i = 0; i < this.markers.length; i++) {
		if(this.markers[i].price<min || this.markers[i].price>max){
			this.markers[i].setVisible(false);
		}else{
			this.markers[i].setVisible(true);
		}
        
    }
	
}

markerClass.prototype.findPrice = function() {
	for (var i = 0; i < this.markers.length; i++) {
        console.log(this.markers[i].price);
    }
}
markerClass.prototype.addMarker = function(origin,location,contentString,price) {
    var infowindowOpen = true;
    var output;
    var infowindow;
    var displayRoute;
    //var displayRoute;
    console.log
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

    marker.price = price;

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

markerClass.prototype.addOriginMarker = function(latLngArray) {

	var marker = new google.maps.Marker({
        position: latLngArray,
        map: map,
        icon: ORIGINICON
    });
	this.originMarker = marker;
}
