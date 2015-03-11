var App = require('./app');
var Marionette = require('backbone.marionette');
var Controller = require('./controller');
var Router = require('./router');
var ContactModel = require('./models/contact');
var ContactsCollection = require('./collections/contacts');

var myapp = new App();
myapp.start();

module.exports = App = function App() {};

App.prototype.start = function() {
  App.core = new Marionette.application();
};

App.core.on('initialize:before', function(options) {
  App.core.vent.trigger('app:log', 'APp: Initializing');

  App.views = {};
  App.data = {};

  var contacts = new ContactsCollection();
  contacts.fetch({
    success: function() {
      App.data.contacts = contacts;
      App.core.vent.trigger('app:start');
    }
  });
});

App.core.vent.bind('app:start', function(options) {
  App.core.vent.trigger('app:log', 'App: Starting');
  if (Backbone.history) {
    App.controller = new Controller();
    App.router = new Router({ controller: App.controller });
    App.core.vent.trigger('app:log', 'App: Backbone.history starting');
    Backbone.history.start();
  }

  App.core.vent.trigger('app:log', 'App: Done starting and running!');
});

App.core.start();
