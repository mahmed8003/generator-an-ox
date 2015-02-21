/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class DatabaseConfig implements OX.DatabaseConfig {

        public config(config:OX.ConfigEnv<OX.DBInfo>):void {

            config.development = {
                host: 'localhost',
                port: 27017,
                username: '',
                password: '',
                database: 'ox_db'
            };

            config.production = {
                host: 'localhost',
                port: 27017,
                username: '',
                password: '',
                database: 'ox_db'
            };

            config.test = {
                host: 'localhost',
                port: 27017,
                username: '',
                password: '',
                database: 'ox_db'
            }
        }

        public connect(info:OX.DBInfo):any {
            var mongoose:any = require('mongoose');
            var connectionString = 'mongodb://' + info.username + ':' + info.password + '@' + info.host + ':' + info.port + '/' + info.database;
            mongoose.connect(connectionString);
            return mongoose;
        }

    }

}
