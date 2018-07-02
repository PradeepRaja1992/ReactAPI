const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;

var app =  express();

var eventModel = require('./models/eventModel');
var teamModel = require('./models/teamModel');
var teamRoute = require('./routes/team');
//var eventRoute = require('./routes/events');
 
mongoose.connect('mongodb://localhost/Dontreact');
console.log("connect");

app.use('/api/', teamRoute.router);
app.use('/api/v1', eventRoute.router);

var server = app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});
