namespace app.controllers {
    import IController = angular.IController;

    interface RegisterModel {
        email?: string;
        password?: string;
        firstname?: string;
        lastname?: string;
    }

    interface RegisterScope extends ng.IScope {
        register();
        user: RegisterModel;
    }

    export class RegisterController {
        static $inject = ['$scope'];

        constructor($scope: RegisterScope) {
            $scope.user = {};
            $scope.register = () => this.register();
        }

        register() {

        }
    }

    angular.module('myDemoApp').controller('RegisterController', <any>RegisterController);
}