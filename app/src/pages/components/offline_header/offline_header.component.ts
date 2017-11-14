namespace app.components {
    class OfflineHeaderLoginPageComponent implements ng.IComponentOptions {
        templateUrl = '/src/pages/components/offline_header/offline_header.component.html';
    }

    angular.module('myDemoApp').component('offlineHeader', new OfflineHeaderLoginPageComponent());
}