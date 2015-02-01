var _ = require("underscore");
var Backbone = require("backbone");
var Marionette = require("marionette");

var HeaderView = Marionette.ItemView.extend({
    template: require("../../templates/HeaderTemplate.ejs")
});

module.exports = HeaderView;
