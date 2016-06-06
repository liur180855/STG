(function () { 
    angular
        .module('app')
        .controller('wholeHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.postInfo = postInfo
        vm.longtermEnable = longtermEnable;
        function longtermEnable(){
        	var x = document.getElementById("todt.todtenable");
        	if (vm.todtlongterm==true){
        		x.setAttribute("disabled", "disabled");
				
        	}else{
				x.removeAttribute("disabled");
        	}
        }

		function convertDate(date){

			var dateString=new Date(date).toUTCString();
			dateString=dateString.split(' ').slice(1, 4).join(' ');
			return dateString
  		}
  		function getRentalTime(from,to,longterm){
  			if (longterm){
  				return "longterm lease starting from " + from;
  			}else{
  				return "from " + from + " to " + to;
  			}
  			

  		}

		function postInfo(){
			console.log("post info");
			
			if((vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.address !== undefined && vm.house.price !== undefined){
				vm.house.rentalTime = getRentalTime(convertDate(vm.fromdt),convertDate(vm.todt),vm.todtlongterm)
				console.log(vm.house);
				vm.house.rentalTime = getRentalTime(convertDate(vm.fromdt),convertDate(vm.todt),vm.todtlongterm)
			
				dataService.PostHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();
