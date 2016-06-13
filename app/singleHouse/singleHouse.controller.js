(function () { 
    angular
        .module('app')
        .controller('singleHouse.IndexController', Controller);

	function Controller(dataService,rentalFactory) {
        var vm = this;
        vm.postInfo = postInfo;
		
		


		function postInfo(){
			console.log(vm.house.roommateGender);
			vm.house.rentalTime = rentalFactory.getRentalTime(vm.fromdt,vm.todt,vm.todtlongterm);
			console.log(vm.house.rentalTime);
			if((vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.address !== undefined && vm.house.price !== undefined){

				
				dataService.PostHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();

