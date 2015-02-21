/// <reference path="../OX" />

module OX {

    export class Model {
        context:RequestContext;

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

        public getDbModel(modelName:String):any {
            return this.getAppContext().getDatabase().model(modelName);
        }

        public getDb() {
            return this.getAppContext().getDatabase()
        }

        public static configure() {

        }
    }
}
