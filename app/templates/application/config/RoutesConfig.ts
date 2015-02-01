/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class RoutesConfig implements OX.RoutesConfig {

        public config(router:OX.Router):void {

            //router.addGlobalFilters([AuthFilter]);

            router.get({path:'/api', controller:HomeController, action:'index', filters:[AuthFilter]});
        }
    }
}
