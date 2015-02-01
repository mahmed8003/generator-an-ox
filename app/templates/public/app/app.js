var _ = require("underscore");
var Backbone = require("backbone");
var Marionette = require("marionette");

//
var HeaderView = require('./views/item/HeaderView');
var FooterView = require('./views/item/FooterView');
var IndexView = require('./views/item/IndexView');

/**
 * Application Object
 */
var App = new Marionette.Application();

/**
 * Listening for before start event
 */
App.on("before:start", function (options) {
  console.log('App: Before app start');
});


/**
 * Listening for start event
 */
App.on("start", function (options) {
  if (Backbone.history) {
    Backbone.history.start();
  }

  App.addRegions({
    header : '#header-region',
    footer : '#footer-region',
    content : '#content-region'
  });

  App.header.show(new HeaderView());
  App.footer.show(new FooterView());
  App.content.show(new IndexView());

  console.log('App: On app start');
});


/**
 * Start the app
 */
$( document ).ready(function() {
  console.log('App: will start');
  App.start();
});


/**
 * Export the app object
 */
module.exports = App;
