(function () { 
    angular
        .module('app')
        .controller('postInfo.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        //vm.house = null;
		//vm.houselist;
        vm.refresh = refresh;
        vm.postInfo = postInfo

		function refresh() {
            // get current user
            console.log("refresh");
            dataService.GetAll().then(function (houselist) {
                vm.houselist = houselist;
            });
        }
		refresh();
		function postInfo(){
			console.log("post info");
			dataService.PostInfo(vm.house).then(function () {
            });
		};
    }
})();
