/// <EXTERNAL REFERENCES>
/// <reference path="./dist/ox.d.ts" />

/// <CONFIG REFERENCES>
/// <reference path="./application/config/AppConfig.ts" />
/// <reference path="./application/config/DatabaseConfig.ts" />
/// <reference path="./application/config/ExpressConfig.ts" />
/// <reference path="./application/config/LoggerConfig.ts" />
/// <reference path="./application/config/RedisConfig.ts" />
/// <reference path="./application/config/RoutesConfig.ts" />


/// <HELPERS REFERENCES>
/// <reference path="./application/helpers/ResponseHelper.ts" />
/// <reference path="./application/helpers/UserSchemaHelper.ts" />


/// <FILTERS REFERENCES>
/// <reference path="./application/filters/UserAuthenticationFilter.ts" />

/// <MODELS REFERENCES>
/// <reference path="./application/models/UserModel.ts" />


/// <CONTROLLERS REFERENCES>
/// <reference path="./application/controllers/HomeController.ts" />
/// <reference path="./application/controllers/UserController.ts" />

module <%= app_namespace %> {

    var program:any = require('commander');
    program.version('0.0.1');
    program.option('-p, --port <port>', 'specify the port [3000]', 3000);
    program.option('-e, --env <engine>', 'specify environment (development|test|production) [development]', 'development');

    program.parse(process.argv);

    var rootPath:string = __dirname;
    var env:string = process.env.NODE_ENV || program.env;
    var port:number = process.env.PORT || program.port;


    export var app:OX.Application = new OX.Application(rootPath, env, port);
    app.setAppConfig(new AppConfig());
    app.setLoggerConfig(new LoggerConfig());
    app.setRedisConfig(new RedisConfig());
    app.setDatabaseConfig(new DatabaseConfig());
    app.setExpressConfig(new ExpressConfig());
    app.setRoutesConfig(new RoutesConfig());
    // add models here, otherwise they will not be accessible
    app.addModel(UserModel);
    // start the server
    app.giddup();

}
