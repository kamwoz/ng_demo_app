((): void => {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('myDemoApp', [
        'ui.router',
        'LocalStorageModule',
        'ngMaterial',
    ]).run([
        'firewall', (firewall) => {
            firewall.init();
        }]);
})();