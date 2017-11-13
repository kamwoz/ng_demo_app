namespace app.controllers {
    import LoginService = app.services.LoginService;
    import AuthenticationManager = app.services.AuthenticationManager;
    import AuthorizationManager = app.services.AuthorizationManager;

    export class LoginController {
        static $inject = ['$scope', 'LoginService', '$state', 'ngToast', 'AuthenticationManager', 'AuthorizationManager', '$window'];

        constructor(public $scope: ng.IScope,
                    protected loginService: LoginService,
                    protected $state: ng.ui.IStateService,
                    protected ngToast,
                    protected authentication: AuthenticationManager,
                    protected authorization: AuthorizationManager,
                    protected $window: ng.IWindowService) {
            $scope.logIn = () => this.logIn();
        }

        logIn() {
            this.loginService.postLoginCheck(this.$scope.user.email, this.$scope.user.password).then((response) => {
                this.authorization.setRoles(response.data.roles);
                this.authentication.onLogIn(response.data);

                this.$state.go('main-redirect');
            }, (response) => {
                this.ngToast.create({className: 'danger', content: 'Bad credentials'});
            });
        }
    }

    angular.module('myDemoApp').controller('LoginController', <any>LoginController);
}