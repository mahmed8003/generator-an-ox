var concat = require("gulp-concat");
var del = require("del");
var gulp = require("gulp");
var gutil = require("gulp-util");
var insert = require("gulp-insert");
var mergeStream = require("merge-stream");
var shell = require("gulp-shell");
var ts = require("gulp-typescript");
var webpack = require("webpack");


gulp.task('build_clean', function (cb) {
    del([
        "./dist/**",
        "./public/dist/**"
    ], cb);
});


gulp.task("build_framework", function () {
    var tsResult = gulp.src(["./system/**/*.ts", "./libraries/**.ts"])
        .pipe(ts({
            removeComments: false,
            noImplicitAny: false,
            noLib: false,
            noEmitOnError: true,
            target: "ES5",
            module: "commonjs",
            sourceRoot: "./",
            declarationFiles: true,
            noExternalResolve: true,
            sortOutput: true
        }));

    var jsStream = tsResult.js
        .pipe(concat("ox.js"))
        .pipe(insert.append("module.exports = OX;")) // Appends to the contents of every file
        .pipe(gulp.dest("./dist/"));

    var dtsStream = tsResult.dts
        .pipe(concat("ox.d.ts"))
        .pipe(gulp.dest("./dist/"));

    return mergeStream(jsStream, dtsStream);
});


gulp.task("build_server_app", ["build_framework"], function () {
    var tsResult = gulp.src(["./app.ts", "./application/**/*.ts", "./libraries/**.ts", "./dist/**.ts"])
        .pipe(ts({
            removeComments: false,
            noImplicitAny: false,
            noLib: false,
            noEmitOnError: true,
            target: "ES5",
            module: "commonjs",
            sourceRoot: "./",
            declarationFiles: true,
            noExternalResolve: true,
            sortOutput: true
        }));

    var jsStream = tsResult.js
        .pipe(concat("app.js"))
        .pipe(insert.prepend("var OX = require('./ox.js')")) // Appends to the contents of every file
        .pipe(gulp.dest("./dist/"));

    return jsStream;
});


gulp.task("build_client_app", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(require('./webpack.config.js'));
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("build_client_app", err);
        gutil.log("[build_client_app]", stats.toString({
            colors: true
        }));
        callback();
    });
});


gulp.task("build_client_app_dev", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(require('./webpack.config.js'));
    myConfig.devtool = "sourcemap";
    myConfig.debug = true;

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("build_client_app_dev", err);
        gutil.log("[build_client_app_dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});


gulp.task('build', ['build_clean', 'build_server_app', 'build_client_app_dev']);


gulp.task('release', ['build_clean', 'build_server_app', 'build_client_app']);


gulp.task('start', ['build'], shell.task([
    'node ./dist/app.js'
]));
