namespace app.routing {

    class LoginRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {
            $stateProvider
                .state('offline', {
                    url: '/login',
                    templateUrl: '/src/pages/login/login.html',
                    controller: 'LoginController'
                });
        }
    }

    angular.module('myDemoApp').config(LoginRouting);
}