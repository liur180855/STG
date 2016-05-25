(function () { 
    angular
        .module('app')
        .controller('findHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        //vm.house = null;
		//vm.houselist;
        vm.searchInfo = searchInfo

		function searchInfo(){
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
                deleteMarkers();
                getGeocodePromise(addressArray[0]).then(addCircle).then(findHouseRequest);

                function findHouseRequest(addressArray){
                    dataService.FindHouse(addressArray).then(function (doc) {
                        for (var i = 0; i < doc.length; i++) {
                            console.log(doc[i].location);
                            addMarker(doc[i].location,"shit");
                        }
                        console.log(doc);
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
    }
})();

