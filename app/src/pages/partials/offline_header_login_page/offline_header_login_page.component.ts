namespace app.components {
    class OfflineHeaderLoginPageComponent implements ng.IComponentOptions {
        templateUrl = '/pages/partials/offline_header_login_page/offline_header_login_page.component.html';
    }

    angular.module('myDemoApp').component('offlineHeaderLoginPage', new OfflineHeaderLoginPageComponent());
}