namespace app.components {
    class FolderNodeComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/folder_tree/folder_node/folder_node.component.html';
        controller = FolderNodeController;
        bindings = {
            folder: '='
        };
    }

    interface IFolderAllowedExtensions {
        pdf: boolean;
        video: boolean;
        photo: boolean;
        audio: boolean;
        spreadsheet: boolean;
        doc: boolean;
    }

    export class FolderNodeController {
        static $inject = ['$scope'];
        public folder: IFolderTree;
        public folderAllowedExtensions: IFolderAllowedExtensions;

        constructor(protected $scope: ng.IScope) {
            $scope.folder = this.folder;
            this.folderAllowedExtensions = {};
        }

        public addFolder() {
            let folder: IFolderTree = { name: '', childrens: [] };
            this.folder.childrens.push(folder);
        }

        public removeFolder() {
            const removeFolder = (folder, arrayIndex, foldersArray) => {
                if (folder.$$hashKey === this.folder.$$hashKey) {
                    foldersArray.splice(arrayIndex, 1);
                }
            };

            // remove this element from parent array to perform self destruction
            let folder = this.$scope.$parent.$parent.folder;
            if (!angular.isUndefined(folder)) {
                angular.forEach(folder.childrens, (children, index) => {
                    removeFolder(children, index, folder.childrens);
                });
            } else {
                // otherwise its top level folders array
                let folders = this.$scope.$parent.$parent.folders;
                angular.forEach(folders, (folder, index) => {
                    removeFolder(folder, index, folders);
                });
            }
        }
    }

    angular.module('myDemoApp').component('folderNode', new FolderNodeComponent());
}