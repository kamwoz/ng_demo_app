namespace app.components {
    class FolderNodeComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/folder_tree/folder_node/folder_node.component.html';
        controller = <any>FolderNodeController;
        bindings = {
            folder: '='
        };
    }

    export class FolderNodeController {
        static $inject = ['$scope'];
        public folder: IFolderTree;

        constructor(protected $scope: ng.IScope) {
            $scope.folder = this.folder;
        }

        public addFolder() {
            let folder = { name: '', childrens: [], allowed_extensions: {}};
            this.folder.childrens.push(folder);
        }

        public validateUniqueName() {
            this.$scope.folderNameForm['folder_name'].$setValidity('uniqueName', true);
            let folder = this.$scope.$parent.$parent.folder;
            if (!angular.isUndefined(folder)) {
                angular.forEach(folder.childrens, (children) => {
                    angular.forEach(folder.childrens, (sibling) => {
                        if (children.name === sibling.name && children.$$hashKey !== sibling.$$hashKey) {
                            this.$scope.folderNameForm['folder_name'].$setValidity('uniqueName', false);
                        }
                    });
                });
            } else {
                // otherwise its top level folders array
                let folders = this.$scope.$parent.$parent.folders;
                angular.forEach(folders, (children) => {
                    angular.forEach(folders, (sibling) => {
                        if (children.name === sibling.name && children.$$hashKey !== sibling.$$hashKey) {
                            this.$scope.folderNameForm['folder_name'].$setValidity('uniqueName', false);
                        }
                    });
                });
            }
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