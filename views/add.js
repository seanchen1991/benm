var Marionette = require('backbone.marionette');

var addView = Marionette.AddView.extend({
  events: {
    'click a.save-button': 'save'
  },
  save: function(e) {
    e.preventDefault();
    var newContact = {
      name: {
        first: this.$el.find('#name_first').val(),
        last: this.$el.find('#name_last').val()
      },
      email: this.$el.find('#email').val(),
      phone: this.$el.find('#phone').val()
    };

    window.App.contacts.create(newContact);
    window.App.core.vent.trigger('app:log', 'Add View: Saved new contact!');
    window.App.controller.home();
  }
})
