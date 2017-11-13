namespace app.services {
    import IHttpPromise = angular.IHttpPromise;

    export interface ILoginResponse {
        roles: string[];
        token: string;
    }

    export class LoginService {
        static $inject = ['globalParams', '$http', '$httpParamSerializerJQLike'];

        constructor(protected globalParams: IGlobalParams,
                    protected $http: ng.IHttpService,
                    protected $httpParamSerializerJQLike) {}

        public postLoginCheck(_username, _password): IHttpPromise<ILoginResponse> {
            let user = {
                _username,
                _password
            };

            return this.$http.post(`${this.globalParams.API}/api/login_check`, this.$httpParamSerializerJQLike(user),
                <ng.IRequestShortcutConfig>{
                });
        }
    }

    angular.module('myDemoApp').service('LoginService', LoginService);
}