namespace app.controllers {
    class LoginController implements ng.IController {
        static $inject = ['$scope'];

        constructor($scope: ng.IScope) {
            $scope.logIn = () => this.logIn();
        }

        private logIn() {

        }
    }

    angular.module('myDemoApp').controller(LoginController);
}