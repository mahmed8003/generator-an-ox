/// <reference path="../../app.ts" />

module <%= name_space %> {

    export class LoggerConfig implements OX.LoggerConfig {

        public config(loggerInfo:OX.EnvLoggerInfo):void {
            loggerInfo.development = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            };

            loggerInfo.test = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            };

            loggerInfo.production = {
                transports: [new OX.ConsoleTransport({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                })],
                exitOnError: true
            }
        }
    }
}
