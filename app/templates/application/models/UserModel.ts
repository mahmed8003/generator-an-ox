/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class UserModel extends OX.Model {


        public static configure() {
            this.makeSchemaForModel();
        }

        public static makeSchemaForModel() {
            var mongoose:any = require('mongoose');
            var Schema:any = mongoose.Schema;

            var loginSchema = new Schema({
                os: {type: String, default: 'unknown', enum: ['android', 'ios', 'windows', 'osx', 'unknown']},
                hardware: {type: String, default: 'unknown'},
                reg_id: {type: String, default: null},
                receive_notifications: {type: Boolean, default: true},
                location: {type: [Number]},
                login_at: {type: Date, default: Date.now},
                ip: {type: String, default: null, required: true},
                auth_token: {type: String, default: null, required: true}
            });

            var roleSchema = new Schema({
                title: {type: String, trim: true, required: true},
                permissions: [{
                    type: String,
                    trim: true,
                    enum: ['can_view', 'can_add', 'can_edit', 'can_delete'],
                    required: true
                }],
                business: {type: Schema.Types.ObjectId, ref: 'Business', required: true}
            });

            var userSchema = new Schema({
                name: {type: String, trim: true, default: null, required: true},
                gender: {type: String, trim: true, default: 'male', enum: ['male', 'female']},
                email: {type: String, trim: true, required: true, index: true},
                password: {type: String, required: true},
                picture_path: {type: String, trim: true, default: null},
                service_type: {type: String, required: true, enum: ['feed_backing', 'order_taking']},
                created_at: {type: Date, default: Date.now},
                updated_at: {type: Date, default: Date.now},
                created_by: {type: Schema.Types.ObjectId, ref: 'User'},
                admin: {type: Schema.Types.ObjectId, ref: 'User'},
                roles: [roleSchema],
                login_history: [loginSchema],
                default_business: {type: Schema.Types.ObjectId, ref: 'Business'}
            });

            mongoose.model('User', userSchema);
            OX.Log.info('UserModel => makeSchemaForModel');
        }


        public findById(id:String, cb:Function):void {
            var User = this.getDbModel('User');
            User.findById(id, cb);
        }


        public updateLoginHistory(id:String, data:String, cb:Function):void {
            var User = this.getDbModel('User');
            User.findById(id, function (err, user) {
                if (err) {
                    cb(err);
                } else {
                    if (user.login_history.length > 3) {
                        user.login_history.shift();
                    }
                    user.login_history.push(data);
                    user.save(cb);
                }
            });
        }


        public signUp(parameters:any, cb:Function):any {
            var User = this.getDbModel('User');
            User.create(parameters, cb);
        }


        public getUserByEmail(email:String, cb:Function):any {
            var User = this.getDbModel('User');
            User.findOne({email: email})
                .select('-login_history')
                .exec(cb);
        }


        public signIn(email:String, password:String, cb:Function):any {
            var User:any = this.getDbModel('User');
            User.findOne({email: email, password: password}, cb);
        }


        public updateDefaultBusiness(business:String, cb:Function):any {
            var User = this.getDbModel('User');
            var userData = this.getContext().userData.user;
            User.update({'_id': userData.id}, {default_business: business}, cb);
        }


    }
}
