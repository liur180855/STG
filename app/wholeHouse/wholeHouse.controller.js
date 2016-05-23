(function () { 
    angular
        .module('app')
        .controller('wholeHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.postInfo = postInfo

		function postInfo(){
			console.log("post info");
			
			console.log(vm.house.address);
			console.log(vm.house.maleRoommate);
			console.log(vm.house.femaleRoommate);
			console.log(vm.house.privShareBath);
			if(vm.house.address !== undefined && vm.house.price !== undefined){
				dataService.PostInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();
