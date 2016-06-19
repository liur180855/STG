(function () { 
    angular
        .module('app')
        .controller('home.IndexController', Controller);

	function Controller(dataService, $stateParams) {
        var vm = this;
        //vm.searchInfo = searchInfo;
		/*console.log(vm.mySearch.address1);
		angular.element(vm.mySearch.address1).ready(function () {
			console.log("helloworld");
		});
		*/
		var verificationCode=getParameterByName('verificationCode');
		var operation=getParameterByName('operation');
		if (verificationCode){
			if (operation == "verifyInfo"){

				dataService.verifyInfo(getParameterByName('verificationCode')).then(function (doc) {
					vm.message = doc;
					console.log("verifyInfo");
					console.log(doc);
				});
			} else if (operation == "delTenantInfo"){

				dataService.delTenantInfo(getParameterByName('verificationCode')).then(function (doc) {
					vm.message = doc;
					console.log("delTenantInfo");
					console.log(doc);
				});
			}
			else if (operation == "delHouseInfo"){

				dataService.delHouseInfo(getParameterByName('verificationCode')).then(function (doc) {
					vm.message = doc;
					console.log("delHouseInfo");
					console.log(doc);
				});
			}else{
				console.log("meow");
			}
				
		}else if($stateParams.message){
			vm.message=$stateParams.message;
		}
		

	    function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
    }
})();
