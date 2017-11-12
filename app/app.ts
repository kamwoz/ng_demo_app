((): void => {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('myDemoApp', [
        'ui.router',
        'LocalStorageModule',
    ]).run([
        'firewall', (firewall) => {
            firewall.init();
        }]);
})();