namespace app.routing {

    class RegisterRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {
            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: '/ng_sf_app/app/src/pages/register/register.html',
                    controller: 'RegisterController'
                });
        }
    }

    angular.module('myDemoApp').config(RegisterRouting);
}