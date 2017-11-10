((): void => {
    angular.module('myDemoApp').config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('offline', {
                url: '/login',
                templateUrl: '/src/pages/login/login.html',
            });
    }]);
})();