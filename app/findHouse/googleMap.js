var map;
var geocoder;
var circles = [];
var markers = [];

function initMap() {
	geocoder = new google.maps.Geocoder();
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
	    center: {lat: 32.9783403, lng: -96.7680352},
	    zoom: 12
    });
}


function getGeocode(address,radius,callback) {
    geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		  
			callback(results[0].geometry.location,radius);

		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
    });
}

function setMapOnAll(emptyOut) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(emptyOut);
    }
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function addMarker(location,contentString) {
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    var latLng = new google.maps.LatLng(location);
    console.log(circles);
    console.log(circles[0].getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(circles[0].getCenter(), latLng) <= circles[0].getRadius());
    markers.push(marker);
}

function deleteCircles() {
  setMapOnAll(null);
  circles = [];
}

function addCircle(latLngArray) {
	//deleteCircles();
    var circle = new google.maps.Circle({
        strokeColor: '#FF4500',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF4500',
        fillOpacity: 0.15,
        map: map,
        //center: location,
        center: { lat: latLngArray.lat, lng:latLngArray.lng},
        radius: latLngArray.radius*1609.344
    });
    circles.push(circle);
}

/*
function cicleContainsMarker(latLng) {
    circles
}

google.maps.Circle.prototype.contains = function(latLng) {
  return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
}
*/
/*
function getAllGeocodeThenAddCircle(addressArray){
	deleteCircles();
    deleteMarkers();
	var addressArrayLatLng = [];
	for (var i=0;i<addressArray.length;i++){
		//console.log("callback called! " + addressArray[i].radius);
		
		getGeocode(addressArray[i].address,addressArray[i].radius,function(location,radius){
			addressArrayLatLng.push({"lat":parseFloat(location.lat()),"lng":parseFloat(location.lng()),"radius":radius});
            addCircle(parseFloat(location.lat()),parseFloat(location.lng()),radius);
        });
	}
    //return "hey there"
}*/
function getGeocodePromise(location) {
        var deferred = $.Deferred();

        document.geoCodeRequestCompleteFlag = 0;
        geocoder.geocode({'address' : location.address}, function(results, status) {    

        if (status === 'OK') {                   
            
            var latLngArray = {"lat":parseFloat(results[0].geometry.location.lat()),"lng":parseFloat(results[0].geometry.location.lng()),"radius":location.radius}
           deferred.resolve(latLngArray);
         } else {
           deferred.reject(status);
         }          
     });             

     return deferred.promise();
}
/*
google.maps.Circle.prototype.contains = function(latLng) {
  	return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
}
*/