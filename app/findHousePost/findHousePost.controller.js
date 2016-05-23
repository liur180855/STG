(function () { 
    angular
        .module('app')
        .controller('findHousePost.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.postInfo = postInfo

		function postInfo(){
			if(vm.house.area !== undefined && vm.house.rentalTime !== undefined && vm.house.contactInfo !== undefined){
				dataService.PostLookingHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();
