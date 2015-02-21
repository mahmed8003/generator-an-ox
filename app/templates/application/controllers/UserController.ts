/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class UserController extends OX.Controller {

        public static configure() {

        }

        public init():void {

        }


        public signUp(req:OX.Request, res:OX.Response) {

            var MD5:any = require('MD5');
            var userModel:UserModel = <UserModel>this.getModel(UserModel);

            var form:any = UserSchemaHelper.validateSignUpRequestData(req.body);

            if (!form.valid) {
                res.status(400).send(ResponseHelper.missingParamsErrorResponse(form.errors));
            } else {
                form.data.password = MD5(form.data.password);
                userModel.getUserByEmail(form.data.email, function (err, data) {
                    if (err) {
                        res.status(400).send(ResponseHelper.databaseErrorResponse(err));
                    } else if (data) {
                        return res.status(400).send(ResponseHelper.errorResponse(4001, 'Dublication Error', 'Email already exists, please choose other email.'));
                    } else {
                        userModel.signUp(form.data, function (err, data) {
                            if (err) {
                                res.status(400).send(ResponseHelper.databaseErrorResponse(err));
                            } else {
                                res.send(ResponseHelper.successResponse(data));
                            }
                        });
                    }
                });
            }
        }


        public authenticate(req:OX.Request, res:OX.Response) {
            var jwt:any = require('jwt-simple');
            var moment:any = require('moment');
            var MD5:any = require('MD5');

            var form:any = UserSchemaHelper.validateAuthenticationRequestData(req.body);

            if (!form.valid) {
                res.status(400).send(ResponseHelper.missingParamsErrorResponse(form.errors));
            } else {
                var email = form.data.email;
                var password = form.data.password;

                var userModel:UserModel = <UserModel>this.getModel(UserModel);
                userModel.getUserByEmail(email, function (err, user) {
                    if (err) {
                        res.status(401).send(ResponseHelper.databaseErrorResponse(err));
                    } else if (!user) {
                        res.status(401).send(ResponseHelper.errorResponse(4001, 'Authentication Error', 'User not exists'));
                    } else {
                        password = MD5(password);
                        if (user.password != password) {
                            res.status(401).send(ResponseHelper.errorResponse(4001, 'Authentication Error', 'Password is incorrect'));
                        } else {
                            var expires = moment().add(2, 'days');
                            var token = jwt.encode({
                                    uid: user.id,
                                    exp: expires
                                },
                                AppConfig.SECRET_KEY);

                            var loginData:any = form.data;
                            loginData.ip = req.ip;
                            loginData.auth_token = token;

                            userModel.updateLoginHistory(user.id, loginData, function (err, data) {
                                if (err) {
                                    OX.Log.info(err);
                                }
                            });

                            var data = user.toJSON();
                            data.auth_token = token;
                            data.token_expiry = expires;

                            res.json(ResponseHelper.successResponse(data));
                        }
                    }
                });
            }

        }
    }
}
