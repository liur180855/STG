(function () {
 
    angular
        .module('app')
        .factory('dataService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.GetAll = GetAll;
        service.PostHouseInfo = PostHouseInfo;
		service.FindHouse = FindHouse;
		service.PostTenantInfo = PostTenantInfo;
		service.GetTenantInfo = GetTenantInfo;
		//GetAll();
        return service;

        function GetAll() {
			console.log("GetAll");
            return $http.get('/getAllHousing').then(handleSuccess, handleError);
        }

		function GetTenantInfo() {
			console.log("getTenantInfo");
            return $http.get('/getTenantInfo').then(handleSuccess, handleError);
        }
		
        function FindHouse(addressArray,callback) {
			console.log("FindHouse");
			console.log(addressArray);
			//return $http.get('/findHouse',addressArray).then(handleSuccess, handleError);
			return $http.get('/findHouse',{
        	params: {
	            addressArray: addressArray
	        }
    	}).then(handleSuccess, handleError);
            //return $http.post('/postInfo', house).then(handleSuccess, handleError);
        }
		
		function PostHouseInfo(house,callback) {
			console.log("PostInfo");
			console.log(house);
			return $http.post('/postHouseInfo',house).then(handleSuccess, handleError);
            //return $http.post('/postInfo', house).then(handleSuccess, handleError);
        }

		function PostTenantInfo(house,callback) {
			console.log("postTenantInfo");
			console.log(house);
			return $http.post('/postTenantInfo',house).then(handleSuccess, handleError);
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