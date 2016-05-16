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
            if (vm.mySearch.address1 === undefined && vm.mySearch.address2 === undefined && vm.mySearch.address3 === undefined){
                alert("enter something");
            } else {
                if (vm.mySearch.address1 !== undefined && Boolean(vm.mySearch.address1)){
					addressArray.push({"address":vm.mySearch.address1,"radius":vm.mySearch.mile1});
                }
                if (vm.mySearch.address2 !== undefined && Boolean(vm.mySearch.address2)){
					addressArray.push({"address":vm.mySearch.address2,"radius":vm.mySearch.mile2});
                }
                if (vm.mySearch.address3 !== undefined && Boolean(vm.mySearch.address3)){
					addressArray.push({"address":vm.mySearch.address3,"radius":vm.mySearch.mile3});
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

*/

				console.log(addressArray);
				getAllGeocodeThenAddCircle(addressArray);
				dataService.FindHouse(addressArray).then(function () {
                });

                


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

