var _ = require("underscore");
var Backbone = require("backbone");
var Marionette = require("marionette");

var IndexView = Marionette.ItemView.extend({
    template: require("../../templates/IndexTemplate.ejs")
});

module.exports = IndexView;
