namespace app.services {
    export interface IAuthorizationManager {
        isAdmin(): boolean;
        hasRole(role: string): boolean;
    }
    export class AuthorizationManager implements IAuthorizationManager {
        protected roles: Object;

        constructor(private $rootScope: ng.IRootScopeService,
                    private localStorageService: ng.local.storage.ILocalStorageService) {
            this.roles = this.getRoles();

            $rootScope.isAdmin = () => this.isAdmin();
        }

        protected getRoles() {
            return this.localStorageService.get('roles');
        }

        public hasRole(role: string) {
            let hasRole = false;
            if (angular.isArray(this.roles)) {
                (<string[]>this.roles).forEach(function (element) {
                    if (element === role) {
                        hasRole = true;
                    }
                });
            }

            return hasRole;
        }

        protected setRoles(rolesData) {
            this.localStorageService.set('roles', rolesData);
            this.roles = this.getRoles();
        }

        public isAdmin() {
            return this.hasRole('ROLE_ADMIN');
        }

        public static Factory() {
            let factory = ($rootScope, localStorageService) => {
                return new AuthorizationManager($rootScope, localStorageService);
            };

            factory['$inject'] = ['$rootScope', 'localStorageService'];

            return factory;
        }
    }

    angular.module('myDemoApp').factory('authorizationManager', AuthorizationManager.Factory());
}