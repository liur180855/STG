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
<<<<<<< HEAD
        vm.open2 = open2;

		vm.today = function() {
		    vm.dt = new Date();
		};
		vm.dateOptions = {
		    dateDisabled: disabled,
		    formatYear: 'yy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		  };
		 function disabled(data) {
		    var date = data.date,
		      mode = data.mode;
		    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		  }

		    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 vm.format = vm.formats[0];
  vm.altInputFormats = ['M!/d!/yyyy'];
		vm.today();


	function open2() {

		console.log(vm.house.dt);
    vm.popup2.opened = true;
  };

		vm.popup2 = {
    opened: false
  };
  */


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

