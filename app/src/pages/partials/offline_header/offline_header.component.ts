namespace app.components {
    class OfflineHeaderLoginPageComponent implements ng.IComponentOptions {
        templateUrl = '/ng_sf_app/app/src/pages/partials/offline_header/offline_header.component.html';
    }

    angular.module('myDemoApp').component('offlineHeader', new OfflineHeaderLoginPageComponent());
}