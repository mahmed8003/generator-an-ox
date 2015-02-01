module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-bower-install-simple");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-webpack');

  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({

    'bower-install-simple': {
      options: {
        color: true,
        directory: 'public/vendor',
        forceLatest: true
      },
      prod: {
        options: {
          production: true
        }
      },
      dev: {
        options: {
          production: false
        }
      }
    },

    webpack: {
      options: webpackConfig,
      prod: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      dev: {
        devtool: "sourcemap",
        debug: true
      }
    },

    subgrunt: {
      ox_build: {
        options: {
          npmClean: true
        },
        projects: {
          'node_modules/an-ox': 'build_framework'
        }
      }
    },

    typescript: {
      compile_app: {
        src: ['./app.ts', './application/**/*.ts'],
        dest: './build/app.js',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es
          basePath: './src',
          sourceMap: false,
          declaration: true,
          comments: false,
          references: [
            "./libraries/*.d.ts"
          ]
        }
      }
    },

    file_append: {
      import_framework: {
        files: {
          'build/app.js': {
            prepend: "var OX = require('an-ox');\n\n"
          }
        }
      }
    }
  });

  grunt.registerTask(
    'bower',
    'Installs bower components in vendor folder -Dev',
    ['bower-install-simple:dev']
  );

  grunt.registerTask(
    'bower-p',
    'Installs bower components in vendor folder -Prod',
    ['bower-install-simple:prod']
  );


  grunt.registerTask(
    'build_framework',
    'Compiles all of the OX framework files and copy it to build directory.',
    ['subgrunt:ox_build']
  );

  grunt.registerTask(
    'bsa',
    'Build Server App (bsa): Compiles all of typescript server app files and copy it to build directory.',
    ['typescript:compile_app', 'file_append:import_framework']
  );

  grunt.registerTask(
    'bca',
    'Build Client App (bca): Compiles all of client side files and bower components -Dev',
    ['webpack:dev']
  );

  grunt.registerTask(
    'bca-p',
    'Build Client App (bca): Compiles all of client side files and bower components -Prod',
    ['webpack:prod']
  );


  grunt.registerTask(
    'deploy',
    'Installs bower components, compiles framework, compiles server app, compile clients app for production env',
    ['bower-p', 'build_framework', 'bsa', 'bca-p']
  );


  grunt.registerTask(
    'default',
    'Builds server side app and client side app',
    ['bsa', 'bca']
  );
};
