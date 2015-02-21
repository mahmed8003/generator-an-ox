/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class RoutesConfig implements OX.RoutesConfig {

        public config(router:OX.Router):void {

            //router.addGlobalFilters([AuthFilter]);

            /**
             * Home controller methods
             */
            router.get({path:'/home', controller:HomeController, action:'home'});
            router.get({path:'/api/home', controller:HomeController, action:'apiHome', filters:[UserAuthenticationFilter]});


            /**
             * User controllers methods
             */
            router.post({path:'/api/user/signup', controller:UserController, action:'signUp'});
            router.post({path:'/api/user/authenticate', controller:UserController, action:'authenticate'});

        }
    }
}
