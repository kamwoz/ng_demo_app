angular.module('myDemoApp').config(['$httpProvider', function ($httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.get = {};

    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Disposition';

}]);