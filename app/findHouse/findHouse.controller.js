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
			console.log(vm.mySearch.address);
            console.log(vm.mySearch.mile);
			dataService.FindHouse(vm.mySearch.address).then(function () {
            });
		};
    }
})();

