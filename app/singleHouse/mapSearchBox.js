function initMap() {
	var input = document.getElementById('house.address');
    var searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        input.value = places[0].formatted_address;
        console.log (places[0].formatted_address);
    })
}