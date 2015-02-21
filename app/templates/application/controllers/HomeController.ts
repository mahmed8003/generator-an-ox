/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class HomeController extends OX.Controller {

        public static configure() {

        }

        public constructor() {
            super();
        }

        public home(req:OX.Request, res:OX.Response) {
            res.render('index', {title: 'OX'});
        }

        public apiHome(req:OX.Request, res:OX.Response) {
            res.send({status: 'success', message: 'Hello world'});
        }
    }
}
