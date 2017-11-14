namespace app.components {
    class FolderTreeComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/folder_tree/folder_tree.component.html';
        controller = FolderTreeController;
    }

    export interface IFolderTree {
        name: string;
        childrens: IFolderTree[];
    }

    export class FolderTreeController {
        static $inject = ['$scope'];
        folders: IFolderTree[];

        constructor($scope: ng.IScope) {
            $scope.folders = this.folders = [
                {
                    name: 'test name', childrens: []
                }
            ];
        }

        public addFolder() {
            let folder: IFolderTree = {name: '', childrens: []};
            this.folders.push(folder);
        }
    }

    angular.module('myDemoApp').component('folderTree', new FolderTreeComponent());
}