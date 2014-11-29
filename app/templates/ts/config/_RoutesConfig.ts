/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class RoutesConfig implements OX.RoutesConfig {

        public config(router:OX.Router):void {
            router.get('/', {controller: HomeController, action: 'index'});
        }
    }
}
