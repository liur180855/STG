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
		service.verifyInfo = verifyInfo;
		service.delTenantInfo = delTenantInfo;
		service.delHouseInfo = delHouseInfo;
		//GetAll();
        return service;

		function verifyInfo(verificationCode) {
			console.log("verifyInfo");
            return $http.get('/verifyInfo?verificationCode='+verificationCode).then(handleSuccess, handleError);
        }

		function delTenantInfo(verificationCode) {
			console.log("delTenantInfo");
            return $http.get('/delTenantInfo?verificationCode='+verificationCode).then(handleSuccess, handleError);
        }

		function delHouseInfo(verificationCode) {
			console.log("delHouseInfo");
            return $http.get('/delHouseInfo?verificationCode='+verificationCode).then(handleSuccess, handleError);
        }

        function GetAll() {
			console.log("GetAll");
            return $http.get('/getAllHousing').then(handleSuccess, handleError);
        }

		function GetTenantInfo() {
			console.log("getTenantInfo");
            return $http.get('/getTenantInfo').then(handleSuccess, handleError);
        }
		
        function FindHouse(callback) {
			console.log("FindHouse");
			//return $http.get('/findHouse',addressArray).then(handleSuccess, handleError);
			/*
			return $http.get('/findHouse',{
        	params: {
	            addressArray: addressArray
	        }
    	}).then(handleSuccess, handleError);

    		*/
    		return $http.get('/findHouse').then(handleSuccess, handleError);
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