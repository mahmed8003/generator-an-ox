'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AnOxGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the bedazzling AnOx generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'app_name',
      message: 'What is your app\'s name',
      default: this.appname // Default to current folder name
    },
      {
        type: 'input',
        name: 'app_namespace',
        message: 'Enter namespace for your app',
        default: 'Sparky' // Default to current folder name
      }];

    this.prompt(prompts, function (props) {
      this.app_name = props.app_name;
      this.app_namespace = props.app_namespace;

      this.destinationRoot(this.app_name);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('application');
      this.dest.mkdir('application/config');
      this.dest.mkdir('application/controllers');
      this.dest.mkdir('application/filters');
      this.dest.mkdir('application/helpers');
      this.dest.mkdir('application/models');
      this.dest.mkdir('application/views');
      this.dest.mkdir('libraries');
      this.dest.mkdir('public');
      this.dest.mkdir('public/css');
      this.dest.mkdir('public/images');
      this.dest.mkdir('public/js');
      this.dest.mkdir('public/views');

      // copy gitkeep file
      this.src.copy('_.gitkeep', 'application/controllers/.gitkeep');
      this.src.copy('_.gitkeep', 'application/filters/.gitkeep');
      this.src.copy('_.gitkeep', 'application/helpers/.gitkeep');
      this.src.copy('_.gitkeep', 'application/models/.gitkeep');
      this.src.copy('_.gitkeep', 'application/views/.gitkeep');
      this.src.copy('_.gitkeep', 'libraries/.gitkeep');
      this.src.copy('_.gitkeep', 'public/css/.gitkeep');
      this.src.copy('_.gitkeep', 'public/images/.gitkeep');
      this.src.copy('_.gitkeep', 'public/js/.gitkeep');
      this.src.copy('_.gitkeep', 'public/views/.gitkeep');

      //
      var context = {
        app_name: this.app_name,
        name_space: this.app_namespace
      };

      // copy favicon
      this.src.copy('_favicon.ico', 'public/images/favicon.ico');

      // copy views
      this.src.copy('views/_error.ejs', 'application/views/error.ejs');
      this.src.copy('views/_footer.ejs', 'application/views/footer.ejs');
      this.src.copy('views/_header.ejs', 'application/views/header.ejs');
      this.src.copy('views/_index.ejs', 'application/views/index.ejs');


      // copy necessary files
      this.template('_package.json', 'package.json', context);
      this.template('_bower.json', 'bower.json', context);
      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_.bowerrc', '.bowerrc');
      this.src.copy('_.gitignore', '.gitignore');

      // copy readme
      this.template('_README.md', 'README.md', context);

      // main ts files
      this.template('_app.ts', 'app.ts', context);

      // ts config files
      this.template('ts/config/_DatabaseConfig.ts', 'application/config/DatabaseConfig.ts', context);
      this.template('ts/config/_ExpressConfig.ts', 'application/config/ExpressConfig.ts', context);
      this.template('ts/config/_GlobalFiltersConfig.ts', 'application/config/GlobalFiltersConfig.ts', context);
      this.template('ts/config/_LoggerConfig.ts', 'application/config/LoggerConfig.ts', context);
      this.template('ts/config/_RoutesConfig.ts', 'application/config/RoutesConfig.ts', context);

      // ts controllers file
      this.template('ts/controllers/_HomeController.ts', 'application/controllers/HomeController.ts', context);

      // ts filters files
      this.template('ts/filters/_AuthFilter.ts', 'application/filters/AuthFilter.ts', context);

      // ts models files
      this.template('ts/models/_PostModel.ts', 'application/models/PostModel.ts', context);
      this.template('ts/models/_UserModel.ts', 'application/models/UserModel.ts', context);

    },

    projectfiles: function () {

    }
  },

  end: function () {
    var self = this;
    this.installDependencies({
      callback: function () {
        this.spawnCommand('grunt', ['build_app']).on('close', function () {
          self.log(chalk.green('Ox is ready'));

          var str = 'Follow commands \'cd ' + self.app_name + '\' and then ' + '\'node ./build/app.js\' to start the server';
          self.log(chalk.green(str));
        });
      }.bind(this)
    });
  }

});

module.exports = AnOxGenerator;
