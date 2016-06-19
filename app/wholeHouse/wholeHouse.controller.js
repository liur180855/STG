(function () { 
    angular
        .module('app')
        .controller('wholeHouse.IndexController', Controller);

	function Controller($state,dataService,rentalFactory) {
        var vm = this;
        vm.postInfo = postInfo


		function postInfo(){
			//console.log("post info");
			//console.log(vm.house.roommateGender);
      		vm.house.rentalTime = rentalFactory.getRentalTime(vm.fromdt,vm.todt,vm.todtlongterm);
      		//console.log(vm.house.rentalTime);
			if((vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.address !== undefined && vm.house.price !== undefined){
				
				dataService.PostHouseInfo(vm.house).then(function (response) {
					console.log(response);
					$state.go('home',{'message':response});
				});
			}
		};
    }
})();
