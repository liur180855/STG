(function () { 
    angular
        .module('app')
        .controller('tenantInfoPage.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.getTenantInfo = getTenantInfo;
        //vm.postInfo = postInfo
		getTenantInfo();
		function getTenantInfo(){
			dataService.GetTenantInfo().then(function (doc) {
				vm.house = doc;
				console.log(doc);
			});
		};
    }
})();
