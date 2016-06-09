(function () { 
    angular
        .module('app')
        .controller('singleHouse.IndexController', Controller);

	function Controller(dataService) {
        var vm = this;
        vm.postInfo = postInfo;
        vm.longtermEnable = longtermEnable;
		
		
		$(function() {
			$(".fromdt").datepicker({
				
				onSelect: function(dateText, inst) {
					
					vm.fromdt =dateText;
				}
			});
		});
		
		$(function() {
			$(".todt").datepicker({
				
				onSelect: function(dateText, inst) {
					
					vm.todt =dateText;
				}
			});
		});
		
        function longtermEnable(){
        	var x = document.getElementById("todt.todtenable");
        	if (vm.todtlongterm==true){
        		x.setAttribute("disabled", "disabled");
				
        	}else{
				x.removeAttribute("disabled");
        	}
        }
        /*
		vm.longtermEnable = longtermEnable;
        function longtermEnable(){
        	var x = document.getElementById("todt.todtenable");
        	if (vm.todtlongterm==true){
        		x.setAttribute("disabled", "disabled");
				
        	}else{
				x.removeAttribute("disabled");
        	}
        }
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
			
			console.log(vm.fromdt);
			console.log(vm.todt);
			console.log("post info");
			console.log(vm.house);
			vm.house.rentalTime = getRentalTime(vm.fromdt,vm.todt,vm.todtlongterm);
			console.log(vm.house.rentalTime );
			if((vm.todt !== undefined ||vm.todtlongterm)&& vm.fromdt !== undefined && vm.house.address !== undefined && vm.house.price !== undefined){

				
				dataService.PostHouseInfo(vm.house).then(function () {
				
				});
			}
		};
    }
})();
