(function () { 
    angular
        .module('app')
        .controller('singleHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.postInfo = postInfo

		function postInfo(){
			console.log("post info");
			
			if(vm.house.address !== undefined && vm.house.price !== undefined){
				dataService.PostHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();
