function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
	    center: {lat: 32.9783403, lng: -96.7680352},
	    zoom: 16
    });
/*
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: { lat: 33.046844, lng: -96.7437437 },
        radius: 100
    });
*/
}

$('.dropdown-menu a').on('click', function(){    
    $('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');    
})