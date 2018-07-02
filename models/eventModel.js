// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var events = new Schema({
  
},{
    collection : 'events'
});

// the schema is useless so far
// we need to create a model using it
var eventSchema = mongoose.model('events', events);

// make this available to our users in our Node applications
module.exports = eventSchema;