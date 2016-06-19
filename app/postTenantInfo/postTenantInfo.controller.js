(function () { 
    angular
        .module('app')
        .controller('postTenantInfo.IndexController', Controller);

	function Controller($state,dataService,rentalFactory) {
        var vm = this;
        vm.PostTenantInfo = PostTenantInfo;

		function PostTenantInfo(){
			vm.house.rentalTime = rentalFactory.getRentalTime(vm.fromdt,vm.todt,vm.todtlongterm);
			if(vm.house.area !== undefined && (vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.email !== undefined){
				dataService.PostTenantInfo(vm.house).then(function (response) {
					console.log(response);
					$state.go('home',{'message':response});
				});
			}
			
		};
    }
})();