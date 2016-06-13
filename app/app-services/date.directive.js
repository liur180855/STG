(function () {
 
    angular
        .module('app')
        .directive('datepicker', Service);

  function Service() {

    return {
      require: 'ngModel',
      link: function(scope, el, attr, ngModel) {
        $(el).datepicker({
          onSelect: function(dateText) {
            scope.$apply(function() {
              ngModel.$setViewValue(dateText);
            });
          }
        });
      }
    };

/*
    return {
        template : '<div class="form-group">'+
        '<label for="house.fromdt">fromdt</label>'+
        '<input type="text" class="fromdt form-control"  ng-model="vm.fromdt" />'+
        '</div>  '
    };

*/
		
	}

})();

