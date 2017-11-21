namespace app.services {
    import IHttpParamSerializer = angular.IHttpParamSerializer;

    export class FolderService {
        static $inject = ['globalParams', '$http', '$httpParamSerializerJQLike'];

        constructor(protected globalParams: IGlobalParams,
                    protected $http: ng.IHttpService,
                    protected $httpParamSerializerJQLike: IHttpParamSerializer) {}

        public updateStructure(formData): ng.IPromise<any> {
            return this.$http.post(`${this.globalParams.API}/api/folder`, formData)
                .then((response) => response.data);
        }

        public getFolderStructure(): ng.IPromise<any> {
            return this.$http.get(`${this.globalParams.API}/api/folder`)
                .then((response: any) => JSON.parse(response.data));
        }
    }

    angular.module('myDemoApp').service('FolderService', FolderService);
}