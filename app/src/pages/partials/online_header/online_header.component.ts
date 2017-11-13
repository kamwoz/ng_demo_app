namespace app.components {

    import AuthenticationManager = app.services.AuthenticationManager;

    class OnlineHeaderComponent implements ng.IComponentOptions {
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.templateUrl = '/ng_sf_app/app/src/pages/partials/online_header/online_header.component.html';
            this.controller = OnlineHeader;
        }
    }
    class OnlineHeader {
        static $inject = ['AuthenticationManager'];

        constructor(private authenticationManager: AuthenticationManager) {
        }

        public logout() {
            this.authenticationManager.onLogOut();
        }
    }

    angular.module('myDemoApp').component('onlineHeader', new OnlineHeaderComponent());
}