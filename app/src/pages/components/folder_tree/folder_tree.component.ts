namespace app.components {
    import FolderService = app.services.FolderService;

    class FolderTreeComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/folder_tree/folder_tree.component.html';
        controller = <any>FolderTreeController;
    }

    export interface IFolderTree {
        name: string;
        childrens: IFolderTree[];
        allowedExtensions: IFolderAllowedExtensions;
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
        folders: IFolderTree[] = [];

        constructor(protected $scope: ng.IScope,
                    protected folderService: FolderService,
                    protected ngToast) {
            $scope.folders = this.folders;
        }

        public addFolder() {
            let folder: IFolderTree = {name: '', childrens: [], allowedExtensions: {}};
            this.folders.push(folder);
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