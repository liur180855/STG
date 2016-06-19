var map;
var geocoder;
var circles = [];
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

}
function setMapBound(circle){
    map.fitBounds(circle.getBounds());
}

function checkMarkerInCircle(circle,location){

    var latLng = new google.maps.LatLng(location);
    return circle.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), latLng) <= circle.getRadius();

}


function setMapOnAll(emptyOut) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(emptyOut);
    }
}


// Removes the markers from the map, but keeps them in the array.


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

function calculateRoute(origin, destination) {
    var deferred = $.Deferred();
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            deferred.resolve(response);
        } else {
            deferred.reject(status);
        }
    });
    return deferred.promise();
}


function initializeDisplay(){
    directionsDisplay.setMap(null);
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );
    directionsDisplay.setOptions( {preserveViewport: true} );
}

function deleteCircles() {
    initializeDisplay();
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
    return latLngArray;
}
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
