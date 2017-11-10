((): void => {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('eqiomBeton', [
        'ui.router',
    ]).run([
        'firewall', (firewall) => {
            firewall.init();
        }]);
})();