/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class HomeController extends OX.Controller {

        public static configure() {
            this.addFilter(AuthFilter).addAction('index');
        }

        public constructor(){
            super();
        }

        public index(req:OX.Request, res:OX.Response){
            var userModel:UserModel = <UserModel>this.getModel(UserModel);
            var data = userModel.getUser();
            res.send(data);
        }
    }
}
