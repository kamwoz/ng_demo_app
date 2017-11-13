namespace app.services {
    export interface IAppStateOptions extends ng.ui.IStateOptions {
        referer?: string;
    }
    export interface IAppStateService extends ng.ui.IStateService {
        go(to: string, params?: {}, options?: IAppStateOptions): angular.IPromise<any>;
        go(to: ng.ui.IState, params?: {}, options?: IAppStateOptions): angular.IPromise<any>;
    }
    class Firewall {
        constructor(protected $rootScope,
                    protected $state: IAppStateService,
                    protected $window: ng.IWindowService,
                    protected globalParams: IGlobalParams,
                    protected authenticationManager: AuthenticationManager,
                    protected authorizationManager: IAuthorizationManager,
                    protected $filter) {
            this.init();
        }

        private init() {
            let that = this;
            this.$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState) => {
                let loginNeeded = true,
                    previousUrl = fromState.name !== '' ? 'http://' + that.$window.location.host + fromState.url : that.$window.location.href;

                that.globalParams.unprotected_states.forEach((route) => {
                    let regex = new RegExp('^' + that.escapeRegExp(route) + '.*');
                    if (regex.test(toState.name)) {
                        // additional local storage clear on unprotected paths
                        loginNeeded = false;
                    }
                });

                if (loginNeeded) {
                    if (!that.authenticationManager.isAuthed()) {
                        event.preventDefault();

                        // save referer to
                        that.$state.go('offline', {}, {
                            location: 'replace',
                            referer: previousUrl
                        });
                    } else {
                        // check if user has access to see this page
                        let paths = that.globalParams.protected_states;
                        for (let path in paths) {
                            let regex = new RegExp('^' + that.escapeRegExp(path) + '.*');

                            if (regex.test(toState.name)) {
                                let roles = paths[path].roles,
                                    // tells if roles should be treated as AND or OR
                                    operator = paths[path].operator;

                                let accessGranted = that.authorizationManager.hasRole(roles[0]);
                                for (let i = 1; i < roles.length; i++) {
                                    let hasRole = that.authorizationManager.hasRole(roles[i]);

                                    if (operator === 'AND') {
                                        accessGranted = accessGranted && hasRole;
                                    } else {
                                        accessGranted = accessGranted || hasRole;
                                    }
                                }

                                if (!accessGranted) {
                                    event.preventDefault();
                                    that.$state.go('not-authorized', {}, {location: 'replace'});
                                    break;
                                }
                            }
                        }
                    }
                }
            });

            // handling state not found
            this.$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.log(event, toState, toParams, fromState, fromParams, error);
            });
        }

        private escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        public static Factory() {
            let factory = ($rootScope, $state, $window, globalParams, authenticationManager, authorizationManager, $filter) => {
                return new Firewall($rootScope, $state, $window, globalParams, authenticationManager, authorizationManager, $filter);
            };

            factory['$inject'] = ['$rootScope', '$state', '$window', 'globalParams', 'AuthenticationManager', 'AuthorizationManager', '$filter'];

            return factory;
        }
    }
    angular.module('myDemoApp').factory('firewall', Firewall.Factory());
}
