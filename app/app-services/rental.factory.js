(function () {
 
    angular
        .module('app')
        .factory('rentalFactory', Service);

	function Service() {
        var service = {};
		
		service.getRentalTime = getRentalTime;

		return service;


		

		function getRentalTime(from,to,longterm){
  			if (longterm){
  				return "longterm lease starting from " + from;
  			}else{
  				return "from " + from + " to " + to;
  			}
  			

  		}
	}

})();