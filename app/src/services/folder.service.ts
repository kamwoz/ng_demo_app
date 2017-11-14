namespace app.services {

    export class FolderService {
        static $inject = ['globalParams', '$http', '$httpParamSerializerJQLike'];

        constructor(protected globalParams: IGlobalParams,
                    protected $http: ng.IHttpService,
                    protected $httpParamSerializerJQLike) {}

        public updateStructure(formData): ng.IPromise<any> {
            return this.$http.put(`${this.globalParams.API}/api/folder`, formData)
                .then((response) => response.data);
        }
    }

    angular.module('myDemoApp').service('FolderService', FolderService);
}