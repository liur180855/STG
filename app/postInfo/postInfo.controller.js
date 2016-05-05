(function () { 
    angular
        .module('app')
        .controller('postInfo.controller', Controller);


	function Controller(dataService) {
        var vm = this;
        vm.user = null;
        vm.refresh = refresh;
        vm.postInfo = postInfo

		function refresh() {
            // get current user
            console.log("refresh");
            dataService.GetAll().then(function (user) {
                vm = user;
            });
        }
		refresh();
		function postInfo(){
			console.log("post info");
			dataService.PostInfo(house).then(function (user) {
            });
		};
    }
})();
