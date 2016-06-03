(function () { 
    angular
        .module('app')
        .controller('displayServerMessage.IndexController', Controller);

	function Controller(dataService,$state) {
        var vm = this;
		
		vm.PostTenantInfo = PostTenantInfo;

		function PostTenantInfo(){
			console.log("working in postTenant");
			$state.go('home');
		};
	}
})();