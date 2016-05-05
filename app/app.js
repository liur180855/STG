(function () {
    angular
        .module('directoryApp', ['ui.router'])
        .config(config);

 
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");
 
        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>meow2</h1>'
            })
            .state('account', {
                url: '/account',
                template: '<h1>meow1</h1>'
            })
            .state('postInfo', {
                url: '/postInfo',
                templateUrl: 'postInfo/index.html',
                controller: 'postInfo.controller',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            });
    }
 
})();