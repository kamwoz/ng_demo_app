namespace app.routing {
    import AuthenticationManager = app.services.AuthenticationManager;

    class BaseRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {

            $stateProvider
                .state('not-authorized', {
                    templateUrl: '/src/pages/base/not_authorized.html',
                    controller: ['$window', '$scope', ($window, $scope) => {
                        $scope.refresh = () => $window.history.back();
                    }]
                })


                .state('main-redirect', {
                    url: '/',
                    controller: ['AuthenticationManager', '$state',
                        (authenticationManager: AuthenticationManager,
                         $state) => {
                            if (authenticationManager.isAuthed()) {
                                $state.go('app');
                            } else {
                                $state.go('offline');
                            }
                        }]
                })
                // this route have to be last on the list
                .state('not-found', {
                    url: '*path',
                    templateUrl: '/src/pages/base/not_found.html'
                });
        }
    }

    angular.module('myDemoApp').config(BaseRouting);
}