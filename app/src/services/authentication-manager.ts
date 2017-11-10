namespace app.services {
    export interface JWTParseResult {
        exp: number;
        username: string;
        iat: number;
    }

    interface User {
        id: number;
        email: string;
        firstname: string;
        lastname: string;
    }
    export class AuthenticationManager {
        constructor(
            $rootScope: ng.IRootScopeService,
            protected $state: ng.ui.IStateService,
            protected $window: ng.IWindowService,
            protected localStorageService: ng.local.storage.ILocalStorageService,
            protected $http: ng.IHttpService,
            protected authorizationManager: AuthorizationManager,
        ) {
            $rootScope.isAuthed = () => this.isAuthed();
            this.setDefaults();
        }

        getToken(): string {
            return <string>this.localStorageService.get('auth');
        }

        setDefaults() {
            if (this.getToken()) {
                let commonHeaders = <ng.IHttpRequestConfigApiCommonHeaders>this.$http.defaults.headers.common;

                commonHeaders.Authorization = 'Bearer ' + this.getToken();
            }
        }

        isAuthed() {
            let token = this.getToken();
            if (token) {
                let params = this.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        parseJwt(token: string): JWTParseResult {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(this.$window.atob(base64));
        }

        onLogIn(response: ILoginResponse) {
            this.setToken(response.token);
            this.setUser(response.user);
            this.setDefaults();
            this.variableService.clearLocalVariables();
        }

        onLogOut() {
            if (this.isAuthed()) {
                this.clearLocalStorage();
            }

            this.$state.go('offline');
        }

        setToken(token) {
            this.localStorageService.set('auth', token);
        }

        clearLocalStorage() {
            this.localStorageService.remove('auth');
            this.localStorageService.remove('roles');
        }

        public static Factory() {
            let factory = ($rootScope, $state, $window, localStorageService, $http, authorizationManager) => {
                return new AuthenticationManager($rootScope, $state, $window, localStorageService, $http, authorizationManager);
            };

            factory['$inject'] = ['$rootScope', '$state', '$window', 'localStorageService', '$http', 'authorizationManager'];

            return factory;
        }
    }

    angular.module('myDemoApp').factory('authenticationManager', AuthenticationManager.Factory());
}