var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;

var teamRoute = require('./routes/team');
var eventRoute = require('./routes/events');

var app =  express();
console.log("in app js");

app.use('/api/team', teamRoute.router);
app.use('/api/event', eventRoute.router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var server = app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});
