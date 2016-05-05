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
                url: '/',
                template: '<h1>meow2</h1>',
				data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                template: '<h1>meow1</h1>',
				data: { activeTab: 'account' }
            })
            .state('postInfo', {
                url: '/postInfo',
                templateUrl: 'postInfo/index.html',
                controller: 'postInfo.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'postInfo' }
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