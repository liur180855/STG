var map;
var geocoder;
var circles = [];

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
}

function deleteCircles() {
  setMapOnAll(null);
  circles = [];
}

function addCircle(lat,lng,miles) {
	//deleteCircles();
    var circle = new google.maps.Circle({
        strokeColor: '#FF4500',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF4500',
        fillOpacity: 0.15,
        map: map,
        //center: location,
        center: { lat: lat, lng:lng},
        radius: miles*1609.344
    });
    circles.push(circle);
}



function getAllGeocodeThenAddCircle(addressArray){
	deleteCircles();
	var addressArrayLatLng = [];
	for (var i=0;i<addressArray.length;i++){
		console.log("callback called! " + addressArray[i].radius);
		
		getGeocode(addressArray[i].address,addressArray[i].radius,function(location,radius){
			addressArrayLatLng.push({"lat":parseFloat(location.lat()),"lng":parseFloat(location.lng()),"radius":radius});
            addCircle(parseFloat(location.lat()),parseFloat(location.lng()),radius);
        });
	}
}
/*
google.maps.Circle.prototype.contains = function(latLng) {
  	return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
}
*/