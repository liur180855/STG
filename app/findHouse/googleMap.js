var map;
var geocoder;
var circles = [];
var markers = [];
var directionsService;
var directionsDisplay;
var HOUSEICON = "image/house_icon.png";
var ORIGINICON = "image/origin.png";

function initMap() {
	geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
	    center: {lat: 32.9783403, lng: -96.7680352},
	    zoom: 12
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );
    directionsDisplay.setOptions( {preserveViewport: true} );
}

function checkMarkerInCircle(circle,location){

    var latLng = new google.maps.LatLng(location);
    return circle.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), latLng) <= circle.getRadius();
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
        markers[i].setMap(emptyOut);
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

function infoWindowContent(contentString){
    var output = '<table id="myTable" class="tableInfoWindow"><tbody>';
    for (var property in contentString) {
        //console.log(property)
        if (property != "location" && property != "_id" && property != "address"){
            //console.log(property)
            output += '<tr class ="trInfoWindow"><th>'+property + '</th><td>' + contentString[property]+'</td></tr>';
        }
    }
    output += '</tbody></table>';
    return output;

}
/*
function infoWindowContent(contentString){
    var elm = document.createElement('table');
    elm.setAttribute('id', 'myTable');
    elm.setAttribute('class', 'tableInfoWindow');
    elm.innerHTML = '';
    for (var property in contentString) {
        console.log(property)
        if (property != "location" && property != "_id"){
            //console.log(property)
            elm.innerHTML += '<tr class ="trInfoWindow"><th>'+property + '</th><td>' + contentString[property]+'</td></tr>';
        }
    }
    return elm;

}
*/
function calculateRoute(origin, destination) {
    var deferred = $.Deferred();
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            //directionsDisplay.setDirections(response);
            //console.log(response);
            //console.log(response.routes[0].legs[0].distance.text,response.routes[0].legs[0].duration.text);
            //deferred.resolve(response.routes[0].legs[0].distance.text,response.routes[0].legs[0].duration.text);
            deferred.resolve(response);
        } else {
            deferred.reject(status);
        }
    });
    return deferred.promise();
}


function addMarker(origin,location,contentString) {
    var infowindowOpen = true;
    var output;
    var infowindow;
    var displayRoute
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
    var marker = new google.maps.Marker({
        position: { lat: latLngArray.lat, lng:latLngArray.lng},
        map: map,
        icon: ORIGINICON
    });
    markers.push(marker);
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