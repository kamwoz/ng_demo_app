((): void => {
    angular.module('myDemoApp').config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('offline', {
                url: '/login',
                templateUrl: '/ng_sf_app/app/src/pages/login/login.html',
            });
    }]);
})();