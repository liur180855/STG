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
            var circle = [];
            if (vm.mySearch.address1 === undefined && vm.mySearch.address2 === undefined && vm.mySearch.address3 === undefined){
                alert("enter something");
            } else {
                if (vm.mySearch.address1 !== undefined && Boolean(vm.mySearch.address1)){
                    getGeocode(vm.mySearch.address1,function(location){
                    console.log("callback called! " + location.lat());
                    });
                }
                if (vm.mySearch.address2 !== undefined && Boolean(vm.mySearch.address2)){
                    getGeocode(vm.mySearch.address2,function(location){
                    console.log("callback called! " + location.lat());
                    });
                }
                if (vm.mySearch.address3 !== undefined && Boolean(vm.mySearch.address3)){
                    getGeocode(vm.mySearch.address3,function(location){
                    console.log("callback called! " + location.lat());
                    });
                }

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

