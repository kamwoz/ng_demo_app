namespace app.services {

    import RegisterModel = app.controllers.RegisterModel;

    export class RegisterService {
        static $inject = ['globalParams', '$http', '$httpParamSerializerJQLike'];

        constructor(protected globalParams: IGlobalParams,
                    protected $http: ng.IHttpService,
                    protected $httpParamSerializerJQLike) {}

        public postRegister(formData: RegisterModel): ng.IPromise<any> {
            let pass = formData.plainPassword;
            let payload: any = formData;
            payload.plainPassword = {
                first: pass,
                second: pass
            };

            return this.$http.post(`${this.globalParams.API}/api/register`, payload)
                .then((response) => response.data);
        }
    }

    angular.module('myDemoApp').service('RegisterService', RegisterService);
}