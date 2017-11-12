namespace app.routing {

    class HomepageRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {
            $stateProvider
                .state('app', {
                    url: '/',
                    templateUrl: '/ng_sf_app/app/src/pages/homepage.html',
                })
            ;
        }
    }

    angular.module('myDemoApp').config(HomepageRouting);
}