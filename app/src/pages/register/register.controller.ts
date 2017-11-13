namespace app.controllers {

    import RegisterService = app.services.RegisterService;

    export interface RegisterModel {
        email?: string;
        plainPassword?: string|{first: string, second: string};
        firstname?: string;
        lastname?: string;
    }

    interface RegisterScope extends ng.IScope {
        register();
        user: RegisterModel;
    }

    export class RegisterController {
        static $inject = ['$scope', 'RegisterService'];

        constructor(public $scope: RegisterScope,
                    protected registerService: RegisterService) {
            $scope.user = {};
            $scope.register = () => this.register();
        }

        register() {
            this.registerService.postRegister(this.$scope.user);
        }
    }

    angular.module('myDemoApp').controller('RegisterController', <any>RegisterController);
}