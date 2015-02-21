/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class AppConfig implements OX.AppConfig {

        public config(config:OX.ConfigEnv<OX.AppInfo>):void {

            config.development = {
                name: '<%= app_name %>',
                enableDatabase: true,
                enableRedis: false
            };

            config.production = {
                name: '<%= app_name %>',
                enableDatabase: true,
                enableRedis: false
            };

            config.test = {
                name: '<%= app_name %>',
                enableDatabase: true,
                enableRedis: false
            }

        }

        /**
         * App Specif static constants
         *
         */
        public static SECRET_KEY:String = 'SECRET-KEY-1234-ABCD';

    }

}
