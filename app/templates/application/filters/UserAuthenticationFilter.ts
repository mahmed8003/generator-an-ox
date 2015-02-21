/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class UserAuthenticationFilter extends OX.ActionFilter {


        public before(context:OX.AFContext):void {
            var self = this;
            var jwt:any = require('jwt-simple');

            var token:String = context.req.header('X-Auth-Token');
            if (!token) {
                context.res.status(401).send(ResponseHelper.errorResponse(4001, 'Missing Parameters Error', 'Required headers parameters missing'));//errorResponse('Required parameters missing', 'MissingParamsError', 4001));
            } else {
                var decoded:any;
                try {
                    decoded = jwt.decode(token, AppConfig.SECRET_KEY);
                } catch (e) {
                    context.res.status(401).send(ResponseHelper.errorResponse(4001, 'Authentication Error', 'Invalid authentication token found'));
                    return; //someone have changed the token
                }

                if (decoded.exp <= Date.now()) {
                    context.res.status(401).send(ResponseHelper.errorResponse(4001, 'Authentication Error', 'Access token has expired'));
                } else {
                    var userModel:UserModel = <UserModel>this.getModel(UserModel);
                    userModel.findById(decoded.uid, function (err, user) {
                        if (err) {
                            context.res.status(401).send(ResponseHelper.databaseErrorResponse(err));
                        } else if (!user) {
                            context.res.status(401).send(ResponseHelper.errorResponse(4001, 'Authentication Error', 'User not exists'));
                        } else {
                            self.getContext().userData = {
                                user: user
                            };
                            context.next();
                        }
                    });
                }
            }
        }

        public after(context:OX.AFContext):void {

        }

    }

}
