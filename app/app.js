(function () {
    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

 
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/index.html',
                controller: 'home.IndexController',
                controllerAs: 'vm',
				data: { activeTab: 'home' }
            })
            .state('findHouse', {
                url: '/findHouse',
                templateUrl: 'findHouse/index.html',
                controller: 'findHouse.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'findHouse' }
            })
            .state('postInfo', {
                url: '/postInfo',
                templateUrl: 'postInfo/index.html',
                controller: 'postInfo.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'postInfo' }
            })
            .state('singleHouse', {
                url: '/singleHouse',
                templateUrl: 'singleHouse/index.html',
                controller: 'singleHouse.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'singleHouse' }
            })
            .state('wholeHouse', {
                url: '/wholeHouse',
                templateUrl: 'wholeHouse/index.html',
                controller: 'wholeHouse.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'wholeHouse' }
            })
            .state('postTenantInfo', {
                url: '/postTenantInfo',
                templateUrl: 'postTenantInfo/index.html',
                controller: 'postTenantInfo.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'postTenantInfo' }
            })
            .state('tenantInfoPage', {
                url: '/tenantInfoPage',
                templateUrl: 'tenantInfoPage/index.html',
                controller: 'tenantInfoPage.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'tenantInfoPage' }
            })
			.state('delTenantInfo', {
                url: '/delTenantInfo',
                templateUrl: 'displayServerMessage/index.html',
                controller: 'displayServerMessage.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'displayServerMessage' }
            });
    }
	
	function run($http, $rootScope, $window) {
        
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }
	
	// manually bootstrap angular after the JWT token is retrieved from the server
	$(function () {       
        angular.bootstrap(document, ['app']);
    });
})();