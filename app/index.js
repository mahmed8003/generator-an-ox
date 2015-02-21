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

      //
      var context = {
        app_name: this.app_name,
        app_namespace: this.app_namespace
      };


      this.directory('./',  './', context);

    },

    projectfiles: function () {

    }
  },

  end: function () {
    this.log(chalk.cyan("Follow these steps:"));//var str = 'Follow commands \'cd ' + self.app_name
    this.log(chalk.cyan("1. 'cd " + this.app_name + "' (for navigating to app directory)"));
    this.log(chalk.cyan("2. 'npm install' (for installing required npm modules)"));
    this.log(chalk.cyan("3. 'bower install' (for installing required bower modules)"));
    this.log(chalk.cyan("4. 'gulp start' (for building and lifting the server, make sure gulp is installed globally)"));
  }

});

module.exports = AnOxGenerator;
