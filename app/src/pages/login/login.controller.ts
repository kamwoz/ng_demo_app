namespace app.controllers {
    export class LoginController {
        static $inject = ['$scope'];

        constructor($scope: ng.IScope) {
            $scope.logIn = () => this.logIn();
        }

        logIn() {

        }
    }

    angular.module('myDemoApp').controller('LoginController', <any>LoginController);
}