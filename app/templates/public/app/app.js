var angular = require('angular');
var app = angular.module('Tello', ['ui.router']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    //$locationProvider.html5Mode(true);


    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('signUp', {
        url: '/signup',
        template: 'I am signup baby...'
    });

    $stateProvider.state('login', {
        url: '/login',
        template: require('./templates/LoginFormTemplate')
    });

});

app.controller('UserController', require('./controllers/UserController'));

module.exports = app;