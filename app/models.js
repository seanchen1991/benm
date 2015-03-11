var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Contact = new Schema({
  email: { type: String },
  name: { 
    first: { type: String },
    last: { type: String }
  },
  phone: { type: String },
  gravatar: { type: String }
});

module.exports = {
  Contact: mongoose.model('Contact', Contact)
};
