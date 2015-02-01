var _ = require("underscore");
var Backbone = require("backbone");
var Marionette = require("marionette");

var FooterView = Marionette.ItemView.extend({
    template: require("../../templates/FooterTemplate.ejs")
});

module.exports = FooterView;
