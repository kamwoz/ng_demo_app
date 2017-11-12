namespace app.routing {

    class MainRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {
            $stateProvider
                .state('offline', {
                    url: '/login',
                    templateUrl: '/ng_sf_app/app/src/pages/login/login.html',
                });
            ;
        }
    }

    angular.module('myDemoApp').config(MainRouting);
}