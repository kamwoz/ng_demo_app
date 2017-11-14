namespace app.routing {
    class HomepageRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {

            $stateProvider
                .state('app', {
                    templateUrl: '/src/pages/homepage.html',
                    url: '/dashboard'
                });
        }
    }

    angular.module('myDemoApp').config(HomepageRouting);
}