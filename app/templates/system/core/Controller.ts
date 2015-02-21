/// <reference path="../OX" />

module OX {

    export class Controller {
        static isConfigured:boolean = false;
        private context:RequestContext;

        public static configure() {
        }


        public setup(context:RequestContext) {
            this.context = context;
        }

        public init():void {

        }

        public getContext():RequestContext {
            return this.context;
        }

        public getAppContext():AppContext {
            return this.context.getAppContext();
        }

        public getModel(model:typeof Model):Model {
            return this.context.getModel(model);
        }
    }
}
