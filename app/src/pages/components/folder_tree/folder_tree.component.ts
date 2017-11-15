namespace app.components {
    import FolderService = app.services.FolderService;

    class FolderTreeComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/folder_tree/folder_tree.component.html';
        controller = <any>FolderTreeController;
        bindings = {
            folders: '='
        };
    }

    export interface IFolderTree {
        name: string;
        childrens: IFolderTree[];
        allowed_extensions: IFolderAllowedExtensions;
        $$hashKey?: string; // angular internal
    }

    export interface IFolderAllowedExtensions {
        pdf?: boolean;
        video?: boolean;
        photo?: boolean;
        audio?: boolean;
        spreadsheet?: boolean;
        doc?: boolean;
    }

    export class FolderTreeController {
        static $inject = ['$scope', 'FolderService', 'ngToast'];
        folders: IFolderTree[];

        constructor(protected $scope: ng.IScope,
                    protected folderService: FolderService,
                    protected ngToast) {
            $scope.folders = this.folders;
        }

        public addFolder() {
            let folder: IFolderTree = {name: '', childrens: [], allowed_extensions: {}};
            this.folders.push(folder);
        }

        public validateStructure() {
            return this.isTreeValid(this.folders);
        }

        private isTreeValid(folders: IFolderTree[]) {
            let isTreeValid = true;

            angular.forEach(folders, (child) => {
                if (angular.isUndefined(child.name) || child.name === '') {
                    isTreeValid = false;
                }
                angular.forEach(folders, (sibling) => {
                    if (child.name === sibling.name && child.$$hashKey !== sibling.$$hashKey) {
                        isTreeValid = false;
                    }
                });
                if (child.childrens.length > 0) {
                    let result = this.isTreeValid(child.childrens);
                    if (!result) {
                        isTreeValid = result;
                    }
                }
            });

            return isTreeValid;
        }

        public updateStructure() {
            this.folderService.updateStructure(this.folders).then(
                () => this.ngToast.create('Structure updated'),
                () => this.ngToast.create({className: 'danger', content: 'Update error'})
            );
        }
    }

    angular.module('myDemoApp').component('folderTree', <any>(new FolderTreeComponent()));
}