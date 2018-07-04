var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;

var teamRoute = require('./routes/team');
var eventRoute = require('./routes/events');

var app =  express();
console.log("in app js");

mongoose.connect('mongodb://10.74.17.199:27107/Dontreact');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/team', teamRoute.router);
app.use('/api/event', eventRoute.router);

var server = app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});
