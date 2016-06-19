(function () { 
    angular
        .module('app')
        .controller('findHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        var markers = new markerClass();
        var min = 0;
        var max = 0;
        //vm.house = null;
		//vm.houselist;
        vm.searchInfo = searchInfo;
        vm.searchToggle = searchToggle;
        
		/*console.log(vm.mySearch.address1);
		angular.element(vm.mySearch.address1).ready(function () {
			console.log("helloworld");
		});
		*/
        sliderDeclaration(min,max);
        /*
        function resetSlider() {
          var $slider = $("#slider-range");
          $slider.slider("values", 0, 0);
          $slider.slider("values", 1, 0);
        }
        resetSlider();
        */
        //$(document).on("pagecreate" ,sliderDeclaration)

        function searchToggle(){
            vm.searchForm = !vm.searchForm;
        }
        function sliderDeclaration(min,max) {
            //$( "#slider-range" ).css('background', 'rgb(0,255,0)');
            //$( "#slider-range .ui-slider-range" ).css('background', 'rgb(0,255,0)');
            $( "#slider-range" ).slider({
                range: true,
                min: min,
                max: max,
                values: [ min, max ],
                slide: function( event, ui ) {
                    
                    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                },
                change: function(event, ui) {
                    // console.log(ui.values[ 0 ]);
                    // console.log(ui.values[ 1 ]);
                    markers.hideMarkerWithPrice(ui.values[ 0 ],ui.values[ 1 ]);
                }
            });
            $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
              " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        };


		function searchInfo(){
            vm.priceRange = false;
            //directionsDisplay.setMap(null);
            sliderDeclaration(0,0);
			console.log("searchInfo");

            var addressArray = [];
            if (vm.mySearch.address1 === undefined){
                alert("enter something");
            } else {
                if (vm.mySearch.address1 !== undefined && Boolean(vm.mySearch.address1)){
					addressArray.push({"address":vm.mySearch.address1,"radius":vm.mySearch.mile1});
                }




/*
				var promise = new Promise(function(resolve, reject) {
                  resolve(1);
                });

                promise.then(function(val) {
                  console.log(val); // 1
                  return val + 2;
                }).then(function(val) {
                  console.log(val); // 3
                });



                var promise = new Promise(function(resolve, reject) {
                  resolve(getAllGeocodeThenAddCircle(addressArray));
                });

                function shitter(val) {
                  console.log(val); // 1
                  return val;
                }

                promise(addressArray).then(shitter).then(function(val) {
                  console.log(val); // 3
                });
*/              deleteCircles();
                markers.deleteMarkers();
                
                getGeocodePromise(addressArray[0]).then(addCircle).then(findHouseRequest);

                function findHouseRequest(){
                    dataService.FindHouse().then(function (doc) {
                        var origin =  new google.maps.LatLng(circles[0].getCenter().lat(), circles[0].getCenter().lng())
                        setMapBound(circles[0]);
                        markers.addOriginMarker(origin);
                        for (var i = 0; i < doc.length; i++) {
                            console.log(checkMarkerInCircle(circles[0],doc[i].location));
                            //console.log(doc[i].location);
                            //console.log(circles[0].getCenter());
                            if(checkMarkerInCircle(circles[0],doc[i].location)){
                                console.log(doc[i]);

                                markers.addMarker(origin,doc[i].location,doc[i]);
                            }
                        }
                        max = markers.findMax(max);
                        min = markers.findMin(min);
                        console.log(min);
                        console.log(max);
                        //markers.hideMarkerWithPrice(min,max);
                        //resetSlider();
                        sliderDeclaration(min,max);
                        //calculateAndDisplayRoute(origin,"2617 lawndale dr plano tx");

                        //console.log(doc);
                    });

                }
                /*
                function promise(addressArray){
                    return new Promise(function(resolve, reject) {
                        getAllGeocodeThenAddCircle(addressArray);
                        resolve();
                    });

                }
                function findHouseRequest(addressArray){
                    dataService.FindHouse(addressArray).then(function (doc) {
                        for (var i = 0; i < doc.length; i++) {
                            console.log(doc[i].location);
                            addMarker(doc[i].location,"shit");
                        }
                        console.log(doc);
                    });

                }
                promise(addressArray).then(findHouseRequest);
*/

/*
				console.log(addressArray);
				getAllGeocodeThenAddCircle(addressArray);
                function findHouseRequest(){


                }
				dataService.FindHouse(addressArray).then(function (doc) {
                    for (var i = 0; i < doc.length; i++) {
                        console.log(doc[i].location);
                        addMarker(doc[i].location,"shit");
                    }
                    console.log(doc);
                });
*/
                


            /*
                getGeocode(vm.mySearch.address1,function(location){
                    console.log("callback called! " + location.lat());
                    addCircle(location.lat(),location.lng(),vm.mySearch.mile);

                });
                addCircle(vm.mySearch.address1,vm.mySearch.mile1);
    			dataService.FindHouse(vm.mySearch).then(function () {
                });
                */
            }
		};
        //searchInfo();
    }
})();

