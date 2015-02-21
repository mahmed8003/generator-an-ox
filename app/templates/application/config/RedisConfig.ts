/// <reference path="../../app.ts" />

module <%= app_namespace %> {

    export class RedisConfig implements OX.RedisConfig {

        public config(config:OX.ConfigEnv<OX.RedisInfo>):void {

            config.development = {
                port: 6379,
                host: '127.0.0.1'
            };

            config.production = {
                port: 6379,
                host: '127.0.0.1'
            };

            config.test = {
                port: 6379,
                host: '127.0.0.1'
            }

        }


    }

}
