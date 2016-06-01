(function () { 
    angular
        .module('app')
        .controller('postTenantInfo.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.PostTenantInfo = PostTenantInfo;

		function PostTenantInfo(){
			if(vm.house.area !== undefined && vm.house.rentalTime !== undefined && vm.house.email !== undefined){
				dataService.PostTenantInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();