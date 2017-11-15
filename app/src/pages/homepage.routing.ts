namespace app.routing {
    import FolderService = app.services.FolderService;

    class HomepageRouting {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: ng.ui.IStateProvider) {

            $stateProvider
                .state('app', {
                    templateUrl: '/src/pages/homepage.html',
                    url: '/dashboard',
                    resolve: {
                        folderStructure: ['FolderService', (folderService: FolderService) => {
                            return folderService.getFolderStructure();
                        }]
                    },
                    controller: ['$scope', 'folderStructure', ($scope: ng.IScope, folderStructure) => {
                        $scope.folderStructure = folderStructure !== null ? folderStructure.folders : [];
                    }]
                });
        }
    }

    angular.module('myDemoApp').config(HomepageRouting);
}