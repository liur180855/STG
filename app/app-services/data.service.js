(function () {
 
    angular
        .module('app')
        .factory('dataService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.GetAll = GetAll;
        service.PostInfo = PostInfo;
		//GetAll();
        return service;

        function GetAll() {
			console.log("GetAll");
            return $http.get('/getAllHousing').then(handleSuccess, handleError);
        }
		
        function PostInfo(house,callback) {
			console.log("PostInfo");
			console.log(house);
			return $http.post('/postInfo',house).then(handleSuccess, handleError);
            //return $http.post('/postInfo', house).then(handleSuccess, handleError);
        }

        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();