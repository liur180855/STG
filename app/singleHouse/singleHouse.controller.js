(function () { 
    angular
        .module('app')
        .controller('singleHouse.IndexController', Controller);

	function Controller(dataService,rentalFactory) {
        var vm = this;
        vm.postInfo = postInfo;
        /*
        vm.longtermEnable = longtermEnable(vm.todtlongterm,vm.todt);
		

		function longtermEnable(longterm,todt){
        	var todtenable = document.getElementById(todt);
        	if (longterm==true){
        		todtenable.setAttribute("disabled", "disabled");
				
        	}else{
				todtenable.removeAttribute("disabled");
        	}
        }
		
*/
		console.log(LANGUAGEOPTION.findHouse[0]);
		function postInfo(){
			
			vm.house.rentalTime = rentalFactory.getRentalTime(vm.fromdt,vm.todt,vm.todtlongterm);
			console.log(vm.house.rentalTime);
			if((vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.address !== undefined && vm.house.price !== undefined){

				
				dataService.PostHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();

