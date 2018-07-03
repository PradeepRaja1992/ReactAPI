// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var teams = new Schema({
  
});

// the schema is useless so far
// we need to create a model using it
var teamSchema = mongoose.model('teams', teams);

// make this available to our users in our Node applications
module.exports = teamSchema;