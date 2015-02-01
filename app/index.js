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
      this.dest.mkdir('public/app');
      this.dest.mkdir('public/app/collections');
      this.dest.mkdir('public/app/controllers');
      this.dest.mkdir('public/app/models');
      this.dest.mkdir('public/app/routers');
      this.dest.mkdir('public/app/templates');
      this.dest.mkdir('public/app/views');
      this.dest.mkdir('public/app/views/collection');
      this.dest.mkdir('public/app/views/composite');
      this.dest.mkdir('public/app/views/item');
      this.dest.mkdir('public/app/views/layout');
      this.dest.mkdir('public/css');
      this.dest.mkdir('public/images');
      this.dest.mkdir('public/js');

      // copy gitkeep file
      this.src.copy('_.gitkeep', 'application/controllers/.gitkeep');
      this.src.copy('_.gitkeep', 'application/filters/.gitkeep');
      this.src.copy('_.gitkeep', 'application/helpers/.gitkeep');
      this.src.copy('_.gitkeep', 'application/models/.gitkeep');
      this.src.copy('_.gitkeep', 'application/views/.gitkeep');
      this.src.copy('_.gitkeep', 'libraries/.gitkeep');

      this.src.copy('_.gitkeep', 'public/app/collections/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/controllers/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/models/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/routers/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/templates/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/views/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/views/collection/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/views/composite/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/views/item/.gitkeep');
      this.src.copy('_.gitkeep', 'public/app/views/layout/.gitkeep');
      this.src.copy('_.gitkeep', 'public/css/.gitkeep');
      this.src.copy('_.gitkeep', 'public/images/.gitkeep');
      this.src.copy('_.gitkeep', 'public/js/.gitkeep');


      //
      var context = {
        app_name: this.app_name,
        name_space: this.app_namespace
      };

      // copy favicon
      this.src.copy('favicon.ico', 'public/images/favicon.ico');
      this.src.copy('public/index.html', 'public/index.html');
      this.src.copy('public/app/app.js', 'public/app/app.js');
      this.src.copy('public/app/templates/FooterTemplate.ejs', 'public/app/templates/FooterTemplate.ejs');
      this.src.copy('public/app/templates/HeaderTemplate.ejs', 'public/app/templates/HeaderTemplate.ejs');
      this.src.copy('public/app/templates/IndexTemplate.ejs', 'public/app/templates/IndexTemplate.ejs');

      this.src.copy('public/app/views/item/FooterView.js', 'public/app/views/item/FooterView.js');
      this.src.copy('public/app/views/item/HeaderView.js', 'public/app/views/item/HeaderView.js');
      this.src.copy('public/app/views/item/IndexView.js', 'public/app/views/item/IndexView.js');

      // copy views
      this.src.copy('application/views/error.ejs', 'application/views/error.ejs');
      this.src.copy('application/views/footer.ejs', 'application/views/footer.ejs');
      this.src.copy('application/views/header.ejs', 'application/views/header.ejs');
      this.src.copy('application/views/index.ejs', 'application/views/index.ejs');


      // copy necessary files
      this.template('package.json', 'package.json', context);
      this.template('bower.json', 'bower.json', context);
      this.src.copy('webpack.config.js', 'webpack.config.js');
      this.src.copy('Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_.bowerrc', '.bowerrc');
      this.src.copy('_.gitignore', '.gitignore');

      // copy readme
      this.template('README.md', 'README.md', context);

      // main ts files
      this.template('app.ts', 'app.ts', context);

      // ts config files
      this.template('application/config/AppConfig.ts', 'application/config/AppConfig.ts', context);
      this.template('application/config/DatabaseConfig.ts', 'application/config/DatabaseConfig.ts', context);
      this.template('application/config/ExpressConfig.ts', 'application/config/ExpressConfig.ts', context);
      this.template('application/config/LoggerConfig.ts', 'application/config/LoggerConfig.ts', context);
      this.template('application/config/RoutesConfig.ts', 'application/config/RoutesConfig.ts', context);

      // ts controllers file
      this.template('application/controllers/HomeController.ts', 'application/controllers/HomeController.ts', context);

      // ts filters files
      this.template('application/filters/AuthFilter.ts', 'application/filters/AuthFilter.ts', context);

      // ts models files
      this.template('application/models/PostModel.ts', 'application/models/PostModel.ts', context);
      this.template('application/models/UserModel.ts', 'application/models/UserModel.ts', context);

    },

    projectfiles: function () {

    }
  },

  end: function () {
    var self = this;
    this.installDependencies({
      callback: function () {
        this.spawnCommand('grunt', ['deploy']).on('close', function () {
          self.log(chalk.green('Ox is ready'));

          var str = 'Follow commands \'cd ' + self.app_name + '\' and then ' + '\'node ./build/app.js\' to start the server';
          self.log(chalk.green(str));
        });
      }.bind(this)
    });
  }

});

module.exports = AnOxGenerator;
