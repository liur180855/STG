(function () {
 
    angular
        .module('app')
        .factory('dataService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.GetAll = GetAll;
        service.PostInfo = PostInfo;
 
        return service;
 
        function GetAll() {
            return $http.get('/api/getAllHousing').then(handleSuccess, handleError);
        }
        function PostInfo(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
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